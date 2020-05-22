export enum interactionType {
    subscribe,
    invoke,
    read,
    write,
    observe
}

export enum interactionTypeOfReceive {
    subscribe,
    invoke,
    read,
    observe
}

export enum interactionTypeOfSend {
    invoke,
    write,
}

export enum structureType {
    interact = "interact",
    loop = "loop",
    wait = "wait",
    case = "case",
    get = "get",
    set = "set",
    ref = "ref"
}

export enum loopType {
    timed,
    logic
}

export enum interactionDir {
    receive,
    send
}

export const singToPlural = {
    function: "functions",
    action: "actions",
    variable: "variables",
    property: "properties"
}

export const typeToOp = {
    subscribe: "subscribeEvent",
    invoke: "invokeAction",
    read: "readProperty",
    write: "writeProperty",
    observe: "observeProperty"
}

export const typeRecToOp = {
    subscribe: "subscribeEvent",
    invoke: "invokeAction",
    read: "readProperty",
    observe: "observeProperty"
}

export const typeSendToOp = {
    invoke: "invokeAction",
    write: "writeProperty"
}

export const typeToTd = {
    subscribe: "events",
    invoke: "actions",
    read: "properties",
    write: "properties",
    observe: "properties"
}

export const structToUml = {
    interact: "group strict",
    loop: "loop",
    wait: "...",
    case: "alt",
    get: "note over",
    set: "note over",
    ref: "ref over"

}

export const recTypeToRet = {
    observe: "confirmation",
    subscribe: "confirmation",
    read: "response",
    invoke: "output"
}
