import fs = require('fs')
import crypto = require('crypto');
const { execSync } = require("child_process")
const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static('./created-output'))

app.post('/generate', function async(req, res) {
  // Generate unique ID for resources related to this request
  const token = crypto.randomBytes(8).toString('hex')

  if (req.body.hasOwnProperty('puml') && req.body.hasOwnProperty('tds')) {
    // Generation type SEQUENCE_DIAGRAM_TO_SYSTEM_DESCRIPTION

    // Create temporary files with input
    fs.mkdirSync(`./server-input/${token}`, { recursive: true })
    fs.writeFileSync(`./server-input/${token}/${token}.puml`, decodeURIComponent(req.body['puml']))
    fs.writeFileSync(`./server-input/${token}/${token}.json`, JSON.stringify(req.body['tds']))

    try {
      execSync(`node ./dist/src/main.js ./server-input/${token} ./server-input/${token}/${token}.json`)
      res.send({
        success: true,
        code: {
          ts: `${req.protocol}://${req.hostname}:${PORT}/${token}/code/${token}.ts`,
          tsconfig: `${req.protocol}://${req.hostname}:${PORT}/${token}/tsconfig.json`,
          js: `${req.protocol}://${req.hostname}:${PORT}/${token}/code/${token}_index.js`,
        },
        sd: `${req.protocol}://${req.hostname}:${PORT}/${token}/sds/${token}.json`
      })
    } catch (_) {
      res.status(400)
      res.send({ success: false, error: 'incorrect input files' })
    }

  } else if (req.body.hasOwnProperty('sd')) {
    // Generation type SYSTEM_DESCRIPTION_TO_SEQUENCE_DIAGRAM

    // Create temporary files with input
    fs.mkdirSync(`./server-input/${token}`, { recursive: true })
    fs.writeFileSync(`./server-input/${token}/${token}.json`, JSON.stringify(req.body['sd']))

    try {
      execSync(`node ./dist/src/main.js ./server-input/${token}`)
      res.send({
        success: true,
        code: {
          ts: `${req.protocol}://${req.hostname}:${PORT}/${token}/code/${token}.ts`,
          tsconfig: `${req.protocol}://${req.hostname}:${PORT}/${token}/tsconfig.json`,
          js: `${req.protocol}://${req.hostname}:${PORT}/${token}/code/${token}_index.js`,
        },
        puml: `${req.protocol}://${req.hostname}:${PORT}/${token}/seqds/${token}.puml`,
        tds: `${req.protocol}://${req.hostname}:${PORT}/${token}/TDs.json`
      })
    } catch (error) {
      res.status(400)
      res.send({ success: false, error: 'incorrect input files' })
    }

  } else {
    res.status(400)
    res.send({ success: false, error: 'unknown generation type' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})
