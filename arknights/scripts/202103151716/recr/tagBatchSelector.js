var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};
$jscomp.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b){var c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]};
$jscomp.polyfill=function(a,b,c,d){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,d):$jscomp.polyfillUnisolated(a,b,c,d))};$jscomp.polyfillUnisolated=function(a,b,c,d){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))return;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,c,d){var e=a.split(".");a=1===e.length;d=e[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<e.length-1;f++){var g=e[f];if(!(g in d))return;d=d[g]}e=e[e.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?d[e]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:b}):b!==c&&($jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(e):$jscomp.POLYFILL_PREFIX+e,e=
$jscomp.propertyToPolyfillSymbol[e],$jscomp.defineProperty(d,e,{configurable:!0,writable:!0,value:b})))};$jscomp.initSymbol=function(){};
$jscomp.polyfill("Symbol",function(a){if(a)return a;var b=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};b.prototype.toString=function(){return this.$jscomp$symbol$id_};var c=0,d=function(a){if(this instanceof d)throw new TypeError("Symbol is not a constructor");return new b("jscomp_symbol_"+(a||"")+"_"+c++,a)};return d},"es6","es3");$jscomp.initSymbolIterator=function(){};
$jscomp.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=$jscomp.global[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&$jscomp.defineProperty(d.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}})}return a},"es6",
"es3");$jscomp.initSymbolAsyncIterator=function(){};$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");
var gtag_tagBatchSelectorUsed=!1,aliasMap={"\uc2a8":"\uc2a4\ub098\uc774\ud37c","\uc2be":"\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8","\ub52e":"\ub514\ud39c\ub354","\ub525":"\ub514\ubc84\ud504"},batchSelectEventHandler=function(a){if(!0===a.target.checked){var b=null;JSON.parse(a.target.dataset.cgroup).forEach(function(a){b=document.getElementById("tag_"+a);b.className="checkboxButton";b.removeEventListener("click",batchSelectEventHandler)});a.target.dataset.cgroup=""}},banRecommendation=function(a,b){if(0<=
["autoFocusBatchSelector"].indexOf(b)){var c=JSON.parse(localStorage.getItem("recr_banned-recommendation"))||[];0>c.indexOf(b)&&(console.log(b),c.push(b),localStorage.setItem("recr_banned-recommendation",JSON.stringify(c)));a.closest(".recommended").remove()}},createRecommendationPanel=function(a,b,c,d){return'<div class="panel guide-panel recommended">\n            <span style="font-size:110%;font-weight:500">\n            \ucd94\ucc9c\ud558\ub294 \uae30\ub2a5\uc774 \uc788\uc5b4\uc694!<br>\n            <br>\n            </span>\n            <span style="font-size:95%">\n            <a style="cursor:pointer;color:var(--color--skyBlue)" onclick="userConfig.'+
(b+"."+a)+'.value=true;saveUserConfig();location.reload()">['+c+" \ucf1c\uae30]</a><br>\n            <br>\n            "+d+'<br>\n            <br>\n            <a style="cursor:pointer;color:#999" onclick="banRecommendation(this, \''+a+"')\">[\uc55e\uc73c\ub85c \uc774 \ucd94\ucc9c \ud45c\uc2dc\ud558\uc9c0 \uc54a\uae30]</a>\n            </span>\n        </div>"},tagBatchSelectorGuide=function(){document.querySelectorAll(".recommended").forEach(function(a){return a.remove()});var a=JSON.parse(localStorage.getItem("recr_banned-recommendation"))||
[];console.log(a);0>a.indexOf("autoFocusBatchSelector")&&!userConfig.input.autoFocusBatchSelector.value&&document.getElementById("result-panel").insertAdjacentHTML("afterbegin",createRecommendationPanel("autoFocusBatchSelector","input","\ud0dc\uadf8 \uc785\ub825\uae30 \uc790\ub3d9 \ud3ec\ucee4\uc2a4",'\ub4e4\uc5b4\uc624\uc790\ub9c8\uc790, \ub610\ub294 \ud0dc\uadf8\ub97c \ucd08\uae30\ud654\ud55c \ub4a4,<br>\uace7\ubc14\ub85c \ud0dc\uadf8\ub97c \uc785\ub825\ud560 \uc218 \uc788\uc5b4\uc694.<br><br><span style="color:#999">*\ubaa8\ubc14\uc77c \uae30\uae30\uc5d0\uc120 \uc77c\ubd80 \uae30\ub2a5\uc774 \uc81c\ud55c\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4*</span>'))};
$("#tagBatchSelector").keyup(function(a){gtag_tagBatchSelectorUsed||(gtag_tagBatchSelectorUsed=!0,gtag("event","\ud0dc\uadf8 \uc120\ud0dd\uae30 \ucd5c\ucd08 \uc0ac\uc6a9",{event_category:"\uacf5\uac1c\ubaa8\uc9d1 \uacc4\uc0b0\uae30"}));if(13===a.keyCode){if(1==$(a.target).data("typo"))$(a.target).addClass("typo"),gtag("event","\ud0dc\uadf8 \uc120\ud0dd\uae30 \uc624\ud0c0 \uacbd\uace0 \uae30\ub2a5 \uc791\ub3d9",{event_category:"\uacf5\uac1c\ubaa8\uc9d1 \uacc4\uc0b0\uae30"});else{tagBatchSelectorGuide();
$(a.target).blur();var b=0;b=0<$(".blink+label").length?$(".selection-panel").offset().top:$("#selection-panel-footer-btn").offset().top;$("html,body").animate({scrollTop:b},200)}return!1}$(a.target).removeClass("typo");$(a.target).data("typo",!1);if(0===this.value.replace(/(\s*)/g,"").length)return!1;var c=0,d=db.tag.keys.length,e=[],f={},g=[];this.value.split("").forEach(function(b){b=aliasMap[b]||b;c=0;for(g=[];c<d;++c)"sex"!==db.tag[c].type&&0===db.tag[c].name.kr.slice(0,b.length).indexOf(b)&&
g.push(c);0===g.length&&/[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/.test(b)&&$(a.target).data("typo",!0);1===g.length?e.push(g[0]):1<g.length&&(f[b]?++f[b].cnt:f[b]={cnt:1,tags:[].concat($jscomp.arrayFromIterable(g))})});clearSelection(!1,!1);var h=null;Object.keys(f).forEach(function(a){f[a].cnt>=f[a].tags.length?e=[].concat($jscomp.arrayFromIterable(e),$jscomp.arrayFromIterable(f[a].tags)):f[a].tags.forEach(function(b){h=document.getElementById("tag_"+b);h.className+=" blink";h.dataset.cgroup=
JSON.stringify(f[a].tags);h.addEventListener("click",batchSelectEventHandler)})});5<e.length&&$(a.target).data("typo",!0);if(0<e.length){var k=null;e.forEach(function(a){k=document.getElementById("tag_"+a);k.checked=!0;tagClicked(k,!1)});showResult()}});