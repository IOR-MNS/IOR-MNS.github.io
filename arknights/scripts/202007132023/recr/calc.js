var generateTagCodes=function(b,a,e,c,k,d,f){k="undefined"===typeof k?0:k;d="undefined"===typeof d?0:d;f="undefined"===typeof f?0:f;if(k>=e)return a[c]=f,c+1;for(;d<b.length;++d)c=generateTagCodes(b,a,e,c,k+1,d+1,f|b[d]);return c},getAvailableOperatorIDs=function(b,a){var e=a.length=0,c=function(m){for(var g=0;g<data.tagData.length;++g)if(m==data.tagData[g].name.kr)return data.tagData[g].tagCode;console.log("calc.js, getAvailableOperatorIDs(), getTagCodeKR()\uc5d0\uc11c \uc5d0\ub7ec \ubc1c\uc0dd");
console.log("\uc785\ub825\uac12: ",m);return!1},k=c("\ucd9c\ud604\ubd88\uac00"),d=c("\uace0\uae09\ud2b9\ubcc4\ucc44\uc6a9");c=c("\ud2b9\ubcc4\ucc44\uc6a9");if(!1===k||!1===d||!1===c)return!1;for(var f=0;f<data.opData.length;++f){var h=data.opData[f];(b&h.tagCode)==b&&0==(k&h.tagCode)&&(0!=(d&b)?0!=(d&h.tagCode)&&(a[e++]=h.id):0!=(c&b)?0!=(c&h.tagCode)&&(a[e++]=h.id):0==(d&h.tagCode)&&(a[e++]=h.id))}},getLowestRarity=function(b){for(var a=0,e=b.length-1;0<=e;--e){a=data.opData[b[e]].rarity;if(3<=a)break;
if(0===e){a=data.opData[b[b.length-1]].rarity;break}}return a},calc=function(b){if(0==b.length)return[];for(var a=0;a<b.length;++a)if(0>b[a]||b[a]>=data.length)return[];var e=[],c=[];for(a=0;a<b.length;++a)e[a]=data.tagData[b[a]].tagCode;a=1;for(var k=0;a<=b.length;++a)k=generateTagCodes(e,c,a,k);b=[];for(e=a=0;a<c.length;++a){k=c[a];var d=[];getAvailableOperatorIDs(c[a],d);if(0<d.length){d.sort(function(h,m){var g=data.opData[h].rarity,l=data.opData[m].rarity;if(g>l)return-1;if(g<l)return 1;g=data.opData[h].name[getLang()];
l=data.opData[m].name[getLang()];return g<l?-1:g>l?1:0});var f={};f.tagCode=k;f.opIDs=d;f.lowestRarity=getLowestRarity(d);b[e++]=f}}b.sort(function(h,m){var g=h.opIDs,l=m.opIDs,n=h.lowestRarity,p=m.lowestRarity;if(n>p)return-1;if(n<p)return 1;n=data.opData[g[0]].rarity;p=data.opData[l[0]].rarity;return n>p?-1:n<p?1:g.length<l.length?-1:g.length>l.length?1:0});return b};