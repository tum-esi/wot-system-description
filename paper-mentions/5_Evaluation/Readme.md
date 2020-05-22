# Evaluation Outline
This folder contains the input, output, Sequence Diagram presentations for all three case studies used to evaluate the approach presented in the paper.

The three case studies are:

* Case Study 1: Simple Scenario 
 
* Case Study 2: W3C Reference Smart Home Scenario 
 
* Case Study 3: Industrial Scenario   
  
The input Sequence Diagrams were created by hand (and the `TDs.json` files also, by pasting the TDs in an Array), the System Descriptions used as input (to compare the output with the initial input) are generated from these Sequence Diagrams automatically. 

# Implementation of the Things
All Things we have used in the case studies have open-source implementations that can be found on [WoTify.org](https://wotify.org) or can be simulated using the [virtual-thing package](https://www.npmjs.com/package/virtual-thing) and the TDs in this repository.

# Automatically Generated Code
The generated code is structured according to the [node-wot.thingweb](https://github.com/eclipse/thingweb.node-wot) recommendations in:  

* a `Prefix_index.js` file that imports all required protocol bindings to host the configured Servers and interact with the involved Things.  

* a `Prefix.ts` file that implements the Mashups application logic.

To deploy your code to a device (or host it on your machine):

* Copy the whole `Code` subfolder (and the tsconfig.json if you want to change it later in place) to your target device/directory  

* Install the node-wot core package `@node-wot/core`  

* Install all required node-wot protocol bindings (e.g. `@node-wot/binding-http`) that are required by the `Prefix_index.js` file.

Then you can start the Mashup controller with  
    ```
    node Prefix_index.js
    ```

If you change a typescript file, don't forget to update the executable JavaScript file, by transpiling the required source files using  
```
tsc -b ./created-output/pathToCode/tsconfig.json
```