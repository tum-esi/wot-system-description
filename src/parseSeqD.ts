import { SQSD } from "../definitions/defs.d"
import { structureType,
         structToUml,
         loopType,
         typeToOp,
         interactionType,
         interactionDir,
         typeRecToOp,
         typeSendToOp } from "../definitions/enums"

/**
 * convert the plant-uml input to an array of structure-objects,
 *
 * @param umlFileContent plant-uml input
 * @returns interactions as array of objects
 */
export default function parseSeqD(umlFileContent: string) {

    // clean \r and \t out of the string and split it linewise, remove whitespace on line start, then remove empty lines
    const umlLineContent = umlFileContent
                .replace(/\r|\t/g, "")
                .split("\n")
                .map( oneLine => oneLine.trim())
                .filter( oneLine => oneLine.length > 0)
                .filter( oneLine => !oneLine.startsWith("activate \"Agent\""))
                .filter( oneLine => !oneLine.startsWith("deactivate \"Agent\""))
                .filter( oneLine => !oneLine.startsWith("[<-"))
                .filter( oneLine => !oneLine.startsWith("@startuml"))


    const umlApplicationLogic = structUmlFile(umlLineContent)
    return umlApplicationLogic
}

/**
 * separates the diagrams contained in the inputfile content
 * and calls the function to parse the content of every diagram
 * @param umlLines cleaned content of the uml input file
 * @returns object containing the application logic in internal tree-like representation
 */
function structUmlFile(umlLines: string[]) {
    let parseLine = umlLines.shift()
    let hArray: string[] = []
    let root: SQSD.structureEl[]|undefined
    const functions = {}
    const actions = {}
    const properties = {}
    let name = "Mashup1"
    while(parseLine) {
        if(parseLine.startsWith("@enduml")) {
            // parse the first line after "@startuml", the [-> "Agent": top:myMashupName() line
            const titleLine = hArray.shift()?.split(" ").pop()?.split(":")
            const titletype = titleLine?.shift()
            const titlename = titleLine?.shift()?.slice(0,-2)
            if (titletype === undefined || titlename === undefined){throw new Error("fail")}
            if(titletype === "top") {
                root = wrapStructureLinewise(hArray)
                name = titlename
            } else if (titletype === "function") {
                functions[titlename] = wrapStructureLinewise(hArray)
            }  else if (titletype === "action") {
                actions[titlename] = wrapStructureLinewise(hArray)
            } else if (titletype === "property") {
                properties[titlename] = wrapStructureLinewise(hArray)
            } else {
                throw new Error("unknown diagram title type:" + titletype + " with name:" + titlename)
            }
            hArray = []

        } else {
            hArray.push(parseLine)
        }
        parseLine = umlLines.shift()
    }
    const umlBlocks: SQSD.mashupLogic = {name, root, functions, actions, properties}

    return umlBlocks
}


function wrapStructureLinewise(umlLinewise: string[]) {
    let line = umlLinewise.shift()
    const umlStrct: SQSD.structureEl[] = structureLinewise()
    return umlStrct
    /**
     * internal function that can be called recursively
     */
    function structureLinewise() {

        const structureProto: SQSD.structureEl[] = []

        while (line !== undefined && line !== "end" && (line.startsWith("else") === false)) {

            if (line.startsWith(structToUml[structureType.interact])) {

                // a group strict line was found
                const rawRec: string[] = []
                const rawSend: string[] = []
                let breakOnDataPushed = false

                // remove "strict" line and "par" line
                umlLinewise.shift()
                line = umlLinewise.shift()
                // group receive interactions in array
                while (line && line !== "end") {
                    if (line.startsWith("break")) {
                        // remove lines: else, break, end
                        rawRec.pop()
                        umlLinewise.shift()
                        breakOnDataPushed = true
                    } else {
                        rawRec.push(line)
                    }
                    line = umlLinewise.shift()
                }

                // remove "end" and "par"
                umlLinewise.shift()
                line = umlLinewise.shift()
                // group send interactions in array
                while (line && line !== "end") {
                    rawSend.push(line)
                    line = umlLinewise.shift()
                }
                // in order to make line the "end" of group strict
                line = umlLinewise.shift()
                const atomicProto: SQSD.structureEl = {
                type: structureType.interact,
                receiveIntrcts: interactionsLinewise(rawRec, true) as SQSD.interactionReceive[],
                sendIntrcts: interactionsLinewise(rawSend, false) as SQSD.interactionSend[],
                breakOnDataPushed
                }
                structureProto.push(atomicProto)

            } else if (line.startsWith(structToUml[structureType.wait])) {

                let waitTime: number
                const linehelp = line.split(" ").slice(1, line.split(" ").length - 1) // remove ... from start and end

                if (linehelp.length === 2 && linehelp[0] === "wait" && linehelp[1].endsWith("ms")) {
                waitTime = Number.parseInt(linehelp[1].slice(0, -2), 10)
                } else if (linehelp.length === 1 && linehelp[0].endsWith("ms")) {
                waitTime = Number.parseInt(linehelp[0].slice(0, -2), 10)
                } else {
                throw new Error("cannot determine wait time in: " + line)
                }

                const waitProto: SQSD.structureEl = {
                type: structureType.wait,
                waitTime
                }
                structureProto.push(waitProto)

            } else if (line.startsWith(structToUml[structureType.loop])) {
                const raw = line.split(" ").slice(1, line.length)
                line = umlLinewise.shift()

                let loopOpts: SQSD.loopOptions

                if (raw.length === 2 && raw[0] === "every" && raw[1].endsWith("ms")) {
                loopOpts = {
                    type: loopType.timed,
                    period: Number.parseInt(raw[1].slice(0, -2), 10)
                }
                } else if (raw.length === 1 && raw[0].endsWith("x")) {
                loopOpts = {
                    type: loopType.logic,
                    exCount: Number.parseInt(raw[0].slice(0, -1), 10)
                }
                } else if (raw.length === 1 && raw[0] === "forever") {
                loopOpts = {
                    type: loopType.logic,
                    exCount: "forever"
                }
                } else {
                throw new Error("cannot determine loop type")
                }

                const loopProto: SQSD.structureEl = {
                type: structureType.loop,
                content: structureLinewise(),
                loopOpts
                }
                structureProto.push(loopProto)
            } else if (line.startsWith(structToUml[structureType.case])) {
                const condition = detCase(line.slice(4))

                line = umlLinewise.shift()
                const content = structureLinewise()
                line = umlLinewise.shift()
                const hElse = structureLinewise()
                const elseContent = (hElse.length === 0) ? undefined : hElse

                const conditionProto: SQSD.structureEl = {
                type: structureType.case,
                content,
                elseContent,
                condition
                }

                structureProto.push(conditionProto)
            } else if (line.startsWith(structToUml[structureType.get]) && line.startsWith(structToUml[structureType.set])) {
                // comment with get/set statement
                line = umlLinewise.shift()
                let get; let set; let defaultInput
                while (line && line !== "end note") {
                    const h = line.split(" ")
                    if (line.startsWith("get")) {
                        h.shift()
                        get = {type: h.shift(), name: h.shift()}
                    } else if (line.startsWith("set")) {
                        h.shift()
                        set = {type: h.shift(), name: h.shift()}
                    } else if (line.startsWith("defaultInput")) {
                        h.shift()
                        const protoDefaultInput = h.shift() ?? ""
                        defaultInput = parseDefaultInput(protoDefaultInput)
                    } else {
                        console.error("unknown get/set content", line)
                    }
                    line = umlLinewise.shift()
                }
                if (set !== undefined) {
                    structureProto.push({
                        type: structureType.set, set, get, defaultInput
                    })
                } else if (get !== undefined) {
                    structureProto.push({
                        type: structureType.get, get
                    })
                } else {console.error("unknown get/set structure type")}

            } else if (line.startsWith(structToUml[structureType.ref])) {
                // ref element
                line = umlLinewise.shift()
                const h = line?.split(":")
                const type = h?.shift(); const name = h?.shift()
                if (name === undefined) {throw new Error("cannot handle ref")}
                if (!(type === "action" || type === "function")){throw new Error("unknown ref target type")}
                structureProto.push({
                    type: structureType.ref, ref: {type, name}
                })
                line = umlLinewise.shift()
            } else {
                throw new Error("uml structure unknown: " + line)
            }
            line = umlLinewise.shift()

        }
        return structureProto

        /**
         * parses condition to internal object representation
         * condition can contain:
         * - one variable (boolean)
         * - comparison between two variables or one var and value
         * - allOf(), oneOf(), anyOf() containing an array of conditions
         * - not() containing one condition
         * @param inC condition in string notation
         */
        function detCase(inC: string) {
            // remove whitespace
            inC = inC.replace(/ /g, "")

            let out: SQSD.comparison
            const setVar = (inS: string) => {
                let outS: SQSD.typeGetSet
                if(inS.startsWith("variable")) {
                    outS = {type: "variable", name: inS.slice(8)}
                } else if(inS.startsWith("property")) {
                    outS = {type: "property", name: inS.slice(8)}
                } else {
                    throw new Error("wrong var/prop prefix")
                }
                return outS
            }

            if (inC.endsWith(")")) {
                /**
                 * identifies the condition expressions to be further parsed without
                 * mixing nested expressions in a wrong order
                 * @param inS content of an ordered List of condition expressions separated by commas
                 */
                const splitRec = (inS: string) => {
                    const hArray: string[] = []
                    let noBrackets = 0
                    let buff = ""

                    for(const inChar of inS) {
                        if (noBrackets === 0 && inChar === ",") {
                            hArray.push(buff)
                            buff = ""
                        } else {
                            buff += inChar
                        }
                        if(inChar === "(") {noBrackets++}
                        else if(inChar === ")") {noBrackets--}
                    }
                    hArray.push(buff)
                    const outArray: SQSD.comparison[] = []
                    hArray.forEach(e => {outArray.push(detCase(e))})
                    return outArray
                }
                if (inC.startsWith("allOf(")) {
                    inC = inC.slice(6,-1)
                    out = {type: "all", allOf: splitRec(inC)}
                } else if (inC.startsWith("oneOf(")) {
                    inC = inC.slice(6,-1)
                    out = {type: "one", oneOf: splitRec(inC)}
                } else if (inC.startsWith("anyOf(")) {
                    inC = inC.slice(6,-1)
                    out = {type: "any", anyOf: splitRec(inC)}
                } else if (inC.startsWith("not(")) {
                    inC = inC.slice(4,-1)
                    out = {type: "not", not: detCase(inC)}
                } else {
                    throw new Error("brace at end of line but unknown condition prefix")
                }
            } else if (inC.includes("==")) {
                const part1 = inC.split("==").shift()
                const part2 = inC.split("==").pop()
                if(part1 === undefined || part2 === undefined) {throw new Error("undef part in cond")}
                const variable = setVar(part1)
                let value: number | string | SQSD.typeGetSet

                if(part2.startsWith("variable") || part2.startsWith("property")) {
                    value =  setVar(part2)
                } else if(part2.startsWith("\"") && part2.endsWith("\"")) {
                    value = "" + part2.slice(1,-1)
                } else {
                    try{
                        value = Number.parseInt(part2,10)
                    }
                    catch (err) {
                        console.log("number condition is no integer?")
                        try{
                            value = Number.parseFloat(part2)
                        }
                        catch (err2) {
                            throw new Error("type of comparison def fails,: " + err + " : " + err2)
                        }
                    }
                }
                out = {type: "var", variable, value}

            } else if (inC.startsWith("variable") || inC.startsWith("property")) {
                out = {type: "var", variable: setVar(inC)}
            } else {
                throw new Error("unknown fragment in case condition: " + inC)
            }

            return out
        }
    }
}


/**
 * convert uml to an array of interaction objects while keeping the order of interactions
 *
 * @param umlLines array of uml-lines that only contain interactions
 * @returns an array of interaction objects
 */
function interactionsLinewise(umlLines: string[], receivingInteractions: boolean) {

    const umlInteractionProtoRec: SQSD.interactionReceive[] = []
    const umlInteractionProtoSend: SQSD.interactionSend[] = []

    let thisline = umlLines.shift()
    let get: SQSD.interactionSend["get"]
    let defaultInput: SQSD.interactionSend["defaultInput"]
    let set: SQSD.interactionReceive["set"]

    while (thisline) {

        let lineInt: SQSD.interactionSend | SQSD.interactionReceive
        let to: string
        let name: string
        let typestring: string

        if (thisline.startsWith("\"")) {
            // clean " out of the string
            const safeLine = thisline
            thisline = thisline.replace(/"/g, "")

            // OPT do pop() and error treatment
            thisline = thisline.split(" -> ", 2)[1];
            [to, thisline] = thisline.split(" : ", 2);
            [typestring, name] = thisline.split(": ")

            let type
            if (receivingInteractions) {
                Object.keys(typeRecToOp).forEach( p => {
                    if (typeToOp[p] === typestring) {type = interactionType[p]}
                })
            } else {
                Object.keys(typeSendToOp).forEach( p => {
                    if (typeToOp[p] === typestring) {type = interactionType[p]}
                })
            }

            if (type === undefined) {throw new Error("could not set interaction type, line: " + safeLine)}

            if(receivingInteractions) {
                lineInt  = {
                    direction: interactionDir.receive,
                    type,
                    to,
                    name
                }
                umlInteractionProtoRec.push(lineInt)
            } else {
                lineInt  = {
                    direction: interactionDir.send,
                    type,
                    to,
                    name
                }
                umlInteractionProtoSend.push(lineInt)
            }

            if (receivingInteractions) {
                for (let i = 3; i > 0; i--) {umlLines.shift()}
            }

        } else if (thisline.startsWith("else")) {

            if (!receivingInteractions) {
                const h = umlInteractionProtoSend.pop()
                if (h === undefined) {throw new Error("get fail")}
                h.get = get
                h.defaultInput = defaultInput
                umlInteractionProtoSend.push(h)
                get = undefined
                defaultInput = undefined
            } else {
                const h = umlInteractionProtoRec.pop()
                if (h === undefined) {throw new Error("set fail")}
                h.set = set
                umlInteractionProtoRec.push(h)
                set = undefined
            }

        } else if (thisline.startsWith("note over")) {

            thisline = umlLines.shift()
            while(thisline && thisline !== "end note") {

                if (receivingInteractions && thisline.startsWith("set")) {

                    const hArray = thisline.split(" ").slice(1)
                    const type = hArray.shift()
                    const hName = hArray.shift()
                    if ((type !== "variable" && type !== "property") || hName === undefined) {
                        throw new Error("cannot handle 'set' of interaction")
                    }
                    else {set = {type, name: hName}}

                } else if (!receivingInteractions && thisline.startsWith("get")) {

                    const hArray = thisline.split(" ").slice(1)
                    const type = hArray.shift()
                    const hName = hArray.shift()
                    if ((type !== "variable" && type !== "property") || hName === undefined) {
                        throw new Error("cannot handle 'get' of interaction")
                    }
                    else {get = {type, name: hName}}

                } else if (!receivingInteractions && thisline.startsWith("defaultInput")) {

                    const hArray = thisline.split(" ").slice(1).join(" ")
                    defaultInput = parseDefaultInput(hArray)
                } else {
                    throw new Error("cannot parse note content: " + thisline)
                }

                thisline = umlLines.shift()
            }

        } else {
            throw new Error("unexpected input while parsing uml lines: " + thisline)
        }

        thisline = umlLines.shift()
    }

    if (receivingInteractions === true) {
        const h = umlInteractionProtoRec.pop()
        if (h === undefined) {throw new Error("set fail")}
        h.set = set
        umlInteractionProtoRec.push(h)
        set = undefined

        return umlInteractionProtoRec
    } else {
        const h = umlInteractionProtoSend.pop()
        if (h === undefined) {throw new Error("get fail")}
        h.get = get
        h.defaultInput = defaultInput
        umlInteractionProtoSend.push(h)
        get = undefined
        defaultInput = undefined

        return umlInteractionProtoSend
    }
}

function parseDefaultInput(protoDefaultInput: string) {
    let defaultInput
    if (protoDefaultInput.startsWith("\"") && protoDefaultInput.endsWith("\"")) {
        defaultInput = "" + protoDefaultInput.slice(1,-1)
    } else if (protoDefaultInput.startsWith("[") || protoDefaultInput.startsWith("{")) {
        defaultInput = JSON.parse(protoDefaultInput)
    } else if (protoDefaultInput === "true") {
        defaultInput = true
    } else if (protoDefaultInput === "false") {
        defaultInput = false
    } else if (protoDefaultInput.search(/[^0-9]/) === -1) {
        defaultInput = Number.parseInt(protoDefaultInput, 10)
    } else {
        throw new Error("cannot get default Input value")
    }
    return defaultInput
}
