var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};
var secToTime=function(a){a=parseInt(a,10);var b=parseInt(a/3600,10);a=parseInt(a%3600/60,10);return b+"h "+a+"m"},showResult=function(){calc();$("#result-level").text(p.level);$("#result-exp").attr("max",getMaxExp(p.level)).val(p.exp);$("#result-fan").text(p.fan);$("#result-money").text(p.money);$("#result-affection").text(p.affection);$("#result-drink10").text(p.drink10);$("#result-drink20").text(p.drink20);$("#result-drink30").text(p.drink30);$("#result-mdrink").text(p.mdrink);0>p.jwl?$("#result-jwl").text(-p.jwl+
"\uac1c \ubd80\uc871").removeClass().addClass("red"):$("#result-jwl").text(p.jwl+"\uac1c \uc794\uc5ec").removeClass().addClass("green");$("#result-playCnt-live").text(playCnt.live);$("#result-playCnt-work").text(playCnt.work);$("#result-playCnt-elegant").text(playCnt.elegant);var a=(playCnt.live+playCnt.elegant)*t.doLive;var b=playCnt.work*t.doWork;var d=a+b;var c=e.leftDay+1;21<=e.leftHour&&c++;c=d/c;$("#result-playTime-live").text(secToTime(a));$("#result-playTime-work").text(secToTime(b));$("#result-playTime-total").text(secToTime(d));
$("#result-playTime-daily").text(secToTime(c));$("#result").show()};