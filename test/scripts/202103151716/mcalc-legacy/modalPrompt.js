var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,c,b){a instanceof String&&(a=String(a));for(var e=a.length,d=0;d<e;d++){var f=a[d];if(c.call(b,f,d,a))return{i:d,v:f}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(a==Array.prototype||a==Object.prototype)return a;a[c]=b.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var c=0;c<a.length;++c){var b=a[c];if(b&&b.Math==Math)return b}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,c){var b=$jscomp.propertyToPolyfillSymbol[c];if(null==b)return a[c];b=a[b];return void 0!==b?b:a[c]};
$jscomp.polyfill=function(a,c,b,e){c&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,c,b,e):$jscomp.polyfillUnisolated(a,c,b,e))};$jscomp.polyfillUnisolated=function(a,c,b,e){b=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var d=a[e];if(!(d in b))return;b=b[d]}a=a[a.length-1];e=b[a];c=c(e);c!=e&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})};
$jscomp.polyfillIsolated=function(a,c,b,e){var d=a.split(".");a=1===d.length;e=d[0];e=!a&&e in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<d.length-1;f++){var g=d[f];if(!(g in e))return;e=e[g]}d=d[d.length-1];b=$jscomp.IS_SYMBOL_NATIVE&&"es6"===b?e[d]:null;c=c(b);null!=c&&(a?$jscomp.defineProperty($jscomp.polyfills,d,{configurable:!0,writable:!0,value:c}):c!==b&&($jscomp.propertyToPolyfillSymbol[d]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(d):$jscomp.POLYFILL_PREFIX+d,d=
$jscomp.propertyToPolyfillSymbol[d],$jscomp.defineProperty(e,d,{configurable:!0,writable:!0,value:c})))};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,b){return $jscomp.findInternal(this,a,b).v}},"es6","es3");
var displayName=!0,displayInputField=!0,filterGrade=[],filterCategory=[],filterOnlyLack=!1,loadConfig=function(){displayName=JSON.parse(localStorage.getItem("mcalc_display_name"));displayInputField=JSON.parse(localStorage.getItem("mcalc_display_inputField"));filterGrade=JSON.parse(localStorage.getItem("mcalc_filter_grade"));filterCategory=JSON.parse(localStorage.getItem("mcalc_filter_category"));filterOnlyLack=JSON.parse(localStorage.getItem("mcalc_filter_onlyLack"));displayName="boolean"!==typeof displayName?
!0:displayName;displayInputField="boolean"!==typeof displayInputField?!0:displayInputField;filterGrade=Array.isArray(filterGrade)?filterGrade:[];filterCategory=Array.isArray(filterCategory)?filterCategory:[];filterOnlyLack="boolean"!==typeof filterOnlyLack?!1:filterOnlyLack;selectConfig()},selectConfig=function(){displayName?$("#config-modal #display_name").prop("checked",!0):$("#config-modal #display_name").prop("checked",!1);displayInputField?$("#config-modal #display_inputField").prop("checked",
!0):$("#config-modal #display_inputField").prop("checked",!1);refreshBtnFilterOnlyLack();for(var a=1;5>=a;++a)0>filterGrade.indexOf(a)?$("#filter_grade_"+String(a)).prop("checked",!0):$("#filter_grade_"+String(a)).prop("checked",!1);for(a=0;3>=a;++a)0>filterCategory.indexOf(a)?$("#filter_category_"+String(a)).prop("checked",!0):$("#filter_category_"+String(a)).prop("checked",!1)},fetchConfig=function(){displayName=JSON.parse($("#config-modal #display_name").prop("checked"));displayInputField=JSON.parse($("#config-modal #display_inputField").prop("checked"));
filterGrade=[];$filterGradeList=$('#config-modal [name="filter_grade"]:not(:checked)');for(var a=0;a<$filterGradeList.length;++a)filterGrade.push(Number($filterGradeList.eq(a).attr("id").split("_")[2]));filterCategory=[];$filterCategoryList=$('#config-modal [name="filter_category"]:not(:checked)');for(a=0;a<$filterCategoryList.length;++a)filterCategory.push(Number($filterCategoryList.eq(a).attr("id").split("_")[2]));localStorage.setItem("mcalc_display_name",JSON.stringify(displayName));localStorage.setItem("mcalc_display_inputField",
JSON.stringify(displayInputField));localStorage.setItem("mcalc_filter_grade",JSON.stringify(filterGrade));localStorage.setItem("mcalc_filter_category",JSON.stringify(filterCategory));localStorage.setItem("mcalc_filter_onlyLack",JSON.stringify(filterOnlyLack))},openConfigModal=function(){gtag("event","\uc124\uc815 \ud504\ub86c\ud504\ud2b8 \uc5f4\uae30",{event_category:"\uc7ac\ub8cc \uacc4\uc0b0\uae30 1.0"});$("#config-modal").css("display","block").css("opacity","1");selectConfig()},closeConfigModal=
function(){$("#config-modal").css("opacity","0");setTimeout(function(){$("#config-modal").css("display","none")},300);fetchConfig();applyConfig()};
$(document).ready(function(){loadConfig();applyConfig();$(".menu-btn").click(function(){openConfigModal()});$(".close-btn").click(function(){gtag("event","\uc124\uc815 \ud504\ub86c\ud504\ud2b8 \ub2eb\uae30: \ubc84\ud2bc \ud074\ub9ad",{event_category:"\uc7ac\ub8cc \uacc4\uc0b0\uae30 1.0"});closeConfigModal()});$(window).click(function(a){$(a.target).is($("#config-modal"))&&(gtag("event","\uc124\uc815 \ud504\ub86c\ud504\ud2b8 \ub2eb\uae30: \uc678\ubd80 \ud074\ub9ad",{event_category:"\uc7ac\ub8cc \uacc4\uc0b0\uae30 1.0"}),
closeConfigModal())});$("#config-modal").find("[name*=display_], [name*=filter_]").change(function(){fetchConfig();applyConfig()})});
