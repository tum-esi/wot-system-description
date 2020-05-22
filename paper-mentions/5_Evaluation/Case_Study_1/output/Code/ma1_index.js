WotMashup = require("./ma1").WotMashup

const TD_DIRECTORY = ""

Servient = require("@node-wot/core").Servient

HttpServer = require("@node-wot/binding-http").HttpServer


HttpClientFactory = require("@node-wot/binding-http").HttpClientFactory


const httpServer = new HttpServer({port: 8080})


const servient = new Servient()

servient.addServer(httpServer)


servient.addClientFactory(new HttpClientFactory())


servient.start().then( WoT => {
    wotMashup = new WotMashup(WoT, TD_DIRECTORY) // you can change the wotDevice (wotMashup) to something that makes more sense
})