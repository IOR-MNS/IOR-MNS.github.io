var showDetailedResult=function(){$("#result-container #detailed-result").css("display","block");$("#result-container .show-detailed-result").css("display","none");$("#result-container .hide-detailed-result").css("display","inline-block")},hideDetailedResult=function(){$("#result-container #detailed-result").css("display","none");$("#result-container .show-detailed-result").css("display","inline-block");$("#result-container .hide-detailed-result").css("display","none")},toImg=function(b,a,e){var d=
' <div class="result-item-container"><img src="./images/item/t/'+(b+'.png" alt="'+b+'"><div class="result-item-quantity');(void 0===e?0:e)&&(d+=" small");d=d+'">'+String(a);return d=d+'</div><span class="result-item-name">'+b+"</span></div> "},itemOrder=[["\ucee8\ub514\uc158","\ub4dc\ub860"],["\uacbd\ud5d8\uce58","\uc6a9\ubb38\ud3d0"],["\uace0\uae09\uc99d\uba85\uc11c","\uad6c\ub9e4\uc99d\uba85\uc11c","\uc790\uaca9\uc99d\uba85\uc11c"],["\uc6a9\uace8","\uac00\uad6c \ubd80\ud488"],"\uace0\uae09\uac74\uc124\uc790\uc7ac;\uc911\uae09\uac74\uc124\uc790\uc7ac;\ucd08\uae09\uac74\uc124\uc790\uc7ac;\uce74\ubcf8 \ud329;\uce74\ubcf8 \ubc88\ub4e4;\uce74\ubcf8".split(";"),
["\uace0\uae09\uc791\uc804\uae30\ub85d","\uc911\uae09\uc791\uc804\uae30\ub85d","\ucd08\uae09\uc791\uc804\uae30\ub85d","\uae30\ucd08\uc791\uc804\uae30\ub85d"],["\uc2a4\ud0ac\uac1c\ub860 \uc81c3\uad8c","\uc2a4\ud0ac\uac1c\ub860 \uc81c2\uad8c","\uc2a4\ud0ac\uac1c\ub860 \uc81c1\uad8c"],"\uce69 \ucca8\uac00\uc81c;\ubc45\uac00\ub4dc \ub4c0\uc5bc \uce69;\ubc45\uac00\ub4dc \uce69\uc14b;\ubc45\uac00\ub4dc \uce69;\uac00\ub4dc \ub4c0\uc5bc \uce69;\uac00\ub4dc \uce69\uc14b;\uac00\ub4dc \uce69;\ub514\ud39c\ub354 \ub4c0\uc5bc \uce69;\ub514\ud39c\ub354 \uce69\uc14b;\ub514\ud39c\ub354 \uce69;\uc2a4\ub098\uc774\ud37c \ub4c0\uc5bc \uce69;\uc2a4\ub098\uc774\ud37c \uce69\uc14b;\uc2a4\ub098\uc774\ud37c \uce69;\uce90\uc2a4\ud130 \ub4c0\uc5bc \uce69;\uce90\uc2a4\ud130 \uce69\uc14b;\uce90\uc2a4\ud130 \uce69;\uba54\ub515 \ub4c0\uc5bc \uce69;\uba54\ub515 \uce69\uc14b;\uba54\ub515 \uce69;\uc11c\ud3ec\ud130 \ub4c0\uc5bc \uce69;\uc11c\ud3ec\ud130 \uce69\uc14b;\uc11c\ud3ec\ud130 \uce69;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \ub4c0\uc5bc \uce69;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \uce69\uc14b;\uc2a4\ud398\uc15c\ub9ac\uc2a4\ud2b8 \uce69".split(";"),
["D32\uac15","\ubc14\uc774\ud3f4\ub77c \ub098\ub178\ud50c\ub808\uc774\ud06c \uce69","\uc911\ud569\uc81c"],"RMA70-24;RMA70-12;\ub9dd\uac04 \uc911\ud569\uccb4;\ub9dd\uac04 \uad11\uc11d;\ud654\uc774\ud2b8 \ud638\uc2a4 \ucf5c;\ub85c\uc2dd \ucf5c;\uace0\uae09 \uc5f0\ub9c8\uc11d;\uc5f0\ub9c8\uc11d;\uc911\ud569\uc824;\uc824\ub77c\ud2f4;\uc5f4\ud569\uae08 \ub369\uc5b4\ub9ac;\uc5f4\ud569\uae08".split(";"),"\ud3ec\ub3c4\ub2f9 \ud329;\ud3ec\ub3c4\ub2f9 \ubc88\ub4e4;\ud3ec\ub3c4\ub2f9;\ub300\uccb4\ub2f9;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974 \ud329;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974 \ubc88\ub4e4;\ud3f4\ub9ac\uc5d0\uc2a4\ud14c\ub974;\uc5d0\uc2a4\ud14c\ub974 \uc6d0\ub8cc;\uac1c\ub7c9 \uc7a5\uce58;\ub9ac\ub274\uc5bc \uc7a5\uce58;\uc7a5\uce58;\ud30c\uc190\ub41c \uc7a5\uce58;\uc815\uc81c \uc6d0\uc554;\uc6d0\uc554 \ud050\ube0c \ubc88\ub4e4;\uc6d0\uc554 \ud050\ube0c;\uc6d0\uc554;\uc544\ucf00\ud1a4 \ud329;\uc544\ucf00\ud1a4 \uc751\uc9d1\uccb4 \ubc88\ub4e4;\uc544\ucf00\ud1a4 \uc751\uc9d1\uccb4;\ub514\ucf00\ud1a4;\uc774\ucca0 \ud329;\uc774\ucca0 \ubc88\ub4e4;\uc774\ucca0;\uc774\ucca0 \uc870\uac01".split(";")],
getGroupIdx=function(b){for(var a=itemData[b].name.kr,e=0;e<itemOrder.length;++e)if(0<=itemOrder[e].indexOf(a))return e;console.log("\uc5d0\ub7ec: \uadf8\ub8f9 \uc778\ub371\uc2a4\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc74c: ",a,b);return-1},makeResultHtmlByGroup=function(b){for(var a=' <div class="result-group">',e=-1,d=0;d<b.IDs.length;++d){var f=b.IDs[d],g=getGroupIdx(f);-1==g&&console.log("\uc5d0\ub7ec: \uadf8\ub8f9 \uc778\ub371\uc2a4\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc74c: ",itemData[f].name.kr,f);
0<d&&e!=g&&(a+='</div> <br><br> <div class="result-group">');a+=toImg(itemData[f].name.kr,b[f]);e=g}return a+"</div> "},tt=function(b){var a='<hr class="main-line"><span class="result-maintitle">\ud569\uacc4</span><br><hr class="sub-line"><span class="result-subtitle">\uacbd\ud5d8\uce58, \uc6a9\ubb38\ud3d0</span><hr> <div style="margin-top: 2px; display: inline-block; border: none; width: 100%; text-align: center">'+toImg("\uacbd\ud5d8\uce58",b.total.exp,!0);a+=toImg("\uc6a9\ubb38\ud3d0",b.total.lmd,
!0);var e=levelingData.stage.exp["LS-5"].sanity,d=Math.ceil(b.total.exp/levelingData.stage.exp["LS-5"].reward.expectation),f=levelingData.stage.lmd["CE-5"].sanity,g=Math.ceil(b.total.lmd/levelingData.stage.lmd["CE-5"].reward.expectation);a=a+'</div><br><div style="margin-top: 8px; margin-bottom: 8px; width: 100%; font-size: 10px; text-align: center">\u25bc</div> <div class="result-exp-lmd-container"><div class="result-exp-lmd"><span style="color: #777; font-size: 15px">\uacbd\ud5d8\uce58</span> LS-5 \u25b8 <span class="stage-guide-item">'+
(d+'\ud68c \ud074\ub9ac\uc5b4</span></span><br><span style="color: #777; font-size: 15px">\uc6a9\ubb38\ud3d0</span> CE-5 \u25b8 ');a+='<span class="stage-guide-item">'+g+"\ud68c \ud074\ub9ac\uc5b4</span>";a+="</span><br>";a+='<span style="color: #777; font-size: 15px">\uacbd\ud5d8\uce58+\uc6a9\ubb38\ud3d0</span> \u25b8 ';a+='<span class="stage-guide-item">'+(d*e+g*f)+"\uc774\uc131 \uc18c\ubaa8</span></span><br></div>";a+="</div> ";a+="<br><br>";a+='<hr class="sub-line">';a+='<span class="result-subtitle">\uc815\uc608\ud654 \ubc0f \uc2a4\ud0ac\uac15\ud654 \uc7ac\ub8cc</span>';
a+="<hr>";a+=makeResultHtmlByGroup(b.total);a+="<hr>";a+='<button type="button" class="show-detailed-result" onclick="showDetailedResult()">\uc138\ubd80 \uacb0\uacfc \ubcf4\uc774\uae30</button>';a+='<button type="button" class="hide-detailed-result" onclick="hideDetailedResult()" style="display: none">\uc138\ubd80 \uacb0\uacfc \uc228\uae30\uae30</button>';a+='<div id="detailed-result" style="display:none">';a+='<hr class="sub-line">';a+='<span class="result-subtitle">\uc624\ud37c\ub808\uc774\ud130 \ub808\ubca8\ub9c1 \ube44\uc6a9<br>(\uc815\uc608\ud654 \ube44\uc6a9 \uc81c\uc678)</span>';
a+="<hr>";a+=' <div class="result-group">';a+=toImg("\uacbd\ud5d8\uce58",b.total.exp,!0);a+=toImg("\uc6a9\ubb38\ud3d0",b.opLeveling.lmd,!0);a+="</div> ";a+="<hr>";a+='<hr class="sub-line">';a+='<span class="result-subtitle">\uc815\uc608\ud654 \uc7ac\ub8cc</span>';a+="<hr>";a+=makeResultHtmlByGroup(b.elitePromotion);a+="<hr>";a+='<hr class="sub-line">';a+='<span class="result-subtitle">\uc2a4\ud0ac\uac15\ud654 \uc7ac\ub8cc</span>';a+="<hr>";a+=makeResultHtmlByGroup(b.skillLeveling);a+="<hr>";a+="</div>";
a+='<button type="button" class="hide-detailed-result" onclick="hideDetailedResult()" style="display: none">\uc138\ubd80 \uacb0\uacfc \uc228\uae30\uae30</button>';return a+='<hr style="border-top-color: #777; border-top-width: 3px;">'},doNotRefreshResult=!1,showResult=function(){if(!0!==doNotRefreshResult){for(var b={opIDs:[]},a=$('form[name*="op_"].op'),e=0;e<a.length;++e){var d=$(a[e]),f={},g={},h={};f.current=Number(d.find(".current-elite:enabled").val());f.target=Number(d.find(".target-elite:enabled").val());
g.current=Number(d.find(".current-op-level:enabled").val());g.target=Number(d.find(".target-op-level:enabled").val());var l=d.find(".target-skill-level:enabled").length;if(0<l){for(var c=[],k=0;k<l;++k)c[k]={},c[k].current=Number($(d.find(".current-skill-level")[k]).val()),c[k].target=Number($(d.find(".target-skill-level")[k]).val());h.common={};h.common.current=7<c[0].current?7:c[0].current;h.common.target=7<c[0].target?7:c[0].target;h.mastery={};for(k=0;k<l;++k)h.mastery[k]={};for(k=0;k<l;++k){var m=
c[k].current-7;h.mastery[k].current=0<m?m:0;m=c[k].target-7;h.mastery[k].target=0<m?m:0}c=!0;h.common.current!=h.common.target&&(c=!1);for(k=0;k<l;++k)if(h.mastery[k].current!=h.mastery[k].target){c=!1;break}c&&(h=!1)}else h=!1;d=Number(d.attr("name").split("_")[1]);b.opIDs.push(d);b[d]={};b[d].elite=f;b[d].opLevel=g;b[d].skillLevel=h}b=calc(b);a=function(a,b){var c,d,e;var f=itemData[a].name.kr;var g=itemData[b].name.kr;var k=c=e=d=-1;for(var h=0;h<itemOrder.length;++h){var l=itemOrder[h].indexOf(f);
if(0<=l){d=h;e=l;break}}for(h=0;h<itemOrder.length;++h)if(l=itemOrder[h].indexOf(g),0<=l){c=h;k=l;break}-1!=d&&-1!=e||console.log(f,"\uc6b0\uc120\ub3c4 \uc624\ub958:",d,e);-1!=c&&-1!=k||console.log(g,"\uc6b0\uc120\ub3c4 \uc624\ub958:",c,k);return d<c?-1:c<d?1:e<k?-1:1};b.skillLeveling.IDs.sort(a);b.elitePromotion.IDs.sort(a);b.total.IDs.sort(a);$("#result-container").html(tt(b))}},getMaxLevel=function(b,a){return Number(levelingData.maxLevel["elite_"+b][a-1])},levelingCalc=function(b){for(var a=levelingData.leveling.expTable,
e=levelingData.leveling.lmdTable,d,f,g=f=d=0;g<b.target.elite;++g)d+=a["elite_"+String(g)][getMaxLevel(g,b.rarity)-1];d+=a["elite_"+String(b.target.elite)][b.target.level-1];d+=b.target.exp;for(g=0;g<b.target.elite;++g)f+=e["elite_"+String(g)][getMaxLevel(g,b.rarity)-1];f+=e["elite_"+String(b.target.elite)][b.target.level-1];if(b.target.level<getMaxLevel(b.target.elite,b.rarity)){g=e["elite_"+String(b.target.elite)][b.target.level];g-=e["elite_"+String(b.target.elite)][b.target.level-1];var h=a["elite_"+
String(b.target.elite)][b.target.level];h-=a["elite_"+String(b.target.elite)][b.target.level-1];f+=Math.ceil(g/h*b.target.exp)}var l,c;for(g=c=l=0;g<b.current.elite;++g)l+=a["elite_"+String(g)][getMaxLevel(g,b.rarity)-1];l+=a["elite_"+String(b.current.elite)][b.current.level-1];l+=b.current.exp;for(g=0;g<b.current.elite;++g)c+=e["elite_"+String(g)][getMaxLevel(g,b.rarity)-1];c+=e["elite_"+String(b.current.elite)][b.current.level-1];b.current.level<getMaxLevel(b.current.elite,b.rarity)&&(g=e["elite_"+
String(b.current.elite)][b.current.level],g-=e["elite_"+String(b.current.elite)][b.current.level-1],h=a["elite_"+String(b.current.elite)][b.current.level],h-=a["elite_"+String(b.current.elite)][b.current.level-1],c+=Math.ceil(g/h*b.current.exp));b={};b.exp=d-l;b.lmd=f-c;b.exp=0>b.exp?0:b.exp;b.lmd=0>b.lmd?0:b.lmd;return b},calc=function(b){var a={opLeveling:{},skillLeveling:{},elitePromotion:{},total:{}};a.opLeveling.exp=0;for(var e=a.opLeveling.lmd=0;e<b.opIDs.length;++e){var d=b.opIDs[e],f={};f.rarity=
data.opData[d].rarity;f.current={};f.current.elite=b[d].elite.current;f.current.level=b[d].opLevel.current;f.current.exp=0;f.target={};f.target.elite=b[d].elite.target;f.target.level=b[d].opLevel.target;f.target.exp=0;d=levelingCalc(f);a.opLeveling.exp+=d.exp;a.opLeveling.lmd+=d.lmd}a.elitePromotion.IDs=[];for(e=0;e<b.opIDs.length;++e){d=b.opIDs[e];f=b[d].elite.current;var g=b[d].elite.target;if(f!=g)for(;f<g;++f){var h=opMaterialData[d].elite[f];for(var l=0;l<h.length;++l){var c=h[l][0],k=Number(h[l][1]);
a.elitePromotion.hasOwnProperty(c)?a.elitePromotion[c]+=k:(a.elitePromotion[c]=k,a.elitePromotion.IDs.push(c))}}}a.skillLeveling.IDs=[];for(e=0;e<b.opIDs.length;++e)if(d=b.opIDs[e],!1!==b[d].skillLevel){g=Number(b[d].skillLevel.common.target);for(f=Number(b[d].skillLevel.common.current)-1;f<g-1;++f)for(h=opMaterialData[d].skill.common[f],l=0;l<h.length;++l)c=h[l][0],k=Number(h[l][1]),a.skillLeveling.hasOwnProperty(c)?a.skillLeveling[c]+=k:(a.skillLeveling[c]=k,a.skillLeveling.IDs.push(c));g=Object.keys(b[d].skillLevel.mastery).length;
for(f=0;f<g;++f)for(h=Number(b[d].skillLevel.mastery[f].target),l=Number(b[d].skillLevel.mastery[f].current);l<h;++l){var m=opMaterialData[d].skill.mastery[f][l];for(var n=0;n<m.length;++n)c=m[n][0],k=Number(m[n][1]),a.skillLeveling.hasOwnProperty(c)?a.skillLeveling[c]+=k:(a.skillLeveling[c]=k,a.skillLeveling.IDs.push(c))}}a.total.exp=0;a.total.lmd=0;a.total.IDs=[];a.total.exp+=a.opLeveling.exp;a.total.lmd+=a.opLeveling.lmd;for(e=0;e<a.elitePromotion.IDs.length;++e)c=a.elitePromotion.IDs[e],"\uc6a9\ubb38\ud3d0"==
itemData[c].name.kr?a.total.lmd+=a.elitePromotion[c]:a.total.hasOwnProperty(c)?a.total[c]+=a.elitePromotion[c]:(a.total[c]=a.elitePromotion[c],a.total.IDs.push(c));for(e=0;e<a.skillLeveling.IDs.length;++e)c=a.skillLeveling.IDs[e],"\uc6a9\ubb38\ud3d0"==itemData[c].name.kr&&(a.total.lmd+=a.skillLeveling[c]),a.total.hasOwnProperty(c)?a.total[c]+=a.skillLeveling[c]:(a.total[c]=a.skillLeveling[c],a.total.IDs.push(c));return a};