"use strict"
import * as WoT from 'wot-typescript-definitions'
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
export class WotMashup {


    public thing: WoT.ExposedThing
    public WoT: WoT.WoT
    public td: any
    public sd: any

    private consumed_things
    private data_pushes

    private maproisLightOn



    // eslint-disable-next-line no-shadow
    constructor(WoT: WoT.WoT, tdDirectory ? : string) {
        // create WotDevice as a server
        this.WoT = WoT
        this.consumed_things = {}
        this.data_pushes = {}
        this.td = {
            "@context": ["https://www.w3.org/2019/wot/td/v1", {
                "@language": "en"
            }],
            "id": "de:tum:ei:esi:MashDE:DotStarRGBLEDstripSenseHat:",
            "@type": "Thing",
            "title": "Mashup1",
            "description": "a mashup generated with MashDE",
            "securityDefinitions": {
                "nosec_sc": {
                    "scheme": "nosec"
                }
            },
            "security": "nosec_sc",
            "properties": {
                "isLightOn": {
                    "forms": [{
                        "href": "example://properties/isLightOn"
                    }]
                }
            },
            "actions": {},
            "events": {}
        }
        this.sd = {
            "@context": ["https://www.w3.org/2019/wot/td/v1", {
                "@language": "en"
            }],
            "id": "de:tum:ei:esi:MashDE:DotStarRGBLEDstripSenseHat:",
            "@type": "Thing",
            "title": "Mashup1",
            "description": "a mashup generated with MashDE",
            "securityDefinitions": {
                "nosec_sc": {
                    "scheme": "nosec"
                }
            },
            "security": "nosec_sc",
            "things": {
                "DotStarRGBLEDstrip": {
                    "$id": "#DotStarRGBLEDstrip",
                    "base": "example://-",
                    "properties": {
                        "stats": {
                            "forms": [{
                                "contentType": "application/json",
                                "href": "http://192.168.0.103:8080/properties/stats",
                                "op": "readproperty"
                            }]
                        }
                    },
                    "actions": {
                        "shutdown": {
                            "forms": [{
                                "contentType": "application/json",
                                "href": "http://192.168.0.103:8080/actions/shutdown",
                                "op": "invokeaction"
                            }]
                        },
                        "random": {
                            "forms": [{
                                "contentType": "application/json",
                                "href": "http://192.168.0.103:8080/actions/random",
                                "op": "invokeaction"
                            }]
                        }
                    },
                    "events": {}
                },
                "SenseHat": {
                    "$id": "#SenseHat",
                    "base": "example://-",
                    "properties": {},
                    "actions": {},
                    "events": {
                        "joystickPress": {
                            "forms": [{
                                "href": "http://192.168.0.106:8080/SenseHat/events/joystickPress",
                                "contentType": "application/json",
                                "subprotocol": "longpoll",
                                "op": "subscribeevent"
                            }]
                        }
                    }
                }
            },
            "variables": {},
            "properties": {
                "isLightOn": {
                    "forms": [{
                        "href": "example://properties/isLightOn"
                    }]
                }
            },
            "actions": {},
            "functions": {
                "SubsPress": {
                    "forms": [{
                        "href": "example://functions/SubsPress"
                    }],
                    "path": [{
                        "receive": [{
                            "form": {
                                "$ref": "#SenseHat/events/joystickPress/forms/0"
                            },
                            "op": "subscribeevent",
                            "set": {
                                "$ref": "#/properties/isLightOn"
                            }
                        }],
                        "send": [{
                            "form": {
                                "$ref": "#DotStarRGBLEDstrip/actions/random/forms/0"
                            },
                            "op": "invokeaction"
                        }],
                        "breakOnDataPushed": false
                    }]
                }
            },
            "events": {},
            "path": [{
                "set": {
                    "$ref": "#/properties/isLightOn"
                },
                "defaultInput": "no"
            }, {
                "$ref": "#/functions/SubsPress/path"
            }, {
                "loop": {
                    "type": "timed",
                    "defaultInput": 2000,
                    "path": [{
                        "case": {
                            "if": {
                                "not": {
                                    "get": {
                                        "$ref": "#/properties/isLightOn"
                                    },
                                    "output": "no"
                                }
                            },
                            "then": {
                                "path": [{
                                    "set": {
                                        "$ref": "#/properties/isLightOn"
                                    },
                                    "defaultInput": "no"
                                }, {
                                    "wait": 5000
                                }, {
                                    "receive": [{
                                        "form": {
                                            "$ref": "#DotStarRGBLEDstrip/properties/stats/forms/0"
                                        },
                                        "op": "readproperty"
                                    }],
                                    "send": [{
                                        "form": {
                                            "$ref": "#DotStarRGBLEDstrip/actions/shutdown/forms/0"
                                        },
                                        "op": "invokeaction"
                                    }],
                                    "breakOnDataPushed": false
                                }]
                            },
                            "else": {}
                        }
                    }]
                }
            }]
        }


        const tds = [{
                "$id": "#DotStarRGBLEDstrip",
                "base": "example://-",
                "properties": {
                    "stats": {
                        "forms": [{
                            "contentType": "application/json",
                            "href": "http://192.168.0.103:8080/properties/stats",
                            "op": "readproperty"
                        }]
                    }
                },
                "actions": {
                    "shutdown": {
                        "forms": [{
                            "contentType": "application/json",
                            "href": "http://192.168.0.103:8080/actions/shutdown",
                            "op": "invokeaction"
                        }]
                    },
                    "random": {
                        "forms": [{
                            "contentType": "application/json",
                            "href": "http://192.168.0.103:8080/actions/random",
                            "op": "invokeaction"
                        }]
                    }
                },
                "events": {},
                "title": "DotStarRGBLEDstrip"
            },
            {
                "$id": "#SenseHat",
                "base": "example://-",
                "properties": {},
                "actions": {},
                "events": {
                    "joystickPress": {
                        "forms": [{
                            "href": "http://192.168.0.106:8080/SenseHat/events/joystickPress",
                            "contentType": "application/json",
                            "subprotocol": "longpoll",
                            "op": "subscribeevent"
                        }]
                    }
                },
                "title": "SenseHat"
            }
        ]

        const consume_promises: Promise < WoT.ConsumedThing > [] = []
        tds.forEach(td => {
            const TdPromise = WoT.consume(td)
            consume_promises.push(TdPromise)
        })

        Promise.all(consume_promises).then(myTDs => {


            myTDs.forEach(data => {
                this.consumed_things[data.getThingDescription().$id.slice(1)] = data
            })

            this.WoT.produce(
                this.td
            ).then(exposedThing => {
                this.thing = exposedThing
                this.td = exposedThing.getThingDescription()
                this.add_properties()

                this.add_data_pushes()
                this.thing.expose()
                this.execMashupLogic()
            })
        }, err => {
            throw new Error("cannot consume mashup things Tds " + err)
        })
    }
    private add_properties() {
        // add property inits and handlers
        this.thing.setPropertyReadHandler("isLightOn", () => {
            return new Promise < any > ((resolve, reject) => {
                resolve(this.maproisLightOn)
            })
        })
    }

    private oneOf(...inputBool: boolean[]) {
        let hCount = 0
        inputBool.forEach(el => {
            if (el) {
                hCount++
            }
        })
        return (hCount === 1)
    }



    private execMashupLogic() {
        return new Promise < any > (async (resolve, reject) => {

            // ### path: ###
            // set
            this.maproisLightOn = "no"
            // ref
            this.func_SubsPress()
            // -- loop --

            setInterval(async () => {
                // ### path: ###
                if (!(this.maproisLightOn === "no")) {
                    // ### path: ###
                    // set
                    this.maproisLightOn = "no"
                    setTimeout(async () => {
                        // ### path: ###
                        // -- interaction sequence --
                        let autoGenReceive2 = this.consumed_things["DotStarRGBLEDstrip"].readProperty("stats")
                        autoGenReceive2 = await autoGenReceive2
                        const autoGenWrite0 = this.consumed_things["DotStarRGBLEDstrip"].invokeAction("shutdown")
                        await autoGenWrite0
                        // -- end intrct seq --

                        // ### end path ###
                    }, 5000)

                    // ### end path ###
                }
                // ### end path ###
            }, 2000)

            // ### end path ###

            resolve()
        })
    }


    private func_SubsPress() {
        return new Promise < any > (async (resolve, reject) => {
            // ### path: ###
            // -- interaction sequence --
            this.consumed_things["SenseHat"].subscribeEvent("joystickPress", async autoGenReceive5 => {
                this.maproisLightOn = autoGenReceive5
                this.data_pushes[0][0] = true
                if (Object.keys(this.data_pushes[0]).every(el => {
                        return (this.data_pushes[0][el] === true)
                    })) {
                    console.log("data push allOf: " + autoGenReceive5)
                    const autoGenWrite3 = this.consumed_things["DotStarRGBLEDstrip"].invokeAction("random")
                    await autoGenWrite3
                }

                if (Object.keys(this.data_pushes[0]).every(el => {
                        return (this.data_pushes[0][el] === true)
                    })) {
                    Object.keys(this.data_pushes[0]).forEach(el => {
                        this.data_pushes[0][el] = false
                    })
                }
            })

            // -- end intrct seq --

            // ### end path ###
            resolve()
        })
    }


    private add_data_pushes() {
        // add helper object for data pushes
        this.data_pushes[0] = {}
        this.data_pushes[0][0] = false
    }
}