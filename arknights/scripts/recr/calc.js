var generateTagCodes=function(b,a,f,d,e,c,h){e="undefined"===typeof e?0:e;c="undefined"===typeof c?0:c;h="undefined"===typeof h?0:h;if(e>=f)return a[d]=h,d+1;for(;c<b.length;++c)d=generateTagCodes(b,a,f,d,e+1,c+1,h|b[c]);return d},checkTag=function(b,a){for(var f=a.length=0,d=opMap.entries(),e=0;e<opMap.size;++e){var c=d.next().value;(b&c[1])==b&&0==(tagMap.get("\ucd9c\ud604\ubd88\uac00")&c[1])&&(0!=(b&tagMap.get("\uace0\uae09\ud2b9\ubcc4\ucc44\uc6a9"))?0!=(c[1]&tagMap.get("\uace0\uae09\ud2b9\ubcc4\ucc44\uc6a9"))&&
(a[f++]=c[0]):0!=(b&tagMap.get("\ud2b9\ubcc4\ucc44\uc6a9"))?0!=(c[1]&tagMap.get("\ud2b9\ubcc4\ucc44\uc6a9"))&&(a[f++]=c[0]):0==(c[1]&tagMap.get("\uace0\uae09\ud2b9\ubcc4\ucc44\uc6a9"))&&(a[f++]=c[0]))}},calc=function(b){if(0==b.length)return[];for(var a=0;a<b.length;++a)if(!1===validateTagName(b[a]))return[];var f=[],d=[];for(a=0;a<b.length;++a)f[a]=tagMap.get(b[a]);a=1;for(var e=0;a<=b.length;++a)e=generateTagCodes(f,d,a,e);b=[];for(f=a=0;a<d.length;++a){e=[];var c=[];getTagNames(d[a],e);checkTag(d[a],
c);if(0<c.length){c.sort(function(a,c){var b=getStar(a),e=getStar(c);return b>e?-1:b<e?1:a<c?-1:a>c?1:0});var h=[];h[0]=e;h[1]=c;b[f++]=h}}b.sort(function(a,c){var b=a[1],e=c[1],d;for(d=1;;){var g=b[b.length-d];var f=getStar(g);if(3<=f||d>=b.length)break;++d}for(d=1;;){g=e[e.length-d];g=getStar(g);if(3<=g||d>=e.length)break;++d}if(f>g)return-1;if(f<g)return 1;g=b[0];d=getStar(g);g=e[0];g=getStar(g);return d>g?-1:d<g?1:b.length<e.length?-1:b.length>e.length?1:0});return b};