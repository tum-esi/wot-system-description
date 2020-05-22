import { SQSD } from "../definitions/defs.d"
import { interactionType, loopType, structToUml, structureType, typeToOp, recTypeToRet } from "../definitions/enums"

// defines
export default function generateSeqD(LogicIn: SQSD.mashupLogic) {

    const outputUmlDiagrams: string[] = []
    if (LogicIn.root) {
        outputUmlDiagrams.push(internalGenerateSeqD(LogicIn.root, LogicIn.name, "top"))
    }

    Object.keys(LogicIn.actions).forEach( name => {
        outputUmlDiagrams.push(internalGenerateSeqD(LogicIn.actions[name], name, "action"))
    })

    Object.keys(LogicIn.functions).forEach( name => {
        outputUmlDiagrams.push(internalGenerateSeqD(LogicIn.functions[name], name, "function"))
    })

    Object.keys(LogicIn.properties).forEach( name => {
        outputUmlDiagrams.push(internalGenerateSeqD(LogicIn.properties[name], name, "property"))
    })

    return outputUmlDiagrams.join("\n")
}

function internalGenerateSeqD(StrctIn: SQSD.structureEl[], diagramName: string, diagramType: string) {

    const AGENT = "Agent"
    const S = " "
    const sAgent = "\"" + AGENT + "\""
    const indent = S + S + S + S


    const umlProto = convStrctToUml(StrctIn)
    // TODO add title
    umlProto.unshift("@startuml " + diagramType + diagramName,
                     "[->" + sAgent + ":" + S + diagramType + ":" + diagramName + "()",
                    "activate" + S + sAgent,
                    "")

    umlProto.push(S,
                "[<-" + sAgent,
                "deactivate" + S + sAgent,
                "@enduml",
                "")

    return umlProto.join("\n")

    function convStrctToUml(Strct: SQSD.structureEl[]) {
        const retUml: string[] = []

        Strct.forEach(strctEl => {
            switch (strctEl.type) {
                case structureType.interact:
                        retUml.push(structToUml[structureType.interact])
                        retUml.push(
                            ...convIntrctToUml(strctEl.receiveIntrcts, "receive", strctEl.breakOnDataPushed).map(el => indent + el)
                        )
                        retUml.push(
                            ...convIntrctToUml(strctEl.sendIntrcts, "send").map(el => indent + el)
                        )
                        retUml.push("end")
                    break

                case structureType.case:

                    const parseCondition = (ifEl: SQSD.comparison) => {
                        let outProto = ""
                        const con = "," + S

                        if (ifEl.type === "all") {
                            outProto += "allOf("
                            outProto += ifEl.allOf.map(el => (parseCondition(el))).join(con)
                            outProto += ")"
                        } else if (ifEl.type === "one") {
                            outProto += "oneOf("
                            outProto += ifEl.oneOf.map(el => (parseCondition(el))).join(con)
                            outProto += ")"
                        } else if (ifEl.type === "any") {
                            outProto += "anyOf("
                            outProto += ifEl.anyOf.map(el => (parseCondition(el))).join(con)
                            outProto += ")"
                        } else if (ifEl.type === "not") {
                            outProto += "not("
                            outProto += parseCondition(ifEl.not)
                            outProto += ")"
                        } else if (ifEl.type === "var") {
                            outProto += ifEl.variable.type + S + ifEl.variable.name
                            if (ifEl.value !== undefined) {
                                outProto += S + "==" + S
                                if (typeof ifEl.value === "object") {
                                    outProto += ifEl.value.type + S + ifEl.value.name
                                } else if (typeof ifEl.value === "string") {
                                    outProto += addQ(ifEl.value)
                                } else if (typeof ifEl.value === "number") {
                                    outProto += ifEl.value.toFixed()
                                } else {throw new Error("cannot handle condition value")}
                            }

                        } else {throw new Error("impossible")}

                        return outProto
                    }

                    retUml.push(structToUml[structureType.case] + S + parseCondition(strctEl.condition))
                    retUml.push(...convStrctToUml(strctEl.content).map(el => indent + el))
                    retUml.push("else else")

                    if (strctEl.elseContent !== undefined) {
                        retUml.push(...convStrctToUml(strctEl.elseContent).map(el => indent + el))
                    }
                    retUml.push("end")

                    break

                case structureType.loop:
                    if (strctEl.loopOpts.type === loopType.logic) {
                        retUml.push(
                            structToUml[structureType.loop] + S +
                            strctEl.loopOpts.exCount +
                            (strctEl.loopOpts.exCount === "forever" ? "" : "x")
                        )

                    } else if (strctEl.loopOpts.type === loopType.timed) {

                        retUml.push(structToUml[structureType.loop] + S + "every" + S + strctEl.loopOpts.period + "ms")

                    } else {throw new Error("loop type wrong?!")}

                    retUml.push(...convStrctToUml(strctEl.content).map(el => indent + el))
                    retUml.push("end")

                    break

                case structureType.wait:
                    if (strctEl.waitTime === undefined) {throw new Error("no wait time given")}
                    retUml.push(structToUml[structureType.wait] + S + "wait" + S + strctEl.waitTime + "ms ...")
                    break

                case structureType.get:
                    retUml.push("note over" + S + sAgent)
                    retUml.push(indent + "get" + S + strctEl.get.type + S + strctEl.get.name)
                    retUml.push("end note")
                    break

                case structureType.set:
                    retUml.push("note over" + S + sAgent)
                    retUml.push(indent + "set" + S + strctEl.set.type + S + strctEl.set.name)
                    if (strctEl.get) {retUml.push(indent + "get" + S + strctEl.get.type + S + strctEl.get.name)}
                    if (strctEl.defaultInput !== undefined) {
                        let post = ""
                        if (typeof strctEl.defaultInput === "number") {
                            post = strctEl.defaultInput.toFixed()
                        } else if (typeof strctEl.defaultInput === "string") {
                            post = addQ(strctEl.defaultInput)
                        } else if (typeof strctEl.defaultInput === "boolean") {
                            post = "" + strctEl.defaultInput
                        } else if (typeof strctEl.defaultInput === "object") {
                            post = JSON.stringify(strctEl.defaultInput)
                        } else {
                            throw new Error("cannot generate defaultInput1 type: " + (typeof strctEl.defaultInput))
                        }
                        retUml.push(indent + "defaultInput" + S + post)
                    }
                    retUml.push("end note")
                    break

                case structureType.ref:
                    retUml.push("ref over " + sAgent)
                    retUml.push(indent + strctEl.ref.type + ":" + strctEl.ref.name)
                    retUml.push("end ref")
                    break

                default:
                    throw new Error("unknown structure type")
            }
        })

        return retUml
    }

    function convIntrctToUml(Intrct: SQSD.interactionAll[], inputType: "receive"|"send", breakOnDataPushed = false) {

        let umlStringAr: string[] = []
        const P = ":"
        const arr1 = "->"
        const arr2 = "-->"
        const arr3 = "->>"

        Intrct.forEach( (intr, idx) => {

            const target = addQ(intr.to)
            const firstLine = [sAgent, arr1, target, P, typeToOp[interactionType[intr.type]] + P, addQ(intr.name)].join(S)
            umlStringAr.push(firstLine)

            if (inputType === "receive") {
                intr = intr as SQSD.interactionReceive
                const ret = recTypeToRet[interactionType[intr.type]]
                const out: string[] = []
                const toOut = function(...str: string[]) { out.push(str.join(S)) }

                toOut("activate", target)
                toOut(target, arr2, sAgent, P, ret)
                if (ret === "confirmation") {
                    toOut(target, arr3, sAgent, P, "data-pushed")
                } else {
                    toOut("deactivate", target)
                }
                umlStringAr.push(...out)

                if (intr.set) {
                    umlStringAr.push("note over" + S + sAgent,
                                     indent + "set" + S + intr.set.type + S + intr.set.name,
                                     "end note")
                }
            } else {
                intr = intr as SQSD.interactionSend
                if (intr.get || intr.defaultInput !== undefined) {
                    const helper = ["note over" + S + sAgent]
                    if (intr.get) {helper.push(indent + "get" + S + intr.get.type + S + intr.get.name)}
                    if (intr.defaultInput !== undefined) {
                        const pre = indent + "defaultInput" + S
                        if (typeof intr.defaultInput === "number") {
                            helper.push(pre + intr.defaultInput.toFixed())
                        } else if (typeof intr.defaultInput === "string") {
                            helper.push(pre + addQ(intr.defaultInput))
                        } else if (typeof intr.defaultInput === "boolean") {
                            helper.push(pre + intr.defaultInput)
                        }  else if (typeof intr.defaultInput === "object") {
                            helper.push(pre + JSON.stringify(intr.defaultInput))
                        } else {
                            throw new Error("cannot generate defaultInput2 type: " + (typeof intr.defaultInput))
                        }
                    }
                    helper.push("end note")
                    umlStringAr.push(...helper)
                }
            }

            if (Intrct.length !== idx+1) {
                umlStringAr.push("else")
            } else if (inputType === "receive" && breakOnDataPushed) {
                umlStringAr.push("else")
                umlStringAr.push("break data-pushed")
                umlStringAr.push("end")
            }

        })

        umlStringAr = umlStringAr.map(el => ((el === "else") ? el : indent + el))
        umlStringAr.unshift("par")
        umlStringAr.push("end")
        return umlStringAr

    }

    function addQ(str: string) {return "\"" + str + "\""}

}


// ----------------------------------
