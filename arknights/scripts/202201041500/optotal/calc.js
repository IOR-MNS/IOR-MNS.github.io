var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};
$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b){var c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]};$jscomp.polyfill=function(a,b,c,d){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,d):$jscomp.polyfillUnisolated(a,b,c,d))};
$jscomp.polyfillUnisolated=function(a,b,c,d){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var f=a[d];if(!(f in c))return;c=c[f]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,c,d){var f=a.split(".");a=1===f.length;d=f[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var e=0;e<f.length-1;e++){var l=f[e];if(!(l in d))return;d=d[l]}f=f[f.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?d[f]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,f,{configurable:!0,writable:!0,value:b}):b!==c&&($jscomp.propertyToPolyfillSymbol[f]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(f):$jscomp.POLYFILL_PREFIX+f,f=
$jscomp.propertyToPolyfillSymbol[f],$jscomp.defineProperty(d,f,{configurable:!0,writable:!0,value:b})))};$jscomp.initSymbol=function(){};
$jscomp.polyfill("Symbol",function(a){if(a)return a;var b=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};b.prototype.toString=function(){return this.$jscomp$symbol$id_};var c=0,d=function(a){if(this instanceof d)throw new TypeError("Symbol is not a constructor");return new b("jscomp_symbol_"+(a||"")+"_"+c++,a)};return d},"es6","es3");$jscomp.initSymbolIterator=function(){};
$jscomp.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=$jscomp.global[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&$jscomp.defineProperty(d.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}})}return a},"es6",
"es3");$jscomp.initSymbolAsyncIterator=function(){};$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");
var itemOrder=[["\ucee8\ub514\uc158","\ub4dc\ub860"],["\uacbd\ud5d8\uce58","\uc6a9\ubb38\ud3d0"],["\uace0\uae09\uc99d\uba85\uc11c","\uad6c\ub9e4\uc99d\uba85\uc11c","\uc790\uaca9\uc99d\uba85\uc11c"],["\uc6a9\uace8","\uac00\uad6c \ubd80\ud488"],"\uace0\uae09\uac74\uc124\uc790\uc7ac;\uc911\uae09\uac74\uc124\uc790\uc7ac;\ucd08\uae09\uac74\uc124\uc790\uc7ac;\uce74\ubcf8 \ud329;\uce74\ubcf8 \ubc88\ub4e4;\uce74\ubcf8".split(";"),["\uace0\uae09\uc791\uc804\uae30\ub85d","\uc911\uae09\uc791\uc804\uae30\ub85d",
"\ucd08\uae09\uc791\uc804\uae30\ub85d","\uae30\ucd08\uc791\uc804\uae30\ub85d"],["\uc2a4\ud0ac\uac1c\ub860 \uc81c3\uad8c","\uc2a4\ud0ac\uac1c\ub860 \uc81c2\uad8c","\uc2a4\ud0ac\uac1c\ub860 \uc81c1\uad8c"],"\uce69 \ucca8\uac00\uc81c;\ubc45\uac00\ub4dc \ub4c0\uc5bc \uce69;\uac00\ub4dc \ub4c0\uc5bc \uce69;\ub514\ud39c\ub354 \ub4c0\uc5bc \uce69;\uc2a4\ub098\uc774\ud37c \ub4c0\uc5bc \uce69;\uce90\uc2a4\ud130 \ub4c0\uc5bc \uce69;\uba54\ub515 \ub4c0\uc5bc \uce69;\uc11c\ud3ec\ud130 \ub4c0\uc5bc \uce69;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \ub4c0\uc5bc \uce69;\ubc45\uac00\ub4dc \uce69\uc14b;\uac00\ub4dc \uce69\uc14b;\ub514\ud39c\ub354 \uce69\uc14b;\uc2a4\ub098\uc774\ud37c \uce69\uc14b;\uce90\uc2a4\ud130 \uce69\uc14b;\uba54\ub515 \uce69\uc14b;\uc11c\ud3ec\ud130 \uce69\uc14b;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \uce69\uc14b;\ubc45\uac00\ub4dc \uce69;\uac00\ub4dc \uce69;\ub514\ud39c\ub354 \uce69;\uc2a4\ub098\uc774\ud37c \uce69;\uce90\uc2a4\ud130 \uce69;\uba54\ub515 \uce69;\uc11c\ud3ec\ud130 \uce69;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \uce69".split(";"),
["\ubaa8\ub4c8 \ub370\uc774\ud130 \ube14\ub85d","D32\uac15","\ubc14\uc774\ud3f4\ub77c \ub098\ub178\ud50c\ub808\uc774\ud06c \uce69","\uc911\ud569\uc81c","\uacb0\uc815 \uc804\uc790 \uc7a5\uce58"],"RMA70-24;\ub9dd\uac04 \uc911\ud569\uccb4;\ud654\uc774\ud2b8 \ud638\uc2a4 \ucf5c;\uace0\uae09 \uc5f0\ub9c8\uc11d;\uc911\ud569\uc824;\uc5f4\ud569\uae08 \ud329;\uacb0\uc815 \ud68c\ub85c;\uc815\uc81c\ub41c \uc6a9\uc81c;\uc808\uc0ad\uc6d0\uc561;RMA70-12;\ub9dd\uac04 \uad11\uc11d;\ub85c\uc2dd \ucf5c;\uc5f0\ub9c8\uc11d;\uc824;\uc5f4\ud569\uae08;\uacb0\uc815 \ubd80\ud488;\ubc18\uc790\uc5f0 \uc6a9\uc81c;\ud654\ud569\uc808\uc0ad\uc561".split(";"),
"\ud3ec\ub3c4\ub2f9 \ud329;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974 \ud329;\uac1c\ub7c9 \uc7a5\uce58;\uc815\uc81c \uc6d0\uc554;\uc544\ucf00\ud1a4 \ud329;\uc774\ucca0 \ud329;\ud3ec\ub3c4\ub2f9 \ubc88\ub4e4;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974 \ubc88\ub4e4;\ub9ac\ub274\uc5bc \uc7a5\uce58;\uc6d0\uc554 \ud050\ube0c \ubc88\ub4e4;\uc544\ucf00\ud1a4 \uc751\uc9d1\uccb4 \ubc88\ub4e4;\uc774\ucca0 \ubc88\ub4e4;\ud3ec\ub3c4\ub2f9;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974;\uc7a5\uce58;\uc6d0\uc554 \ud050\ube0c;\uc544\ucf00\ud1a4 \uc751\uc9d1\uccb4;\uc774\ucca0;\ub300\uccb4\ub2f9;\uc5d0\uc2a4\ud14c\ub974 \uc6d0\ub8cc;\ud30c\uc190\ub41c \uc7a5\uce58;\uc6d0\uc554;\ub514\ucf00\ud1a4;\uc774\ucca0 \uc870\uac01".split(";")],
getGroupIdx=function(a){for(var b=db.item[a].name.kr,c=0;c<itemOrder.length;++c)if(0<=itemOrder[c].indexOf(b))return c;console.log("\uc5d0\ub7ec: \uadf8\ub8f9 \uc778\ub371\uc2a4\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc74c: ",b,a);return-1},showDetailedResult=function(){$("#result-container #detailed-result").css("display","block");$("#result-container .show-detailed-result").css("display","none");$("#result-container .hide-detailed-result").css("display","inline-block")},hideDetailedResult=function(){$("#result-container #detailed-result").css("display",
"none");$("#result-container .show-detailed-result").css("display","inline-block");$("#result-container .hide-detailed-result").css("display","none")},toImg=function(a,b,c){c=void 0===c?!1:c;var d=getItemIDByKRName(a),f=' class="result-item-container',e="";0<=d&&(0<db.item[d].craft.length&&(f+=" clickable"),e+=' name="item_'+d+'"');d="<div"+(f+'"')+e+'><img src="./images/item/t/'+(a+'.png" alt="'+a+'"><div class="result-item-quantity');c?d+=" small":"\uc6a9\ubb38\ud3d0"===a&&(d+=" small");d+='">';
d+=decimalComma(String(b));d+="</div>";d+='<span class="result-item-name">';d+=a;d+="</span>";return d+="</div> "},makeResultHtml=function(a){for(var b="",c=0;c<a.IDs.length;++c){var d=a.IDs[c];b+=toImg(db.item[d].name.kr,a[d])}return b},makeResultHtmlByGroup=function(a){for(var b=' <div class="result-group">',c=-1,d=0;d<a.IDs.length;++d){var f=a.IDs[d],e=getGroupIdx(f);-1==e&&console.log("\uc5d0\ub7ec: \uadf8\ub8f9 \uc778\ub371\uc2a4\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc74c: ",db.item[f].name.kr,f);
0<d&&c!=e&&(b+='</div> <br><br> <div class="result-group">');b+=toImg(db.item[f].name.kr,a[f]);c=e}return b+"</div> "},getItemIDByKRName=function(a){for(var b=0,c=db.item.keys.length,d;b<c;++b)if(d=db.item.keys[b],db.item[d].name.kr===a)return b;return-1},decimalComma=function(a){a=a.toString();var b=a.length%3;var c=0<b?[a.slice(0,b)]:[];for(var d=a.length;b<d;b+=3)c.push(a.slice(b,b+3));return c.join(",")},recalcExpLmd=function(){var a=calc(fetchInputData());localStorage.setItem("optotal_exp-stage",
document.getElementById("exp-stage").value);localStorage.setItem("optotal_lmd-stage",document.getElementById("lmd-stage").value);var b=localStorage.getItem("optotal_exp-stage"),c=localStorage.getItem("optotal_lmd-stage");b in db.oplv.stage.exp||(b="LS-5");c in db.oplv.stage.lmd||(c="CE-5");var d=db.oplv.stage.exp[b].sanity,f=db.oplv.stage.exp[b].reward;b=Math.ceil(a.total.exp/f.lowerBound);f=Math.ceil(a.total.exp/f.upperBound);var e=db.oplv.stage.lmd[c].sanity,l=db.oplv.stage.lmd[c].reward;c=Math.ceil(a.total.lmd/
l.lowerBound);a=Math.ceil(a.total.lmd/l.upperBound);l=b*d+c*e;d=f*d+a*e;e=decimalComma(f);f!=b&&(e+=" - "+decimalComma(b));e+="\ud68c \ud074\ub9ac\uc5b4";document.getElementById("exp-num").innerText=e;e=decimalComma(a);a!=c&&(e+=" - "+decimalComma(c));e+="\ud68c \ud074\ub9ac\uc5b4";document.getElementById("lmd-num").innerText=e;e=decimalComma(d);d!=l&&(e+=" - "+decimalComma(l));e+="\uc774\uc131 \uc18c\ubaa8";document.getElementById("sanity-usage").innerText=e},tt=function(a){var b='<hr class="main-line"><span class="result-maintitle">\ud569\uacc4</span><br><hr class="sub-line"><span class="result-subtitle">\uacbd\ud5d8\uce58, \uc6a9\ubb38\ud3d0</span><hr> <div style="margin-top: 2px; display: inline-block; border: none; width: 100%; text-align: center">'+
toImg("\uacbd\ud5d8\uce58",a.total.exp,!0);b+=toImg("\uc6a9\ubb38\ud3d0",a.total.lmd,!0);b+='</div><br><div style="margin-top: 8px; margin-bottom: 8px; width: 100%; font-size: 10px; text-align: center">\u25bc</div>';var c=localStorage.getItem("optotal_exp-stage"),d=localStorage.getItem("optotal_lmd-stage");c in db.oplv.stage.exp||(c="LS-5");d in db.oplv.stage.lmd||(d="CE-5");var f=db.oplv.stage.exp[c].sanity,e=db.oplv.stage.exp[c].reward,l=Math.ceil(a.total.exp/e.lowerBound);e=Math.ceil(a.total.exp/
e.upperBound);var m=db.oplv.stage.lmd[d].sanity,h=db.oplv.stage.lmd[d].reward,k=Math.ceil(a.total.lmd/h.lowerBound);h=Math.ceil(a.total.lmd/h.upperBound);var g=l*f+k*m;f=e*f+h*m;b+=' <div class="result-exp-lmd-container"><div class="result-exp-lmd"><span style="color: #777; font-size: 15px">\uacbd\ud5d8\uce58</span><select id="exp-stage" onchange="recalcExpLmd()">';for(var n in db.oplv.stage.exp)b+='<option value="'+n+'"',n==c&&(b+=" selected"),b+=">"+n+"</option>";b=b+'</select> \u25b8 <span id="exp-num" class="tag stage-guide-item">'+
decimalComma(e);e!=l&&(b+=" - "+decimalComma(l));b+='\ud68c \ud074\ub9ac\uc5b4</span></span><br><span style="color: #777; font-size: 15px">\uc6a9\ubb38\ud3d0</span><select id="lmd-stage" onchange="recalcExpLmd()">';for(var p in db.oplv.stage.lmd)b+="<option value="+p,p==d&&(b+=" selected"),b+=">"+p+"</option>";b=b+'</select> \u25b8 <span id="lmd-num" class="tag stage-guide-item">'+decimalComma(h);h!=k&&(b+=" - "+decimalComma(k));b=b+'\ud68c \ud074\ub9ac\uc5b4</span></span><br><span style="color: #777; font-size: 15px">\uacbd\ud5d8\uce58+\uc6a9\ubb38\ud3d0</span> \u25b8 <span id="sanity-usage" class="tag stage-guide-item">'+
decimalComma(f);f!=g&&(b+=" - "+decimalComma(g));b=b+'\uc774\uc131 \uc18c\ubaa8</span></span><br></div></div> <br><br><hr class="sub-line"><span class="result-subtitle">\ubaa8\ub4e0 \uc7ac\ub8cc \ud569\uc0b0</span><hr>'+makeResultHtmlByGroup(a.total);b=b+'<hr><button type="button" class="show-detailed-result" onclick="showDetailedResult()">\uc138\ubd80 \uacb0\uacfc \ubcf4\uc774\uae30</button><button type="button" class="hide-detailed-result" onclick="hideDetailedResult()" style="display: none">\uc138\ubd80 \uacb0\uacfc \uc228\uae30\uae30</button><div id="detailed-result" style="display:none"><hr class="sub-line"><span class="result-subtitle">\ub808\ubca8\ub9c1 \ube44\uc6a9<br>(\uc815\uc608\ud654 \ube44\uc6a9 \uc81c\uc678)</span><hr> <div class="result-group">'+
toImg("\uacbd\ud5d8\uce58",a.total.exp,!0);b+=toImg("\uc6a9\ubb38\ud3d0",a.opLeveling.lmd,!0);b=b+'</div> <hr><hr class="sub-line"><span class="result-subtitle">\uc815\uc608\ud654 \uc7ac\ub8cc</span><hr>'+makeResultHtmlByGroup(a.elitePromotion);b=b+'<hr><hr class="sub-line"><span class="result-subtitle">\uc2a4\ud0ac \uac15\ud654 \uc7ac\ub8cc</span><hr>'+makeResultHtmlByGroup(a.skillLeveling);b=b+'<hr><hr class="sub-line"><span class="result-subtitle">\uac15\ud654 \ubaa8\ub4c8 \uc7ac\ub8cc</span><hr>'+
makeResultHtmlByGroup(a.module);return b+'<hr></div><button type="button" class="hide-detailed-result" onclick="hideDetailedResult()" style="display: none">\uc138\ubd80 \uacb0\uacfc \uc228\uae30\uae30</button><hr style="border-top-color: #777; border-top-width: 3px;">'},doNotRefreshResult=!1,showt=0,mshow=[],showResult=function(){if(!0!==doNotRefreshResult){showt=Date.now();var a=fetchInputData();mshow.push(Date.now()-showt);if(!1===a)return $("#result-container").html('<div id="result-guide"><hr class="main-line"><span class="result-maintitle" style="display: inline-block; width: 100%; text-align: left">\ud569\uacc4</span><br><br>\uc5ec\uae30\uc5d0 \uacb0\uacfc\uac00 \ud45c\uc2dc\ub429\ub2c8\ub2e4.</div>'),
!1;showt=Date.now();a=calc(a);mshow.push(Date.now()-showt);showt=Date.now();sortResultData(a);mshow.push(Date.now()-showt);showt=Date.now();a=tt(a);mshow.push(Date.now()-showt);showt=Date.now();document.getElementById("result-container").innerHTML=a;mshow.push(Date.now()-showt)}},fetchInputData=function(){var a={opIDs:[]},b=document.querySelectorAll('.op[name*="op_"]');if(0===b.length)return!1;for(var c=0,d=b.length;c<d;++c){var f=b[c],e=f.getAttribute("name").split("_")[1],l={},m={},h={},k={};null===
db.op[e].elite?m=l=!1:(l.current=Number(f.querySelector(".current-elite").value),l.target=Number(f.querySelector(".target-elite").value),m.current=Number(f.querySelector(".current-op-level").value),m.target=Number(f.querySelector(".target-op-level").value));if(null===db.op[e].skill)h=!1;else{var g=f.querySelectorAll(".current-skill-level"),n=f.querySelectorAll(".target-skill-level"),p=0;n.forEach(function(a){a.disabled||++p});if(0<p){var q=[];for(k=0;k<p;++k)q[k]={},q[k].current=Number(g[k].value),
q[k].target=Number(n[k].value);h.common={};h.common.current=7<q[0].current?7:q[0].current;h.common.target=7<q[0].target?7:q[0].target;h.mastery={};for(k=0;k<p;++k)h.mastery[k]={};for(k=0;k<p;++k)g=q[k].current-7,h.mastery[k].current=0<g?g:0,g=q[k].target-7,h.mastery[k].target=0<g?g:0;q=!0;h.common.current!=h.common.target&&(q=!1);if(q){for(k=0;k<p;++k)if(h.mastery[k].current!=h.mastery[k].target){q=!1;break}q&&(h=!1)}!1!==h&&0<=e.indexOf("-")&&(h.common.current=7)}else h=!1}k=null===db.op[e].module?
!1:f.querySelector(".module-btn").classList.contains("selected");a.opIDs.push(e);a[e]={};a[e].elite=l;a[e].opLevel=m;a[e].skillLevel=h;a[e].module=k}return a},sortResultData=function(a){var b=function(a,b){var c,d;a=db.item[a].name.kr;var l=db.item[b].name.kr;var m=b=d=c=-1;for(var h=0,k=itemOrder.length,g;h<k;++h)if(g=itemOrder[h].indexOf(a),0<=g){c=h;d=g;break}h=0;for(k=itemOrder.length;h<k;++h)if(g=itemOrder[h].indexOf(l),0<=g){b=h;m=g;break}-1!=c&&-1!=d||console.error(a,"\uc6b0\uc120\ub3c4 \uc624\ub958:",
c,d);-1!=b&&-1!=m||console.error(l,"\uc6b0\uc120\ub3c4 \uc624\ub958:",b,m);return c<b?-1:b<c?1:d<m?-1:1};a.skillLeveling.IDs.sort(b);a.elitePromotion.IDs.sort(b);a.total.IDs.sort(b);return a},getMaxLevel=function(a,b){return Number(db.oplv.maxLevel["elite_"+a][b-1])},levelingCalc=function(a){for(var b=db.oplv.leveling.expTable,c=db.oplv.leveling.lmdTable,d,f,e=f=d=0;e<a.target.elite;++e)d+=b["elite_"+String(e)][getMaxLevel(e,a.rarity)-1];d+=b["elite_"+String(a.target.elite)][a.target.level-1];d+=
a.target.exp;for(e=0;e<a.target.elite;++e)f+=c["elite_"+String(e)][getMaxLevel(e,a.rarity)-1];f+=c["elite_"+String(a.target.elite)][a.target.level-1];if(a.target.level<getMaxLevel(a.target.elite,a.rarity)){e=c["elite_"+String(a.target.elite)][a.target.level];e-=c["elite_"+String(a.target.elite)][a.target.level-1];var l=b["elite_"+String(a.target.elite)][a.target.level];l-=b["elite_"+String(a.target.elite)][a.target.level-1];f+=Math.ceil(e/l*a.target.exp)}var m,h;for(e=h=m=0;e<a.current.elite;++e)m+=
b["elite_"+String(e)][getMaxLevel(e,a.rarity)-1];m+=b["elite_"+String(a.current.elite)][a.current.level-1];m+=a.current.exp;for(e=0;e<a.current.elite;++e)h+=c["elite_"+String(e)][getMaxLevel(e,a.rarity)-1];h+=c["elite_"+String(a.current.elite)][a.current.level-1];a.current.level<getMaxLevel(a.current.elite,a.rarity)&&(e=c["elite_"+String(a.current.elite)][a.current.level],e-=c["elite_"+String(a.current.elite)][a.current.level-1],l=b["elite_"+String(a.current.elite)][a.current.level],l-=b["elite_"+
String(a.current.elite)][a.current.level-1],h+=Math.ceil(e/l*a.current.exp));a={};a.exp=d-m;a.lmd=f-h;a.exp=0>a.exp?0:a.exp;a.lmd=0>a.lmd?0:a.lmd;return a},calc=function(a){var b={opLeveling:{},skillLeveling:{},elitePromotion:{},module:{},total:{}};b.opLeveling.exp=0;for(var c=b.opLeveling.lmd=0;c<a.opIDs.length;++c){var d=a.opIDs[c];if(!1!==a[d].opLevel){var f={};f.rarity=db.op[d].rarity;f.current={};f.current.elite=a[d].elite.current;f.current.level=a[d].opLevel.current;f.current.exp=0;f.target=
{};f.target.elite=a[d].elite.target;f.target.level=a[d].opLevel.target;f.target.exp=0;d=levelingCalc(f);b.opLeveling.exp+=d.exp;b.opLeveling.lmd+=d.lmd}}b.elitePromotion.IDs=[];c=0;for(f=a.opIDs.length;c<f;++c)if(d=a.opIDs[c],!1!==a[d].elite){var e=a[d].elite.current,l=a[d].elite.target;if(e!=l)for(;e<l;++e){var m=[];try{m=db.op[d].elite[e]}catch(q){console.error(q);console.error("opID:",d,db.op[d]);return}for(var h=0,k=m.length;h<k;++h){var g=m[h][0],n=Number(m[h][1]);b.elitePromotion.hasOwnProperty(g)?
b.elitePromotion[g]+=n:(b.elitePromotion[g]=n,b.elitePromotion.IDs.push(g))}}}b.skillLeveling.IDs=[];c=0;for(f=a.opIDs.length;c<f;++c)if(d=a.opIDs[c],!1!==a[d].skillLevel){l=Number(a[d].skillLevel.common.current);m=Number(a[d].skillLevel.common.target);for(e=l-1;e<m-1;++e){var p;(p=db.op[d].skill.common[e])||console.log(p,"\n",db.op[d],e,l,m);h=0;for(k=p.length;h<k;++h)g=p[h][0],n=Number(p[h][1]),b.skillLeveling.hasOwnProperty(g)?b.skillLeveling[g]+=n:(b.skillLeveling[g]=n,b.skillLeveling.IDs.push(g))}k=
Object.keys(a[d].skillLevel.mastery).length;for(e=0;e<k;++e)for(l=Number(a[d].skillLevel.mastery[e].target),h=Number(a[d].skillLevel.mastery[e].current);h<l;++h)for(m=db.op[d].skill.mastery[e][h],p=0;p<m.length;++p)g=m[p][0],n=Number(m[p][1]),b.skillLeveling.hasOwnProperty(g)?b.skillLeveling[g]+=n:(b.skillLeveling[g]=n,b.skillLeveling.IDs.push(g))}b.module.IDs=[];c=0;for(f=a.opIDs.length;c<f;++c)if(d=a.opIDs[c],!1!==a[d].module)for(e=0;e<db.op[d].module.length;++e)for(h=db.op[d].module[e],g=0;g<h.length;++g)k=
h[g],n=k[0],k=k[1],b.module.hasOwnProperty(n)?b.module[n]+=k:(b.module[n]=k,b.module.IDs.push(n));b.total.exp=0;b.total.lmd=0;b.total.IDs=[];b.total.exp+=b.opLeveling.exp;b.total.lmd+=b.opLeveling.lmd;for(c=0;c<b.elitePromotion.IDs.length;++c)g=b.elitePromotion.IDs[c],"\uc6a9\ubb38\ud3d0"==db.item[g].name.kr?b.total.lmd+=b.elitePromotion[g]:b.total.hasOwnProperty(g)?b.total[g]+=b.elitePromotion[g]:(b.total[g]=b.elitePromotion[g],b.total.IDs.push(g));for(c=0;c<b.skillLeveling.IDs.length;++c)g=b.skillLeveling.IDs[c],
"\uc6a9\ubb38\ud3d0"==db.item[g].name.kr&&(b.total.lmd+=b.skillLeveling[g]),b.total.hasOwnProperty(g)?b.total[g]+=b.skillLeveling[g]:(b.total[g]=b.skillLeveling[g],b.total.IDs.push(g));for(c=0;c<b.module.IDs.length;++c)g=b.module.IDs[c],"\uc6a9\ubb38\ud3d0"==db.item[g].name.kr?b.total.lmd+=b.module[g]:b.total.hasOwnProperty(g)?b.total[g]+=b.module[g]:(b.total[g]=b.module[g],b.total.IDs.push(g));return b};