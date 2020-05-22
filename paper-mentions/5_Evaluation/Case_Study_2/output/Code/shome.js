"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
class WotMashup {
    // eslint-disable-next-line no-shadow
    constructor(WoT, tdDirectory) {
        // create WotDevice as a server
        this.WoT = WoT;
        this.consumed_things = {};
        this.data_pushes = {};
        this.td = {
            "@context": ["https://www.w3.org/2019/wot/td/v1", {
                    "@language": "en"
                }],
            "id": "de:tum:ei:esi:MashDE:DotStarRGBLEDstripHueWhiteLamp1HueWhiteLamp3HueWhiteLamp4:",
            "@type": "Thing",
            "title": "Mashup1",
            "description": "a mashup generated with MashDE",
            "securityDefinitions": {
                "nosec_sc": {
                    "scheme": "nosec"
                }
            },
            "security": "nosec_sc",
            "properties": {},
            "actions": {
                "ComeHome": {
                    "forms": [{
                            "href": "example://actions/ComeHome"
                        }]
                },
                "GoAway": {
                    "forms": [{
                            "href": "example://actions/GoAway"
                        }]
                }
            },
            "events": {}
        };
        this.sd = {
            "@context": ["https://www.w3.org/2019/wot/td/v1", {
                    "@language": "en"
                }],
            "id": "de:tum:ei:esi:MashDE:DotStarRGBLEDstripHueWhiteLamp1HueWhiteLamp3HueWhiteLamp4:",
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
                        "random": {
                            "forms": [{
                                    "contentType": "application/json",
                                    "href": "http://192.168.0.103:8080/actions/random",
                                    "op": "invokeaction"
                                }]
                        },
                        "shutdown": {
                            "forms": [{
                                    "contentType": "application/json",
                                    "href": "http://192.168.0.103:8080/actions/shutdown",
                                    "op": "invokeaction"
                                }]
                        }
                    },
                    "events": {}
                },
                "HueWhiteLamp1": {
                    "$id": "#HueWhiteLamp1",
                    "base": "example://-",
                    "properties": {},
                    "actions": {
                        "set_state": {
                            "forms": [{
                                    "href": "http://192.168.0.111/api/R6D7CYQFzXckikMPLEL8WbSZWg9XKkEyx-NrgKws/lights/1/state",
                                    "contentType": "application/json",
                                    "htv:methodName": "PUT",
                                    "op": "invokeaction"
                                }]
                        }
                    },
                    "events": {}
                },
                "HueWhiteLamp3": {
                    "$id": "#HueWhiteLamp3",
                    "base": "example://-",
                    "properties": {},
                    "actions": {
                        "set_state": {
                            "forms": [{
                                    "href": "http://192.168.0.111/api/R6D7CYQFzXckikMPLEL8WbSZWg9XKkEyx-NrgKws/lights/3/state",
                                    "contentType": "application/json",
                                    "htv:methodName": "PUT",
                                    "op": "invokeaction"
                                }]
                        }
                    },
                    "events": {}
                },
                "HueWhiteLamp4": {
                    "$id": "#HueWhiteLamp4",
                    "base": "example://-",
                    "properties": {},
                    "actions": {
                        "set_state": {
                            "forms": [{
                                    "href": "http://192.168.0.111/api/R6D7CYQFzXckikMPLEL8WbSZWg9XKkEyx-NrgKws/lights/4/state",
                                    "contentType": "application/json",
                                    "htv:methodName": "PUT",
                                    "op": "invokeaction"
                                }]
                        }
                    },
                    "events": {}
                }
            },
            "variables": {},
            "properties": {},
            "actions": {
                "ComeHome": {
                    "forms": [{
                            "href": "example://actions/ComeHome"
                        }],
                    "path": [{
                            "receive": [{
                                    "form": {
                                        "$ref": "#DotStarRGBLEDstrip/properties/stats/forms/0"
                                    },
                                    "op": "readproperty"
                                }],
                            "send": [{
                                    "form": {
                                        "$ref": "#DotStarRGBLEDstrip/actions/random/forms/0"
                                    },
                                    "op": "invokeaction"
                                }, {
                                    "form": {
                                        "$ref": "#HueWhiteLamp1/actions/set_state/forms/0"
                                    },
                                    "op": "invokeaction",
                                    "defaultInput": {
                                        "on": true
                                    }
                                }, {
                                    "form": {
                                        "$ref": "#HueWhiteLamp3/actions/set_state/forms/0"
                                    },
                                    "op": "invokeaction",
                                    "defaultInput": {
                                        "on": true
                                    }
                                }, {
                                    "form": {
                                        "$ref": "#HueWhiteLamp4/actions/set_state/forms/0"
                                    },
                                    "op": "invokeaction",
                                    "defaultInput": {
                                        "on": true
                                    }
                                }],
                            "breakOnDataPushed": false
                        }]
                },
                "GoAway": {
                    "forms": [{
                            "href": "example://actions/GoAway"
                        }],
                    "path": [{
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
                                }, {
                                    "form": {
                                        "$ref": "#HueWhiteLamp1/actions/set_state/forms/0"
                                    },
                                    "op": "invokeaction",
                                    "defaultInput": {
                                        "on": false
                                    }
                                }, {
                                    "form": {
                                        "$ref": "#HueWhiteLamp3/actions/set_state/forms/0"
                                    },
                                    "op": "invokeaction",
                                    "defaultInput": {
                                        "on": false
                                    }
                                }, {
                                    "form": {
                                        "$ref": "#HueWhiteLamp4/actions/set_state/forms/0"
                                    },
                                    "op": "invokeaction",
                                    "defaultInput": {
                                        "on": false
                                    }
                                }],
                            "breakOnDataPushed": false
                        }]
                }
            },
            "functions": {},
            "events": {}
        };
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
                    "random": {
                        "forms": [{
                                "contentType": "application/json",
                                "href": "http://192.168.0.103:8080/actions/random",
                                "op": "invokeaction"
                            }]
                    },
                    "shutdown": {
                        "forms": [{
                                "contentType": "application/json",
                                "href": "http://192.168.0.103:8080/actions/shutdown",
                                "op": "invokeaction"
                            }]
                    }
                },
                "events": {},
                "title": "DotStarRGBLEDstrip"
            },
            {
                "$id": "#HueWhiteLamp1",
                "base": "example://-",
                "properties": {},
                "actions": {
                    "set_state": {
                        "forms": [{
                                "href": "http://192.168.0.111/api/R6D7CYQFzXckikMPLEL8WbSZWg9XKkEyx-NrgKws/lights/1/state",
                                "contentType": "application/json",
                                "htv:methodName": "PUT",
                                "op": "invokeaction"
                            }]
                    }
                },
                "events": {},
                "title": "HueWhiteLamp1"
            },
            {
                "$id": "#HueWhiteLamp3",
                "base": "example://-",
                "properties": {},
                "actions": {
                    "set_state": {
                        "forms": [{
                                "href": "http://192.168.0.111/api/R6D7CYQFzXckikMPLEL8WbSZWg9XKkEyx-NrgKws/lights/3/state",
                                "contentType": "application/json",
                                "htv:methodName": "PUT",
                                "op": "invokeaction"
                            }]
                    }
                },
                "events": {},
                "title": "HueWhiteLamp3"
            },
            {
                "$id": "#HueWhiteLamp4",
                "base": "example://-",
                "properties": {},
                "actions": {
                    "set_state": {
                        "forms": [{
                                "href": "http://192.168.0.111/api/R6D7CYQFzXckikMPLEL8WbSZWg9XKkEyx-NrgKws/lights/4/state",
                                "contentType": "application/json",
                                "htv:methodName": "PUT",
                                "op": "invokeaction"
                            }]
                    }
                },
                "events": {},
                "title": "HueWhiteLamp4"
            }
        ];
        const consume_promises = [];
        tds.forEach(td => {
            const TdPromise = WoT.consume(td);
            consume_promises.push(TdPromise);
        });
        Promise.all(consume_promises).then(myTDs => {
            myTDs.forEach(data => {
                this.consumed_things[data.getThingDescription().$id.slice(1)] = data;
            });
            this.WoT.produce(this.td).then(exposedThing => {
                this.thing = exposedThing;
                this.td = exposedThing.getThingDescription();
                this.add_actions();
                this.add_data_pushes();
                this.thing.expose();
            });
        }, err => {
            throw new Error("cannot consume mashup things Tds " + err);
        });
    }
    add_actions() {
        // add action handlers
        this.thing.setActionHandler("ComeHome", inputData => {
            return new Promise((resolve, reject) => {
                if (false) {
                    reject(new Error("Invalid input"));
                }
                else {
                    // forward inputData here if required
                    resolve(this.act_ComeHome());
                }
            });
        });
        this.thing.setActionHandler("GoAway", inputData => {
            return new Promise((resolve, reject) => {
                if (false) {
                    reject(new Error("Invalid input"));
                }
                else {
                    // forward inputData here if required
                    resolve(this.act_GoAway());
                }
            });
        });
    }
    oneOf(...inputBool) {
        let hCount = 0;
        inputBool.forEach(el => {
            if (el) {
                hCount++;
            }
        });
        return (hCount === 1);
    }
    act_ComeHome() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // ### path: ###
            // -- interaction sequence --
            let autoGenReceive8 = this.consumed_things["DotStarRGBLEDstrip"].readProperty("stats");
            autoGenReceive8 = yield autoGenReceive8;
            const autoWriteInput7 = {
                "on": true
            };
            const autoGenWrite6 = this.consumed_things["HueWhiteLamp4"].invokeAction("set_state", autoWriteInput7);
            const autoWriteInput5 = {
                "on": true
            };
            const autoGenWrite4 = this.consumed_things["HueWhiteLamp3"].invokeAction("set_state", autoWriteInput5);
            const autoWriteInput3 = {
                "on": true
            };
            const autoGenWrite2 = this.consumed_things["HueWhiteLamp1"].invokeAction("set_state", autoWriteInput3);
            const autoGenWrite0 = this.consumed_things["DotStarRGBLEDstrip"].invokeAction("random");
            yield autoGenWrite0;
            yield autoGenWrite2;
            yield autoGenWrite4;
            yield autoGenWrite6;
            // -- end intrct seq --
            // ### end path ###
            resolve();
        }));
    }
    act_GoAway() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // ### path: ###
            // -- interaction sequence --
            let autoGenReceive17 = this.consumed_things["DotStarRGBLEDstrip"].readProperty("stats");
            autoGenReceive17 = yield autoGenReceive17;
            const autoWriteInput16 = {
                "on": false
            };
            const autoGenWrite15 = this.consumed_things["HueWhiteLamp4"].invokeAction("set_state", autoWriteInput16);
            const autoWriteInput14 = {
                "on": false
            };
            const autoGenWrite13 = this.consumed_things["HueWhiteLamp3"].invokeAction("set_state", autoWriteInput14);
            const autoWriteInput12 = {
                "on": false
            };
            const autoGenWrite11 = this.consumed_things["HueWhiteLamp1"].invokeAction("set_state", autoWriteInput12);
            const autoGenWrite9 = this.consumed_things["DotStarRGBLEDstrip"].invokeAction("shutdown");
            yield autoGenWrite9;
            yield autoGenWrite11;
            yield autoGenWrite13;
            yield autoGenWrite15;
            // -- end intrct seq --
            // ### end path ###
            resolve();
        }));
    }
    add_data_pushes() {
        // add helper object for data pushes
    }
}
exports.WotMashup = WotMashup;
//# sourceMappingURL=shome.js.map