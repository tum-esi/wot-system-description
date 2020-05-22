
# Content
The content of the subfolders in this directory.

## 1_Grammar
Contains the EBNF grammar that defines the plantUML subset of the WoT Sequence Diagrams. The acompanying `Readme.md` contains information how to generate a validator from the grammar.

## 2_Schema
Contains the JSON Schema that defines the syntax of the System Description and annotates it. The `Readme.md` in the directory explains how one can validate an SD instance against this schema. 

## 3_Context
Contains the JSON-LD context that defines the semantics of the System Description. Furthermore, it also contains the ontology with definitions required in the context. Both documents enhance existings semantics, most important the semantic definitions of the WoT Thing Description.

## ~~4_Algorithms~~ **Can be found on the top-level of this repository**
An npm  package that contains the implementations of these algorithms:

* Conversion of WoT SDs in WoT Sequence Diagrams

* Conversion of WoT Sequence Diagrams in WoT SDs

* Automatic Code Generation from WoT SDs

The implementation of these algorithms is based on TypeScript (which is transpiled to JavaScript) and Node.js. The usage of single algorithms as dependencies or the whole Package from the command line is documented in the `Readme.md`.

## 5_Evaluation
Contains the manually created input, i.e. Sequence Diagrams and the generated output, i.e. SDs and code of all three Mashups derived by the requirements of the evaluation use cases. The acompanying `Readme.md` explains how one can deploy the generated code to a device and execute it. 



# Mentions
Listing of the mentions in the paper and the subfolders or files they refer to:

1. **page 3 - EBNF Grammar**  
  Grammar that defines the plantUML subset used to represent Mashups with Sequence Diagrams.  
  Can be found under: `./1_Grammar/sequenceDiagramSubset.ebnf`
2. **page 5 - JSON Schema**  
  Schema which defines the syntax of the System Description and annotates it.  
  Can be found under: `./2_Schema/sdSchema.json`
3. **page 5 - JSON-LD SD context**  
  Defining the semantics of the System Description.  
  The JSON-LD context can be found under: `./3_Context/sdContext.json` and the corresponding ontology under: `./Context/sdOntology.ttl`
4. **page 7 - Algorithms**  
  Implementation of the presented Algorithms.
  Our implementation of all algorithms (both conversions, code generation)  
  Can be found under: `../` (**repository top-level**)
5. **page 8 - Evaluation**  
  The used input files and generated output files of our case studies used to evaluate the approach.  
  Can be found under: `./5_Evaluation/`