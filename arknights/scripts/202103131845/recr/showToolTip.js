var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};var glob=glob||{namespace:"recr",ga_event_category:"\uacf5\uac1c\ubaa8\uc9d1 \uacc4\uc0b0\uae30"};window[glob.namespace]=window[glob.namespace]||{};var gtag_opTooltipUsed=!1;
window[glob.namespace].showResultOpTooltip=function(a){$(".tooltip").remove();var b=$(a.target).closest(".result-op").attr("id").split("_")[1];if(b in db.op){b=getTagNames(db.op[b].tagCode);for(var d="",c=0;c<b.length;++c)d+='<span class="tag result-tag">'+b[c]+"</span>";$("body").append('<p class="tooltip" data-lang="'+userConfig.locale.region.value+'">'+d+"</p>");$(".tooltip").css("top",a.pageY+"px").css("left",a.pageX+"px");gtag_opTooltipUsed||(gtag_opTooltipUsed=!0,gtag("event","\uc624\ud37c\ub808\uc774\ud130 \ud234\ud301 \ucd5c\ucd08 \ud45c\uc2dc",
{event_category:"\uacf5\uac1c\ubaa8\uc9d1 \uacc4\uc0b0\uae30"}))}};window[glob.namespace].moveTooltip=function(a){$(".tooltip").css("top",a.pageY+"px").css("left",a.pageX+"px")};window[glob.namespace].removeTooltip=function(){$(".tooltip").remove()};window[glob.namespace].main_showToolTip=function(){$(document).on("click mouseover",".result-op",showResultOpTooltip);$(document).on("mousemove",".result-op",moveTooltip);$(document).on("mouseout",".result-op",removeTooltip)};
window.errorCatcherExec=window.errorCatcherExec||[];try{window.errorCatcherExec.push("main_showToolTip")}catch(a){window.errorCatcherExec=[],window.errorCatcherExec.push("main_showToolTip")};