var showDetailedResult=function(){$("#result-container #detailed-result").css("display","block");$("#result-container .show-detailed-result").css("display","none");$("#result-container .hide-detailed-result").css("display","inline-block")},hideDetailedResult=function(){$("#result-container #detailed-result").css("display","none");$("#result-container .show-detailed-result").css("display","inline-block");$("#result-container .hide-detailed-result").css("display","none")},toImg=function(b,a,d){d=void 0===
d?!1:d;var c=getItemIDByKRName(b),f=' class="result-item-container',g="";0<=c&&(0<itemData[c].craft.length&&(f+=" clickable"),g+=' name="item_'+c+'"');c="<div"+(f+'"')+g+'><img src="./images/item/t/'+(b+'.png" alt="'+b+'"><div class="result-item-quantity');d&&(c+=" small");c+='">';c+=String(a);c+="</div>";c+='<span class="result-item-name">';c+=b;c+="</span>";return c+="</div> "},itemOrder=[["\ucee8\ub514\uc158","\ub4dc\ub860"],["\uacbd\ud5d8\uce58","\uc6a9\ubb38\ud3d0"],["\uace0\uae09\uc99d\uba85\uc11c",
"\uad6c\ub9e4\uc99d\uba85\uc11c","\uc790\uaca9\uc99d\uba85\uc11c"],["\uc6a9\uace8","\uac00\uad6c \ubd80\ud488"],"\uace0\uae09\uac74\uc124\uc790\uc7ac;\uc911\uae09\uac74\uc124\uc790\uc7ac;\ucd08\uae09\uac74\uc124\uc790\uc7ac;\uce74\ubcf8 \ud329;\uce74\ubcf8 \ubc88\ub4e4;\uce74\ubcf8".split(";"),["\uace0\uae09\uc791\uc804\uae30\ub85d","\uc911\uae09\uc791\uc804\uae30\ub85d","\ucd08\uae09\uc791\uc804\uae30\ub85d","\uae30\ucd08\uc791\uc804\uae30\ub85d"],["\uc2a4\ud0ac\uac1c\ub860 \uc81c3\uad8c","\uc2a4\ud0ac\uac1c\ub860 \uc81c2\uad8c",
"\uc2a4\ud0ac\uac1c\ub860 \uc81c1\uad8c"],"\uce69 \ucca8\uac00\uc81c;\ubc45\uac00\ub4dc \ub4c0\uc5bc \uce69;\ubc45\uac00\ub4dc \uce69\uc14b;\ubc45\uac00\ub4dc \uce69;\uac00\ub4dc \ub4c0\uc5bc \uce69;\uac00\ub4dc \uce69\uc14b;\uac00\ub4dc \uce69;\ub514\ud39c\ub354 \ub4c0\uc5bc \uce69;\ub514\ud39c\ub354 \uce69\uc14b;\ub514\ud39c\ub354 \uce69;\uc2a4\ub098\uc774\ud37c \ub4c0\uc5bc \uce69;\uc2a4\ub098\uc774\ud37c \uce69\uc14b;\uc2a4\ub098\uc774\ud37c \uce69;\uce90\uc2a4\ud130 \ub4c0\uc5bc \uce69;\uce90\uc2a4\ud130 \uce69\uc14b;\uce90\uc2a4\ud130 \uce69;\uba54\ub515 \ub4c0\uc5bc \uce69;\uba54\ub515 \uce69\uc14b;\uba54\ub515 \uce69;\uc11c\ud3ec\ud130 \ub4c0\uc5bc \uce69;\uc11c\ud3ec\ud130 \uce69\uc14b;\uc11c\ud3ec\ud130 \uce69;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \ub4c0\uc5bc \uce69;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \uce69\uc14b;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \uce69".split(";"),
["D32\uac15","\ubc14\uc774\ud3f4\ub77c \ub098\ub178\ud50c\ub808\uc774\ud06c \uce69","\uc911\ud569\uc81c"],"RMA70-24;RMA70-12;\ub9dd\uac04 \uc911\ud569\uccb4;\ub9dd\uac04 \uad11\uc11d;\ud654\uc774\ud2b8 \ud638\uc2a4 \ucf5c;\ub85c\uc2dd \ucf5c;\uace0\uae09 \uc5f0\ub9c8\uc11d;\uc5f0\ub9c8\uc11d;\uc911\ud569\uc824;\uc824\ub77c\ud2f4;\uc5f4\ud569\uae08 \ub369\uc5b4\ub9ac;\uc5f4\ud569\uae08".split(";"),"\ud3ec\ub3c4\ub2f9 \ud329;\ud3ec\ub3c4\ub2f9 \ubc88\ub4e4;\ud3ec\ub3c4\ub2f9;\ub300\uccb4\ub2f9;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974 \ud329;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974 \ubc88\ub4e4;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974;\uc5d0\uc2a4\ud14c\ub974 \uc6d0\ub8cc;\uac1c\ub7c9 \uc7a5\uce58;\ub9ac\ub274\uc5bc \uc7a5\uce58;\uc7a5\uce58;\ud30c\uc190\ub41c \uc7a5\uce58;\uc815\uc81c \uc6d0\uc554;\uc6d0\uc554 \ud050\ube0c \ubc88\ub4e4;\uc6d0\uc554 \ud050\ube0c;\uc6d0\uc554;\uc544\ucf00\ud1a4 \ud329;\uc544\ucf00\ud1a4 \uc751\uc9d1\uccb4 \ubc88\ub4e4;\uc544\ucf00\ud1a4 \uc751\uc9d1\uccb4;\ub514\ucf00\ud1a4;\uc774\ucca0 \ud329;\uc774\ucca0 \ubc88\ub4e4;\uc774\ucca0;\uc774\ucca0 \uc870\uac01".split(";")],
getGroupIdx=function(b){for(var a=itemData[b].name.kr,d=0;d<itemOrder.length;++d)if(0<=itemOrder[d].indexOf(a))return d;console.log("\uc5d0\ub7ec: \uadf8\ub8f9 \uc778\ub371\uc2a4\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc74c: ",a,b);return-1},makeResultHtml=function(b){for(var a="",d=0;d<b.IDs.length;++d){var c=b.IDs[d];a+=toImg(itemData[c].name.kr,b[c])}return a},makeResultHtmlByGroup=function(b){for(var a=' <div class="result-group">',d=-1,c=0;c<b.IDs.length;++c){var f=b.IDs[c],g=getGroupIdx(f);-1==g&&
console.log("\uc5d0\ub7ec: \uadf8\ub8f9 \uc778\ub371\uc2a4\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc74c: ",itemData[f].name.kr,f);0<c&&d!=g&&(a+='</div> <br><br> <div class="result-group">');a+=toImg(itemData[f].name.kr,b[f]);d=g}return a+"</div> "},getItemIDByKRName=function(b){for(var a=Object.keys(itemData).length,d=0;d<a;++d)if(itemData[d].name.kr===b)return d;console.log(b+"\uc740(\ub294) \uc874\uc7ac\ud558\ub294 \uc544\uc774\ud15c\uc758 \uc774\ub984\uc774 \uc544\ub2d9\ub2c8\ub2e4.");return-1},tt=
function(b){var a='<hr class="main-line"><span class="result-maintitle">\ud569\uacc4</span><br><hr class="sub-line"><span class="result-subtitle">\uacbd\ud5d8\uce58, \uc6a9\ubb38\ud3d0</span><hr> <div style="margin-top: 2px; display: inline-block; border: none; width: 100%; text-align: center">'+toImg("\uacbd\ud5d8\uce58",b.total.exp,!0);a+=toImg("\uc6a9\ubb38\ud3d0",b.total.lmd,!0);var d=levelingData.stage.exp["LS-5"].sanity,c=Math.ceil(b.total.exp/levelingData.stage.exp["LS-5"].reward.expectation),
f=levelingData.stage.lmd["CE-5"].sanity,g=Math.ceil(b.total.lmd/levelingData.stage.lmd["CE-5"].reward.expectation);a=a+'</div><br><div style="margin-top: 8px; margin-bottom: 8px; width: 100%; font-size: 10px; text-align: center">\u25bc</div> <div class="result-exp-lmd-container"><div class="result-exp-lmd"><span style="color: #777; font-size: 15px">\uacbd\ud5d8\uce58</span> LS-5 \u25b8 <span class="stage-guide-item">'+(c+'\ud68c \ud074\ub9ac\uc5b4</span></span><br><span style="color: #777; font-size: 15px">\uc6a9\ubb38\ud3d0</span> CE-5 \u25b8 ');
a+='<span class="stage-guide-item">'+g+"\ud68c \ud074\ub9ac\uc5b4</span>";a+="</span><br>";a+='<span style="color: #777; font-size: 15px">\uacbd\ud5d8\uce58+\uc6a9\ubb38\ud3d0</span> \u25b8 ';a+='<span class="stage-guide-item">'+(c*d+g*f)+"\uc774\uc131 \uc18c\ubaa8</span></span><br></div>";a+="</div> ";a+="<br><br>";a+='<hr class="sub-line">';a+='<span class="result-subtitle">\uc815\uc608\ud654 \ubc0f \uc2a4\ud0ac\uac15\ud654 \uc7ac\ub8cc</span>';a+="<hr>";a+=makeResultHtmlByGroup(b.total);a+="<hr>";
a+='<button type="button" class="show-detailed-result" onclick="showDetailedResult()">\uc138\ubd80 \uacb0\uacfc \ubcf4\uc774\uae30</button>';a+='<button type="button" class="hide-detailed-result" onclick="hideDetailedResult()" style="display: none">\uc138\ubd80 \uacb0\uacfc \uc228\uae30\uae30</button>';a+='<div id="detailed-result" style="display:none">';a+='<hr class="sub-line">';a+='<span class="result-subtitle">\uc624\ud37c\ub808\uc774\ud130 \ub808\ubca8\ub9c1 \ube44\uc6a9<br>(\uc815\uc608\ud654 \ube44\uc6a9 \uc81c\uc678)</span>';
a+="<hr>";a+=' <div class="result-group">';a+=toImg("\uacbd\ud5d8\uce58",b.total.exp,!0);a+=toImg("\uc6a9\ubb38\ud3d0",b.opLeveling.lmd,!0);a+="</div> ";a+="<hr>";a+='<hr class="sub-line">';a+='<span class="result-subtitle">\uc815\uc608\ud654 \uc7ac\ub8cc</span>';a+="<hr>";a+=makeResultHtmlByGroup(b.elitePromotion);a+="<hr>";a+='<hr class="sub-line">';a+='<span class="result-subtitle">\uc2a4\ud0ac\uac15\ud654 \uc7ac\ub8cc</span>';a+="<hr>";a+=makeResultHtmlByGroup(b.skillLeveling);a+="<hr>";a+="</div>";
a+='<button type="button" class="hide-detailed-result" onclick="hideDetailedResult()" style="display: none">\uc138\ubd80 \uacb0\uacfc \uc228\uae30\uae30</button>';return a+='<hr style="border-top-color: #777; border-top-width: 3px;">'},doNotRefreshResult=!1,showResult=function(){if(!0!==doNotRefreshResult){var b=fetchInputData();if(!1===b)return $("#result-container").html('<div id="result-guide"><hr class="main-line"><span class="result-maintitle" style="display: inline-block; width: 100%; text-align: left">\ud569\uacc4</span><br><br>\uc5ec\uae30\uc5d0 \uacb0\uacfc\uac00 \ud45c\uc2dc\ub429\ub2c8\ub2e4.</div>'),
!1;b=calc(b);sortResultData(b);$("#result-container").html(tt(b))}},fetchInputData=function(){var b={opIDs:[]},a=$('form[name*="op_"].op');if(0===a.length)return!1;for(var d=0;d<a.length;++d){var c=$(a[d]),f={},g={},k={};f.current=Number(c.find(".current-elite:enabled").val());f.target=Number(c.find(".target-elite:enabled").val());g.current=Number(c.find(".current-op-level:enabled").val());g.target=Number(c.find(".target-op-level:enabled").val());var l=c.find(".target-skill-level:enabled").length;
if(0<l){for(var e=[],h=0;h<l;++h)e[h]={},e[h].current=Number($(c.find(".current-skill-level")[h]).val()),e[h].target=Number($(c.find(".target-skill-level")[h]).val());k.common={};k.common.current=7<e[0].current?7:e[0].current;k.common.target=7<e[0].target?7:e[0].target;k.mastery={};for(h=0;h<l;++h)k.mastery[h]={};for(h=0;h<l;++h){var m=e[h].current-7;k.mastery[h].current=0<m?m:0;m=e[h].target-7;k.mastery[h].target=0<m?m:0}e=!0;k.common.current!=k.common.target&&(e=!1);for(h=0;h<l;++h)if(k.mastery[h].current!=
k.mastery[h].target){e=!1;break}e&&(k=!1)}else k=!1;c=Number(c.attr("name").split("_")[1]);b.opIDs.push(c);b[c]={};b[c].elite=f;b[c].opLevel=g;b[c].skillLevel=k}return b},sortResultData=function(b){var a=function(a,b){var c,d,k;var l=itemData[a].name.kr;var e=itemData[b].name.kr;var h=c=k=d=-1;for(var m=0;m<itemOrder.length;++m){var n=itemOrder[m].indexOf(l);if(0<=n){d=m;k=n;break}}for(m=0;m<itemOrder.length;++m)if(n=itemOrder[m].indexOf(e),0<=n){c=m;h=n;break}-1!=d&&-1!=k||console.log(l,"\uc6b0\uc120\ub3c4 \uc624\ub958:",
d,k);-1!=c&&-1!=h||console.log(e,"\uc6b0\uc120\ub3c4 \uc624\ub958:",c,h);return d<c?-1:c<d?1:k<h?-1:1};b.skillLeveling.IDs.sort(a);b.elitePromotion.IDs.sort(a);b.total.IDs.sort(a);return b},getMaxLevel=function(b,a){return Number(levelingData.maxLevel["elite_"+b][a-1])},levelingCalc=function(b){for(var a=levelingData.leveling.expTable,d=levelingData.leveling.lmdTable,c,f,g=f=c=0;g<b.target.elite;++g)c+=a["elite_"+String(g)][getMaxLevel(g,b.rarity)-1];c+=a["elite_"+String(b.target.elite)][b.target.level-
1];c+=b.target.exp;for(g=0;g<b.target.elite;++g)f+=d["elite_"+String(g)][getMaxLevel(g,b.rarity)-1];f+=d["elite_"+String(b.target.elite)][b.target.level-1];if(b.target.level<getMaxLevel(b.target.elite,b.rarity)){g=d["elite_"+String(b.target.elite)][b.target.level];g-=d["elite_"+String(b.target.elite)][b.target.level-1];var k=a["elite_"+String(b.target.elite)][b.target.level];k-=a["elite_"+String(b.target.elite)][b.target.level-1];f+=Math.ceil(g/k*b.target.exp)}var l,e;for(g=e=l=0;g<b.current.elite;++g)l+=
a["elite_"+String(g)][getMaxLevel(g,b.rarity)-1];l+=a["elite_"+String(b.current.elite)][b.current.level-1];l+=b.current.exp;for(g=0;g<b.current.elite;++g)e+=d["elite_"+String(g)][getMaxLevel(g,b.rarity)-1];e+=d["elite_"+String(b.current.elite)][b.current.level-1];b.current.level<getMaxLevel(b.current.elite,b.rarity)&&(g=d["elite_"+String(b.current.elite)][b.current.level],g-=d["elite_"+String(b.current.elite)][b.current.level-1],k=a["elite_"+String(b.current.elite)][b.current.level],k-=a["elite_"+
String(b.current.elite)][b.current.level-1],e+=Math.ceil(g/k*b.current.exp));b={};b.exp=c-l;b.lmd=f-e;b.exp=0>b.exp?0:b.exp;b.lmd=0>b.lmd?0:b.lmd;return b},calc=function(b){var a={opLeveling:{},skillLeveling:{},elitePromotion:{},total:{}};a.opLeveling.exp=0;for(var d=a.opLeveling.lmd=0;d<b.opIDs.length;++d){var c=b.opIDs[d],f={};f.rarity=data.opData[c].rarity;f.current={};f.current.elite=b[c].elite.current;f.current.level=b[c].opLevel.current;f.current.exp=0;f.target={};f.target.elite=b[c].elite.target;
f.target.level=b[c].opLevel.target;f.target.exp=0;c=levelingCalc(f);a.opLeveling.exp+=c.exp;a.opLeveling.lmd+=c.lmd}a.elitePromotion.IDs=[];for(d=0;d<b.opIDs.length;++d){c=b.opIDs[d];f=b[c].elite.current;var g=b[c].elite.target;if(f!=g)for(;f<g;++f){var k=opMaterialData[c].elite[f];for(var l=0;l<k.length;++l){var e=k[l][0],h=Number(k[l][1]);a.elitePromotion.hasOwnProperty(e)?a.elitePromotion[e]+=h:(a.elitePromotion[e]=h,a.elitePromotion.IDs.push(e))}}}a.skillLeveling.IDs=[];for(d=0;d<b.opIDs.length;++d)if(c=
b.opIDs[d],!1!==b[c].skillLevel){g=Number(b[c].skillLevel.common.target);for(f=Number(b[c].skillLevel.common.current)-1;f<g-1;++f)for(k=opMaterialData[c].skill.common[f],l=0;l<k.length;++l)e=k[l][0],h=Number(k[l][1]),a.skillLeveling.hasOwnProperty(e)?a.skillLeveling[e]+=h:(a.skillLeveling[e]=h,a.skillLeveling.IDs.push(e));g=Object.keys(b[c].skillLevel.mastery).length;for(f=0;f<g;++f)for(k=Number(b[c].skillLevel.mastery[f].target),l=Number(b[c].skillLevel.mastery[f].current);l<k;++l){var m=opMaterialData[c].skill.mastery[f][l];
for(var n=0;n<m.length;++n)e=m[n][0],h=Number(m[n][1]),a.skillLeveling.hasOwnProperty(e)?a.skillLeveling[e]+=h:(a.skillLeveling[e]=h,a.skillLeveling.IDs.push(e))}}a.total.exp=0;a.total.lmd=0;a.total.IDs=[];a.total.exp+=a.opLeveling.exp;a.total.lmd+=a.opLeveling.lmd;for(d=0;d<a.elitePromotion.IDs.length;++d)e=a.elitePromotion.IDs[d],"\uc6a9\ubb38\ud3d0"==itemData[e].name.kr?a.total.lmd+=a.elitePromotion[e]:a.total.hasOwnProperty(e)?a.total[e]+=a.elitePromotion[e]:(a.total[e]=a.elitePromotion[e],a.total.IDs.push(e));
for(d=0;d<a.skillLeveling.IDs.length;++d)e=a.skillLeveling.IDs[d],"\uc6a9\ubb38\ud3d0"==itemData[e].name.kr&&(a.total.lmd+=a.skillLeveling[e]),a.total.hasOwnProperty(e)?a.total[e]+=a.skillLeveling[e]:(a.total[e]=a.skillLeveling[e],a.total.IDs.push(e));return a};