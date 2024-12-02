var refreshTargetInput=function(){for(var a="",e,k=0,d=6;3<=d;--d){e=Number(document.querySelectorAll(`#star-${d} input`)[3].value);for(var b=0;b<e;++b)a+=` <div class="tag">${d}\u2605<input placeholder="\ub300\uc6d0_${k}">:<input style="width: 1em; text-align: right" value="1">\ud68c</div><br>`,++k}document.querySelector("#target-input").innerHTML=a},fetchData=function(){var a={};a.stack=Number(document.getElementById("stack").value);a.prob={total:{},pickup:{}};a.numOfChar={nonPickup:{},pickup:{}};
a.target={nonPickup:{},pickup:{}};for(var e=0,k=[...document.querySelectorAll("#target-input .tag")].map(c=>Number(c.querySelectorAll("input")[1].value)),d=6;3<=d;--d){var b=[...document.querySelectorAll(`#star-${d} input`)].map(c=>Number(c.value));a.prob.total[d]=b[0]/100;a.prob.pickup[d]=b[1]/100;a.numOfChar.pickup[d]=b[2];a.target.nonPickup[d]=[];a.target.pickup[d]=[];for(var g=0;g<b[3];++g)a.target.pickup[d].push(k[e++])}return a},simulationResult=[],simulate=function(a=1E3,e=5E4){gtag("event",
"\uc2dc\ubbac\ub808\uc774\uc158 \uc2e4\ud589",{event_category:"\uac00\ucc60 \uc2dc\ubbac\ub808\uc774\ud130"});for(var k=Date.now(),d=fetchData(),b=0,g=6;3<=g;--g)b+=d.target.nonPickup[g].length+d.target.pickup[g].length;if(!(0>=b)){var c=0;b=d.prob;var m=d.numOfChar,l=d.target,u=0>document.getElementById("five-star-guarantee").className.indexOf("off"),v=0>document.getElementById("limited-pickup-list-price").className.indexOf("off"),p=[],q=[];simulationResult=[];var f=0,h=0,r=0;c=0;for(var n in l)for(c=
50;99>=c;++c)for(h=0,p[c]=[],g=6;3<=g;--g)for(r=0;r<l[n][g].length;++r)f=b.total[g],f=6==g?f+.02*(c-50):(1-(b.total[6]+.02*(c-50)))/(1-b.total[6])*f,f="pickup"==n?f*b.pickup[g]/m.pickup[g]:f*(1-b.pickup[g])/(m.total[g]-m.pickup[g]),0<h&&(f+=p[c][h-1]),p[c][h]=f,50==c&&(q[h]=-l[n][g][r]),++h;n=c=f=h=g=0;m=l.nonPickup[6].length+l.pickup[6].length;l=l.nonPickup[5].length+l.pickup[5].length;r=[...q];var t=!1;for(n=d.stack;;)if(++g,c=++n,c=50<c?c:50,h=Math.random(),99<c)console.log(c),n=0;else{if(u&&!t&&
10===g)h<b.total[6]+.02*(c-50)?(h=Math.floor(Math.random()*m*2),h<m&&++q[h],n=0):(h=Math.floor(Math.random()*l*2),h<l&&++q[m+h],t=!0);else{for(f=0;f<p[c].length;++f)if(h<p[c][f]){f<m?n=0:0<l&&f<m+l&&(t=!0);++q[f];break}f===p[c].length&&(f=p[c][p[c].length-1]+b.total[6]+.02*(c-50)-(0<m?p[c][m-1]:0),h<f?n=0:t||h<f+(1-(b.total[6]+.02*(c-50)))/(1-b.total[6])*b.total[5]-(0<l?p[c][l-1]:0)&&(t=!0))}c=v?Math.floor(g/300):0;for(f=0;f<q.length;++f)if(0>q[f]){if(f<m&&(c+=q[f],0<=c))continue;break}if(f==q.length&&
(simulationResult.push(g),g=0,n=d.stack,t=!1,q=[...r],0===simulationResult.length%1E3&&(simulationResult.length>=e||Date.now()-k>=a)))break}simulationResult=simulationResult.sort(function(w,x){return Number(w)<Number(x)?-1:1});showResult()}},getQuantile=function(a,e){if(0===a.length)return 0;e=Math.ceil(a.length*e);e=e>=a.length?a.length-1:e;return a[e]},getPercentile=function(a,e){if(0===a.length)return 0;for(var k=0,d=a.length-1,b;;){b=Math.floor((k+d)/2);if(k>=d)break;if(a[b]<e)k=b+1;else if(a[b]===
e)break;else d=b-1}for(;b<a.length;++b)if(a[b]>e){--b;break}return(b+1)/a.length},showResult=function(a){gtag("event","\uacb0\uacfc \ucd9c\ub825",{event_category:"\uac00\ucc60 \uc2dc\ubbac\ub808\uc774\ud130"});for(var e=[...document.querySelectorAll(".result-panel table input")].map(b=>Number(b.value)/100),k=document.querySelectorAll(".result-panel tr")[1].querySelectorAll("td"),d=0;d<e.length;++d)k[d].innerText=getQuantile(simulationResult,e[d]);e=document.getElementById("draw");k=document.getElementById("prob");
void 0!==a?"draw"==a.target.id?k.value=Math.round(1E3*getPercentile(simulationResult,Number(e.value)))/10:"prob"==a.target.id&&(e.value=getQuantile(simulationResult,Number(k.value)/100)):k.value=Math.round(1E3*getPercentile(simulationResult,Number(e.value)))/10},toggleButton=function(a){0>a.className.indexOf("off")?a.className="off":a.className=""},main=function(){for(var a=6;3<=a;--a)document.querySelectorAll(`#star-${a} input`)[3].addEventListener("keyup",refreshTargetInput);a=document.querySelectorAll(".result-panel input");
for(var e=0;e<a.length;++e)a[e].addEventListener("keyup",showResult)};main();
