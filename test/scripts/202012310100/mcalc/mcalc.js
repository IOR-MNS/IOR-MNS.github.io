var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};
$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b){var c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]};$jscomp.polyfill=function(a,b,c,d){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,d):$jscomp.polyfillUnisolated(a,b,c,d))};
$jscomp.polyfillUnisolated=function(a,b,c,d){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))return;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,c,d){var e=a.split(".");a=1===e.length;d=e[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<e.length-1;f++){var k=e[f];if(!(k in d))return;d=d[k]}e=e[e.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?d[e]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:b}):b!==c&&($jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(e):$jscomp.POLYFILL_PREFIX+e,e=
$jscomp.propertyToPolyfillSymbol[e],$jscomp.defineProperty(d,e,{configurable:!0,writable:!0,value:b})))};$jscomp.initSymbol=function(){};
$jscomp.polyfill("Symbol",function(a){if(a)return a;var b=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};b.prototype.toString=function(){return this.$jscomp$symbol$id_};var c=0,d=function(a){if(this instanceof d)throw new TypeError("Symbol is not a constructor");return new b("jscomp_symbol_"+(a||"")+"_"+c++,a)};return d},"es6","es3");$jscomp.initSymbolIterator=function(){};
$jscomp.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=$jscomp.global[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&$jscomp.defineProperty(d.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}})}return a},"es6",
"es3");$jscomp.initSymbolAsyncIterator=function(){};$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6","es3");
var gtag_block=!1,itemOrder={keys:["\ud2b9\uc218\uc7ac\ub8cc","\uc77c\ubc18\uc7ac\ub8cc","\uc2a4\ud0ac\uac1c\ub860","\uce69\ub958"],"\ud2b9\uc218\uc7ac\ub8cc":[["D32\uac15","\ubc14\uc774\ud3f4\ub77c \ub098\ub178\ud50c\ub808\uc774\ud06c \uce69","\uc911\ud569\uc81c","\ud06c\ub9ac\uc2a4\ud0c8 \uc804\uc790 \uc720\ub2db"],"RMA70-24;\ub9dd\uac04 \uc911\ud569\uccb4;\ud654\uc774\ud2b8 \ud638\uc2a4 \ucf5c;\uace0\uae09 \uc5f0\ub9c8\uc11d;\uc911\ud569\uc824;\uc5f4\ud569\uae08 \ud329;\ud06c\ub9ac\uc2a4\ud0c8 \ud68c\ub85c".split(";"),
"RMA70-12;\ub9dd\uac04 \uad11\uc11d;\ub85c\uc2dd \ucf5c;\uc5f0\ub9c8\uc11d;\uc824;\uc5f4\ud569\uae08;\ud06c\ub9ac\uc2a4\ud0c8 \uc18c\uc790".split(";")],"\uc77c\ubc18\uc7ac\ub8cc":["\ud3ec\ub3c4\ub2f9 \ud329;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974 \ud329;\uac1c\ub7c9 \uc7a5\uce58;\uc815\uc81c \uc6d0\uc554;\uc544\ucf00\ud1a4 \ud329;\uc774\ucca0 \ud329".split(";"),"\ud3ec\ub3c4\ub2f9 \ubc88\ub4e4;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974 \ubc88\ub4e4;\ub9ac\ub274\uc5bc \uc7a5\uce58;\uc6d0\uc554 \ud050\ube0c \ubc88\ub4e4;\uc544\ucf00\ud1a4 \uc751\uc9d1\uccb4 \ubc88\ub4e4;\uc774\ucca0 \ubc88\ub4e4".split(";"),
"\ud3ec\ub3c4\ub2f9;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974;\uc7a5\uce58;\uc6d0\uc554 \ud050\ube0c;\uc544\ucf00\ud1a4 \uc751\uc9d1\uccb4;\uc774\ucca0".split(";"),"\ub300\uccb4\ub2f9;\uc5d0\uc2a4\ud14c\ub974 \uc6d0\ub8cc;\ud30c\uc190\ub41c \uc7a5\uce58;\uc6d0\uc554;\ub514\ucf00\ud1a4;\uc774\ucca0 \uc870\uac01".split(";")],"\uc2a4\ud0ac\uac1c\ub860":[["\uc2a4\ud0ac\uac1c\ub860 \uc81c3\uad8c","\uc2a4\ud0ac\uac1c\ub860 \uc81c2\uad8c","\uc2a4\ud0ac\uac1c\ub860 \uc81c1\uad8c"]],"\uce69\ub958":[["\uce69 \ucca8\uac00\uc81c",
"\uad6c\ub9e4\uc99d\uba85\uc11c"],"\ubc45\uac00\ub4dc \ub4c0\uc5bc \uce69;\uac00\ub4dc \ub4c0\uc5bc \uce69;\ub514\ud39c\ub354 \ub4c0\uc5bc \uce69;\uc2a4\ub098\uc774\ud37c \ub4c0\uc5bc \uce69;\uce90\uc2a4\ud130 \ub4c0\uc5bc \uce69;\uba54\ub515 \ub4c0\uc5bc \uce69;\uc11c\ud3ec\ud130 \ub4c0\uc5bc \uce69;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \ub4c0\uc5bc \uce69".split(";"),"\ubc45\uac00\ub4dc \uce69\uc14b;\uac00\ub4dc \uce69\uc14b;\ub514\ud39c\ub354 \uce69\uc14b;\uc2a4\ub098\uc774\ud37c \uce69\uc14b;\uce90\uc2a4\ud130 \uce69\uc14b;\uba54\ub515 \uce69\uc14b;\uc11c\ud3ec\ud130 \uce69\uc14b;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \uce69\uc14b".split(";"),
"\ubc45\uac00\ub4dc \uce69;\uac00\ub4dc \uce69;\ub514\ud39c\ub354 \uce69;\uc2a4\ub098\uc774\ud37c \uce69;\uce90\uc2a4\ud130 \uce69;\uba54\ub515 \uce69;\uc11c\ud3ec\ud130 \uce69;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \uce69".split(";")]},setInv=function(a){a="<hr>";for(var b=0;b<itemOrder.keys.length;++b){var c=itemOrder[itemOrder.keys[b]];a+='<div class="category_'+b+'">';for(var d=0;d<c.length;++d){for(var e=0;e<c[d].length;++e){var f=Number(c[d][e]),k=db.item[f].grade,g=getItem_have(f),h=getItem_need(f);
g=null===g?"":g;h=null===h?"":h;g=0==g?"":g;h=0==h?"":h;a+='<div align="center" class="item grade_'+k+'" id="item_'+c[d][e]+'"><div class="item_thumb"><img src="./images/item/inv_2/';a+=db.item[f].name.kr;a+='.png"><span class="item_thumb_name">';a+=db.item[f].name.kr;a+='</span><div class="item_thumb_quantity">0</div></div><div class="item_body_have"><span>\ubcf4\uc720\ub7c9</span><br><div class="item_body_input_wrapper"><div class="sub">-</div><input type="text" class="item_body_have_input" value="';
a+=g;a+='"><div class="add">+</div></div></div><div class="item_body_need"><span>\ud544\uc694\ub7c9</span><br><div class="item_body_input_wrapper"><div class="sub">-</div><input type="text" class="item_body_need_input" value="';a+=h;a+='"><div class="add">+</div></div></div></div>'}a+="<div></div>"}a+="<hr>";a+="</div>"}b=$(".item-container.inv");b.html(a);b.find(".add").off("click").on("click",function(){var a=this.parentElement.querySelector("input");a.value=(Number(a.value)||0)+1;$(a).trigger("change")});
b.find(".sub").off("click").on("click",function(){var a=this.parentElement.querySelector("input"),b=Number(a.value)||0;a.value=0>=b-1?"":b-1;$(a).trigger("change")});b.find(".item_body_have_input").off("change keyup").on("change keyup",function(){saveInputToLocalStorage(this,"have")&&$(this).closest(".item").trigger("refresh");gtag_block||gtag("event","\uc18c\uc9c0\ub7c9 \ubcc0\uacbd",{event_category:"\uc7ac\ub8cc \uacc4\uc0b0\uae30 2.0",event_label:"inv"})});b.find(".item_body_need_input").off("change keyup").on("change keyup",
function(){saveInputToLocalStorage(this,"need")&&$(this).closest(".item").trigger("refresh");gtag_block||gtag("event","\ud544\uc694\ub7c9 \ubcc0\uacbd",{event_category:"\uc7ac\ub8cc \uacc4\uc0b0\uae30 2.0",event_label:"inv"})});b.find(".item").off("refresh").on("refresh",function(){var a=Number(this.getAttribute("id").split("_")[1]),b=getItem_need(a);a=getItem_have(a)-b;b=this.querySelector(".item_thumb_quantity");b.innerText=a;b=b.classList;0>a?(b.add("minus"),b.remove("plus")):(0<a?b.add("plus"):
b.remove("plus"),b.remove("minus"))});b.find(".item").trigger("refresh")},setCalc=function(a){console.log("setCalc");a="<hr>";for(var b=0;b<itemOrder.keys.length;++b){var c=itemOrder[itemOrder.keys[b]];a+='<div class="category_'+b+'">';for(var d=0;d<c.length;++d){for(var e=0;e<c[d].length;++e){var f=Number(c[d][e]),k=db.item[f].grade,g=getItem_craft(f);g=null===g?"":g;g=0==g?"":g;var h=0<db.item[f].craft.length;a+='<div align="center" class="item grade_';a+=k;h||(a+=" uncraftable");a+='" id="calc-item_'+
c[d][e]+'"><div class="item_thumb"><img src="./images/item/inv_2/';a+=db.item[f].name.kr;a+='.png"><span class="item_thumb_name">';a+=db.item[f].name.kr;a+='</span><div class="item_thumb_quantity">0</div></div><div class="item_body_craft">';a=h?a+('<span>\uc81c\uc791\ub7c9</span><br><div class="item_body_input_wrapper"><div class="sub">-</div><input type="text" class="item_body_craft_input" value="'+g+'"><div class="add">+</div></div>'):a+"<span>\uc81c\uc791 \ubd88\uac00</span>";a+="</div></div>"}a+=
"<div></div>"}a+="<hr>";a+="</div>"}b=$(".item-container.calc");b.html(a);b.find(".add").off("click").on("click",function(){if(!(0<breakdownGrade)){var a=this.parentElement.querySelector("input");a.value=(Number(a.value)||0)+1;$(a).trigger("change")}});b.find(".sub").off("click").on("click",function(){if(!(0<breakdownGrade)){var a=this.parentElement.querySelector("input"),b=Number(a.value)||0;a.value=0>=b-1?"":b-1;$(a).trigger("change")}});b.find(".item:not(.uncraftable) .item_thumb_quantity").off("click").on("click",
function(){if(!(0<breakdownGrade)){var a=Number(this.innerText),b=this.parentElement.parentElement.querySelector("input"),c=Number(b.value);b.value=c>a?c-a:"";$(b).trigger("change")}});b.find(".item_body_craft_input").off("change keyup").on("change keyup",function(){0<breakdownGrade?this.value=getItem_craft($(this).closest(".item").attr("id").split("_")[1]):(this.classList.contains("uncraftable")&&(this.value=""),saveInputToLocalStorage(this,"craft"),gtag_block||gtag("event","\uc81c\uc791\ub7c9 \ubcc0\uacbd",
{event_category:"\uc7ac\ub8cc \uacc4\uc0b0\uae30 2.0",event_label:"calc"}),$(this).closest(".item").trigger("refresh"))});b.find(".item").off("refresh").on("refresh",function(){var a=Number(this.getAttribute("id").split("_")[1]);setSurplus(this,getSurplus(a));refreshDemand(a,!0);applyConfig()})},saveInputToLocalStorage=function(a,b){a=$(a);if("have"===b){b=a.closest(".item");b=Number(b.attr("id").split("_")[1]);var c=Number(a.val().replace(/[^0-9]/g,"")),d=Number(getItem_have(b));if(isNaN(c))return a.val(0===
d?"":d),!1;setItem_have(b,c);a.val(0===c?"":c);return!0}if("need"===b){b=a.closest(".item");b=Number(b.attr("id").split("_")[1]);c=Number(a.val());d=Number(getItem_need(b));if(isNaN(c))return a.val(d),!1;setItem_need(b,c);return!0}if("craft"===b){b=a.closest(".item");b=Number(b.attr("id").split("_")[1]);c=Number(a.val());d=Number(getItem_need(b));if(isNaN(c))return a.val(d),!1;setItem_craft(b,c);return!0}console.log("invalid inputType:",b);return!1};
$(document).ready(function(){clearSessionStorageCalcData();for(var a=function(a){for(var b in db.item)if(db.item[b].name.kr===a)return b;return-1},b=0;b<itemOrder.keys.length;++b)for(var c=itemOrder[itemOrder.keys[b]],d=0;d<c.length;++d)for(var e=0;e<c[d].length;++e){var f=a(c[d][e]);if(0>f){console.log(c[d][e],"error");return}c[d][e]=f}setInv();a=function(a){if(this.classList.contains("selected"))return!1;var b=document.querySelectorAll(".tab");a=0;for(var c=b.length;a<c;++a)b[a].dataset.tabName!==
this.dataset.tabName?b[a].classList.remove("selected"):b[a].classList.add("selected");b="";var d=document.querySelectorAll(".item-container");a=0;for(c=d.length;a<c;++a)d[a].dataset.tabName!==this.dataset.tabName?d[a].style.display="none":(b=d[a].dataset.tabName,"calc"===d[a].dataset.tabName?(0===d[a].innerHTML.length&&setCalc(),refreshAllCalcItems(),d[a].style.display="block",applyConfig()):d[a].style.display="block");gtag_block||gtag("event","\ud0ed \uc774\ub3d9",{event_category:"\uc7ac\ub8cc \uacc4\uc0b0\uae30 2.0",
event_label:b})};c=document.querySelectorAll(".tab");b=0;for(d=c.length;b<d;++b)c[b].addEventListener("click",a);document.querySelector('.tab[data-tab-name="inv"]').click();document.getElementById("content-body").classList.add("loaded")});