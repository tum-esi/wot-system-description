import fs = require("fs")
import checkSD from "./validateSd"
import { SQSD } from "../definitions/defs"
import parseSeqD from "./parseSeqD"
import parseSD from "./parseSD"
import generateSeqD from "./generateSeqD"
import generateSD from "./generateSD"
import generateTS from "./codeGen"
import validateSeqD from "./validateSeqD"
const inquirer = require("inquirer")

enum genType {
    SEQUENCE_DIAGRAM_TO_SYSTEM_DESCRIPTION,
    SYSTEM_DESCRIPTION_TO_SEQUENCE_DIAGRAM,
}

let questions = [
    {
        type: "list",
        name: "genType",
        message: "What's your desired generation type?",
        choices: ["Sequence Diagram -> System Description", "System Description -> Sequence Diagram"],
        filter(val) {
            if (val === "Sequence Diagram -> System Description") {
                return genType.SEQUENCE_DIAGRAM_TO_SYSTEM_DESCRIPTION
            }
            return genType.SYSTEM_DESCRIPTION_TO_SEQUENCE_DIAGRAM
        }
    },
    {
        type: "input",
        name: "SeqDPath",
        message: "Path to folder containing your Sequence Diagram(s) (relative to this directory)",
        default: "./example-input/SeqD-examples/SeqDs",
        when(answers) {
            return answers.genType === genType.SEQUENCE_DIAGRAM_TO_SYSTEM_DESCRIPTION
        }
    },
    {
        type: "input",
        name: "TDsPath",
        message: "Path to Thing Descriptions (relative to this directory)",
        default: "./example-input/SeqD-examples/TDs.json",
        when(answers) {
            return answers.genType === genType.SEQUENCE_DIAGRAM_TO_SYSTEM_DESCRIPTION
        }
    },
    {
        type: "input",
        name: "SDPath",
        message: "Path to folder containing your System Description(s) (relative to this directory)",
        default: "./example-input/SD-examples/SDs",
        when(answers) {
            return answers.genType === genType.SYSTEM_DESCRIPTION_TO_SEQUENCE_DIAGRAM
        }
    },
    {
        type: 'confirm',
        name: 'generateCode',
        message: 'Generate code?',
        default: true,
    },
    {
        type: "input",
        name: "outputPath",
        message: "Where to put created output? (relative to this directory)",
        default: "./created-output"
    }
]

const args = process.argv.slice(2)

if (args.length > 0) {
    // Either the "old" mode using arguments
    // Or the "config" mode
    questions = []
}

inquirer.prompt(questions).then(answers => {
    if (args.length > 0) {
        answers = {}
        if (args.length == 1 && args[0].endsWith(".conf.json")) {
            // The "config" mode
            const config = JSON.parse(fs.readFileSync(args[0], "utf8"))
            if (config["generation_type"] === "SEQUENCE_DIAGRAM_TO_SYSTEM_DESCRIPTION") {
                answers.genType = genType.SEQUENCE_DIAGRAM_TO_SYSTEM_DESCRIPTION
                answers.SeqDPath = config["sequence_diagram_path"]
                answers.TDsPath = config["thing_descriptions_path"]
                answers.generateCode = config["generate_code"]
                answers.outputPath = config["output_path"]
            } else if (config["generation_type"] === "SYSTEM_DESCRIPTION_TO_SEQUENCE_DIAGRAM") {
                answers.genType = genType.SYSTEM_DESCRIPTION_TO_SEQUENCE_DIAGRAM
                answers.SDPath = config["system_description_path"]
                answers.generateCode = config["generate_code"]
                answers.outputPath = config["output_path"]
            } else {
                console.error(`Invalid generation_type in ${args[0]}`)
                process.exit(-1)
            }
        } else if (args.length == 2) {
            // The "old" mode using CLI arguments
            // Sequence Diagram to System Description
            // In CLI method, code is always generated
            answers.genType = genType.SEQUENCE_DIAGRAM_TO_SYSTEM_DESCRIPTION
            answers.SeqDPath = args[0]
            answers.TDsPath = args[1]
            answers.generateCode = true
            answers.outputPath = "./created-output"
        } else if (args.length == 1) {
            // The "old" mode using CLI arguments
            // System Description to Sequence Diagram
            // In CLI method, code is always generated
            answers.genType = genType.SYSTEM_DESCRIPTION_TO_SEQUENCE_DIAGRAM
            answers.SDPath = args[0]
            answers.generateCode = true
            answers.outputPath = "./created-output"
        } else {
            console.error("Invalid arguments")
            process.exit(-1)
        }
    }

    const SDCHECK = true
    // used expressions: TODO - important, OPT - improvement
    // determine filePaths

    let inFilesPath = (answers.SeqDPath ?? answers.SDPath).replace(/\\/g, "/")
    if (inFilesPath.endsWith("/")) {
        inFilesPath = inFilesPath.slice(0, -1)
    }
    const tdFilePath = answers.TDsPath
    const outputPath = `${answers.outputPath}/${inFilesPath.split("/").slice(-1)}/`

    // createFolders
    fs.mkdirSync(outputPath + "SeqDs/", { recursive: true })
    fs.mkdirSync(outputPath + "SDs/", { recursive: true })
    fs.mkdirSync(outputPath + "Code/", { recursive: true })
    if (!fs.existsSync(outputPath + "tsconfig.json")) {
        fs.copyFileSync("./definitions/tsconfig.json", outputPath + "tsconfig.json")
    }

    // ------------ Program -------------
    fs.readdir(inFilesPath, (err, fileNames) => {
        if (err) {
            console.error("could not read input files")
            process.exit(-1)
        }
        fileNames.forEach(thisFileName => {
            const filePath = inFilesPath + "/" + thisFileName
            const fileType = thisFileName.split(".").pop()
            const outFileName = thisFileName.split(".").slice(0, -1).join(".")
            const inFile = fs.readFileSync(filePath, "utf8")
            let outFile: string
            let wholeOutPath: string
            let mashupLogic: SQSD.mashupLogic | undefined

            let outCode: string
            let outBase: string
            let codeInput: string | undefined

            if (answers.genType === genType.SYSTEM_DESCRIPTION_TO_SEQUENCE_DIAGRAM && fileType === "json") {
                // convert SD to Sequence Diagram

                checkSD(inFile, SDCHECK).then(() => {

                    const inSD: SQSD.sdTemplate = JSON.parse(inFile)
                    codeInput = inFile
                    wholeOutPath = outputPath + "SeqDs/" + outFileName + ".puml"
                    const outTDs: SQSD.subthing[] = []
                    Object.keys(inSD.things).forEach(name => {
                        outTDs.push(inSD.things[name])
                    })

                    try {
                        mashupLogic = parseSD(inSD)
                    } catch (error) {
                        console.error({ thisFileName }, "parse SD problem!: " + error)
                        process.exit(-1)
                    }
                    try {
                        outFile = generateSeqD(mashupLogic)
                    } catch (error) {
                        console.error({ thisFileName }, "generate SeqD problem!: " + error)
                        process.exit(-1)
                    }

                    if (answers.generateCode) {
                        codeGen()
                    }

                    fs.writeFile(wholeOutPath, outFile, "utf8", () => {
                        fs.writeFile(outputPath + "TDs.json", JSON.stringify(outTDs), () => {
                            console.log({ thisFileName, "->": "conversion done!" })
                        })
                    })
                }, e => {
                    console.error({ thisFileName }, "input SD invalid: " + e)
                    process.exit(-1)
                })

            } else if (answers.genType === genType.SEQUENCE_DIAGRAM_TO_SYSTEM_DESCRIPTION && fileType === "puml") {
                // convert Sequence Diagram to SD
                validateSeqD(inFile).then(ok => {
                    console.log({ thisFileName }, { ok })
                    wholeOutPath = outputPath + "SDs/" + outFileName + ".json"

                    const inTds = fs.readFileSync(tdFilePath, "utf8")
                    try {
                        mashupLogic = parseSeqD(inFile)
                    } catch (error) {
                        console.error({ thisFileName }, "parseSeqD problem!: " + error)
                        process.exit(-1)
                    }

                    try {
                        outFile = generateSD(mashupLogic, inTds)
                    } catch (error) {
                        console.error({ thisFileName }, "generateSD problem!: " + error)
                        process.exit(-1)
                    }

                    codeInput = outFile

                    checkSD(outFile, SDCHECK).then(() => {
                        fs.writeFile(wholeOutPath, outFile, "utf8", () => {
                            console.log({ thisFileName, "->": "conversion done!" })
                        })
                    }, e => {
                        fs.writeFile(wholeOutPath, outFile, "utf8", () => {
                            console.error({ thisFileName }, "created output SD is invalid: " + e)
                            process.exit(-1)
                        })
                    })

                    if (answers.generateCode) {
                        codeGen()
                    }

                }, notOk => {
                    console.error({ thisFileName }, "!!! invalid Sequence Diagram notation" + notOk)
                    process.exit(-1)
                })


            }

            function codeGen() {
                // Code generation
                const codeOutPath = outputPath + "Code/" + outFileName
                if (!mashupLogic) {
                    console.error("problem with mashup logic")
                    process.exit(-1)
                }
                if (!codeInput) {
                    console.error("sd generation not working")
                    process.exit(-1)
                }
                try {
                    const genResult = generateTS(JSON.parse(codeInput), mashupLogic, outFileName)
                    outCode = genResult.code
                    outBase = genResult.base
                } catch (error) {
                    console.error({ thisFileName }, "codeGen problem!: " + error)
                    process.exit(-1)
                }
                fs.writeFile((codeOutPath + "_index.js"), outBase, "utf8", () => {
                    fs.writeFile((codeOutPath + ".ts"), outCode, "utf8", () => {
                        console.log({ thisFileName, "->": "code generation done!" })
                    })
                })
            }

        })
    })
})
