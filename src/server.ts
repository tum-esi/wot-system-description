import fs = require('fs')
import crypto = require('crypto')
const { execSync } = require("child_process")
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const app = express()
const upload = multer()
const PORT = 3000

app.use(cors())
app.use(express.static('./created-output'))

app.post('/generate', upload.none(), function async(req, res) {
  // Generate unique ID for resources related to this request
  const token = crypto.randomBytes(8).toString('hex')

  if ('puml' in req.body && 'tds' in req.body) {
    // Generation type SEQUENCE_DIAGRAM_TO_SYSTEM_DESCRIPTION

    // Create temporary files with input
    fs.mkdirSync(`./server-input/${token}`, { recursive: true })
    fs.writeFileSync(`./server-input/${token}/${token}.puml`, req.body['puml'])
    fs.writeFileSync(`./server-input/${token}/${token}.json`, req.body['tds'])

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
    } catch (error) {
      res.status(400)
      res.send({ success: false, error: `incorrect input files: ${error}` })
    }

  } else if ('sd' in req.body) {
    // Generation type SYSTEM_DESCRIPTION_TO_SEQUENCE_DIAGRAM

    // Create temporary files with input
    fs.mkdirSync(`./server-input/${token}`, { recursive: true })
    fs.writeFileSync(`./server-input/${token}/${token}.json`, req.body['sd'])

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
      res.send({ success: false, error: `incorrect input files: ${error}` })
    }

  } else {
    res.status(400)
    res.send({ success: false,
      error: 'unknown generation type: please specify either system description or sequence diagram + tds' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})
