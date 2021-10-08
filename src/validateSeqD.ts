// This file was generated on Tue Aug 31, 2021 10:35 (UTC+02) by REx v5.53 which is Copyright (c) 1979-2021 by Gunther Rademacher <grd@gmx.net>
// REx command line: validateSeqD.ebnf -backtrack -typescript -ll 10

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
        if (this.token() != 24)     // '@startuml'
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
      this.consume(24);             // '@startuml'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(2);           // Title
      this.consume(4);              // Title
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(22);          // '['
      this.consume(26);             // '['
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
      this.consume(29);             // 'activate'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(8);           // '"Agent"'
      this.consume(12);             // '"Agent"'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_footer()
    {
      this.consume(27);             // '[<-'
      this.lookahead1(8);           // '"Agent"'
      this.consume(12);             // '"Agent"'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(26);          // 'deactivate'
      this.consume(36);             // 'deactivate'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(8);           // '"Agent"'
      this.consume(12);             // '"Agent"'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(19);          // '@enduml'
      this.consume(23);             // '@enduml'
      this.lookahead1(48);          // END | L | '@startuml'
      if (this.token() == 2)        // L
      {
        this.consume(2);            // L
      }
    }

    private parse_content()
    {
      for (;;)
      {
        this.lookahead1(62);        // '...' | 'alt' | 'group' | 'loop' | 'note' | 'ref'
        switch (this.token())
        {
        case 48:                    // 'loop'
          this.parse_loop();
          break;
        case 19:                    // '...'
          this.parse_wait();
          break;
        case 31:                    // 'alt'
          this.parse_condition();
          break;
        case 46:                    // 'group'
          this.parse_interaction();
          break;
        case 51:                    // 'note'
          this.parse_getset();
          break;
        default:
          this.parse_ref();
        }
        this.lookahead1(66);        // '...' | '[<-' | 'alt' | 'else else' | 'end' | 'group' | 'loop' | 'note' | 'ref'
        if (this.token() == 27      // '[<-'
         || this.token() == 39      // 'else else'
         || this.token() == 40)     // 'end'
        {
          break;
        }
      }
    }

    private parse_loop()
    {
      this.consume(48);             // 'loop'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(50);          // Nr | 'every' | 'forever'
      switch (this.token())
      {
      case 41:                      // 'every'
        this.consume(41);           // 'every'
        this.lookahead1(1);         // S
        this.consume(3);            // S
        this.lookahead1(6);         // Nr
        this.consume(10);           // Nr
        this.lookahead1(28);        // 'ms'
        this.consume(49);           // 'ms'
        break;
      case 43:                      // 'forever'
        this.consume(43);           // 'forever'
        break;
      default:
        this.consume(10);           // Nr
        this.lookahead1(37);        // 'x'
        this.consume(68);           // 'x'
      }
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.parse_content();
      this.consume(40);             // 'end'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_wait()
    {
      this.consume(19);             // '...'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(36);          // 'wait'
      this.consume(66);             // 'wait'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(6);           // Nr
      this.consume(10);             // Nr
      this.lookahead1(28);          // 'ms'
      this.consume(49);             // 'ms'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(15);          // '...'
      this.consume(19);             // '...'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_condition()
    {
      this.consume(31);             // 'alt'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.parse_comparison();
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.parse_content();
      this.consume(39);             // 'else else'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(65);          // '...' | 'alt' | 'end' | 'group' | 'loop' | 'note' | 'ref'
      if (this.token() != 40)       // 'end'
      {
        this.parse_content();
      }
      this.consume(40);             // 'end'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_comparison()
    {
      this.lookahead1(63);          // 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
      switch (this.token())
      {
      case 50:                      // 'not('
        this.consume(50);           // 'not('
        this.lookahead1(64);        // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.parse_comparison();
        this.lookahead1(40);        // S | ')'
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.lookahead1(10);        // ')'
        this.consume(14);           // ')'
        break;
      case 30:                      // 'allOf('
        this.consume(30);           // 'allOf('
        this.lookahead1(64);        // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.parse_comparison();
        for (;;)
        {
          this.lookahead1(49);      // S | ')' | ','
          switch (this.token())
          {
          case 3:                   // S
            this.lookahead2(128, 44); // ')' | ','
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
          this.lookahead1(64);      // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
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
      case 53:                      // 'oneOf('
        this.consume(53);           // 'oneOf('
        this.lookahead1(64);        // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.parse_comparison();
        for (;;)
        {
          this.lookahead1(49);      // S | ')' | ','
          switch (this.token())
          {
          case 3:                   // S
            this.lookahead2(128, 44); // ')' | ','
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
          this.lookahead1(64);      // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
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
      case 32:                      // 'anyOf('
        this.consume(32);           // 'anyOf('
        this.lookahead1(64);        // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
        if (this.token() == 3)      // S
        {
          this.consume(3);          // S
        }
        this.parse_comparison();
        for (;;)
        {
          this.lookahead1(49);      // S | ')' | ','
          switch (this.token())
          {
          case 3:                   // S
            this.lookahead2(128, 44); // ')' | ','
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
          this.lookahead1(64);      // S | 'allOf(' | 'anyOf(' | 'not(' | 'oneOf(' | 'property' | 'variable'
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
        switch (this.token())
        {
        case 65:                    // 'variable'
          this.consume(65);         // 'variable'
          break;
        default:
          this.consume(57);         // 'property'
        }
        this.lookahead1(1);         // S
        this.consume(3);            // S
        this.lookahead1(5);         // VarName
        this.consume(8);            // VarName
        this.lookahead1(54);        // L | S | ')' | ','
        switch (this.token())
        {
        case 3:                     // S
          this.lookahead2(128, 52); // ')' | ',' | '=='
          break;
        default:
          this.lk = this.l1;
        }
        if (this.tokenSequence() == 149)  // S '=='
        {
          this.consume(3);          // S
          this.lookahead1(17);      // '=='
          this.consume(21);         // '=='
          this.lookahead1(1);       // S
          this.consume(3);          // S
          this.lookahead1(61);      // Nr | '"' | 'false' | 'property' | 'true' | 'variable'
          switch (this.token())
          {
          case 64:                  // 'true'
            this.consume(64);       // 'true'
            break;
          case 42:                  // 'false'
            this.consume(42);       // 'false'
            break;
          case 11:                  // '"'
            this.consume(11);       // '"'
            for (;;)
            {
              this.lookahead1(42);  // Char | '"'
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
            switch (this.token())
            {
            case 65:                // 'variable'
              this.consume(65);     // 'variable'
              break;
            default:
              this.consume(57);     // 'property'
            }
            this.lookahead1(1);     // S
            this.consume(3);        // S
            this.lookahead1(5);     // VarName
            this.consume(8);        // VarName
          }
        }
      }
    }

    private parse_interaction()
    {
      this.consume(46);             // 'group'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(35);          // 'strict'
      this.consume(62);             // 'strict'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.parse_interactionRecCont();
      this.parse_interactionSendCont();
      this.lookahead1(27);          // 'end'
      this.consume(40);             // 'end'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_interactionRecCont()
    {
      this.lookahead1(32);          // 'par'
      this.consume(56);             // 'par'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      for (;;)
      {
        this.lookahead1(55);        // '"Agent"' | 'break' | 'end' | 'note'
        if (this.token() != 12      // '"Agent"'
         && this.token() != 51)     // 'note'
        {
          break;
        }
        this.parse_interactionReceive();
        this.lookahead1(60);        // '"Agent"' | 'break' | 'else' | 'end' | 'note'
        if (this.token() == 38)     // 'else'
        {
          this.consume(38);         // 'else'
          this.lookahead1(0);       // L
          this.consume(2);          // L
        }
      }
      if (this.token() == 33)       // 'break'
      {
        this.consume(33);           // 'break'
        this.lookahead1(1);         // S
        this.consume(3);            // S
        this.lookahead1(25);        // 'data-pushed'
        this.consume(35);           // 'data-pushed'
        this.lookahead1(0);         // L
        this.consume(2);            // L
        this.lookahead1(27);        // 'end'
        this.consume(40);           // 'end'
        this.lookahead1(0);         // L
        this.consume(2);            // L
      }
      this.lookahead1(27);          // 'end'
      this.consume(40);             // 'end'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_interactionSendCont()
    {
      this.lookahead1(32);          // 'par'
      this.consume(56);             // 'par'
      this.lookahead1(0);           // L
      this.consume(2);              // L
      for (;;)
      {
        this.lookahead1(51);        // '"Agent"' | 'end' | 'note'
        if (this.token() == 40)     // 'end'
        {
          break;
        }
        this.parse_interactionSend();
        this.lookahead1(56);        // '"Agent"' | 'else' | 'end' | 'note'
        if (this.token() == 38)     // 'else'
        {
          this.consume(38);         // 'else'
          this.lookahead1(0);       // L
          this.consume(2);          // L
        }
      }
      this.consume(40);             // 'end'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private parse_interactionReceive()
    {
      if (this.token() == 51)       // 'note'
      {
        this.parse_getset();
      }
      this.parse_interactionPre();
      this.lookahead1(58);          // 'invokeAction:' | 'observeProperty:' | 'readProperty:' | 'subscribeEvent:'
      switch (this.token())
      {
      case 63:                      // 'subscribeEvent:'
        this.parse_receiveSubs();
        break;
      case 47:                      // 'invokeAction:'
        this.parse_receiveInv();
        break;
      case 52:                      // 'observeProperty:'
        this.parse_receiveObs();
        break;
      default:
        this.parse_receiveRead();
      }
      this.lookahead1(60);          // '"Agent"' | 'break' | 'else' | 'end' | 'note'
      switch (this.token())
      {
      case 51:                      // 'note'
        this.lookahead2(128, 1);    // S
        switch (this.tokenSequence())
        {
        case 131:                   // 'note' S
          this.lookahead3(256, 31); // 'over'
          switch (this.tokenSequence())
          {
          case 311:                 // 'note' S 'over'
            this.lookahead4(384, 1);  // S
            switch (this.tokenSequence())
            {
            case 387:               // 'note' S 'over' S
              this.lookahead5(512, 43); // '"' | 'Agent'
              switch (this.tokenSequence())
              {
              case 523:             // 'note' S 'over' S '"'
                this.lookahead6(640, 21); // 'Agent'
                switch (this.tokenSequence())
                {
                case 665:           // 'note' S 'over' S '"' 'Agent'
                  this.lookahead7(768, 39); // L | '"'
                  switch (this.tokenSequence())
                  {
                  case 770:         // 'note' S 'over' S '"' 'Agent' L
                    this.lookahead8(896, 53); // 'defaultInput' | 'get' | 'set'
                    switch (this.tokenSequence())
                    {
                    case 933:       // 'note' S 'over' S '"' 'Agent' L 'defaultInput'
                      this.lookahead9(1024, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 1027:    // 'note' S 'over' S '"' 'Agent' L 'defaultInput' S
                        this.lookahead10(1152, 59); // Nr | '"' | 'false' | 'true' | '{'
                        break;
                      }
                      break;
                    case 941:       // 'note' S 'over' S '"' 'Agent' L 'get'
                      this.lookahead9(1280, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 1283:    // 'note' S 'over' S '"' 'Agent' L 'get' S
                        this.lookahead10(1408, 47); // 'property' | 'variable'
                        break;
                      }
                      break;
                    case 957:       // 'note' S 'over' S '"' 'Agent' L 'set'
                      this.lookahead9(1536, 1); // S
                      break;
                    }
                    break;
                  case 779:         // 'note' S 'over' S '"' 'Agent' '"'
                    this.lookahead8(1792, 0); // L
                    switch (this.tokenSequence())
                    {
                    case 1794:      // 'note' S 'over' S '"' 'Agent' '"' L
                      this.lookahead9(1920, 53);  // 'defaultInput' | 'get' | 'set'
                      switch (this.tokenSequence())
                      {
                      case 1957:    // 'note' S 'over' S '"' 'Agent' '"' L 'defaultInput'
                        this.lookahead10(2048, 1);  // S
                        break;
                      case 1965:    // 'note' S 'over' S '"' 'Agent' '"' L 'get'
                        this.lookahead10(2176, 1);  // S
                        break;
                      case 1981:    // 'note' S 'over' S '"' 'Agent' '"' L 'set'
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
              case 537:             // 'note' S 'over' S 'Agent'
                this.lookahead6(2432, 39);  // L | '"'
                switch (this.tokenSequence())
                {
                case 2434:          // 'note' S 'over' S 'Agent' L
                  this.lookahead7(2560, 53);  // 'defaultInput' | 'get' | 'set'
                  switch (this.tokenSequence())
                  {
                  case 2597:        // 'note' S 'over' S 'Agent' L 'defaultInput'
                    this.lookahead8(2688, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 2691:      // 'note' S 'over' S 'Agent' L 'defaultInput' S
                      this.lookahead9(2816, 59);  // Nr | '"' | 'false' | 'true' | '{'
                      switch (this.tokenSequence())
                      {
                      case 2826:    // 'note' S 'over' S 'Agent' L 'defaultInput' S Nr
                        this.lookahead10(2944, 0);  // L
                        break;
                      case 2827:    // 'note' S 'over' S 'Agent' L 'defaultInput' S '"'
                        this.lookahead10(3072, 42); // Char | '"'
                        break;
                      case 2858:    // 'note' S 'over' S 'Agent' L 'defaultInput' S 'false'
                        this.lookahead10(3200, 0);  // L
                        break;
                      case 2880:    // 'note' S 'over' S 'Agent' L 'defaultInput' S 'true'
                        this.lookahead10(3328, 0);  // L
                        break;
                      case 2885:    // 'note' S 'over' S 'Agent' L 'defaultInput' S '{'
                        this.lookahead10(3456, 41); // Nchar | '}'
                        break;
                      }
                      break;
                    }
                    break;
                  case 2605:        // 'note' S 'over' S 'Agent' L 'get'
                    this.lookahead8(3584, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 3587:      // 'note' S 'over' S 'Agent' L 'get' S
                      this.lookahead9(3712, 47);  // 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 3769:    // 'note' S 'over' S 'Agent' L 'get' S 'property'
                        this.lookahead10(3840, 1);  // S
                        break;
                      case 3777:    // 'note' S 'over' S 'Agent' L 'get' S 'variable'
                        this.lookahead10(3968, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 2621:        // 'note' S 'over' S 'Agent' L 'set'
                    this.lookahead8(4096, 1); // S
                    break;
                  }
                  break;
                case 2443:          // 'note' S 'over' S 'Agent' '"'
                  this.lookahead7(4608, 0); // L
                  switch (this.tokenSequence())
                  {
                  case 4610:        // 'note' S 'over' S 'Agent' '"' L
                    this.lookahead8(4736, 53);  // 'defaultInput' | 'get' | 'set'
                    switch (this.tokenSequence())
                    {
                    case 4773:      // 'note' S 'over' S 'Agent' '"' L 'defaultInput'
                      this.lookahead9(4864, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 4867:    // 'note' S 'over' S 'Agent' '"' L 'defaultInput' S
                        this.lookahead10(4992, 59); // Nr | '"' | 'false' | 'true' | '{'
                        break;
                      }
                      break;
                    case 4781:      // 'note' S 'over' S 'Agent' '"' L 'get'
                      this.lookahead9(5120, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 5123:    // 'note' S 'over' S 'Agent' '"' L 'get' S
                        this.lookahead10(5248, 47); // 'property' | 'variable'
                        break;
                      }
                      break;
                    case 4797:      // 'note' S 'over' S 'Agent' '"' L 'set'
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
       && this.tokenSequence() != 33  // 'break'
       && this.tokenSequence() != 38  // 'else'
       && this.tokenSequence() != 40) // 'end'
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
          this.memoize(0, this.e0, this.lk);
        }
      }
      if (this.tokenSequence() == -1)
      {
        this.parse_getset();
      }
    }

    private parse_interactionSend()
    {
      if (this.token() == 51)       // 'note'
      {
        this.parse_getset();
      }
      this.parse_interactionPre();
      this.lookahead1(46);          // 'invokeAction:' | 'writeProperty:'
      switch (this.token())
      {
      case 67:                      // 'writeProperty:'
        this.parse_sendWrite();
        break;
      default:
        this.parse_sendInv();
      }
      this.parse_sendPost();
      this.lookahead1(56);          // '"Agent"' | 'else' | 'end' | 'note'
      switch (this.token())
      {
      case 51:                      // 'note'
        this.lookahead2(128, 1);    // S
        switch (this.tokenSequence())
        {
        case 131:                   // 'note' S
          this.lookahead3(256, 31); // 'over'
          switch (this.tokenSequence())
          {
          case 311:                 // 'note' S 'over'
            this.lookahead4(384, 1);  // S
            switch (this.tokenSequence())
            {
            case 387:               // 'note' S 'over' S
              this.lookahead5(512, 43); // '"' | 'Agent'
              switch (this.tokenSequence())
              {
              case 523:             // 'note' S 'over' S '"'
                this.lookahead6(640, 21); // 'Agent'
                switch (this.tokenSequence())
                {
                case 665:           // 'note' S 'over' S '"' 'Agent'
                  this.lookahead7(768, 39); // L | '"'
                  switch (this.tokenSequence())
                  {
                  case 770:         // 'note' S 'over' S '"' 'Agent' L
                    this.lookahead8(896, 53); // 'defaultInput' | 'get' | 'set'
                    switch (this.tokenSequence())
                    {
                    case 933:       // 'note' S 'over' S '"' 'Agent' L 'defaultInput'
                      this.lookahead9(1024, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 1027:    // 'note' S 'over' S '"' 'Agent' L 'defaultInput' S
                        this.lookahead10(1152, 59); // Nr | '"' | 'false' | 'true' | '{'
                        break;
                      }
                      break;
                    case 941:       // 'note' S 'over' S '"' 'Agent' L 'get'
                      this.lookahead9(1280, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 1283:    // 'note' S 'over' S '"' 'Agent' L 'get' S
                        this.lookahead10(1408, 47); // 'property' | 'variable'
                        break;
                      }
                      break;
                    case 957:       // 'note' S 'over' S '"' 'Agent' L 'set'
                      this.lookahead9(1536, 1); // S
                      break;
                    }
                    break;
                  case 779:         // 'note' S 'over' S '"' 'Agent' '"'
                    this.lookahead8(1792, 0); // L
                    switch (this.tokenSequence())
                    {
                    case 1794:      // 'note' S 'over' S '"' 'Agent' '"' L
                      this.lookahead9(1920, 53);  // 'defaultInput' | 'get' | 'set'
                      switch (this.tokenSequence())
                      {
                      case 1957:    // 'note' S 'over' S '"' 'Agent' '"' L 'defaultInput'
                        this.lookahead10(2048, 1);  // S
                        break;
                      case 1965:    // 'note' S 'over' S '"' 'Agent' '"' L 'get'
                        this.lookahead10(2176, 1);  // S
                        break;
                      case 1981:    // 'note' S 'over' S '"' 'Agent' '"' L 'set'
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
              case 537:             // 'note' S 'over' S 'Agent'
                this.lookahead6(2432, 39);  // L | '"'
                switch (this.tokenSequence())
                {
                case 2434:          // 'note' S 'over' S 'Agent' L
                  this.lookahead7(2560, 53);  // 'defaultInput' | 'get' | 'set'
                  switch (this.tokenSequence())
                  {
                  case 2597:        // 'note' S 'over' S 'Agent' L 'defaultInput'
                    this.lookahead8(2688, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 2691:      // 'note' S 'over' S 'Agent' L 'defaultInput' S
                      this.lookahead9(2816, 59);  // Nr | '"' | 'false' | 'true' | '{'
                      switch (this.tokenSequence())
                      {
                      case 2826:    // 'note' S 'over' S 'Agent' L 'defaultInput' S Nr
                        this.lookahead10(2944, 0);  // L
                        break;
                      case 2827:    // 'note' S 'over' S 'Agent' L 'defaultInput' S '"'
                        this.lookahead10(3072, 42); // Char | '"'
                        break;
                      case 2858:    // 'note' S 'over' S 'Agent' L 'defaultInput' S 'false'
                        this.lookahead10(3200, 0);  // L
                        break;
                      case 2880:    // 'note' S 'over' S 'Agent' L 'defaultInput' S 'true'
                        this.lookahead10(3328, 0);  // L
                        break;
                      case 2885:    // 'note' S 'over' S 'Agent' L 'defaultInput' S '{'
                        this.lookahead10(3456, 41); // Nchar | '}'
                        break;
                      }
                      break;
                    }
                    break;
                  case 2605:        // 'note' S 'over' S 'Agent' L 'get'
                    this.lookahead8(3584, 1); // S
                    switch (this.tokenSequence())
                    {
                    case 3587:      // 'note' S 'over' S 'Agent' L 'get' S
                      this.lookahead9(3712, 47);  // 'property' | 'variable'
                      switch (this.tokenSequence())
                      {
                      case 3769:    // 'note' S 'over' S 'Agent' L 'get' S 'property'
                        this.lookahead10(3840, 1);  // S
                        break;
                      case 3777:    // 'note' S 'over' S 'Agent' L 'get' S 'variable'
                        this.lookahead10(3968, 1);  // S
                        break;
                      }
                      break;
                    }
                    break;
                  case 2621:        // 'note' S 'over' S 'Agent' L 'set'
                    this.lookahead8(4096, 1); // S
                    break;
                  }
                  break;
                case 2443:          // 'note' S 'over' S 'Agent' '"'
                  this.lookahead7(4608, 0); // L
                  switch (this.tokenSequence())
                  {
                  case 4610:        // 'note' S 'over' S 'Agent' '"' L
                    this.lookahead8(4736, 53);  // 'defaultInput' | 'get' | 'set'
                    switch (this.tokenSequence())
                    {
                    case 4773:      // 'note' S 'over' S 'Agent' '"' L 'defaultInput'
                      this.lookahead9(4864, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 4867:    // 'note' S 'over' S 'Agent' '"' L 'defaultInput' S
                        this.lookahead10(4992, 59); // Nr | '"' | 'false' | 'true' | '{'
                        break;
                      }
                      break;
                    case 4781:      // 'note' S 'over' S 'Agent' '"' L 'get'
                      this.lookahead9(5120, 1); // S
                      switch (this.tokenSequence())
                      {
                      case 5123:    // 'note' S 'over' S 'Agent' '"' L 'get' S
                        this.lookahead10(5248, 47); // 'property' | 'variable'
                        break;
                      }
                      break;
                    case 4797:      // 'note' S 'over' S 'Agent' '"' L 'set'
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
       && this.tokenSequence() != 38  // 'else'
       && this.tokenSequence() != 40) // 'end'
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
      this.consume(58);             // 'readProperty:'
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
      this.consume(63);             // 'subscribeEvent:'
      this.parse_receiveSubsObsPost();
    }

    private parse_receiveObs()
    {
      this.consume(52);             // 'observeProperty:'
      this.parse_receiveSubsObsPost();
    }

    private parse_receiveInv()
    {
      this.consume(47);             // 'invokeAction:'
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
      this.consume(67);             // 'writeProperty:'
    }

    private parse_sendInv()
    {
      this.consume(47);             // 'invokeAction:'
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
      this.consume(60);             // 'response'
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
      this.consume(34);             // 'confirmation'
    }

    private parse_subsObsData()
    {
      this.parse_interactionTo();
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(14);          // '->'
      this.consume(18);             // '->'
      this.lookahead1(18);          // '>'
      this.consume(22);             // '>'
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
      this.consume(35);             // 'data-pushed'
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
      this.consume(54);             // 'output'
    }

    private parse_actTo()
    {
      this.lookahead1(23);          // 'activate'
      this.consume(29);             // 'activate'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.parse_interactionTo();
    }

    private parse_deactTo()
    {
      this.lookahead1(26);          // 'deactivate'
      this.consume(36);             // 'deactivate'
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
      this.consume(51);             // 'note'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(31);          // 'over'
      this.consume(55);             // 'over'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(43);          // '"' | 'Agent'
      if (this.token() == 11)       // '"'
      {
        this.consume(11);           // '"'
      }
      this.lookahead1(21);          // 'Agent'
      this.consume(25);             // 'Agent'
      this.lookahead1(39);          // L | '"'
      if (this.token() == 11)       // '"'
      {
        this.consume(11);           // '"'
      }
      this.lookahead1(0);           // L
      this.consume(2);              // L
      for (;;)
      {
        this.lookahead1(53);        // 'defaultInput' | 'get' | 'set'
        switch (this.token())
        {
        case 37:                    // 'defaultInput'
          this.consume(37);         // 'defaultInput'
          this.lookahead1(1);       // S
          this.consume(3);          // S
          this.lookahead1(59);      // Nr | '"' | 'false' | 'true' | '{'
          switch (this.token())
          {
          case 64:                  // 'true'
            this.consume(64);       // 'true'
            break;
          case 42:                  // 'false'
            this.consume(42);       // 'false'
            break;
          case 11:                  // '"'
            this.consume(11);       // '"'
            for (;;)
            {
              this.lookahead1(42);  // Char | '"'
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
            this.consume(69);       // '{'
            for (;;)
            {
              this.lookahead1(41);  // Nchar | '}'
              if (this.token() != 6)  // Nchar
              {
                break;
              }
              this.consume(6);      // Nchar
            }
            this.consume(70);       // '}'
          }
          break;
        default:
          switch (this.token())
          {
          case 45:                  // 'get'
            this.consume(45);       // 'get'
            break;
          default:
            this.consume(61);       // 'set'
          }
          this.lookahead1(1);       // S
          this.consume(3);          // S
          this.lookahead1(47);      // 'property' | 'variable'
          switch (this.token())
          {
          case 65:                  // 'variable'
            this.consume(65);       // 'variable'
            break;
          default:
            this.consume(57);       // 'property'
          }
          this.lookahead1(1);       // S
          this.consume(3);          // S
          this.lookahead1(5);       // VarName
          this.consume(8);          // VarName
        }
        this.lookahead1(0);         // L
        this.consume(2);            // L
        this.lookahead1(57);        // 'defaultInput' | 'end' | 'get' | 'set'
        if (this.token() == 40)     // 'end'
        {
          break;
        }
      }
      this.consume(40);             // 'end'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(29);          // 'note'
      this.consume(51);             // 'note'
      this.lookahead1(0);           // L
      this.consume(2);              // L
    }

    private try_getset()
    {
      this.consumeT(51);            // 'note'
      this.lookahead1(1);           // S
      this.consumeT(3);             // S
      this.lookahead1(31);          // 'over'
      this.consumeT(55);            // 'over'
      this.lookahead1(1);           // S
      this.consumeT(3);             // S
      this.lookahead1(43);          // '"' | 'Agent'
      if (this.token() == 11)       // '"'
      {
        this.consumeT(11);          // '"'
      }
      this.lookahead1(21);          // 'Agent'
      this.consumeT(25);            // 'Agent'
      this.lookahead1(39);          // L | '"'
      if (this.token() == 11)       // '"'
      {
        this.consumeT(11);          // '"'
      }
      this.lookahead1(0);           // L
      this.consumeT(2);             // L
      for (;;)
      {
        this.lookahead1(53);        // 'defaultInput' | 'get' | 'set'
        switch (this.token())
        {
        case 37:                    // 'defaultInput'
          this.consumeT(37);        // 'defaultInput'
          this.lookahead1(1);       // S
          this.consumeT(3);         // S
          this.lookahead1(59);      // Nr | '"' | 'false' | 'true' | '{'
          switch (this.token())
          {
          case 64:                  // 'true'
            this.consumeT(64);      // 'true'
            break;
          case 42:                  // 'false'
            this.consumeT(42);      // 'false'
            break;
          case 11:                  // '"'
            this.consumeT(11);      // '"'
            for (;;)
            {
              this.lookahead1(42);  // Char | '"'
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
            this.consumeT(69);      // '{'
            for (;;)
            {
              this.lookahead1(41);  // Nchar | '}'
              if (this.token() != 6)  // Nchar
              {
                break;
              }
              this.consumeT(6);     // Nchar
            }
            this.consumeT(70);      // '}'
          }
          break;
        default:
          switch (this.token())
          {
          case 45:                  // 'get'
            this.consumeT(45);      // 'get'
            break;
          default:
            this.consumeT(61);      // 'set'
          }
          this.lookahead1(1);       // S
          this.consumeT(3);         // S
          this.lookahead1(47);      // 'property' | 'variable'
          switch (this.token())
          {
          case 65:                  // 'variable'
            this.consumeT(65);      // 'variable'
            break;
          default:
            this.consumeT(57);      // 'property'
          }
          this.lookahead1(1);       // S
          this.consumeT(3);         // S
          this.lookahead1(5);       // VarName
          this.consumeT(8);         // VarName
        }
        this.lookahead1(0);         // L
        this.consumeT(2);           // L
        this.lookahead1(57);        // 'defaultInput' | 'end' | 'get' | 'set'
        if (this.token() == 40)     // 'end'
        {
          break;
        }
      }
      this.consumeT(40);            // 'end'
      this.lookahead1(1);           // S
      this.consumeT(3);             // S
      this.lookahead1(29);          // 'note'
      this.consumeT(51);            // 'note'
      this.lookahead1(0);           // L
      this.consumeT(2);             // L
    }

    private parse_ref()
    {
      this.consume(59);             // 'ref'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(31);          // 'over'
      this.consume(55);             // 'over'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(43);          // '"' | 'Agent'
      if (this.token() == 11)       // '"'
      {
        this.consume(11);           // '"'
      }
      this.lookahead1(21);          // 'Agent'
      this.consume(25);             // 'Agent'
      this.lookahead1(39);          // L | '"'
      if (this.token() == 11)       // '"'
      {
        this.consume(11);           // '"'
      }
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(45);          // 'action' | 'function'
      switch (this.token())
      {
      case 44:                      // 'function'
        this.consume(44);           // 'function'
        break;
      default:
        this.consume(28);           // 'action'
      }
      this.lookahead1(16);          // ':'
      this.consume(20);             // ':'
      this.lookahead1(5);           // VarName
      this.consume(8);              // VarName
      this.lookahead1(0);           // L
      this.consume(2);              // L
      this.lookahead1(27);          // 'end'
      this.consume(40);             // 'end'
      this.lookahead1(1);           // S
      this.consume(3);              // S
      this.lookahead1(33);          // 'ref'
      this.consume(59);             // 'ref'
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
      this.memo[(e << 1) + i] = v;
    }

    private memoized(i: number, e: number): number
    {
      var v = this.memo[(e << 1) + i];
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
      for (var i = 0; i < 71; i += 32)
      {
        var j = i;
        var i0 = (i >> 5) * 362 + s - 1;
        var i1 = i0 >> 1;
        var f = Parser.EXPECTED[(i0 & 1) + Parser.EXPECTED[(i1 & 3) + Parser.EXPECTED[i1 >> 2]]];
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
      /* 28 */ 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 1045, 39, 40, 41, 42, 43, 44, 45, 46, 47, 1072, 49, 5682, 51, 52,
      /* 53 */ 53, 54, 55, 56, 57, 58, 5691, 60, 5693, 62, 63, 64, 65, 66
    ];

    private static TRANSITION: number[] =
    [
      /*    0 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*   17 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4291, 4292,
      /*   34 */ 4276, 4286, 4289, 4292, 2421, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*   51 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 1600, 4292, 3701, 1618,
      /*   68 */ 1634, 4292, 4008, 2439, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 3476, 4292, 4292, 4292, 4292, 4292,
      /*   85 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 3609, 4292, 4292, 4292,
      /*  102 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  119 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4607, 4292, 2178, 1653, 4292, 4292, 4292, 4292,
      /*  136 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4317, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  153 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 1898, 4292, 3609, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  170 */ 4292, 4292, 4292, 2259, 4292, 4292, 4292, 1690, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  187 */ 4292, 4292, 4292, 4292, 4292, 3014, 4292, 1941, 1712, 4506, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  204 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  221 */ 4292, 4292, 4292, 4435, 4292, 4085, 1734, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  238 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  255 */ 4292, 4183, 4292, 3609, 4292, 1756, 4292, 4292, 4292, 4292, 4292, 4292, 1795, 4292, 4292, 2649, 4292,
      /*  272 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4293,
      /*  289 */ 4292, 3609, 1637, 1813, 1831, 4292, 4292, 3962, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  306 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 1891, 4292, 3609,
      /*  323 */ 1848, 1879, 4292, 4292, 4292, 1863, 4292, 4292, 1861, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  340 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 1914, 3609, 4292, 4292,
      /*  357 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 1797,
      /*  374 */ 1931, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 3609, 4292, 4292, 4292, 4292,
      /*  391 */ 3373, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  408 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 1959, 3609, 1957, 4292, 1977, 4292, 4292, 4292,
      /*  425 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  442 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 1995, 3609, 4292, 4523, 4292, 4292, 4292, 2340, 4292, 4292,
      /*  459 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  476 */ 4292, 4292, 4292, 4292, 4292, 2014, 4394, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  493 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  510 */ 4292, 4292, 2035, 2951, 4129, 4292, 2057, 4292, 4292, 4292, 1863, 4292, 4292, 1861, 4292, 4292, 4292,
      /*  527 */ 4292, 4292, 4292, 2086, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  544 */ 2035, 4292, 3609, 4292, 1879, 4292, 4292, 4292, 1863, 4292, 4292, 1861, 4292, 4292, 4292, 4292, 4292,
      /*  561 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 4292,
      /*  578 */ 3609, 4292, 1879, 4292, 4292, 4292, 1863, 4292, 4292, 1861, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  595 */ 4292, 4358, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 4292, 3609, 4292,
      /*  612 */ 1879, 4292, 4292, 4292, 1863, 4292, 4292, 1861, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4479, 4292,
      /*  629 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 4292, 3609, 4292, 1879, 4292,
      /*  646 */ 4292, 4292, 1863, 4292, 4292, 1861, 4292, 3455, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  663 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 4292, 3609, 4292, 1879, 4292, 4292, 4292,
      /*  680 */ 1863, 4292, 4292, 1861, 4292, 4292, 4292, 3549, 3575, 4292, 4292, 2802, 4292, 4292, 4292, 4292, 4292,
      /*  697 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2467, 3609, 4292, 2104, 4292, 4292, 4292, 4292, 4292,
      /*  714 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  731 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 3609, 4292, 2122, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  748 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  765 */ 4292, 4292, 4292, 2144, 4616, 3409, 2584, 2166, 2221, 2212, 4178, 2237, 4292, 2189, 3315, 3353, 4292,
      /*  782 */ 2088, 4292, 2275, 4292, 2277, 2293, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  799 */ 4292, 2035, 4292, 3609, 4034, 1879, 4292, 4292, 2310, 1863, 4292, 3667, 1861, 4292, 4292, 4292, 4292,
      /*  816 */ 3495, 4292, 4292, 2150, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035,
      /*  833 */ 3970, 3609, 4292, 2328, 3008, 2363, 4292, 1863, 4292, 4292, 2070, 2611, 4292, 3675, 3773, 4292, 4292,
      /*  850 */ 4292, 2383, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 2347, 3609,
      /*  867 */ 2734, 1879, 4292, 4292, 4292, 2403, 4292, 4292, 3658, 4292, 2419, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  884 */ 4292, 2437, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 3286, 3609, 2455, 2490,
      /*  901 */ 2525, 2541, 2581, 2600, 2634, 2670, 2690, 3990, 2706, 4414, 2502, 2041, 2878, 3050, 2759, 2782, 3554,
      /*  918 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2818, 4292, 1779, 2841, 1879, 4292, 4292,
      /*  935 */ 4292, 1863, 2901, 2922, 2854, 4292, 4292, 4292, 4582, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  952 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 4292, 3609, 3154, 2939, 3281, 4292, 4292, 2973,
      /*  969 */ 4292, 4292, 1861, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /*  986 */ 4292, 4292, 4292, 4292, 4292, 4292, 2035, 4292, 3609, 4292, 1879, 4292, 4292, 4292, 1863, 4292, 4292,
      /* 1003 */ 1861, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2312, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /* 1020 */ 4292, 4292, 4292, 4292, 2035, 4292, 3921, 2474, 1879, 4292, 4292, 4292, 1863, 2743, 4292, 2996, 3030,
      /* 1037 */ 4292, 3066, 4292, 3952, 4292, 2980, 4292, 3878, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /* 1054 */ 4292, 4292, 2035, 4292, 3609, 4292, 1879, 4292, 4292, 4292, 1863, 4292, 4292, 1861, 4292, 4292, 3430,
      /* 1071 */ 3086, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /* 1088 */ 2035, 4292, 3609, 3089, 3105, 4292, 4292, 3140, 3194, 4292, 4624, 1861, 4292, 4292, 4292, 4292, 2294,
      /* 1105 */ 3518, 4554, 2906, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 2367,
      /* 1122 */ 3609, 4292, 1879, 4292, 4292, 4292, 1863, 4292, 4292, 1861, 4292, 4292, 4292, 1915, 4292, 2654, 2019,
      /* 1139 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 1998, 3609, 3215,
      /* 1156 */ 3231, 2509, 3117, 3267, 3302, 2766, 4292, 2867, 4292, 1979, 4292, 2127, 4565, 4292, 4292, 3331, 3350,
      /* 1173 */ 4341, 3369, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 1815, 3609, 2196, 3389, 3178,
      /* 1190 */ 1718, 4487, 3425, 3629, 3199, 1861, 4574, 4105, 4208, 4292, 4292, 4292, 3446, 3471, 4148, 3492, 4292,
      /* 1207 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 3511, 4292, 3534, 2387, 1879, 4292, 4292, 4292,
      /* 1224 */ 3570, 4292, 4292, 2252, 3591, 2794, 4292, 3601, 3625, 4292, 4292, 3124, 3645, 4386, 4292, 4292, 4292,
      /* 1241 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 4292, 3691, 2618, 3717, 4292, 2565, 3243, 1863, 3745,
      /* 1258 */ 4292, 1861, 3761, 4292, 3795, 3812, 3847, 3894, 3913, 4292, 3937, 3986, 4006, 4292, 4292, 4292, 4292,
      /* 1275 */ 4292, 4292, 4292, 4292, 4292, 2035, 4292, 4024, 3168, 1879, 4050, 4292, 4292, 1863, 3401, 1771, 4077,
      /* 1292 */ 4292, 4101, 4292, 4292, 4292, 2923, 3796, 3831, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /* 1309 */ 4292, 4292, 4292, 4121, 4292, 3609, 1696, 1879, 4292, 4145, 1832, 4164, 4199, 4224, 1861, 4240, 4292,
      /* 1326 */ 4265, 2106, 4309, 4249, 4333, 3897, 4357, 4061, 1666, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /* 1343 */ 4292, 2035, 4292, 3609, 4292, 4374, 3070, 3826, 4410, 4430, 4292, 2825, 1861, 4292, 3729, 3041, 4451,
      /* 1360 */ 4292, 2957, 4292, 4292, 4292, 4470, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035,
      /* 1377 */ 4292, 3251, 2674, 1879, 3334, 2885, 4292, 1863, 1740, 4292, 1861, 4292, 4292, 4503, 4522, 4292, 4539,
      /* 1394 */ 4292, 4292, 4292, 3869, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 4292, 2720,
      /* 1411 */ 4292, 1879, 4292, 4292, 4292, 1863, 4292, 4292, 1861, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /* 1428 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 4292, 2555, 4292, 1879,
      /* 1445 */ 4292, 4292, 4292, 1863, 4292, 4292, 1861, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /* 1462 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 2035, 4292, 3609, 4292, 1879, 4292, 4292,
      /* 1479 */ 4292, 1863, 4292, 1961, 1861, 4292, 4292, 1602, 4292, 4292, 4292, 2128, 3860, 4292, 4454, 4598, 4292,
      /* 1496 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 3609, 3779, 4292, 4292, 4292, 4292, 4292,
      /* 1513 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /* 1530 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 1674, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /* 1547 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /* 1564 */ 4292, 4292, 4292, 4292, 1600, 4292, 3701, 1618, 1634, 4292, 4008, 2439, 4292, 4292, 4292, 4292, 4292,
      /* 1581 */ 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292, 4292,
      /* 1598 */ 4292, 4292, 1, 2050, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21504, 2050, 0, 0, 0, 0, 2159, 0, 0, 0,
      /* 1627 */ 0, 0, 0, 0, 0, 0, 2050, 0, 0, 1663, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 77, 0, 0, 0,
      /* 1659 */ 77, 77, 0, 0, 6144, 77, 6144, 0, 0, 0, 0, 0, 360, 361, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36352, 5120, 0, 0, 0,
      /* 1687 */ 0, 0, 0, 0, 0, 0, 15872, 16896, 27648, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 118, 0, 118, 0, 0, 0, 7680, 0, 0,
      /* 1715 */ 7680, 0, 7680, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 0, 0, 0, 0, 0, 8192, 0, 0, 8192, 0, 8192, 0, 0, 0, 0,
      /* 1744 */ 0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3141, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 0, 0, 0, 0, 208,
      /* 1776 */ 209, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120, 0, 0, 101, 0, 0, 0, 0, 14336, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 1806 */ 0, 0, 0, 0, 0, 0, 24576, 81, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 94, 136, 0, 0, 0, 0, 0, 0,
      /* 1838 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 180, 0, 5639, 0, 0, 0, 0, 0, 0, 0, 0, 5639, 0, 5639, 0, 0, 0, 0, 0, 4682,
      /* 1867 */ 4682, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2628, 3141, 0, 0, 0, 0, 4682, 4682, 4682, 0, 0, 0, 0, 0,
      /* 1896 */ 0, 5639, 0, 0, 0, 0, 0, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 10752, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 1928 */ 0, 0, 282, 0, 0, 30208, 0, 34816, 0, 0, 0, 32768, 27136, 0, 0, 0, 0, 0, 0, 0, 7680, 3584, 5120, 0, 7680,
      /* 1953 */ 0, 0, 0, 0, 0, 0, 0, 82, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 0, 0, 11264, 0, 0, 0, 0, 0, 0, 0,
      /* 1986 */ 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 11776, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 92, 0, 0, 0, 0, 0, 83,
      /* 2018 */ 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 317, 0, 0, 0, 0, 0, 68, 69, 0, 4682, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2050 */ 0, 290, 0, 0, 0, 294, 0, 0, 0, 0, 2628, 3141, 0, 0, 0, 0, 4682, 4682, 4682, 134, 0, 0, 0, 0, 0, 4682,
      /* 2076 */ 4682, 0, 0, 0, 0, 0, 0, 0, 230, 0, 0, 308, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 270, 0, 0, 125, 0,
      /* 2107 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 281, 0, 0, 0, 0, 0, 3141, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2139 */ 4096, 0, 0, 0, 0, 0, 0, 68, 69, 70, 4682, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 326, 0, 0, 0, 0, 0, 119, 119, 0,
      /* 2169 */ 2628, 3141, 0, 0, 0, 0, 4682, 4740, 4682, 0, 0, 0, 0, 0, 0, 6144, 0, 3584, 6144, 6144, 0, 0, 0, 0, 0, 0,
      /* 2195 */ 210, 0, 0, 0, 0, 0, 0, 0, 0, 0, 114, 0, 0, 0, 0, 124, 124, 0, 0, 152, 0, 0, 0, 0, 0, 158, 0, 0, 0, 0, 0,
      /* 2226 */ 0, 0, 142, 0, 0, 0, 0, 0, 0, 148, 0, 0, 0, 0, 4682, 4682, 0, 0, 0, 0, 0, 0, 0, 0, 0, 191, 0, 0, 0, 0,
      /* 2256 */ 222, 4682, 4682, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26112, 0, 0, 0, 0, 0, 0, 0, 284, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2286 */ 0, 0, 0, 0, 0, 318, 0, 320, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 295, 0, 166, 0, 0, 0, 0, 0, 0,
      /* 2318 */ 0, 0, 0, 0, 0, 0, 0, 0, 329, 0, 0, 0, 0, 2628, 3141, 128, 0, 0, 0, 4682, 4682, 4682, 0, 0, 0, 0, 0, 0,
      /* 2346 */ 9216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 88, 89, 0, 0, 0, 0, 0, 0, 0, 0, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2379 */ 91, 0, 0, 0, 0, 0, 0, 321, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 0, 104, 104, 0, 0, 0, 4682, 4682, 0,
      /* 2409 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 20992, 0, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1603, 0, 0, 18432, 0,
      /* 2440 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1663, 0, 0, 106, 90, 0, 0, 0, 90, 113, 90, 0, 0, 113, 0, 0, 0, 0,
      /* 2471 */ 0, 0, 13824, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 0, 0, 0, 0, 0, 0, 90, 126, 0, 2628, 3141, 0, 0, 0, 0, 4682,
      /* 2500 */ 4682, 4682, 0, 0, 0, 0, 0, 0, 22016, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 0, 0, 0, 0, 0, 0, 0, 0, 137, 0, 0,
      /* 2530 */ 0, 0, 0, 143, 0, 0, 0, 0, 0, 0, 149, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 161, 162, 163, 0, 0, 0, 0, 0,
      /* 2560 */ 35328, 0, 0, 3584, 5120, 0, 0, 0, 0, 0, 0, 156, 157, 0, 0, 0, 0, 0, 0, 0, 164, 0, 0, 167, 0, 0, 0, 0, 0,
      /* 2589 */ 0, 0, 0, 0, 0, 0, 0, 0, 119, 122, 122, 0, 0, 0, 4682, 4682, 0, 0, 0, 0, 0, 187, 0, 0, 0, 0, 0, 0, 235, 0,
      /* 2619 */ 0, 0, 0, 0, 0, 0, 0, 0, 115, 0, 0, 0, 96, 0, 0, 0, 0, 194, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 204, 0, 0, 0,
      /* 2652 */ 0, 260, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 303, 0, 0, 0, 0, 0, 0, 207, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 2685 */ 0, 105, 0, 105, 105, 219, 0, 0, 0, 0, 4682, 74, 223, 0, 0, 0, 0, 0, 0, 0, 26624, 244, 0, 0, 0, 33280, 0,
      /* 2712 */ 0, 0, 0, 0, 0, 252, 0, 254, 0, 0, 0, 0, 99, 0, 0, 0, 3584, 5120, 0, 0, 0, 103, 0, 0, 0, 0, 108, 0, 0, 0,
      /* 2742 */ 108, 0, 0, 0, 0, 0, 0, 0, 197, 0, 0, 0, 201, 0, 0, 0, 0, 0, 31232, 0, 0, 0, 0, 33792, 0, 0, 0, 0, 0, 0,
      /* 2772 */ 0, 0, 0, 199, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 335, 336, 20480, 0, 338, 18944, 0, 340, 0, 0, 0, 0, 0, 0,
      /* 2800 */ 25088, 0, 0, 0, 0, 0, 0, 0, 0, 0, 324, 0, 0, 0, 0, 0, 0, 0, 0, 0, 68, 69, 71, 4683, 0, 0, 0, 0, 0, 0, 0,
      /* 2831 */ 0, 0, 0, 213, 0, 0, 0, 0, 0, 0, 0, 107, 0, 0, 0, 0, 0, 0, 0, 0, 117, 0, 117, 0, 0, 0, 0, 0, 4682, 4682,
      /* 2861 */ 0, 0, 0, 0, 0, 228, 0, 0, 0, 0, 0, 4682, 4682, 0, 0, 0, 226, 0, 0, 0, 0, 0, 0, 299, 0, 0, 0, 0, 0, 0, 0,
      /* 2892 */ 0, 0, 159, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12800, 0, 0, 0, 206,
      /* 2923 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 306, 120, 120, 0, 2628, 3141, 0, 0, 0, 0, 4682, 4682, 4682,
      /* 2951 */ 0, 0, 0, 0, 0, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 301, 0, 0, 304, 0, 0, 0, 0, 0, 4682, 4682, 184, 0, 0, 0,
      /* 2982 */ 0, 0, 0, 0, 0, 0, 0, 315, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 4682, 4682, 0, 0, 0, 0, 227, 0, 0, 0, 0, 0,
      /* 3013 */ 140, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7680, 0, 0, 0, 0, 0, 0, 0, 0, 233, 0, 234, 0, 0, 0, 0, 239, 0, 0, 0,
      /* 3044 */ 0, 0, 0, 262, 0, 0, 0, 0, 0, 0, 0, 0, 0, 313, 0, 0, 0, 0, 0, 15360, 0, 0, 0, 0, 0, 259, 0, 0, 0, 0, 0, 0,
      /* 3076 */ 0, 0, 0, 0, 0, 0, 146, 0, 0, 0, 0, 0, 17408, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 0, 0, 121, 121,
      /* 3107 */ 0, 2628, 3141, 0, 0, 0, 0, 4682, 4682, 4682, 0, 0, 0, 0, 0, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 325, 0, 0,
      /* 3136 */ 0, 0, 0, 0, 165, 0, 0, 0, 0, 0, 171, 0, 0, 174, 0, 0, 0, 179, 0, 0, 0, 0, 109, 0, 0, 0, 109, 0, 0, 0, 0,
      /* 3167 */ 120, 0, 0, 0, 0, 110, 0, 0, 0, 110, 116, 0, 0, 0, 0, 0, 0, 141, 0, 0, 0, 0, 145, 0, 0, 0, 0, 0, 0, 0,
      /* 3197 */ 4790, 4682, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 214, 215, 0, 0, 0, 0, 0, 92, 0, 0, 0, 92, 92, 0, 0, 0, 92,
      /* 3227 */ 0, 92, 123, 123, 92, 92, 0, 2628, 3141, 0, 0, 0, 0, 4682, 4682, 4682, 0, 0, 0, 0, 0, 170, 0, 172, 0, 0,
      /* 3253 */ 0, 0, 0, 0, 0, 0, 3584, 5120, 0, 0, 0, 0, 105, 0, 144, 0, 0, 0, 0, 0, 0, 0, 0, 175, 0, 177, 0, 144, 0, 0,
      /* 3283 */ 0, 0, 139, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 90, 0, 0, 0, 0, 70, 0, 0, 4682, 4682, 0, 0, 0, 185, 0, 0, 0,
      /* 3314 */ 189, 0, 0, 0, 0, 0, 4682, 4682, 0, 0, 225, 0, 0, 0, 229, 0, 0, 0, 0, 23040, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 3344 */ 0, 0, 0, 147, 0, 0, 0, 0, 333, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 242, 243, 0, 0, 0, 0, 359, 0, 0, 0,
      /* 3376 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 178, 0, 0, 0, 0, 0, 0, 2628, 3141, 0, 0, 0, 131, 4682, 4682, 4682, 0, 0, 0, 0,
      /* 3405 */ 0, 195, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120, 0, 0, 100, 0, 0, 0, 0, 181, 0, 4682, 4682, 0, 0, 0, 0,
      /* 3434 */ 0, 0, 0, 0, 0, 0, 0, 267, 0, 0, 0, 0, 307, 0, 0, 0, 0, 0, 0, 0, 314, 0, 0, 0, 0, 0, 0, 0, 249, 250, 0,
      /* 3465 */ 251, 0, 0, 0, 0, 0, 0, 0, 0, 0, 322, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 279, 0, 0, 0, 0, 345, 0, 346, 0, 0,
      /* 3497 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 293, 0, 0, 0, 0, 68, 69, 72, 4682, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12288,
      /* 3528 */ 0, 0, 0, 0, 0, 0, 95, 0, 0, 0, 0, 0, 0, 0, 3584, 5120, 0, 0, 0, 0, 104, 0, 0, 0, 0, 274, 0, 0, 0, 0, 0,
      /* 3559 */ 0, 0, 0, 0, 0, 0, 0, 354, 0, 356, 0, 0, 0, 4096, 4682, 4682, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 291, 0, 0,
      /* 3589 */ 0, 0, 231, 0, 232, 0, 0, 0, 0, 0, 0, 238, 0, 0, 0, 0, 0, 0, 0, 24064, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120,
      /* 3619 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 286, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 202, 0, 0, 0, 0, 332, 0, 0, 0, 0, 0,
      /* 3652 */ 0, 0, 0, 0, 0, 341, 0, 0, 0, 0, 0, 4682, 4682, 0, 224, 0, 0, 0, 0, 0, 0, 0, 211, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 3683 */ 264, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 0, 0, 0, 0, 0, 3584, 5120, 0, 0, 0, 0, 0, 0, 1, 2050, 3584, 5120, 0,
      /* 3712 */ 0, 0, 0, 0, 1, 96, 96, 0, 2628, 3141, 0, 0, 130, 0, 4682, 4682, 4741, 0, 0, 0, 0, 0, 248, 0, 0, 0, 0, 0,
      /* 3740 */ 0, 0, 0, 0, 256, 0, 0, 0, 29184, 0, 0, 196, 0, 0, 0, 0, 0, 0, 203, 0, 205, 0, 28672, 0, 0, 0, 0, 0, 0, 0,
      /* 3770 */ 0, 0, 240, 0, 0, 0, 0, 0, 275, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35840, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0,
      /* 3802 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 319, 0, 0, 0, 273, 0, 0, 0, 0, 0, 0, 0, 0, 0, 280, 0, 0, 0, 0, 154, 0, 0, 0,
      /* 3834 */ 0, 0, 0, 0, 0, 0, 0, 0, 327, 0, 0, 0, 0, 0, 0, 285, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0, 0, 0, 0, 0, 29696,
      /* 3866 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 351, 0, 0, 0, 0, 0, 0, 0, 0, 337, 0, 0, 339, 0, 0, 0, 0, 0, 0, 297, 298, 0,
      /* 3898 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 328, 0, 330, 0, 0, 309, 0, 0, 22528, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 3929 */ 3584, 5120, 0, 0, 0, 102, 0, 0, 0, 0, 0, 334, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 343, 0, 0, 0, 0, 287, 0, 0,
      /* 3959 */ 0, 0, 289, 0, 0, 0, 0, 0, 0, 0, 10240, 0, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 347, 0,
      /* 3991 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 241, 0, 0, 19968, 0, 358, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 4022 */ 2159, 0, 0, 0, 0, 98, 0, 0, 0, 0, 3584, 5120, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0,
      /* 4052 */ 0, 138, 0, 0, 0, 0, 0, 0, 25600, 0, 0, 0, 0, 0, 0, 350, 0, 0, 0, 353, 19456, 0, 0, 0, 0, 0, 0, 220, 0, 0,
      /* 4082 */ 4791, 4682, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120, 0, 8192, 0, 0, 0, 0, 0, 0, 246, 247, 0, 0, 0, 0, 0, 0,
      /* 4111 */ 0, 0, 0, 0, 0, 0, 253, 0, 0, 0, 0, 0, 68, 69, 73, 4684, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120, 85, 0,
      /* 4141 */ 0, 0, 0, 0, 0, 151, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 342, 0, 0, 0, 0, 0, 4682, 4682, 0, 0, 0, 0,
      /* 4173 */ 186, 0, 188, 0, 190, 0, 0, 0, 0, 169, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8704, 79, 80, 0, 192, 193, 0,
      /* 4202 */ 0, 0, 0, 0, 0, 198, 0, 0, 0, 0, 0, 0, 0, 263, 0, 265, 0, 0, 0, 0, 0, 0, 0, 23552, 31744, 0, 0, 0, 0, 0,
      /* 4232 */ 0, 0, 16384, 0, 0, 0, 0, 218, 0, 0, 0, 0, 34304, 0, 0, 0, 237, 0, 0, 0, 0, 0, 0, 0, 300, 0, 0, 0, 302, 0,
      /* 4262 */ 0, 0, 0, 0, 13312, 0, 0, 0, 261, 0, 0, 0, 0, 266, 0, 0, 0, 0, 0, 0, 1603, 0, 3584, 5120, 0, 0, 0, 0, 0,
      /* 4291 */ 1603, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 283, 0, 0, 0, 0, 28160, 0, 32256, 0, 0, 0, 0,
      /* 4321 */ 0, 0, 0, 0, 6656, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 310, 0, 0, 312, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17920, 352, 0,
      /* 4352 */ 0, 0, 0, 0, 0, 331, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 344, 0, 0, 0, 2628, 3141, 0, 129, 0, 0,
      /* 4383 */ 4682, 4682, 4682, 0, 0, 0, 0, 0, 349, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 5120, 0, 0, 0, 0, 0, 84, 0, 0,
      /* 4412 */ 0, 168, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 268, 269, 0, 0, 0, 0, 0, 4682, 4791, 0, 0, 0, 0, 0, 0, 0, 0,
      /* 4443 */ 0, 0, 0, 8192, 0, 0, 0, 0, 0, 272, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 355, 0, 0, 0, 0, 0, 0, 348,
      /* 4475 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 323, 0, 0, 0, 0, 0, 0, 0, 0, 173, 0, 176, 0, 0, 0, 0, 0, 0, 0, 258, 0,
      /* 4507 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7168, 0, 0, 271, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9728,
      /* 4539 */ 296, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 305, 0, 0, 0, 0, 311, 0, 0, 0, 0, 0, 316, 0, 0, 0, 0, 0, 0,
      /* 4571 */ 288, 0, 14848, 0, 0, 0, 0, 0, 0, 0, 236, 0, 0, 0, 0, 0, 0, 0, 0, 276, 277, 278, 0, 0, 0, 0, 0, 357, 0, 0,
      /* 4601 */ 0, 0, 0, 0, 362, 0, 0, 0, 0, 0, 0, 0, 0, 6144, 77, 0, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 0, 212,
      /* 4633 */ 0, 0, 0, 0, 216, 0, 0
    ];

    private static EXPECTED: number[] =
    [
      /*   0 */ 136, 140, 144, 173, 360, 148, 152, 308, 156, 163, 167, 173, 272, 371, 185, 189, 159, 168, 173, 172, 173,
      /*  21 */ 187, 179, 168, 271, 173, 208, 252, 183, 273, 173, 193, 256, 172, 210, 255, 173, 212, 173, 249, 173, 173,
      /*  42 */ 173, 173, 173, 173, 173, 173, 241, 197, 355, 229, 202, 206, 173, 173, 242, 198, 282, 216, 264, 173, 174,
      /*  63 */ 222, 226, 233, 218, 237, 174, 246, 281, 261, 268, 376, 279, 286, 305, 175, 312, 316, 239, 321, 292, 320,
      /*  84 */ 332, 326, 325, 289, 330, 336, 340, 173, 173, 173, 173, 346, 298, 342, 350, 173, 173, 173, 257, 365, 173,
      /* 105 */ 354, 173, 173, 173, 295, 359, 352, 173, 173, 173, 364, 173, 370, 173, 173, 366, 173, 173, 300, 359, 173,
      /* 126 */ 274, 299, 173, 366, 301, 300, 300, 274, 275, 375, 380, 391, 413, 510, 405, 474, 407, 409, 513, 454, 415,
      /* 147 */ 419, 429, 431, 472, 448, 433, 438, 435, 404, 441, 400, 392, 412, 413, 403, 452, 413, 402, 405, 408, 410,
      /* 168 */ 455, 483, 382, 382, 472, 382, 382, 382, 382, 380, 521, 465, 398, 413, 403, 415, 397, 382, 382, 382, 447,
      /* 189 */ 480, 382, 464, 450, 481, 382, 412, 459, 454, 463, 467, 382, 425, 485, 487, 489, 491, 493, 495, 382, 382,
      /* 210 */ 382, 480, 382, 398, 461, 382, 385, 497, 446, 434, 473, 505, 401, 453, 455, 466, 481, 424, 475, 416, 417,
      /* 231 */ 470, 479, 477, 395, 420, 503, 500, 514, 393, 382, 382, 380, 401, 452, 454, 507, 454, 467, 382, 382, 456,
      /* 252 */ 382, 382, 412, 459, 461, 382, 382, 382, 388, 422, 445, 509, 473, 499, 501, 515, 505, 500, 411, 382, 382,
      /* 273 */ 471, 382, 382, 382, 381, 382, 522, 481, 425, 482, 476, 511, 396, 476, 511, 517, 446, 380, 475, 512, 446,
      /* 294 */ 393, 382, 387, 382, 389, 386, 382, 382, 382, 389, 382, 519, 383, 411, 382, 437, 440, 468, 467, 424, 475,
      /* 315 */ 416, 511, 445, 447, 524, 380, 526, 425, 482, 457, 399, 390, 475, 512, 446, 446, 530, 394, 445, 528, 387,
      /* 336 */ 532, 444, 446, 444, 534, 534, 382, 382, 382, 536, 400, 382, 423, 382, 538, 421, 382, 382, 383, 382, 382,
      /* 357 */ 382, 425, 385, 382, 382, 382, 427, 388, 382, 381, 386, 382, 382, 384, 382, 382, 382, 443, 381, 382, 382,
      /* 378 */ 387, 390, 4, 8, 0, 0, 1, 0, 2, 0, 4, 0, 8, 16, 32, 128, 0, 32, 8192, 536870912, 0, 128, 4, 16, 256, 256,
      /* 404 */ 4096, 4096, 8192, 65536, 131072, 262144, 524288, 2097152, 128, 128, 256, 16777216, 33554432, 0, 2560,
      /* 419 */ 67108864, 536870912, 2, 2, 64, 0, 4096, 32768, 2052, 16392, 64, 2560, 33556480, 49152, 49160, 1024, 0,
      /* 436 */ 49164, 3072, 4096, 2146304, 3072, -2146959360, -2012741632, 12, 0, 1048576, 67108864, 0x80000000, 0,
      /* 449 */ 16777220, 4, 128, 131072, 524288, 4194304, 8388608, 16777216, 0, 2048, 4096, 8388608, 16777216, 536870912,
      /* 463 */ 16777216, 134217728, 0, 134217728, 268435456, 1073741824, 1073741832, 524544, 0, 268435456, 0, 16384,
      /* 475 */ 32768, 0, 512, 2048, 536879136, 0, 1073741824, 0, 33554432, 536870912, 524546, 524608, 536879392,
      /* 488 */ -2079293440, 1024, 524610, 33555456, 134823936, 35913729, 35913729, 134824192, 134824320, 320, 1048576,
      /* 499 */ 65536, 1, 262144, 2097152, 64, 1048576, 65536, 0, 16, 524288, 0x80000000, 1024, 2048, 32, 1048576,
      /* 514 */ 2097152, 0, 384, 2, 1048576, 1024, 16384, 16, 4194304, 268435456, 1, 2097152, 16, 268435456, 0x80000000,
      /* 529 */ 128, 4, 32768, 0x80000000, 32768, 0x80000000, 1048576, 33, 0, 3, 0
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
      "'=='",
      "'>'",
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

// End
