// This file was generated on Wed Oct 13, 2021 14:41 (UTC+02) by REx v5.54 which is Copyright (c) 1979-2021 by Gunther Rademacher <grd@gmx.net>
// REx command line: validateSeqD.ebnf -typescript -backtrack -ll 10
let DEBUG = {
  s: "",
  m: "",
  l: "",
  e: ""
}

module validateSeqD
{
  export interface ParsingEventHandler
  {
    reset(source: string): void;
    startNonterminal(name: string, begin: number): void;
    endNonterminal(name: string, end: number): void;
    terminal(name: string, begin: number, end: number): void;
    whitespace(begin: number, end: number): void;
  }

  export class ParseException
  {
    private begin: number;
    private end: number;
    private state: number;
    private offending: number;
    private expected: number;

    constructor(b: number, e: number, s: number, o: number, x: number)
    {
      this.begin = b;
      this.end = e;
      this.state = s;
      this.offending = o;
      this.expected = x;
    }

    getBegin() {return this.begin;}
    getEnd() {return this.end;}
    getState() {return this.state;}
    getExpected() {return this.expected;}
    getOffending() {return this.offending;}
    isAmbiguousInput() {return false;}

    getMessage()
    {
      return this.offending < 0
           ? "lexical analysis failed"
           : "syntax error";
    }
  }

  interface Memoizer
  {
    [index: number]: number;
  }

  export class Parser
  {
    constructor(source: string)
    {
      this.initialize(source);
    }

    initialize(source: string)
    {
      this.input = source;
      this.size = source.length;
      this.reset(0, 0, 0);
    }

    getInput()
    {
      return this.input;
    }

    getTokenOffset()
    {
      return this.b0;
    }

    getTokenEnd()
    {
      return this.e0;
    }

    private reset(l: number, b: number, e: number)
    {
                   this.b0 = b; this.e0 = b;
      this.l1 = l; this.b1 = b; this.e1 = e;
      this.l2 = 0; this.b2 = 0; this.e2 = 0;
      this.l3 = 0; this.b3 = 0; this.e3 = 0;
      this.l4 = 0; this.b4 = 0; this.e4 = 0;
      this.l5 = 0; this.b5 = 0; this.e5 = 0;
      this.l6 = 0; this.b6 = 0; this.e6 = 0;
      this.l7 = 0; this.b7 = 0; this.e7 = 0;
      this.l8 = 0; this.b8 = 0; this.e8 = 0;
      this.l9 = 0; this.b9 = 0; this.e9 = 0;
      this.l10 = 0; this.b10 = 0; this.e10 = 0;
      this.end = e;
      this.ex = -1;
      this.memo = {};
    }

    getOffendingToken(e: ParseException)
    {
      var o = e.getOffending();
      return o >= 0 ? Parser.TOKEN[o] : null;
    }

    getExpectedTokenSet(e: ParseException)
    {
      var expected: string[];
      if (e.getExpected() < 0)
      {
        expected = Parser.getTokenSet(- e.getState());
      }
      else
      {
        expected = [Parser.TOKEN[e.getExpected()]];
      }
      return expected;
    }

    getErrorMessage(e: ParseException)
    {
      var message = e.getMessage();
      var found = this.getOffendingToken(e);
      var tokenSet = this.getExpectedTokenSet(e);
      var size = e.getEnd() - e.getBegin();
      message += (found == null ? "" : ", found " + found)
              + "\nwhile expecting "
              + (tokenSet.length == 1 ? tokenSet[0] : ("[" + tokenSet.join(", ") + "]"))
              + "\n"
              + (size == 0 || found != null ? "" : "after successfully scanning " + size + " characters beginning ");
      var prefix = this.input.substring(0, e.getBegin());
      var lines = prefix.split("\n");
      var line = lines.length;
      var column = lines[line - 1].length + 1;
      return message
           + "at line " + line + ", column " + column + ":\n..."
           + this.input.substring(e.getBegin(), Math.min(this.input.length, e.getBegin() + 64))
           + "...";
    }

    parse_mashup()
    {
      for (;;)
      {
        this.parse_diagram();
        this.lookahead1(38);        // END | '@startuml'
        if (this.token() != 27)     // '@startuml'
        {
          break;
        }
      }
    }

    parse_safetitle()
    {
      this.lookahead1(7);           // '"'
      this.consume(11);             // '"'
      this.lookahead1(2);           // Title
      this.consume(4);              // Title
      this.lookahead1(7);           // '"'
      this.consume(11);             // '"'
    }

    private parse_diagram()
    {
      this.parse_header();
      this.parse_content();
      this.parse_footer();
    }

    private parse_header()
    {
      this.lookahead1(20);          // '@startuml'
      this.consume(27);             // '@startuml'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(2);           // Title
      this.consume(4);              // Title
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(22);          // '['
      this.consume(29);             // '['
      this.lookahead1(14);          // '->'
      this.consume(18);             // '->'
      this.lookahead1(8);           // '"Agent"'
      this.consume(12);             // '"Agent"'
      this.lookahead1(16);          // ':'
      this.consume(20);             // ':'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(4);           // Diatype
      this.consume(7);              // Diatype
      this.lookahead1(16);          // ':'
      this.consume(20);             // ':'
      this.lookahead1(2);           // Title
      this.consume(4);              // Title
      this.lookahead1(9);           // '()'
      this.consume(13);             // '()'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(23);          // 'activate'
      this.consume(32);             // 'activate'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(8);           // '"Agent"'
      this.consume(12);             // '"Agent"'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_footer()
    {
      this.consume(30);             // '[<-'
      this.lookahead1(8);           // '"Agent"'
      this.consume(12);             // '"Agent"'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(26);          // 'deactivate'
      this.consume(39);             // 'deactivate'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(8);           // '"Agent"'
      this.consume(12);             // '"Agent"'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(19);          // '@enduml'
      this.consume(26);             // '@enduml'
      this.lookahead1(49);          // END | L | '@startuml'
      if (this.token() == 2)        // L
      {
        this.consume(2);            // L
      }
    }

    private parse_content()
    {
      for (;;)
      {
        this.lookahead1(67);        // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
        switch (this.token())
        {
        case 51:                    // 'loop'
          this.parse_loop();
          break;
        case 19:                    // '...'
          this.parse_wait();
          break;
        case 34:                    // 'alt'
          this.parse_condition();
          break;
        case 49:                    // 'group'
          this.parse_interaction();
          break;
        case 54:                    // 'note'
          this.parse_getset();
          break;
        default:
          this.parse_ref();
        }
        this.lookahead1(72);        // '...' | '[<-' | 'alt' | 'else else' | 'end' | 'group' | 'loop' | 'note' | 'ref'
        if (this.token() == 30      // '[<-'
         || this.token() == 42      // 'else else'
         || this.token() == 43)     // 'end'
        {
          break;
        }
      }
    }

    private parse_loop()
    {
      this.consume(51);             // 'loop'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(51);          // Nr | 'every' | 'forever'
      switch (this.token())
      {
      case 44:                      // 'every'
        this.consume(44);           // 'every'
        this.lookahead1(1);         // S
        this.consume(3);            // S
        this.lookahead1(6);         // Nr
        this.consume(10);           // Nr
        this.lookahead1(28);        // 'ms'
        this.consume(52);           // 'ms'
        break;
      case 46:                      // 'forever'
        this.consume(46);           // 'forever'
        break;
      default:
        this.consume(10);           // Nr
        this.lookahead1(37);        // 'x'
        this.consume(71);           // 'x'
      }
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.parse_content();
      this.consume(43);             // 'end'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_wait()
    {
      this.consume(19);             // '...'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(36);          // 'wait'
      this.consume(69);             // 'wait'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(6);           // Nr
      this.consume(10);             // Nr
      this.lookahead1(28);          // 'ms'
      this.consume(52);             // 'ms'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(15);          // '...'
      this.consume(19);             // '...'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_condition()
    {
      this.consume(34);             // 'alt'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.parse_comparison();
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.parse_content();
      this.consume(42);             // 'else else'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(71);          // '...' | 'alt' | 'end' | 'group' | 'loop' | 'note' | 'ref'
      if (this.token() != 43)       // 'end'
      {
        this.parse_content();
      }
      this.consume(43);             // 'end'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_comparison()
    {
      this.lookahead1(68);          // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
      switch (this.token())
      {
      case 53:                      // 'not('
        this.consume(53);           // 'not('
        this.lookahead1(69);        // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.parse_comparison();
        this.lookahead1(41);        // S | ')'
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.lookahead1(10);        // ')'
        this.consume(14);           // ')'
        break;
      case 33:                      // 'allOf('
        this.consume(33);           // 'allOf('
        this.lookahead1(69);        // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.parse_comparison();
        for (;;)
        {
          this.lookahead1(50);      // S | ')' | ','
          switch (this.token())
          {
          case 3:                   // S
            this.lookahead2(128, 45); // ')' | ','
            break;
          default:
            this.lk = this.l1;
          }
          if (this.tokenSequence() != 15  // ','
           && this.tokenSequence() != 143)  // S ','
          {
            break;
          }
          if (this.token() == 3)    // S
          {
            this.consume(3);        // S
          }
          this.lookahead1(11);      // ','
          this.consume(15);         // ','
          this.lookahead1(69);      // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
          if (this.token() == 3)    // S
          {
            this.consume(3);        // S
          }
          this.parse_comparison();
        }
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.lookahead1(10);        // ')'
        this.consume(14);           // ')'
        break;
      case 56:                      // 'oneOf('
        this.consume(56);           // 'oneOf('
        this.lookahead1(69);        // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.parse_comparison();
        for (;;)
        {
          this.lookahead1(50);      // S | ')' | ','
          switch (this.token())
          {
          case 3:                   // S
            this.lookahead2(128, 45); // ')' | ','
            break;
          default:
            this.lk = this.l1;
          }
          if (this.tokenSequence() != 15  // ','
           && this.tokenSequence() != 143)  // S ','
          {
            break;
          }
          if (this.token() == 3)    // S
          {
            this.consume(3);        // S
          }
          this.lookahead1(11);      // ','
          this.consume(15);         // ','
          this.lookahead1(69);      // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
          if (this.token() == 3)    // S
          {
            this.consume(3);        // S
          }
          this.parse_comparison();
        }
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.lookahead1(10);        // ')'
        this.consume(14);           // ')'
        break;
      case 35:                      // 'anyOf('
        this.consume(35);           // 'anyOf('
        this.lookahead1(69);        // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.parse_comparison();
        for (;;)
        {
          this.lookahead1(50);      // S | ')' | ','
          switch (this.token())
          {
          case 3:                   // S
            this.lookahead2(128, 45); // ')' | ','
            break;
          default:
            this.lk = this.l1;
          }
          if (this.tokenSequence() != 15  // ','
           && this.tokenSequence() != 143)  // S ','
          {
            break;
          }
          if (this.token() == 3)    // S
          {
            this.consume(3);        // S
          }
          this.lookahead1(11);      // ','
          this.consume(15);         // ','
          this.lookahead1(69);      // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
          if (this.token() == 3)    // S
          {
            this.consume(3);        // S
          }
          this.parse_comparison();
        }
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.lookahead1(10);        // ')'
        this.consume(14);           // ')'
        break;
      default:
        this.parse_comparisonAtom();
      }
    }

    private parse_comparisonAtom()
    {
      switch (this.token())
      {
      case 60:                      // 'property'
        this.lookahead2(128, 1);    // S
        switch (this.tokenSequence())
        {
        case 131:                   // 'property' S
          this.lookahead3(256, 5);  // VarName
          switch (this.tokenSequence())
          {
          case 264:                 // 'property' S VarName
            this.lookahead4(384, 56); // L | S | ')' | ','
            switch (this.tokenSequence())
            {
            case 386:               // 'property' S VarName L
              this.lookahead5(512, 67); // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
              switch (this.tokenSequence())
              {
              case 531:             // 'property' S VarName L '...'
                this.lookahead6(640, 1);  // S
                switch (this.tokenSequence())
                {
                case 643:           // 'property' S VarName L '...' S
                  this.lookahead7(768, 36); // 'wait'
                  switch (this.tokenSequence())
                  {
                  case 837:         // 'property' S VarName L '...' S 'wait'
                    this.lookahead8(896, 1);  // S
                    switch (this.tokenSequence())
                    {
                    case 899:       // 'property' S VarName L '...' S 'wait' S
                      this.lookahead9(1024, 6); // Nr
                      switch (this.tokenSequence())
                      {
                      case 1034:    // 'property' S VarName L '...' S 'wait' S Nr
                        this.lookahead10(1152, 28); // 'ms'
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                }
                break;
              case 546:             // 'property' S VarName L 'alt'
                this.lookahead6(1280, 1); // S
                switch (this.tokenSequence())
                {
                case 1283:          // 'property' S VarName L 'alt' S
                  this.lookahead7(1408, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 1441:        // 'property' S VarName L 'alt' S 'allOf('
                    this.lookahead8(1536, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 1539:      // 'property' S VarName L 'alt' S 'allOf(' S
                      this.lookahead9(1664, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 1697:    // 'property' S VarName L 'alt' S 'allOf(' S 'allOf('
                        this.lookahead10(1792, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                        break;
                      case 1699:    // 'property' S VarName L 'alt' S 'allOf(' S 'anyOf('
                        this.lookahead10(1920, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                        break;
                      case 1717:    // 'property' S VarName L 'alt' S 'allOf(' S 'not('
                        this.lookahead10(2048, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                        break;
                      case 1720:    // 'property' S VarName L 'alt' S 'allOf(' S 'oneOf('
                        this.lookahead10(2176, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                        break;
                      case 1724:    // 'property' S VarName L 'alt' S 'allOf(' S 'property'
                        this.lookahead10(2304, 1);  // S
                        break;
                      case 1732:    // 'property' S VarName L 'alt' S 'allOf(' S 'variable'
                        this.lookahead10(2432, 1);  // S
                        break;
                      }
                      break;
                    case 1569:      // 'property' S VarName L 'alt' S 'allOf(' 'allOf('
                      this.lookahead9(2560, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 2563:    // 'property' S VarName L 'alt' S 'allOf(' 'allOf(' S
                        this.lookahead10(2688, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                        break;
                      case 2593:    // 'property' S VarName L 'alt' S 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(2816, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                        break;
                      case 2595:    // 'property' S VarName L 'alt' S 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(2944, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                        break;
                      case 2613:    // 'property' S VarName L 'alt' S 'allOf(' 'allOf(' 'not('
                        this.lookahead10(3072, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                        break;
                      case 2616:    // 'property' S VarName L 'alt' S 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(3200, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                        break;
                      case 2620:    // 'property' S VarName L 'alt' S 'allOf(' 'allOf(' 'property'
                        this.lookahead10(3328, 1);  // S
                        break;
                      case 2628:    // 'property' S VarName L 'alt' S 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(3456, 1);  // S
                        break;
                      }
                      break;
                    case 1571:      // 'property' S VarName L 'alt' S 'allOf(' 'anyOf('
                      this.lookahead9(3584, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 1589:      // 'property' S VarName L 'alt' S 'allOf(' 'not('
                      this.lookahead9(4608, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 1592:      // 'property' S VarName L 'alt' S 'allOf(' 'oneOf('
                      this.lookahead9(5632, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 1596:      // 'property' S VarName L 'alt' S 'allOf(' 'property'
                      this.lookahead9(6656, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 6659:    // 'property' S VarName L 'alt' S 'allOf(' 'property' S
                        this.lookahead10(6784, 5);  // VarName
                        break;
                      }
                      break;
                    case 1604:      // 'property' S VarName L 'alt' S 'allOf(' 'variable'
                      this.lookahead9(6912, 1); // S
                      break;
                    }
                    break;
                  case 1443:        // 'property' S VarName L 'alt' S 'anyOf('
                    this.lookahead8(7168, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    break;
                  case 1461:        // 'property' S VarName L 'alt' S 'not('
                    this.lookahead8(12800, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    break;
                  case 1464:        // 'property' S VarName L 'alt' S 'oneOf('
                    this.lookahead8(18432, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    break;
                  case 1468:        // 'property' S VarName L 'alt' S 'property'
                    this.lookahead8(24064, 1);  // S
                    switch (this.tokenSequence())
                    {
                    case 24067:     // 'property' S VarName L 'alt' S 'property' S
                      this.lookahead9(24192, 5);  // VarName
                      switch (this.tokenSequence())
                      {
                      case 24200:   // 'property' S VarName L 'alt' S 'property' S VarName
                        this.lookahead10(24320, 39);  // L | S
                        break;
                      }
                      break;
                    }
                    break;
                  case 1476:        // 'property' S VarName L 'alt' S 'variable'
                    this.lookahead8(24448, 1);  // S
                    break;
                  }
                  break;
                }
                break;
              case 561:             // 'property' S VarName L 'group'
                this.lookahead6(24832, 1);  // S
                switch (this.tokenSequence())
                {
                case 24835:         // 'property' S VarName L 'group' S
                  this.lookahead7(24960, 35); // 'strict'
                  switch (this.tokenSequence())
                  {
                  case 25025:       // 'property' S VarName L 'group' S 'strict'
                    this.lookahead8(25088, 0);  // L
                    switch (this.tokenSequence())
                    {
                    case 25090:     // 'property' S VarName L 'group' S 'strict' L
                      this.lookahead9(25216, 32); // 'par'
                      switch (this.tokenSequence())
                      {
                      case 25275:   // 'property' S VarName L 'group' S 'strict' L 'par'
                        this.lookahead10(25344, 0); // L
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                }
                break;
              case 563:             // 'property' S VarName L 'loop'
                this.lookahead6(25472, 1);  // S
                switch (this.tokenSequence())
                {
                case 25475:         // 'property' S VarName L 'loop' S
                  this.lookahead7(25600, 51); // Nr | 'every' | 'forever'
                  switch (this.tokenSequence())
                  {
                  case 25610:       // 'property' S VarName L 'loop' S Nr
                    this.lookahead8(25728, 37); // 'x'
                    switch (this.tokenSequence())
                    {
                    case 25799:     // 'property' S VarName L 'loop' S Nr 'x'
                      this.lookahead9(25856, 0);  // L
                      switch (this.tokenSequence())
                      {
                      case 25858:   // 'property' S VarName L 'loop' S Nr 'x' L
                        this.lookahead10(25984, 67);  // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                        break;
                      }
                      break;
                    }
                    break;
                  case 25644:       // 'property' S VarName L 'loop' S 'every'
                    this.lookahead8(26112, 1);  // S
                    switch (this.tokenSequence())
                    {
                    case 26115:     // 'property' S VarName L 'loop' S 'every' S
                      this.lookahead9(26240, 6);  // Nr
                      switch (this.tokenSequence())
                      {
                      case 26250:   // 'property' S VarName L 'loop' S 'every' S Nr
                        this.lookahead10(26368, 28);  // 'ms'
                        break;
                      }
                      break;
                    }
                    break;
                  case 25646:       // 'property' S VarName L 'loop' S 'forever'
                    this.lookahead8(26496, 0);  // L
                    switch (this.tokenSequence())
                    {
                    case 26498:     // 'property' S VarName L 'loop' S 'forever' L
                      this.lookahead9(26624, 67); // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                      switch (this.tokenSequence())
                      {
                      case 26643:   // 'property' S VarName L 'loop' S 'forever' L '...'
                        this.lookahead10(26752, 1); // S
                        break;
                      case 26658:   // 'property' S VarName L 'loop' S 'forever' L 'alt'
                        this.lookahead10(26880, 1); // S
                        break;
                      case 26673:   // 'property' S VarName L 'loop' S 'forever' L 'group'
                        this.lookahead10(27008, 1); // S
                        break;
                      case 26675:   // 'property' S VarName L 'loop' S 'forever' L 'loop'
                        this.lookahead10(27136, 1); // S
                        break;
                      case 26678:   // 'property' S VarName L 'loop' S 'forever' L 'note'
                        this.lookahead10(27264, 1); // S
                        break;
                      case 26686:   // 'property' S VarName L 'loop' S 'forever' L 'ref'
                        this.lookahead10(27392, 1); // S
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                }
                break;
              case 566:             // 'property' S VarName L 'note'
                this.lookahead6(27520, 1);  // S
                switch (this.tokenSequence())
                {
                case 27523:         // 'property' S VarName L 'note' S
                  this.lookahead7(27648, 31); // 'over'
                  switch (this.tokenSequence())
                  {
                  case 27706:       // 'property' S VarName L 'note' S 'over'
                    this.lookahead8(27776, 1);  // S
                    switch (this.tokenSequence())
                    {
                    case 27779:     // 'property' S VarName L 'note' S 'over' S
                      this.lookahead9(27904, 44); // '"' | 'Agent'
                      switch (this.tokenSequence())
                      {
                      case 27915:   // 'property' S VarName L 'note' S 'over' S '"'
                        this.lookahead10(28032, 21);  // 'Agent'
                        break;
                      case 27932:   // 'property' S VarName L 'note' S 'over' S 'Agent'
                        this.lookahead10(28160, 40);  // L | '"'
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                }
                break;
              case 574:             // 'property' S VarName L 'ref'
                this.lookahead6(28288, 1);  // S
                break;
              }
              break;
            case 387:               // 'property' S VarName S
              this.lookahead5(29056, 70); // ')' | ',' | '<' | '<=' | '==' | '>' | '>='
              switch (this.tokenSequence())
              {
              case 29070:           // 'property' S VarName S ')'
                this.lookahead6(29184, 56); // L | S | ')' | ','
                switch (this.tokenSequence())
                {
                case 29186:         // 'property' S VarName S ')' L
                  this.lookahead7(29312, 67); // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                  switch (this.tokenSequence())
                  {
                  case 29331:       // 'property' S VarName S ')' L '...'
                    this.lookahead8(29440, 1);  // S
                    switch (this.tokenSequence())
                    {
                    case 29443:     // 'property' S VarName S ')' L '...' S
                      this.lookahead9(29568, 36); // 'wait'
                      switch (this.tokenSequence())
                      {
                      case 29637:   // 'property' S VarName S ')' L '...' S 'wait'
                        this.lookahead10(29696, 1); // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 29346:       // 'property' S VarName S ')' L 'alt'
                    this.lookahead8(29824, 1);  // S
                    switch (this.tokenSequence())
                    {
                    case 29827:     // 'property' S VarName S ')' L 'alt' S
                      this.lookahead9(29952, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 29985:   // 'property' S VarName S ')' L 'alt' S 'allOf('
                        this.lookahead10(30080, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 29987:   // 'property' S VarName S ')' L 'alt' S 'anyOf('
                        this.lookahead10(30208, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 30005:   // 'property' S VarName S ')' L 'alt' S 'not('
                        this.lookahead10(30336, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 30008:   // 'property' S VarName S ')' L 'alt' S 'oneOf('
                        this.lookahead10(30464, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 30012:   // 'property' S VarName S ')' L 'alt' S 'property'
                        this.lookahead10(30592, 1); // S
                        break;
                      case 30020:   // 'property' S VarName S ')' L 'alt' S 'variable'
                        this.lookahead10(30720, 1); // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 29361:       // 'property' S VarName S ')' L 'group'
                    this.lookahead8(30848, 1);  // S
                    switch (this.tokenSequence())
                    {
                    case 30851:     // 'property' S VarName S ')' L 'group' S
                      this.lookahead9(30976, 35); // 'strict'
                      switch (this.tokenSequence())
                      {
                      case 31041:   // 'property' S VarName S ')' L 'group' S 'strict'
                        this.lookahead10(31104, 0); // L
                        break;
                      }
                      break;
                    }
                    break;
                  case 29363:       // 'property' S VarName S ')' L 'loop'
                    this.lookahead8(31232, 1);  // S
                    switch (this.tokenSequence())
                    {
                    case 31235:     // 'property' S VarName S ')' L 'loop' S
                      this.lookahead9(31360, 51); // Nr | 'every' | 'forever'
                      switch (this.tokenSequence())
                      {
                      case 31370:   // 'property' S VarName S ')' L 'loop' S Nr
                        this.lookahead10(31488, 37);  // 'x'
                        break;
                      case 31404:   // 'property' S VarName S ')' L 'loop' S 'every'
                        this.lookahead10(31616, 1); // S
                        break;
                      case 31406:   // 'property' S VarName S ')' L 'loop' S 'forever'
                        this.lookahead10(31744, 0); // L
                        break;
                      }
                      break;
                    }
                    break;
                  case 29366:       // 'property' S VarName S ')' L 'note'
                    this.lookahead8(31872, 1);  // S
                    switch (this.tokenSequence())
                    {
                    case 31875:     // 'property' S VarName S ')' L 'note' S
                      this.lookahead9(32000, 31); // 'over'
                      switch (this.tokenSequence())
                      {
                      case 32058:   // 'property' S VarName S ')' L 'note' S 'over'
                        this.lookahead10(32128, 1); // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 29374:       // 'property' S VarName S ')' L 'ref'
                    this.lookahead8(32256, 1);  // S
                    break;
                  }
                  break;
                case 29187:         // 'property' S VarName S ')' S
                  this.lookahead7(32640, 45); // ')' | ','
                  switch (this.tokenSequence())
                  {
                  case 32654:       // 'property' S VarName S ')' S ')'
                    this.lookahead8(32768, 56); // L | S | ')' | ','
                    switch (this.tokenSequence())
                    {
                    case 32770:     // 'property' S VarName S ')' S ')' L
                      this.lookahead9(32896, 67); // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                      switch (this.tokenSequence())
                      {
                      case 32915:   // 'property' S VarName S ')' S ')' L '...'
                        this.lookahead10(33024, 1); // S
                        break;
                      case 32930:   // 'property' S VarName S ')' S ')' L 'alt'
                        this.lookahead10(33152, 1); // S
                        break;
                      case 32945:   // 'property' S VarName S ')' S ')' L 'group'
                        this.lookahead10(33280, 1); // S
                        break;
                      case 32947:   // 'property' S VarName S ')' S ')' L 'loop'
                        this.lookahead10(33408, 1); // S
                        break;
                      case 32950:   // 'property' S VarName S ')' S ')' L 'note'
                        this.lookahead10(33536, 1); // S
                        break;
                      case 32958:   // 'property' S VarName S ')' S ')' L 'ref'
                        this.lookahead10(33664, 1); // S
                        break;
                      }
                      break;
                    case 32771:     // 'property' S VarName S ')' S ')' S
                      this.lookahead9(33792, 45); // ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 33806:   // 'property' S VarName S ')' S ')' S ')'
                        this.lookahead10(33920, 56);  // L | S | ')' | ','
                        break;
                      case 33807:   // 'property' S VarName S ')' S ')' S ','
                        this.lookahead10(34048, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 32782:     // 'property' S VarName S ')' S ')' ')'
                      this.lookahead9(34176, 56); // L | S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 34178:   // 'property' S VarName S ')' S ')' ')' L
                        this.lookahead10(34304, 67);  // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                        break;
                      case 34179:   // 'property' S VarName S ')' S ')' ')' S
                        this.lookahead10(34432, 45);  // ')' | ','
                        break;
                      case 34190:   // 'property' S VarName S ')' S ')' ')' ')'
                        this.lookahead10(34560, 56);  // L | S | ')' | ','
                        break;
                      case 34191:   // 'property' S VarName S ')' S ')' ')' ','
                        this.lookahead10(34688, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 32783:     // 'property' S VarName S ')' S ')' ','
                      this.lookahead9(34816, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 34819:   // 'property' S VarName S ')' S ')' ',' S
                        this.lookahead10(34944, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 34849:   // 'property' S VarName S ')' S ')' ',' 'allOf('
                        this.lookahead10(35072, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 34851:   // 'property' S VarName S ')' S ')' ',' 'anyOf('
                        this.lookahead10(35200, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 34869:   // 'property' S VarName S ')' S ')' ',' 'not('
                        this.lookahead10(35328, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 34872:   // 'property' S VarName S ')' S ')' ',' 'oneOf('
                        this.lookahead10(35456, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 34876:   // 'property' S VarName S ')' S ')' ',' 'property'
                        this.lookahead10(35584, 1); // S
                        break;
                      case 34884:   // 'property' S VarName S ')' S ')' ',' 'variable'
                        this.lookahead10(35712, 1); // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 32655:       // 'property' S VarName S ')' S ','
                    this.lookahead8(35840, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 35843:     // 'property' S VarName S ')' S ',' S
                      this.lookahead9(35968, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 36001:   // 'property' S VarName S ')' S ',' S 'allOf('
                        this.lookahead10(36096, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 36003:   // 'property' S VarName S ')' S ',' S 'anyOf('
                        this.lookahead10(36224, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 36021:   // 'property' S VarName S ')' S ',' S 'not('
                        this.lookahead10(36352, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 36024:   // 'property' S VarName S ')' S ',' S 'oneOf('
                        this.lookahead10(36480, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 36028:   // 'property' S VarName S ')' S ',' S 'property'
                        this.lookahead10(36608, 1); // S
                        break;
                      case 36036:   // 'property' S VarName S ')' S ',' S 'variable'
                        this.lookahead10(36736, 1); // S
                        break;
                      }
                      break;
                    case 35873:     // 'property' S VarName S ')' S ',' 'allOf('
                      this.lookahead9(36864, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 36867:   // 'property' S VarName S ')' S ',' 'allOf(' S
                        this.lookahead10(36992, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 36897:   // 'property' S VarName S ')' S ',' 'allOf(' 'allOf('
                        this.lookahead10(37120, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 36899:   // 'property' S VarName S ')' S ',' 'allOf(' 'anyOf('
                        this.lookahead10(37248, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 36917:   // 'property' S VarName S ')' S ',' 'allOf(' 'not('
                        this.lookahead10(37376, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 36920:   // 'property' S VarName S ')' S ',' 'allOf(' 'oneOf('
                        this.lookahead10(37504, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 36924:   // 'property' S VarName S ')' S ',' 'allOf(' 'property'
                        this.lookahead10(37632, 1); // S
                        break;
                      case 36932:   // 'property' S VarName S ')' S ',' 'allOf(' 'variable'
                        this.lookahead10(37760, 1); // S
                        break;
                      }
                      break;
                    case 35875:     // 'property' S VarName S ')' S ',' 'anyOf('
                      this.lookahead9(37888, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 35893:     // 'property' S VarName S ')' S ',' 'not('
                      this.lookahead9(38912, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 35896:     // 'property' S VarName S ')' S ',' 'oneOf('
                      this.lookahead9(39936, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 35900:     // 'property' S VarName S ')' S ',' 'property'
                      this.lookahead9(40960, 1);  // S
                      switch (this.tokenSequence())
                      {
                      case 40963:   // 'property' S VarName S ')' S ',' 'property' S
                        this.lookahead10(41088, 5); // VarName
                        break;
                      }
                      break;
                    case 35908:     // 'property' S VarName S ')' S ',' 'variable'
                      this.lookahead9(41216, 1);  // S
                      break;
                    }
                    break;
                  }
                  break;
                case 29198:         // 'property' S VarName S ')' ')'
                  this.lookahead7(41472, 56); // L | S | ')' | ','
                  switch (this.tokenSequence())
                  {
                  case 41474:       // 'property' S VarName S ')' ')' L
                    this.lookahead8(41600, 67); // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                    switch (this.tokenSequence())
                    {
                    case 41619:     // 'property' S VarName S ')' ')' L '...'
                      this.lookahead9(41728, 1);  // S
                      switch (this.tokenSequence())
                      {
                      case 41731:   // 'property' S VarName S ')' ')' L '...' S
                        this.lookahead10(41856, 36);  // 'wait'
                        break;
                      }
                      break;
                    case 41634:     // 'property' S VarName S ')' ')' L 'alt'
                      this.lookahead9(41984, 1);  // S
                      switch (this.tokenSequence())
                      {
                      case 41987:   // 'property' S VarName S ')' ')' L 'alt' S
                        this.lookahead10(42112, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 41649:     // 'property' S VarName S ')' ')' L 'group'
                      this.lookahead9(42240, 1);  // S
                      switch (this.tokenSequence())
                      {
                      case 42243:   // 'property' S VarName S ')' ')' L 'group' S
                        this.lookahead10(42368, 35);  // 'strict'
                        break;
                      }
                      break;
                    case 41651:     // 'property' S VarName S ')' ')' L 'loop'
                      this.lookahead9(42496, 1);  // S
                      switch (this.tokenSequence())
                      {
                      case 42499:   // 'property' S VarName S ')' ')' L 'loop' S
                        this.lookahead10(42624, 51);  // Nr | 'every' | 'forever'
                        break;
                      }
                      break;
                    case 41654:     // 'property' S VarName S ')' ')' L 'note'
                      this.lookahead9(42752, 1);  // S
                      switch (this.tokenSequence())
                      {
                      case 42755:   // 'property' S VarName S ')' ')' L 'note' S
                        this.lookahead10(42880, 31);  // 'over'
                        break;
                      }
                      break;
                    case 41662:     // 'property' S VarName S ')' ')' L 'ref'
                      this.lookahead9(43008, 1);  // S
                      break;
                    }
                    break;
                  case 41475:       // 'property' S VarName S ')' ')' S
                    this.lookahead8(43264, 45); // ')' | ','
                    switch (this.tokenSequence())
                    {
                    case 43278:     // 'property' S VarName S ')' ')' S ')'
                      this.lookahead9(43392, 56); // L | S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 43394:   // 'property' S VarName S ')' ')' S ')' L
                        this.lookahead10(43520, 67);  // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                        break;
                      case 43395:   // 'property' S VarName S ')' ')' S ')' S
                        this.lookahead10(43648, 45);  // ')' | ','
                        break;
                      case 43406:   // 'property' S VarName S ')' ')' S ')' ')'
                        this.lookahead10(43776, 56);  // L | S | ')' | ','
                        break;
                      case 43407:   // 'property' S VarName S ')' ')' S ')' ','
                        this.lookahead10(43904, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 43279:     // 'property' S VarName S ')' ')' S ','
                      this.lookahead9(44032, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 44035:   // 'property' S VarName S ')' ')' S ',' S
                        this.lookahead10(44160, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 44065:   // 'property' S VarName S ')' ')' S ',' 'allOf('
                        this.lookahead10(44288, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 44067:   // 'property' S VarName S ')' ')' S ',' 'anyOf('
                        this.lookahead10(44416, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 44085:   // 'property' S VarName S ')' ')' S ',' 'not('
                        this.lookahead10(44544, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 44088:   // 'property' S VarName S ')' ')' S ',' 'oneOf('
                        this.lookahead10(44672, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 44092:   // 'property' S VarName S ')' ')' S ',' 'property'
                        this.lookahead10(44800, 1); // S
                        break;
                      case 44100:   // 'property' S VarName S ')' ')' S ',' 'variable'
                        this.lookahead10(44928, 1); // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 41486:       // 'property' S VarName S ')' ')' ')'
                    this.lookahead8(45056, 56); // L | S | ')' | ','
                    switch (this.tokenSequence())
                    {
                    case 45058:     // 'property' S VarName S ')' ')' ')' L
                      this.lookahead9(45184, 67); // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                      switch (this.tokenSequence())
                      {
                      case 45203:   // 'property' S VarName S ')' ')' ')' L '...'
                        this.lookahead10(45312, 1); // S
                        break;
                      case 45218:   // 'property' S VarName S ')' ')' ')' L 'alt'
                        this.lookahead10(45440, 1); // S
                        break;
                      case 45233:   // 'property' S VarName S ')' ')' ')' L 'group'
                        this.lookahead10(45568, 1); // S
                        break;
                      case 45235:   // 'property' S VarName S ')' ')' ')' L 'loop'
                        this.lookahead10(45696, 1); // S
                        break;
                      case 45238:   // 'property' S VarName S ')' ')' ')' L 'note'
                        this.lookahead10(45824, 1); // S
                        break;
                      case 45246:   // 'property' S VarName S ')' ')' ')' L 'ref'
                        this.lookahead10(45952, 1); // S
                        break;
                      }
                      break;
                    case 45059:     // 'property' S VarName S ')' ')' ')' S
                      this.lookahead9(46080, 45); // ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 46094:   // 'property' S VarName S ')' ')' ')' S ')'
                        this.lookahead10(46208, 56);  // L | S | ')' | ','
                        break;
                      case 46095:   // 'property' S VarName S ')' ')' ')' S ','
                        this.lookahead10(46336, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 45070:     // 'property' S VarName S ')' ')' ')' ')'
                      this.lookahead9(46464, 56); // L | S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 46466:   // 'property' S VarName S ')' ')' ')' ')' L
                        this.lookahead10(46592, 67);  // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                        break;
                      case 46467:   // 'property' S VarName S ')' ')' ')' ')' S
                        this.lookahead10(46720, 45);  // ')' | ','
                        break;
                      case 46478:   // 'property' S VarName S ')' ')' ')' ')' ')'
                        this.lookahead10(46848, 56);  // L | S | ')' | ','
                        break;
                      case 46479:   // 'property' S VarName S ')' ')' ')' ')' ','
                        this.lookahead10(46976, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 45071:     // 'property' S VarName S ')' ')' ')' ','
                      this.lookahead9(47104, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 47107:   // 'property' S VarName S ')' ')' ')' ',' S
                        this.lookahead10(47232, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 47137:   // 'property' S VarName S ')' ')' ')' ',' 'allOf('
                        this.lookahead10(47360, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 47139:   // 'property' S VarName S ')' ')' ')' ',' 'anyOf('
                        this.lookahead10(47488, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 47157:   // 'property' S VarName S ')' ')' ')' ',' 'not('
                        this.lookahead10(47616, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 47160:   // 'property' S VarName S ')' ')' ')' ',' 'oneOf('
                        this.lookahead10(47744, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 47164:   // 'property' S VarName S ')' ')' ')' ',' 'property'
                        this.lookahead10(47872, 1); // S
                        break;
                      case 47172:   // 'property' S VarName S ')' ')' ')' ',' 'variable'
                        this.lookahead10(48000, 1); // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 41487:       // 'property' S VarName S ')' ')' ','
                    this.lookahead8(48128, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 48131:     // 'property' S VarName S ')' ')' ',' S
                      this.lookahead9(48256, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 48289:   // 'property' S VarName S ')' ')' ',' S 'allOf('
                        this.lookahead10(48384, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 48291:   // 'property' S VarName S ')' ')' ',' S 'anyOf('
                        this.lookahead10(48512, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 48309:   // 'property' S VarName S ')' ')' ',' S 'not('
                        this.lookahead10(48640, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 48312:   // 'property' S VarName S ')' ')' ',' S 'oneOf('
                        this.lookahead10(48768, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 48316:   // 'property' S VarName S ')' ')' ',' S 'property'
                        this.lookahead10(48896, 1); // S
                        break;
                      case 48324:   // 'property' S VarName S ')' ')' ',' S 'variable'
                        this.lookahead10(49024, 1); // S
                        break;
                      }
                      break;
                    case 48161:     // 'property' S VarName S ')' ')' ',' 'allOf('
                      this.lookahead9(49152, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 49155:   // 'property' S VarName S ')' ')' ',' 'allOf(' S
                        this.lookahead10(49280, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 49185:   // 'property' S VarName S ')' ')' ',' 'allOf(' 'allOf('
                        this.lookahead10(49408, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 49187:   // 'property' S VarName S ')' ')' ',' 'allOf(' 'anyOf('
                        this.lookahead10(49536, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 49205:   // 'property' S VarName S ')' ')' ',' 'allOf(' 'not('
                        this.lookahead10(49664, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 49208:   // 'property' S VarName S ')' ')' ',' 'allOf(' 'oneOf('
                        this.lookahead10(49792, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 49212:   // 'property' S VarName S ')' ')' ',' 'allOf(' 'property'
                        this.lookahead10(49920, 1); // S
                        break;
                      case 49220:   // 'property' S VarName S ')' ')' ',' 'allOf(' 'variable'
                        this.lookahead10(50048, 1); // S
                        break;
                      }
                      break;
                    case 48163:     // 'property' S VarName S ')' ')' ',' 'anyOf('
                      this.lookahead9(50176, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 48181:     // 'property' S VarName S ')' ')' ',' 'not('
                      this.lookahead9(51200, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 48184:     // 'property' S VarName S ')' ')' ',' 'oneOf('
                      this.lookahead9(52224, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 48188:     // 'property' S VarName S ')' ')' ',' 'property'
                      this.lookahead9(53248, 1);  // S
                      switch (this.tokenSequence())
                      {
                      case 53251:   // 'property' S VarName S ')' ')' ',' 'property' S
                        this.lookahead10(53376, 5); // VarName
                        break;
                      }
                      break;
                    case 48196:     // 'property' S VarName S ')' ')' ',' 'variable'
                      this.lookahead9(53504, 1);  // S
                      break;
                    }
                    break;
                  }
                  break;
                case 29199:         // 'property' S VarName S ')' ','
                  this.lookahead7(53760, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 53763:       // 'property' S VarName S ')' ',' S
                    this.lookahead8(53888, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 53921:     // 'property' S VarName S ')' ',' S 'allOf('
                      this.lookahead9(54016, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 54019:   // 'property' S VarName S ')' ',' S 'allOf(' S
                        this.lookahead10(54144, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 54049:   // 'property' S VarName S ')' ',' S 'allOf(' 'allOf('
                        this.lookahead10(54272, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 54051:   // 'property' S VarName S ')' ',' S 'allOf(' 'anyOf('
                        this.lookahead10(54400, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 54069:   // 'property' S VarName S ')' ',' S 'allOf(' 'not('
                        this.lookahead10(54528, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 54072:   // 'property' S VarName S ')' ',' S 'allOf(' 'oneOf('
                        this.lookahead10(54656, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 54076:   // 'property' S VarName S ')' ',' S 'allOf(' 'property'
                        this.lookahead10(54784, 1); // S
                        break;
                      case 54084:   // 'property' S VarName S ')' ',' S 'allOf(' 'variable'
                        this.lookahead10(54912, 1); // S
                        break;
                      }
                      break;
                    case 53923:     // 'property' S VarName S ')' ',' S 'anyOf('
                      this.lookahead9(55040, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 53941:     // 'property' S VarName S ')' ',' S 'not('
                      this.lookahead9(56064, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 53944:     // 'property' S VarName S ')' ',' S 'oneOf('
                      this.lookahead9(57088, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 53948:     // 'property' S VarName S ')' ',' S 'property'
                      this.lookahead9(58112, 1);  // S
                      switch (this.tokenSequence())
                      {
                      case 58115:   // 'property' S VarName S ')' ',' S 'property' S
                        this.lookahead10(58240, 5); // VarName
                        break;
                      }
                      break;
                    case 53956:     // 'property' S VarName S ')' ',' S 'variable'
                      this.lookahead9(58368, 1);  // S
                      break;
                    }
                    break;
                  case 53793:       // 'property' S VarName S ')' ',' 'allOf('
                    this.lookahead8(58624, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 58627:     // 'property' S VarName S ')' ',' 'allOf(' S
                      this.lookahead9(58752, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 58785:   // 'property' S VarName S ')' ',' 'allOf(' S 'allOf('
                        this.lookahead10(58880, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 58787:   // 'property' S VarName S ')' ',' 'allOf(' S 'anyOf('
                        this.lookahead10(59008, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 58805:   // 'property' S VarName S ')' ',' 'allOf(' S 'not('
                        this.lookahead10(59136, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 58808:   // 'property' S VarName S ')' ',' 'allOf(' S 'oneOf('
                        this.lookahead10(59264, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 58812:   // 'property' S VarName S ')' ',' 'allOf(' S 'property'
                        this.lookahead10(59392, 1); // S
                        break;
                      case 58820:   // 'property' S VarName S ')' ',' 'allOf(' S 'variable'
                        this.lookahead10(59520, 1); // S
                        break;
                      }
                      break;
                    case 58657:     // 'property' S VarName S ')' ',' 'allOf(' 'allOf('
                      this.lookahead9(59648, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 59651:   // 'property' S VarName S ')' ',' 'allOf(' 'allOf(' S
                        this.lookahead10(59776, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 59681:   // 'property' S VarName S ')' ',' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(59904, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 59683:   // 'property' S VarName S ')' ',' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(60032, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 59701:   // 'property' S VarName S ')' ',' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(60160, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 59704:   // 'property' S VarName S ')' ',' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(60288, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 59708:   // 'property' S VarName S ')' ',' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(60416, 1); // S
                        break;
                      case 59716:   // 'property' S VarName S ')' ',' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(60544, 1); // S
                        break;
                      }
                      break;
                    case 58659:     // 'property' S VarName S ')' ',' 'allOf(' 'anyOf('
                      this.lookahead9(60672, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 58677:     // 'property' S VarName S ')' ',' 'allOf(' 'not('
                      this.lookahead9(61696, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 58680:     // 'property' S VarName S ')' ',' 'allOf(' 'oneOf('
                      this.lookahead9(62720, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 58684:     // 'property' S VarName S ')' ',' 'allOf(' 'property'
                      this.lookahead9(63744, 1);  // S
                      switch (this.tokenSequence())
                      {
                      case 63747:   // 'property' S VarName S ')' ',' 'allOf(' 'property' S
                        this.lookahead10(63872, 5); // VarName
                        break;
                      }
                      break;
                    case 58692:     // 'property' S VarName S ')' ',' 'allOf(' 'variable'
                      this.lookahead9(64000, 1);  // S
                      break;
                    }
                    break;
                  case 53795:       // 'property' S VarName S ')' ',' 'anyOf('
                    this.lookahead8(64256, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    break;
                  case 53813:       // 'property' S VarName S ')' ',' 'not('
                    this.lookahead8(69888, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    break;
                  case 53816:       // 'property' S VarName S ')' ',' 'oneOf('
                    this.lookahead8(75520, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    break;
                  case 53820:       // 'property' S VarName S ')' ',' 'property'
                    this.lookahead8(81152, 1);  // S
                    switch (this.tokenSequence())
                    {
                    case 81155:     // 'property' S VarName S ')' ',' 'property' S
                      this.lookahead9(81280, 5);  // VarName
                      switch (this.tokenSequence())
                      {
                      case 81288:   // 'property' S VarName S ')' ',' 'property' S VarName
                        this.lookahead10(81408, 50);  // S | ')' | ','
                        break;
                      }
                      break;
                    }
                    break;
                  case 53828:       // 'property' S VarName S ')' ',' 'variable'
                    this.lookahead8(81536, 1);  // S
                    break;
                  }
                  break;
                }
                break;
              case 29071:           // 'property' S VarName S ','
                this.lookahead6(81920, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                switch (this.tokenSequence())
                {
                case 81923:         // 'property' S VarName S ',' S
                  this.lookahead7(82048, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 82081:       // 'property' S VarName S ',' S 'allOf('
                    this.lookahead8(82176, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 82179:     // 'property' S VarName S ',' S 'allOf(' S
                      this.lookahead9(82304, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 82337:   // 'property' S VarName S ',' S 'allOf(' S 'allOf('
                        this.lookahead10(82432, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 82339:   // 'property' S VarName S ',' S 'allOf(' S 'anyOf('
                        this.lookahead10(82560, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 82357:   // 'property' S VarName S ',' S 'allOf(' S 'not('
                        this.lookahead10(82688, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 82360:   // 'property' S VarName S ',' S 'allOf(' S 'oneOf('
                        this.lookahead10(82816, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 82364:   // 'property' S VarName S ',' S 'allOf(' S 'property'
                        this.lookahead10(82944, 1); // S
                        break;
                      case 82372:   // 'property' S VarName S ',' S 'allOf(' S 'variable'
                        this.lookahead10(83072, 1); // S
                        break;
                      }
                      break;
                    case 82209:     // 'property' S VarName S ',' S 'allOf(' 'allOf('
                      this.lookahead9(83200, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 83203:   // 'property' S VarName S ',' S 'allOf(' 'allOf(' S
                        this.lookahead10(83328, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 83233:   // 'property' S VarName S ',' S 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(83456, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 83235:   // 'property' S VarName S ',' S 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(83584, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 83253:   // 'property' S VarName S ',' S 'allOf(' 'allOf(' 'not('
                        this.lookahead10(83712, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 83256:   // 'property' S VarName S ',' S 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(83840, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 83260:   // 'property' S VarName S ',' S 'allOf(' 'allOf(' 'property'
                        this.lookahead10(83968, 1); // S
                        break;
                      case 83268:   // 'property' S VarName S ',' S 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(84096, 1); // S
                        break;
                      }
                      break;
                    case 82211:     // 'property' S VarName S ',' S 'allOf(' 'anyOf('
                      this.lookahead9(84224, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 82229:     // 'property' S VarName S ',' S 'allOf(' 'not('
                      this.lookahead9(85248, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 82232:     // 'property' S VarName S ',' S 'allOf(' 'oneOf('
                      this.lookahead9(86272, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                      break;
                    case 82236:     // 'property' S VarName S ',' S 'allOf(' 'property'
                      this.lookahead9(87296, 1);  // S
                      switch (this.tokenSequence())
                      {
                      case 87299:   // 'property' S VarName S ',' S 'allOf(' 'property' S
                        this.lookahead10(87424, 5); // VarName
                        break;
                      }
                      break;
                    case 82244:     // 'property' S VarName S ',' S 'allOf(' 'variable'
                      this.lookahead9(87552, 1);  // S
                      break;
                    }
                    break;
                  case 82083:       // 'property' S VarName S ',' S 'anyOf('
                    this.lookahead8(87808, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    break;
                  case 82101:       // 'property' S VarName S ',' S 'not('
                    this.lookahead8(93440, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    break;
                  case 82104:       // 'property' S VarName S ',' S 'oneOf('
                    this.lookahead8(99072, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    break;
                  case 82108:       // 'property' S VarName S ',' S 'property'
                    this.lookahead8(104704, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 104707:    // 'property' S VarName S ',' S 'property' S
                      this.lookahead9(104832, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 104840:  // 'property' S VarName S ',' S 'property' S VarName
                        this.lookahead10(104960, 50); // S | ')' | ','
                        break;
                      }
                      break;
                    }
                    break;
                  case 82116:       // 'property' S VarName S ',' S 'variable'
                    this.lookahead8(105088, 1); // S
                    break;
                  }
                  break;
                case 81953:         // 'property' S VarName S ',' 'allOf('
                  this.lookahead7(105472, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 105475:      // 'property' S VarName S ',' 'allOf(' S
                    this.lookahead8(105600, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 105633:    // 'property' S VarName S ',' 'allOf(' S 'allOf('
                      this.lookahead9(105728, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 105731:  // 'property' S VarName S ',' 'allOf(' S 'allOf(' S
                        this.lookahead10(105856, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 105761:  // 'property' S VarName S ',' 'allOf(' S 'allOf(' 'allOf('
                        this.lookahead10(105984, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 105763:  // 'property' S VarName S ',' 'allOf(' S 'allOf(' 'anyOf('
                        this.lookahead10(106112, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 105781:  // 'property' S VarName S ',' 'allOf(' S 'allOf(' 'not('
                        this.lookahead10(106240, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 105784:  // 'property' S VarName S ',' 'allOf(' S 'allOf(' 'oneOf('
                        this.lookahead10(106368, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 105788:  // 'property' S VarName S ',' 'allOf(' S 'allOf(' 'property'
                        this.lookahead10(106496, 1);  // S
                        break;
                      case 105796:  // 'property' S VarName S ',' 'allOf(' S 'allOf(' 'variable'
                        this.lookahead10(106624, 1);  // S
                        break;
                      }
                      break;
                    case 105635:    // 'property' S VarName S ',' 'allOf(' S 'anyOf('
                      this.lookahead9(106752, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 105653:    // 'property' S VarName S ',' 'allOf(' S 'not('
                      this.lookahead9(107776, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 105656:    // 'property' S VarName S ',' 'allOf(' S 'oneOf('
                      this.lookahead9(108800, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 105660:    // 'property' S VarName S ',' 'allOf(' S 'property'
                      this.lookahead9(109824, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 109827:  // 'property' S VarName S ',' 'allOf(' S 'property' S
                        this.lookahead10(109952, 5);  // VarName
                        break;
                      }
                      break;
                    case 105668:    // 'property' S VarName S ',' 'allOf(' S 'variable'
                      this.lookahead9(110080, 1); // S
                      break;
                    }
                    break;
                  case 105505:      // 'property' S VarName S ',' 'allOf(' 'allOf('
                    this.lookahead8(110336, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 110339:    // 'property' S VarName S ',' 'allOf(' 'allOf(' S
                      this.lookahead9(110464, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 110497:  // 'property' S VarName S ',' 'allOf(' 'allOf(' S 'allOf('
                        this.lookahead10(110592, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 110499:  // 'property' S VarName S ',' 'allOf(' 'allOf(' S 'anyOf('
                        this.lookahead10(110720, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 110517:  // 'property' S VarName S ',' 'allOf(' 'allOf(' S 'not('
                        this.lookahead10(110848, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 110520:  // 'property' S VarName S ',' 'allOf(' 'allOf(' S 'oneOf('
                        this.lookahead10(110976, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 110524:  // 'property' S VarName S ',' 'allOf(' 'allOf(' S 'property'
                        this.lookahead10(111104, 1);  // S
                        break;
                      case 110532:  // 'property' S VarName S ',' 'allOf(' 'allOf(' S 'variable'
                        this.lookahead10(111232, 1);  // S
                        break;
                      }
                      break;
                    case 110369:    // 'property' S VarName S ',' 'allOf(' 'allOf(' 'allOf('
                      this.lookahead9(111360, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 111363:  // 'property' S VarName S ',' 'allOf(' 'allOf(' 'allOf(' S
                        this.lookahead10(111488, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 111393:  // 'property' S VarName S ',' 'allOf(' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(111616, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 111395:  // 'property' S VarName S ',' 'allOf(' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(111744, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 111413:  // 'property' S VarName S ',' 'allOf(' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(111872, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 111416:  // 'property' S VarName S ',' 'allOf(' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(112000, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 111420:  // 'property' S VarName S ',' 'allOf(' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(112128, 1);  // S
                        break;
                      case 111428:  // 'property' S VarName S ',' 'allOf(' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(112256, 1);  // S
                        break;
                      }
                      break;
                    case 110371:    // 'property' S VarName S ',' 'allOf(' 'allOf(' 'anyOf('
                      this.lookahead9(112384, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 110389:    // 'property' S VarName S ',' 'allOf(' 'allOf(' 'not('
                      this.lookahead9(113408, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 110392:    // 'property' S VarName S ',' 'allOf(' 'allOf(' 'oneOf('
                      this.lookahead9(114432, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 110396:    // 'property' S VarName S ',' 'allOf(' 'allOf(' 'property'
                      this.lookahead9(115456, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 115459:  // 'property' S VarName S ',' 'allOf(' 'allOf(' 'property' S
                        this.lookahead10(115584, 5);  // VarName
                        break;
                      }
                      break;
                    case 110404:    // 'property' S VarName S ',' 'allOf(' 'allOf(' 'variable'
                      this.lookahead9(115712, 1); // S
                      break;
                    }
                    break;
                  case 105507:      // 'property' S VarName S ',' 'allOf(' 'anyOf('
                    this.lookahead8(115968, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 105525:      // 'property' S VarName S ',' 'allOf(' 'not('
                    this.lookahead8(121600, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 105528:      // 'property' S VarName S ',' 'allOf(' 'oneOf('
                    this.lookahead8(127232, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 105532:      // 'property' S VarName S ',' 'allOf(' 'property'
                    this.lookahead8(132864, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 132867:    // 'property' S VarName S ',' 'allOf(' 'property' S
                      this.lookahead9(132992, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 133000:  // 'property' S VarName S ',' 'allOf(' 'property' S VarName
                        this.lookahead10(133120, 50); // S | ')' | ','
                        break;
                      }
                      break;
                    }
                    break;
                  case 105540:      // 'property' S VarName S ',' 'allOf(' 'variable'
                    this.lookahead8(133248, 1); // S
                    break;
                  }
                  break;
                case 81955:         // 'property' S VarName S ',' 'anyOf('
                  this.lookahead7(133632, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  break;
                case 81973:         // 'property' S VarName S ',' 'not('
                  this.lookahead7(161792, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 161795:      // 'property' S VarName S ',' 'not(' S
                    this.lookahead8(161920, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 161953:    // 'property' S VarName S ',' 'not(' S 'allOf('
                      this.lookahead9(162048, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 162051:  // 'property' S VarName S ',' 'not(' S 'allOf(' S
                        this.lookahead10(162176, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 162081:  // 'property' S VarName S ',' 'not(' S 'allOf(' 'allOf('
                        this.lookahead10(162304, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 162083:  // 'property' S VarName S ',' 'not(' S 'allOf(' 'anyOf('
                        this.lookahead10(162432, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 162101:  // 'property' S VarName S ',' 'not(' S 'allOf(' 'not('
                        this.lookahead10(162560, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 162104:  // 'property' S VarName S ',' 'not(' S 'allOf(' 'oneOf('
                        this.lookahead10(162688, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 162108:  // 'property' S VarName S ',' 'not(' S 'allOf(' 'property'
                        this.lookahead10(162816, 1);  // S
                        break;
                      case 162116:  // 'property' S VarName S ',' 'not(' S 'allOf(' 'variable'
                        this.lookahead10(162944, 1);  // S
                        break;
                      }
                      break;
                    case 161955:    // 'property' S VarName S ',' 'not(' S 'anyOf('
                      this.lookahead9(163072, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 161973:    // 'property' S VarName S ',' 'not(' S 'not('
                      this.lookahead9(164096, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 161976:    // 'property' S VarName S ',' 'not(' S 'oneOf('
                      this.lookahead9(165120, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 161980:    // 'property' S VarName S ',' 'not(' S 'property'
                      this.lookahead9(166144, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 166147:  // 'property' S VarName S ',' 'not(' S 'property' S
                        this.lookahead10(166272, 5);  // VarName
                        break;
                      }
                      break;
                    case 161988:    // 'property' S VarName S ',' 'not(' S 'variable'
                      this.lookahead9(166400, 1); // S
                      break;
                    }
                    break;
                  case 161825:      // 'property' S VarName S ',' 'not(' 'allOf('
                    this.lookahead8(166656, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 166659:    // 'property' S VarName S ',' 'not(' 'allOf(' S
                      this.lookahead9(166784, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 166817:  // 'property' S VarName S ',' 'not(' 'allOf(' S 'allOf('
                        this.lookahead10(166912, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 166819:  // 'property' S VarName S ',' 'not(' 'allOf(' S 'anyOf('
                        this.lookahead10(167040, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 166837:  // 'property' S VarName S ',' 'not(' 'allOf(' S 'not('
                        this.lookahead10(167168, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 166840:  // 'property' S VarName S ',' 'not(' 'allOf(' S 'oneOf('
                        this.lookahead10(167296, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 166844:  // 'property' S VarName S ',' 'not(' 'allOf(' S 'property'
                        this.lookahead10(167424, 1);  // S
                        break;
                      case 166852:  // 'property' S VarName S ',' 'not(' 'allOf(' S 'variable'
                        this.lookahead10(167552, 1);  // S
                        break;
                      }
                      break;
                    case 166689:    // 'property' S VarName S ',' 'not(' 'allOf(' 'allOf('
                      this.lookahead9(167680, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 167683:  // 'property' S VarName S ',' 'not(' 'allOf(' 'allOf(' S
                        this.lookahead10(167808, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 167713:  // 'property' S VarName S ',' 'not(' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(167936, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 167715:  // 'property' S VarName S ',' 'not(' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(168064, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 167733:  // 'property' S VarName S ',' 'not(' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(168192, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 167736:  // 'property' S VarName S ',' 'not(' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(168320, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 167740:  // 'property' S VarName S ',' 'not(' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(168448, 1);  // S
                        break;
                      case 167748:  // 'property' S VarName S ',' 'not(' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(168576, 1);  // S
                        break;
                      }
                      break;
                    case 166691:    // 'property' S VarName S ',' 'not(' 'allOf(' 'anyOf('
                      this.lookahead9(168704, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 166709:    // 'property' S VarName S ',' 'not(' 'allOf(' 'not('
                      this.lookahead9(169728, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 166712:    // 'property' S VarName S ',' 'not(' 'allOf(' 'oneOf('
                      this.lookahead9(170752, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 166716:    // 'property' S VarName S ',' 'not(' 'allOf(' 'property'
                      this.lookahead9(171776, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 171779:  // 'property' S VarName S ',' 'not(' 'allOf(' 'property' S
                        this.lookahead10(171904, 5);  // VarName
                        break;
                      }
                      break;
                    case 166724:    // 'property' S VarName S ',' 'not(' 'allOf(' 'variable'
                      this.lookahead9(172032, 1); // S
                      break;
                    }
                    break;
                  case 161827:      // 'property' S VarName S ',' 'not(' 'anyOf('
                    this.lookahead8(172288, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 161845:      // 'property' S VarName S ',' 'not(' 'not('
                    this.lookahead8(177920, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 161848:      // 'property' S VarName S ',' 'not(' 'oneOf('
                    this.lookahead8(183552, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 161852:      // 'property' S VarName S ',' 'not(' 'property'
                    this.lookahead8(189184, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 189187:    // 'property' S VarName S ',' 'not(' 'property' S
                      this.lookahead9(189312, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 189320:  // 'property' S VarName S ',' 'not(' 'property' S VarName
                        this.lookahead10(189440, 41); // S | ')'
                        break;
                      }
                      break;
                    }
                    break;
                  case 161860:      // 'property' S VarName S ',' 'not(' 'variable'
                    this.lookahead8(189568, 1); // S
                    break;
                  }
                  break;
                case 81976:         // 'property' S VarName S ',' 'oneOf('
                  this.lookahead7(189952, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  break;
                case 81980:         // 'property' S VarName S ',' 'property'
                  this.lookahead7(218112, 1); // S
                  switch (this.tokenSequence())
                  {
                  case 218115:      // 'property' S VarName S ',' 'property' S
                    this.lookahead8(218240, 5); // VarName
                    switch (this.tokenSequence())
                    {
                    case 218248:    // 'property' S VarName S ',' 'property' S VarName
                      this.lookahead9(218368, 50);  // S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 218371:  // 'property' S VarName S ',' 'property' S VarName S
                        this.lookahead10(218496, 70); // ')' | ',' | '<' | '<=' | '==' | '>' | '>='
                        break;
                      case 218382:  // 'property' S VarName S ',' 'property' S VarName ')'
                        this.lookahead10(218624, 56); // L | S | ')' | ','
                        break;
                      case 218383:  // 'property' S VarName S ',' 'property' S VarName ','
                        this.lookahead10(218752, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                case 81988:         // 'property' S VarName S ',' 'variable'
                  this.lookahead7(218880, 1); // S
                  break;
                }
                break;
              }
              break;
            case 398:               // 'property' S VarName ')'
              this.lookahead5(219648, 56);  // L | S | ')' | ','
              switch (this.tokenSequence())
              {
              case 219650:          // 'property' S VarName ')' L
                this.lookahead6(219776, 67);  // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                switch (this.tokenSequence())
                {
                case 219795:        // 'property' S VarName ')' L '...'
                  this.lookahead7(219904, 1); // S
                  switch (this.tokenSequence())
                  {
                  case 219907:      // 'property' S VarName ')' L '...' S
                    this.lookahead8(220032, 36);  // 'wait'
                    switch (this.tokenSequence())
                    {
                    case 220101:    // 'property' S VarName ')' L '...' S 'wait'
                      this.lookahead9(220160, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 220163:  // 'property' S VarName ')' L '...' S 'wait' S
                        this.lookahead10(220288, 6);  // Nr
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                case 219810:        // 'property' S VarName ')' L 'alt'
                  this.lookahead7(220416, 1); // S
                  switch (this.tokenSequence())
                  {
                  case 220419:      // 'property' S VarName ')' L 'alt' S
                    this.lookahead8(220544, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 220577:    // 'property' S VarName ')' L 'alt' S 'allOf('
                      this.lookahead9(220672, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 220675:  // 'property' S VarName ')' L 'alt' S 'allOf(' S
                        this.lookahead10(220800, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 220705:  // 'property' S VarName ')' L 'alt' S 'allOf(' 'allOf('
                        this.lookahead10(220928, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 220707:  // 'property' S VarName ')' L 'alt' S 'allOf(' 'anyOf('
                        this.lookahead10(221056, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 220725:  // 'property' S VarName ')' L 'alt' S 'allOf(' 'not('
                        this.lookahead10(221184, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 220728:  // 'property' S VarName ')' L 'alt' S 'allOf(' 'oneOf('
                        this.lookahead10(221312, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 220732:  // 'property' S VarName ')' L 'alt' S 'allOf(' 'property'
                        this.lookahead10(221440, 1);  // S
                        break;
                      case 220740:  // 'property' S VarName ')' L 'alt' S 'allOf(' 'variable'
                        this.lookahead10(221568, 1);  // S
                        break;
                      }
                      break;
                    case 220579:    // 'property' S VarName ')' L 'alt' S 'anyOf('
                      this.lookahead9(221696, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 220597:    // 'property' S VarName ')' L 'alt' S 'not('
                      this.lookahead9(222720, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 220600:    // 'property' S VarName ')' L 'alt' S 'oneOf('
                      this.lookahead9(223744, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 220604:    // 'property' S VarName ')' L 'alt' S 'property'
                      this.lookahead9(224768, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 224771:  // 'property' S VarName ')' L 'alt' S 'property' S
                        this.lookahead10(224896, 5);  // VarName
                        break;
                      }
                      break;
                    case 220612:    // 'property' S VarName ')' L 'alt' S 'variable'
                      this.lookahead9(225024, 1); // S
                      break;
                    }
                    break;
                  }
                  break;
                case 219825:        // 'property' S VarName ')' L 'group'
                  this.lookahead7(225280, 1); // S
                  switch (this.tokenSequence())
                  {
                  case 225283:      // 'property' S VarName ')' L 'group' S
                    this.lookahead8(225408, 35);  // 'strict'
                    switch (this.tokenSequence())
                    {
                    case 225473:    // 'property' S VarName ')' L 'group' S 'strict'
                      this.lookahead9(225536, 0); // L
                      switch (this.tokenSequence())
                      {
                      case 225538:  // 'property' S VarName ')' L 'group' S 'strict' L
                        this.lookahead10(225664, 32); // 'par'
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                case 219827:        // 'property' S VarName ')' L 'loop'
                  this.lookahead7(225792, 1); // S
                  switch (this.tokenSequence())
                  {
                  case 225795:      // 'property' S VarName ')' L 'loop' S
                    this.lookahead8(225920, 51);  // Nr | 'every' | 'forever'
                    switch (this.tokenSequence())
                    {
                    case 225930:    // 'property' S VarName ')' L 'loop' S Nr
                      this.lookahead9(226048, 37);  // 'x'
                      switch (this.tokenSequence())
                      {
                      case 226119:  // 'property' S VarName ')' L 'loop' S Nr 'x'
                        this.lookahead10(226176, 0);  // L
                        break;
                      }
                      break;
                    case 225964:    // 'property' S VarName ')' L 'loop' S 'every'
                      this.lookahead9(226304, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 226307:  // 'property' S VarName ')' L 'loop' S 'every' S
                        this.lookahead10(226432, 6);  // Nr
                        break;
                      }
                      break;
                    case 225966:    // 'property' S VarName ')' L 'loop' S 'forever'
                      this.lookahead9(226560, 0); // L
                      switch (this.tokenSequence())
                      {
                      case 226562:  // 'property' S VarName ')' L 'loop' S 'forever' L
                        this.lookahead10(226688, 67); // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                case 219830:        // 'property' S VarName ')' L 'note'
                  this.lookahead7(226816, 1); // S
                  switch (this.tokenSequence())
                  {
                  case 226819:      // 'property' S VarName ')' L 'note' S
                    this.lookahead8(226944, 31);  // 'over'
                    switch (this.tokenSequence())
                    {
                    case 227002:    // 'property' S VarName ')' L 'note' S 'over'
                      this.lookahead9(227072, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 227075:  // 'property' S VarName ')' L 'note' S 'over' S
                        this.lookahead10(227200, 44); // '"' | 'Agent'
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                case 219838:        // 'property' S VarName ')' L 'ref'
                  this.lookahead7(227328, 1); // S
                  break;
                }
                break;
              case 219651:          // 'property' S VarName ')' S
                this.lookahead6(227840, 45);  // ')' | ','
                switch (this.tokenSequence())
                {
                case 227854:        // 'property' S VarName ')' S ')'
                  this.lookahead7(227968, 56);  // L | S | ')' | ','
                  switch (this.tokenSequence())
                  {
                  case 227970:      // 'property' S VarName ')' S ')' L
                    this.lookahead8(228096, 67);  // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                    switch (this.tokenSequence())
                    {
                    case 228115:    // 'property' S VarName ')' S ')' L '...'
                      this.lookahead9(228224, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 228227:  // 'property' S VarName ')' S ')' L '...' S
                        this.lookahead10(228352, 36); // 'wait'
                        break;
                      }
                      break;
                    case 228130:    // 'property' S VarName ')' S ')' L 'alt'
                      this.lookahead9(228480, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 228483:  // 'property' S VarName ')' S ')' L 'alt' S
                        this.lookahead10(228608, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 228145:    // 'property' S VarName ')' S ')' L 'group'
                      this.lookahead9(228736, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 228739:  // 'property' S VarName ')' S ')' L 'group' S
                        this.lookahead10(228864, 35); // 'strict'
                        break;
                      }
                      break;
                    case 228147:    // 'property' S VarName ')' S ')' L 'loop'
                      this.lookahead9(228992, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 228995:  // 'property' S VarName ')' S ')' L 'loop' S
                        this.lookahead10(229120, 51); // Nr | 'every' | 'forever'
                        break;
                      }
                      break;
                    case 228150:    // 'property' S VarName ')' S ')' L 'note'
                      this.lookahead9(229248, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 229251:  // 'property' S VarName ')' S ')' L 'note' S
                        this.lookahead10(229376, 31); // 'over'
                        break;
                      }
                      break;
                    case 228158:    // 'property' S VarName ')' S ')' L 'ref'
                      this.lookahead9(229504, 1); // S
                      break;
                    }
                    break;
                  case 227971:      // 'property' S VarName ')' S ')' S
                    this.lookahead8(229760, 45);  // ')' | ','
                    switch (this.tokenSequence())
                    {
                    case 229774:    // 'property' S VarName ')' S ')' S ')'
                      this.lookahead9(229888, 56);  // L | S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 229890:  // 'property' S VarName ')' S ')' S ')' L
                        this.lookahead10(230016, 67); // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                        break;
                      case 229891:  // 'property' S VarName ')' S ')' S ')' S
                        this.lookahead10(230144, 45); // ')' | ','
                        break;
                      case 229902:  // 'property' S VarName ')' S ')' S ')' ')'
                        this.lookahead10(230272, 56); // L | S | ')' | ','
                        break;
                      case 229903:  // 'property' S VarName ')' S ')' S ')' ','
                        this.lookahead10(230400, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 229775:    // 'property' S VarName ')' S ')' S ','
                      this.lookahead9(230528, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 230531:  // 'property' S VarName ')' S ')' S ',' S
                        this.lookahead10(230656, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 230561:  // 'property' S VarName ')' S ')' S ',' 'allOf('
                        this.lookahead10(230784, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 230563:  // 'property' S VarName ')' S ')' S ',' 'anyOf('
                        this.lookahead10(230912, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 230581:  // 'property' S VarName ')' S ')' S ',' 'not('
                        this.lookahead10(231040, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 230584:  // 'property' S VarName ')' S ')' S ',' 'oneOf('
                        this.lookahead10(231168, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 230588:  // 'property' S VarName ')' S ')' S ',' 'property'
                        this.lookahead10(231296, 1);  // S
                        break;
                      case 230596:  // 'property' S VarName ')' S ')' S ',' 'variable'
                        this.lookahead10(231424, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 227982:      // 'property' S VarName ')' S ')' ')'
                    this.lookahead8(231552, 56);  // L | S | ')' | ','
                    switch (this.tokenSequence())
                    {
                    case 231554:    // 'property' S VarName ')' S ')' ')' L
                      this.lookahead9(231680, 67);  // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                      switch (this.tokenSequence())
                      {
                      case 231699:  // 'property' S VarName ')' S ')' ')' L '...'
                        this.lookahead10(231808, 1);  // S
                        break;
                      case 231714:  // 'property' S VarName ')' S ')' ')' L 'alt'
                        this.lookahead10(231936, 1);  // S
                        break;
                      case 231729:  // 'property' S VarName ')' S ')' ')' L 'group'
                        this.lookahead10(232064, 1);  // S
                        break;
                      case 231731:  // 'property' S VarName ')' S ')' ')' L 'loop'
                        this.lookahead10(232192, 1);  // S
                        break;
                      case 231734:  // 'property' S VarName ')' S ')' ')' L 'note'
                        this.lookahead10(232320, 1);  // S
                        break;
                      case 231742:  // 'property' S VarName ')' S ')' ')' L 'ref'
                        this.lookahead10(232448, 1);  // S
                        break;
                      }
                      break;
                    case 231555:    // 'property' S VarName ')' S ')' ')' S
                      this.lookahead9(232576, 45);  // ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 232590:  // 'property' S VarName ')' S ')' ')' S ')'
                        this.lookahead10(232704, 56); // L | S | ')' | ','
                        break;
                      case 232591:  // 'property' S VarName ')' S ')' ')' S ','
                        this.lookahead10(232832, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 231566:    // 'property' S VarName ')' S ')' ')' ')'
                      this.lookahead9(232960, 56);  // L | S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 232962:  // 'property' S VarName ')' S ')' ')' ')' L
                        this.lookahead10(233088, 67); // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                        break;
                      case 232963:  // 'property' S VarName ')' S ')' ')' ')' S
                        this.lookahead10(233216, 45); // ')' | ','
                        break;
                      case 232974:  // 'property' S VarName ')' S ')' ')' ')' ')'
                        this.lookahead10(233344, 56); // L | S | ')' | ','
                        break;
                      case 232975:  // 'property' S VarName ')' S ')' ')' ')' ','
                        this.lookahead10(233472, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 231567:    // 'property' S VarName ')' S ')' ')' ','
                      this.lookahead9(233600, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 233603:  // 'property' S VarName ')' S ')' ')' ',' S
                        this.lookahead10(233728, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 233633:  // 'property' S VarName ')' S ')' ')' ',' 'allOf('
                        this.lookahead10(233856, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 233635:  // 'property' S VarName ')' S ')' ')' ',' 'anyOf('
                        this.lookahead10(233984, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 233653:  // 'property' S VarName ')' S ')' ')' ',' 'not('
                        this.lookahead10(234112, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 233656:  // 'property' S VarName ')' S ')' ')' ',' 'oneOf('
                        this.lookahead10(234240, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 233660:  // 'property' S VarName ')' S ')' ')' ',' 'property'
                        this.lookahead10(234368, 1);  // S
                        break;
                      case 233668:  // 'property' S VarName ')' S ')' ')' ',' 'variable'
                        this.lookahead10(234496, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 227983:      // 'property' S VarName ')' S ')' ','
                    this.lookahead8(234624, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 234627:    // 'property' S VarName ')' S ')' ',' S
                      this.lookahead9(234752, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 234785:  // 'property' S VarName ')' S ')' ',' S 'allOf('
                        this.lookahead10(234880, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 234787:  // 'property' S VarName ')' S ')' ',' S 'anyOf('
                        this.lookahead10(235008, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 234805:  // 'property' S VarName ')' S ')' ',' S 'not('
                        this.lookahead10(235136, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 234808:  // 'property' S VarName ')' S ')' ',' S 'oneOf('
                        this.lookahead10(235264, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 234812:  // 'property' S VarName ')' S ')' ',' S 'property'
                        this.lookahead10(235392, 1);  // S
                        break;
                      case 234820:  // 'property' S VarName ')' S ')' ',' S 'variable'
                        this.lookahead10(235520, 1);  // S
                        break;
                      }
                      break;
                    case 234657:    // 'property' S VarName ')' S ')' ',' 'allOf('
                      this.lookahead9(235648, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 235651:  // 'property' S VarName ')' S ')' ',' 'allOf(' S
                        this.lookahead10(235776, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 235681:  // 'property' S VarName ')' S ')' ',' 'allOf(' 'allOf('
                        this.lookahead10(235904, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 235683:  // 'property' S VarName ')' S ')' ',' 'allOf(' 'anyOf('
                        this.lookahead10(236032, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 235701:  // 'property' S VarName ')' S ')' ',' 'allOf(' 'not('
                        this.lookahead10(236160, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 235704:  // 'property' S VarName ')' S ')' ',' 'allOf(' 'oneOf('
                        this.lookahead10(236288, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 235708:  // 'property' S VarName ')' S ')' ',' 'allOf(' 'property'
                        this.lookahead10(236416, 1);  // S
                        break;
                      case 235716:  // 'property' S VarName ')' S ')' ',' 'allOf(' 'variable'
                        this.lookahead10(236544, 1);  // S
                        break;
                      }
                      break;
                    case 234659:    // 'property' S VarName ')' S ')' ',' 'anyOf('
                      this.lookahead9(236672, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 234677:    // 'property' S VarName ')' S ')' ',' 'not('
                      this.lookahead9(237696, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 234680:    // 'property' S VarName ')' S ')' ',' 'oneOf('
                      this.lookahead9(238720, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 234684:    // 'property' S VarName ')' S ')' ',' 'property'
                      this.lookahead9(239744, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 239747:  // 'property' S VarName ')' S ')' ',' 'property' S
                        this.lookahead10(239872, 5);  // VarName
                        break;
                      }
                      break;
                    case 234692:    // 'property' S VarName ')' S ')' ',' 'variable'
                      this.lookahead9(240000, 1); // S
                      break;
                    }
                    break;
                  }
                  break;
                case 227855:        // 'property' S VarName ')' S ','
                  this.lookahead7(240256, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 240259:      // 'property' S VarName ')' S ',' S
                    this.lookahead8(240384, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 240417:    // 'property' S VarName ')' S ',' S 'allOf('
                      this.lookahead9(240512, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 240515:  // 'property' S VarName ')' S ',' S 'allOf(' S
                        this.lookahead10(240640, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 240545:  // 'property' S VarName ')' S ',' S 'allOf(' 'allOf('
                        this.lookahead10(240768, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 240547:  // 'property' S VarName ')' S ',' S 'allOf(' 'anyOf('
                        this.lookahead10(240896, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 240565:  // 'property' S VarName ')' S ',' S 'allOf(' 'not('
                        this.lookahead10(241024, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 240568:  // 'property' S VarName ')' S ',' S 'allOf(' 'oneOf('
                        this.lookahead10(241152, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 240572:  // 'property' S VarName ')' S ',' S 'allOf(' 'property'
                        this.lookahead10(241280, 1);  // S
                        break;
                      case 240580:  // 'property' S VarName ')' S ',' S 'allOf(' 'variable'
                        this.lookahead10(241408, 1);  // S
                        break;
                      }
                      break;
                    case 240419:    // 'property' S VarName ')' S ',' S 'anyOf('
                      this.lookahead9(241536, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 240437:    // 'property' S VarName ')' S ',' S 'not('
                      this.lookahead9(242560, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 240440:    // 'property' S VarName ')' S ',' S 'oneOf('
                      this.lookahead9(243584, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 240444:    // 'property' S VarName ')' S ',' S 'property'
                      this.lookahead9(244608, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 244611:  // 'property' S VarName ')' S ',' S 'property' S
                        this.lookahead10(244736, 5);  // VarName
                        break;
                      }
                      break;
                    case 240452:    // 'property' S VarName ')' S ',' S 'variable'
                      this.lookahead9(244864, 1); // S
                      break;
                    }
                    break;
                  case 240289:      // 'property' S VarName ')' S ',' 'allOf('
                    this.lookahead8(245120, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 245123:    // 'property' S VarName ')' S ',' 'allOf(' S
                      this.lookahead9(245248, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 245281:  // 'property' S VarName ')' S ',' 'allOf(' S 'allOf('
                        this.lookahead10(245376, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 245283:  // 'property' S VarName ')' S ',' 'allOf(' S 'anyOf('
                        this.lookahead10(245504, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 245301:  // 'property' S VarName ')' S ',' 'allOf(' S 'not('
                        this.lookahead10(245632, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 245304:  // 'property' S VarName ')' S ',' 'allOf(' S 'oneOf('
                        this.lookahead10(245760, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 245308:  // 'property' S VarName ')' S ',' 'allOf(' S 'property'
                        this.lookahead10(245888, 1);  // S
                        break;
                      case 245316:  // 'property' S VarName ')' S ',' 'allOf(' S 'variable'
                        this.lookahead10(246016, 1);  // S
                        break;
                      }
                      break;
                    case 245153:    // 'property' S VarName ')' S ',' 'allOf(' 'allOf('
                      this.lookahead9(246144, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 246147:  // 'property' S VarName ')' S ',' 'allOf(' 'allOf(' S
                        this.lookahead10(246272, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 246177:  // 'property' S VarName ')' S ',' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(246400, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 246179:  // 'property' S VarName ')' S ',' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(246528, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 246197:  // 'property' S VarName ')' S ',' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(246656, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 246200:  // 'property' S VarName ')' S ',' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(246784, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 246204:  // 'property' S VarName ')' S ',' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(246912, 1);  // S
                        break;
                      case 246212:  // 'property' S VarName ')' S ',' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(247040, 1);  // S
                        break;
                      }
                      break;
                    case 245155:    // 'property' S VarName ')' S ',' 'allOf(' 'anyOf('
                      this.lookahead9(247168, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 245173:    // 'property' S VarName ')' S ',' 'allOf(' 'not('
                      this.lookahead9(248192, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 245176:    // 'property' S VarName ')' S ',' 'allOf(' 'oneOf('
                      this.lookahead9(249216, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 245180:    // 'property' S VarName ')' S ',' 'allOf(' 'property'
                      this.lookahead9(250240, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 250243:  // 'property' S VarName ')' S ',' 'allOf(' 'property' S
                        this.lookahead10(250368, 5);  // VarName
                        break;
                      }
                      break;
                    case 245188:    // 'property' S VarName ')' S ',' 'allOf(' 'variable'
                      this.lookahead9(250496, 1); // S
                      break;
                    }
                    break;
                  case 240291:      // 'property' S VarName ')' S ',' 'anyOf('
                    this.lookahead8(250752, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 240309:      // 'property' S VarName ')' S ',' 'not('
                    this.lookahead8(256384, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 240312:      // 'property' S VarName ')' S ',' 'oneOf('
                    this.lookahead8(262016, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 240316:      // 'property' S VarName ')' S ',' 'property'
                    this.lookahead8(267648, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 267651:    // 'property' S VarName ')' S ',' 'property' S
                      this.lookahead9(267776, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 267784:  // 'property' S VarName ')' S ',' 'property' S VarName
                        this.lookahead10(267904, 50); // S | ')' | ','
                        break;
                      }
                      break;
                    }
                    break;
                  case 240324:      // 'property' S VarName ')' S ',' 'variable'
                    this.lookahead8(268032, 1); // S
                    break;
                  }
                  break;
                }
                break;
              case 219662:          // 'property' S VarName ')' ')'
                this.lookahead6(268416, 56);  // L | S | ')' | ','
                switch (this.tokenSequence())
                {
                case 268418:        // 'property' S VarName ')' ')' L
                  this.lookahead7(268544, 67);  // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                  switch (this.tokenSequence())
                  {
                  case 268563:      // 'property' S VarName ')' ')' L '...'
                    this.lookahead8(268672, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 268675:    // 'property' S VarName ')' ')' L '...' S
                      this.lookahead9(268800, 36);  // 'wait'
                      switch (this.tokenSequence())
                      {
                      case 268869:  // 'property' S VarName ')' ')' L '...' S 'wait'
                        this.lookahead10(268928, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 268578:      // 'property' S VarName ')' ')' L 'alt'
                    this.lookahead8(269056, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 269059:    // 'property' S VarName ')' ')' L 'alt' S
                      this.lookahead9(269184, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 269217:  // 'property' S VarName ')' ')' L 'alt' S 'allOf('
                        this.lookahead10(269312, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 269219:  // 'property' S VarName ')' ')' L 'alt' S 'anyOf('
                        this.lookahead10(269440, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 269237:  // 'property' S VarName ')' ')' L 'alt' S 'not('
                        this.lookahead10(269568, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 269240:  // 'property' S VarName ')' ')' L 'alt' S 'oneOf('
                        this.lookahead10(269696, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 269244:  // 'property' S VarName ')' ')' L 'alt' S 'property'
                        this.lookahead10(269824, 1);  // S
                        break;
                      case 269252:  // 'property' S VarName ')' ')' L 'alt' S 'variable'
                        this.lookahead10(269952, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 268593:      // 'property' S VarName ')' ')' L 'group'
                    this.lookahead8(270080, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 270083:    // 'property' S VarName ')' ')' L 'group' S
                      this.lookahead9(270208, 35);  // 'strict'
                      switch (this.tokenSequence())
                      {
                      case 270273:  // 'property' S VarName ')' ')' L 'group' S 'strict'
                        this.lookahead10(270336, 0);  // L
                        break;
                      }
                      break;
                    }
                    break;
                  case 268595:      // 'property' S VarName ')' ')' L 'loop'
                    this.lookahead8(270464, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 270467:    // 'property' S VarName ')' ')' L 'loop' S
                      this.lookahead9(270592, 51);  // Nr | 'every' | 'forever'
                      switch (this.tokenSequence())
                      {
                      case 270602:  // 'property' S VarName ')' ')' L 'loop' S Nr
                        this.lookahead10(270720, 37); // 'x'
                        break;
                      case 270636:  // 'property' S VarName ')' ')' L 'loop' S 'every'
                        this.lookahead10(270848, 1);  // S
                        break;
                      case 270638:  // 'property' S VarName ')' ')' L 'loop' S 'forever'
                        this.lookahead10(270976, 0);  // L
                        break;
                      }
                      break;
                    }
                    break;
                  case 268598:      // 'property' S VarName ')' ')' L 'note'
                    this.lookahead8(271104, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 271107:    // 'property' S VarName ')' ')' L 'note' S
                      this.lookahead9(271232, 31);  // 'over'
                      switch (this.tokenSequence())
                      {
                      case 271290:  // 'property' S VarName ')' ')' L 'note' S 'over'
                        this.lookahead10(271360, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 268606:      // 'property' S VarName ')' ')' L 'ref'
                    this.lookahead8(271488, 1); // S
                    break;
                  }
                  break;
                case 268419:        // 'property' S VarName ')' ')' S
                  this.lookahead7(271872, 45);  // ')' | ','
                  switch (this.tokenSequence())
                  {
                  case 271886:      // 'property' S VarName ')' ')' S ')'
                    this.lookahead8(272000, 56);  // L | S | ')' | ','
                    switch (this.tokenSequence())
                    {
                    case 272002:    // 'property' S VarName ')' ')' S ')' L
                      this.lookahead9(272128, 67);  // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                      switch (this.tokenSequence())
                      {
                      case 272147:  // 'property' S VarName ')' ')' S ')' L '...'
                        this.lookahead10(272256, 1);  // S
                        break;
                      case 272162:  // 'property' S VarName ')' ')' S ')' L 'alt'
                        this.lookahead10(272384, 1);  // S
                        break;
                      case 272177:  // 'property' S VarName ')' ')' S ')' L 'group'
                        this.lookahead10(272512, 1);  // S
                        break;
                      case 272179:  // 'property' S VarName ')' ')' S ')' L 'loop'
                        this.lookahead10(272640, 1);  // S
                        break;
                      case 272182:  // 'property' S VarName ')' ')' S ')' L 'note'
                        this.lookahead10(272768, 1);  // S
                        break;
                      case 272190:  // 'property' S VarName ')' ')' S ')' L 'ref'
                        this.lookahead10(272896, 1);  // S
                        break;
                      }
                      break;
                    case 272003:    // 'property' S VarName ')' ')' S ')' S
                      this.lookahead9(273024, 45);  // ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 273038:  // 'property' S VarName ')' ')' S ')' S ')'
                        this.lookahead10(273152, 56); // L | S | ')' | ','
                        break;
                      case 273039:  // 'property' S VarName ')' ')' S ')' S ','
                        this.lookahead10(273280, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 272014:    // 'property' S VarName ')' ')' S ')' ')'
                      this.lookahead9(273408, 56);  // L | S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 273410:  // 'property' S VarName ')' ')' S ')' ')' L
                        this.lookahead10(273536, 67); // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                        break;
                      case 273411:  // 'property' S VarName ')' ')' S ')' ')' S
                        this.lookahead10(273664, 45); // ')' | ','
                        break;
                      case 273422:  // 'property' S VarName ')' ')' S ')' ')' ')'
                        this.lookahead10(273792, 56); // L | S | ')' | ','
                        break;
                      case 273423:  // 'property' S VarName ')' ')' S ')' ')' ','
                        this.lookahead10(273920, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 272015:    // 'property' S VarName ')' ')' S ')' ','
                      this.lookahead9(274048, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 274051:  // 'property' S VarName ')' ')' S ')' ',' S
                        this.lookahead10(274176, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 274081:  // 'property' S VarName ')' ')' S ')' ',' 'allOf('
                        this.lookahead10(274304, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 274083:  // 'property' S VarName ')' ')' S ')' ',' 'anyOf('
                        this.lookahead10(274432, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 274101:  // 'property' S VarName ')' ')' S ')' ',' 'not('
                        this.lookahead10(274560, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 274104:  // 'property' S VarName ')' ')' S ')' ',' 'oneOf('
                        this.lookahead10(274688, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 274108:  // 'property' S VarName ')' ')' S ')' ',' 'property'
                        this.lookahead10(274816, 1);  // S
                        break;
                      case 274116:  // 'property' S VarName ')' ')' S ')' ',' 'variable'
                        this.lookahead10(274944, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 271887:      // 'property' S VarName ')' ')' S ','
                    this.lookahead8(275072, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 275075:    // 'property' S VarName ')' ')' S ',' S
                      this.lookahead9(275200, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 275233:  // 'property' S VarName ')' ')' S ',' S 'allOf('
                        this.lookahead10(275328, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 275235:  // 'property' S VarName ')' ')' S ',' S 'anyOf('
                        this.lookahead10(275456, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 275253:  // 'property' S VarName ')' ')' S ',' S 'not('
                        this.lookahead10(275584, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 275256:  // 'property' S VarName ')' ')' S ',' S 'oneOf('
                        this.lookahead10(275712, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 275260:  // 'property' S VarName ')' ')' S ',' S 'property'
                        this.lookahead10(275840, 1);  // S
                        break;
                      case 275268:  // 'property' S VarName ')' ')' S ',' S 'variable'
                        this.lookahead10(275968, 1);  // S
                        break;
                      }
                      break;
                    case 275105:    // 'property' S VarName ')' ')' S ',' 'allOf('
                      this.lookahead9(276096, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 276099:  // 'property' S VarName ')' ')' S ',' 'allOf(' S
                        this.lookahead10(276224, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 276129:  // 'property' S VarName ')' ')' S ',' 'allOf(' 'allOf('
                        this.lookahead10(276352, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 276131:  // 'property' S VarName ')' ')' S ',' 'allOf(' 'anyOf('
                        this.lookahead10(276480, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 276149:  // 'property' S VarName ')' ')' S ',' 'allOf(' 'not('
                        this.lookahead10(276608, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 276152:  // 'property' S VarName ')' ')' S ',' 'allOf(' 'oneOf('
                        this.lookahead10(276736, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 276156:  // 'property' S VarName ')' ')' S ',' 'allOf(' 'property'
                        this.lookahead10(276864, 1);  // S
                        break;
                      case 276164:  // 'property' S VarName ')' ')' S ',' 'allOf(' 'variable'
                        this.lookahead10(276992, 1);  // S
                        break;
                      }
                      break;
                    case 275107:    // 'property' S VarName ')' ')' S ',' 'anyOf('
                      this.lookahead9(277120, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 275125:    // 'property' S VarName ')' ')' S ',' 'not('
                      this.lookahead9(278144, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 275128:    // 'property' S VarName ')' ')' S ',' 'oneOf('
                      this.lookahead9(279168, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 275132:    // 'property' S VarName ')' ')' S ',' 'property'
                      this.lookahead9(280192, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 280195:  // 'property' S VarName ')' ')' S ',' 'property' S
                        this.lookahead10(280320, 5);  // VarName
                        break;
                      }
                      break;
                    case 275140:    // 'property' S VarName ')' ')' S ',' 'variable'
                      this.lookahead9(280448, 1); // S
                      break;
                    }
                    break;
                  }
                  break;
                case 268430:        // 'property' S VarName ')' ')' ')'
                  this.lookahead7(280704, 56);  // L | S | ')' | ','
                  switch (this.tokenSequence())
                  {
                  case 280706:      // 'property' S VarName ')' ')' ')' L
                    this.lookahead8(280832, 67);  // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                    switch (this.tokenSequence())
                    {
                    case 280851:    // 'property' S VarName ')' ')' ')' L '...'
                      this.lookahead9(280960, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 280963:  // 'property' S VarName ')' ')' ')' L '...' S
                        this.lookahead10(281088, 36); // 'wait'
                        break;
                      }
                      break;
                    case 280866:    // 'property' S VarName ')' ')' ')' L 'alt'
                      this.lookahead9(281216, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 281219:  // 'property' S VarName ')' ')' ')' L 'alt' S
                        this.lookahead10(281344, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 280881:    // 'property' S VarName ')' ')' ')' L 'group'
                      this.lookahead9(281472, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 281475:  // 'property' S VarName ')' ')' ')' L 'group' S
                        this.lookahead10(281600, 35); // 'strict'
                        break;
                      }
                      break;
                    case 280883:    // 'property' S VarName ')' ')' ')' L 'loop'
                      this.lookahead9(281728, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 281731:  // 'property' S VarName ')' ')' ')' L 'loop' S
                        this.lookahead10(281856, 51); // Nr | 'every' | 'forever'
                        break;
                      }
                      break;
                    case 280886:    // 'property' S VarName ')' ')' ')' L 'note'
                      this.lookahead9(281984, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 281987:  // 'property' S VarName ')' ')' ')' L 'note' S
                        this.lookahead10(282112, 31); // 'over'
                        break;
                      }
                      break;
                    case 280894:    // 'property' S VarName ')' ')' ')' L 'ref'
                      this.lookahead9(282240, 1); // S
                      break;
                    }
                    break;
                  case 280707:      // 'property' S VarName ')' ')' ')' S
                    this.lookahead8(282496, 45);  // ')' | ','
                    switch (this.tokenSequence())
                    {
                    case 282510:    // 'property' S VarName ')' ')' ')' S ')'
                      this.lookahead9(282624, 56);  // L | S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 282626:  // 'property' S VarName ')' ')' ')' S ')' L
                        this.lookahead10(282752, 67); // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                        break;
                      case 282627:  // 'property' S VarName ')' ')' ')' S ')' S
                        this.lookahead10(282880, 45); // ')' | ','
                        break;
                      case 282638:  // 'property' S VarName ')' ')' ')' S ')' ')'
                        this.lookahead10(283008, 56); // L | S | ')' | ','
                        break;
                      case 282639:  // 'property' S VarName ')' ')' ')' S ')' ','
                        this.lookahead10(283136, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 282511:    // 'property' S VarName ')' ')' ')' S ','
                      this.lookahead9(283264, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 283267:  // 'property' S VarName ')' ')' ')' S ',' S
                        this.lookahead10(283392, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 283297:  // 'property' S VarName ')' ')' ')' S ',' 'allOf('
                        this.lookahead10(283520, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 283299:  // 'property' S VarName ')' ')' ')' S ',' 'anyOf('
                        this.lookahead10(283648, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 283317:  // 'property' S VarName ')' ')' ')' S ',' 'not('
                        this.lookahead10(283776, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 283320:  // 'property' S VarName ')' ')' ')' S ',' 'oneOf('
                        this.lookahead10(283904, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 283324:  // 'property' S VarName ')' ')' ')' S ',' 'property'
                        this.lookahead10(284032, 1);  // S
                        break;
                      case 283332:  // 'property' S VarName ')' ')' ')' S ',' 'variable'
                        this.lookahead10(284160, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 280718:      // 'property' S VarName ')' ')' ')' ')'
                    this.lookahead8(284288, 56);  // L | S | ')' | ','
                    switch (this.tokenSequence())
                    {
                    case 284290:    // 'property' S VarName ')' ')' ')' ')' L
                      this.lookahead9(284416, 67);  // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                      switch (this.tokenSequence())
                      {
                      case 284435:  // 'property' S VarName ')' ')' ')' ')' L '...'
                        this.lookahead10(284544, 1);  // S
                        break;
                      case 284450:  // 'property' S VarName ')' ')' ')' ')' L 'alt'
                        this.lookahead10(284672, 1);  // S
                        break;
                      case 284465:  // 'property' S VarName ')' ')' ')' ')' L 'group'
                        this.lookahead10(284800, 1);  // S
                        break;
                      case 284467:  // 'property' S VarName ')' ')' ')' ')' L 'loop'
                        this.lookahead10(284928, 1);  // S
                        break;
                      case 284470:  // 'property' S VarName ')' ')' ')' ')' L 'note'
                        this.lookahead10(285056, 1);  // S
                        break;
                      case 284478:  // 'property' S VarName ')' ')' ')' ')' L 'ref'
                        this.lookahead10(285184, 1);  // S
                        break;
                      }
                      break;
                    case 284291:    // 'property' S VarName ')' ')' ')' ')' S
                      this.lookahead9(285312, 45);  // ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 285326:  // 'property' S VarName ')' ')' ')' ')' S ')'
                        this.lookahead10(285440, 56); // L | S | ')' | ','
                        break;
                      case 285327:  // 'property' S VarName ')' ')' ')' ')' S ','
                        this.lookahead10(285568, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 284302:    // 'property' S VarName ')' ')' ')' ')' ')'
                      this.lookahead9(285696, 56);  // L | S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 285698:  // 'property' S VarName ')' ')' ')' ')' ')' L
                        this.lookahead10(285824, 67); // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                        break;
                      case 285699:  // 'property' S VarName ')' ')' ')' ')' ')' S
                        this.lookahead10(285952, 45); // ')' | ','
                        break;
                      case 285710:  // 'property' S VarName ')' ')' ')' ')' ')' ')'
                        this.lookahead10(286080, 56); // L | S | ')' | ','
                        break;
                      case 285711:  // 'property' S VarName ')' ')' ')' ')' ')' ','
                        this.lookahead10(286208, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    case 284303:    // 'property' S VarName ')' ')' ')' ')' ','
                      this.lookahead9(286336, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 286339:  // 'property' S VarName ')' ')' ')' ')' ',' S
                        this.lookahead10(286464, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 286369:  // 'property' S VarName ')' ')' ')' ')' ',' 'allOf('
                        this.lookahead10(286592, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 286371:  // 'property' S VarName ')' ')' ')' ')' ',' 'anyOf('
                        this.lookahead10(286720, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 286389:  // 'property' S VarName ')' ')' ')' ')' ',' 'not('
                        this.lookahead10(286848, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 286392:  // 'property' S VarName ')' ')' ')' ')' ',' 'oneOf('
                        this.lookahead10(286976, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 286396:  // 'property' S VarName ')' ')' ')' ')' ',' 'property'
                        this.lookahead10(287104, 1);  // S
                        break;
                      case 286404:  // 'property' S VarName ')' ')' ')' ')' ',' 'variable'
                        this.lookahead10(287232, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 280719:      // 'property' S VarName ')' ')' ')' ','
                    this.lookahead8(287360, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 287363:    // 'property' S VarName ')' ')' ')' ',' S
                      this.lookahead9(287488, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 287521:  // 'property' S VarName ')' ')' ')' ',' S 'allOf('
                        this.lookahead10(287616, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 287523:  // 'property' S VarName ')' ')' ')' ',' S 'anyOf('
                        this.lookahead10(287744, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 287541:  // 'property' S VarName ')' ')' ')' ',' S 'not('
                        this.lookahead10(287872, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 287544:  // 'property' S VarName ')' ')' ')' ',' S 'oneOf('
                        this.lookahead10(288000, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 287548:  // 'property' S VarName ')' ')' ')' ',' S 'property'
                        this.lookahead10(288128, 1);  // S
                        break;
                      case 287556:  // 'property' S VarName ')' ')' ')' ',' S 'variable'
                        this.lookahead10(288256, 1);  // S
                        break;
                      }
                      break;
                    case 287393:    // 'property' S VarName ')' ')' ')' ',' 'allOf('
                      this.lookahead9(288384, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 288387:  // 'property' S VarName ')' ')' ')' ',' 'allOf(' S
                        this.lookahead10(288512, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 288417:  // 'property' S VarName ')' ')' ')' ',' 'allOf(' 'allOf('
                        this.lookahead10(288640, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 288419:  // 'property' S VarName ')' ')' ')' ',' 'allOf(' 'anyOf('
                        this.lookahead10(288768, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 288437:  // 'property' S VarName ')' ')' ')' ',' 'allOf(' 'not('
                        this.lookahead10(288896, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 288440:  // 'property' S VarName ')' ')' ')' ',' 'allOf(' 'oneOf('
                        this.lookahead10(289024, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 288444:  // 'property' S VarName ')' ')' ')' ',' 'allOf(' 'property'
                        this.lookahead10(289152, 1);  // S
                        break;
                      case 288452:  // 'property' S VarName ')' ')' ')' ',' 'allOf(' 'variable'
                        this.lookahead10(289280, 1);  // S
                        break;
                      }
                      break;
                    case 287395:    // 'property' S VarName ')' ')' ')' ',' 'anyOf('
                      this.lookahead9(289408, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 287413:    // 'property' S VarName ')' ')' ')' ',' 'not('
                      this.lookahead9(290432, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 287416:    // 'property' S VarName ')' ')' ')' ',' 'oneOf('
                      this.lookahead9(291456, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 287420:    // 'property' S VarName ')' ')' ')' ',' 'property'
                      this.lookahead9(292480, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 292483:  // 'property' S VarName ')' ')' ')' ',' 'property' S
                        this.lookahead10(292608, 5);  // VarName
                        break;
                      }
                      break;
                    case 287428:    // 'property' S VarName ')' ')' ')' ',' 'variable'
                      this.lookahead9(292736, 1); // S
                      break;
                    }
                    break;
                  }
                  break;
                case 268431:        // 'property' S VarName ')' ')' ','
                  this.lookahead7(292992, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 292995:      // 'property' S VarName ')' ')' ',' S
                    this.lookahead8(293120, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 293153:    // 'property' S VarName ')' ')' ',' S 'allOf('
                      this.lookahead9(293248, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 293251:  // 'property' S VarName ')' ')' ',' S 'allOf(' S
                        this.lookahead10(293376, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 293281:  // 'property' S VarName ')' ')' ',' S 'allOf(' 'allOf('
                        this.lookahead10(293504, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 293283:  // 'property' S VarName ')' ')' ',' S 'allOf(' 'anyOf('
                        this.lookahead10(293632, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 293301:  // 'property' S VarName ')' ')' ',' S 'allOf(' 'not('
                        this.lookahead10(293760, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 293304:  // 'property' S VarName ')' ')' ',' S 'allOf(' 'oneOf('
                        this.lookahead10(293888, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 293308:  // 'property' S VarName ')' ')' ',' S 'allOf(' 'property'
                        this.lookahead10(294016, 1);  // S
                        break;
                      case 293316:  // 'property' S VarName ')' ')' ',' S 'allOf(' 'variable'
                        this.lookahead10(294144, 1);  // S
                        break;
                      }
                      break;
                    case 293155:    // 'property' S VarName ')' ')' ',' S 'anyOf('
                      this.lookahead9(294272, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 293173:    // 'property' S VarName ')' ')' ',' S 'not('
                      this.lookahead9(295296, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 293176:    // 'property' S VarName ')' ')' ',' S 'oneOf('
                      this.lookahead9(296320, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 293180:    // 'property' S VarName ')' ')' ',' S 'property'
                      this.lookahead9(297344, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 297347:  // 'property' S VarName ')' ')' ',' S 'property' S
                        this.lookahead10(297472, 5);  // VarName
                        break;
                      }
                      break;
                    case 293188:    // 'property' S VarName ')' ')' ',' S 'variable'
                      this.lookahead9(297600, 1); // S
                      break;
                    }
                    break;
                  case 293025:      // 'property' S VarName ')' ')' ',' 'allOf('
                    this.lookahead8(297856, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 297859:    // 'property' S VarName ')' ')' ',' 'allOf(' S
                      this.lookahead9(297984, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 298017:  // 'property' S VarName ')' ')' ',' 'allOf(' S 'allOf('
                        this.lookahead10(298112, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 298019:  // 'property' S VarName ')' ')' ',' 'allOf(' S 'anyOf('
                        this.lookahead10(298240, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 298037:  // 'property' S VarName ')' ')' ',' 'allOf(' S 'not('
                        this.lookahead10(298368, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 298040:  // 'property' S VarName ')' ')' ',' 'allOf(' S 'oneOf('
                        this.lookahead10(298496, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 298044:  // 'property' S VarName ')' ')' ',' 'allOf(' S 'property'
                        this.lookahead10(298624, 1);  // S
                        break;
                      case 298052:  // 'property' S VarName ')' ')' ',' 'allOf(' S 'variable'
                        this.lookahead10(298752, 1);  // S
                        break;
                      }
                      break;
                    case 297889:    // 'property' S VarName ')' ')' ',' 'allOf(' 'allOf('
                      this.lookahead9(298880, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 298883:  // 'property' S VarName ')' ')' ',' 'allOf(' 'allOf(' S
                        this.lookahead10(299008, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 298913:  // 'property' S VarName ')' ')' ',' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(299136, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 298915:  // 'property' S VarName ')' ')' ',' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(299264, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 298933:  // 'property' S VarName ')' ')' ',' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(299392, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 298936:  // 'property' S VarName ')' ')' ',' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(299520, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 298940:  // 'property' S VarName ')' ')' ',' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(299648, 1);  // S
                        break;
                      case 298948:  // 'property' S VarName ')' ')' ',' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(299776, 1);  // S
                        break;
                      }
                      break;
                    case 297891:    // 'property' S VarName ')' ')' ',' 'allOf(' 'anyOf('
                      this.lookahead9(299904, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 297909:    // 'property' S VarName ')' ')' ',' 'allOf(' 'not('
                      this.lookahead9(300928, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 297912:    // 'property' S VarName ')' ')' ',' 'allOf(' 'oneOf('
                      this.lookahead9(301952, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 297916:    // 'property' S VarName ')' ')' ',' 'allOf(' 'property'
                      this.lookahead9(302976, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 302979:  // 'property' S VarName ')' ')' ',' 'allOf(' 'property' S
                        this.lookahead10(303104, 5);  // VarName
                        break;
                      }
                      break;
                    case 297924:    // 'property' S VarName ')' ')' ',' 'allOf(' 'variable'
                      this.lookahead9(303232, 1); // S
                      break;
                    }
                    break;
                  case 293027:      // 'property' S VarName ')' ')' ',' 'anyOf('
                    this.lookahead8(303488, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 293045:      // 'property' S VarName ')' ')' ',' 'not('
                    this.lookahead8(309120, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 293048:      // 'property' S VarName ')' ')' ',' 'oneOf('
                    this.lookahead8(314752, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 293052:      // 'property' S VarName ')' ')' ',' 'property'
                    this.lookahead8(320384, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 320387:    // 'property' S VarName ')' ')' ',' 'property' S
                      this.lookahead9(320512, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 320520:  // 'property' S VarName ')' ')' ',' 'property' S VarName
                        this.lookahead10(320640, 50); // S | ')' | ','
                        break;
                      }
                      break;
                    }
                    break;
                  case 293060:      // 'property' S VarName ')' ')' ',' 'variable'
                    this.lookahead8(320768, 1); // S
                    break;
                  }
                  break;
                }
                break;
              case 219663:          // 'property' S VarName ')' ','
                this.lookahead6(321152, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                switch (this.tokenSequence())
                {
                case 321155:        // 'property' S VarName ')' ',' S
                  this.lookahead7(321280, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 321313:      // 'property' S VarName ')' ',' S 'allOf('
                    this.lookahead8(321408, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 321411:    // 'property' S VarName ')' ',' S 'allOf(' S
                      this.lookahead9(321536, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 321569:  // 'property' S VarName ')' ',' S 'allOf(' S 'allOf('
                        this.lookahead10(321664, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 321571:  // 'property' S VarName ')' ',' S 'allOf(' S 'anyOf('
                        this.lookahead10(321792, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 321589:  // 'property' S VarName ')' ',' S 'allOf(' S 'not('
                        this.lookahead10(321920, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 321592:  // 'property' S VarName ')' ',' S 'allOf(' S 'oneOf('
                        this.lookahead10(322048, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 321596:  // 'property' S VarName ')' ',' S 'allOf(' S 'property'
                        this.lookahead10(322176, 1);  // S
                        break;
                      case 321604:  // 'property' S VarName ')' ',' S 'allOf(' S 'variable'
                        this.lookahead10(322304, 1);  // S
                        break;
                      }
                      break;
                    case 321441:    // 'property' S VarName ')' ',' S 'allOf(' 'allOf('
                      this.lookahead9(322432, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 322435:  // 'property' S VarName ')' ',' S 'allOf(' 'allOf(' S
                        this.lookahead10(322560, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 322465:  // 'property' S VarName ')' ',' S 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(322688, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 322467:  // 'property' S VarName ')' ',' S 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(322816, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 322485:  // 'property' S VarName ')' ',' S 'allOf(' 'allOf(' 'not('
                        this.lookahead10(322944, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 322488:  // 'property' S VarName ')' ',' S 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(323072, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 322492:  // 'property' S VarName ')' ',' S 'allOf(' 'allOf(' 'property'
                        this.lookahead10(323200, 1);  // S
                        break;
                      case 322500:  // 'property' S VarName ')' ',' S 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(323328, 1);  // S
                        break;
                      }
                      break;
                    case 321443:    // 'property' S VarName ')' ',' S 'allOf(' 'anyOf('
                      this.lookahead9(323456, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 321461:    // 'property' S VarName ')' ',' S 'allOf(' 'not('
                      this.lookahead9(324480, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 321464:    // 'property' S VarName ')' ',' S 'allOf(' 'oneOf('
                      this.lookahead9(325504, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 321468:    // 'property' S VarName ')' ',' S 'allOf(' 'property'
                      this.lookahead9(326528, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 326531:  // 'property' S VarName ')' ',' S 'allOf(' 'property' S
                        this.lookahead10(326656, 5);  // VarName
                        break;
                      }
                      break;
                    case 321476:    // 'property' S VarName ')' ',' S 'allOf(' 'variable'
                      this.lookahead9(326784, 1); // S
                      break;
                    }
                    break;
                  case 321315:      // 'property' S VarName ')' ',' S 'anyOf('
                    this.lookahead8(327040, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 321333:      // 'property' S VarName ')' ',' S 'not('
                    this.lookahead8(332672, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 321336:      // 'property' S VarName ')' ',' S 'oneOf('
                    this.lookahead8(338304, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 321340:      // 'property' S VarName ')' ',' S 'property'
                    this.lookahead8(343936, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 343939:    // 'property' S VarName ')' ',' S 'property' S
                      this.lookahead9(344064, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 344072:  // 'property' S VarName ')' ',' S 'property' S VarName
                        this.lookahead10(344192, 50); // S | ')' | ','
                        break;
                      }
                      break;
                    }
                    break;
                  case 321348:      // 'property' S VarName ')' ',' S 'variable'
                    this.lookahead8(344320, 1); // S
                    break;
                  }
                  break;
                case 321185:        // 'property' S VarName ')' ',' 'allOf('
                  this.lookahead7(344704, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 344707:      // 'property' S VarName ')' ',' 'allOf(' S
                    this.lookahead8(344832, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 344865:    // 'property' S VarName ')' ',' 'allOf(' S 'allOf('
                      this.lookahead9(344960, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 344963:  // 'property' S VarName ')' ',' 'allOf(' S 'allOf(' S
                        this.lookahead10(345088, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 344993:  // 'property' S VarName ')' ',' 'allOf(' S 'allOf(' 'allOf('
                        this.lookahead10(345216, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 344995:  // 'property' S VarName ')' ',' 'allOf(' S 'allOf(' 'anyOf('
                        this.lookahead10(345344, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 345013:  // 'property' S VarName ')' ',' 'allOf(' S 'allOf(' 'not('
                        this.lookahead10(345472, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 345016:  // 'property' S VarName ')' ',' 'allOf(' S 'allOf(' 'oneOf('
                        this.lookahead10(345600, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 345020:  // 'property' S VarName ')' ',' 'allOf(' S 'allOf(' 'property'
                        this.lookahead10(345728, 1);  // S
                        break;
                      case 345028:  // 'property' S VarName ')' ',' 'allOf(' S 'allOf(' 'variable'
                        this.lookahead10(345856, 1);  // S
                        break;
                      }
                      break;
                    case 344867:    // 'property' S VarName ')' ',' 'allOf(' S 'anyOf('
                      this.lookahead9(345984, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 344885:    // 'property' S VarName ')' ',' 'allOf(' S 'not('
                      this.lookahead9(347008, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 344888:    // 'property' S VarName ')' ',' 'allOf(' S 'oneOf('
                      this.lookahead9(348032, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 344892:    // 'property' S VarName ')' ',' 'allOf(' S 'property'
                      this.lookahead9(349056, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 349059:  // 'property' S VarName ')' ',' 'allOf(' S 'property' S
                        this.lookahead10(349184, 5);  // VarName
                        break;
                      }
                      break;
                    case 344900:    // 'property' S VarName ')' ',' 'allOf(' S 'variable'
                      this.lookahead9(349312, 1); // S
                      break;
                    }
                    break;
                  case 344737:      // 'property' S VarName ')' ',' 'allOf(' 'allOf('
                    this.lookahead8(349568, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 349571:    // 'property' S VarName ')' ',' 'allOf(' 'allOf(' S
                      this.lookahead9(349696, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 349729:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' S 'allOf('
                        this.lookahead10(349824, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 349731:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' S 'anyOf('
                        this.lookahead10(349952, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 349749:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' S 'not('
                        this.lookahead10(350080, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 349752:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' S 'oneOf('
                        this.lookahead10(350208, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 349756:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' S 'property'
                        this.lookahead10(350336, 1);  // S
                        break;
                      case 349764:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' S 'variable'
                        this.lookahead10(350464, 1);  // S
                        break;
                      }
                      break;
                    case 349601:    // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'allOf('
                      this.lookahead9(350592, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 350595:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'allOf(' S
                        this.lookahead10(350720, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 350625:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(350848, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 350627:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(350976, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 350645:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(351104, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 350648:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(351232, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 350652:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(351360, 1);  // S
                        break;
                      case 350660:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(351488, 1);  // S
                        break;
                      }
                      break;
                    case 349603:    // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'anyOf('
                      this.lookahead9(351616, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 349621:    // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'not('
                      this.lookahead9(352640, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 349624:    // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'oneOf('
                      this.lookahead9(353664, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 349628:    // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'property'
                      this.lookahead9(354688, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 354691:  // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'property' S
                        this.lookahead10(354816, 5);  // VarName
                        break;
                      }
                      break;
                    case 349636:    // 'property' S VarName ')' ',' 'allOf(' 'allOf(' 'variable'
                      this.lookahead9(354944, 1); // S
                      break;
                    }
                    break;
                  case 344739:      // 'property' S VarName ')' ',' 'allOf(' 'anyOf('
                    this.lookahead8(355200, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 344757:      // 'property' S VarName ')' ',' 'allOf(' 'not('
                    this.lookahead8(360832, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 344760:      // 'property' S VarName ')' ',' 'allOf(' 'oneOf('
                    this.lookahead8(366464, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 344764:      // 'property' S VarName ')' ',' 'allOf(' 'property'
                    this.lookahead8(372096, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 372099:    // 'property' S VarName ')' ',' 'allOf(' 'property' S
                      this.lookahead9(372224, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 372232:  // 'property' S VarName ')' ',' 'allOf(' 'property' S VarName
                        this.lookahead10(372352, 50); // S | ')' | ','
                        break;
                      }
                      break;
                    }
                    break;
                  case 344772:      // 'property' S VarName ')' ',' 'allOf(' 'variable'
                    this.lookahead8(372480, 1); // S
                    break;
                  }
                  break;
                case 321187:        // 'property' S VarName ')' ',' 'anyOf('
                  this.lookahead7(372864, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  break;
                case 321205:        // 'property' S VarName ')' ',' 'not('
                  this.lookahead7(401024, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 401027:      // 'property' S VarName ')' ',' 'not(' S
                    this.lookahead8(401152, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 401185:    // 'property' S VarName ')' ',' 'not(' S 'allOf('
                      this.lookahead9(401280, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 401283:  // 'property' S VarName ')' ',' 'not(' S 'allOf(' S
                        this.lookahead10(401408, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 401313:  // 'property' S VarName ')' ',' 'not(' S 'allOf(' 'allOf('
                        this.lookahead10(401536, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 401315:  // 'property' S VarName ')' ',' 'not(' S 'allOf(' 'anyOf('
                        this.lookahead10(401664, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 401333:  // 'property' S VarName ')' ',' 'not(' S 'allOf(' 'not('
                        this.lookahead10(401792, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 401336:  // 'property' S VarName ')' ',' 'not(' S 'allOf(' 'oneOf('
                        this.lookahead10(401920, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 401340:  // 'property' S VarName ')' ',' 'not(' S 'allOf(' 'property'
                        this.lookahead10(402048, 1);  // S
                        break;
                      case 401348:  // 'property' S VarName ')' ',' 'not(' S 'allOf(' 'variable'
                        this.lookahead10(402176, 1);  // S
                        break;
                      }
                      break;
                    case 401187:    // 'property' S VarName ')' ',' 'not(' S 'anyOf('
                      this.lookahead9(402304, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 401205:    // 'property' S VarName ')' ',' 'not(' S 'not('
                      this.lookahead9(403328, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 401208:    // 'property' S VarName ')' ',' 'not(' S 'oneOf('
                      this.lookahead9(404352, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 401212:    // 'property' S VarName ')' ',' 'not(' S 'property'
                      this.lookahead9(405376, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 405379:  // 'property' S VarName ')' ',' 'not(' S 'property' S
                        this.lookahead10(405504, 5);  // VarName
                        break;
                      }
                      break;
                    case 401220:    // 'property' S VarName ')' ',' 'not(' S 'variable'
                      this.lookahead9(405632, 1); // S
                      break;
                    }
                    break;
                  case 401057:      // 'property' S VarName ')' ',' 'not(' 'allOf('
                    this.lookahead8(405888, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 405891:    // 'property' S VarName ')' ',' 'not(' 'allOf(' S
                      this.lookahead9(406016, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 406049:  // 'property' S VarName ')' ',' 'not(' 'allOf(' S 'allOf('
                        this.lookahead10(406144, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 406051:  // 'property' S VarName ')' ',' 'not(' 'allOf(' S 'anyOf('
                        this.lookahead10(406272, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 406069:  // 'property' S VarName ')' ',' 'not(' 'allOf(' S 'not('
                        this.lookahead10(406400, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 406072:  // 'property' S VarName ')' ',' 'not(' 'allOf(' S 'oneOf('
                        this.lookahead10(406528, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 406076:  // 'property' S VarName ')' ',' 'not(' 'allOf(' S 'property'
                        this.lookahead10(406656, 1);  // S
                        break;
                      case 406084:  // 'property' S VarName ')' ',' 'not(' 'allOf(' S 'variable'
                        this.lookahead10(406784, 1);  // S
                        break;
                      }
                      break;
                    case 405921:    // 'property' S VarName ')' ',' 'not(' 'allOf(' 'allOf('
                      this.lookahead9(406912, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 406915:  // 'property' S VarName ')' ',' 'not(' 'allOf(' 'allOf(' S
                        this.lookahead10(407040, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 406945:  // 'property' S VarName ')' ',' 'not(' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(407168, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 406947:  // 'property' S VarName ')' ',' 'not(' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(407296, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 406965:  // 'property' S VarName ')' ',' 'not(' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(407424, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 406968:  // 'property' S VarName ')' ',' 'not(' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(407552, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 406972:  // 'property' S VarName ')' ',' 'not(' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(407680, 1);  // S
                        break;
                      case 406980:  // 'property' S VarName ')' ',' 'not(' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(407808, 1);  // S
                        break;
                      }
                      break;
                    case 405923:    // 'property' S VarName ')' ',' 'not(' 'allOf(' 'anyOf('
                      this.lookahead9(407936, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 405941:    // 'property' S VarName ')' ',' 'not(' 'allOf(' 'not('
                      this.lookahead9(408960, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 405944:    // 'property' S VarName ')' ',' 'not(' 'allOf(' 'oneOf('
                      this.lookahead9(409984, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 405948:    // 'property' S VarName ')' ',' 'not(' 'allOf(' 'property'
                      this.lookahead9(411008, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 411011:  // 'property' S VarName ')' ',' 'not(' 'allOf(' 'property' S
                        this.lookahead10(411136, 5);  // VarName
                        break;
                      }
                      break;
                    case 405956:    // 'property' S VarName ')' ',' 'not(' 'allOf(' 'variable'
                      this.lookahead9(411264, 1); // S
                      break;
                    }
                    break;
                  case 401059:      // 'property' S VarName ')' ',' 'not(' 'anyOf('
                    this.lookahead8(411520, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 401077:      // 'property' S VarName ')' ',' 'not(' 'not('
                    this.lookahead8(417152, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 401080:      // 'property' S VarName ')' ',' 'not(' 'oneOf('
                    this.lookahead8(422784, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 401084:      // 'property' S VarName ')' ',' 'not(' 'property'
                    this.lookahead8(428416, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 428419:    // 'property' S VarName ')' ',' 'not(' 'property' S
                      this.lookahead9(428544, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 428552:  // 'property' S VarName ')' ',' 'not(' 'property' S VarName
                        this.lookahead10(428672, 41); // S | ')'
                        break;
                      }
                      break;
                    }
                    break;
                  case 401092:      // 'property' S VarName ')' ',' 'not(' 'variable'
                    this.lookahead8(428800, 1); // S
                    break;
                  }
                  break;
                case 321208:        // 'property' S VarName ')' ',' 'oneOf('
                  this.lookahead7(429184, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  break;
                case 321212:        // 'property' S VarName ')' ',' 'property'
                  this.lookahead7(457344, 1); // S
                  switch (this.tokenSequence())
                  {
                  case 457347:      // 'property' S VarName ')' ',' 'property' S
                    this.lookahead8(457472, 5); // VarName
                    switch (this.tokenSequence())
                    {
                    case 457480:    // 'property' S VarName ')' ',' 'property' S VarName
                      this.lookahead9(457600, 50);  // S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 457603:  // 'property' S VarName ')' ',' 'property' S VarName S
                        this.lookahead10(457728, 70); // ')' | ',' | '<' | '<=' | '==' | '>' | '>='
                        break;
                      case 457614:  // 'property' S VarName ')' ',' 'property' S VarName ')'
                        this.lookahead10(457856, 56); // L | S | ')' | ','
                        break;
                      case 457615:  // 'property' S VarName ')' ',' 'property' S VarName ','
                        this.lookahead10(457984, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                case 321220:        // 'property' S VarName ')' ',' 'variable'
                  this.lookahead7(458112, 1); // S
                  break;
                }
                break;
              }
              break;
            case 399:               // 'property' S VarName ','
              this.lookahead5(458880, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
              switch (this.tokenSequence())
              {
              case 458883:          // 'property' S VarName ',' S
                this.lookahead6(459008, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                switch (this.tokenSequence())
                {
                case 459041:        // 'property' S VarName ',' S 'allOf('
                  this.lookahead7(459136, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 459139:      // 'property' S VarName ',' S 'allOf(' S
                    this.lookahead8(459264, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 459297:    // 'property' S VarName ',' S 'allOf(' S 'allOf('
                      this.lookahead9(459392, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 459395:  // 'property' S VarName ',' S 'allOf(' S 'allOf(' S
                        this.lookahead10(459520, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 459425:  // 'property' S VarName ',' S 'allOf(' S 'allOf(' 'allOf('
                        this.lookahead10(459648, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 459427:  // 'property' S VarName ',' S 'allOf(' S 'allOf(' 'anyOf('
                        this.lookahead10(459776, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 459445:  // 'property' S VarName ',' S 'allOf(' S 'allOf(' 'not('
                        this.lookahead10(459904, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 459448:  // 'property' S VarName ',' S 'allOf(' S 'allOf(' 'oneOf('
                        this.lookahead10(460032, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 459452:  // 'property' S VarName ',' S 'allOf(' S 'allOf(' 'property'
                        this.lookahead10(460160, 1);  // S
                        break;
                      case 459460:  // 'property' S VarName ',' S 'allOf(' S 'allOf(' 'variable'
                        this.lookahead10(460288, 1);  // S
                        break;
                      }
                      break;
                    case 459299:    // 'property' S VarName ',' S 'allOf(' S 'anyOf('
                      this.lookahead9(460416, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 459317:    // 'property' S VarName ',' S 'allOf(' S 'not('
                      this.lookahead9(461440, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 459320:    // 'property' S VarName ',' S 'allOf(' S 'oneOf('
                      this.lookahead9(462464, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 459324:    // 'property' S VarName ',' S 'allOf(' S 'property'
                      this.lookahead9(463488, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 463491:  // 'property' S VarName ',' S 'allOf(' S 'property' S
                        this.lookahead10(463616, 5);  // VarName
                        break;
                      }
                      break;
                    case 459332:    // 'property' S VarName ',' S 'allOf(' S 'variable'
                      this.lookahead9(463744, 1); // S
                      break;
                    }
                    break;
                  case 459169:      // 'property' S VarName ',' S 'allOf(' 'allOf('
                    this.lookahead8(464000, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 464003:    // 'property' S VarName ',' S 'allOf(' 'allOf(' S
                      this.lookahead9(464128, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 464161:  // 'property' S VarName ',' S 'allOf(' 'allOf(' S 'allOf('
                        this.lookahead10(464256, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 464163:  // 'property' S VarName ',' S 'allOf(' 'allOf(' S 'anyOf('
                        this.lookahead10(464384, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 464181:  // 'property' S VarName ',' S 'allOf(' 'allOf(' S 'not('
                        this.lookahead10(464512, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 464184:  // 'property' S VarName ',' S 'allOf(' 'allOf(' S 'oneOf('
                        this.lookahead10(464640, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 464188:  // 'property' S VarName ',' S 'allOf(' 'allOf(' S 'property'
                        this.lookahead10(464768, 1);  // S
                        break;
                      case 464196:  // 'property' S VarName ',' S 'allOf(' 'allOf(' S 'variable'
                        this.lookahead10(464896, 1);  // S
                        break;
                      }
                      break;
                    case 464033:    // 'property' S VarName ',' S 'allOf(' 'allOf(' 'allOf('
                      this.lookahead9(465024, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 465027:  // 'property' S VarName ',' S 'allOf(' 'allOf(' 'allOf(' S
                        this.lookahead10(465152, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 465057:  // 'property' S VarName ',' S 'allOf(' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(465280, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 465059:  // 'property' S VarName ',' S 'allOf(' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(465408, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 465077:  // 'property' S VarName ',' S 'allOf(' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(465536, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 465080:  // 'property' S VarName ',' S 'allOf(' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(465664, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 465084:  // 'property' S VarName ',' S 'allOf(' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(465792, 1);  // S
                        break;
                      case 465092:  // 'property' S VarName ',' S 'allOf(' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(465920, 1);  // S
                        break;
                      }
                      break;
                    case 464035:    // 'property' S VarName ',' S 'allOf(' 'allOf(' 'anyOf('
                      this.lookahead9(466048, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 464053:    // 'property' S VarName ',' S 'allOf(' 'allOf(' 'not('
                      this.lookahead9(467072, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 464056:    // 'property' S VarName ',' S 'allOf(' 'allOf(' 'oneOf('
                      this.lookahead9(468096, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 464060:    // 'property' S VarName ',' S 'allOf(' 'allOf(' 'property'
                      this.lookahead9(469120, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 469123:  // 'property' S VarName ',' S 'allOf(' 'allOf(' 'property' S
                        this.lookahead10(469248, 5);  // VarName
                        break;
                      }
                      break;
                    case 464068:    // 'property' S VarName ',' S 'allOf(' 'allOf(' 'variable'
                      this.lookahead9(469376, 1); // S
                      break;
                    }
                    break;
                  case 459171:      // 'property' S VarName ',' S 'allOf(' 'anyOf('
                    this.lookahead8(469632, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 459189:      // 'property' S VarName ',' S 'allOf(' 'not('
                    this.lookahead8(475264, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 459192:      // 'property' S VarName ',' S 'allOf(' 'oneOf('
                    this.lookahead8(480896, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 459196:      // 'property' S VarName ',' S 'allOf(' 'property'
                    this.lookahead8(486528, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 486531:    // 'property' S VarName ',' S 'allOf(' 'property' S
                      this.lookahead9(486656, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 486664:  // 'property' S VarName ',' S 'allOf(' 'property' S VarName
                        this.lookahead10(486784, 50); // S | ')' | ','
                        break;
                      }
                      break;
                    }
                    break;
                  case 459204:      // 'property' S VarName ',' S 'allOf(' 'variable'
                    this.lookahead8(486912, 1); // S
                    break;
                  }
                  break;
                case 459043:        // 'property' S VarName ',' S 'anyOf('
                  this.lookahead7(487296, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  break;
                case 459061:        // 'property' S VarName ',' S 'not('
                  this.lookahead7(515456, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 515459:      // 'property' S VarName ',' S 'not(' S
                    this.lookahead8(515584, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 515617:    // 'property' S VarName ',' S 'not(' S 'allOf('
                      this.lookahead9(515712, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 515715:  // 'property' S VarName ',' S 'not(' S 'allOf(' S
                        this.lookahead10(515840, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 515745:  // 'property' S VarName ',' S 'not(' S 'allOf(' 'allOf('
                        this.lookahead10(515968, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 515747:  // 'property' S VarName ',' S 'not(' S 'allOf(' 'anyOf('
                        this.lookahead10(516096, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 515765:  // 'property' S VarName ',' S 'not(' S 'allOf(' 'not('
                        this.lookahead10(516224, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 515768:  // 'property' S VarName ',' S 'not(' S 'allOf(' 'oneOf('
                        this.lookahead10(516352, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 515772:  // 'property' S VarName ',' S 'not(' S 'allOf(' 'property'
                        this.lookahead10(516480, 1);  // S
                        break;
                      case 515780:  // 'property' S VarName ',' S 'not(' S 'allOf(' 'variable'
                        this.lookahead10(516608, 1);  // S
                        break;
                      }
                      break;
                    case 515619:    // 'property' S VarName ',' S 'not(' S 'anyOf('
                      this.lookahead9(516736, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 515637:    // 'property' S VarName ',' S 'not(' S 'not('
                      this.lookahead9(517760, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 515640:    // 'property' S VarName ',' S 'not(' S 'oneOf('
                      this.lookahead9(518784, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 515644:    // 'property' S VarName ',' S 'not(' S 'property'
                      this.lookahead9(519808, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 519811:  // 'property' S VarName ',' S 'not(' S 'property' S
                        this.lookahead10(519936, 5);  // VarName
                        break;
                      }
                      break;
                    case 515652:    // 'property' S VarName ',' S 'not(' S 'variable'
                      this.lookahead9(520064, 1); // S
                      break;
                    }
                    break;
                  case 515489:      // 'property' S VarName ',' S 'not(' 'allOf('
                    this.lookahead8(520320, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 520323:    // 'property' S VarName ',' S 'not(' 'allOf(' S
                      this.lookahead9(520448, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 520481:  // 'property' S VarName ',' S 'not(' 'allOf(' S 'allOf('
                        this.lookahead10(520576, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 520483:  // 'property' S VarName ',' S 'not(' 'allOf(' S 'anyOf('
                        this.lookahead10(520704, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 520501:  // 'property' S VarName ',' S 'not(' 'allOf(' S 'not('
                        this.lookahead10(520832, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 520504:  // 'property' S VarName ',' S 'not(' 'allOf(' S 'oneOf('
                        this.lookahead10(520960, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 520508:  // 'property' S VarName ',' S 'not(' 'allOf(' S 'property'
                        this.lookahead10(521088, 1);  // S
                        break;
                      case 520516:  // 'property' S VarName ',' S 'not(' 'allOf(' S 'variable'
                        this.lookahead10(521216, 1);  // S
                        break;
                      }
                      break;
                    case 520353:    // 'property' S VarName ',' S 'not(' 'allOf(' 'allOf('
                      this.lookahead9(521344, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 521347:  // 'property' S VarName ',' S 'not(' 'allOf(' 'allOf(' S
                        this.lookahead10(521472, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 521377:  // 'property' S VarName ',' S 'not(' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(521600, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 521379:  // 'property' S VarName ',' S 'not(' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(521728, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 521397:  // 'property' S VarName ',' S 'not(' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(521856, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 521400:  // 'property' S VarName ',' S 'not(' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(521984, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 521404:  // 'property' S VarName ',' S 'not(' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(522112, 1);  // S
                        break;
                      case 521412:  // 'property' S VarName ',' S 'not(' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(522240, 1);  // S
                        break;
                      }
                      break;
                    case 520355:    // 'property' S VarName ',' S 'not(' 'allOf(' 'anyOf('
                      this.lookahead9(522368, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 520373:    // 'property' S VarName ',' S 'not(' 'allOf(' 'not('
                      this.lookahead9(523392, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 520376:    // 'property' S VarName ',' S 'not(' 'allOf(' 'oneOf('
                      this.lookahead9(524416, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 520380:    // 'property' S VarName ',' S 'not(' 'allOf(' 'property'
                      this.lookahead9(525440, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 525443:  // 'property' S VarName ',' S 'not(' 'allOf(' 'property' S
                        this.lookahead10(525568, 5);  // VarName
                        break;
                      }
                      break;
                    case 520388:    // 'property' S VarName ',' S 'not(' 'allOf(' 'variable'
                      this.lookahead9(525696, 1); // S
                      break;
                    }
                    break;
                  case 515491:      // 'property' S VarName ',' S 'not(' 'anyOf('
                    this.lookahead8(525952, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 515509:      // 'property' S VarName ',' S 'not(' 'not('
                    this.lookahead8(531584, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 515512:      // 'property' S VarName ',' S 'not(' 'oneOf('
                    this.lookahead8(537216, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 515516:      // 'property' S VarName ',' S 'not(' 'property'
                    this.lookahead8(542848, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 542851:    // 'property' S VarName ',' S 'not(' 'property' S
                      this.lookahead9(542976, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 542984:  // 'property' S VarName ',' S 'not(' 'property' S VarName
                        this.lookahead10(543104, 41); // S | ')'
                        break;
                      }
                      break;
                    }
                    break;
                  case 515524:      // 'property' S VarName ',' S 'not(' 'variable'
                    this.lookahead8(543232, 1); // S
                    break;
                  }
                  break;
                case 459064:        // 'property' S VarName ',' S 'oneOf('
                  this.lookahead7(543616, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  break;
                case 459068:        // 'property' S VarName ',' S 'property'
                  this.lookahead7(571776, 1); // S
                  switch (this.tokenSequence())
                  {
                  case 571779:      // 'property' S VarName ',' S 'property' S
                    this.lookahead8(571904, 5); // VarName
                    switch (this.tokenSequence())
                    {
                    case 571912:    // 'property' S VarName ',' S 'property' S VarName
                      this.lookahead9(572032, 50);  // S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 572035:  // 'property' S VarName ',' S 'property' S VarName S
                        this.lookahead10(572160, 70); // ')' | ',' | '<' | '<=' | '==' | '>' | '>='
                        break;
                      case 572046:  // 'property' S VarName ',' S 'property' S VarName ')'
                        this.lookahead10(572288, 56); // L | S | ')' | ','
                        break;
                      case 572047:  // 'property' S VarName ',' S 'property' S VarName ','
                        this.lookahead10(572416, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                case 459076:        // 'property' S VarName ',' S 'variable'
                  this.lookahead7(572544, 1); // S
                  break;
                }
                break;
              case 458913:          // 'property' S VarName ',' 'allOf('
                this.lookahead6(573312, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                switch (this.tokenSequence())
                {
                case 573315:        // 'property' S VarName ',' 'allOf(' S
                  this.lookahead7(573440, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 573473:      // 'property' S VarName ',' 'allOf(' S 'allOf('
                    this.lookahead8(573568, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 573571:    // 'property' S VarName ',' 'allOf(' S 'allOf(' S
                      this.lookahead9(573696, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 573729:  // 'property' S VarName ',' 'allOf(' S 'allOf(' S 'allOf('
                        this.lookahead10(573824, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 573731:  // 'property' S VarName ',' 'allOf(' S 'allOf(' S 'anyOf('
                        this.lookahead10(573952, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 573749:  // 'property' S VarName ',' 'allOf(' S 'allOf(' S 'not('
                        this.lookahead10(574080, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 573752:  // 'property' S VarName ',' 'allOf(' S 'allOf(' S 'oneOf('
                        this.lookahead10(574208, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 573756:  // 'property' S VarName ',' 'allOf(' S 'allOf(' S 'property'
                        this.lookahead10(574336, 1);  // S
                        break;
                      case 573764:  // 'property' S VarName ',' 'allOf(' S 'allOf(' S 'variable'
                        this.lookahead10(574464, 1);  // S
                        break;
                      }
                      break;
                    case 573601:    // 'property' S VarName ',' 'allOf(' S 'allOf(' 'allOf('
                      this.lookahead9(574592, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 574595:  // 'property' S VarName ',' 'allOf(' S 'allOf(' 'allOf(' S
                        this.lookahead10(574720, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 574625:  // 'property' S VarName ',' 'allOf(' S 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(574848, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 574627:  // 'property' S VarName ',' 'allOf(' S 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(574976, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 574645:  // 'property' S VarName ',' 'allOf(' S 'allOf(' 'allOf(' 'not('
                        this.lookahead10(575104, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 574648:  // 'property' S VarName ',' 'allOf(' S 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(575232, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 574652:  // 'property' S VarName ',' 'allOf(' S 'allOf(' 'allOf(' 'property'
                        this.lookahead10(575360, 1);  // S
                        break;
                      case 574660:  // 'property' S VarName ',' 'allOf(' S 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(575488, 1);  // S
                        break;
                      }
                      break;
                    case 573603:    // 'property' S VarName ',' 'allOf(' S 'allOf(' 'anyOf('
                      this.lookahead9(575616, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 573621:    // 'property' S VarName ',' 'allOf(' S 'allOf(' 'not('
                      this.lookahead9(576640, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 573624:    // 'property' S VarName ',' 'allOf(' S 'allOf(' 'oneOf('
                      this.lookahead9(577664, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 573628:    // 'property' S VarName ',' 'allOf(' S 'allOf(' 'property'
                      this.lookahead9(578688, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 578691:  // 'property' S VarName ',' 'allOf(' S 'allOf(' 'property' S
                        this.lookahead10(578816, 5);  // VarName
                        break;
                      }
                      break;
                    case 573636:    // 'property' S VarName ',' 'allOf(' S 'allOf(' 'variable'
                      this.lookahead9(578944, 1); // S
                      break;
                    }
                    break;
                  case 573475:      // 'property' S VarName ',' 'allOf(' S 'anyOf('
                    this.lookahead8(579200, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 573493:      // 'property' S VarName ',' 'allOf(' S 'not('
                    this.lookahead8(584832, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 573496:      // 'property' S VarName ',' 'allOf(' S 'oneOf('
                    this.lookahead8(590464, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 573500:      // 'property' S VarName ',' 'allOf(' S 'property'
                    this.lookahead8(596096, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 596099:    // 'property' S VarName ',' 'allOf(' S 'property' S
                      this.lookahead9(596224, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 596232:  // 'property' S VarName ',' 'allOf(' S 'property' S VarName
                        this.lookahead10(596352, 50); // S | ')' | ','
                        break;
                      }
                      break;
                    }
                    break;
                  case 573508:      // 'property' S VarName ',' 'allOf(' S 'variable'
                    this.lookahead8(596480, 1); // S
                    break;
                  }
                  break;
                case 573345:        // 'property' S VarName ',' 'allOf(' 'allOf('
                  this.lookahead7(596864, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 596867:      // 'property' S VarName ',' 'allOf(' 'allOf(' S
                    this.lookahead8(596992, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 597025:    // 'property' S VarName ',' 'allOf(' 'allOf(' S 'allOf('
                      this.lookahead9(597120, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 597123:  // 'property' S VarName ',' 'allOf(' 'allOf(' S 'allOf(' S
                        this.lookahead10(597248, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 597153:  // 'property' S VarName ',' 'allOf(' 'allOf(' S 'allOf(' 'allOf('
                        this.lookahead10(597376, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 597155:  // 'property' S VarName ',' 'allOf(' 'allOf(' S 'allOf(' 'anyOf('
                        this.lookahead10(597504, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 597173:  // 'property' S VarName ',' 'allOf(' 'allOf(' S 'allOf(' 'not('
                        this.lookahead10(597632, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 597176:  // 'property' S VarName ',' 'allOf(' 'allOf(' S 'allOf(' 'oneOf('
                        this.lookahead10(597760, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 597180:  // 'property' S VarName ',' 'allOf(' 'allOf(' S 'allOf(' 'property'
                        this.lookahead10(597888, 1);  // S
                        break;
                      case 597188:  // 'property' S VarName ',' 'allOf(' 'allOf(' S 'allOf(' 'variable'
                        this.lookahead10(598016, 1);  // S
                        break;
                      }
                      break;
                    case 597027:    // 'property' S VarName ',' 'allOf(' 'allOf(' S 'anyOf('
                      this.lookahead9(598144, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 597045:    // 'property' S VarName ',' 'allOf(' 'allOf(' S 'not('
                      this.lookahead9(599168, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 597048:    // 'property' S VarName ',' 'allOf(' 'allOf(' S 'oneOf('
                      this.lookahead9(600192, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 597052:    // 'property' S VarName ',' 'allOf(' 'allOf(' S 'property'
                      this.lookahead9(601216, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 601219:  // 'property' S VarName ',' 'allOf(' 'allOf(' S 'property' S
                        this.lookahead10(601344, 5);  // VarName
                        break;
                      }
                      break;
                    case 597060:    // 'property' S VarName ',' 'allOf(' 'allOf(' S 'variable'
                      this.lookahead9(601472, 1); // S
                      break;
                    }
                    break;
                  case 596897:      // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf('
                    this.lookahead8(601728, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 601731:    // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' S
                      this.lookahead9(601856, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 601889:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' S 'allOf('
                        this.lookahead10(601984, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 601891:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' S 'anyOf('
                        this.lookahead10(602112, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 601909:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' S 'not('
                        this.lookahead10(602240, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 601912:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' S 'oneOf('
                        this.lookahead10(602368, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 601916:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' S 'property'
                        this.lookahead10(602496, 1);  // S
                        break;
                      case 601924:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' S 'variable'
                        this.lookahead10(602624, 1);  // S
                        break;
                      }
                      break;
                    case 601761:    // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'allOf('
                      this.lookahead9(602752, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 602755:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'allOf(' S
                        this.lookahead10(602880, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 602785:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(603008, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 602787:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(603136, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 602805:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(603264, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 602808:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(603392, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 602812:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(603520, 1);  // S
                        break;
                      case 602820:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(603648, 1);  // S
                        break;
                      }
                      break;
                    case 601763:    // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'anyOf('
                      this.lookahead9(603776, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 601781:    // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'not('
                      this.lookahead9(604800, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 601784:    // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'oneOf('
                      this.lookahead9(605824, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 601788:    // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'property'
                      this.lookahead9(606848, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 606851:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'property' S
                        this.lookahead10(606976, 5);  // VarName
                        break;
                      }
                      break;
                    case 601796:    // 'property' S VarName ',' 'allOf(' 'allOf(' 'allOf(' 'variable'
                      this.lookahead9(607104, 1); // S
                      break;
                    }
                    break;
                  case 596899:      // 'property' S VarName ',' 'allOf(' 'allOf(' 'anyOf('
                    this.lookahead8(607360, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 596917:      // 'property' S VarName ',' 'allOf(' 'allOf(' 'not('
                    this.lookahead8(612992, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 596920:      // 'property' S VarName ',' 'allOf(' 'allOf(' 'oneOf('
                    this.lookahead8(618624, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 596924:      // 'property' S VarName ',' 'allOf(' 'allOf(' 'property'
                    this.lookahead8(624256, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 624259:    // 'property' S VarName ',' 'allOf(' 'allOf(' 'property' S
                      this.lookahead9(624384, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 624392:  // 'property' S VarName ',' 'allOf(' 'allOf(' 'property' S VarName
                        this.lookahead10(624512, 50); // S | ')' | ','
                        break;
                      }
                      break;
                    }
                    break;
                  case 596932:      // 'property' S VarName ',' 'allOf(' 'allOf(' 'variable'
                    this.lookahead8(624640, 1); // S
                    break;
                  }
                  break;
                case 573347:        // 'property' S VarName ',' 'allOf(' 'anyOf('
                  this.lookahead7(625024, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  break;
                case 573365:        // 'property' S VarName ',' 'allOf(' 'not('
                  this.lookahead7(653184, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 653187:      // 'property' S VarName ',' 'allOf(' 'not(' S
                    this.lookahead8(653312, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 653345:    // 'property' S VarName ',' 'allOf(' 'not(' S 'allOf('
                      this.lookahead9(653440, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 653443:  // 'property' S VarName ',' 'allOf(' 'not(' S 'allOf(' S
                        this.lookahead10(653568, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 653473:  // 'property' S VarName ',' 'allOf(' 'not(' S 'allOf(' 'allOf('
                        this.lookahead10(653696, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 653475:  // 'property' S VarName ',' 'allOf(' 'not(' S 'allOf(' 'anyOf('
                        this.lookahead10(653824, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 653493:  // 'property' S VarName ',' 'allOf(' 'not(' S 'allOf(' 'not('
                        this.lookahead10(653952, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 653496:  // 'property' S VarName ',' 'allOf(' 'not(' S 'allOf(' 'oneOf('
                        this.lookahead10(654080, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 653500:  // 'property' S VarName ',' 'allOf(' 'not(' S 'allOf(' 'property'
                        this.lookahead10(654208, 1);  // S
                        break;
                      case 653508:  // 'property' S VarName ',' 'allOf(' 'not(' S 'allOf(' 'variable'
                        this.lookahead10(654336, 1);  // S
                        break;
                      }
                      break;
                    case 653347:    // 'property' S VarName ',' 'allOf(' 'not(' S 'anyOf('
                      this.lookahead9(654464, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 653365:    // 'property' S VarName ',' 'allOf(' 'not(' S 'not('
                      this.lookahead9(655488, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 653368:    // 'property' S VarName ',' 'allOf(' 'not(' S 'oneOf('
                      this.lookahead9(656512, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 653372:    // 'property' S VarName ',' 'allOf(' 'not(' S 'property'
                      this.lookahead9(657536, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 657539:  // 'property' S VarName ',' 'allOf(' 'not(' S 'property' S
                        this.lookahead10(657664, 5);  // VarName
                        break;
                      }
                      break;
                    case 653380:    // 'property' S VarName ',' 'allOf(' 'not(' S 'variable'
                      this.lookahead9(657792, 1); // S
                      break;
                    }
                    break;
                  case 653217:      // 'property' S VarName ',' 'allOf(' 'not(' 'allOf('
                    this.lookahead8(658048, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 658051:    // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' S
                      this.lookahead9(658176, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 658209:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' S 'allOf('
                        this.lookahead10(658304, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 658211:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' S 'anyOf('
                        this.lookahead10(658432, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 658229:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' S 'not('
                        this.lookahead10(658560, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 658232:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' S 'oneOf('
                        this.lookahead10(658688, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 658236:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' S 'property'
                        this.lookahead10(658816, 1);  // S
                        break;
                      case 658244:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' S 'variable'
                        this.lookahead10(658944, 1);  // S
                        break;
                      }
                      break;
                    case 658081:    // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'allOf('
                      this.lookahead9(659072, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 659075:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'allOf(' S
                        this.lookahead10(659200, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 659105:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(659328, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 659107:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(659456, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 659125:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(659584, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 659128:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(659712, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 659132:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(659840, 1);  // S
                        break;
                      case 659140:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(659968, 1);  // S
                        break;
                      }
                      break;
                    case 658083:    // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'anyOf('
                      this.lookahead9(660096, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 658101:    // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'not('
                      this.lookahead9(661120, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 658104:    // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'oneOf('
                      this.lookahead9(662144, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 658108:    // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'property'
                      this.lookahead9(663168, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 663171:  // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'property' S
                        this.lookahead10(663296, 5);  // VarName
                        break;
                      }
                      break;
                    case 658116:    // 'property' S VarName ',' 'allOf(' 'not(' 'allOf(' 'variable'
                      this.lookahead9(663424, 1); // S
                      break;
                    }
                    break;
                  case 653219:      // 'property' S VarName ',' 'allOf(' 'not(' 'anyOf('
                    this.lookahead8(663680, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 653237:      // 'property' S VarName ',' 'allOf(' 'not(' 'not('
                    this.lookahead8(669312, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 653240:      // 'property' S VarName ',' 'allOf(' 'not(' 'oneOf('
                    this.lookahead8(674944, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 653244:      // 'property' S VarName ',' 'allOf(' 'not(' 'property'
                    this.lookahead8(680576, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 680579:    // 'property' S VarName ',' 'allOf(' 'not(' 'property' S
                      this.lookahead9(680704, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 680712:  // 'property' S VarName ',' 'allOf(' 'not(' 'property' S VarName
                        this.lookahead10(680832, 41); // S | ')'
                        break;
                      }
                      break;
                    }
                    break;
                  case 653252:      // 'property' S VarName ',' 'allOf(' 'not(' 'variable'
                    this.lookahead8(680960, 1); // S
                    break;
                  }
                  break;
                case 573368:        // 'property' S VarName ',' 'allOf(' 'oneOf('
                  this.lookahead7(681344, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  break;
                case 573372:        // 'property' S VarName ',' 'allOf(' 'property'
                  this.lookahead7(709504, 1); // S
                  switch (this.tokenSequence())
                  {
                  case 709507:      // 'property' S VarName ',' 'allOf(' 'property' S
                    this.lookahead8(709632, 5); // VarName
                    switch (this.tokenSequence())
                    {
                    case 709640:    // 'property' S VarName ',' 'allOf(' 'property' S VarName
                      this.lookahead9(709760, 50);  // S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 709763:  // 'property' S VarName ',' 'allOf(' 'property' S VarName S
                        this.lookahead10(709888, 70); // ')' | ',' | '<' | '<=' | '==' | '>' | '>='
                        break;
                      case 709774:  // 'property' S VarName ',' 'allOf(' 'property' S VarName ')'
                        this.lookahead10(710016, 50); // S | ')' | ','
                        break;
                      case 709775:  // 'property' S VarName ',' 'allOf(' 'property' S VarName ','
                        this.lookahead10(710144, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                case 573380:        // 'property' S VarName ',' 'allOf(' 'variable'
                  this.lookahead7(710272, 1); // S
                  break;
                }
                break;
              case 458915:          // 'property' S VarName ',' 'anyOf('
                this.lookahead6(711040, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                break;
              case 458933:          // 'property' S VarName ',' 'not('
                this.lookahead6(848768, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                switch (this.tokenSequence())
                {
                case 848771:        // 'property' S VarName ',' 'not(' S
                  this.lookahead7(848896, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 848929:      // 'property' S VarName ',' 'not(' S 'allOf('
                    this.lookahead8(849024, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 849027:    // 'property' S VarName ',' 'not(' S 'allOf(' S
                      this.lookahead9(849152, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 849185:  // 'property' S VarName ',' 'not(' S 'allOf(' S 'allOf('
                        this.lookahead10(849280, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 849187:  // 'property' S VarName ',' 'not(' S 'allOf(' S 'anyOf('
                        this.lookahead10(849408, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 849205:  // 'property' S VarName ',' 'not(' S 'allOf(' S 'not('
                        this.lookahead10(849536, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 849208:  // 'property' S VarName ',' 'not(' S 'allOf(' S 'oneOf('
                        this.lookahead10(849664, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 849212:  // 'property' S VarName ',' 'not(' S 'allOf(' S 'property'
                        this.lookahead10(849792, 1);  // S
                        break;
                      case 849220:  // 'property' S VarName ',' 'not(' S 'allOf(' S 'variable'
                        this.lookahead10(849920, 1);  // S
                        break;
                      }
                      break;
                    case 849057:    // 'property' S VarName ',' 'not(' S 'allOf(' 'allOf('
                      this.lookahead9(850048, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 850051:  // 'property' S VarName ',' 'not(' S 'allOf(' 'allOf(' S
                        this.lookahead10(850176, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 850081:  // 'property' S VarName ',' 'not(' S 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(850304, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 850083:  // 'property' S VarName ',' 'not(' S 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(850432, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 850101:  // 'property' S VarName ',' 'not(' S 'allOf(' 'allOf(' 'not('
                        this.lookahead10(850560, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 850104:  // 'property' S VarName ',' 'not(' S 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(850688, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 850108:  // 'property' S VarName ',' 'not(' S 'allOf(' 'allOf(' 'property'
                        this.lookahead10(850816, 1);  // S
                        break;
                      case 850116:  // 'property' S VarName ',' 'not(' S 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(850944, 1);  // S
                        break;
                      }
                      break;
                    case 849059:    // 'property' S VarName ',' 'not(' S 'allOf(' 'anyOf('
                      this.lookahead9(851072, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 849077:    // 'property' S VarName ',' 'not(' S 'allOf(' 'not('
                      this.lookahead9(852096, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 849080:    // 'property' S VarName ',' 'not(' S 'allOf(' 'oneOf('
                      this.lookahead9(853120, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 849084:    // 'property' S VarName ',' 'not(' S 'allOf(' 'property'
                      this.lookahead9(854144, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 854147:  // 'property' S VarName ',' 'not(' S 'allOf(' 'property' S
                        this.lookahead10(854272, 5);  // VarName
                        break;
                      }
                      break;
                    case 849092:    // 'property' S VarName ',' 'not(' S 'allOf(' 'variable'
                      this.lookahead9(854400, 1); // S
                      break;
                    }
                    break;
                  case 848931:      // 'property' S VarName ',' 'not(' S 'anyOf('
                    this.lookahead8(854656, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 848949:      // 'property' S VarName ',' 'not(' S 'not('
                    this.lookahead8(860288, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 848952:      // 'property' S VarName ',' 'not(' S 'oneOf('
                    this.lookahead8(865920, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 848956:      // 'property' S VarName ',' 'not(' S 'property'
                    this.lookahead8(871552, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 871555:    // 'property' S VarName ',' 'not(' S 'property' S
                      this.lookahead9(871680, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 871688:  // 'property' S VarName ',' 'not(' S 'property' S VarName
                        this.lookahead10(871808, 41); // S | ')'
                        break;
                      }
                      break;
                    }
                    break;
                  case 848964:      // 'property' S VarName ',' 'not(' S 'variable'
                    this.lookahead8(871936, 1); // S
                    break;
                  }
                  break;
                case 848801:        // 'property' S VarName ',' 'not(' 'allOf('
                  this.lookahead7(872320, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 872323:      // 'property' S VarName ',' 'not(' 'allOf(' S
                    this.lookahead8(872448, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 872481:    // 'property' S VarName ',' 'not(' 'allOf(' S 'allOf('
                      this.lookahead9(872576, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 872579:  // 'property' S VarName ',' 'not(' 'allOf(' S 'allOf(' S
                        this.lookahead10(872704, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 872609:  // 'property' S VarName ',' 'not(' 'allOf(' S 'allOf(' 'allOf('
                        this.lookahead10(872832, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 872611:  // 'property' S VarName ',' 'not(' 'allOf(' S 'allOf(' 'anyOf('
                        this.lookahead10(872960, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 872629:  // 'property' S VarName ',' 'not(' 'allOf(' S 'allOf(' 'not('
                        this.lookahead10(873088, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 872632:  // 'property' S VarName ',' 'not(' 'allOf(' S 'allOf(' 'oneOf('
                        this.lookahead10(873216, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 872636:  // 'property' S VarName ',' 'not(' 'allOf(' S 'allOf(' 'property'
                        this.lookahead10(873344, 1);  // S
                        break;
                      case 872644:  // 'property' S VarName ',' 'not(' 'allOf(' S 'allOf(' 'variable'
                        this.lookahead10(873472, 1);  // S
                        break;
                      }
                      break;
                    case 872483:    // 'property' S VarName ',' 'not(' 'allOf(' S 'anyOf('
                      this.lookahead9(873600, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 872501:    // 'property' S VarName ',' 'not(' 'allOf(' S 'not('
                      this.lookahead9(874624, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 872504:    // 'property' S VarName ',' 'not(' 'allOf(' S 'oneOf('
                      this.lookahead9(875648, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 872508:    // 'property' S VarName ',' 'not(' 'allOf(' S 'property'
                      this.lookahead9(876672, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 876675:  // 'property' S VarName ',' 'not(' 'allOf(' S 'property' S
                        this.lookahead10(876800, 5);  // VarName
                        break;
                      }
                      break;
                    case 872516:    // 'property' S VarName ',' 'not(' 'allOf(' S 'variable'
                      this.lookahead9(876928, 1); // S
                      break;
                    }
                    break;
                  case 872353:      // 'property' S VarName ',' 'not(' 'allOf(' 'allOf('
                    this.lookahead8(877184, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 877187:    // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' S
                      this.lookahead9(877312, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 877345:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' S 'allOf('
                        this.lookahead10(877440, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 877347:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' S 'anyOf('
                        this.lookahead10(877568, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 877365:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' S 'not('
                        this.lookahead10(877696, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 877368:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' S 'oneOf('
                        this.lookahead10(877824, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 877372:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' S 'property'
                        this.lookahead10(877952, 1);  // S
                        break;
                      case 877380:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' S 'variable'
                        this.lookahead10(878080, 1);  // S
                        break;
                      }
                      break;
                    case 877217:    // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'allOf('
                      this.lookahead9(878208, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 878211:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'allOf(' S
                        this.lookahead10(878336, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 878241:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(878464, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 878243:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(878592, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 878261:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(878720, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 878264:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(878848, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 878268:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(878976, 1);  // S
                        break;
                      case 878276:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(879104, 1);  // S
                        break;
                      }
                      break;
                    case 877219:    // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'anyOf('
                      this.lookahead9(879232, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 877237:    // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'not('
                      this.lookahead9(880256, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 877240:    // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'oneOf('
                      this.lookahead9(881280, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 877244:    // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'property'
                      this.lookahead9(882304, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 882307:  // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'property' S
                        this.lookahead10(882432, 5);  // VarName
                        break;
                      }
                      break;
                    case 877252:    // 'property' S VarName ',' 'not(' 'allOf(' 'allOf(' 'variable'
                      this.lookahead9(882560, 1); // S
                      break;
                    }
                    break;
                  case 872355:      // 'property' S VarName ',' 'not(' 'allOf(' 'anyOf('
                    this.lookahead8(882816, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 872373:      // 'property' S VarName ',' 'not(' 'allOf(' 'not('
                    this.lookahead8(888448, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 872376:      // 'property' S VarName ',' 'not(' 'allOf(' 'oneOf('
                    this.lookahead8(894080, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 872380:      // 'property' S VarName ',' 'not(' 'allOf(' 'property'
                    this.lookahead8(899712, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 899715:    // 'property' S VarName ',' 'not(' 'allOf(' 'property' S
                      this.lookahead9(899840, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 899848:  // 'property' S VarName ',' 'not(' 'allOf(' 'property' S VarName
                        this.lookahead10(899968, 50); // S | ')' | ','
                        break;
                      }
                      break;
                    }
                    break;
                  case 872388:      // 'property' S VarName ',' 'not(' 'allOf(' 'variable'
                    this.lookahead8(900096, 1); // S
                    break;
                  }
                  break;
                case 848803:        // 'property' S VarName ',' 'not(' 'anyOf('
                  this.lookahead7(900480, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  break;
                case 848821:        // 'property' S VarName ',' 'not(' 'not('
                  this.lookahead7(928640, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  switch (this.tokenSequence())
                  {
                  case 928643:      // 'property' S VarName ',' 'not(' 'not(' S
                    this.lookahead8(928768, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                    switch (this.tokenSequence())
                    {
                    case 928801:    // 'property' S VarName ',' 'not(' 'not(' S 'allOf('
                      this.lookahead9(928896, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 928899:  // 'property' S VarName ',' 'not(' 'not(' S 'allOf(' S
                        this.lookahead10(929024, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 928929:  // 'property' S VarName ',' 'not(' 'not(' S 'allOf(' 'allOf('
                        this.lookahead10(929152, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 928931:  // 'property' S VarName ',' 'not(' 'not(' S 'allOf(' 'anyOf('
                        this.lookahead10(929280, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 928949:  // 'property' S VarName ',' 'not(' 'not(' S 'allOf(' 'not('
                        this.lookahead10(929408, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 928952:  // 'property' S VarName ',' 'not(' 'not(' S 'allOf(' 'oneOf('
                        this.lookahead10(929536, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 928956:  // 'property' S VarName ',' 'not(' 'not(' S 'allOf(' 'property'
                        this.lookahead10(929664, 1);  // S
                        break;
                      case 928964:  // 'property' S VarName ',' 'not(' 'not(' S 'allOf(' 'variable'
                        this.lookahead10(929792, 1);  // S
                        break;
                      }
                      break;
                    case 928803:    // 'property' S VarName ',' 'not(' 'not(' S 'anyOf('
                      this.lookahead9(929920, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 928821:    // 'property' S VarName ',' 'not(' 'not(' S 'not('
                      this.lookahead9(930944, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 928824:    // 'property' S VarName ',' 'not(' 'not(' S 'oneOf('
                      this.lookahead9(931968, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 928828:    // 'property' S VarName ',' 'not(' 'not(' S 'property'
                      this.lookahead9(932992, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 932995:  // 'property' S VarName ',' 'not(' 'not(' S 'property' S
                        this.lookahead10(933120, 5);  // VarName
                        break;
                      }
                      break;
                    case 928836:    // 'property' S VarName ',' 'not(' 'not(' S 'variable'
                      this.lookahead9(933248, 1); // S
                      break;
                    }
                    break;
                  case 928673:      // 'property' S VarName ',' 'not(' 'not(' 'allOf('
                    this.lookahead8(933504, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    switch (this.tokenSequence())
                    {
                    case 933507:    // 'property' S VarName ',' 'not(' 'not(' 'allOf(' S
                      this.lookahead9(933632, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 933665:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' S 'allOf('
                        this.lookahead10(933760, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 933667:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' S 'anyOf('
                        this.lookahead10(933888, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 933685:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' S 'not('
                        this.lookahead10(934016, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 933688:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' S 'oneOf('
                        this.lookahead10(934144, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 933692:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' S 'property'
                        this.lookahead10(934272, 1);  // S
                        break;
                      case 933700:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' S 'variable'
                        this.lookahead10(934400, 1);  // S
                        break;
                      }
                      break;
                    case 933537:    // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'allOf('
                      this.lookahead9(934528, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 934531:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'allOf(' S
                        this.lookahead10(934656, 68); // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 934561:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'allOf(' 'allOf('
                        this.lookahead10(934784, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 934563:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'allOf(' 'anyOf('
                        this.lookahead10(934912, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 934581:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'allOf(' 'not('
                        this.lookahead10(935040, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 934584:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'allOf(' 'oneOf('
                        this.lookahead10(935168, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                      // 'variable'
                        break;
                      case 934588:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'allOf(' 'property'
                        this.lookahead10(935296, 1);  // S
                        break;
                      case 934596:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'allOf(' 'variable'
                        this.lookahead10(935424, 1);  // S
                        break;
                      }
                      break;
                    case 933539:    // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'anyOf('
                      this.lookahead9(935552, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 933557:    // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'not('
                      this.lookahead9(936576, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 933560:    // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'oneOf('
                      this.lookahead9(937600, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      break;
                    case 933564:    // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'property'
                      this.lookahead9(938624, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 938627:  // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'property' S
                        this.lookahead10(938752, 5);  // VarName
                        break;
                      }
                      break;
                    case 933572:    // 'property' S VarName ',' 'not(' 'not(' 'allOf(' 'variable'
                      this.lookahead9(938880, 1); // S
                      break;
                    }
                    break;
                  case 928675:      // 'property' S VarName ',' 'not(' 'not(' 'anyOf('
                    this.lookahead8(939136, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 928693:      // 'property' S VarName ',' 'not(' 'not(' 'not('
                    this.lookahead8(944768, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 928696:      // 'property' S VarName ',' 'not(' 'not(' 'oneOf('
                    this.lookahead8(950400, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                  // 'variable'
                    break;
                  case 928700:      // 'property' S VarName ',' 'not(' 'not(' 'property'
                    this.lookahead8(956032, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 956035:    // 'property' S VarName ',' 'not(' 'not(' 'property' S
                      this.lookahead9(956160, 5); // VarName
                      switch (this.tokenSequence())
                      {
                      case 956168:  // 'property' S VarName ',' 'not(' 'not(' 'property' S VarName
                        this.lookahead10(956288, 41); // S | ')'
                        break;
                      }
                      break;
                    }
                    break;
                  case 928708:      // 'property' S VarName ',' 'not(' 'not(' 'variable'
                    this.lookahead8(956416, 1); // S
                    break;
                  }
                  break;
                case 848824:        // 'property' S VarName ',' 'not(' 'oneOf('
                  this.lookahead7(956800, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                  break;
                case 848828:        // 'property' S VarName ',' 'not(' 'property'
                  this.lookahead7(984960, 1); // S
                  switch (this.tokenSequence())
                  {
                  case 984963:      // 'property' S VarName ',' 'not(' 'property' S
                    this.lookahead8(985088, 5); // VarName
                    switch (this.tokenSequence())
                    {
                    case 985096:    // 'property' S VarName ',' 'not(' 'property' S VarName
                      this.lookahead9(985216, 41);  // S | ')'
                      switch (this.tokenSequence())
                      {
                      case 985219:  // 'property' S VarName ',' 'not(' 'property' S VarName S
                        this.lookahead10(985344, 66); // ')' | '<' | '<=' | '==' | '>' | '>='
                        break;
                      case 985230:  // 'property' S VarName ',' 'not(' 'property' S VarName ')'
                        this.lookahead10(985472, 50); // S | ')' | ','
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                case 848836:        // 'property' S VarName ',' 'not(' 'variable'
                  this.lookahead7(985600, 1); // S
                  break;
                }
                break;
              case 458936:          // 'property' S VarName ',' 'oneOf('
                this.lookahead6(986240, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
                break;
              case 458940:          // 'property' S VarName ',' 'property'
                this.lookahead6(1123968, 1);  // S
                switch (this.tokenSequence())
                {
                case 1123971:       // 'property' S VarName ',' 'property' S
                  this.lookahead7(1124096, 5);  // VarName
                  switch (this.tokenSequence())
                  {
                  case 1124104:     // 'property' S VarName ',' 'property' S VarName
                    this.lookahead8(1124224, 50); // S | ')' | ','
                    switch (this.tokenSequence())
                    {
                    case 1124227:   // 'property' S VarName ',' 'property' S VarName S
                      this.lookahead9(1124352, 70); // ')' | ',' | '<' | '<=' | '==' | '>' | '>='
                      switch (this.tokenSequence())
                      {
                      case 1124366: // 'property' S VarName ',' 'property' S VarName S ')'
                        this.lookahead10(1124480, 56);  // L | S | ')' | ','
                        break;
                      case 1124367: // 'property' S VarName ',' 'property' S VarName S ','
                        this.lookahead10(1124608, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                        // 'variable'
                        break;
                      case 1124373: // 'property' S VarName ',' 'property' S VarName S '<'
                        this.lookahead10(1124736, 1); // S
                        break;
                      case 1124374: // 'property' S VarName ',' 'property' S VarName S '<='
                        this.lookahead10(1124864, 1); // S
                        break;
                      case 1124375: // 'property' S VarName ',' 'property' S VarName S '=='
                        this.lookahead10(1124992, 1); // S
                        break;
                      case 1124376: // 'property' S VarName ',' 'property' S VarName S '>'
                        this.lookahead10(1125120, 1); // S
                        break;
                      case 1124377: // 'property' S VarName ',' 'property' S VarName S '>='
                        this.lookahead10(1125248, 1); // S
                        break;
                      }
                      break;
                    case 1124238:   // 'property' S VarName ',' 'property' S VarName ')'
                      this.lookahead9(1125376, 56); // L | S | ')' | ','
                      switch (this.tokenSequence())
                      {
                      case 1125378: // 'property' S VarName ',' 'property' S VarName ')' L
                        this.lookahead10(1125504, 67);  // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
                        break;
                      case 1125379: // 'property' S VarName ',' 'property' S VarName ')' S
                        this.lookahead10(1125632, 45);  // ')' | ','
                        break;
                      case 1125390: // 'property' S VarName ',' 'property' S VarName ')' ')'
                        this.lookahead10(1125760, 56);  // L | S | ')' | ','
                        break;
                      case 1125391: // 'property' S VarName ',' 'property' S VarName ')' ','
                        this.lookahead10(1125888, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                        // 'variable'
                        break;
                      }
                      break;
                    case 1124239:   // 'property' S VarName ',' 'property' S VarName ','
                      this.lookahead9(1126016, 69); // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                    // 'variable'
                      switch (this.tokenSequence())
                      {
                      case 1126019: // 'property' S VarName ',' 'property' S VarName ',' S
                        this.lookahead10(1126144, 68);  // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                        // 'variable'
                        break;
                      case 1126049: // 'property' S VarName ',' 'property' S VarName ',' 'allOf('
                        this.lookahead10(1126272, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                        // 'variable'
                        break;
                      case 1126051: // 'property' S VarName ',' 'property' S VarName ',' 'anyOf('
                        this.lookahead10(1126400, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                        // 'variable'
                        break;
                      case 1126069: // 'property' S VarName ',' 'property' S VarName ',' 'not('
                        this.lookahead10(1126528, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                        // 'variable'
                        break;
                      case 1126072: // 'property' S VarName ',' 'property' S VarName ',' 'oneOf('
                        this.lookahead10(1126656, 69);  // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' |
                                                        // 'variable'
                        break;
                      case 1126076: // 'property' S VarName ',' 'property' S VarName ',' 'property'
                        this.lookahead10(1126784, 1); // S
                        break;
                      case 1126084: // 'property' S VarName ',' 'property' S VarName ',' 'variable'
                        this.lookahead10(1126912, 1); // S
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                }
                break;
              case 458948:          // 'property' S VarName ',' 'variable'
                this.lookahead6(1127040, 1);  // S
                break;
              }
              break;
            }
            break;
          }
          break;
        }
        break;
      case 68:                      // 'variable'
        this.lookahead2(1130112, 1);  // S
        break;
      default:
        this.lk = this.l1;
      }
      if (this.tokenSequence() != 29077 // 'property' S VarName S '<'
       && this.tokenSequence() != 1159061 // 'variable' S VarName S '<'
       && this.tokenSequence() != 29078 // 'property' S VarName S '<='
       && this.tokenSequence() != 1159062 // 'variable' S VarName S '<='
       && this.tokenSequence() != 29079 // 'property' S VarName S '=='
       && this.tokenSequence() != 1159063 // 'variable' S VarName S '=='
       && this.tokenSequence() != 29080 // 'property' S VarName S '>'
       && this.tokenSequence() != 1159064 // 'variable' S VarName S '>'
       && this.tokenSequence() != 29081 // 'property' S VarName S '>='
       && this.tokenSequence() != 1159065)  // 'variable' S VarName S '>='
      {
        this.lk = this.memoized(0, this.e0);
        if (this.lk == 0)
        {
          var b0A = this.b0; var e0A = this.e0; var l1A = this.l1;
          var b1A = this.b1; var e1A = this.e1; var l2A = this.l2;
          var b2A = this.b2; var e2A = this.e2; var l3A = this.l3;
          var b3A = this.b3; var e3A = this.e3; var l4A = this.l4;
          var b4A = this.b4; var e4A = this.e4; var l5A = this.l5;
          var b5A = this.b5; var e5A = this.e5; var l6A = this.l6;
          var b6A = this.b6; var e6A = this.e6; var l7A = this.l7;
          var b7A = this.b7; var e7A = this.e7; var l8A = this.l8;
          var b8A = this.b8; var e8A = this.e8; var l9A = this.l9;
          var b9A = this.b9; var e9A = this.e9; var l10A = this.l10;
          var b10A = this.b10; var e10A = this.e10;
          try
          {
            this.try_comparisonEquality();
            this.lk = -1;
          }
          catch (p1A)
          {
            this.lk = -2;
          }
          this.b0 = b0A; this.e0 = e0A; this.l1 = l1A; if (this.l1 == 0) {this.end = e0A;} else {
          this.b1 = b1A; this.e1 = e1A; this.l2 = l2A; if (this.l2 == 0) {this.end = e1A;} else {
          this.b2 = b2A; this.e2 = e2A; this.l3 = l3A; if (this.l3 == 0) {this.end = e2A;} else {
          this.b3 = b3A; this.e3 = e3A; this.l4 = l4A; if (this.l4 == 0) {this.end = e3A;} else {
          this.b4 = b4A; this.e4 = e4A; this.l5 = l5A; if (this.l5 == 0) {this.end = e4A;} else {
          this.b5 = b5A; this.e5 = e5A; this.l6 = l6A; if (this.l6 == 0) {this.end = e5A;} else {
          this.b6 = b6A; this.e6 = e6A; this.l7 = l7A; if (this.l7 == 0) {this.end = e6A;} else {
          this.b7 = b7A; this.e7 = e7A; this.l8 = l8A; if (this.l8 == 0) {this.end = e7A;} else {
          this.b8 = b8A; this.e8 = e8A; this.l9 = l9A; if (this.l9 == 0) {this.end = e8A;} else {
          this.b9 = b9A; this.e9 = e9A; this.l10 = l10A; if (this.l10 == 0) {this.end = e9A;} else {
          this.b10 = b10A; this.e10 = e10A; this.end = e10A; }}}}}}}}}}
          this.memoize(0, this.e0, this.lk);
        }
      }
      switch (this.tokenSequence())
      {
      case -1:
      case 29079:                   // 'property' S VarName S '=='
      case 1159063:                 // 'variable' S VarName S '=='
        this.parse_comparisonEquality();
        break;
      default:
        this.parse_comparisonInequality();
      }
    }

    private parse_comparisonEquality()
    {
      switch (this.token())
      {
      case 68:                      // 'variable'
        this.consume(68);           // 'variable'
        break;
      default:
        this.consume(60);           // 'property'
      }
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(5);           // VarName
      this.consume(8);              // VarName
      this.lookahead1(56);          // L | S | ')' | ','
      switch (this.token())
      {
      case 3:                       // S
        this.lookahead2(128, 54);   // ')' | ',' | '=='
        break;
      default:
        this.lk = this.l1;
      }
      if (this.tokenSequence() == 151)  // S '=='
      {
        this.consume(3);            // S
        this.lookahead1(17);        // '=='
        this.consume(23);           // '=='
        this.lookahead1(1);         // S
        this.consume(3);            // S
        this.lookahead1(64);        // Nr | '"' | 'false' | 'property' | 'true' | 'variable'
        switch (this.token())
        {
        case 67:                    // 'true'
          this.consume(67);         // 'true'
          break;
        case 45:                    // 'false'
          this.consume(45);         // 'false'
          break;
        case 11:                    // '"'
          this.consume(11);         // '"'
          for (;;)
          {
            this.lookahead1(43);    // Char | '"'
            if (this.token() != 9)  // Char
            {
              break;
            }
            this.consume(9);        // Char
          }
          this.consume(11);         // '"'
          break;
        case 10:                    // Nr
          this.consume(10);         // Nr
          break;
        default:
          switch (this.token())
          {
          case 68:                  // 'variable'
            this.consume(68);       // 'variable'
            break;
          default:
            this.consume(60);       // 'property'
          }
          this.lookahead1(1);       // S
          this.consume(3);          // S
          this.lookahead1(5);       // VarName
          this.consume(8);          // VarName
        }
      }
    }

    private try_comparisonEquality()
    {
      switch (this.token())
      {
      case 68:                      // 'variable'
        this.consumeT(68);          // 'variable'
        break;
      default:
        this.consumeT(60);          // 'property'
      }
      this.lookahead1(1);           // S
      this.consumeT(3);             // S
      this.lookahead1(5);           // VarName
      this.consumeT(8);             // VarName
      this.lookahead1(56);          // L | S | ')' | ','
      switch (this.token())
      {
      case 3:                       // S
        this.lookahead2(128, 54);   // ')' | ',' | '=='
        break;
      default:
        this.lk = this.l1;
      }
      if (this.tokenSequence() == 151)  // S '=='
      {
        this.consumeT(3);           // S
        this.lookahead1(17);        // '=='
        this.consumeT(23);          // '=='
        this.lookahead1(1);         // S
        this.consumeT(3);           // S
        this.lookahead1(64);        // Nr | '"' | 'false' | 'property' | 'true' | 'variable'
        switch (this.token())
        {
        case 67:                    // 'true'
          this.consumeT(67);        // 'true'
          break;
        case 45:                    // 'false'
          this.consumeT(45);        // 'false'
          break;
        case 11:                    // '"'
          this.consumeT(11);        // '"'
          for (;;)
          {
            this.lookahead1(43);    // Char | '"'
            if (this.token() != 9)  // Char
            {
              break;
            }
            this.consumeT(9);       // Char
          }
          this.consumeT(11);        // '"'
          break;
        case 10:                    // Nr
          this.consumeT(10);        // Nr
          break;
        default:
          switch (this.token())
          {
          case 68:                  // 'variable'
            this.consumeT(68);      // 'variable'
            break;
          default:
            this.consumeT(60);      // 'property'
          }
          this.lookahead1(1);       // S
          this.consumeT(3);         // S
          this.lookahead1(5);       // VarName
          this.consumeT(8);         // VarName
        }
      }
    }

    private parse_comparisonInequality()
    {
      switch (this.token())
      {
      case 68:                      // 'variable'
        this.consume(68);           // 'variable'
        break;
      default:
        this.consume(60);           // 'property'
      }
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(5);           // VarName
      this.consume(8);              // VarName
      this.lookahead1(56);          // L | S | ')' | ','
      switch (this.token())
      {
      case 3:                       // S
        this.lookahead2(128, 65);   // ')' | ',' | '<' | '<=' | '>' | '>='
        break;
      default:
        this.lk = this.l1;
      }
      if (this.tokenSequence() == 149 // S '<'
       || this.tokenSequence() == 150 // S '<='
       || this.tokenSequence() == 152 // S '>'
       || this.tokenSequence() == 153)  // S '>='
      {
        this.consume(3);            // S
        this.lookahead1(59);        // '<' | '<=' | '>' | '>='
        switch (this.token())
        {
        case 24:                    // '>'
          this.consume(24);         // '>'
          break;
        case 25:                    // '>='
          this.consume(25);         // '>='
          break;
        case 21:                    // '<'
          this.consume(21);         // '<'
          break;
        default:
          this.consume(22);         // '<='
        }
        this.lookahead1(1);         // S
        this.consume(3);            // S
        this.lookahead1(52);        // Nr | 'property' | 'variable'
        switch (this.token())
        {
        case 10:                    // Nr
          this.consume(10);         // Nr
          break;
        default:
          switch (this.token())
          {
          case 68:                  // 'variable'
            this.consume(68);       // 'variable'
            break;
          default:
            this.consume(60);       // 'property'
          }
          this.lookahead1(1);       // S
          this.consume(3);          // S
          this.lookahead1(5);       // VarName
          this.consume(8);          // VarName
        }
      }
    }

    private parse_interaction()
    {
      this.consume(49);             // 'group'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(35);          // 'strict'
      this.consume(65);             // 'strict'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.parse_interactionRecCont();
      this.parse_interactionSendCont();
      this.lookahead1(27);          // 'end'
      this.consume(43);             // 'end'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_interactionRecCont()
    {
      this.lookahead1(32);          // 'par'
      this.consume(59);             // 'par'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      for (;;)
      {
        this.lookahead1(57);        // '"Agent"' | 'break' | 'end' | 'note'
        if (this.token() != 12      // '"Agent"'
         && this.token() != 54)     // 'note'
        {
          break;
        }
        this.parse_interactionReceive();
        this.lookahead1(63);        // '"Agent"' | 'break' | 'else' | 'end' | 'note'
        if (this.token() == 41)     // 'else'
        {
          this.consume(41);         // 'else'
          this.lookahead1(0);       // L
          this.consume(2);          // L
        }
      }
      if (this.token() == 36)       // 'break'
      {
        this.consume(36);           // 'break'
        this.lookahead1(1);         // S
        this.consume(3);            // S
        this.lookahead1(25);        // 'data-pushed'
        this.consume(38);           // 'data-pushed'
        this.lookahead1(0);         // L
        this.consume(2);            // L
        this.lookahead1(27);        // 'end'
        this.consume(43);           // 'end'
        this.lookahead1(0);         // L
        this.consume(2);            // L
      }
      this.lookahead1(27);          // 'end'
      this.consume(43);             // 'end'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_interactionSendCont()
    {
      this.lookahead1(32);          // 'par'
      this.consume(59);             // 'par'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      for (;;)
      {
        this.lookahead1(53);        // '"Agent"' | 'end' | 'note'
        if (this.token() == 43)     // 'end'
        {
          break;
        }
        this.parse_interactionSend();
        this.lookahead1(58);        // '"Agent"' | 'else' | 'end' | 'note'
        if (this.token() == 41)     // 'else'
        {
          this.consume(41);         // 'else'
          this.lookahead1(0);       // L
          this.consume(2);          // L
        }
      }
      this.consume(43);             // 'end'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_interactionReceive()
    {
      if (this.token() == 54)       // 'note'
      {
        this.parse_getset();
      }
      this.parse_interactionPre();
      this.lookahead1(61);          // 'invokeAction:' | 'observeProperty:' | 'readProperty:' | 'subscribeEvent:'
      switch (this.token())
      {
      case 66:                      // 'subscribeEvent:'
        this.parse_receiveSubs();
        break;
      case 50:                      // 'invokeAction:'
        this.parse_receiveInv();
        break;
      case 55:                      // 'observeProperty:'
        this.parse_receiveObs();
        break;
      default:
        this.parse_receiveRead();
      }
      this.lookahead1(63);          // '"Agent"' | 'break' | 'else' | 'end' | 'note'
      switch (this.token())
      {
      case 54:                      // 'note'
        this.lookahead2(128, 1);    // S
        switch (this.tokenSequence())
        {
        case 131:                   // 'note' S
          this.lookahead3(256, 31); // 'over'
          switch (this.tokenSequence())
          {
          case 314:                 // 'note' S 'over'
            this.lookahead4(384, 1);  // S
            switch (this.tokenSequence())
            {
            case 387:               // 'note' S 'over' S
              this.lookahead5(512, 44); // '"' | 'Agent'
              switch (this.tokenSequence())
              {
              case 523:             // 'note' S 'over' S '"'
                this.lookahead6(640, 21); // 'Agent'
                switch (this.tokenSequence())
                {
                case 668:           // 'note' S 'over' S '"' 'Agent'
                  this.lookahead7(768, 40); // L | '"'
                  switch (this.tokenSequence())
                  {
                  case 770:         // 'note' S 'over' S '"' 'Agent' L
                    this.lookahead8(896, 55); // 'defaultInput' | 'get' | 'set'
                    switch (this.tokenSequence())
                    {
                    case 936:       // 'note' S 'over' S '"' 'Agent' L 'defaultInput'
                      this.lookahead9(1024, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 1027:    // 'note' S 'over' S '"' 'Agent' L 'defaultInput' S
                        this.lookahead10(1152, 62); // Nr | '"' | 'false' | 'true' | '{'
                        break;
                      }
                      break;
                    case 944:       // 'note' S 'over' S '"' 'Agent' L 'get'
                      this.lookahead9(1280, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 1283:    // 'note' S 'over' S '"' 'Agent' L 'get' S
                        this.lookahead10(1408, 48); // 'property' | 'variable'
                        break;
                      }
                      break;
                    case 960:       // 'note' S 'over' S '"' 'Agent' L 'set'
                      this.lookahead9(1536, 1); // S
                      break;
                    }
                    break;
                  case 779:         // 'note' S 'over' S '"' 'Agent' '"'
                    this.lookahead8(1792, 0); // L
                    switch (this.tokenSequence())
                    {
                    case 1794:      // 'note' S 'over' S '"' 'Agent' '"' L
                      this.lookahead9(1920, 55);  // 'defaultInput' | 'get' | 'set'
                      switch (this.tokenSequence())
                      {
                      case 1960:    // 'note' S 'over' S '"' 'Agent' '"' L 'defaultInput'
                        this.lookahead10(2048, 1);  // S
                        break;
                      case 1968:    // 'note' S 'over' S '"' 'Agent' '"' L 'get'
                        this.lookahead10(2176, 1);  // S
                        break;
                      case 1984:    // 'note' S 'over' S '"' 'Agent' '"' L 'set'
                        this.lookahead10(2304, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                }
                break;
              case 540:             // 'note' S 'over' S 'Agent'
                this.lookahead6(2432, 40);  // L | '"'
                switch (this.tokenSequence())
                {
                case 2434:          // 'note' S 'over' S 'Agent' L
                  this.lookahead7(2560, 55);  // 'defaultInput' | 'get' | 'set'
                  switch (this.tokenSequence())
                  {
                  case 2600:        // 'note' S 'over' S 'Agent' L 'defaultInput'
                    this.lookahead8(2688, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 2691:      // 'note' S 'over' S 'Agent' L 'defaultInput' S
                      this.lookahead9(2816, 62);  // Nr | '"' | 'false' | 'true' | '{'
                      switch (this.tokenSequence())
                      {
                      case 2826:    // 'note' S 'over' S 'Agent' L 'defaultInput' S Nr
                        this.lookahead10(2944, 0);  // L
                        break;
                      case 2827:    // 'note' S 'over' S 'Agent' L 'defaultInput' S '"'
                        this.lookahead10(3072, 43); // Char | '"'
                        break;
                      case 2861:    // 'note' S 'over' S 'Agent' L 'defaultInput' S 'false'
                        this.lookahead10(3200, 0);  // L
                        break;
                      case 2883:    // 'note' S 'over' S 'Agent' L 'defaultInput' S 'true'
                        this.lookahead10(3328, 0);  // L
                        break;
                      case 2888:    // 'note' S 'over' S 'Agent' L 'defaultInput' S '{'
                        this.lookahead10(3456, 42); // Nchar | '}'
                        break;
                      }
                      break;
                    }
                    break;
                  case 2608:        // 'note' S 'over' S 'Agent' L 'get'
                    this.lookahead8(3584, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 3587:      // 'note' S 'over' S 'Agent' L 'get' S
                      this.lookahead9(3712, 48);  // 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 3772:    // 'note' S 'over' S 'Agent' L 'get' S 'property'
                        this.lookahead10(3840, 1);  // S
                        break;
                      case 3780:    // 'note' S 'over' S 'Agent' L 'get' S 'variable'
                        this.lookahead10(3968, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 2624:        // 'note' S 'over' S 'Agent' L 'set'
                    this.lookahead8(4096, 1); // S
                    break;
                  }
                  break;
                case 2443:          // 'note' S 'over' S 'Agent' '"'
                  this.lookahead7(4608, 0); // L
                  switch (this.tokenSequence())
                  {
                  case 4610:        // 'note' S 'over' S 'Agent' '"' L
                    this.lookahead8(4736, 55);  // 'defaultInput' | 'get' | 'set'
                    switch (this.tokenSequence())
                    {
                    case 4776:      // 'note' S 'over' S 'Agent' '"' L 'defaultInput'
                      this.lookahead9(4864, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 4867:    // 'note' S 'over' S 'Agent' '"' L 'defaultInput' S
                        this.lookahead10(4992, 62); // Nr | '"' | 'false' | 'true' | '{'
                        break;
                      }
                      break;
                    case 4784:      // 'note' S 'over' S 'Agent' '"' L 'get'
                      this.lookahead9(5120, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 5123:    // 'note' S 'over' S 'Agent' '"' L 'get' S
                        this.lookahead10(5248, 48); // 'property' | 'variable'
                        break;
                      }
                      break;
                    case 4800:      // 'note' S 'over' S 'Agent' '"' L 'set'
                      this.lookahead9(5376, 1); // S
                      break;
                    }
                    break;
                  }
                  break;
                }
                break;
              }
              break;
            }
            break;
          }
          break;
        }
        break;
      default:
        this.lk = this.l1;
      }
      if (this.tokenSequence() != 12  // '"Agent"'
       && this.tokenSequence() != 36  // 'break'
       && this.tokenSequence() != 41  // 'else'
       && this.tokenSequence() != 43) // 'end'
      {
        this.lk = this.memoized(1, this.e0);
        if (this.lk == 0)
        {
          var b0A = this.b0; var e0A = this.e0; var l1A = this.l1;
          var b1A = this.b1; var e1A = this.e1; var l2A = this.l2;
          var b2A = this.b2; var e2A = this.e2; var l3A = this.l3;
          var b3A = this.b3; var e3A = this.e3; var l4A = this.l4;
          var b4A = this.b4; var e4A = this.e4; var l5A = this.l5;
          var b5A = this.b5; var e5A = this.e5; var l6A = this.l6;
          var b6A = this.b6; var e6A = this.e6; var l7A = this.l7;
          var b7A = this.b7; var e7A = this.e7; var l8A = this.l8;
          var b8A = this.b8; var e8A = this.e8; var l9A = this.l9;
          var b9A = this.b9; var e9A = this.e9; var l10A = this.l10;
          var b10A = this.b10; var e10A = this.e10;
          try
          {
            this.try_getset();
            this.lk = -1;
          }
          catch (p1A)
          {
            this.lk = -2;
          }
          this.b0 = b0A; this.e0 = e0A; this.l1 = l1A; if (this.l1 == 0) {this.end = e0A;} else {
          this.b1 = b1A; this.e1 = e1A; this.l2 = l2A; if (this.l2 == 0) {this.end = e1A;} else {
          this.b2 = b2A; this.e2 = e2A; this.l3 = l3A; if (this.l3 == 0) {this.end = e2A;} else {
          this.b3 = b3A; this.e3 = e3A; this.l4 = l4A; if (this.l4 == 0) {this.end = e3A;} else {
          this.b4 = b4A; this.e4 = e4A; this.l5 = l5A; if (this.l5 == 0) {this.end = e4A;} else {
          this.b5 = b5A; this.e5 = e5A; this.l6 = l6A; if (this.l6 == 0) {this.end = e5A;} else {
          this.b6 = b6A; this.e6 = e6A; this.l7 = l7A; if (this.l7 == 0) {this.end = e6A;} else {
          this.b7 = b7A; this.e7 = e7A; this.l8 = l8A; if (this.l8 == 0) {this.end = e7A;} else {
          this.b8 = b8A; this.e8 = e8A; this.l9 = l9A; if (this.l9 == 0) {this.end = e8A;} else {
          this.b9 = b9A; this.e9 = e9A; this.l10 = l10A; if (this.l10 == 0) {this.end = e9A;} else {
          this.b10 = b10A; this.e10 = e10A; this.end = e10A; }}}}}}}}}}
          this.memoize(1, this.e0, this.lk);
        }
      }
      if (this.tokenSequence() == -1)
      {
        this.parse_getset();
      }
    }

    private parse_interactionSend()
    {
      if (this.token() == 54)       // 'note'
      {
        this.parse_getset();
      }
      this.parse_interactionPre();
      this.lookahead1(47);          // 'invokeAction:' | 'writeProperty:'
      switch (this.token())
      {
      case 70:                      // 'writeProperty:'
        this.parse_sendWrite();
        break;
      default:
        this.parse_sendInv();
      }
      this.parse_sendPost();
      this.lookahead1(58);          // '"Agent"' | 'else' | 'end' | 'note'
      switch (this.token())
      {
      case 54:                      // 'note'
        this.lookahead2(128, 1);    // S
        switch (this.tokenSequence())
        {
        case 131:                   // 'note' S
          this.lookahead3(256, 31); // 'over'
          switch (this.tokenSequence())
          {
          case 314:                 // 'note' S 'over'
            this.lookahead4(384, 1);  // S
            switch (this.tokenSequence())
            {
            case 387:               // 'note' S 'over' S
              this.lookahead5(512, 44); // '"' | 'Agent'
              switch (this.tokenSequence())
              {
              case 523:             // 'note' S 'over' S '"'
                this.lookahead6(640, 21); // 'Agent'
                switch (this.tokenSequence())
                {
                case 668:           // 'note' S 'over' S '"' 'Agent'
                  this.lookahead7(768, 40); // L | '"'
                  switch (this.tokenSequence())
                  {
                  case 770:         // 'note' S 'over' S '"' 'Agent' L
                    this.lookahead8(896, 55); // 'defaultInput' | 'get' | 'set'
                    switch (this.tokenSequence())
                    {
                    case 936:       // 'note' S 'over' S '"' 'Agent' L 'defaultInput'
                      this.lookahead9(1024, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 1027:    // 'note' S 'over' S '"' 'Agent' L 'defaultInput' S
                        this.lookahead10(1152, 62); // Nr | '"' | 'false' | 'true' | '{'
                        break;
                      }
                      break;
                    case 944:       // 'note' S 'over' S '"' 'Agent' L 'get'
                      this.lookahead9(1280, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 1283:    // 'note' S 'over' S '"' 'Agent' L 'get' S
                        this.lookahead10(1408, 48); // 'property' | 'variable'
                        break;
                      }
                      break;
                    case 960:       // 'note' S 'over' S '"' 'Agent' L 'set'
                      this.lookahead9(1536, 1); // S
                      break;
                    }
                    break;
                  case 779:         // 'note' S 'over' S '"' 'Agent' '"'
                    this.lookahead8(1792, 0); // L
                    switch (this.tokenSequence())
                    {
                    case 1794:      // 'note' S 'over' S '"' 'Agent' '"' L
                      this.lookahead9(1920, 55);  // 'defaultInput' | 'get' | 'set'
                      switch (this.tokenSequence())
                      {
                      case 1960:    // 'note' S 'over' S '"' 'Agent' '"' L 'defaultInput'
                        this.lookahead10(2048, 1);  // S
                        break;
                      case 1968:    // 'note' S 'over' S '"' 'Agent' '"' L 'get'
                        this.lookahead10(2176, 1);  // S
                        break;
                      case 1984:    // 'note' S 'over' S '"' 'Agent' '"' L 'set'
                        this.lookahead10(2304, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  }
                  break;
                }
                break;
              case 540:             // 'note' S 'over' S 'Agent'
                this.lookahead6(2432, 40);  // L | '"'
                switch (this.tokenSequence())
                {
                case 2434:          // 'note' S 'over' S 'Agent' L
                  this.lookahead7(2560, 55);  // 'defaultInput' | 'get' | 'set'
                  switch (this.tokenSequence())
                  {
                  case 2600:        // 'note' S 'over' S 'Agent' L 'defaultInput'
                    this.lookahead8(2688, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 2691:      // 'note' S 'over' S 'Agent' L 'defaultInput' S
                      this.lookahead9(2816, 62);  // Nr | '"' | 'false' | 'true' | '{'
                      switch (this.tokenSequence())
                      {
                      case 2826:    // 'note' S 'over' S 'Agent' L 'defaultInput' S Nr
                        this.lookahead10(2944, 0);  // L
                        break;
                      case 2827:    // 'note' S 'over' S 'Agent' L 'defaultInput' S '"'
                        this.lookahead10(3072, 43); // Char | '"'
                        break;
                      case 2861:    // 'note' S 'over' S 'Agent' L 'defaultInput' S 'false'
                        this.lookahead10(3200, 0);  // L
                        break;
                      case 2883:    // 'note' S 'over' S 'Agent' L 'defaultInput' S 'true'
                        this.lookahead10(3328, 0);  // L
                        break;
                      case 2888:    // 'note' S 'over' S 'Agent' L 'defaultInput' S '{'
                        this.lookahead10(3456, 42); // Nchar | '}'
                        break;
                      }
                      break;
                    }
                    break;
                  case 2608:        // 'note' S 'over' S 'Agent' L 'get'
                    this.lookahead8(3584, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 3587:      // 'note' S 'over' S 'Agent' L 'get' S
                      this.lookahead9(3712, 48);  // 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 3772:    // 'note' S 'over' S 'Agent' L 'get' S 'property'
                        this.lookahead10(3840, 1);  // S
                        break;
                      case 3780:    // 'note' S 'over' S 'Agent' L 'get' S 'variable'
                        this.lookahead10(3968, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 2624:        // 'note' S 'over' S 'Agent' L 'set'
                    this.lookahead8(4096, 1); // S
                    break;
                  }
                  break;
                case 2443:          // 'note' S 'over' S 'Agent' '"'
                  this.lookahead7(4608, 0); // L
                  switch (this.tokenSequence())
                  {
                  case 4610:        // 'note' S 'over' S 'Agent' '"' L
                    this.lookahead8(4736, 55);  // 'defaultInput' | 'get' | 'set'
                    switch (this.tokenSequence())
                    {
                    case 4776:      // 'note' S 'over' S 'Agent' '"' L 'defaultInput'
                      this.lookahead9(4864, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 4867:    // 'note' S 'over' S 'Agent' '"' L 'defaultInput' S
                        this.lookahead10(4992, 62); // Nr | '"' | 'false' | 'true' | '{'
                        break;
                      }
                      break;
                    case 4784:      // 'note' S 'over' S 'Agent' '"' L 'get'
                      this.lookahead9(5120, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 5123:    // 'note' S 'over' S 'Agent' '"' L 'get' S
                        this.lookahead10(5248, 48); // 'property' | 'variable'
                        break;
                      }
                      break;
                    case 4800:      // 'note' S 'over' S 'Agent' '"' L 'set'
                      this.lookahead9(5376, 1); // S
                      break;
                    }
                    break;
                  }
                  break;
                }
                break;
              }
              break;
            }
            break;
          }
          break;
        }
        break;
      default:
        this.lk = this.l1;
      }
      if (this.tokenSequence() != 12  // '"Agent"'
       && this.tokenSequence() != 41  // 'else'
       && this.tokenSequence() != 43) // 'end'
      {
        this.lk = this.memoized(2, this.e0);
        if (this.lk == 0)
        {
          var b0A = this.b0; var e0A = this.e0; var l1A = this.l1;
          var b1A = this.b1; var e1A = this.e1; var l2A = this.l2;
          var b2A = this.b2; var e2A = this.e2; var l3A = this.l3;
          var b3A = this.b3; var e3A = this.e3; var l4A = this.l4;
          var b4A = this.b4; var e4A = this.e4; var l5A = this.l5;
          var b5A = this.b5; var e5A = this.e5; var l6A = this.l6;
          var b6A = this.b6; var e6A = this.e6; var l7A = this.l7;
          var b7A = this.b7; var e7A = this.e7; var l8A = this.l8;
          var b8A = this.b8; var e8A = this.e8; var l9A = this.l9;
          var b9A = this.b9; var e9A = this.e9; var l10A = this.l10;
          var b10A = this.b10; var e10A = this.e10;
          try
          {
            this.try_getset();
            this.lk = -1;
          }
          catch (p1A)
          {
            this.lk = -2;
          }
          this.b0 = b0A; this.e0 = e0A; this.l1 = l1A; if (this.l1 == 0) {this.end = e0A;} else {
          this.b1 = b1A; this.e1 = e1A; this.l2 = l2A; if (this.l2 == 0) {this.end = e1A;} else {
          this.b2 = b2A; this.e2 = e2A; this.l3 = l3A; if (this.l3 == 0) {this.end = e2A;} else {
          this.b3 = b3A; this.e3 = e3A; this.l4 = l4A; if (this.l4 == 0) {this.end = e3A;} else {
          this.b4 = b4A; this.e4 = e4A; this.l5 = l5A; if (this.l5 == 0) {this.end = e4A;} else {
          this.b5 = b5A; this.e5 = e5A; this.l6 = l6A; if (this.l6 == 0) {this.end = e5A;} else {
          this.b6 = b6A; this.e6 = e6A; this.l7 = l7A; if (this.l7 == 0) {this.end = e6A;} else {
          this.b7 = b7A; this.e7 = e7A; this.l8 = l8A; if (this.l8 == 0) {this.end = e7A;} else {
          this.b8 = b8A; this.e8 = e8A; this.l9 = l9A; if (this.l9 == 0) {this.end = e8A;} else {
          this.b9 = b9A; this.e9 = e9A; this.l10 = l10A; if (this.l10 == 0) {this.end = e9A;} else {
          this.b10 = b10A; this.e10 = e10A; this.end = e10A; }}}}}}}}}}
          this.memoize(2, this.e0, this.lk);
        }
      }
      if (this.tokenSequence() == -1)
      {
        this.parse_getset();
      }
    }

    private parse_interactionPre()
    {
      this.lookahead1(8);           // '"Agent"'
      this.consume(12);             // '"Agent"'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(14);          // '->'
      this.consume(18);             // '->'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.parse_interactionTo();
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(16);          // ':'
      this.consume(20);             // ':'
      this.lookahead1(1);           // S
      this.consume(3);              // S
    }

    private parse_receiveRead()
    {
      this.consume(61);             // 'readProperty:'
      this.parse_receiveMiddle();
      this.parse_readResponse();
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.parse_deactTo();
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_receiveSubs()
    {
      this.consume(66);             // 'subscribeEvent:'
      this.parse_receiveSubsObsPost();
    }

    private parse_receiveObs()
    {
      this.consume(55);             // 'observeProperty:'
      this.parse_receiveSubsObsPost();
    }

    private parse_receiveInv()
    {
      this.consume(50);             // 'invokeAction:'
      this.parse_receiveMiddle();
      this.parse_invConfirmation();
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.parse_deactTo();
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_receiveSubsObsPost()
    {
      this.parse_receiveMiddle();
      this.parse_subsObsConfirmation();
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.parse_subsObsData();
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_receiveMiddle()
    {
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.parse_interactionName();
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.parse_actTo();
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_sendWrite()
    {
      this.consume(70);             // 'writeProperty:'
    }

    private parse_sendInv()
    {
      this.consume(50);             // 'invokeAction:'
    }

    private parse_sendPost()
    {
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.parse_interactionName();
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_readResponse()
    {
      this.parse_interactionTo();
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(12);          // '-'
      this.consume(16);             // '-'
      this.lookahead1(14);          // '->'
      this.consume(18);             // '->'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(8);           // '"Agent"'
      this.consume(12);             // '"Agent"'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(16);          // ':'
      this.consume(20);             // ':'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(34);          // 'response'
      this.consume(63);             // 'response'
    }

    private parse_subsObsConfirmation()
    {
      this.parse_interactionTo();
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(13);          // '-->'
      this.consume(17);             // '-->'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(8);           // '"Agent"'
      this.consume(12);             // '"Agent"'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(16);          // ':'
      this.consume(20);             // ':'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(24);          // 'confirmation'
      this.consume(37);             // 'confirmation'
    }

    private parse_subsObsData()
    {
      this.parse_interactionTo();
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(14);          // '->'
      this.consume(18);             // '->'
      this.lookahead1(18);          // '>'
      this.consume(24);             // '>'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(8);           // '"Agent"'
      this.consume(12);             // '"Agent"'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(16);          // ':'
      this.consume(20);             // ':'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(25);          // 'data-pushed'
      this.consume(38);             // 'data-pushed'
    }

    private parse_invConfirmation()
    {
      this.parse_interactionTo();
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(12);          // '-'
      this.consume(16);             // '-'
      this.lookahead1(14);          // '->'
      this.consume(18);             // '->'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(8);           // '"Agent"'
      this.consume(12);             // '"Agent"'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(16);          // ':'
      this.consume(20);             // ':'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(30);          // 'output'
      this.consume(57);             // 'output'
    }

    private parse_actTo()
    {
      this.lookahead1(23);          // 'activate'
      this.consume(32);             // 'activate'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.parse_interactionTo();
    }

    private parse_deactTo()
    {
      this.lookahead1(26);          // 'deactivate'
      this.consume(39);             // 'deactivate'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.parse_interactionTo();
    }

    private parse_interactionTo()
    {
      this.lookahead1(7);           // '"'
      this.consume(11);             // '"'
      this.lookahead1(3);           // Ntitle
      this.consume(5);              // Ntitle
      this.lookahead1(7);           // '"'
      this.consume(11);             // '"'
    }

    private parse_interactionName()
    {
      this.lookahead1(7);           // '"'
      this.consume(11);             // '"'
      this.lookahead1(3);           // Ntitle
      this.consume(5);              // Ntitle
      this.lookahead1(7);           // '"'
      this.consume(11);             // '"'
    }

    private parse_getset()
    {
      this.consume(54);             // 'note'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(31);          // 'over'
      this.consume(58);             // 'over'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(44);          // '"' | 'Agent'
      if (this.token() == 11)       // '"'
      {
        this.consume(11);           // '"'
      }
      this.lookahead1(21);          // 'Agent'
      this.consume(28);             // 'Agent'
      this.lookahead1(40);          // L | '"'
      if (this.token() == 11)       // '"'
      {
        this.consume(11);           // '"'
      }
      this.lookahead1(0);           // L
      this.consume(2);              // L
      for (;;)
      {
        this.lookahead1(55);        // 'defaultInput' | 'get' | 'set'
        switch (this.token())
        {
        case 40:                    // 'defaultInput'
          this.consume(40);         // 'defaultInput'
          this.lookahead1(1);       // S
          this.consume(3);          // S
          this.lookahead1(62);      // Nr | '"' | 'false' | 'true' | '{'
          switch (this.token())
          {
          case 67:                  // 'true'
            this.consume(67);       // 'true'
            break;
          case 45:                  // 'false'
            this.consume(45);       // 'false'
            break;
          case 11:                  // '"'
            this.consume(11);       // '"'
            for (;;)
            {
              this.lookahead1(43);  // Char | '"'
              if (this.token() != 9)  // Char
              {
                break;
              }
              this.consume(9);      // Char
            }
            this.consume(11);       // '"'
            break;
          case 10:                  // Nr
            this.consume(10);       // Nr
            break;
          default:
            this.consume(72);       // '{'
            for (;;)
            {
              this.lookahead1(42);  // Nchar | '}'
              if (this.token() != 6)  // Nchar
              {
                break;
              }
              this.consume(6);      // Nchar
            }
            this.consume(73);       // '}'
          }
          break;
        default:
          switch (this.token())
          {
          case 48:                  // 'get'
            this.consume(48);       // 'get'
            break;
          default:
            this.consume(64);       // 'set'
          }
          this.lookahead1(1);       // S
          this.consume(3);          // S
          this.lookahead1(48);      // 'property' | 'variable'
          switch (this.token())
          {
          case 68:                  // 'variable'
            this.consume(68);       // 'variable'
            break;
          default:
            this.consume(60);       // 'property'
          }
          this.lookahead1(1);       // S
          this.consume(3);          // S
          this.lookahead1(5);       // VarName
          this.consume(8);          // VarName
        }
        this.lookahead1(0);         // L
        this.consume(2);            // L
        this.lookahead1(60);        // 'defaultInput' | 'end' | 'get' | 'set'
        if (this.token() == 43)     // 'end'
        {
          break;
        }
      }
      this.consume(43);             // 'end'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(29);          // 'note'
      this.consume(54);             // 'note'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private try_getset()
    {
      this.consumeT(54);            // 'note'
      this.lookahead1(1);           // S
      this.consumeT(3);             // S
      this.lookahead1(31);          // 'over'
      this.consumeT(58);            // 'over'
      this.lookahead1(1);           // S
      this.consumeT(3);             // S
      this.lookahead1(44);          // '"' | 'Agent'
      if (this.token() == 11)       // '"'
      {
        this.consumeT(11);          // '"'
      }
      this.lookahead1(21);          // 'Agent'
      this.consumeT(28);            // 'Agent'
      this.lookahead1(40);          // L | '"'
      if (this.token() == 11)       // '"'
      {
        this.consumeT(11);          // '"'
      }
      this.lookahead1(0);           // L
      this.consumeT(2);             // L
      for (;;)
      {
        this.lookahead1(55);        // 'defaultInput' | 'get' | 'set'
        switch (this.token())
        {
        case 40:                    // 'defaultInput'
          this.consumeT(40);        // 'defaultInput'
          this.lookahead1(1);       // S
          this.consumeT(3);         // S
          this.lookahead1(62);      // Nr | '"' | 'false' | 'true' | '{'
          switch (this.token())
          {
          case 67:                  // 'true'
            this.consumeT(67);      // 'true'
            break;
          case 45:                  // 'false'
            this.consumeT(45);      // 'false'
            break;
          case 11:                  // '"'
            this.consumeT(11);      // '"'
            for (;;)
            {
              this.lookahead1(43);  // Char | '"'
              if (this.token() != 9)  // Char
              {
                break;
              }
              this.consumeT(9);     // Char
            }
            this.consumeT(11);      // '"'
            break;
          case 10:                  // Nr
            this.consumeT(10);      // Nr
            break;
          default:
            this.consumeT(72);      // '{'
            for (;;)
            {
              this.lookahead1(42);  // Nchar | '}'
              if (this.token() != 6)  // Nchar
              {
                break;
              }
              this.consumeT(6);     // Nchar
            }
            this.consumeT(73);      // '}'
          }
          break;
        default:
          switch (this.token())
          {
          case 48:                  // 'get'
            this.consumeT(48);      // 'get'
            break;
          default:
            this.consumeT(64);      // 'set'
          }
          this.lookahead1(1);       // S
          this.consumeT(3);         // S
          this.lookahead1(48);      // 'property' | 'variable'
          switch (this.token())
          {
          case 68:                  // 'variable'
            this.consumeT(68);      // 'variable'
            break;
          default:
            this.consumeT(60);      // 'property'
          }
          this.lookahead1(1);       // S
          this.consumeT(3);         // S
          this.lookahead1(5);       // VarName
          this.consumeT(8);         // VarName
        }
        this.lookahead1(0);         // L
        this.consumeT(2);           // L
        this.lookahead1(60);        // 'defaultInput' | 'end' | 'get' | 'set'
        if (this.token() == 43)     // 'end'
        {
          break;
        }
      }
      this.consumeT(43);            // 'end'
      this.lookahead1(1);           // S
      this.consumeT(3);             // S
      this.lookahead1(29);          // 'note'
      this.consumeT(54);            // 'note'
      this.lookahead1(0);           // L
      this.consumeT(2);             // L
    }

    private parse_ref()
    {
      this.consume(62);             // 'ref'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(31);          // 'over'
      this.consume(58);             // 'over'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(44);          // '"' | 'Agent'
      if (this.token() == 11)       // '"'
      {
        this.consume(11);           // '"'
      }
      this.lookahead1(21);          // 'Agent'
      this.consume(28);             // 'Agent'
      this.lookahead1(40);          // L | '"'
      if (this.token() == 11)       // '"'
      {
        this.consume(11);           // '"'
      }
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(46);          // 'action' | 'function'
      switch (this.token())
      {
      case 47:                      // 'function'
        this.consume(47);           // 'function'
        break;
      default:
        this.consume(31);           // 'action'
      }
      this.lookahead1(16);          // ':'
      this.consume(20);             // ':'
      this.lookahead1(5);           // VarName
      this.consume(8);              // VarName
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(27);          // 'end'
      this.consume(43);             // 'end'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(33);          // 'ref'
      this.consume(62);             // 'ref'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private consume(t: number)
    {
      if (this.l1 == t)
      {
        this.b0 = this.b1; this.e0 = this.e1; this.l1 = this.l2; if (this.l1 != 0) {
        this.b1 = this.b2; this.e1 = this.e2; this.l2 = this.l3; if (this.l2 != 0) {
        this.b2 = this.b3; this.e2 = this.e3; this.l3 = this.l4; if (this.l3 != 0) {
        this.b3 = this.b4; this.e3 = this.e4; this.l4 = this.l5; if (this.l4 != 0) {
        this.b4 = this.b5; this.e4 = this.e5; this.l5 = this.l6; if (this.l5 != 0) {
        this.b5 = this.b6; this.e5 = this.e6; this.l6 = this.l7; if (this.l6 != 0) {
        this.b6 = this.b7; this.e6 = this.e7; this.l7 = this.l8; if (this.l7 != 0) {
        this.b7 = this.b8; this.e7 = this.e8; this.l8 = this.l9; if (this.l8 != 0) {
        this.b8 = this.b9; this.e8 = this.e9; this.l9 = this.l10; if (this.l9 != 0) {
        this.b9 = this.b10; this.e9 = this.e10; this.l10 = 0; }}}}}}}}}
      }
      else
      {
        this.error(this.b1, this.e1, 0, this.l1, t);
      }
    }

    private consumeT(t: number)
    {
      if (this.l1 == t)
      {
        this.b0 = this.b1; this.e0 = this.e1; this.l1 = this.l2; if (this.l1 != 0) {
        this.b1 = this.b2; this.e1 = this.e2; this.l2 = this.l3; if (this.l2 != 0) {
        this.b2 = this.b3; this.e2 = this.e3; this.l3 = this.l4; if (this.l3 != 0) {
        this.b3 = this.b4; this.e3 = this.e4; this.l4 = this.l5; if (this.l4 != 0) {
        this.b4 = this.b5; this.e4 = this.e5; this.l5 = this.l6; if (this.l5 != 0) {
        this.b5 = this.b6; this.e5 = this.e6; this.l6 = this.l7; if (this.l6 != 0) {
        this.b6 = this.b7; this.e6 = this.e7; this.l7 = this.l8; if (this.l7 != 0) {
        this.b7 = this.b8; this.e7 = this.e8; this.l8 = this.l9; if (this.l8 != 0) {
        this.b8 = this.b9; this.e8 = this.e9; this.l9 = this.l10; if (this.l9 != 0) {
        this.b9 = this.b10; this.e9 = this.e10; this.l10 = 0; }}}}}}}}}
      }
      else
      {
        this.error(this.b1, this.e1, 0, this.l1, t);
      }
    }

    private lookahead1(tokenSetId: number)
    {
      if (this.l1 == 0)
      {
        this.l1 = this.match(tokenSetId);
        this.b1 = this.begin;
        this.e1 = this.end;
      }
    }

    private lookahead2(prefix: number, tokenSetId: number)
    {
      if (this.l2 == 0)
      {
        this.l2 = this.match(tokenSetId);
        this.b2 = this.begin;
        this.e2 = this.end;
      }
      this.lk = prefix + this.l2;
    }

    private lookahead3(prefix: number, tokenSetId: number)
    {
      if (this.l3 == 0)
      {
        this.l3 = this.match(tokenSetId);
        this.b3 = this.begin;
        this.e3 = this.end;
      }
      this.lk = prefix + this.l3;
    }

    private lookahead4(prefix: number, tokenSetId: number)
    {
      if (this.l4 == 0)
      {
        this.l4 = this.match(tokenSetId);
        this.b4 = this.begin;
        this.e4 = this.end;
      }
      this.lk = prefix + this.l4;
    }

    private lookahead5(prefix: number, tokenSetId: number)
    {
      if (this.l5 == 0)
      {
        this.l5 = this.match(tokenSetId);
        this.b5 = this.begin;
        this.e5 = this.end;
      }
      this.lk = prefix + this.l5;
    }

    private lookahead6(prefix: number, tokenSetId: number)
    {
      if (this.l6 == 0)
      {
        this.l6 = this.match(tokenSetId);
        this.b6 = this.begin;
        this.e6 = this.end;
      }
      this.lk = prefix + this.l6;
    }

    private lookahead7(prefix: number, tokenSetId: number)
    {
      if (this.l7 == 0)
      {
        this.l7 = this.match(tokenSetId);
        this.b7 = this.begin;
        this.e7 = this.end;
      }
      this.lk = prefix + this.l7;
    }

    private lookahead8(prefix: number, tokenSetId: number)
    {
      if (this.l8 == 0)
      {
        this.l8 = this.match(tokenSetId);
        this.b8 = this.begin;
        this.e8 = this.end;
      }
      this.lk = prefix + this.l8;
    }

    private lookahead9(prefix: number, tokenSetId: number)
    {
      if (this.l9 == 0)
      {
        this.l9 = this.match(tokenSetId);
        this.b9 = this.begin;
        this.e9 = this.end;
      }
      this.lk = prefix + this.l9;
    }

    private lookahead10(prefix: number, tokenSetId: number)
    {
      if (this.l10 == 0)
      {
        this.l10 = this.match(tokenSetId);
        this.b10 = this.begin;
        this.e10 = this.end;
      }
      this.lk = prefix + this.l10;
    }

    private error(b: number, e: number, s: number, l: number, t: number)
    {
      if (e >= this.ex)
      {
        this.bx = b;
        this.ex = e;
        this.sx = s;
        this.lx = l;
        this.tx = t;
      }

      DEBUG = {
        s: this.input.slice(this.bx-1,this.ex+1),
        m: this.input.slice(this.bx-2,this.ex+2),
        l: this.input.slice(this.bx-15,this.ex+15),
        e: DEBUG.e
      }

      throw new ParseException(this.bx, this.ex, this.sx, this.lx, this.tx);
    }

    private token(): number
    {
      return this.l1;
    }

    private tokenSequence(): number
    {
      return this.lk;
    }

    private lk: number; private b0: number; private e0: number;
    private l1: number; private b1: number; private e1: number;
    private l2: number; private b2: number; private e2: number;
    private l3: number; private b3: number; private e3: number;
    private l4: number; private b4: number; private e4: number;
    private l5: number; private b5: number; private e5: number;
    private l6: number; private b6: number; private e6: number;
    private l7: number; private b7: number; private e7: number;
    private l8: number; private b8: number; private e8: number;
    private l9: number; private b9: number; private e9: number;
    private l10: number; private b10: number; private e10: number;
    private bx: number; private ex: number; private sx: number; private lx: number; private tx: number;
    private memo: Memoizer;

    private memoize(i: number, e: number, v: number)
    {
      this.memo[(e << 2) + i] = v;
    }

    private memoized(i: number, e: number): number
    {
      var v = this.memo[(e << 2) + i];
      return typeof v != "undefined" ? v : 0;
    }

    private input: string;
    private size: number;
    private begin: number;
    private end: number;

    private match(tokenSetId: number): number
    {
      this.begin = this.end;
      var current = this.end;
      var result = Parser.INITIAL[tokenSetId];
      var state = 0;
      for (var code = result & 511; code != 0; )
      {
        var charclass: number;
        var c0 = current < this.size ? this.input.charCodeAt(current) : 0;
        ++current;
        if (c0 < 0x80)
        {
          charclass = Parser.MAP0[c0];
        }
        else if (c0 < 0xd800)
        {
          var c1 = c0 >> 5;
          charclass = Parser.MAP1[(c0 & 31) + Parser.MAP1[(c1 & 31) + Parser.MAP1[c1 >> 5]]];
        }
        else
        {
          if (c0 < 0xdc00)
          {
            var c1: number = current < this.size ? this.input.charCodeAt(current) : 0;
            if (c1 >= 0xdc00 && c1 < 0xe000)
            {
              ++current;
              c0 = ((c0 & 0x3ff) << 10) + (c1 & 0x3ff) + 0x10000;
            }
          }

          var lo = 0, hi = 1;
          for (var m = 1; ; m = (hi + lo) >> 1)
          {
            if (Parser.MAP2[m] > c0) hi = m - 1;
            else if (Parser.MAP2[2 + m] < c0) lo = m + 1;
            else {charclass = Parser.MAP2[4 + m]; break;}
            if (lo > hi) {charclass = 0; break;}
          }
        }

        state = code;
        var i0 = (charclass << 9) + code - 1;
        code = Parser.TRANSITION[(i0 & 15) + Parser.TRANSITION[i0 >> 4]];

        if (code > 511)
        {
          result = code;
          code &= 511;
          this.end = current;
        }
      }

      result >>= 9;
      if (result == 0)
      {
        this.end = current - 1;
        var c1: number = this.end < this.size ? this.input.charCodeAt(this.end) : 0;
        if (c1 >= 0xdc00 && c1 < 0xe000) --this.end;
        this.error(this.begin, this.end, state, -1, -1);
      }

      if (this.end > this.size) this.end = this.size;
      return (result & 127) - 1;
    }

    private static getTokenSet(tokenSetId: number)
    {
      var set: string[] = [];
      var s = tokenSetId < 0 ? - tokenSetId : Parser.INITIAL[tokenSetId] & 511;
      for (var i = 0; i < 74; i += 32)
      {
        var j = i;
        var i0 = (i >> 5) * 369 + s - 1;
        var i1 = i0 >> 2;
        var f = Parser.EXPECTED[(i0 & 3) + Parser.EXPECTED[(i1 & 7) + Parser.EXPECTED[i1 >> 3]]];
        for ( ; f != 0; f >>>= 1, ++j)
        {
          if ((f & 1) != 0)
          {
            set.push(Parser.TOKEN[j]);
          }
        }
      }
      return set;
    }

    private static MAP0: number[] =
    [
      /*   0 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4,
      /*  35 */ 3, 3, 3, 3, 3, 5, 6, 3, 3, 7, 8, 9, 3, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 3, 12, 13, 14, 3, 15,
      /*  65 */ 16, 17, 17, 17, 18, 17, 17, 17, 19, 17, 17, 17, 17, 17, 20, 21, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17,
      /*  91 */ 22, 3, 3, 3, 23, 3, 24, 25, 26, 27, 28, 29, 30, 31, 32, 17, 33, 34, 35, 36, 37, 38, 17, 39, 40, 41, 42,
      /* 118 */ 43, 44, 45, 46, 17, 47, 3, 48, 3, 3
    ];

    private static MAP1: number[] =
    [
      /*   0 */ 54, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58,
      /*  26 */ 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58,
      /*  52 */ 58, 58, 90, 122, 215, 153, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183,
      /*  74 */ 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 183, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /*  99 */ 49, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 3, 3, 3, 3, 3, 5, 6, 3, 3,
      /* 134 */ 7, 8, 9, 3, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 3, 12, 13, 14, 3, 24, 25, 26, 27, 28, 29, 30, 31,
      /* 162 */ 32, 17, 33, 34, 35, 36, 37, 38, 17, 39, 40, 41, 42, 43, 44, 45, 46, 17, 47, 3, 48, 3, 3, 3, 3, 3, 3, 3, 3,
      /* 191 */ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 15, 16, 17, 17, 17, 18, 17, 17,
      /* 223 */ 17, 19, 17, 17, 17, 17, 17, 20, 21, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 22, 3, 3, 3, 23
    ];

    private static MAP2: number[] =
    [
      /* 0 */ 57344, 65536, 65533, 1114111, 3, 3
    ];

    private static INITIAL: number[] =
    [
      /*  0 */ 1, 2, 3, 4, 5, 6, 5639, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
      /* 28 */ 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 1045, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 1073, 50, 5683, 5684,
      /* 53 */ 53, 54, 55, 56, 57, 58, 59, 60, 61, 5694, 63, 5696, 65, 66, 67, 68, 69, 70, 71, 72
    ];

    private static TRANSITION: number[] =
    [
      /*    0 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*   17 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1607, 1608,
      /*   34 */ 2259, 1600, 1676, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*   51 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1625, 1608, 4761, 1643,
      /*   68 */ 1667, 1608, 1608, 1608, 1701, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1723, 1608, 1608, 1608, 1608,
      /*   85 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 3892, 1608, 1608, 1608,
      /*  102 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  119 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 4258, 1608, 4330, 1742, 1608, 1608, 1608, 1608,
      /*  136 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2982, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  153 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 4680, 1608, 3892, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  170 */ 1608, 1608, 1608, 1608, 1758, 1608, 1608, 3736, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  187 */ 1608, 1608, 1608, 1608, 1608, 2892, 1608, 1685, 1775, 1799, 1821, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  204 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  221 */ 1608, 1608, 1608, 1871, 1608, 1849, 1841, 1865, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  238 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  255 */ 1608, 4015, 1608, 3892, 1608, 2380, 1887, 1608, 1608, 1608, 1608, 1608, 3838, 1608, 1608, 4181, 1608,
      /*  272 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1609,
      /*  289 */ 1608, 3892, 1608, 1908, 4673, 1608, 1608, 3369, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  306 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2636, 1608, 3892,
      /*  323 */ 1932, 3102, 3518, 1608, 1608, 3680, 1608, 1608, 3678, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  340 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1948, 3892, 1608, 1608,
      /*  357 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  374 */ 4360, 1965, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 3892, 3606, 1982, 1608, 1608,
      /*  391 */ 1608, 2004, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  408 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2313, 3892, 2309, 2024, 3434, 1608, 2673, 1608,
      /*  425 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  442 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2046, 3892, 3391, 2065, 2087, 1608, 1608, 2737, 1608, 1608,
      /*  459 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  476 */ 1608, 1608, 1608, 1608, 1608, 2109, 3892, 2113, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  493 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  510 */ 1608, 1608, 2130, 2474, 1916, 1608, 3102, 2226, 1608, 1608, 3680, 1608, 1608, 3678, 1608, 1608, 1608,
      /*  527 */ 1608, 1608, 1608, 4494, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  544 */ 2130, 1608, 3892, 1608, 3102, 3518, 1608, 1608, 3680, 1608, 1608, 3678, 1608, 1608, 1608, 1608, 1608,
      /*  561 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1608,
      /*  578 */ 3892, 1608, 3102, 3518, 1608, 1608, 3680, 1608, 1608, 3678, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  595 */ 1608, 1608, 4709, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1608, 3892, 1608,
      /*  612 */ 3102, 3518, 1608, 1608, 3680, 1608, 1608, 3678, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 3017, 1608,
      /*  629 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1608, 3892, 1608, 3102, 3518,
      /*  646 */ 1608, 1608, 3680, 1608, 1608, 3678, 1608, 2443, 2152, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  663 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1608, 3892, 1608, 3102, 3518, 1608, 1608,
      /*  680 */ 3680, 1608, 1608, 3678, 1608, 1608, 1608, 4288, 1608, 2170, 1608, 2114, 1608, 1608, 1608, 1608, 1608,
      /*  697 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2711, 3892, 1608, 2549, 1608, 1608, 1608, 1608, 1608,
      /*  714 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  731 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 3892, 1608, 2380, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  748 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  765 */ 1608, 1608, 1608, 2189, 2515, 1651, 1608, 2211, 2245, 2294, 2425, 3680, 3966, 2229, 3678, 2331, 2352,
      /*  782 */ 1608, 2374, 4384, 1608, 1608, 2396, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  799 */ 1608, 2130, 1608, 3892, 2404, 3102, 3518, 1608, 3714, 3680, 1608, 2315, 3678, 1608, 1608, 1608, 1608,
      /*  816 */ 1608, 2420, 1608, 1608, 2441, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130,
      /*  833 */ 2523, 3892, 1608, 2947, 3568, 4716, 1608, 3680, 1608, 1608, 3678, 4747, 1608, 1949, 3540, 1608, 1608,
      /*  850 */ 1608, 3972, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 2643, 3892,
      /*  867 */ 4112, 3102, 3518, 1608, 1608, 3680, 3651, 1608, 2870, 1608, 4085, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  884 */ 1608, 3847, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1892, 3892, 2459, 3919,
      /*  901 */ 4646, 3274, 2496, 3680, 2539, 4319, 4051, 4414, 2573, 2601, 2622, 1608, 2659, 2965, 2697, 1707, 2734,
      /*  918 */ 2753, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2775, 1608, 1783, 2797, 3102, 3518, 1608,
      /*  935 */ 1608, 3680, 1988, 3706, 3678, 2813, 1608, 1608, 1966, 2833, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  952 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1608, 3892, 4139, 2851, 4247, 1608, 1608, 2759,
      /*  969 */ 1608, 1608, 3678, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /*  986 */ 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1608, 3892, 1608, 3102, 3518, 1608, 1608, 3680, 1608, 1608,
      /* 1003 */ 3678, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2886, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /* 1020 */ 1608, 1608, 1608, 1608, 2130, 1608, 3813, 2008, 3102, 3518, 1608, 1608, 3680, 3520, 2908, 2093, 2927,
      /* 1037 */ 2963, 2136, 1608, 4515, 2981, 1608, 2998, 3183, 3015, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /* 1054 */ 1608, 1608, 2130, 1608, 3892, 1608, 3102, 3518, 1608, 1608, 3680, 1608, 1608, 3678, 1608, 1608, 1608,
      /* 1071 */ 3033, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /* 1088 */ 2130, 1608, 3892, 1608, 3067, 3518, 1608, 3637, 3083, 1608, 1759, 3118, 1608, 1608, 1608, 1608, 1608,
      /* 1105 */ 3158, 3146, 3181, 3199, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1825,
      /* 1122 */ 3892, 1608, 3102, 3518, 1608, 1608, 3680, 1608, 1608, 3678, 1608, 1608, 1608, 1608, 3095, 1608, 3219,
      /* 1139 */ 3239, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1726, 3892, 3259,
      /* 1156 */ 3297, 3590, 2336, 3600, 3313, 3329, 3349, 3678, 3367, 1608, 3385, 1608, 3407, 1608, 1608, 2681, 3165,
      /* 1173 */ 2999, 3423, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1627, 3892, 2817, 3458, 3130,
      /* 1190 */ 3474, 3492, 3508, 1608, 3536, 3556, 2154, 1608, 3622, 3674, 1608, 1608, 4772, 4580, 1608, 3696, 1608,
      /* 1207 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 3730, 1608, 3752, 3764, 3776, 3518, 1608, 1608,
      /* 1224 */ 3442, 1608, 1608, 4160, 4041, 3792, 1608, 3476, 2195, 1608, 1608, 1608, 3829, 3872, 1608, 1608, 1608,
      /* 1241 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1608, 3908, 3203, 3935, 2866, 3223, 3951, 3680, 4203,
      /* 1258 */ 3988, 3678, 2506, 4011, 4077, 2480, 4031, 4067, 4421, 1608, 2358, 4101, 2278, 1608, 1608, 1608, 1608,
      /* 1275 */ 1608, 1608, 1608, 1608, 1608, 2130, 1608, 4128, 4448, 3102, 4476, 4155, 1608, 3680, 3243, 2606, 2718,
      /* 1292 */ 1608, 3658, 1608, 1608, 1608, 1608, 2940, 3885, 4176, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /* 1309 */ 1608, 1608, 1608, 4197, 1608, 3892, 2049, 3102, 3518, 3043, 1608, 3580, 4219, 3856, 4235, 2030, 1608,
      /* 1326 */ 4267, 4283, 4304, 2835, 4346, 1608, 4376, 2173, 4400, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /* 1343 */ 1608, 2130, 1608, 3892, 1608, 3995, 3518, 4437, 2071, 2781, 1608, 1608, 4464, 1608, 3333, 2585, 3051,
      /* 1360 */ 1608, 1608, 4510, 1608, 1608, 1805, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130,
      /* 1377 */ 1608, 4603, 4531, 4543, 3518, 4559, 1608, 3680, 1608, 4575, 3678, 1608, 1608, 3281, 4486, 1608, 2270,
      /* 1394 */ 4596, 1608, 1608, 3351, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1608, 4619,
      /* 1411 */ 1608, 3102, 3518, 1608, 1608, 3680, 1608, 1608, 3678, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /* 1428 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1608, 4662, 1608, 3102,
      /* 1445 */ 3518, 1608, 1608, 3680, 1608, 1608, 3678, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /* 1462 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2130, 1608, 3892, 1608, 3102, 3518, 1608,
      /* 1479 */ 1608, 3680, 1608, 1608, 4634, 1608, 1608, 1608, 3806, 1608, 1608, 1608, 4696, 1608, 1608, 4732, 1608,
      /* 1496 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 3892, 2911, 1608, 1608, 1608, 1608, 1608,
      /* 1513 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /* 1530 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 2557, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /* 1547 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /* 1564 */ 1608, 1608, 1608, 1608, 1625, 1608, 4761, 1643, 1667, 1608, 1608, 1608, 1701, 1608, 1608, 1608, 1608,
      /* 1581 */ 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608, 1608,
      /* 1598 */ 1608, 1608, 1609, 0, 0, 0, 0, 0, 0, 1609, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 1, 2050, 0,
      /* 1628 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 100, 1, 2050, 0, 0, 0, 0, 0, 2087, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 1660 */ 3584, 5120, 0, 0, 106, 0, 0, 0, 0, 0, 0, 2050, 0, 0, 0, 1670, 0, 0, 0, 0, 0, 0, 0, 0, 1609, 0, 0, 0, 0,
      /* 1689 */ 0, 0, 0, 0, 7680, 3584, 5120, 0, 7680, 0, 0, 0, 0, 0, 0, 0, 0, 1670, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 1718 */ 342, 343, 22016, 0, 345, 0, 0, 286, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 98, 0, 0, 0, 0, 0, 0, 83, 0,
      /* 1748 */ 0, 0, 83, 83, 0, 0, 0, 6144, 83, 6144, 27648, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 219, 0, 7680,
      /* 1777 */ 0, 0, 0, 7680, 0, 7680, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120, 0, 0, 107, 0, 0, 7680, 7680, 0, 0, 0,
      /* 1804 */ 7680, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 355, 0, 0, 0, 0, 0, 0, 0, 7168, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 1836 */ 0, 97, 0, 0, 0, 0, 8192, 0, 0, 0, 8192, 0, 8192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120, 0, 8192, 0, 0, 0,
      /* 1865 */ 8192, 0, 0, 0, 0, 8192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8192, 0, 0, 0, 0, 0, 0, 0, 0, 142, 0, 0, 0, 0,
      /* 1896 */ 0, 0, 0, 0, 0, 0, 0, 96, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 87, 87, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120,
      /* 1927 */ 91, 0, 0, 0, 0, 0, 0, 5639, 5639, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5639, 0, 5639, 10752, 0, 0, 0, 0, 0, 0, 0,
      /* 1956 */ 0, 0, 0, 0, 0, 0, 0, 0, 271, 28672, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 283, 11383, 11383, 0, 0,
      /* 1986 */ 0, 11383, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32256, 0, 0, 0, 0, 0, 0, 0, 185, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2018 */ 0, 0, 108, 0, 0, 0, 0, 88, 0, 0, 0, 88, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35840, 0, 0, 0, 244, 0, 0,
      /* 2048 */ 12800, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 125, 0, 125, 12920, 12920, 0, 0, 0, 12920, 0, 0, 0, 0, 0,
      /* 2076 */ 0, 0, 0, 0, 0, 175, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9728, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 228, 0, 4688, 4688,
      /* 2107 */ 0, 0, 0, 0, 0, 89, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 331, 0, 0, 74, 75, 0, 4688, 0, 0, 0,
      /* 2139 */ 0, 0, 0, 0, 0, 0, 0, 266, 0, 0, 0, 0, 0, 0, 258, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 243, 0, 0, 0,
      /* 2172 */ 298, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 0, 0, 0, 74, 75, 76, 4688, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2204 */ 0, 293, 0, 0, 0, 0, 0, 0, 0, 126, 129, 129, 0, 126, 126, 0, 2634, 3147, 0, 0, 0, 0, 4688, 4688, 141, 0,
      /* 2230 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 0, 4747, 4688, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 0, 0, 0,
      /* 2262 */ 0, 0, 0, 1609, 1609, 0, 3584, 5120, 0, 0, 0, 0, 0, 0, 0, 303, 0, 0, 0, 0, 0, 0, 0, 0, 365, 0, 0, 0, 0, 0,
      /* 2292 */ 0, 0, 0, 0, 0, 0, 155, 0, 0, 0, 159, 0, 0, 0, 0, 0, 165, 0, 0, 0, 0, 0, 88, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2325 */ 0, 0, 0, 0, 218, 0, 232, 0, 0, 0, 236, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 162, 0, 0, 0, 0, 0, 0, 0, 0, 249,
      /* 2357 */ 250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 341, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 277, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2390 */ 3147, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 325, 0, 327, 0, 0, 0, 0, 0, 0, 0, 0, 117, 0, 0, 0, 0, 0, 117, 0, 0,
      /* 2421 */ 0, 0, 0, 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 176, 0, 0, 0, 0, 0, 333, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2454 */ 0, 0, 0, 256, 257, 0, 0, 112, 0, 96, 0, 0, 0, 96, 118, 0, 96, 0, 0, 118, 0, 0, 0, 0, 0, 91, 0, 0, 0, 0,
      /* 2484 */ 0, 0, 0, 0, 0, 0, 280, 0, 0, 0, 0, 0, 0, 168, 169, 170, 0, 0, 0, 0, 0, 174, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2514 */ 30208, 0, 0, 0, 0, 0, 0, 0, 92, 0, 0, 0, 0, 0, 0, 0, 0, 93, 0, 0, 0, 0, 0, 0, 0, 0, 194, 0, 0, 0, 0, 0,
      /* 2546 */ 0, 0, 201, 0, 0, 0, 0, 0, 0, 0, 132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37888, 5120, 0, 0, 0, 0, 0, 0, 0, 0, 248,
      /* 2577 */ 0, 0, 21504, 251, 0, 0, 0, 34816, 0, 0, 0, 0, 0, 0, 263, 0, 0, 0, 0, 0, 0, 269, 0, 0, 0, 0, 259, 0, 261,
      /* 2606 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 215, 216, 0, 0, 0, 0, 0, 0, 275, 276, 0, 0, 0, 0, 0, 0, 0, 0, 23552, 0,
      /* 2637 */ 0, 0, 0, 0, 0, 5639, 0, 0, 0, 0, 0, 0, 0, 0, 0, 94, 95, 0, 0, 0, 0, 0, 0, 297, 0, 0, 0, 301, 0, 0, 0, 0,
      /* 2669 */ 0, 0, 0, 306, 0, 0, 0, 0, 0, 0, 11776, 13312, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24576, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2699 */ 0, 0, 16896, 0, 0, 0, 32768, 0, 0, 0, 0, 35328, 0, 0, 0, 0, 0, 0, 15360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 227,
      /* 2728 */ 0, 0, 4798, 4688, 0, 0, 20480, 0, 347, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9216, 0, 0, 0, 0, 0, 361,
      /* 2757 */ 0, 363, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4688, 4688, 191, 0, 0, 0, 0, 0, 74, 75, 77, 4689, 0, 0, 0, 0, 0, 0,
      /* 2787 */ 0, 0, 0, 0, 4688, 4798, 0, 0, 0, 0, 0, 0, 113, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 0, 124, 0, 0, 0, 235,
      /* 2817 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 0, 0, 0, 284, 285, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2849 */ 307, 0, 0, 0, 127, 0, 0, 0, 127, 127, 0, 2634, 3147, 0, 0, 0, 0, 4688, 4748, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2877 */ 0, 0, 0, 0, 0, 4688, 4688, 0, 231, 0, 0, 0, 0, 0, 336, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7680, 0, 0, 0, 0, 0,
      /* 2908 */ 0, 0, 208, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37376, 0, 0, 0, 0, 234, 0, 0, 0, 0, 0, 0, 0, 240, 0,
      /* 2939 */ 241, 0, 0, 0, 0, 0, 0, 313, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2634, 3147, 135, 0, 0, 0, 4688, 0, 246, 0, 0, 0,
      /* 2968 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 320, 0, 296, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6656, 322, 0,
      /* 3000 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19456, 0, 346, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 330,
      /* 3032 */ 0, 0, 0, 274, 0, 0, 0, 0, 0, 0, 18944, 0, 0, 0, 0, 0, 0, 0, 158, 0, 0, 0, 0, 0, 0, 0, 0, 279, 0, 0, 0, 0,
      /* 3064 */ 0, 0, 0, 0, 0, 128, 0, 0, 0, 128, 128, 0, 2634, 3147, 0, 0, 0, 0, 4688, 181, 0, 0, 0, 186, 0, 0, 0, 0, 0,
      /* 3093 */ 4797, 4688, 0, 0, 0, 0, 0, 0, 289, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2634, 3147, 0, 0, 0, 0, 4688, 0, 0, 0, 0,
      /* 3122 */ 223, 0, 0, 0, 0, 0, 0, 0, 4688, 4688, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 148, 0, 0, 0, 13824, 0, 0, 0, 0, 0,
      /* 3152 */ 0, 0, 0, 0, 0, 318, 0, 0, 0, 0, 0, 0, 302, 0, 0, 0, 0, 0, 0, 0, 0, 0, 340, 0, 0, 0, 0, 0, 0, 0, 323, 0,
      /* 3184 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 344, 0, 0, 0, 0, 14336, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 122,
      /* 3216 */ 0, 0, 0, 0, 0, 0, 310, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 164, 0, 0, 0, 0, 0, 324, 0, 0, 0, 0, 0,
      /* 3248 */ 0, 0, 0, 0, 0, 0, 0, 202, 0, 0, 0, 0, 0, 0, 0, 98, 0, 0, 0, 98, 98, 0, 0, 0, 0, 98, 0, 0, 0, 0, 0, 156,
      /* 3280 */ 157, 0, 0, 0, 0, 0, 0, 0, 0, 0, 265, 0, 0, 0, 0, 0, 0, 0, 0, 98, 130, 130, 0, 98, 98, 0, 2634, 3147, 0,
      /* 3309 */ 0, 0, 0, 4688, 182, 0, 184, 0, 151, 0, 0, 76, 0, 0, 4688, 4688, 0, 0, 0, 192, 0, 0, 0, 196, 0, 0, 0, 0,
      /* 3337 */ 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 206, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 358, 0, 0, 233,
      /* 3369 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10240, 0, 0, 0, 0, 0, 0, 262, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 3401 */ 12920, 0, 0, 0, 0, 0, 0, 0, 0, 4096, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 16384, 359, 0, 0, 0, 0, 0, 0, 0,
      /* 3431 */ 0, 0, 366, 0, 0, 0, 0, 0, 0, 0, 12288, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4096, 4688, 4688, 0, 0, 0, 0, 0, 0, 0,
      /* 3461 */ 131, 131, 0, 0, 0, 0, 2634, 3147, 0, 0, 0, 138, 4688, 0, 152, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 3490 */ 25600, 0, 167, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 180, 0, 183, 0, 0, 0, 0, 0, 0, 188, 0, 4688,
      /* 3519 */ 4688, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 204, 0, 0, 0, 0, 209, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 3552 */ 282, 0, 0, 0, 0, 0, 221, 222, 0, 0, 0, 0, 0, 0, 0, 0, 4688, 4688, 0, 0, 0, 0, 0, 0, 0, 0, 0, 147, 0, 0,
      /* 3582 */ 0, 0, 0, 0, 187, 0, 0, 0, 4688, 4688, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 3614 */ 0, 0, 11383, 0, 0, 0, 0, 0, 0, 0, 0, 260, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 270, 0, 0, 0, 0, 0, 172, 0, 0, 0,
      /* 3646 */ 0, 0, 0, 0, 178, 0, 0, 0, 0, 0, 0, 22528, 0, 0, 0, 0, 0, 0, 0, 0, 0, 253, 254, 0, 0, 0, 0, 0, 272, 0, 0,
      /* 3677 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4688, 4688, 0, 0, 0, 0, 0, 0, 0, 0, 349, 0, 0, 352, 0, 353, 0, 0,
      /* 3708 */ 0, 0, 0, 0, 0, 213, 0, 0, 0, 0, 0, 0, 0, 0, 173, 0, 0, 0, 0, 0, 0, 0, 0, 0, 74, 75, 78, 4688, 0, 0, 0, 0,
      /* 3740 */ 0, 0, 0, 0, 0, 0, 17408, 18432, 29184, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120, 0, 0, 0, 0, 110,
      /* 3768 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110, 110, 0, 0, 0, 0, 2634, 3147, 0, 0, 0, 0, 4688, 245, 0, 0, 0, 0, 0,
      /* 3798 */ 0, 0, 0, 0, 0, 0, 0, 26624, 0, 0, 0, 0, 0, 0, 23040, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120, 0, 0, 0, 108,
      /* 3828 */ 0, 332, 0, 0, 0, 0, 0, 0, 0, 339, 0, 0, 0, 0, 0, 0, 0, 0, 15872, 0, 0, 0, 0, 0, 0, 0, 0, 19968, 0, 0, 0,
      /* 3859 */ 0, 0, 0, 0, 0, 25088, 33280, 0, 0, 0, 0, 0, 0, 0, 0, 0, 348, 0, 0, 0, 0, 0, 0, 0, 0, 356, 0, 0, 0, 0, 0,
      /* 3890 */ 0, 326, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120, 0, 0, 0, 0, 0, 0, 102, 103, 0, 0, 0, 0, 0, 0, 3584, 5120,
      /* 3919 */ 0, 0, 0, 0, 0, 0, 96, 133, 0, 2634, 3147, 0, 0, 0, 0, 4688, 0, 0, 102, 0, 0, 0, 102, 102, 0, 2634, 3147,
      /* 3946 */ 0, 0, 137, 0, 4688, 0, 0, 0, 0, 171, 0, 0, 0, 0, 0, 0, 0, 177, 0, 179, 0, 0, 0, 0, 0, 198, 0, 0, 0, 0, 0,
      /* 3977 */ 0, 0, 0, 0, 0, 328, 0, 0, 0, 0, 0, 0, 0, 0, 0, 210, 0, 212, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2634, 3147, 0,
      /* 4007 */ 136, 0, 0, 4688, 0, 0, 247, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8704, 85, 86, 0, 0, 0, 0, 0, 287, 0,
      /* 4037 */ 0, 0, 0, 292, 0, 0, 0, 0, 0, 0, 0, 238, 0, 239, 0, 0, 0, 0, 0, 0, 0, 226, 0, 0, 0, 0, 4688, 80, 230, 0,
      /* 4067 */ 0, 0, 0, 299, 0, 0, 0, 0, 304, 305, 0, 0, 0, 0, 0, 0, 0, 264, 0, 0, 0, 0, 0, 0, 0, 0, 252, 0, 0, 0, 0, 0,
      /* 4099 */ 0, 0, 0, 0, 0, 0, 0, 350, 0, 0, 0, 0, 354, 0, 0, 0, 0, 0, 0, 114, 0, 0, 0, 0, 114, 0, 0, 0, 0, 0, 0, 0,
      /* 4131 */ 104, 0, 0, 0, 0, 0, 3584, 5120, 0, 0, 0, 0, 0, 0, 115, 0, 0, 0, 0, 115, 0, 0, 0, 0, 27136, 0, 0, 0, 0, 0,
      /* 4161 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 229, 4688, 4688, 0, 0, 0, 0, 334, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 4192 */ 267, 0, 0, 0, 0, 0, 0, 74, 75, 79, 4690, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30720, 0, 0, 203, 0, 0, 193, 0,
      /* 4221 */ 195, 0, 197, 0, 0, 199, 200, 0, 0, 0, 0, 0, 0, 205, 0, 17920, 0, 0, 0, 0, 225, 0, 0, 0, 0, 0, 4688, 4688,
      /* 4249 */ 0, 0, 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 6144, 83, 0, 0, 0, 0, 0, 0, 0, 0, 14848, 0, 0, 0, 268,
      /* 4280 */ 0, 0, 0, 0, 273, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 281, 0, 0, 0, 0, 0, 0, 0, 0, 0, 288, 0, 290,
      /* 4312 */ 0, 0, 0, 0, 29696, 0, 33792, 0, 0, 0, 0, 0, 211, 0, 0, 0, 0, 214, 0, 0, 0, 0, 0, 0, 0, 6144, 0, 3584,
      /* 4340 */ 6144, 6144, 0, 0, 0, 0, 0, 0, 309, 0, 0, 0, 0, 0, 0, 0, 317, 0, 0, 319, 0, 0, 0, 0, 0, 0, 26112, 0, 0,
      /* 4369 */ 31744, 0, 36352, 0, 0, 0, 34304, 0, 0, 0, 0, 335, 0, 337, 338, 0, 0, 0, 0, 0, 0, 0, 0, 291, 0, 0, 0, 0,
      /* 4397 */ 0, 0, 0, 0, 360, 20992, 0, 0, 0, 0, 0, 0, 0, 0, 0, 367, 368, 0, 0, 0, 0, 0, 0, 28160, 0, 0, 0, 0, 0, 0,
      /* 4427 */ 0, 0, 0, 316, 0, 0, 24064, 0, 0, 0, 0, 0, 153, 0, 0, 0, 0, 0, 0, 0, 161, 0, 0, 0, 0, 0, 0, 116, 0, 0, 0,
      /* 4458 */ 0, 116, 123, 0, 0, 0, 220, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4688, 4688, 0, 0, 0, 0, 0, 0, 0, 145, 0, 0,
      /* 4488 */ 0, 0, 0, 0, 0, 278, 0, 0, 0, 0, 0, 0, 0, 0, 315, 0, 0, 0, 0, 0, 0, 0, 0, 308, 0, 0, 311, 0, 0, 0, 0, 0,
      /* 4520 */ 0, 0, 0, 0, 0, 0, 294, 0, 0, 0, 0, 0, 0, 0, 111, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 111, 111, 0, 0, 0, 0,
      /* 4552 */ 2634, 3147, 0, 0, 0, 0, 4688, 0, 0, 0, 154, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 166, 0, 207, 0, 0, 0, 0, 0,
      /* 4582 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 329, 0, 0, 0, 0, 0, 0, 0, 0, 0, 312, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120,
      /* 4614 */ 0, 0, 0, 0, 111, 0, 0, 0, 0, 105, 0, 0, 0, 0, 3584, 5120, 0, 0, 0, 109, 0, 0, 0, 0, 0, 224, 0, 0, 0, 0,
      /* 4644 */ 0, 0, 4688, 4688, 0, 0, 0, 0, 0, 0, 144, 0, 0, 0, 0, 0, 150, 0, 0, 0, 0, 0, 0, 36864, 0, 0, 0, 3584,
      /* 4672 */ 5120, 0, 0, 0, 0, 0, 0, 143, 0, 0, 0, 0, 0, 0, 0, 0, 0, 84, 0, 0, 0, 0, 0, 0, 0, 0, 4096, 0, 0, 0, 0, 0,
      /* 4704 */ 0, 0, 0, 0, 31232, 0, 0, 0, 0, 0, 0, 351, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 4736 */ 362, 0, 0, 364, 0, 0, 0, 0, 0, 0, 369, 0, 0, 0, 0, 0, 237, 0, 0, 0, 0, 0, 0, 0, 242, 0, 0, 0, 0, 0, 0,
      /* 4767 */ 2087, 1, 2050, 3584, 5120, 0, 0, 0, 0, 0, 0, 0, 314, 0, 0, 0, 0, 0, 0, 0, 321
    ];

    private static EXPECTED: number[] =
    [
      /*   0 */ 35, 135, 49, 149, 64, 220, 72, 84, 97, 105, 118, 119, 155, 128, 89, 143, 163, 171, 186, 178, 194, 202,
      /*  22 */ 210, 218, 56, 228, 246, 120, 240, 110, 76, 232, 41, 254, 262, 267, 364, 353, 274, 279, 290, 302, 302, 320,
      /*  44 */ 579, 561, 302, 302, 577, 333, 340, 344, 587, 351, 275, 450, 302, 445, 526, 302, 558, 579, 319, 336, 375,
      /*  65 */ 585, 588, 357, 451, 302, 302, 303, 451, 302, 302, 301, 302, 302, 302, 302, 394, 577, 302, 561, 324, 448,
      /*  86 */ 452, 302, 301, 302, 302, 302, 456, 367, 282, 396, 400, 324, 448, 302, 303, 302, 302, 302, 325, 467, 302,
      /* 107 */ 302, 302, 286, 302, 302, 302, 524, 577, 302, 560, 566, 571, 302, 302, 302, 302, 302, 302, 302, 302, 418,
      /* 128 */ 383, 387, 391, 405, 409, 413, 417, 302, 469, 296, 300, 307, 311, 315, 329, 422, 520, 430, 435, 439, 461,
      /* 149 */ 302, 302, 373, 302, 302, 463, 302, 302, 456, 367, 282, 302, 302, 397, 453, 543, 465, 284, 398, 474, 424,
      /* 170 */ 481, 435, 489, 442, 302, 453, 270, 370, 397, 473, 500, 532, 507, 302, 455, 496, 473, 478, 531, 487, 491,
      /* 191 */ 302, 454, 495, 398, 512, 431, 508, 453, 457, 399, 513, 483, 455, 347, 401, 482, 542, 548, 292, 517, 530,
      /* 212 */ 536, 530, 547, 503, 430, 552, 554, 302, 302, 302, 302, 302, 302, 302, 361, 379, 539, 426, 302, 302, 302,
      /* 233 */ 302, 302, 302, 395, 578, 560, 302, 525, 578, 453, 302, 565, 302, 302, 302, 523, 321, 559, 318, 302, 565,
      /* 254 */ 560, 302, 321, 561, 302, 323, 570, 323, 575, 560, 322, 583, 562, 4, 8, 16, 32, 64, 128, 4194304, 65536,
      /* 275 */ 131072, 262144, 524288, 8388608, 1048576, 8388608, 16777216, 67108864, 134217728, 1073741824, 0x80000000,
      /* 286 */ 0, 0, 128, 134217728, 134217728, 268435456, 536870912, 0, 1024, 32, 16392, 64, 2560, 268437504, 49152,
      /* 301 */ 0x80000000, 0, 0, 0, 0, 0x80000000, 134217732, 49160, 1024, 1024, 4096, 8437760, 0, 49164, 4096, 4096,
      /* 317 */ 56623104, 0, 1, 0, 0, 0, 64, 0, 0, 0, 128, 4096, 0, 3072, 4096, 3072, 56672256, 65028096, 524288, 0, 1, 4,
      /* 339 */ 264, 8, 65060864, 524288, 1074266112, 4, 16, 32, 128, 0x80000000, 32768, 262144, 256, 256, 4096, 8192,
      /* 355 */ 16384, 32768, 4096, 131072, 524288, 67108864, 1073741824, 0, 128, 128, 256, 1024, 2048, 1048576, 4194304,
      /* 370 */ 33554432, 67108864, 0x80000000, 0, 0x80000000, 0, 0, 0, 1073741824, 256, 256, 4096, 67108864, 268435456,
      /* 384 */ 0, 0, 20480, 268435456, 4196352, 0, 65792, 0, 4196368, 4196864, 0, 2, 0, 0, 0, 32768, 262144, 0,
      /* 402 */ 268435456, 0, 256, 67840, 545521664, 8192, 4196880, 268443648, 0, 0, 1078591492, 287309834, 287309834, 0,
      /* 416 */ 1078593540, 1078594564, 0, 0, 0, 2, 4096, 16384, 256, 65536, 0, 16, 16, 0, 0, 8388608, 536870912, 0, 2,
      /* 435 */ 8192, 0, 4, 131072, 524288, 10, 2097152, 16777216, 0, 1024, 0, 2, 32, 128, 4096, 67108864, 134217728,
      /* 452 */ 268435456, 0, 0, 0, 1, 32, 64, 128, 0x80000000, 0, 3072, 0, 0, 4194304, 33554432, 67108864, 134217728, 0,
      /* 470 */ 0, 12, 2052, 0, 268435456, 0, 4096, 16384, 16384, 256, 16, 512, 8388608, 536870912, 0, 1024, 0, 0, 131072,
      /* 489 */ 524288, 2, 8, 2097152, 16777216, 1024, 64, 128, 33554432, 0x80000000, 0, 16384, 256, 16, 8388608,
      /* 504 */ 536870912, 0, 262144, 2, 8, 16777216, 1024, 0, 268435456, 0, 16384, 256, 8388608, 64, 128, 262144, 0, 16,
      /* 522 */ 2560, 0, 2, 32, 0, 0, 0, 512, 256, 8388608, 536870912, 0, 8192, 131072, 32, 64, 262144, 0, 24, 0, 0, 32,
      /* 544 */ 64, 128, 2048, 32, 262144, 0, 256, 8388608, 0, 8388608, 0, 8388608, 0, 0, 64, 16, 0, 0, 0, 4, 0, 4, 0, 8,
      /* 568 */ 0, 0, 4, 0, 0, 0, 134217728, 4, 0, 0, 64, 0, 16, 0, 0, 4, 64, 0, 4, 128, 128, 128, 256, 256
    ];

    private static TOKEN: string [] =
    [
      "(0)",
      "END",
      "L",
      "S",
      "Title",
      "Ntitle",
      "Nchar",
      "Diatype",
      "VarName",
      "Char",
      "Nr",
      "'\"'",
      "'\"Agent\"'",
      "'()'",
      "')'",
      "','",
      "'-'",
      "'-->'",
      "'->'",
      "'...'",
      "':'",
      "'<'",
      "'<='",
      "'=='",
      "'>'",
      "'>='",
      "'@enduml'",
      "'@startuml'",
      "'Agent'",
      "'['",
      "'[<-'",
      "'action'",
      "'activate'",
      "'allOf('",
      "'alt'",
      "'anyOf('",
      "'break'",
      "'confirmation'",
      "'data-pushed'",
      "'deactivate'",
      "'defaultInput'",
      "'else'",
      "'else else'",
      "'end'",
      "'every'",
      "'false'",
      "'forever'",
      "'function'",
      "'get'",
      "'group'",
      "'invokeAction:'",
      "'loop'",
      "'ms'",
      "'not('",
      "'note'",
      "'observeProperty:'",
      "'oneOf('",
      "'output'",
      "'over'",
      "'par'",
      "'property'",
      "'readProperty:'",
      "'ref'",
      "'response'",
      "'set'",
      "'strict'",
      "'subscribeEvent:'",
      "'true'",
      "'variable'",
      "'wait'",
      "'writeProperty:'",
      "'x'",
      "'{'",
      "'}'"
    ];
  }
}

/** A function that validates the the Sequence Diagram is correct 
 * 
 * @param mashup The string containing the sequence diagram description
 * @returns a Promise
 */
export default function checkSeqD(mashup: string) {
  return new Promise( (res, rej) => {
    try {
      const umlParser = new validateSeqD.Parser(mashup)
      umlParser.parse_mashup()
    } catch(err) {
      DEBUG.e = err.getMessage();
      rej(DEBUG)
    }
    res("Uml is valid")
  })
}

// End
