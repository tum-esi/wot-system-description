The grammar (`sequenceDiagramSubset.ebnf`) defines a subset of the [plantUML](https://plantuml.com/) textual notation. 

It can be used to create a validator (see `4_Algorithms/src/validateSeqD.ts`). Therefore one can use any Parser-Lexer generator that accepts the EBNF grammar defined by the W3C in the [XML-standard](https://www.w3.org/TR/2008/REC-xml-20081126/).

We have used the Parser-Lexer generator [REx](https://bottlecaps.de/rex/), which requires replacing the external link:  

```
Char	   ::= [https://www.w3.org/TR/REC-xml/#NT-Char] - '"' 
```

with  

```
Char	   ::= (#x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]) - '"'
```