var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(a==Array.prototype||a==Object.prototype)return a;a[c]=b.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var c=0;c<a.length;++c){var b=a[c];if(b&&b.Math==Math)return b}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,c){var b=$jscomp.propertyToPolyfillSymbol[c];if(null==b)return a[c];b=a[b];return void 0!==b?b:a[c]};
$jscomp.polyfill=function(a,c,b,d){c&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,c,b,d):$jscomp.polyfillUnisolated(a,c,b,d))};$jscomp.polyfillUnisolated=function(a,c,b,d){b=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];if(!(e in b))return;b=b[e]}a=a[a.length-1];d=b[a];c=c(d);c!=d&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})};
$jscomp.polyfillIsolated=function(a,c,b,d){var e=a.split(".");a=1===e.length;d=e[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<e.length-1;f++){var q=e[f];if(!(q in d))return;d=d[q]}e=e[e.length-1];b=$jscomp.IS_SYMBOL_NATIVE&&"es6"===b?d[e]:null;c=c(b);null!=c&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:c}):c!==b&&($jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(e):$jscomp.POLYFILL_PREFIX+e,e=
$jscomp.propertyToPolyfillSymbol[e],$jscomp.defineProperty(d,e,{configurable:!0,writable:!0,value:c})))};$jscomp.initSymbol=function(){};
$jscomp.polyfill("Symbol",function(a){if(a)return a;var c=function(a,c){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:c})};c.prototype.toString=function(){return this.$jscomp$symbol$id_};var b=0,d=function(a){if(this instanceof d)throw new TypeError("Symbol is not a constructor");return new c("jscomp_symbol_"+(a||"")+"_"+b++,a)};return d},"es6","es3");$jscomp.initSymbolIterator=function(){};
$jscomp.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var c="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),b=0;b<c.length;b++){var d=$jscomp.global[c[b]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&$jscomp.defineProperty(d.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}})}return a},"es6",
"es3");$jscomp.initSymbolAsyncIterator=function(){};$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,c){a instanceof String&&(a+="");var b=0,d={next:function(){if(b<a.length){var e=b++;return{value:c(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");$jscomp.findInternal=function(a,c,b){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(c.call(b,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,b){return $jscomp.findInternal(this,a,b).v}},"es6","es3");
var itemOrder={keys:["\ud2b9\uc218\uc7ac\ub8cc","\uc77c\ubc18\uc7ac\ub8cc","\uc2a4\ud0ac\uac1c\ub860","\uce69\ub958"],"\ud2b9\uc218\uc7ac\ub8cc":[["D32\uac15","\ubc14\uc774\ud3f4\ub77c \ub098\ub178\ud50c\ub808\uc774\ud06c \uce69","\uc911\ud569\uc81c","\ud06c\ub9ac\uc2a4\ud0c8 \uc804\uc790 \uc720\ub2db"],"RMA70-24;\ub9dd\uac04 \uc911\ud569\uccb4;\ud654\uc774\ud2b8 \ud638\uc2a4 \ucf5c;\uace0\uae09 \uc5f0\ub9c8\uc11d;\uc911\ud569\uc824;\uc5f4\ud569\uae08 \ud329;\ud06c\ub9ac\uc2a4\ud0c8 \ud68c\ub85c".split(";"),
"RMA70-12;\ub9dd\uac04 \uad11\uc11d;\ub85c\uc2dd \ucf5c;\uc5f0\ub9c8\uc11d;\uc824;\uc5f4\ud569\uae08;\ud06c\ub9ac\uc2a4\ud0c8 \uc18c\uc790".split(";")],"\uc77c\ubc18\uc7ac\ub8cc":["\ud3ec\ub3c4\ub2f9 \ud329;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974 \ud329;\uac1c\ub7c9 \uc7a5\uce58;\uc815\uc81c \uc6d0\uc554;\uc544\ucf00\ud1a4 \ud329;\uc774\ucca0 \ud329".split(";"),"\ud3ec\ub3c4\ub2f9 \ubc88\ub4e4;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974 \ubc88\ub4e4;\ub9ac\ub274\uc5bc \uc7a5\uce58;\uc6d0\uc554 \ud050\ube0c \ubc88\ub4e4;\uc544\ucf00\ud1a4 \uc751\uc9d1\uccb4 \ubc88\ub4e4;\uc774\ucca0 \ubc88\ub4e4".split(";"),
"\ud3ec\ub3c4\ub2f9;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974;\uc7a5\uce58;\uc6d0\uc554 \ud050\ube0c;\uc544\ucf00\ud1a4 \uc751\uc9d1\uccb4;\uc774\ucca0".split(";"),"\ub300\uccb4\ub2f9;\uc5d0\uc2a4\ud14c\ub974 \uc6d0\ub8cc;\ud30c\uc190\ub41c \uc7a5\uce58;\uc6d0\uc554;\ub514\ucf00\ud1a4;\uc774\ucca0 \uc870\uac01".split(";")],"\uc2a4\ud0ac\uac1c\ub860":[["\uc2a4\ud0ac\uac1c\ub860 \uc81c3\uad8c","\uc2a4\ud0ac\uac1c\ub860 \uc81c2\uad8c","\uc2a4\ud0ac\uac1c\ub860 \uc81c1\uad8c"]],"\uce69\ub958":[["\uce69 \ucca8\uac00\uc81c",
"\uad6c\ub9e4\uc99d\uba85\uc11c"],"\ubc45\uac00\ub4dc \ub4c0\uc5bc \uce69;\uac00\ub4dc \ub4c0\uc5bc \uce69;\ub514\ud39c\ub354 \ub4c0\uc5bc \uce69;\uc2a4\ub098\uc774\ud37c \ub4c0\uc5bc \uce69;\uce90\uc2a4\ud130 \ub4c0\uc5bc \uce69;\uba54\ub515 \ub4c0\uc5bc \uce69;\uc11c\ud3ec\ud130 \ub4c0\uc5bc \uce69;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \ub4c0\uc5bc \uce69".split(";"),"\ubc45\uac00\ub4dc \uce69\uc14b;\uac00\ub4dc \uce69\uc14b;\ub514\ud39c\ub354 \uce69\uc14b;\uc2a4\ub098\uc774\ud37c \uce69\uc14b;\uce90\uc2a4\ud130 \uce69\uc14b;\uba54\ub515 \uce69\uc14b;\uc11c\ud3ec\ud130 \uce69\uc14b;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \uce69\uc14b".split(";"),
"\ubc45\uac00\ub4dc \uce69;\uac00\ub4dc \uce69;\ub514\ud39c\ub354 \uce69;\uc2a4\ub098\uc774\ud37c \uce69;\uce90\uc2a4\ud130 \uce69;\uba54\ub515 \uce69;\uc11c\ud3ec\ud130 \uce69;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \uce69".split(";")]},showItem=function(a){a="<hr>";for(var c=0;c<itemOrder.keys.length;++c){var b=itemOrder[itemOrder.keys[c]];a+='<div id="category_'+c+'">';for(var d=0;d<b.length;++d){for(var e=0;e<b[d].length;++e){var f=Number(b[d][e]),q=db.item[f].grade,h=getItem_have(f),m=getItem_need(f);
h=null===h?"":h;m=null===m?"":m;h=0==h?"":h;m=0==m?"":m;a+='<div align="center" class="item grade_'+q+'" id="item_'+b[d][e]+'"><div class="item_thumb"><img src="./images/item/inv_2/';a+=db.item[f].name.kr;a+='.png"><span class="item_thumb_name">';a+=db.item[f].name.kr;a+='</span><div class="item_thumb_quantity">0</div></div><div class="item_body"><div style="height:0.4rem"></div><div class="item_body_have">\ubcf4\uc720\ub7c9<br><input type="text" class="item_body_have_input" value="';a+=h;a+='"></div><div class="item_body_need">\ud544\uc694\ub7c9<br><input type="text" class="item_body_need_input" value="';
a+=m;a+='"></div></div></div>'}a+="<div></div>"}a+="<hr>";a+="</div>"}$(".item-container").html(a);$(".item_body_have_input").off("change keyup").on("change keyup",function(){saveInputToLocalStorage(this,"have")&&$(this).closest(".item").trigger("refresh")});$(".item_body_need_input").off("change keyup").on("change keyup",function(){saveInputToLocalStorage(this,"need")&&$(this).closest(".item").trigger("refresh")});$(".item").off("refresh").on("refresh",function(){var a=$(this),c=Number(a.attr("id").split("_")[1]),
b=0>=db.item[c].craft.length?[]:db.item[c].craft[0];var d=Number(getItem_need(c));c=Number(getItem_have(c));var e=v(this);d+=e;e=d-c;e=0>e?0:e;var p=Object.keys(a.data());for(var g=0;g<p.length;++g)0===p[g].indexOf("availability_")&&a.removeData(p[g]);for(g=0;g<b.length;++g){p=Number(b[g][1]);var r=$("#item_"+b[g][0]);if(1===r.length){var l=r;var k=e*p;r=$(a);p=$(l);r=Number(r.attr("id").split("_")[1]);var f=Number(p.attr("id").split("_")[1]);k=Number(k);if(isNaN(k))console.log("\uc624\ub958: \ub9e4\uac1c\ubcc0\uc218\ub97c \uc22b\uc790\ub85c \ubcc0\ud658\ud560 \uc218 \uc5c6\uc74c",
k);else{p.data("craftDemand_"+r,k);k=Number(getItem_have(f));var h=Number(getItem_need(f)),n=u(l);v(l);k=k+n-h;l=w(l);h=[];for(n=0;n<l.length;++n){var m=$("#item_"+l[n]),t=p.data("craftDemand_"+l[n]),q=m.data("availability_"+f);q=void 0===q?0:q;k=0>k?0:k;k<t?(m.data("availability_"+f,k),k=0):(m.data("availability_"+f,t),k-=t);t=m.data("availability_"+f);q!=t&&l[n]!=r&&h.push(m)}for(n=0;n<h.length;++n)h[n].trigger("refresh");p.trigger("refresh")}}}a=u(this);x(this,c+a-d);y(this)});var v=function(a){a=
$(a);var c=0;tmp=Object.keys(a.data()).sort();for(var b=0;b<tmp.length;++b)0===tmp[b].indexOf("craftDemand_")&&(c+=a.data(tmp[b]));return c},w=function(a){var c=$(a);a=[];c=Object.keys(c.data()).sort();for(var b=0;b<c.length;++b)0===c[b].indexOf("craftDemand_")&&a.push(Number(c[b].split("_")[1]));return a},x=function(a,c){var b=$(a);a=b.find(".item_thumb");b=b.find(".item_thumb_quantity");b.text(c);0>c?(b.addClass("minus").removeClass("plus"),a.addClass("minus")):(0<c?b.addClass("plus").removeClass("minus"):
b.removeClass("plus").removeClass("minus"),a.removeClass("minus"))},u=function(a){a=$(a);var c=a.attr("id").split("_")[1];c=0>=db.item[c].craft.length?[]:db.item[c].craft[0];for(var b=!1,d=0;d<c.length;++d){var e=c[d][0],f=Number(c[d][1]),g=a.data("availability_"+e);if(void 0!==g){g=Number(g);if(isNaN(g)){console.log("\uac00\uc6a9\ub7c9 \ub370\uc774\ud130\uc758 \uac12\uc774 \ube44\uc815\uc0c1\uc801\uc784: ",this,"\uc758 jquery data \uc18d\uc131: avail_"+e+": "+$this.data("avail_"+e));return}e=parseInt(g/
f,10);b=!1===b?e:e<b?e:b}}return!1===b?0:b},y=function(a){var c=$(a),b=Number(c.attr("id").split("_")[1]),d=Number(getItem_have(b));var e=Number(getItem_need(b));var f=u(a);e=d+f-e;f=w(a);a=[];for(d=0;d<f.length;++d){var g=$("#item_"+f[d]),h=c.data("craftDemand_"+f[d]),l=g.data("availability_"+b);l=void 0===l?0:l;e=0>e?0:e;e<h?(g.data("availability_"+b,e),e=0):(g.data("availability_"+b,h),e-=h);h=g.data("availability_"+b);l!=h&&a.push(g)}for(d=0;d<a.length;++d)b=a[d].attr("id").split("_")[1],c=Number(getItem_have(b))+
u(a[d]),b=Number(getItem_need(b))+v(a[d]),x(a[d],c-b),y(a[d])};$(".item").trigger("refresh")},saveInputToLocalStorage=function(a,c){a=$(a);if("have"===c){c=a.closest(".item");c=Number(c.attr("id").split("_")[1]);var b=Number(a.val().replace(/[^0-9]/g,"")),d=Number(getItem_have(c));if(isNaN(b))return a.val(0===d?"":d),!1;setItem_have(c,b);a.val(0===b?"":b);return!0}if("need"===c){c=a.closest(".item");c=Number(c.attr("id").split("_")[1]);b=Number(a.val());d=Number(getItem_need(c));if(isNaN(b))return a.val(d),
!1;setItem_need(c,b);return!0}console.log("invalid inputType:",c);return!1};$(document).ready(function(){for(var a=0;a<itemOrder.keys.length;++a)for(var c=itemOrder[itemOrder.keys[a]],b=0;b<c.length;++b)for(var d=0;d<c[b].length;++d){a:{var e=void 0;for(e in db.item)if(db.item[e].name.kr===c[b][d])break a;e=-1}if(0>e){console.log(c[b][d],"error");return}c[b][d]=e}showItem();document.getElementById("content-body").classList.add("loaded")});
