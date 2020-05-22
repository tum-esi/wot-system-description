import {structureType, loopType,   interactionDir, interactionType} from "./enums"

declare namespace SQSD {
    type mashupLogic = {
        name: string,
        root: structureEl[] | undefined,
        actions: {
            [k: string]: structureEl[]
        },
        functions: {
            [k: string]: structureEl[]
        },
        properties: {
            [k: string]: structureEl[]
        }
    }

    type interactionAll = interactionReceive | interactionSend

    type interactionReceive = interactionProto & {
        direction: interactionDir.receive,
        type: interactionType.observe | interactionType.invoke | interactionType.read | interactionType.subscribe,
        set?: {
            type: "variable" | "property",
            name: string
        }
    }

    type interactionSend = interactionProto & {
        direction: interactionDir.send,
        type: interactionType.invoke | interactionType.write,
        get?: {
            type: "variable" | "property",
            name: string
        },
        defaultInput?: typeDefaultInput
    }

    type interactionProto = {
        to: string,
        name: string,
        formRef?: number
    }

    type loopOptions = {
        type: loopType.timed,
        period: number
    } | {
        type: loopType.logic,
        exCount: number | "forever"
    }

    type structureEl = structElWait | structElLoop | structElCondition | structElAtomic | structElGet | structElSet | structElRef

    type structElRef = {
        type: structureType.ref,
        ref: {
            type: "action" | "function",
            name: string
        }
    }

    type structElGet = {
        type: structureType.get,
        get: typeGetSet
    }

    type structElSet = {
        type: structureType.set,
        set: typeGetSet,
        get?: typeGetSet,
        defaultInput?: any
    }

    type structElWait = {
        type: structureType.wait,
        waitTime: number
    }

    type structElLoop = {
        type: structureType.loop,
        content: structureEl[],
        loopOpts: loopOptions
    }

    type structElCondition = {
        type: structureType.case,
        content: structureEl[],
        elseContent?: structureEl[],
        condition: comparison
    }

    type comparison = {
        type: "var",
        variable: typeGetSet,
        value?: string | number | typeGetSet
    } | {
        type: "not",
        not: comparison
    } | {
        type: "all",
        allOf: comparison[]
    } | {
        type: "any",
        anyOf: comparison[]
    } | {
        type: "one",
        oneOf: comparison[]
    }

    type structElAtomic = {
        type: structureType.interact,
        receiveIntrcts: interactionReceive[],
        sendIntrcts: interactionSend[],
        breakOnDataPushed: boolean
    }

    type typeGetSet = {
        type: "variable" | "property",
        name: string
    }

    // type newtdTemplate = WoTTDSchema16October2019
    // type newsdTemplate = SDValidationSchema

    interface tdTemplate{
        id: string,
        "@context": any[],
        "@type": string,
        title: string,
        description: string,
        securityDefinitions: {},
        security: string,
        properties: {
            [k: string]: {
                readOnly?: boolean,
                [k: string]: any
            }
        },
        actions: {
            [k: string]: {
                forms?: any,
                [k: string]: any
            }
        },
        events: {[k: string]: any},
        base?: string
    }

    interface sdTemplate extends tdTemplate{
        things: {
            [k: string]: subthing
        },
        variables: {
            [k: string]: {
                path?: pathEl[],
                readOnly?: boolean,
                defaultInput?: any,
                [k: string]: any
            }
        },
        properties: {
            [k: string]: {
                path?: pathEl[],
                defaultInput?: any
            }
        },
        functions: {
            [k: string]: {
                path: pathEl[],
                [k: string]: any
            }
        },
        actions: {
            [k: string]: {
                forms: any,
                path: pathEl[],
                description?
            }
        },
        path: pathEl[]
    }

    interface subthing{
            "$id": string,
            base: string,
            id?,
            "@context"?,
            "@type"?,
            title?,
            description?,
            properties: {
                [k: string]: {
                    forms?: {
                        href: string, op
                    }[],
                    [k: string]: any
                }
            },
            actions: {
                [k: string]: {
                    forms?: {
                        href: string, op
                    }[],
                    [k: string]: any
                }
            },
            events: {
                [k: string]: {
                    forms?: {
                        href: string, op
                    }[],
                    [k: string]: any
                }
            }
    }
    // type newtdForms = WoTTDSchema16October2019["forms"]

    interface tdForms {
        op: string | string[],
        href: string,
        contentType: string,
        contentCoding?: string,
        subprotocol?: string,
        security?: string | string[],
        scopes?: string | string[],
        response?: {
            contentType: string
        },
        [k: string]: any
    }

    interface validProtocols {
        http: number,
        https: number,
        coap: number,
        coaps: number,
        mqtt: number,
        null: number
    }

    // type newpathEl = PathElement
    type pathEl = pathWait | pathLoop | pathCase | pathInteract | pathSet | pathGet | pathRef

    interface pathWait {
        wait: number
    }

    // type pathLoop = Loop
    // TODO could also use get?
    interface pathLoop {
        loop: {
            type: "logical" | "timed",
            defaultInput: number | true,
            path: pathEl[]
        }
    }

//    type pathCondition = Case
    interface pathCase {
        case: {
            if: ifWord,
            then: {
                path: pathEl[]
            },
            else: {
                path?: pathEl[]
            }
        }
    }

    type ofWord = {allOf: ifWord[]} | {oneOf: ifWord[]} | {anyOf: ifWord[]}
    type ifWord = ofWord |
                    {not: ifWord} |
                    {get: { $ref: string},
                    output?: typeOutput}


    type pathInteract = {
        receive: pathInteractReceive[],
        send: pathInteractSend[],
        breakOnDataPushed?: boolean
    }

    type pathInteractReceive = {
            form: {
                $ref: string
            },
            set?: {$ref: string},
            op: "subscribeevent" | "observeproperty" | "readproperty" | "invokeaction"
    }

    type pathInteractSend = {
            form: {
                $ref: string
            },
            get?: {$ref: string},
            defaultInput?: any,
            op: "writeproperty"| "invokeaction"
    }

    type pathRef = {
        $ref: string
    }

    type pathSet = {
        set: {$ref: string},
        defaultInput?: typeDefaultInput,
        get?: {$ref: string}
    }

    type pathGet = {
        get: {$ref: string}
    }

    type typeDefaultInput = boolean | number | string
    type typeOutput = number | string | {$ref: string}
}