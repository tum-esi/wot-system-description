The JSON Schema file in this folder defines the System Description syntax and annotates it. Furthermore, it enables creating a validator to check a given SD instance. Therefore, we use the JSON Schema validator [ajv](https://github.com/epoberezkin/ajv), which requires the following adaptions, because it doesn't support the `iri` format:  

* replace    
  ```
  "format": "iri"  
  ```  
  with  
  ```
  "format": "uri"  
  ```  

* replace  
  ```
  "format": "iri-reference"  
  ```  
  with  
  ```
  "format": "uri-reference"
  ```

An example can be found here: 

* adapted Schema: `4_Algorithms/definitions/sdSchema`

* validator: `4_Algorithms/src/validateSd.ts`