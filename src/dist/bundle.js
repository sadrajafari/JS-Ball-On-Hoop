(()=>{var e={576:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";n(this,e),this.type=t,this.value=r,this.name=null,this.children=[]}return r(e,[{key:"addChild",value:function(e){return this.children.push(e),this}},{key:"evaluate",value:function(t){var r=0;switch(this.type){case e.TYPE_FUNCTION:var n=this.children.map((function(e){return e.evaluate(t)}));r=this.value.apply(this,n);break;case e.TYPE_INVERSE:r=1/this.child.evaluate(t);break;case e.TYPE_NEGATE:r=-this.child.evaluate(t);break;case e.TYPE_NUMBER:r=this.value;break;case e.TYPE_POWER:r=Math.pow(this.children[0].evaluate(t),this.children[1].evaluate(t));break;case e.TYPE_PRODUCT:r=this.children.reduce((function(e,r){return e*r.evaluate(t)}),1);break;case e.TYPE_SUM:r=this.children.reduce((function(e,r){return e+r.evaluate(t)}),0);break;case e.TYPE_SYMBOL:if(isFinite(t[this.value]))return t[this.value];throw new Error("Symbol "+this.value+" is undefined or not a number")}return r}},{key:"isUnary",value:function(){return i.indexOf(this.type)>=0}},{key:"printTree",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t="",r="  ",n=0;n<e;n++)t+=r;for(var a in console.log(t+this.toString()),this.children)this.children[a].printTree(e+1)}},{key:"simplify",value:function(){if(this.children.length>1||this.isUnary()){var t=new e(this.type,this.value);for(var r in this.children)t.addChild(this.children[r].simplify());return t}return 1===this.children.length?this.children[0].simplify():this}},{key:"toString",value:function(){var e="function"==typeof this.value?this.name:this.value;return this.children.length+" "+this.type+" ["+e+"]"}},{key:"child",get:function(){return this.children[0]}},{key:"nodeCount",get:function(){var e=1,t=!0,r=!1,n=void 0;try{for(var a,i=this.children[Symbol.iterator]();!(t=(a=i.next()).done);t=!0)e+=a.value.nodeCount}catch(e){r=!0,n=e}finally{try{!t&&i.return&&i.return()}finally{if(r)throw n}}return e}}]),e}();a.TYPE_FUNCTION="FUNCTION",a.TYPE_INVERSE="INVERSE",a.TYPE_NEGATE="NEGATE",a.TYPE_NUMBER="NUMBER",a.TYPE_POWER="POWER",a.TYPE_PRODUCT="PRODUCT",a.TYPE_SUM="SUM",a.TYPE_SYMBOL="SYMBOL",t.default=a;var i=["FACTORIAL","FUNCTION","INVERSE","NEGATE"]},473:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";n(this,e),this.type=t,this.value=r,this.name=null}return r(e,[{key:"equals",value:function(e){return this.type===e.type&&this.value===e.value}},{key:"toString",value:function(){if(i.indexOf(this.type)>=0)return this.type;var e="function"==typeof this.value?this.name:this.value;return this.type+"["+e+"]"}}]),e}();a.TYPE_LPAREN="LPAREN",a.TYPE_RPAREN="RPAREN",a.TYPE_PLUS="PLUS",a.TYPE_MINUS="MINUS",a.TYPE_TIMES="TIMES",a.TYPE_DIVIDE="DIVIDE",a.TYPE_COMMAND="COMMAND",a.TYPE_SYMBOL="SYMBOL",a.TYPE_WHITESPACE="WHITESPACE",a.TYPE_ABS="ABSOLUTEVAL",a.TYPE_BANG="BANG",a.TYPE_COMMA="COMMA",a.TYPE_POWER="POWER",a.TYPE_NUMBER="NUMBER",a.patterns=new Map([[a.TYPE_LPAREN,/(\(|\[|{|\\left\(|\\left\[)/],[a.TYPE_RPAREN,/(\)|]|}|\\right\)|\\right])/],[a.TYPE_PLUS,/\+/],[a.TYPE_MINUS,/-/],[a.TYPE_TIMES,/\*/],[a.TYPE_DIVIDE,/\//],[a.TYPE_COMMAND,/\\[A-Za-z]+/],[a.TYPE_SYMBOL,/[A-Za-z_][A-Za-z_0-9]*/],[a.TYPE_WHITESPACE,/\s+/],[a.TYPE_ABS,/\|/],[a.TYPE_BANG,/!/],[a.TYPE_COMMA,/,/],[a.TYPE_POWER,/\^/],[a.TYPE_NUMBER,/\d+(\.\d+)?/]]),t.default=a;var i=["TPLUS","TMINUS","TTIMES","TDIVIDE","TWS","TABS","TBANG","TCOMMA","TPOWER"]},940:(e,t,r)=>{"use strict";t.Z=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=(0,n.default)(e,t,r),u=(0,a.default)(i).simplify(),o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return u.evaluate(e)};return o.ast=u,o.expression=e,o.tokens=i,o};var n=i(r(746)),a=i(r(130));function i(e){return e&&e.__esModule?e:{default:e}}},746:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var u,o=e[Symbol.iterator]();!(n=(u=o.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(e){a=!0,i=e}finally{try{!n&&o.return&&o.return()}finally{if(a)throw i}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:c,n=new h(e,t,r);return n.lex(),n.tokens.toString=function(){return n.tokens.map((function(e){return e.toString()})).join(" ")},n.tokens};var i=s(r(473)),u=s(r(368)),o=s(r(614)),l=s(r(445));function s(e){return e&&e.__esModule?e:{default:e}}var f=[i.default.TYPE_POWER,i.default.TYPE_COMMAND],c={latex:!1},h=function(){function e(t,r,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.buffer=t,this.constants=Object.assign({},r,o.default),this.opts=n,this.tokens=[]}return a(e,[{key:"lex",value:function(){this.lexExpression(),this.replaceConstants(),this.replaceCommands()}},{key:"lexExpression",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.hasNext();){var t=e?this.nextCharToken():this.next();if(this.tokens.push((0,l.default)(t)),this.opts.latex&&d(t)){var r=1;t.type===i.default.TYPE_COMMAND&&(r=u.default[t.value.substr(1).toLowerCase()]);for(var n=0;n<r;n++)this.lexExpression(!0)}else v(t)&&this.lexExpression(!1);if(e||E(t))return}}},{key:"hasNext",value:function(){return this.buffer.length>0}},{key:"next",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;if(this.skipWhitespace(),!this.hasNext())throw"Lexer error: reached end of stream";var t=!0,r=!1,a=void 0;try{for(var u,o=i.default.patterns[Symbol.iterator]();!(t=(u=o.next()).done);t=!0){var l=u.value,s=n(l,2),f=s[0],c=s[1],h=new RegExp(/^/.source+c.source),d=h.exec(this.buffer.substr(0,e));if(d)return this.buffer=this.buffer.substr(d[0].length),new i.default(f,d[0])}}catch(e){r=!0,a=e}finally{try{!t&&o.return&&o.return()}finally{if(r)throw a}}throw"Lexer error: can't match any token"}},{key:"nextCharToken",value:function(){return this.skipWhitespace(),"\\"===this.buffer.charAt(0)?this.next():this.next(1)}},{key:"replaceCommands",value:function(){var e=!0,t=!1,r=void 0;try{for(var n,a=this.tokens[Symbol.iterator]();!(e=(n=a.next()).done);e=!0){var u=n.value;u.type===i.default.TYPE_COMMAND&&(u.value=u.value.substr(1).toLowerCase(),u.name=u.value,u.value=this.constants[u.name])}}catch(e){t=!0,r=e}finally{try{!e&&a.return&&a.return()}finally{if(t)throw r}}}},{key:"replaceConstants",value:function(){var e=!0,t=!1,r=void 0;try{for(var n,a=this.tokens[Symbol.iterator]();!(e=(n=a.next()).done);e=!0){var u=n.value;u.type===i.default.TYPE_SYMBOL&&("function"==typeof this.constants[u.value]?(u.type=i.default.TYPE_FUNCTION,u.name=u.value,u.value=this.constants[u.value]):"number"==typeof this.constants[u.value]&&(u.type=i.default.TYPE_NUMBER,u.value=u.fn=this.constants[u.value]))}}catch(e){t=!0,r=e}finally{try{!e&&a.return&&a.return()}finally{if(t)throw r}}}},{key:"skipWhitespace",value:function(){var e=new RegExp(/^/.source+i.default.patterns.get(i.default.TYPE_WHITESPACE).source);this.buffer=this.buffer.replace(e,"")}}]),e}();function d(e){return-1!==f.indexOf(e.type)}function v(e){return e.type===i.default.TYPE_LPAREN&&"{"===e.value}function E(e){return e.type===i.default.TYPE_RPAREN&&"}"===e.value}},130:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();t.default=function(e){return new f(e).parse()};var a=l(r(576)),i=l(r(473)),u=l(r(368)),o=r(614);function l(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var f=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];s(this,e),this.cursor=0,this.tokens=t}return n(e,[{key:"parse",value:function(){var e=this.sum();if(e=e.simplify(),void 0!==this.currentToken)throw console.log(e.printTree()),"Parsing error: Expected end of input, but got "+this.currentToken.type+" "+this.currentToken.value;return e}},{key:"accept",value:function(e){return!(!this.currentToken||this.currentToken.type!==e||(this.cursor++,0))}},{key:"expect",value:function(e){if(!this.accept(e))throw"Expected "+e+" but got "+(this.currentToken?this.currentToken.toString():"end of input.")}},{key:"sum",value:function(){var e=new a.default(a.default.TYPE_SUM);for(e.addChild(this.product());;)if(this.accept(i.default.TYPE_PLUS))e.addChild(this.product());else{if(!this.accept(i.default.TYPE_MINUS))break;e.addChild(new a.default(a.default.TYPE_NEGATE).addChild(this.product()))}return e}},{key:"product",value:function(){var e=new a.default(a.default.TYPE_PRODUCT);for(e.addChild(this.power());;)if(this.accept(i.default.TYPE_TIMES))e.addChild(this.power());else if(this.accept(i.default.TYPE_DIVIDE))e.addChild(new a.default(a.default.TYPE_INVERSE).addChild(this.power()));else if(this.accept(i.default.TYPE_LPAREN))this.cursor--,e.addChild(this.power());else{if(!(this.accept(i.default.TYPE_SYMBOL)||this.accept(i.default.TYPE_NUMBER)||this.accept(i.default.TYPE_FUNCTION)))break;this.cursor--,e.addChild(this.power())}return e}},{key:"power",value:function(){var e=new a.default(a.default.TYPE_POWER);return e.addChild(this.val()),this.accept(i.default.TYPE_POWER)&&e.addChild(this.power()),e}},{key:"val",value:function(){var e={};if(this.accept(i.default.TYPE_SYMBOL))e=new a.default(a.default.TYPE_SYMBOL,this.prevToken.value);else if(this.accept(i.default.TYPE_NUMBER))e=new a.default(a.default.TYPE_NUMBER,parseFloat(this.prevToken.value));else if(this.accept(i.default.TYPE_COMMAND)){var t=this.prevToken;(e=new a.default(a.default.TYPE_FUNCTION,t.value)).name=t.name;for(var r=0;r<u.default[t.name];r++)e.addChild(this.val())}else if(this.accept(i.default.TYPE_FUNCTION))if((e=new a.default(a.default.TYPE_FUNCTION,this.prevToken.value)).name=this.prevToken.name,this.accept(i.default.TYPE_LPAREN)){for(e.addChild(this.sum());this.accept(i.default.TYPE_COMMA);)e.addChild(this.sum());this.expect(i.default.TYPE_RPAREN)}else e.addChild(this.power());else if(this.accept(i.default.TYPE_MINUS))e=new a.default(a.default.TYPE_NEGATE).addChild(this.power());else if(this.accept(i.default.TYPE_LPAREN))e=this.sum(),this.expect(i.default.TYPE_RPAREN);else{if(!this.accept(i.default.TYPE_ABS))throw"Unexpected "+this.currentToken.toString()+" at token "+this.cursor;(e=new a.default(a.default.TYPE_FUNCTION,Math.abs)).addChild(this.sum()),this.expect(i.default.TYPE_ABS)}if(this.accept(i.default.TYPE_BANG)){var n=new a.default(a.default.TYPE_FUNCTION,o.fact);return n.addChild(e),n}return e}},{key:"currentToken",get:function(){return this.tokens[this.cursor]}},{key:"prevToken",get:function(){return this.tokens[this.cursor-1]}}]),e}()},368:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={frac:2,sqrt:1,sin:1,cos:1,tan:1,asin:1,acos:1,atan:1,sec:1,csc:1,cot:1,asec:1,acsc:1,acot:1}},614:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={fact:t.fact=function(e){var t=1;if((e=Math.round(e))<0)throw"Can't factorial a negative.";for(;e>1;e--)t*=e;return t},frac:t.frac=function(e,t){return e/t},logn:t.logn=function(e,t){return Math.log(e)/Math.log(t)},rootn:t.rootn=function(e,t){return Math.pow(e,1/t)},sec:t.sec=function(e){return 1/Math.cos(e)},csc:t.csc=function(e){return 1/Math.sin(e)},cot:t.cot=function(e){return 1/Math.tan(e)}},n=!0,a=!1,i=void 0;try{for(var u,o=Object.getOwnPropertyNames(Math)[Symbol.iterator]();!(n=(u=o.next()).done);n=!0){var l=u.value;r[l]=Math[l]}}catch(e){a=!0,i=e}finally{try{!n&&o.return&&o.return()}finally{if(a)throw i}}t.default=r},445:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return e.type===a.default.TYPE_COMMAND&&["\\cdot","\\times"].includes(e.value)?new a.default(a.default.TYPE_TIMES,"*"):e};var n,a=(n=r(473))&&n.__esModule?n:{default:n}},126:(e,t,r)=>{"use strict";let n;n=r(940).Z,e.exports=n}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{const e=r(126);r.g.window.evaluatex=e})()})();