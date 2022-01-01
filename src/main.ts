import fs = require("fs")
import checkSD from "./validateSd"
import { SQSD } from "../definitions/defs"
import parseSeqD from "./parseSeqD"
import parseSD from "./parseSD"
import generateSeqD from "./generateSeqD"
import generateSD from "./generateSD"
import generateTS from "./codeGen"
import validateSeqD from "./validateSeqD"
const inquirer = require("inquirer");

const questions = [
    {
        type: "list",
        name: "generationType",
        message: "What's your desired generation type?",
        choices: ["Sequence Diagram -> System Description", "System Description -> Sequence Diagram"],
        filter(val) {
            if (val === "Sequence Diagram -> System Description") {
                return 0;
            }
            return 1;
        },
    },
    {
        type: "input",
        name: "SeqDPath",
        message: "Path to folder containing your Sequence Diagram(s) (relative to this directory)",
        default: "./example-input/SeqD-examples/SeqDs",
        when(answers) {
            return answers.generationType === 0;
        },
    },
    {
        type: "input",
        name: "TDsPath",
        message: "Path to Thing Descriptions (relative to this directory)",
        default: "./example-input/SeqD-examples/TDs.json",
        when(answers) {
            return answers.generationType === 0;
        },
    },
    {
        type: "input",
        name: "SDPath",
        message: "Path to folder containing your System Description(s) (relative to this directory)",
        default: "./example-input/SD-examples/SDs",
        when(answers) {
            return answers.generationType === 1;
        },
    },
    {
        type: "input",
        name: "outputPath",
        message: "Where to put created output? (relative to this directory)",
        default: "./created-output",
    },
];

inquirer.prompt(questions).then((answers) => {
    const SDCHECK = true
    // used expressions: TODO - important, OPT - improvement
    // determine filePaths

    let inFilesPath = (answers.SeqDPath ?? answers.SDPath).replace(/\\/g, "/")
    if (inFilesPath.endsWith("/")) {
        inFilesPath = inFilesPath.slice(0, -1)
    }
    const tdFilePath = answers.TDsPath
    const outputPath = answers.outputPath + inFilesPath.replace(/^[^]*example-input/, "").split("/").slice(0, -1).join("/") + "/"

    // createFolders
    fs.mkdirSync(outputPath + "SeqDs/", { recursive: true })
    fs.mkdirSync(outputPath + "SDs/", { recursive: true })
    fs.mkdirSync(outputPath + "Code/", { recursive: true })
    if (!fs.existsSync(outputPath + "tsconfig.json")) {
        fs.copyFileSync("./definitions/tsconfig.json", outputPath + "tsconfig.json")
    }

    // ------------ Program -------------
    fs.readdir(inFilesPath, (err, fileNames) => {
        if (err) { throw new Error("could not read input files") }
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

            if (answers.generationType == 1 && fileType === "json") {
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
                        console.error({ thisFileName })
                        throw new Error({ thisFileName } + " parse SD problem!: " + error)
                    }
                    try {
                        outFile = generateSeqD(mashupLogic)
                    } catch (error) {
                        console.error({ thisFileName })
                        throw new Error({ thisFileName } + " generate SeqD problem!: " + error)
                    }
                    codeGen()

                    fs.writeFile(wholeOutPath, outFile, "utf8", () => {
                        fs.writeFile(outputPath + "TDs.json", JSON.stringify(outTDs), () => {
                            console.log({ thisFileName, "->": "conversion done!" })
                        })
                    })
                }, e => {
                    console.error({ thisFileName }, "input SD invalid: " + e)
                })

            } else if (answers.generationType == 0 && fileType === "puml") {
                // convert Sequence Diagram to SD
                validateSeqD(inFile).then(ok => {
                    console.log({ thisFileName }, { ok })
                    wholeOutPath = outputPath + "SDs/" + outFileName + ".json"

                    const inTds = fs.readFileSync(tdFilePath, "utf8")
                    try {
                        mashupLogic = parseSeqD(inFile)
                    } catch (error) {
                        console.error({ thisFileName })
                        throw new Error(thisFileName + " parseSeqD problem!: " + error)
                    }

                    try {
                        outFile = generateSD(mashupLogic, inTds)
                    } catch (error) {
                        console.error({ thisFileName })
                        throw new Error(thisFileName + " generateSD problem!: " + error)
                    }

                    codeInput = outFile

                    checkSD(outFile, SDCHECK).then(() => {
                        fs.writeFile(wholeOutPath, outFile, "utf8", () => {
                            console.log({ thisFileName, "->": "conversion done!" })
                        })
                    }, e => {
                        fs.writeFile(wholeOutPath, outFile, "utf8", () => {
                            console.error({ thisFileName }, "created output SD is invalid: " + e)
                        })
                    })
                    codeGen()
                }, notOk => {
                    console.log({ thisFileName }, notOk)
                    throw new Error("!!! invalid Sequence Diagram notation" + notOk)
                })


            }

            function codeGen() {
                // Code generation
                const codeOutPath = outputPath + "Code/" + outFileName
                if (!mashupLogic) { throw new Error("problem with mashup logic!") }
                if (!codeInput) { throw new Error("sd generation not working?") }
                try {
                    const genResult = generateTS(JSON.parse(codeInput), mashupLogic, outFileName)
                    outCode = genResult.code
                    outBase = genResult.base
                } catch (error) {
                    console.error({ thisFileName })
                    throw new Error(thisFileName + " codeGen problem!: " + error)
                }
                fs.writeFile((codeOutPath + "_index.js"), outBase, "utf8", () => {
                    fs.writeFile((codeOutPath + ".ts"), outCode, "utf8", () => {
                        console.log({ thisFileName, "->": "code generation done!" })
                    })
                })
            }

        })
    })
});
