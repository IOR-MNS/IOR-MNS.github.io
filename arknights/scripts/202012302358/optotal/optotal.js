var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};
$jscomp.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b){var c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]};
$jscomp.polyfill=function(a,b,c,f){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,f):$jscomp.polyfillUnisolated(a,b,c,f))};$jscomp.polyfillUnisolated=function(a,b,c,f){c=$jscomp.global;a=a.split(".");for(f=0;f<a.length-1;f++){var e=a[f];if(!(e in c))return;c=c[e]}a=a[a.length-1];f=c[a];b=b(f);b!=f&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,c,f){var e=a.split(".");a=1===e.length;f=e[0];f=!a&&f in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var d=0;d<e.length-1;d++){var g=e[d];if(!(g in f))return;f=f[g]}e=e[e.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?f[e]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:b}):b!==c&&($jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(e):$jscomp.POLYFILL_PREFIX+e,e=
$jscomp.propertyToPolyfillSymbol[e],$jscomp.defineProperty(f,e,{configurable:!0,writable:!0,value:b})))};$jscomp.initSymbol=function(){};
$jscomp.polyfill("Symbol",function(a){if(a)return a;var b=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};b.prototype.toString=function(){return this.$jscomp$symbol$id_};var c=0,f=function(a){if(this instanceof f)throw new TypeError("Symbol is not a constructor");return new b("jscomp_symbol_"+(a||"")+"_"+c++,a)};return f},"es6","es3");$jscomp.initSymbolIterator=function(){};
$jscomp.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var f=$jscomp.global[b[c]];"function"===typeof f&&"function"!=typeof f.prototype[a]&&$jscomp.defineProperty(f.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}})}return a},"es6",
"es3");$jscomp.initSymbolAsyncIterator=function(){};$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};$jscomp.iteratorFromArray=function(a,b){a instanceof String&&(a+="");var c=0,f={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}f.next=function(){return{done:!0,value:void 0}};return f.next()}};f[Symbol.iterator]=function(){return f};return f};
$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");$jscomp.polyfill("Number.isFinite",function(a){return a?a:function(a){return"number"!==typeof a?!1:!isNaN(a)&&Infinity!==a&&-Infinity!==a}},"es6","es3");$jscomp.polyfill("Number.isInteger",function(a){return a?a:function(a){return Number.isFinite(a)?a===Math.floor(a):!1}},"es6","es3");$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}function c(a){return a instanceof e?a:new e(function(b,c){b(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){if(null==this.batch_){this.batch_=[];var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})}this.batch_.push(a)};var f=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){f(a,0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];a[b]=null;try{c()}catch(r){this.asyncThrow_(r)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var e=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(h){b.reject(h)}};e.prototype.createResolveAndReject_=function(){function a(a){return function(d){c||(c=!0,a.call(b,d))}}var b=this,c=!1;
return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};e.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof e)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};e.prototype.resolveToNonPromiseObj_=function(a){var b=void 0;try{b=a.then}catch(h){this.reject_(h);return}"function"==typeof b?
this.settleSameAsThenable_(b,a):this.fulfill_(a)};e.prototype.reject_=function(a){this.settle_(2,a)};e.prototype.fulfill_=function(a){this.settle_(1,a)};e.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=0;a<this.onSettledCallbacks_.length;++a)d.asyncExecute(this.onSettledCallbacks_[a]);
this.onSettledCallbacks_=null}};var d=new b;e.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};e.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(r){c.reject(r)}};e.prototype.then=function(a,b){function c(a,b){return"function"==typeof a?function(b){try{d(a(b))}catch(q){f(q)}}:b}var d,f,g=new e(function(a,b){d=a;f=b});this.callWhenSettled_(c(a,d),c(b,f));return g};
e.prototype.catch=function(a){return this.then(void 0,a)};e.prototype.callWhenSettled_=function(a,b){function c(){switch(e.state_){case 1:a(e.result_);break;case 2:b(e.result_);break;default:throw Error("Unexpected state: "+e.state_);}}var e=this;null==this.onSettledCallbacks_?d.asyncExecute(c):this.onSettledCallbacks_.push(c)};e.resolve=c;e.reject=function(a){return new e(function(b,c){c(a)})};e.race=function(a){return new e(function(b,d){for(var e=$jscomp.makeIterator(a),f=e.next();!f.done;f=e.next())c(f.value).callWhenSettled_(b,
d)})};e.all=function(a){var b=$jscomp.makeIterator(a),d=b.next();return d.done?c([]):new e(function(a,e){function f(b){return function(c){g[b]=c;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,c(d.value).callWhenSettled_(f(g.length-1),e),d=b.next();while(!d.done)})};return e},"es6","es3");var gtag_searchByNameUsed=!1,gtag_searchByRarityUsed=!1;gtag_searchByClassUsed=!1;
var openModalPrompt=function(){gtag("event","\ub300\uc6d0 \ucd94\uac00 \ud504\ub86c\ud504\ud2b8 \uc5f4\uae30",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});var a=document.querySelector(".modal");a.style.display="block";a.style.opacity="1";doNotRefreshResult=!0;showSearchResult()},closeModalPrompt=function(){var a=document.querySelector(".modal");a.style.opacity="0";setTimeout(function(){a.style.display="none"},300);doNotRefreshResult=!1;showResult()},
getAllIDs=function(a){a=a.split("-")[0];for(var b=[],c=0;c<db.op.keys.length;++c)db.op.keys[c]===a?b.push(db.op.keys[c]):0===db.op.keys[c].indexOf(a+"-")&&b.push(db.op.keys[c]);b.sort(function(a,b){a=a.split("-");b=b.split("-");1===a.length&&a.push(0);1===b.length&&b.push(0);return a[0]<b[0]?-1:a[0]>b[0]?1:Number(a[1])<Number(b[1])?-1:1});return b},main=function(){document.querySelector(".add-btn").addEventListener("click",function(){openModalPrompt()});document.querySelector(".close-btn").addEventListener("click",
function(){gtag("event","\ub300\uc6d0 \ucd94\uac00 \ud504\ub86c\ud504\ud2b8 \ub2eb\uae30: \ubc84\ud2bc \ud074\ub9ad",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});closeModalPrompt(!0)});window.addEventListener("mousedown",function(a){"modal"===a.target.getAttribute("id")&&(gtag("event","\ub300\uc6d0 \ucd94\uac00 \ud504\ub86c\ud504\ud2b8 \ub2eb\uae30: \uc678\ubd80 \ud074\ub9ad",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}),
closeModalPrompt(!0))});document.getElementById("opname").addEventListener("keyup",function(a){gtag_searchByNameUsed||(gtag_searchByNameUsed=!0,gtag("event","\ub300\uc6d0 \uc774\ub984\uc73c\ub85c \ucd5c\ucd08 \uac80\uc0c9",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}));if(13===a.keyCode){for(;0<document.querySelectorAll(".search-result-op").length;)document.querySelector(".search-result-op").click();this.value="";searchingCondition.name=""}else{a=
"";for(var b=this.value.split(" "),c=0,f=b.length;c<f;++c)0!==b[c].length&&(0<c&&(a+=" "),a+=b[c][0].toUpperCase()+b[c].slice(1).toLowerCase());searchingCondition.name=a;showSearchResult()}});document.querySelectorAll(".rarity-btn").forEach(function(a){a.addEventListener("click",function(){gtag_searchByRarityUsed||(gtag_searchByRarityUsed=!0,gtag("event","\ub300\uc6d0 \ub808\uc5b4\ub3c4\ub85c \ucd5c\ucd08 \uac80\uc0c9",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}));
var a=Number(this.getAttribute("name")),c=searchingCondition.rarityArray.indexOf(a);0<=c?(searchingCondition.rarityArray.splice(c,1),this.classList.remove("selected")):(searchingCondition.rarityArray.push(a),this.classList.add("selected"));showSearchResult()})});document.querySelectorAll(".class-btn").forEach(function(a){a.addEventListener("click",function(){gtag_searchByClassUsed||(gtag_searchByClassUsed=!0,gtag("event","\ub300\uc6d0 \ud074\ub798\uc2a4\ub85c \ucd5c\ucd08 \uac80\uc0c9",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}));
var a=getTagCodeByKRTagName(this.getAttribute("name"));a&searchingCondition.tagCode?this.classList.remove("selected"):this.classList.add("selected");searchingCondition.tagCode^=a;showSearchResult()})});loadLocalStorage()},getTextWidth=function(a){var b="font-size:"+a.css("font-size")+";";b+="font-family:"+a.css("font-family")+";";a=$('<span style="'+b+'">'+a.html()+"</span>").appendTo("body");b=a.width();a.remove();return b},centerCnt=0,centerCacheHit=0,centerCache={},csp=[],ncsp=[],centerTime=0,
doNotCenter=!1,centerSelect=function(a){if(!doNotCenter){centerTime=Date.now();var b=a.options[a.selectedIndex].innerText,c=centerCache[b];c?(a.style.textIndent=c,csp.push(Date.now()-centerTime)):(c=$(a),a=getTextWidth($(a.options[a.selectedIndex])),a=(c.width()-a)/2,c.css("text-indent",a),centerCache[b]=a+"px",ncsp.push(Date.now()-centerTime))}},makeOpForm=function(a,b){b=void 0===b?{}:b;var c={},f=!0;b||(b={});"object"===typeof b.values&&(c=b.values);"boolean"===typeof b.asElement&&(f=b.asElement);
var e=Number(db.op[a].rarity);b=[0,0,1,2,2,2][e-1];var d=getMaxLevel(b,e),g=[4,7,7][b];db.op[a].name.en.toLowerCase();var n=Number.isInteger(c["current-elite"])?c["current-elite"]:0,h=Number.isInteger(c["target-elite"])?c["target-elite"]:b,r=Number.isInteger(c["current-op-level"])?c["current-op-level"]:1,k=Number.isInteger(c["target-op-level"])?c["target-op-level"]:d,u=[];if(c["current-skill-level"]){c["current-skill-level"].forEach(function(a){u.push(1<=a&&10>=a?a:1)});d=0;for(var m=3-u.length;d<
m;++d)u.push(1)}else u=[1,1,1];var l=[];if(c["target-skill-level"])for(c["target-skill-level"].forEach(function(a){l.push(1<=a&&10>=a?a:g)}),d=0,m=3-l.length;d<m;++d)l.push(g);else l=[g,g,g];c='<div class="remove-op thumb rarity_'+e+'"><img alt='+db.op[a].releaseOrder+' src="./images/op/thumb/'+db.op[a].releaseOrder+'.png"></div><div class="elite"><span>\uc815\uc608\ud654</span><br><select class="current-elite">';for(d=0;d<=b;++d)c+='<option value="'+d+'"',d===n&&(c+=" selected"),c+=">"+d+"\ub2e8\uacc4</option>";
c+='</select><span> \u25b8 </span><select class="target-elite">';for(d=0;d<=b;++d)c+='<option value="'+d+'"',d===h&&(c+=" selected"),c+=">"+d+"\ub2e8\uacc4</option>";c=c+'</select></div><div class="opLevel"><hr><button type="button" class="set-current-op-level-to-max-btn">MAX</button><span> \ub808\ubca8 </span><button type="button" class="set-target-op-level-to-max-btn">MAX</button><br><input type="text" class="current-op-level" value="'+(r+'"><span> \u25b8 </span><input type="text" class="target-op-level" value="')+
(k+'"></div><hr>');b=getNumOfSkills(a);if(0<b)for(c+="<span>\uc2a4\ud0ac \ub808\ubca8</span><br>",c+='<div class="skill">',d=1;d<=b;++d){1<d&&(c+="<br>");c+="<span>"+d+"\uc2a4\ud0ac </span>";c+='<select class="current-skill-level" data-index="'+(d-1)+'">';for(n=1;10>=n;++n)c+='<option value="'+n+'"',n===u[d-1]&&(c+="selected"),c+=">"+n+"</option>";c+="</select>";c+="<span> \u25b8 </span>";c+='<select class="target-skill-level" data-index="'+(d-1)+'">';for(n=1;10>=n;++n)c+='<option value="'+n+'"',
n===l[d-1]&&(c+="selected"),c+=">"+n+"</option>";c+="</select>"}c+="</div></div>";return f?(f=document.createElement("div"),f.classList.add("op"),f.setAttribute("name","op_"+a),f.innerHTML=c,f):'<div class="op" name="op_'+a+'">'+c+"</div>"},convertOldIDToNewID=function(){gtag("event","ID \uccb4\uacc4 \uc804\ud658(\ubc84\uc804 1\uc5d0\uc11c 2\ub85c)",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});var a={0:"LN02",1:"RL03",2:"LT77",3:"RE41",4:"LM04",5:"AZ01",
6:"JC01",7:"AA01",8:"FO03",9:"FO01",10:"PL03",11:"SS02",12:"LM20",13:"SR02",14:"RL06",15:"LM05",16:"NM01",17:"RL02",18:"GG01",19:"R001",20:"VC03",21:"SK01",22:"RR01",23:"SR27",24:"R137",25:"BS01",26:"GG03",27:"SR01",28:"RB01",29:"AA02",30:"LM08",31:"R132",32:"SS01",33:"RL04",34:"RL01",35:"R106",36:"AA03",37:"LT01",38:"ST01",39:"R110",40:"ST03",41:"KZ03",42:"SR03",43:"JC06",44:"YD01",45:"SG01",46:"SW01",47:"LM16",48:"LM12",49:"R130",50:"R128",51:"RL05",52:"JC05",53:"PL05",54:"USS2",55:"LM15",56:"PL04",
57:"LM19",58:"BS02",59:"FO02",60:"MN02",61:"VC05",62:"HT03",63:"PL02",64:"USS1",65:"SI01",66:"R119",67:"VC02",68:"US10",69:"R100",70:"IU04",71:"R123",72:"HK01",73:"VC04",74:"IU07",75:"R104",76:"MN03",77:"R107",78:"LT02",79:"BS03",80:"VC01",81:"ST02",82:"LM10",83:"R122",84:"KZ04",85:"RB02",86:"LM11",87:"AA04",88:"LN01",89:"IU05",90:"R124",91:"JC03",92:"USS3",93:"JC04",94:"R108",95:"SW02",96:"R105",97:"PA15",98:"PA42",99:"PA41",100:"PA62",101:"PA65",102:"PA43",103:"PA13",104:"PA44",105:"PA63",106:"PA12",
107:"PA61",108:"PA14",109:"PA45",110:"PA64",111:"PA11",112:"LT05",113:"BS04",114:"R303",115:"A44",116:"A43",117:"A41",118:"A42",119:"RCX3",120:"RCX2"},b=Object.keys(localStorage).filter(function(a){return 0<=a.indexOf("optotal_")}),c="",f="",e="";c="";for(var d=0,g=b.length;d<g;++d)e=b[d].split("_"),c=e[1],e[1]=a[c],e[1]?(e=e.join("_"),f=b[d],c=localStorage.getItem(f),localStorage.setItem(e,c),localStorage.removeItem(f)):console.error(c+": \uc624\ud37c\ub808\uc774\ud130 ID \uccb4\uacc4 \ucd5c\uc2e0\ud654 \uc2e4\ud328. \ub9e4\uce6d\ub418\ub294 ID\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc74c.");
localStorage.setItem("version_optotal_localStorage",JSON.stringify(db.idVersion.op))},sleep=function(a){return new Promise(function(b,c){setTimeout(b,a)})},loadLocalStorage=function(){console.log("loadLocalStorage");JSON.parse(localStorage.getItem("version_optotal_localStorage")||"1")<db.idVersion.op&&(console.log("\uc624\ud37c\ub808\uc774\ud130 ID \uccb4\uacc4 \ucd5c\uc2e0\ud654 \uc218\ud589"),convertOldIDToNewID());for(var a="current-elite target-elite current-op-level target-op-level current-skill-level target-skill-level".split(" "),
b={IDs:[]},c=0;c<db.op.keys.length;++c){var f=db.op.keys[c],e="optotal_"+f+"_";b[f]=[];for(var d=!1,g=0;g<a.length;++g)null!==localStorage.getItem(e+a[g])&&(b[f].push(a[g]),d=!0);d&&b.IDs.push(f)}if(0===b.IDs.length)document.getElementById("content-body").style.opacity=1,console.log("loadComplete");else{document.getElementById("selected-op-guide").style.display="none";b.IDs.sort(function(a,b){if(Number(db.op[a].rarity)>Number(db.op[b].rarity))return-1;if(Number(db.op[a].rarity)<Number(db.op[b].rarity))return 1;
a=a.split("-");b=b.split("-");if(a[0]<b[0])return-1;if(a[0]>b[0])return 1;1===a.length&&a.push(0);1===b.length&&b.push(0);return Number(a[1])<Number(b[1])?-1:1});Date.now();doNotRefreshResult=!0;a="";c=0;for(f=b.IDs.length;c<f;++c)a+='<div class="op" name="'+b.IDs[c]+'" style="color:#bbb;text-align:center;"><pre>\n\n\n\nLoading...</pre></div>';document.getElementById("selected-op").innerHTML=a;document.getElementById("content-body").style.opacity=1;setTimeout(function(){for(var a="",c=0,d=b.IDs.length;c<
d;++c){for(var e=b.IDs[c],f="optotal_"+e+"_",g={keys:[]},l=0,t=b[e].length;l<t;++l){var q=b[e][l],v=JSON.parse(localStorage.getItem(f+q));g[q]=v;g.keys.push(q)}a+=makeOpForm(e,{values:g,asElement:!1})}c=document.getElementById("selected-op");c.innerHTML=a;doNotCenter=!0;c.querySelectorAll(".op").forEach(function(a){addOpEventListener(a,!0)});doNotRefreshResult=!1;showResult();console.log("loadComplete")},0)}},removeAllOperators=function(a){gtag("event","\ubaa8\ub4e0 \uc624\ud37c\ub808\uc774\ud130 \uc0ad\uc81c: \ubc84\ud2bc \ud074\ub9ad",
{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});confirm("\uc8fc\uc758: \uc774 \uc791\uc5c5\uc740 \ub418\ub3cc\ub9b4 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.\n\uc815\ub9d0 \uc774 \uc11c\ube44\uc2a4\uc758 \ubaa8\ub4e0 \ub370\uc774\ud130\ub97c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")?(Object.keys(localStorage).filter(function(a){return 0<=a.indexOf("optotal_")}).forEach(function(a){return localStorage.removeItem(a)}),location.reload()):(gtag("event",
"\ubaa8\ub4e0 \uc624\ud37c\ub808\uc774\ud130 \uc0ad\uc81c: \ucde8\uc18c",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}),alert("\ub370\uc774\ud130 \uc0ad\uc81c\uac00 \ucde8\uc18c\ub418\uc5c8\uc2b5\ub2c8\ub2e4."))},triggerEvent=function(a,b,c){c=void 0===c?null:c;null!==c?a.dispatchEvent(new CustomEvent(b,{detail:c})):a.dispatchEvent(new CustomEvent(b))},getMaxElite=function(a){return[0,0,1,2,2,2][a-1]},getNumOfSkills=function(a,b){b=void 0===b?null:
b;var c=db.op[a].rarity;null===b&&(b=getMaxElite(c));if(null===db.op[a].skill){var f=a.split("-")[0];if(f===a||null===db.op[f].skill)return console.error("\ub2e4\uc74c \uc6d0\ubcf8 \uc624\ud37c\ub808\uc774\ud130\uc758 skill \uac12\uc774 null\uc784:",a),0;a=f}a=2<=getMaxElite(c)?db.op[a].skill.mastery.length:[0,0,1,2,2,3][c-1];f=[1,2,3][b];void 0===f&&(console.error("elite \uac12\uc5d0 \ubb38\uc81c \uc788\uc74c:",b),f=[1,2,3][getMaxElite(c)]);f>a&&(f=a);return f},getMaxSkillLevel=function(a){return[4,
7,10][a]},opFormRecalcHandler=function(a){var b=this.getAttribute("name").split("_")[1],c=b.split("-")[0],f=b===c,e={};if(!f){e.elite=null===db.op[b].elite;e.skill=null===db.op[b].skill;var d=document.querySelector('#selected-op [name="op_'+c+'"]')}var g=this.querySelectorAll(".current-elite")[0],n=this.querySelectorAll(".target-elite")[0],h=this.querySelectorAll(".current-op-level")[0],r=this.querySelectorAll(".target-op-level")[0],k=this.querySelectorAll(".current-skill-level"),u=this.querySelectorAll(".target-skill-level"),
m=[],l=[];if(e.elite){var t=Number(d.querySelector(".current-elite").value);var q=Number(d.querySelector(".target-elite").value);var v=Number(d.querySelector(".current-op-level").value);var x=Number(d.querySelector(".target-op-level").value);g.disabled=!0;n.disabled=!0;h.disabled=!0;r.disabled=!0;this.querySelectorAll(".set-current-op-level-to-max-btn, .set-target-op-level-to-max-btn").forEach(function(a){return a.disabled=!0});this.querySelectorAll(".elite, .opLevel").forEach(function(a){return a.style.opacity=
0})}else t=Number(g.value),q=Number(n.value),v=Number(h.value),x=Number(r.value);e.skill?(d.querySelectorAll("current-skill-level").forEach(function(a){m.push(Number(a.value));a.disabled=!0}),d.querySelectorAll("target-skill-level").forEach(function(a){l.push(Number(a.value));a.disabled=!0}),this.querySelector(".skill").style.opacity=0):(k.forEach(function(a){m.push(Number(a.value))}),u.forEach(function(a){l.push(Number(a.value))}));var A=[t,q,v,x].concat($jscomp.arrayFromIterable(m),$jscomp.arrayFromIterable(l)),
y=this.dataset.inputValue;y=y?y.split(",").map(Number):[];var p=!1;d=0;for(var z=A.length;d<z;++d)if(A[d]!==y[d]){p=!0;break}if(p){z=null;z=f||void 0===e||!1===e.rarity?Number(db.op[b].rarity):Number(db.op[c].rarity);c=getNumOfSkills(b);p=null;p=a.detail&&a.detail.from?a.detail.from:{type:"all"};if("all"===p.type)A=a=y=!0;else{if("elite"===p.type)A=a=y=!0;else if("level"===p.type)y=!1,a=!0,A=!1;else if("skill"===p.type){if(a=y=!1,A=!0,!Number.isInteger(p.index)||0>p.index||3<=p.index){console.error("\uc778\ub371\uc2a4 \uc624\ub958:",
p.index);return}}else{console.error("\ud0c0\uc785 \uc624\ub958:",p.type);return}if("current"!==p.position&&"target"!==p.position){console.error("\ud3ec\uc9c0\uc158 \uc624\ub958:",p.position);return}}e.skill&&(A=!1);if(y){var B=getMaxElite(z);t>B&&(t=B);q>B&&(q=B);q<t&&(q=t)}if(A){var C=getNumOfSkills(b,t),D=getNumOfSkills(b,q),E=getMaxSkillLevel(t);for(d=0;d<c;++d)m[d]>E&&(m[d]=E);if("skill"===p.type&&"current"===p.position){var w=m[p.index];if(7>w)for(d=0;d<c;++d)m[d]=w;else for(d=0;d<c;++d)7>m[d]&&
(m[d]=7)}else{w=-Infinity;for(d=0;d<C;++d)if(m[d]>w&&(w=m[d],7<=w)){w=7;break}for(d=0;d<c;++d)m[d]<w&&(m[d]=w)}w=getMaxSkillLevel(q);for(d=0;d<c;++d)l[d]<m[d]?l[d]=m[d]:l[d]>w&&(l[d]=w);if("skill"===p.type&&"target"===p.position)if(e=l[p.index],7>e)for(d=0;d<c;++d)l[d]=e;else for(d=0;d<c;++d)7>l[d]&&(l[d]=7);else{e=-Infinity;for(d=0;d<D;++d)if(l[d]>e&&(e=l[d],7<=e)){e=7;break}for(d=0;d<c;++d)l[d]<e&&(l[d]=e)}}a&&(d=getMaxLevel(t,z),v>d&&(v=d),1>v&&(v=1),d=getMaxLevel(q,z),x>d&&(x=d),t===q&&x<v?x=
v:1>x&&(x=1));if(y){e=g.options;d=0;for(z=B;d<z;++d)e[d].disabled=d>B?!0:!1;g.value=t;e=n.options;d=0;for(z=e.length;d<z;++d)e[d].disabled=d<t||d>B?!0:!1;n.value=q}if(A){for(d=0;d<C;++d){k[d].disabled=!1;e=k[d].options;g=0;for(n=e.length;g<n;++g)e[g].disabled=g>=E?!0:!1;k[d].value=m[d]}for(d=C;d<c;++d)k[d].disabled=!0,k[d].value=m[d];for(d=0;d<D;++d){u[d].disabled=!1;e=u[d].options;g=0;n=e.length;for(k=m[d]-1;g<n;++g)e[g].disabled=g<k||g>=w?!0:!1;u[d].value=l[d]}for(d=D;d<c;++d)u[d].disabled=!0,u[d].value=
l[d]}a&&(h.value=v,r.value=x);this.dataset.inputValue=[t,q,v,x].concat($jscomp.arrayFromIterable(m),$jscomp.arrayFromIterable(l)).join(",");h="optotal_"+b+"_";localStorage.setItem(h+"current-elite",JSON.stringify(t));localStorage.setItem(h+"current-op-level",JSON.stringify(v));localStorage.setItem(h+"current-skill-level",JSON.stringify(m));localStorage.setItem(h+"target-elite",JSON.stringify(q));localStorage.setItem(h+"target-op-level",JSON.stringify(x));localStorage.setItem(h+"target-skill-level",
JSON.stringify(l));if(f)for(b=document.querySelectorAll('#selected-op [name^="op_'+b+'-"]'),d=0;d<b.length;++d)triggerEvent(b[d],"recalc");showResult()}else console.log("return")},removeOpMousedownHandler=function(){var a=this.closest(".op").getAttribute("name").split("_")[1].split("-")[0];document.querySelectorAll('#selected-op [name^="op_'+a+'"]').forEach(function(a){return a.style.opacity=.4})},removeOpMouseoverHandler=function(){var a=this.closest(".op").getAttribute("name").split("_")[1].split("-")[0];
document.querySelectorAll('#selected-op [name^="op_'+a+'"]').forEach(function(a){return a.style.opacity=.7})},removeOpMouseoutHandler=function(){var a=this.closest(".op").getAttribute("name").split("_")[1].split("-")[0];document.querySelectorAll('#selected-op [name^="op_'+a+'"]').forEach(function(a){return a.style.opacity=1})},removeOpClickHandler=function(){gtag("event","\uc624\ud37c\ub808\uc774\ud130 \uc0ad\uc81c: \ubc84\ud2bc \ud074\ub9ad",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});
this.closest(".op");var a=this.closest(".op").getAttribute("name").split("_")[1];a=getAllIDs(a);for(var b=0;b<a.length;++b){document.querySelector('#selected-op [name="op_'+a[b]+'"]').remove();for(var c="optotal_"+a[b]+"_",f="current-elite target-elite current-op-level target-op-level current-skill-level target-skill-level".split(" "),e=0;e<f.length;++e)localStorage.removeItem(c+f[e])}null===document.querySelector('div[name*="op_"].op')&&(document.getElementById("selected-op-guide").style.display=
"block");showResult()},setCurrentOpLevelToMaxHandler=function(){gtag("event","\ud604\uc7ac \ub808\ubca8 \ucd5c\ub300 \uc124\uc815",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});if(!this.disabled){var a=this.closest(".op"),b=a.getAttribute("name").split("_")[1],c=a.querySelector(".current-op-level");if(b in db.op){var f=Number(a.querySelector(".current-elite").value);b=getMaxLevel(f,Number(db.op[b].rarity));c.value=b;triggerEvent(a,"recalc",{from:{type:"level",
position:"current"}})}else console.error("\uc5d0\ub7ec: \ucde8\ub4dd\ud55c \uc624\ud37c\ub808\uc774\ud130 \uc544\uc774\ub514("+b+")\ub97c DB\uc5d0\uc11c \ucc3e\uc744 \uc218 \uc5c6\uc74c")}},setTargetOpLevelToMaxHandler=function(){gtag("event","\ubaa9\ud45c \ub808\ubca8 \ucd5c\ub300 \uc124\uc815",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"});if(!this.disabled){var a=this.closest(".op"),b=a.getAttribute("name").split("_")[1],c=a.querySelector(".target-op-level");
if(b in db.op){var f=Number(a.querySelector(".target-elite").value);b=getMaxLevel(f,Number(db.op[b].rarity));c.value=b;triggerEvent(a,"recalc",{from:{type:"level",position:"target"}})}else console.error("\uc5d0\ub7ec: \ucde8\ub4dd\ud55c \uc624\ud37c\ub808\uc774\ud130 \uc544\uc774\ub514("+b+")\ub97c DB\uc5d0\uc11c \ucc3e\uc744 \uc218 \uc5c6\uc74c")}},currentEliteChangeHandler=function(){this.disabled||triggerEvent(this.closest(".op"),"recalc",{from:{type:"elite",position:"current"}})},targetEliteChangeHandler=
function(){this.disabled||triggerEvent(this.closest(".op"),"recalc",{from:{type:"elite",position:"target"}})},currentOpLevelChangeHandler=function(){this.disabled||triggerEvent(this.closest(".op"),"recalc",{from:{type:"level",position:"current"}})},targetOpLevelChangeHandler=function(){this.disabled||triggerEvent(this.closest(".op"),"recalc",{from:{type:"level",position:"target"}})},currentSkillLevelChangeHandler=function(a){this.disabled||triggerEvent(this.closest(".op"),"recalc",{from:{type:"skill",
position:"current",index:Number(a.target.dataset.index)}})},targetSkillLevelChangeHandler=function(){this.disabled||triggerEvent(this.closest(".op"),"recalc",{from:{type:"skill",position:"target",index:Number(event.target.dataset.index)}})},addOpEventListener=function(a,b){b=void 0===b?!1:b;a.addEventListener("recalc",opFormRecalcHandler);a.querySelector(".remove-op").addEventListener("mousedown",removeOpMousedownHandler);a.querySelector(".remove-op").addEventListener("mouseover",removeOpMouseoverHandler);
a.querySelector(".remove-op").addEventListener("mouseout",removeOpMouseoutHandler);a.querySelector(".remove-op").addEventListener("click",removeOpClickHandler);a.querySelector(".set-current-op-level-to-max-btn").addEventListener("click",setCurrentOpLevelToMaxHandler);a.querySelector(".set-target-op-level-to-max-btn").addEventListener("click",setTargetOpLevelToMaxHandler);a.querySelector(".current-elite").addEventListener("change",currentEliteChangeHandler);a.querySelector(".target-elite").addEventListener("change",
targetEliteChangeHandler);a.querySelector(".current-op-level").addEventListener("change",currentOpLevelChangeHandler);a.querySelector(".target-op-level").addEventListener("change",targetOpLevelChangeHandler);a.querySelectorAll(".current-skill-level").forEach(function(a){a.addEventListener("change",currentSkillLevelChangeHandler)});a.querySelectorAll(".target-skill-level").forEach(function(a){a.addEventListener("change",targetSkillLevelChangeHandler)});b&&triggerEvent(a,"recalc",{from:{type:"all"}})},
searchingCondition={name:"",rarityArray:[],tagCode:0},getTagCodeByKRTagName=function(a){for(var b=0;b<db.tag.keys.length;++b)if(db.tag[db.tag.keys[b]].name.kr==a)return Number(db.tag[db.tag.keys[b]].tagCode)},showSearchResult=function(){searchingCondition.rarityArray.sort(function(a,b){return a>b?-1:1});for(var a=searchOp(searchingCondition.name,searchingCondition.rarityArray,searchingCondition.tagCode),b=[],c=0,f=a.keys.length,e="";c<f;++c)e=a.keys[c],b.push([a[e].name.kr,e]);b.sort(function(a,b){return a[0].localeCompare(b[0])});
a="";for(c=0;c<b.length;++c)a+='<div class="search-result-op" name="op_'+b[c][1]+'"><img src="./images/op/thumb/'+db.op[b[c][1]].releaseOrder+'.png"><div><span>'+b[c][0]+"</span></div></div>";""==a&&(a='<p style="font-size: 0.5em; text-align: center">\uac80\uc0c9 \uacb0\uacfc\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.</p>');document.querySelector(".modal-footer>.search-result").innerHTML=a;document.querySelectorAll(".search-result-op").forEach(function(a){a.addEventListener("click",
function(){for(var a=this.getAttribute("name").split("_")[1],b=a.split("-")[0],c=getAllIDs(a),d=0;d<c.length;++d)if(console.log(c[d],"\ucd94\uac00"),"optotal_"+c[d]+"_current-elite"in localStorage)console.error(a+": \uc774\ubbf8 \ucd94\uac00\ub41c \uc624\ud37c\ub808\uc774\ud130");else{var e=makeOpForm(c[d],{values:{},asElement:!0});addOpEventListener(e,!0);document.getElementById("selected-op-guide").style.display="none";document.getElementById("selected-op").appendChild(e);gtag("event","\uc624\ud37c\ub808\uc774\ud130 \ucd94\uac00",
{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"})}a=document.querySelectorAll('.search-result-op[name^="op_'+b+'"]');for(d=0;d<a.length;++d)a[d].remove();0===document.querySelectorAll(".modal-footer>.search-result>.search-result-op").length&&(document.querySelector(".modal-footer>.search-result").innerHTML='<p style="font-size: 0.5em; text-align: center">\uac80\uc0c9 \uacb0\uacfc\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.</p>')})});document.querySelectorAll(".search-result-op div").forEach(function(a){$(a).textfill()})};
(function(a){a.fn.textfill=function(b){b=parseInt(b,10);return this.each(function(){function c(){var a=f.parent(),c=a.height(),g=a.width();a=parseInt(f.css("font-size"),10);g/=f.width();var n=a*(g-.1);g=c/f.height();b=a*(g-.1);f.css("fontSize",0<b&&n>b?b:n)}var f=a("span",this);a(window).resize(function(){"block"===document.querySelector(".modal").style.display&&c()});c()})}})(jQuery);
var searchOp=function(a,b,c){a=a.replace(/(\s*)/g,"").toLowerCase();var f=0<a.length,e=0<b.length,d=0!=c;if(!(f||e||d))return{keys:[]};for(var g={},n=Object.keys(localStorage).filter(function(a){return 0===a.indexOf("optotal_")}),h=0,r=db.op.keys.length,k="",u="";h<r;++h){k=db.op.keys[h];u="optotal_"+k;for(var m=0,l=n.length;m<l&&0!==n[m].indexOf(u);++m);m<l||(g[k]={},g[k].rarity=db.op[k].rarity,g[k].tagCode=db.op[k].tagCode,g[k].name={},g[k].name.kr=db.op[k].name.kr,g[k].name.en=db.op[k].name.en,
g[k].name.jp=db.op[k].name.jp,g[k].name.cn=db.op[k].name.cn)}g.keys=Object.keys(g);if(f)for(h=0,r=g.keys.length,k="";h<r;++h)k=g.keys[h],0>g[k].name.kr.replace(/(\s*)/g,"").toLowerCase().indexOf(a)&&0>g[k].name.en.replace(/(\s*)/g,"").toLowerCase().indexOf(a)&&0>g[k].name.jp.replace(/(\s*)/g,"").toLowerCase().indexOf(a)&&0>g[k].name.cn.replace(/(\s*)/g,"").toLowerCase().indexOf(a)&&(delete g[k],g.keys.splice(h,1),--h,--r);if(e)for(a=!1,h=0,f=g.keys.length,k="";h<f;++h){k=g.keys[h];a=!1;m=0;for(l=
b.length;m<l;++m)if(rarity=b[m],g[k].rarity==rarity){a=!0;break}a||(delete g[k],g.keys.splice(h,1),--h,--f)}if(d)for(h=0,r=g.keys.length,k="";h<r;++h)k=g.keys[h],c&g[k].tagCode||(delete g[k],g.keys.splice(h,1),--h,--r);return g},addResultToMcalc=function(a){var b=fetchInputData();if(!1===b)showTooltip("\uc804\uc1a1\ud560 \ub370\uc774\ud130\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4",a.target,"error");else if(gtag("event","\uc7ac\ub8cc \uacc4\uc0b0\uae30\ub85c \uc804\uc1a1 \uc2dc\uc791",
{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}),confirm("\uacb0\uacfc \ub370\uc774\ud130\ub97c \uc804\uc1a1\ud558\uc2dc\ub824\uba74 \ud655\uc778 \ubc84\ud2bc\uc744 \ub20c\ub7ec\uc8fc\uc2ed\uc2dc\uc624.")){b=sortResultData(calc(b));for(var c=0;c<b.total.IDs.length;++c){var f=Number(b.total.IDs[c]),e=Number(b.total[f]);e+=JSON.parse(localStorage.getItem("mcalc_item-need_"+f));localStorage.setItem("mcalc_item-need_"+f,JSON.stringify(e))}showTooltip("\uc131\uacf5\uc801\uc73c\ub85c \uacb0\uacfc \ub370\uc774\ud130\ub97c \uc804\uc1a1\ud558\uc600\uc2b5\ub2c8\ub2e4",
a.target,"success");confirm("\uc131\uacf5\uc801\uc73c\ub85c \uacb0\uacfc \ub370\uc774\ud130\ub97c \uc804\uc1a1\ud558\uc600\uc2b5\ub2c8\ub2e4.\n\ubc14\ub85c \uc7ac\ub8cc \uacc4\uc0b0\uae30\ub85c \uc774\ub3d9\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")&&(location.href="mcalc.html")}else gtag("event","\uc7ac\ub8cc \uacc4\uc0b0\uae30\ub85c \uc804\uc1a1 \ucde8\uc18c",{event_category:"\uc624\ud37c\ub808\uc774\ud130 \uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30"}),showTooltip("\ub370\uc774\ud130 \uc804\uc1a1\uc774 \ucde8\uc18c\ub418\uc5c8\uc2b5\ub2c8\ub2e4",
a.target,"error")};main();
