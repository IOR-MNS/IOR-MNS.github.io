var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,b,d){a instanceof String&&(a=String(a));for(var c=a.length,e=0;e<c;e++){var h=a[e];if(b.call(d,h,e,a))return{i:e,v:h}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,d){if(a==Array.prototype||a==Object.prototype)return a;a[b]=d.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var d=a[b];if(d&&d.Math==Math)return d}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b){var d=$jscomp.propertyToPolyfillSymbol[b];if(null==d)return a[b];d=a[d];return void 0!==d?d:a[b]};
$jscomp.polyfill=function(a,b,d,c){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,d,c):$jscomp.polyfillUnisolated(a,b,d,c))};$jscomp.polyfillUnisolated=function(a,b,d,c){d=$jscomp.global;a=a.split(".");for(c=0;c<a.length-1;c++){var e=a[c];if(!(e in d))return;d=d[e]}a=a[a.length-1];c=d[a];b=b(c);b!=c&&null!=b&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,d,c){var e=a.split(".");a=1===e.length;c=e[0];c=!a&&c in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var h=0;h<e.length-1;h++){var g=e[h];if(!(g in c))return;c=c[g]}e=e[e.length-1];d=$jscomp.IS_SYMBOL_NATIVE&&"es6"===d?c[e]:null;b=b(d);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:b}):b!==d&&($jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(e):$jscomp.POLYFILL_PREFIX+e,e=
$jscomp.propertyToPolyfillSymbol[e],$jscomp.defineProperty(c,e,{configurable:!0,writable:!0,value:b})))};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,d){return $jscomp.findInternal(this,a,d).v}},"es6","es3");$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.initSymbol=function(){};
$jscomp.polyfill("Symbol",function(a){if(a)return a;var b=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};b.prototype.toString=function(){return this.$jscomp$symbol$id_};var d=0,c=function(a){if(this instanceof c)throw new TypeError("Symbol is not a constructor");return new b("jscomp_symbol_"+(a||"")+"_"+d++,a)};return c},"es6","es3");$jscomp.initSymbolIterator=function(){};
$jscomp.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),d=0;d<b.length;d++){var c=$jscomp.global[b[d]];"function"===typeof c&&"function"!=typeof c.prototype[a]&&$jscomp.defineProperty(c.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}})}return a},"es6",
"es3");$jscomp.initSymbolAsyncIterator=function(){};$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){a instanceof String&&(a+="");var d=0,c={next:function(){if(d<a.length){var e=d++;return{value:b(e,a[e]),done:!1}}c.next=function(){return{done:!0,value:void 0}};return c.next()}};c[Symbol.iterator]=function(){return c};return c};
$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");
$(document).ready(function(){$(document).on("click mouseover",".result-item-container",function(a){var b=Number($(this).closest(".result-item-container").attr("name").split("_")[1]);console.log(b);if(b in db.item&&(b=db.item[b].craft[0],void 0!==b)){for(var d=Number($(this).find(".result-item-quantity").text()),c={IDs:[]},e=void 0,h=void 0,g=0,k=db.item.keys.length,f;g<k;++g)if(f=db.item.keys[g],"\ucee8\ub514\uc158"===db.item[f].name.kr)e=f;else if("\uc6a9\ubb38\ud3d0"===db.item[f].name.kr)h=f;else if(void 0!=
e&&void 0!=h)break;g=0;for(k=b.length;g<k;++g){f=b[g][0];var l=b[g][1];"\uc2dc\uac04"==f||f==h||f==e||0>=l||(c.hasOwnProperty(f)?c[f]+=l*d:(c[f]=l*d,c.IDs.push(f)))}b=makeResultHtml(c);b='<div class="tooltip">'+b+"</div>";$("body").append(b);$(".tooltip").css("top",10+a.pageY+"px").css("left",10+a.pageX+"px").fadeIn(200)}});$(document).on("mousemove",'[name*="item_"]',function(a){$(".tooltip").css("top",10+a.pageY+"px").css("left",10+a.pageX+"px")});$(document).on("mouseout",'[name*="item_"]',function(){$(".tooltip").remove()})});
var showTooltip=function(a,b,d){b=$(b);var c=$(document.createElement("div"));c.addClass("tooltip "+d).text(a).prependTo(b.parent());a=b.offset();a.left+=(b.innerWidth()-c.innerWidth())/2;a.top-=c.height()+parseInt(c.css("margin-top"),10)+parseInt(c.css("margin-bottom"),10)+parseInt(c.css("border-bottom-width"),10)+parseInt(c.css("border-top-width"),10)+parseInt($("body").css("font-size"),10);c.offset(a);var e=function(a){a.css("opacity","0");setTimeout(function(){a.remove()},300)};setTimeout(function(){e(c)},
1E3)};
