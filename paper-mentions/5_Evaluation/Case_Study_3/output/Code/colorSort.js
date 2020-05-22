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
            "id": "de:tum:ei:esi:MashDE:StepperMotor1StepperMotor2InfraredSensor1DobotMagicianVirtualColorSensor1VirtualColorSensor2InfraredSensor2:",
            "@type": "Thing",
            "title": "MashupColorSort",
            "description": "a mashup generated with MashDE",
            "securityDefinitions": {
                "nosec_sc": {
                    "scheme": "nosec"
                }
            },
            "security": "nosec_sc",
            "properties": {
                "isRobotBusy": {
                    "forms": [{
                            "href": "example://properties/isRobotBusy"
                        }]
                },
                "isObjectPresent1": {
                    "forms": [{
                            "href": "example://properties/isObjectPresent1"
                        }]
                },
                "isObjectPresent2": {
                    "forms": [{
                            "href": "example://properties/isObjectPresent2"
                        }]
                },
                "recColor1": {
                    "forms": [{
                            "href": "example://properties/recColor1"
                        }]
                },
                "recColor2": {
                    "forms": [{
                            "href": "example://properties/recColor2"
                        }]
                }
            },
            "actions": {},
            "events": {}
        };
        this.sd = {
            "@context": ["https://www.w3.org/2019/wot/td/v1", {
                    "@language": "en"
                }],
            "id": "de:tum:ei:esi:MashDE:StepperMotor1StepperMotor2InfraredSensor1DobotMagicianVirtualColorSensor1VirtualColorSensor2InfraredSensor2:",
            "@type": "Thing",
            "title": "MashupColorSort",
            "description": "a mashup generated with MashDE",
            "securityDefinitions": {
                "nosec_sc": {
                    "scheme": "nosec"
                }
            },
            "security": "nosec_sc",
            "things": {
                "StepperMotor1": {
                    "$id": "#StepperMotor1",
                    "base": "example://-",
                    "properties": {},
                    "actions": {
                        "startBeltForward": {
                            "forms": [{
                                    "href": "http://192.168.0.130:8080/StepperMotor/actions/startBeltForward",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        },
                        "stopBelt": {
                            "forms": [{
                                    "href": "http://192.168.0.130:8080/StepperMotor/actions/stopBelt",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        }
                    },
                    "events": {}
                },
                "StepperMotor2": {
                    "$id": "#StepperMotor2",
                    "base": "example://-",
                    "properties": {},
                    "actions": {
                        "startBeltForward": {
                            "forms": [{
                                    "href": "http://192.168.0.131:8080/StepperMotor/actions/startBeltForward",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        },
                        "stopBelt": {
                            "forms": [{
                                    "href": "http://192.168.0.131:8080/StepperMotor/actions/stopBelt",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        }
                    },
                    "events": {}
                },
                "InfraredSensor1": {
                    "$id": "#InfraredSensor1",
                    "base": "example://-",
                    "properties": {},
                    "actions": {},
                    "events": {
                        "detectedObject": {
                            "forms": [{
                                    "href": "http://192.168.0.128:8080/InfraredSensor1/events/detectedObject",
                                    "contentType": "application/json",
                                    "subprotocol": "longpoll",
                                    "op": "subscribeevent"
                                }]
                        }
                    }
                },
                "DobotMagician": {
                    "$id": "#DobotMagician",
                    "base": "example://-",
                    "properties": {},
                    "actions": {
                        "pickObjectPosition1": {
                            "forms": [{
                                    "href": "http://192.168.0.127:8080/DobotMagician/actions/pickObjectPosition1",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        },
                        "moveToColorSensor1": {
                            "forms": [{
                                    "href": "http://192.168.0.127:8080/DobotMagician/actions/moveToColorSensor1",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        },
                        "moveObjectRed": {
                            "forms": [{
                                    "href": "http://192.168.0.127:8080/DobotMagician/actions/moveObjectRed",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        },
                        "moveObjectGreen": {
                            "forms": [{
                                    "href": "http://192.168.0.127:8080/DobotMagician/actions/moveObjectGreen",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        },
                        "moveObjectBlue": {
                            "forms": [{
                                    "href": "http://192.168.0.127:8080/DobotMagician/actions/moveObjectBlue",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        },
                        "moveObjectNone": {
                            "forms": [{
                                    "href": "http://192.168.0.127:8080/DobotMagician/actions/moveObjectNone",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        },
                        "pickObjectPosition2": {
                            "forms": [{
                                    "href": "http://192.168.0.127:8080/DobotMagician/actions/pickObjectPosition2",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        },
                        "moveToColorSensor2": {
                            "forms": [{
                                    "href": "http://192.168.0.127:8080/DobotMagician/actions/moveToColorSensor2",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        }
                    },
                    "events": {}
                },
                "VirtualColorSensor1": {
                    "$id": "#VirtualColorSensor1",
                    "base": "example://-",
                    "properties": {},
                    "actions": {
                        "lightUpLeds": {
                            "forms": [{
                                    "href": "http://localhost:8081/VirtualColorSensor1/actions/lightUpLeds",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        },
                        "readColor": {
                            "forms": [{
                                    "href": "http://localhost:8081/VirtualColorSensor1/actions/readColor",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        }
                    },
                    "events": {}
                },
                "VirtualColorSensor2": {
                    "$id": "#VirtualColorSensor2",
                    "base": "example://-",
                    "properties": {},
                    "actions": {
                        "lightUpLeds": {
                            "forms": [{
                                    "href": "http://localhost:8082/VirtualColorSensor2/actions/lightUpLeds",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        },
                        "readColor": {
                            "forms": [{
                                    "href": "http://localhost:8082/VirtualColorSensor2/actions/readColor",
                                    "contentType": "application/json",
                                    "htv:methodName": "POST",
                                    "op": "invokeaction"
                                }]
                        }
                    },
                    "events": {}
                },
                "InfraredSensor2": {
                    "$id": "#InfraredSensor2",
                    "base": "example://-",
                    "properties": {},
                    "actions": {},
                    "events": {
                        "detectedObject": {
                            "forms": [{
                                    "href": "http://192.168.0.129:8080/InfraredSensor2/events/detectedObject",
                                    "contentType": "application/json",
                                    "subprotocol": "longpoll",
                                    "op": "subscribeevent"
                                }]
                        }
                    }
                }
            },
            "variables": {
                "recColor1": {
                    "type": "boolean"
                },
                "recColor2": {
                    "type": "boolean"
                }
            },
            "properties": {
                "isRobotBusy": {
                    "forms": [{
                            "href": "example://properties/isRobotBusy"
                        }]
                },
                "isObjectPresent1": {
                    "forms": [{
                            "href": "example://properties/isObjectPresent1"
                        }]
                },
                "isObjectPresent2": {
                    "forms": [{
                            "href": "example://properties/isObjectPresent2"
                        }]
                },
                "recColor1": {
                    "forms": [{
                            "href": "example://properties/recColor1"
                        }]
                },
                "recColor2": {
                    "forms": [{
                            "href": "example://properties/recColor2"
                        }]
                }
            },
            "actions": {},
            "functions": {
                "ColorSort1": {
                    "forms": [{
                            "href": "example://functions/ColorSort1"
                        }],
                    "path": [{
                            "case": {
                                "if": {
                                    "allOf": [{
                                            "not": {
                                                "get": {
                                                    "$ref": "#/properties/isRobotBusy"
                                                }
                                            }
                                        }, {
                                            "get": {
                                                "$ref": "#/properties/isObjectPresent1"
                                            }
                                        }]
                                },
                                "then": {
                                    "path": [{
                                            "set": {
                                                "$ref": "#/properties/isRobotBusy"
                                            },
                                            "defaultInput": true
                                        }, {
                                            "receive": [{
                                                    "form": {
                                                        "$ref": "#DobotMagician/actions/pickObjectPosition1/forms/0"
                                                    },
                                                    "op": "invokeaction"
                                                }],
                                            "send": [{
                                                    "form": {
                                                        "$ref": "#DobotMagician/actions/moveToColorSensor1/forms/0"
                                                    },
                                                    "op": "invokeaction"
                                                }, {
                                                    "form": {
                                                        "$ref": "#VirtualColorSensor1/actions/lightUpLeds/forms/0"
                                                    },
                                                    "op": "invokeaction",
                                                    "defaultInput": "ON"
                                                }],
                                            "breakOnDataPushed": false
                                        }, {
                                            "receive": [{
                                                    "form": {
                                                        "$ref": "#VirtualColorSensor1/actions/readColor/forms/0"
                                                    },
                                                    "op": "invokeaction",
                                                    "set": {
                                                        "$ref": "#/properties/recColor1"
                                                    }
                                                }],
                                            "send": [{
                                                    "form": {
                                                        "$ref": "#VirtualColorSensor1/actions/lightUpLeds/forms/0"
                                                    },
                                                    "op": "invokeaction",
                                                    "defaultInput": "OFF"
                                                }],
                                            "breakOnDataPushed": false
                                        }, {
                                            "case": {
                                                "if": {
                                                    "get": {
                                                        "$ref": "#/variables/recColor1"
                                                    },
                                                    "output": "Red"
                                                },
                                                "then": {
                                                    "path": [{
                                                            "receive": [{
                                                                    "form": {
                                                                        "$ref": "#DobotMagician/actions/moveObjectRed/forms/0"
                                                                    },
                                                                    "op": "invokeaction"
                                                                }],
                                                            "send": [{
                                                                    "form": {
                                                                        "$ref": "#StepperMotor1/actions/startBeltForward/forms/0"
                                                                    },
                                                                    "op": "invokeaction"
                                                                }],
                                                            "breakOnDataPushed": false
                                                        }]
                                                },
                                                "else": {
                                                    "path": [{
                                                            "case": {
                                                                "if": {
                                                                    "get": {
                                                                        "$ref": "#/variables/recColor1"
                                                                    },
                                                                    "output": "Green"
                                                                },
                                                                "then": {
                                                                    "path": [{
                                                                            "receive": [{
                                                                                    "form": {
                                                                                        "$ref": "#DobotMagician/actions/moveObjectGreen/forms/0"
                                                                                    },
                                                                                    "op": "invokeaction"
                                                                                }],
                                                                            "send": [{
                                                                                    "form": {
                                                                                        "$ref": "#StepperMotor1/actions/startBeltForward/forms/0"
                                                                                    },
                                                                                    "op": "invokeaction"
                                                                                }],
                                                                            "breakOnDataPushed": false
                                                                        }]
                                                                },
                                                                "else": {
                                                                    "path": [{
                                                                            "case": {
                                                                                "if": {
                                                                                    "get": {
                                                                                        "$ref": "#/variables/recColor1"
                                                                                    },
                                                                                    "output": "Blue"
                                                                                },
                                                                                "then": {
                                                                                    "path": [{
                                                                                            "receive": [{
                                                                                                    "form": {
                                                                                                        "$ref": "#DobotMagician/actions/moveObjectBlue/forms/0"
                                                                                                    },
                                                                                                    "op": "invokeaction"
                                                                                                }],
                                                                                            "send": [{
                                                                                                    "form": {
                                                                                                        "$ref": "#StepperMotor1/actions/startBeltForward/forms/0"
                                                                                                    },
                                                                                                    "op": "invokeaction"
                                                                                                }],
                                                                                            "breakOnDataPushed": false
                                                                                        }]
                                                                                },
                                                                                "else": {
                                                                                    "path": [{
                                                                                            "receive": [{
                                                                                                    "form": {
                                                                                                        "$ref": "#DobotMagician/actions/moveObjectNone/forms/0"
                                                                                                    },
                                                                                                    "op": "invokeaction"
                                                                                                }],
                                                                                            "send": [{
                                                                                                    "form": {
                                                                                                        "$ref": "#StepperMotor1/actions/startBeltForward/forms/0"
                                                                                                    },
                                                                                                    "op": "invokeaction"
                                                                                                }],
                                                                                            "breakOnDataPushed": false
                                                                                        }]
                                                                                }
                                                                            }
                                                                        }]
                                                                }
                                                            }
                                                        }]
                                                }
                                            }
                                        }, {
                                            "set": {
                                                "$ref": "#/properties/isRobotBusy"
                                            },
                                            "defaultInput": false
                                        }, {
                                            "set": {
                                                "$ref": "#/properties/isObjectPresent1"
                                            },
                                            "defaultInput": false
                                        }]
                                },
                                "else": {}
                            }
                        }]
                },
                "ColorSort2": {
                    "forms": [{
                            "href": "example://functions/ColorSort2"
                        }],
                    "path": [{
                            "case": {
                                "if": {
                                    "allOf": [{
                                            "not": {
                                                "get": {
                                                    "$ref": "#/properties/isRobotBusy"
                                                }
                                            }
                                        }, {
                                            "get": {
                                                "$ref": "#/properties/isObjectPresent2"
                                            }
                                        }]
                                },
                                "then": {
                                    "path": [{
                                            "set": {
                                                "$ref": "#/properties/isRobotBusy"
                                            },
                                            "defaultInput": true
                                        }, {
                                            "receive": [{
                                                    "form": {
                                                        "$ref": "#DobotMagician/actions/pickObjectPosition2/forms/0"
                                                    },
                                                    "op": "invokeaction"
                                                }],
                                            "send": [{
                                                    "form": {
                                                        "$ref": "#DobotMagician/actions/moveToColorSensor2/forms/0"
                                                    },
                                                    "op": "invokeaction"
                                                }, {
                                                    "form": {
                                                        "$ref": "#VirtualColorSensor2/actions/lightUpLeds/forms/0"
                                                    },
                                                    "op": "invokeaction",
                                                    "defaultInput": "ON"
                                                }],
                                            "breakOnDataPushed": false
                                        }, {
                                            "receive": [{
                                                    "form": {
                                                        "$ref": "#VirtualColorSensor2/actions/readColor/forms/0"
                                                    },
                                                    "op": "invokeaction",
                                                    "set": {
                                                        "$ref": "#/properties/recColor2"
                                                    }
                                                }],
                                            "send": [{
                                                    "form": {
                                                        "$ref": "#VirtualColorSensor2/actions/lightUpLeds/forms/0"
                                                    },
                                                    "op": "invokeaction",
                                                    "defaultInput": "OFF"
                                                }],
                                            "breakOnDataPushed": false
                                        }, {
                                            "case": {
                                                "if": {
                                                    "get": {
                                                        "$ref": "#/variables/recColor2"
                                                    },
                                                    "output": "Red"
                                                },
                                                "then": {
                                                    "path": [{
                                                            "receive": [{
                                                                    "form": {
                                                                        "$ref": "#DobotMagician/actions/moveObjectRed/forms/0"
                                                                    },
                                                                    "op": "invokeaction"
                                                                }],
                                                            "send": [{
                                                                    "form": {
                                                                        "$ref": "#StepperMotor2/actions/startBeltForward/forms/0"
                                                                    },
                                                                    "op": "invokeaction"
                                                                }],
                                                            "breakOnDataPushed": false
                                                        }]
                                                },
                                                "else": {
                                                    "path": [{
                                                            "case": {
                                                                "if": {
                                                                    "get": {
                                                                        "$ref": "#/variables/recColor2"
                                                                    },
                                                                    "output": "Green"
                                                                },
                                                                "then": {
                                                                    "path": [{
                                                                            "receive": [{
                                                                                    "form": {
                                                                                        "$ref": "#DobotMagician/actions/moveObjectGreen/forms/0"
                                                                                    },
                                                                                    "op": "invokeaction"
                                                                                }],
                                                                            "send": [{
                                                                                    "form": {
                                                                                        "$ref": "#StepperMotor2/actions/startBeltForward/forms/0"
                                                                                    },
                                                                                    "op": "invokeaction"
                                                                                }],
                                                                            "breakOnDataPushed": false
                                                                        }]
                                                                },
                                                                "else": {
                                                                    "path": [{
                                                                            "case": {
                                                                                "if": {
                                                                                    "get": {
                                                                                        "$ref": "#/variables/recColor2"
                                                                                    },
                                                                                    "output": "Blue"
                                                                                },
                                                                                "then": {
                                                                                    "path": [{
                                                                                            "receive": [{
                                                                                                    "form": {
                                                                                                        "$ref": "#DobotMagician/actions/moveObjectBlue/forms/0"
                                                                                                    },
                                                                                                    "op": "invokeaction"
                                                                                                }],
                                                                                            "send": [{
                                                                                                    "form": {
                                                                                                        "$ref": "#StepperMotor2/actions/startBeltForward/forms/0"
                                                                                                    },
                                                                                                    "op": "invokeaction"
                                                                                                }],
                                                                                            "breakOnDataPushed": false
                                                                                        }]
                                                                                },
                                                                                "else": {
                                                                                    "path": [{
                                                                                            "receive": [{
                                                                                                    "form": {
                                                                                                        "$ref": "#DobotMagician/actions/moveObjectNone/forms/0"
                                                                                                    },
                                                                                                    "op": "invokeaction"
                                                                                                }],
                                                                                            "send": [{
                                                                                                    "form": {
                                                                                                        "$ref": "#StepperMotor2/actions/startBeltForward/forms/0"
                                                                                                    },
                                                                                                    "op": "invokeaction"
                                                                                                }],
                                                                                            "breakOnDataPushed": false
                                                                                        }]
                                                                                }
                                                                            }
                                                                        }]
                                                                }
                                                            }
                                                        }]
                                                }
                                            }
                                        }, {
                                            "set": {
                                                "$ref": "#/properties/isRobotBusy"
                                            },
                                            "defaultInput": false
                                        }, {
                                            "set": {
                                                "$ref": "#/properties/isObjectPresent2"
                                            },
                                            "defaultInput": false
                                        }]
                                },
                                "else": {}
                            }
                        }]
                }
            },
            "events": {},
            "path": [{
                    "set": {
                        "$ref": "#/properties/isRobotBusy"
                    },
                    "defaultInput": false
                }, {
                    "set": {
                        "$ref": "#/properties/isObjectPresent1"
                    },
                    "defaultInput": false
                }, {
                    "set": {
                        "$ref": "#/properties/isObjectPresent2"
                    },
                    "defaultInput": false
                }, {
                    "receive": [{
                            "form": {
                                "$ref": "#StepperMotor1/actions/startBeltForward/forms/0"
                            },
                            "op": "invokeaction"
                        }, {
                            "form": {
                                "$ref": "#InfraredSensor1/events/detectedObject/forms/0"
                            },
                            "op": "subscribeevent",
                            "set": {
                                "$ref": "#/properties/isObjectPresent1"
                            }
                        }],
                    "send": [{
                            "form": {
                                "$ref": "#StepperMotor1/actions/stopBelt/forms/0"
                            },
                            "op": "invokeaction"
                        }],
                    "breakOnDataPushed": false
                }, {
                    "receive": [{
                            "form": {
                                "$ref": "#StepperMotor2/actions/startBeltForward/forms/0"
                            },
                            "op": "invokeaction"
                        }, {
                            "form": {
                                "$ref": "#InfraredSensor2/events/detectedObject/forms/0"
                            },
                            "op": "subscribeevent",
                            "set": {
                                "$ref": "#/properties/isObjectPresent2"
                            }
                        }],
                    "send": [{
                            "form": {
                                "$ref": "#StepperMotor2/actions/stopBelt/forms/0"
                            },
                            "op": "invokeaction"
                        }],
                    "breakOnDataPushed": false
                }, {
                    "loop": {
                        "type": "timed",
                        "defaultInput": 500,
                        "path": [{
                                "$ref": "#/functions/ColorSort1/path"
                            }, {
                                "$ref": "#/functions/ColorSort2/path"
                            }]
                    }
                }]
        };
        const tds = [{
                "$id": "#StepperMotor1",
                "base": "example://-",
                "properties": {},
                "actions": {
                    "startBeltForward": {
                        "forms": [{
                                "href": "http://192.168.0.130:8080/StepperMotor/actions/startBeltForward",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    },
                    "stopBelt": {
                        "forms": [{
                                "href": "http://192.168.0.130:8080/StepperMotor/actions/stopBelt",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    }
                },
                "events": {},
                "title": "StepperMotor1"
            },
            {
                "$id": "#StepperMotor2",
                "base": "example://-",
                "properties": {},
                "actions": {
                    "startBeltForward": {
                        "forms": [{
                                "href": "http://192.168.0.131:8080/StepperMotor/actions/startBeltForward",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    },
                    "stopBelt": {
                        "forms": [{
                                "href": "http://192.168.0.131:8080/StepperMotor/actions/stopBelt",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    }
                },
                "events": {},
                "title": "StepperMotor2"
            },
            {
                "$id": "#InfraredSensor1",
                "base": "example://-",
                "properties": {},
                "actions": {},
                "events": {
                    "detectedObject": {
                        "forms": [{
                                "href": "http://192.168.0.128:8080/InfraredSensor1/events/detectedObject",
                                "contentType": "application/json",
                                "subprotocol": "longpoll",
                                "op": "subscribeevent"
                            }]
                    }
                },
                "title": "InfraredSensor1"
            },
            {
                "$id": "#DobotMagician",
                "base": "example://-",
                "properties": {},
                "actions": {
                    "pickObjectPosition1": {
                        "forms": [{
                                "href": "http://192.168.0.127:8080/DobotMagician/actions/pickObjectPosition1",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    },
                    "moveToColorSensor1": {
                        "forms": [{
                                "href": "http://192.168.0.127:8080/DobotMagician/actions/moveToColorSensor1",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    },
                    "moveObjectRed": {
                        "forms": [{
                                "href": "http://192.168.0.127:8080/DobotMagician/actions/moveObjectRed",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    },
                    "moveObjectGreen": {
                        "forms": [{
                                "href": "http://192.168.0.127:8080/DobotMagician/actions/moveObjectGreen",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    },
                    "moveObjectBlue": {
                        "forms": [{
                                "href": "http://192.168.0.127:8080/DobotMagician/actions/moveObjectBlue",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    },
                    "moveObjectNone": {
                        "forms": [{
                                "href": "http://192.168.0.127:8080/DobotMagician/actions/moveObjectNone",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    },
                    "pickObjectPosition2": {
                        "forms": [{
                                "href": "http://192.168.0.127:8080/DobotMagician/actions/pickObjectPosition2",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    },
                    "moveToColorSensor2": {
                        "forms": [{
                                "href": "http://192.168.0.127:8080/DobotMagician/actions/moveToColorSensor2",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    }
                },
                "events": {},
                "title": "DobotMagician"
            },
            {
                "$id": "#VirtualColorSensor1",
                "base": "example://-",
                "properties": {},
                "actions": {
                    "lightUpLeds": {
                        "forms": [{
                                "href": "http://localhost:8081/VirtualColorSensor1/actions/lightUpLeds",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    },
                    "readColor": {
                        "forms": [{
                                "href": "http://localhost:8081/VirtualColorSensor1/actions/readColor",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    }
                },
                "events": {},
                "title": "VirtualColorSensor1"
            },
            {
                "$id": "#VirtualColorSensor2",
                "base": "example://-",
                "properties": {},
                "actions": {
                    "lightUpLeds": {
                        "forms": [{
                                "href": "http://localhost:8082/VirtualColorSensor2/actions/lightUpLeds",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    },
                    "readColor": {
                        "forms": [{
                                "href": "http://localhost:8082/VirtualColorSensor2/actions/readColor",
                                "contentType": "application/json",
                                "htv:methodName": "POST",
                                "op": "invokeaction"
                            }]
                    }
                },
                "events": {},
                "title": "VirtualColorSensor2"
            },
            {
                "$id": "#InfraredSensor2",
                "base": "example://-",
                "properties": {},
                "actions": {},
                "events": {
                    "detectedObject": {
                        "forms": [{
                                "href": "http://192.168.0.129:8080/InfraredSensor2/events/detectedObject",
                                "contentType": "application/json",
                                "subprotocol": "longpoll",
                                "op": "subscribeevent"
                            }]
                    }
                },
                "title": "InfraredSensor2"
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
                this.add_properties();
                this.add_data_pushes();
                this.thing.expose();
                this.execMashupLogic();
            });
        }, err => {
            throw new Error("cannot consume mashup things Tds " + err);
        });
    }
    add_properties() {
        // add property inits and handlers
        this.thing.setPropertyReadHandler("isRobotBusy", () => {
            return new Promise((resolve, reject) => {
                resolve(this.maproisRobotBusy);
            });
        });
        this.thing.setPropertyReadHandler("isObjectPresent1", () => {
            return new Promise((resolve, reject) => {
                resolve(this.maproisObjectPresent1);
            });
        });
        this.thing.setPropertyReadHandler("isObjectPresent2", () => {
            return new Promise((resolve, reject) => {
                resolve(this.maproisObjectPresent2);
            });
        });
        this.thing.setPropertyReadHandler("recColor1", () => {
            return new Promise((resolve, reject) => {
                resolve(this.maprorecColor1);
            });
        });
        this.thing.setPropertyReadHandler("recColor2", () => {
            return new Promise((resolve, reject) => {
                resolve(this.maprorecColor2);
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
    execMashupLogic() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // ### path: ###
            // set
            this.maproisRobotBusy = false;
            // set
            this.maproisObjectPresent1 = false;
            // set
            this.maproisObjectPresent2 = false;
            // -- interaction sequence --
            let autoGenReceive2 = this.consumed_things["StepperMotor1"].invokeAction("startBeltForward");
            this.consumed_things["InfraredSensor1"].subscribeEvent("detectedObject", (autoGenReceive3) => __awaiter(this, void 0, void 0, function* () {
                this.maproisObjectPresent1 = autoGenReceive3;
                this.data_pushes[0][0] = true;
                if (Object.keys(this.data_pushes[0]).every(el => {
                    return (this.data_pushes[0][el] === true);
                })) {
                    console.log("data push allOf: " + autoGenReceive3);
                    const autoGenWrite0 = this.consumed_things["StepperMotor1"].invokeAction("stopBelt");
                    yield autoGenWrite0;
                }
                if (Object.keys(this.data_pushes[0]).every(el => {
                    return (this.data_pushes[0][el] === true);
                })) {
                    Object.keys(this.data_pushes[0]).forEach(el => {
                        this.data_pushes[0][el] = false;
                    });
                }
            }));
            autoGenReceive2 = yield autoGenReceive2;
            // -- end intrct seq --
            // -- interaction sequence --
            let autoGenReceive6 = this.consumed_things["StepperMotor2"].invokeAction("startBeltForward");
            this.consumed_things["InfraredSensor2"].subscribeEvent("detectedObject", (autoGenReceive7) => __awaiter(this, void 0, void 0, function* () {
                this.maproisObjectPresent2 = autoGenReceive7;
                this.data_pushes[1][0] = true;
                if (Object.keys(this.data_pushes[1]).every(el => {
                    return (this.data_pushes[1][el] === true);
                })) {
                    console.log("data push allOf: " + autoGenReceive7);
                    const autoGenWrite4 = this.consumed_things["StepperMotor2"].invokeAction("stopBelt");
                    yield autoGenWrite4;
                }
                if (Object.keys(this.data_pushes[1]).every(el => {
                    return (this.data_pushes[1][el] === true);
                })) {
                    Object.keys(this.data_pushes[1]).forEach(el => {
                        this.data_pushes[1][el] = false;
                    });
                }
            }));
            autoGenReceive6 = yield autoGenReceive6;
            // -- end intrct seq --
            // -- loop --
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                // ### path: ###
                // ref
                this.func_ColorSort1();
                // ref
                this.func_ColorSort2();
                // ### end path ###
            }), 500);
            // ### end path ###
            resolve();
        }));
    }
    func_ColorSort1() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // ### path: ###
            if ((!this.maproisRobotBusy && this.maproisObjectPresent1)) {
                // ### path: ###
                // set
                this.maproisRobotBusy = true;
                // -- interaction sequence --
                let autoGenReceive12 = this.consumed_things["DobotMagician"].invokeAction("pickObjectPosition1");
                autoGenReceive12 = yield autoGenReceive12;
                const autoWriteInput11 = "ON";
                const autoGenWrite10 = this.consumed_things["VirtualColorSensor1"].invokeAction("lightUpLeds", autoWriteInput11);
                const autoGenWrite8 = this.consumed_things["DobotMagician"].invokeAction("moveToColorSensor1");
                yield autoGenWrite8;
                yield autoGenWrite10;
                // -- end intrct seq --
                // -- interaction sequence --
                this.maprorecColor1 = this.consumed_things["VirtualColorSensor1"].invokeAction("readColor");
                this.maprorecColor1 = yield this.maprorecColor1;
                const autoWriteInput14 = "OFF";
                const autoGenWrite13 = this.consumed_things["VirtualColorSensor1"].invokeAction("lightUpLeds", autoWriteInput14);
                yield autoGenWrite13;
                // -- end intrct seq --
                if ((this.mavarrecColor1 === "Red")) {
                    // ### path: ###
                    // -- interaction sequence --
                    let autoGenReceive17 = this.consumed_things["DobotMagician"].invokeAction("moveObjectRed");
                    autoGenReceive17 = yield autoGenReceive17;
                    const autoGenWrite15 = this.consumed_things["StepperMotor1"].invokeAction("startBeltForward");
                    yield autoGenWrite15;
                    // -- end intrct seq --
                    // ### end path ###
                }
                else {
                    // ### path: ###
                    if ((this.mavarrecColor1 === "Green")) {
                        // ### path: ###
                        // -- interaction sequence --
                        let autoGenReceive20 = this.consumed_things["DobotMagician"].invokeAction("moveObjectGreen");
                        autoGenReceive20 = yield autoGenReceive20;
                        const autoGenWrite18 = this.consumed_things["StepperMotor1"].invokeAction("startBeltForward");
                        yield autoGenWrite18;
                        // -- end intrct seq --
                        // ### end path ###
                    }
                    else {
                        // ### path: ###
                        if ((this.mavarrecColor1 === "Blue")) {
                            // ### path: ###
                            // -- interaction sequence --
                            let autoGenReceive23 = this.consumed_things["DobotMagician"].invokeAction("moveObjectBlue");
                            autoGenReceive23 = yield autoGenReceive23;
                            const autoGenWrite21 = this.consumed_things["StepperMotor1"].invokeAction("startBeltForward");
                            yield autoGenWrite21;
                            // -- end intrct seq --
                            // ### end path ###
                        }
                        else {
                            // ### path: ###
                            // -- interaction sequence --
                            let autoGenReceive26 = this.consumed_things["DobotMagician"].invokeAction("moveObjectNone");
                            autoGenReceive26 = yield autoGenReceive26;
                            const autoGenWrite24 = this.consumed_things["StepperMotor1"].invokeAction("startBeltForward");
                            yield autoGenWrite24;
                            // -- end intrct seq --
                            // ### end path ###
                        }
                        // ### end path ###
                    }
                    // ### end path ###
                }
                // set
                this.maproisRobotBusy = false;
                // set
                this.maproisObjectPresent1 = false;
                // ### end path ###
            }
            // ### end path ###
            resolve();
        }));
    }
    func_ColorSort2() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // ### path: ###
            if ((!this.maproisRobotBusy && this.maproisObjectPresent2)) {
                // ### path: ###
                // set
                this.maproisRobotBusy = true;
                // -- interaction sequence --
                let autoGenReceive31 = this.consumed_things["DobotMagician"].invokeAction("pickObjectPosition2");
                autoGenReceive31 = yield autoGenReceive31;
                const autoWriteInput30 = "ON";
                const autoGenWrite29 = this.consumed_things["VirtualColorSensor2"].invokeAction("lightUpLeds", autoWriteInput30);
                const autoGenWrite27 = this.consumed_things["DobotMagician"].invokeAction("moveToColorSensor2");
                yield autoGenWrite27;
                yield autoGenWrite29;
                // -- end intrct seq --
                // -- interaction sequence --
                this.maprorecColor2 = this.consumed_things["VirtualColorSensor2"].invokeAction("readColor");
                this.maprorecColor2 = yield this.maprorecColor2;
                const autoWriteInput33 = "OFF";
                const autoGenWrite32 = this.consumed_things["VirtualColorSensor2"].invokeAction("lightUpLeds", autoWriteInput33);
                yield autoGenWrite32;
                // -- end intrct seq --
                if ((this.mavarrecColor2 === "Red")) {
                    // ### path: ###
                    // -- interaction sequence --
                    let autoGenReceive36 = this.consumed_things["DobotMagician"].invokeAction("moveObjectRed");
                    autoGenReceive36 = yield autoGenReceive36;
                    const autoGenWrite34 = this.consumed_things["StepperMotor2"].invokeAction("startBeltForward");
                    yield autoGenWrite34;
                    // -- end intrct seq --
                    // ### end path ###
                }
                else {
                    // ### path: ###
                    if ((this.mavarrecColor2 === "Green")) {
                        // ### path: ###
                        // -- interaction sequence --
                        let autoGenReceive39 = this.consumed_things["DobotMagician"].invokeAction("moveObjectGreen");
                        autoGenReceive39 = yield autoGenReceive39;
                        const autoGenWrite37 = this.consumed_things["StepperMotor2"].invokeAction("startBeltForward");
                        yield autoGenWrite37;
                        // -- end intrct seq --
                        // ### end path ###
                    }
                    else {
                        // ### path: ###
                        if ((this.mavarrecColor2 === "Blue")) {
                            // ### path: ###
                            // -- interaction sequence --
                            let autoGenReceive42 = this.consumed_things["DobotMagician"].invokeAction("moveObjectBlue");
                            autoGenReceive42 = yield autoGenReceive42;
                            const autoGenWrite40 = this.consumed_things["StepperMotor2"].invokeAction("startBeltForward");
                            yield autoGenWrite40;
                            // -- end intrct seq --
                            // ### end path ###
                        }
                        else {
                            // ### path: ###
                            // -- interaction sequence --
                            let autoGenReceive45 = this.consumed_things["DobotMagician"].invokeAction("moveObjectNone");
                            autoGenReceive45 = yield autoGenReceive45;
                            const autoGenWrite43 = this.consumed_things["StepperMotor2"].invokeAction("startBeltForward");
                            yield autoGenWrite43;
                            // -- end intrct seq --
                            // ### end path ###
                        }
                        // ### end path ###
                    }
                    // ### end path ###
                }
                // set
                this.maproisRobotBusy = false;
                // set
                this.maproisObjectPresent2 = false;
                // ### end path ###
            }
            // ### end path ###
            resolve();
        }));
    }
    add_data_pushes() {
        // add helper object for data pushes
        this.data_pushes[0] = {};
        this.data_pushes[0][0] = false;
        this.data_pushes[1] = {};
        this.data_pushes[1][0] = false;
    }
}
exports.WotMashup = WotMashup;
//# sourceMappingURL=colorSort.js.map