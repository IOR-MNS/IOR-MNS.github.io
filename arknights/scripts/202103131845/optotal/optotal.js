var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,c){a.raw=c;return a};$jscomp.arrayIteratorImpl=function(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var c="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return c?c.call(a):$jscomp.arrayIterator(a)};
$jscomp.arrayFromIterator=function(a){for(var c,d=[];!(c=a.next()).done;)d.push(c.value);return d};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,d){if(a==Array.prototype||a==Object.prototype)return a;a[c]=d.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var c=0;c<a.length;++c){var d=a[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,c){var d=$jscomp.propertyToPolyfillSymbol[c];if(null==d)return a[c];d=a[d];return void 0!==d?d:a[c]};
$jscomp.polyfill=function(a,c,d,e){c&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,c,d,e):$jscomp.polyfillUnisolated(a,c,d,e))};$jscomp.polyfillUnisolated=function(a,c,d,e){d=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var b=a[e];if(!(b in d))return;d=d[b]}a=a[a.length-1];e=d[a];c=c(e);c!=e&&null!=c&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:c})};
$jscomp.polyfillIsolated=function(a,c,d,e){var b=a.split(".");a=1===b.length;e=b[0];e=!a&&e in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<b.length-1;f++){var g=b[f];if(!(g in e))return;e=e[g]}b=b[b.length-1];d=$jscomp.IS_SYMBOL_NATIVE&&"es6"===d?e[b]:null;c=c(d);null!=c&&(a?$jscomp.defineProperty($jscomp.polyfills,b,{configurable:!0,writable:!0,value:c}):c!==d&&($jscomp.propertyToPolyfillSymbol[b]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(b):$jscomp.POLYFILL_PREFIX+b,b=
$jscomp.propertyToPolyfillSymbol[b],$jscomp.defineProperty(e,b,{configurable:!0,writable:!0,value:c})))};$jscomp.initSymbol=function(){};
$jscomp.polyfill("Symbol",function(a){if(a)return a;var c=function(a,c){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:c})};c.prototype.toString=function(){return this.$jscomp$symbol$id_};var d=0,e=function(a){if(this instanceof e)throw new TypeError("Symbol is not a constructor");return new c("jscomp_symbol_"+(a||"")+"_"+d++,a)};return e},"es6","es3");$jscomp.initSymbolIterator=function(){};
$jscomp.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var c="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),d=0;d<c.length;d++){var e=$jscomp.global[c[d]];"function"===typeof e&&"function"!=typeof e.prototype[a]&&$jscomp.defineProperty(e.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}})}return a},"es6",
"es3");$jscomp.initSymbolAsyncIterator=function(){};$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,c){a instanceof String&&(a+="");var d=0,e={next:function(){if(d<a.length){var b=d++;return{value:c(b,a[b]),done:!1}}e.next=function(){return{done:!0,value:void 0}};return e.next()}};e[Symbol.iterator]=function(){return e};return e};
$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");$jscomp.polyfill("Number.isFinite",function(a){return a?a:function(a){return"number"!==typeof a?!1:!isNaN(a)&&Infinity!==a&&-Infinity!==a}},"es6","es3");$jscomp.polyfill("Number.isInteger",function(a){return a?a:function(a){return Number.isFinite(a)?a===Math.floor(a):!1}},"es6","es3");$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function c(){this.batch_=null}function d(a){return a instanceof b?a:new b(function(b,c){b(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;c.prototype.asyncExecute=function(a){if(null==this.batch_){this.batch_=[];var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})}this.batch_.push(a)};var e=$jscomp.global.setTimeout;c.prototype.asyncExecuteFunction=function(a){e(a,0)};c.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];a[b]=null;try{c()}catch(k){this.asyncThrow_(k)}}}this.batch_=null};c.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var b=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(h){b.reject(h)}};b.prototype.createResolveAndReject_=function(){function a(a){return function(d){c||(c=!0,a.call(b,d))}}var b=this,c=!1;
return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};b.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof b)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var c=null!=a;break a;case "function":c=!0;break a;default:c=!1}c?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};b.prototype.resolveToNonPromiseObj_=function(a){var b=void 0;try{b=a.then}catch(h){this.reject_(h);return}"function"==typeof b?
this.settleSameAsThenable_(b,a):this.fulfill_(a)};b.prototype.reject_=function(a){this.settle_(2,a)};b.prototype.fulfill_=function(a){this.settle_(1,a)};b.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};b.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=0;a<this.onSettledCallbacks_.length;++a)f.asyncExecute(this.onSettledCallbacks_[a]);
this.onSettledCallbacks_=null}};var f=new c;b.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};b.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(k){c.reject(k)}};b.prototype.then=function(a,c){function d(a,b){return"function"==typeof a?function(b){try{e(a(b))}catch(F){f(F)}}:b}var e,f,g=new b(function(a,b){e=a;f=b});this.callWhenSettled_(d(a,e),d(c,f));return g};
b.prototype.catch=function(a){return this.then(void 0,a)};b.prototype.callWhenSettled_=function(a,b){function c(){switch(d.state_){case 1:a(d.result_);break;case 2:b(d.result_);break;default:throw Error("Unexpected state: "+d.state_);}}var d=this;null==this.onSettledCallbacks_?f.asyncExecute(c):this.onSettledCallbacks_.push(c)};b.resolve=d;b.reject=function(a){return new b(function(b,c){c(a)})};b.race=function(a){return new b(function(b,c){for(var e=$jscomp.makeIterator(a),f=e.next();!f.done;f=e.next())d(f.value).callWhenSettled_(b,
c)})};b.all=function(a){var c=$jscomp.makeIterator(a),e=c.next();return e.done?d([]):new b(function(a,b){function f(b){return function(c){g[b]=c;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,d(e.value).callWhenSettled_(f(g.length-1),b),e=c.next();while(!e.done)})};return b},"es6","es3");
$jscomp.polyfill("Array.from",function(a){return a?a:function(a,d,e){d=null!=d?d:function(a){return a};var b=[],c="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if("function"==typeof c){a=c.call(a);for(var g=0;!(c=a.next()).done;)b.push(d.call(e,c.value,g++))}else for(c=a.length,g=0;g<c;g++)b.push(d.call(e,a[g],g));return b}},"es6","es3");var glob=glob||{namespace:"optotal",ga_event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"};
window[glob.namespace]=window[glob.namespace]||{};var gtag_searchByNameUsed=!1,gtag_searchByRarityUsed=!1;gtag_searchByClassUsed=!1;window[glob.namespace].openModalPrompt=function(){gtag("event","\ub300\uc6d0 \ucd94\uac00 \ud504\ub86c\ud504\ud2b8 \uc5f4\uae30",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});var a=document.querySelector(".modal");a.style.display="block";a.style.opacity="1";doNotRefreshResult=!0;showSearchResult()};
window[glob.namespace].closeModalPromptAnimation=function(){document.querySelector(".modal").style.display="none"};window[glob.namespace].closeModalPrompt=function(){document.querySelector(".modal").style.opacity="0";setTimeout(closeModalPromptAnimation,300);doNotRefreshResult=!1;showResult()};
window[glob.namespace].getAllIDs=function(a){a=a.split("-")[0];for(var c=[],d=0;d<db.op.keys.length;++d)db.op.keys[d]===a?c.push(db.op.keys[d]):0===db.op.keys[d].indexOf(a+"-")&&c.push(db.op.keys[d]);c.sort(function(a,b){a=a.split("-");b=b.split("-");1===a.length&&a.push(0);1===b.length&&b.push(0);return a[0]<b[0]?-1:a[0]>b[0]?1:Number(a[1])<Number(b[1])?-1:1});return c};
window[glob.namespace].closeModalPrompt_button=function(){gtag("event","\ub300\uc6d0 \ucd94\uac00 \ud504\ub86c\ud504\ud2b8 \ub2eb\uae30: \ubc84\ud2bc \ud074\ub9ad",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});closeModalPrompt(!0)};
window[glob.namespace].closeModalPrompt_outer=function(a){"modal"===a.target.getAttribute("id")&&(gtag("event","\ub300\uc6d0 \ucd94\uac00 \ud504\ub86c\ud504\ud2b8 \ub2eb\uae30: \uc678\ubd80 \ud074\ub9ad",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}),closeModalPrompt(!0))};
window[glob.namespace].opnameKeyup=function(a){gtag_searchByNameUsed||(gtag_searchByNameUsed=!0,gtag("event","\ub300\uc6d0 \uc774\ub984\uc73c\ub85c \ucd5c\ucd08 \uac80\uc0c9",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}));if(13===a.keyCode){for(;0<document.querySelectorAll(".search-result-op").length;)document.querySelector(".search-result-op").click();this.value="";searchingCondition.name=""}else{a="";for(var c=this.value.split(" "),d=0,e=c.length;d<
e;++d)0!==c[d].length&&(0<d&&(a+=" "),a+=c[d][0].toUpperCase()+c[d].slice(1).toLowerCase());searchingCondition.name=a;showSearchResult()}};
window[glob.namespace].rarityClick=function(){gtag_searchByRarityUsed||(gtag_searchByRarityUsed=!0,gtag("event","\ub300\uc6d0 \ub808\uc5b4\ub3c4\ub85c \ucd5c\ucd08 \uac80\uc0c9",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}));var a=Number(this.getAttribute("name")),c=searchingCondition.rarityArray.indexOf(a);0<=c?(searchingCondition.rarityArray.splice(c,1),this.classList.remove("selected")):(searchingCondition.rarityArray.push(a),this.classList.add("selected"));
showSearchResult()};window[glob.namespace].classClick=function(){gtag_searchByClassUsed||(gtag_searchByClassUsed=!0,gtag("event","\ub300\uc6d0 \ud074\ub798\uc2a4\ub85c \ucd5c\ucd08 \uac80\uc0c9",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}));var a=getTagCodeByKRTagName(this.getAttribute("name"));a&searchingCondition.tagCode?this.classList.remove("selected"):this.classList.add("selected");searchingCondition.tagCode^=a;showSearchResult()};
window[glob.namespace].main_optotal=function(){document.querySelector(".add-btn").addEventListener("click",openModalPrompt);document.querySelector(".close-btn").addEventListener("click",closeModalPrompt_button);window.addEventListener("mousedown",closeModalPrompt_outer);document.getElementById("opname").addEventListener("keyup",opnameKeyup);document.querySelectorAll(".rarity-btn").forEach(function(a){a.addEventListener("click",rarityClick)});document.querySelectorAll(".class-btn").forEach(function(a){a.addEventListener("click",
classClick)});loadLocalStorage()};window[glob.namespace].getTextWidth=function(a){var c="font-size:"+a.css("font-size")+";";c+="font-family:"+a.css("font-family")+";";a=$('<span style="'+c+'">'+a.html()+"</span>").appendTo("body");c=a.width();a.remove();return c};var centerCnt=0,centerCacheHit=0,centerCache={},csp=[],ncsp=[],centerTime=0,doNotCenter=!1;
window[glob.namespace].centerSelect=function(a){if(!doNotCenter){centerTime=Date.now();var c=a.options[a.selectedIndex].innerText,d=centerCache[c];d?(a.style.textIndent=d,csp.push(Date.now()-centerTime)):(d=$(a),a=getTextWidth($(a.options[a.selectedIndex])),a=(d.width()-a)/2,d.css("text-indent",a),centerCache[c]=a+"px",ncsp.push(Date.now()-centerTime))}};
window[glob.namespace].makeOpForm=function(a,c){c=void 0===c?{}:c;var d={},e=!0;c||(c={});"object"===typeof c.values&&(d=c.values);"boolean"===typeof c.asElement&&(e=c.asElement);var b=Number(db.op[a].rarity);c=[0,0,1,2,2,2][b-1];var f=getMaxLevel(c,b),g=[4,7,7][c];db.op[a].name.en.toLowerCase();var m=Number.isInteger(d["current-elite"])?d["current-elite"]:0,h=Number.isInteger(d["target-elite"])?d["target-elite"]:c,k=Number.isInteger(d["current-op-level"])?d["current-op-level"]:1,l=Number.isInteger(d["target-op-level"])?
d["target-op-level"]:f,v=[];if(d["current-skill-level"]){d["current-skill-level"].forEach(function(a){v.push(1<=a&&10>=a?a:1)});f=0;for(var r=3-v.length;f<r;++f)v.push(1)}else v=[1,1,1];var x=[];if(d["target-skill-level"])for(d["target-skill-level"].forEach(function(a){x.push(1<=a&&10>=a?a:g)}),f=0,r=3-x.length;f<r;++f)x.push(g);else x=[g,g,g];d='<div class="remove-op thumb rarity_'+b+'"><img alt='+db.op[a].releaseOrder+' src="./images/op/thumb/'+db.op[a].releaseOrder+'.png"></div><div class="elite"><span>\uc815\uc608\ud654</span><br><select class="current-elite">';
for(f=0;f<=c;++f)d+='<option value="'+f+'"',f===m&&(d+=" selected"),d+=">"+f+"\ub2e8\uacc4</option>";d+='</select><span> \u25b8 </span><select class="target-elite">';for(f=0;f<=c;++f)d+='<option value="'+f+'"',f===h&&(d+=" selected"),d+=">"+f+"\ub2e8\uacc4</option>";d=d+'</select></div><div class="opLevel"><hr><button type="button" class="set-current-op-level-to-max-btn">MAX</button><span> \ub808\ubca8 </span><button type="button" class="set-target-op-level-to-max-btn">MAX</button><br><input type="text" class="current-op-level" value="'+
(k+'"><span> \u25b8 </span><input type="text" class="target-op-level" value="')+(l+'"></div><hr>');c=getNumOfSkills(a);if(0<c)for(d+="<span>\uc2a4\ud0ac \ub808\ubca8</span><br>",d+='<div class="skill">',f=1;f<=c;++f){1<f&&(d+="<br>");d+="<span>"+f+"\uc2a4\ud0ac </span>";d+='<select class="current-skill-level" data-index="'+(f-1)+'">';for(m=1;10>=m;++m)d+='<option value="'+m+'"',m===v[f-1]&&(d+="selected"),d+=">"+m+"</option>";d+="</select>";d+="<span> \u25b8 </span>";d+='<select class="target-skill-level" data-index="'+
(f-1)+'">';for(m=1;10>=m;++m)d+='<option value="'+m+'"',m===x[f-1]&&(d+="selected"),d+=">"+m+"</option>";d+="</select>"}d+="</div></div>";return e?(e=document.createElement("div"),e.classList.add("op"),e.setAttribute("name","op_"+a),e.innerHTML=d,e):'<div class="op" name="op_'+a+'">'+d+"</div>"};
window[glob.namespace].convertOldIDToNewID=function(){gtag("event","ID \uccb4\uacc4 \uc804\ud658(\ubc84\uc804 1\uc5d0\uc11c 2\ub85c)",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});var a={0:"LN02",1:"RL03",2:"LT77",3:"RE41",4:"LM04",5:"AZ01",6:"JC01",7:"AA01",8:"FO03",9:"FO01",10:"PL03",11:"SS02",12:"LM20",13:"SR02",14:"RL06",15:"LM05",16:"NM01",17:"RL02",18:"GG01",19:"R001",20:"VC03",21:"SK01",22:"RR01",23:"SR27",24:"R137",25:"BS01",26:"GG03",27:"SR01",
28:"RB01",29:"AA02",30:"LM08",31:"R132",32:"SS01",33:"RL04",34:"RL01",35:"R106",36:"AA03",37:"LT01",38:"ST01",39:"R110",40:"ST03",41:"KZ03",42:"SR03",43:"JC06",44:"YD01",45:"SG01",46:"SW01",47:"LM16",48:"LM12",49:"R130",50:"R128",51:"RL05",52:"JC05",53:"PL05",54:"USS2",55:"LM15",56:"PL04",57:"LM19",58:"BS02",59:"FO02",60:"MN02",61:"VC05",62:"HT03",63:"PL02",64:"USS1",65:"SI01",66:"R119",67:"VC02",68:"US10",69:"R100",70:"IU04",71:"R123",72:"HK01",73:"VC04",74:"IU07",75:"R104",76:"MN03",77:"R107",78:"LT02",
79:"BS03",80:"VC01",81:"ST02",82:"LM10",83:"R122",84:"KZ04",85:"RB02",86:"LM11",87:"AA04",88:"LN01",89:"IU05",90:"R124",91:"JC03",92:"USS3",93:"JC04",94:"R108",95:"SW02",96:"R105",97:"PA15",98:"PA42",99:"PA41",100:"PA62",101:"PA65",102:"PA43",103:"PA13",104:"PA44",105:"PA63",106:"PA12",107:"PA61",108:"PA14",109:"PA45",110:"PA64",111:"PA11",112:"LT05",113:"BS04",114:"R303",115:"A44",116:"A43",117:"A41",118:"A42",119:"RCX3",120:"RCX2"},c=Object.keys(localStorage).filter(function(a){return 0<=a.indexOf("optotal_")}),
d="",e="",b="";d="";for(var f=0,g=c.length;f<g;++f)b=c[f].split("_"),d=b[1],b[1]=a[d],b[1]?(b=b.join("_"),e=c[f],d=localStorage.getItem(e),localStorage.setItem(b,d),localStorage.removeItem(e)):console.error(d+": \uc624\ud37c\ub808\uc774\ud130 ID \uccb4\uacc4 \ucd5c\uc2e0\ud654 \uc2e4\ud328. \ub9e4\uce6d\ub418\ub294 ID\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc74c.");localStorage.setItem("version_optotal_localStorage",JSON.stringify(db.idVersion.op))};
window[glob.namespace].sleep=function(a){return new Promise(function(c,d){setTimeout(c,a)})};
window[glob.namespace].loadData=function(a){for(var c="",d=0,e=a.IDs.length;d<e;++d){for(var b=a.IDs[d],f="optotal_"+b+"_",g={keys:[]},m=0,h=a[b].length;m<h;++m){var k=a[b][m],l=JSON.parse(localStorage.getItem(f+k));g[k]=l;g.keys.push(k)}c+=makeOpForm(b,{values:g,asElement:!1})}a=document.getElementById("selected-op");a.innerHTML=c;doNotCenter=!0;a.querySelectorAll(".op").forEach(function(a){addOpEventListener(a,!0)});doNotRefreshResult=!1;showResult();console.log("loadComplete")};
window[glob.namespace].loadLocalStorage=function(){console.log("loadLocalStorage");JSON.parse(localStorage.getItem("version_optotal_localStorage")||"1")<db.idVersion.op&&(console.log("\uc624\ud37c\ub808\uc774\ud130 ID \uccb4\uacc4 \ucd5c\uc2e0\ud654 \uc218\ud589"),convertOldIDToNewID());for(var a="current-elite target-elite current-op-level target-op-level current-skill-level target-skill-level".split(" "),c={IDs:[]},d=0;d<db.op.keys.length;++d){var e=db.op.keys[d],b="optotal_"+e+"_";c[e]=[];for(var f=
!1,g=0;g<a.length;++g)null!==localStorage.getItem(b+a[g])&&(c[e].push(a[g]),f=!0);f&&c.IDs.push(e)}if(0===c.IDs.length)document.getElementById("content-body").style.opacity=1,console.log("loadComplete");else{document.getElementById("selected-op-guide").style.display="none";c.IDs.sort(function(a,b){if(Number(db.op[a].rarity)>Number(db.op[b].rarity))return-1;if(Number(db.op[a].rarity)<Number(db.op[b].rarity))return 1;a=a.split("-");b=b.split("-");if(a[0]<b[0])return-1;if(a[0]>b[0])return 1;1===a.length&&
a.push(0);1===b.length&&b.push(0);return Number(a[1])<Number(b[1])?-1:1});Date.now();doNotRefreshResult=!0;a="";d=0;for(e=c.IDs.length;d<e;++d)a+='<div class="op" name="'+c.IDs[d]+'" style="color:#bbb;text-align:center;"><pre>\n\n\n\nLoading...</pre></div>';document.getElementById("selected-op").innerHTML=a;document.getElementById("content-body").style.opacity=1;setTimeout(loadData,0,c)}};
window[glob.namespace].removeAllInputData=function(a){gtag("event","\ubaa8\ub4e0 \uc785\ub825 \ub370\uc774\ud130 \uc0ad\uc81c: \ubc84\ud2bc \ud074\ub9ad",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});confirm("\uc8fc\uc758: \uc774 \uc791\uc5c5\uc740 \ub418\ub3cc\ub9b4 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.\n\uc815\ub9d0 \uc774 \uc11c\ube44\uc2a4\uc758 \ubaa8\ub4e0 \ub370\uc774\ud130\ub97c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")?(Object.keys(localStorage).filter(function(a){return 0<=
a.indexOf("optotal_")}).forEach(function(a){return localStorage.removeItem(a)}),location.reload()):(gtag("event","\ubaa8\ub4e0 \uc785\ub825 \ub370\uc774\ud130 \uc0ad\uc81c: \ucde8\uc18c",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}),alert("\ub370\uc774\ud130 \uc0ad\uc81c\uac00 \ucde8\uc18c\ub418\uc5c8\uc2b5\ub2c8\ub2e4."))};
window[glob.namespace].triggerEvent=function(a,c,d){d=void 0===d?null:d;null!==d?a.dispatchEvent(new CustomEvent(c,{detail:d})):a.dispatchEvent(new CustomEvent(c))};window[glob.namespace].getMaxElite=function(a){return[0,0,1,2,2,2][a-1]};
window[glob.namespace].getNumOfSkills=function(a,c){c=void 0===c?null:c;var d=db.op[a].rarity;null===c&&(c=getMaxElite(d));if(null===db.op[a].skill){var e=a.split("-")[0];if(e===a||null===db.op[e].skill)return console.error("\ub2e4\uc74c \uc6d0\ubcf8 \uc624\ud37c\ub808\uc774\ud130\uc758 skill \uac12\uc774 null\uc784:",a),0;a=e}a=2<=getMaxElite(d)?db.op[a].skill.mastery.length:[0,0,1,2,2,3][d-1];e=[1,2,3][c];void 0===e&&(console.error("elite \uac12\uc5d0 \ubb38\uc81c \uc788\uc74c:",c),e=[1,2,3][getMaxElite(d)]);
e>a&&(e=a);return e};window[glob.namespace].getMaxSkillLevel=function(a){return[4,7,10][a]};
window[glob.namespace].opFormRecalcHandler=function(a){var c=this.getAttribute("name").split("_")[1],d=c.split("-")[0],e=c===d,b={};document.querySelectorAll('#selected-op [name^="op_'+d+'"]').forEach(function(a){var c=a.getAttribute("name").split("_")[1];b[c]={};b[c].form=a;b[c].currentEliteElem=a.querySelectorAll(".current-elite")[0];b[c].targetEliteElem=a.querySelectorAll(".target-elite")[0];b[c].currentLevelElem=a.querySelectorAll(".current-op-level")[0];b[c].targetLevelElem=a.querySelectorAll(".target-op-level")[0];
b[c].currentSkillLevelElems=a.querySelectorAll(".current-skill-level");b[c].targetSkillLevelElems=a.querySelectorAll(".target-skill-level");b[c].currentElite=Number(a.querySelector(".current-elite").value);b[c].targetElite=Number(a.querySelector(".target-elite").value);b[c].currentLevel=Number(a.querySelector(".current-op-level").value);b[c].targetLevel=Number(a.querySelector(".target-op-level").value);b[c].currentSkillLevels=Array.from(a.querySelectorAll(".current-skill-level"),function(a){return Number(a.value)});
b[c].targetSkillLevels=Array.from(a.querySelectorAll(".target-skill-level"),function(a){return Number(a.value)})});if(!e){var f=null===db.op[c].elite;var g=null===db.op[c].skill}f&&(b[c].currentElite=b[d].currentElite,b[c].targetElite=b[d].targetElite,b[c].currentLevel=b[d].currentLevel,b[c].targetLevel=b[d].targetLevel,b[c].currentEliteElem.disabled=!0,b[c].targetEliteElem.disabled=!0,b[c].currentLevelElem.disabled=!0,b[c].targetLevelElem.disabled=!0,this.querySelectorAll(".set-current-op-level-to-max-btn, .set-target-op-level-to-max-btn").forEach(function(a){return a.disabled=
!0}),this.querySelectorAll(".elite, .opLevel").forEach(function(a){return a.style.opacity=0}));g&&(b[c].currentSkillLevels=[].concat($jscomp.arrayFromIterable(b[d].currentSkillLevels)),b[c].targetSkillLevels=[].concat($jscomp.arrayFromIterable(b[d].targetSkillLevels)),b[c].currentSkillLevelElems.forEach(function(a){a.disabled=!0}),b[c].targetSkillLevelElems.forEach(function(a){a.disabled=!0}),this.querySelector(".skill").style.opacity=0);var m=[b[c].currentElite,b[c].targetElite,b[c].currentLevel,
b[c].targetLevel].concat($jscomp.arrayFromIterable(b[c].currentSkillLevels),$jscomp.arrayFromIterable(b[c].targetSkillLevels)),h=this.dataset.inputValue;h=h?h.split(",").map(Number):[];var k=!1;f=0;for(var l=m.length;f<l;++f)if(m[f]!==h[f]){k=!0;break}if(k){m=Number(db.op[c].rarity);getNumOfSkills(c);k=null;k=a.detail&&a.detail.from?a.detail.from:{type:"all"};if("all"===k.type)f=a=h=!0;else{if("elite"===k.type)f=a=h=!0;else if("level"===k.type)h=!1,a=!0,f=!1;else if("skill"===k.type){if(a=h=!1,f=
!0,!Number.isInteger(k.index)||0>k.index||3<=k.index){console.error("\uc778\ub371\uc2a4 \uc624\ub958:",k.index);return}}else{console.error("\ud0c0\uc785 \uc624\ub958:",k.type);return}if("current"!==k.position&&"target"!==k.position){console.error("\ud3ec\uc9c0\uc158 \uc624\ub958:",k.position);return}}g&&(f=!1);if(h&&(g=getMaxElite(m),b[c].currentElite>g&&(b[c].currentElite=g),b[c].targetElite>g&&(b[c].targetElite=g),b[c].targetElite<b[c].currentElite&&(b[c].targetElite=b[c].currentElite),e))for(var v in b)1==
b[v].currentEliteElem.disabled&&(b[v].currentElite=b[d].currentElite),1==b[v].targetEliteElem.disabled&&(b[v].targetElite=b[d].targetElite);if(f){for(var r in b)for(d=getMaxSkillLevel(b[r].currentElite),v=getNumOfSkills(r),g=0;g<v;++g)b[r].currentSkillLevels[g]>d&&(b[r].currentSkillLevels[g]=d);if("skill"===k.type&&"current"===k.position){var x=b[c].currentSkillLevels[k.index];if(7>x)for(var D in b)b[D].currentSkillLevels=b[D].currentSkillLevels.map(function(a){return x});else for(var F in b)b[F].currentSkillLevels=
b[F].currentSkillLevels.map(function(a){return 7>a?7:a})}else{var A=-Infinity;for(E in b){r=getNumOfSkills(E,b[E].currentElite);for(D=0;D<r&&(A=b[E].currentSkillLevels[D]>A?b[E].currentSkillLevels[D]:A,A=7<A?7:A,7!==A);++D);if(7===A)break}for(var G in b)b[G].currentSkillLevels=b[G].currentSkillLevels.map(function(a){return a<A?A:a})}console.log(JSON.parse(JSON.stringify(b)));for(var t in b){var E=getMaxSkillLevel(b[t].targetElite);G=getNumOfSkills(t);for(r=0;r<G;++r)b[t].targetSkillLevels[r]<b[t].currentSkillLevels[r]?
b[t].targetSkillLevels[r]=b[t].currentSkillLevels[r]:b[t].targetSkillLevels[r]>E&&(b[t].targetSkillLevels[r]=E)}if("skill"===k.type&&"target"===k.position){var I=b[c].targetSkillLevels[k.index];if(7>I)for(var y in b)b[y].targetSkillLevels=b[y].targetSkillLevels.map(function(a){return I});else for(var C in b)b[C].targetSkillLevels=b[C].targetSkillLevels.map(function(a){return 7>a?7:a})}else{var B=-Infinity;for(n in b){t=getNumOfSkills(n,b[n].targetElite);for(y=0;y<t&&(B=b[n].targetSkillLevels[y]>B?
b[n].targetSkillLevels[y]:B,B=7<B?7:B,7!==B);++y);if(7===B)break}for(var u in b)b[u].targetSkillLevels=b[u].targetSkillLevels.map(function(a){return a<B?B:a})}}if(a)for(var p in b){var n=getMaxLevel(b[p].currentElite,m);b[p].currentLevel>n&&(b[p].currentLevel=n);1>b[p].currentLevel&&(b[p].currentLevel=1);n=getMaxLevel(b[p].targetElite,m);b[p].targetLevel>n&&(b[p].targetLevel=n);b[p].currentElite===b[p].targetElite&&b[p].targetLevel<b[p].currentLevel?b[p].targetLevel=b[p].currentLevel:1>b[p].targetLevel&&
(b[p].targetLevel=1)}if(h){p=null;for(var z in b){n=getMaxElite(db.op[z].rarity);p=b[z].currentEliteElem.options;u=0;for(t=n;u<t;++u)p[u].disabled=u>n?!0:!1;b[z].currentEliteElem.value=b[z].currentElite;p=b[z].targetEliteElem.options;u=0;for(t=p.length;u<t;++u)p[u].disabled=u<b[z].currentElite||u>n?!0:!1;b[z].targetEliteElem.value=b[z].targetElite}}if(f)for(var q in b){z=getNumOfSkills(q);n=getNumOfSkills(q,b[q].currentElite);p=getNumOfSkills(q,b[q].targetElite);u=getMaxSkillLevel(b[q].currentElite);
f=getMaxSkillLevel(b[q].targetElite);for(t=0;t<n;++t){b[q].currentSkillLevelElems[t].disabled=!1;y=b[q].currentSkillLevelElems[t].options;C=0;for(m=y.length;C<m;++C)y[C].disabled=C>=u?!0:!1;b[q].currentSkillLevelElems[t].value=b[q].currentSkillLevels[t]}for(;n<z;++n)b[q].currentSkillLevelElems[n].disabled=!0,b[q].currentSkillLevelElems[n].value=b[q].currentSkillLevels[n];for(n=0;n<p;++n){b[q].targetSkillLevelElems[n].disabled=!1;u=b[q].targetSkillLevelElems[n].options;t=0;y=u.length;for(C=b[q].currentSkillLevels[n]-
1;t<y;++t)u[t].disabled=t<C||t>=f?!0:!1;b[q].targetSkillLevelElems[n].value=b[q].targetSkillLevels[n]}for(;p<z;++p)b[q].targetSkillLevelElems[p].disabled=!0,b[q].targetSkillLevelElems[p].value=b[q].targetSkillLevels[p]}if(a)for(var H in b)b[H].currentLevelElem.value=b[H].currentLevel,b[H].targetLevelElem.value=b[H].targetLevel;for(var w in b)b[w].form.dataset.inputValue=[b[w].currentElite,b[w].targetElite,b[w].currentLevel,b[w].targetLevel].concat($jscomp.arrayFromIterable(b[w].currentSkillLevels),
$jscomp.arrayFromIterable(b[w].targetSkillLevels)).join(","),q="optotal_"+w+"_",localStorage.setItem(q+"current-elite",JSON.stringify(b[w].currentElite)),localStorage.setItem(q+"current-op-level",JSON.stringify(b[w].currentLevel)),localStorage.setItem(q+"current-skill-level",JSON.stringify(b[w].currentSkillLevels)),localStorage.setItem(q+"target-elite",JSON.stringify(b[w].targetElite)),localStorage.setItem(q+"target-op-level",JSON.stringify(b[w].targetLevel)),localStorage.setItem(q+"target-skill-level",
JSON.stringify(b[w].targetSkillLevels));if(e)for(c=document.querySelectorAll('#selected-op [name^="op_'+c+'-"]'),f=0;f<c.length;++f)triggerEvent(c[f],"recalc");showResult()}else console.log(c,"nodiff: return")};window[glob.namespace].removeOpMousedownHandler=function(){var a=this.closest(".op").getAttribute("name").split("_")[1].split("-")[0];document.querySelectorAll('#selected-op [name^="op_'+a+'"]').forEach(function(a){return a.style.opacity=.4})};
window[glob.namespace].removeOpMouseoverHandler=function(){var a=this.closest(".op").getAttribute("name").split("_")[1].split("-")[0];document.querySelectorAll('#selected-op [name^="op_'+a+'"]').forEach(function(a){return a.style.opacity=.7})};window[glob.namespace].removeOpMouseoutHandler=function(){var a=this.closest(".op").getAttribute("name").split("_")[1].split("-")[0];document.querySelectorAll('#selected-op [name^="op_'+a+'"]').forEach(function(a){return a.style.opacity=1})};
window[glob.namespace].removeOpClickHandler=function(){gtag("event","\uc624\ud37c\ub808\uc774\ud130 \uc0ad\uc81c: \ubc84\ud2bc \ud074\ub9ad",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});this.closest(".op");var a=this.closest(".op").getAttribute("name").split("_")[1];a=getAllIDs(a);for(var c=0;c<a.length;++c){document.querySelector('#selected-op [name="op_'+a[c]+'"]').remove();for(var d="optotal_"+a[c]+"_",e="current-elite target-elite current-op-level target-op-level current-skill-level target-skill-level".split(" "),
b=0;b<e.length;++b)localStorage.removeItem(d+e[b])}null===document.querySelector('div[name*="op_"].op')&&(document.getElementById("selected-op-guide").style.display="block");showResult()};
window[glob.namespace].setCurrentOpLevelToMaxHandler=function(){gtag("event","\ud604\uc7ac \ub808\ubca8 \ucd5c\ub300 \uc124\uc815",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});if(!this.disabled){var a=this.closest(".op"),c=a.getAttribute("name").split("_")[1],d=a.querySelector(".current-op-level");if(c in db.op){var e=Number(a.querySelector(".current-elite").value);c=getMaxLevel(e,Number(db.op[c].rarity));d.value=c;triggerEvent(a,"recalc",{from:{type:"level",
position:"current"}})}else console.error("\uc5d0\ub7ec: \ucde8\ub4dd\ud55c \uc624\ud37c\ub808\uc774\ud130 \uc544\uc774\ub514("+c+")\ub97c DB\uc5d0\uc11c \ucc3e\uc744 \uc218 \uc5c6\uc74c")}};
window[glob.namespace].setTargetOpLevelToMaxHandler=function(){gtag("event","\ubaa9\ud45c \ub808\ubca8 \ucd5c\ub300 \uc124\uc815",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});if(!this.disabled){var a=this.closest(".op"),c=a.getAttribute("name").split("_")[1],d=a.querySelector(".target-op-level");if(c in db.op){var e=Number(a.querySelector(".target-elite").value);c=getMaxLevel(e,Number(db.op[c].rarity));d.value=c;triggerEvent(a,"recalc",{from:{type:"level",
position:"target"}})}else console.error("\uc5d0\ub7ec: \ucde8\ub4dd\ud55c \uc624\ud37c\ub808\uc774\ud130 \uc544\uc774\ub514("+c+")\ub97c DB\uc5d0\uc11c \ucc3e\uc744 \uc218 \uc5c6\uc74c")}};window[glob.namespace].currentEliteChangeHandler=function(){this.disabled||triggerEvent(this.closest(".op"),"recalc",{from:{type:"elite",position:"current"}})};window[glob.namespace].targetEliteChangeHandler=function(){this.disabled||triggerEvent(this.closest(".op"),"recalc",{from:{type:"elite",position:"target"}})};
window[glob.namespace].currentOpLevelChangeHandler=function(){this.disabled||triggerEvent(this.closest(".op"),"recalc",{from:{type:"level",position:"current"}})};window[glob.namespace].targetOpLevelChangeHandler=function(){this.disabled||triggerEvent(this.closest(".op"),"recalc",{from:{type:"level",position:"target"}})};window[glob.namespace].currentSkillLevelChangeHandler=function(a){this.disabled||triggerEvent(this.closest(".op"),"recalc",{from:{type:"skill",position:"current",index:Number(a.target.dataset.index)}})};
window[glob.namespace].targetSkillLevelChangeHandler=function(){this.disabled||triggerEvent(this.closest(".op"),"recalc",{from:{type:"skill",position:"target",index:Number(event.target.dataset.index)}})};
window[glob.namespace].addOpEventListener=function(a,c){c=void 0===c?!1:c;a.addEventListener("recalc",opFormRecalcHandler);a.querySelector(".remove-op").addEventListener("mousedown",removeOpMousedownHandler);a.querySelector(".remove-op").addEventListener("mouseover",removeOpMouseoverHandler);a.querySelector(".remove-op").addEventListener("mouseout",removeOpMouseoutHandler);a.querySelector(".remove-op").addEventListener("click",removeOpClickHandler);a.querySelector(".set-current-op-level-to-max-btn").addEventListener("click",
setCurrentOpLevelToMaxHandler);a.querySelector(".set-target-op-level-to-max-btn").addEventListener("click",setTargetOpLevelToMaxHandler);a.querySelector(".current-elite").addEventListener("change",currentEliteChangeHandler);a.querySelector(".target-elite").addEventListener("change",targetEliteChangeHandler);a.querySelector(".current-op-level").addEventListener("change",currentOpLevelChangeHandler);a.querySelector(".target-op-level").addEventListener("change",targetOpLevelChangeHandler);a.querySelectorAll(".current-skill-level").forEach(function(a){a.addEventListener("change",
currentSkillLevelChangeHandler)});a.querySelectorAll(".target-skill-level").forEach(function(a){a.addEventListener("change",targetSkillLevelChangeHandler)});c&&triggerEvent(a,"recalc",{from:{type:"all"}})};var searchingCondition={name:"",rarityArray:[],tagCode:0};window[glob.namespace].getTagCodeByKRTagName=function(a){for(var c=0;c<db.tag.keys.length;++c)if(db.tag[db.tag.keys[c]].name.kr==a)return Number(db.tag[db.tag.keys[c]].tagCode)};
window[glob.namespace].searchResultOpClick=function(){for(var a=this.getAttribute("name").split("_")[1],c=a.split("-")[0],d=getAllIDs(a),e=0;e<d.length;++e)if(console.log(d[e],"\ucd94\uac00"),"optotal_"+d[e]+"_current-elite"in localStorage)console.error(a+": \uc774\ubbf8 \ucd94\uac00\ub41c \uc624\ud37c\ub808\uc774\ud130");else{var b=makeOpForm(d[e],{values:{},asElement:!0});document.getElementById("selected-op").appendChild(b);addOpEventListener(b,!0);document.getElementById("selected-op-guide").style.display=
"none";gtag("event","\uc624\ud37c\ub808\uc774\ud130 \ucd94\uac00",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"})}a=document.querySelectorAll('.search-result-op[name^="op_'+c+'"]');for(e=0;e<a.length;++e)a[e].remove();0===document.querySelectorAll(".modal-footer>.search-result>.search-result-op").length&&(document.querySelector(".modal-footer>.search-result").innerHTML='<p style="font-size: 0.5em; text-align: center">\uac80\uc0c9 \uacb0\uacfc\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.</p>')};
window[glob.namespace].showSearchResult=function(){searchingCondition.rarityArray.sort(function(a,b){return a>b?-1:1});for(var a=searchOp(searchingCondition.name,searchingCondition.rarityArray,searchingCondition.tagCode),c=[],d=0,e=a.keys.length,b="";d<e;++d)b=a.keys[d],c.push([a[b].name.kr,b]);c.sort(function(a,b){return a[0].localeCompare(b[0])});a="";for(d=0;d<c.length;++d)a+='<div class="search-result-op" name="op_'+c[d][1]+'"><img src="./images/op/thumb/'+db.op[c[d][1]].releaseOrder+'.png"><div><span>'+
c[d][0]+"</span></div></div>";""==a&&(a='<p style="font-size: 0.5em; text-align: center">\uac80\uc0c9 \uacb0\uacfc\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.</p>');document.querySelector(".modal-footer>.search-result").innerHTML=a;document.querySelectorAll(".search-result-op").forEach(function(a){a.addEventListener("click",searchResultOpClick)});document.querySelectorAll(".search-result-op div").forEach(function(a){$(a).textfill()})};
window[glob.namespace].setTextFill=function(){jQuery.fn.textfill=function(a){a=parseInt(a,10);return this.each(function(){function c(){var c=d.parent(),b=c.height(),f=c.width();c=parseInt(d.css("font-size"),10);f/=d.width();var g=c*(f-.1);f=b/d.height();a=c*(f-.1);d.css("fontSize",0<a&&g>a?a:g)}var d=$("span",this);$(window).resize(function(){"block"===document.querySelector(".modal").style.display&&c()});c()})}};
window[glob.namespace].searchOp=function(a,c,d){a=a.replace(/(\s*)/g,"").toLowerCase();var e=0<a.length,b=0<c.length,f=0!=d;if(!(e||b||f))return{keys:[]};for(var g={},m=Object.keys(localStorage).filter(function(a){return 0===a.indexOf("optotal_")}),h=0,k=db.op.keys.length,l="",v="";h<k;++h){l=db.op.keys[h];v="optotal_"+l;for(var r=0,x=m.length;r<x&&0!==m[r].indexOf(v);++r);r<x||(g[l]={},g[l].rarity=db.op[l].rarity,g[l].tagCode=db.op[l].tagCode,g[l].name={},g[l].name.kr=db.op[l].name.kr,g[l].name.en=
db.op[l].name.en,g[l].name.jp=db.op[l].name.jp,g[l].name.cn=db.op[l].name.cn)}g.keys=Object.keys(g);if(e)for(h=0,k=g.keys.length,l="";h<k;++h)l=g.keys[h],0>g[l].name.kr.replace(/(\s*)/g,"").toLowerCase().indexOf(a)&&0>g[l].name.en.replace(/(\s*)/g,"").toLowerCase().indexOf(a)&&0>g[l].name.jp.replace(/(\s*)/g,"").toLowerCase().indexOf(a)&&0>g[l].name.cn.replace(/(\s*)/g,"").toLowerCase().indexOf(a)&&(delete g[l],g.keys.splice(h,1),--h,--k);if(b)for(a=!1,h=0,e=g.keys.length,l="";h<e;++h){l=g.keys[h];
a=!1;r=0;for(x=c.length;r<x;++r)if(rarity=c[r],g[l].rarity==rarity){a=!0;break}a||(delete g[l],g.keys.splice(h,1),--h,--e)}if(f)for(h=0,k=g.keys.length,l="";h<k;++h)l=g.keys[h],d&g[l].tagCode||(delete g[l],g.keys.splice(h,1),--h,--k);return g};
window[glob.namespace].addResultToMcalc=function(a){var c=fetchInputData();if(!1===c)showTooltip("\uc804\uc1a1\ud560 \ub370\uc774\ud130\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4",a.target,"error");else if(gtag("event","\uc7ac\ub8cc \uacc4\uc0b0\uae30\ub85c \uc804\uc1a1 \uc2dc\uc791",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}),confirm("\uacb0\uacfc \ub370\uc774\ud130\ub97c \uc804\uc1a1\ud558\uc2dc\ub824\uba74 \ud655\uc778 \ubc84\ud2bc\uc744 \ub20c\ub7ec\uc8fc\uc2ed\uc2dc\uc624.")){c=
sortResultData(calc(c));for(var d=0;d<c.total.IDs.length;++d){var e=Number(c.total.IDs[d]),b=Number(c.total[e]);b+=JSON.parse(localStorage.getItem("mcalc_item-need_"+e));localStorage.setItem("mcalc_item-need_"+e,JSON.stringify(b))}showTooltip("\uc131\uacf5\uc801\uc73c\ub85c \uacb0\uacfc \ub370\uc774\ud130\ub97c \uc804\uc1a1\ud558\uc600\uc2b5\ub2c8\ub2e4",a.target,"success");confirm("\uc131\uacf5\uc801\uc73c\ub85c \uacb0\uacfc \ub370\uc774\ud130\ub97c \uc804\uc1a1\ud558\uc600\uc2b5\ub2c8\ub2e4.\n\ubc14\ub85c \uc7ac\ub8cc \uacc4\uc0b0\uae30\ub85c \uc774\ub3d9\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")&&
("1"==localStorage.getItem("preferred-version_mcalc")?location.href="mcalc-legacy.html":location.href="mcalc.html")}else gtag("event","\uc7ac\ub8cc \uacc4\uc0b0\uae30\ub85c \uc804\uc1a1 \ucde8\uc18c",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}),showTooltip("\ub370\uc774\ud130 \uc804\uc1a1\uc774 \ucde8\uc18c\ub418\uc5c8\uc2b5\ub2c8\ub2e4",a.target,"error")};window.errorCatcherExec=window.errorCatcherExec||[];
try{window.errorCatcherExec.push("main_optotal"),window.errorCatcherExec.push("setTextFill")}catch(a){window.errorCatcherExec=[],window.errorCatcherExec.push("main_optotal"),window.errorCatcherExec.push("setTextFill")};