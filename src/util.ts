import { SQSD } from "../definitions/defs"

// remove all sd specific properties
export function sdToTd( sd: SQSD.sdTemplate ) {
    const td = JSON.parse(JSON.stringify(sd))

    delete td.things
    delete td.functions
    delete td.variables
    delete td.path

    if (td.actions) {
        Object.keys(td.actions).forEach( name => {
            delete td.actions[name].path
        })
    }

    if (td.properties) {
        Object.keys(td.properties).forEach( name => {
            delete td.properties[name].path
        })
    }

    return td
}