var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,d){a.raw=d;return a};
function dataMigration(){if(confirm('[\ub370\uc774\ud130 \uad00\ub9ac]\ub97c \ud1b5\ud574 \uc720\uc800 \ub370\uc774\ud130\ub97c \ub0b4\ubcf4\ub0b4\uac70\ub098 \ubd88\ub7ec\uc62c \uc218 \uc788\uc2b5\ub2c8\ub2e4.\n\ub2e4\ub978 \ud658\uacbd\uc73c\ub85c \uc62e\uaca8\uac00\uac70\ub098 \ub370\uc774\ud130\ub97c \ubc31\uc5c5\ud560 \ub54c \uc0ac\uc6a9\ud574\uc8fc\uc138\uc694.\n\uacc4\uc18d\ud558\uc2dc\ub824\uba74 "\ud655\uc778" \ubc84\ud2bc\uc744 \ub20c\ub7ec\uc8fc\uc138\uc694.'))if(confirm('\ub370\uc774\ud130\ub97c \ub0b4\ubcf4\ub0b4\ub824\uba74 "\ud655\uc778" \ubc84\ud2bc\uc744,\n\ub370\uc774\ud130\ub97c \ubd88\ub7ec\uc624\ub824\uba74 "\ucde8\uc18c" \ubc84\ud2bc\uc744 \ub20c\ub7ec\uc8fc\uc138\uc694.')){var a=new Blob([JSON.stringify(localStorage)],
{type:"text/plain;charset=utf-8"}),d="minase_\uc124\uc815_\ub370\uc774\ud130_"+(new Date).toISOString().replace(/:/g,"-")+".txt";saveAs(a,d)}else if(confirm('\uc8fc\uc758: \uc774 \uc791\uc5c5\uc744 \uc218\ud589\ud558\uba74 \uae30\uc874 \ub370\uc774\ud130\ub294 \uc0ad\uc81c\ub429\ub2c8\ub2e4.\n\uc815\ub9d0 \ub370\uc774\ud130\ub97c \ubd88\ub7ec\uc624\uc2dc\ub824\uba74 "\ud655\uc778" \ubc84\ud2bc\uc744 \ub20c\ub7ec\uc8fc\uc138\uc694.'))if(a=prompt("\uc5ec\uae30\uc5d0 \ub370\uc774\ud130\ub97c \ubd99\uc5ec\ub123\uc73c\uc138\uc694.")){try{a=
JSON.parse(a)}catch(h){alert("\uc785\ub825\ub41c \ub370\uc774\ud130\uac00 \uc815\uc0c1\uc801\uc774\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.\n\ubd88\ub7ec\uc624\uae30 \uc791\uc5c5\uc744 \ucde8\uc18c\ud558\uace0 \uae30\uc874 \ub370\uc774\ud130\ub97c \uadf8\ub300\ub85c \uc720\uc9c0\ud569\ub2c8\ub2e4.");return}var b={mcalc_:"\uc7ac\ub8cc \uacc4\uc0b0\uae30",recr_:"\uacf5\uac1c\ubaa8\uc9d1 \uacc4\uc0b0\uae30",optotal_:"\uc721\uc131 \uc790\uc6d0 \uacc4\uc0b0\uae30",oplv_:"\ub808\ubca8 \uacc4\uc0b0\uae30"},e={};
Object.keys(b).forEach(function(h){return e[h]=!1});d=[];for(var f in a)for(var c in b)!e[c]&&0<=f.indexOf(c)&&(e[c]=!0,d.push(b[c]));b=Object.keys(localStorage);for(c in e)if(e[c])for(var g=0;g<b.length;++g)0<=b[g].indexOf(c)&&localStorage.removeItem(b[g]);for(f in a)localStorage.setItem(f,a[f]);alert("\ub370\uc774\ud130 \ubd88\ub7ec\uc624\uae30\ub97c \uc644\ub8cc\ud558\uc600\uc2b5\ub2c8\ub2e4.\n\uc601\ud5a5\uc744 \ubc1b\uc740 \uc11c\ube44\uc2a4: "+d.join(", "))}else alert("\ub370\uc774\ud130 \ubd88\ub7ec\uc624\uae30\ub97c \ucde8\uc18c\ud558\uc600\uc2b5\ub2c8\ub2e4.");
else alert("\ub370\uc774\ud130 \ubd88\ub7ec\uc624\uae30\ub97c \ucde8\uc18c\ud558\uc600\uc2b5\ub2c8\ub2e4.")}document.querySelector("#data-migration").addEventListener("click",function(a){dataMigration()});