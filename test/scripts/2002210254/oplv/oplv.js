var calc=function(a){for(var b,c=data.leveling.expTable,h=data.leveling.lmdTable,f,e,d=e=f=0;d<a.to.elite;++d)f+=c["elite_"+String(d)][getMaxLevel(d,a.rarity)-1];f+=c["elite_"+String(a.to.elite)][a.to.level-1];f+=a.to.exp;for(d=0;d<a.to.elite;++d)e+=h["elite_"+String(d)][getMaxLevel(d,a.rarity)-1];e+=h["elite_"+String(a.to.elite)][a.to.level-1];if(a.to.level<getMaxLevel(a.to.elite,a.rarity)){d=h["elite_"+String(a.to.elite)][a.to.level];d-=h["elite_"+String(a.to.elite)][a.to.level-1];var k=c["elite_"+String(a.to.elite)][a.to.level];k-=c["elite_"+String(a.to.elite)][a.to.level-1];e+=Math.ceil(d/k*a.to.exp)}var g;for(d=b=g=0;d<a.from.elite;++d)g+=c["elite_"+String(d)][getMaxLevel(d,a.rarity)-1];g+=c["elite_"+String(a.from.elite)][a.from.level-1];g+=a.from.exp;for(d=0;d<a.from.elite;++d)b+=h["elite_"+String(d)][getMaxLevel(d,a.rarity)-1];b+=h["elite_"+String(a.from.elite)][a.from.level-1];a.from.level<getMaxLevel(a.from.elite,a.rarity)&&(d=h["elite_"+String(a.from.elite)][a.from.level],d-=h["elite_"+String(a.from.elite)][a.from.level-1],k=c["elite_"+String(a.from.elite)][a.from.level],k-=c["elite_"+String(a.from.elite)][a.from.level-1],b+=Math.ceil(d/k*a.from.exp));h=a.resource.exp;k=a.resource.lmd;c={};c.exp=f-g;c.lmd=e-b;for(d=a.from.elite;d<a.to.elite;++d)c.lmd+=data.elitePromotion.lmdTable["elite_"+String(d)][a.rarity-1];f={};f.exp=c.exp-h;f.lmd=c.lmd-k;c.exp=0>c.exp?0:c.exp;c.lmd=0>c.lmd?0:c.lmd;f.exp=0>f.exp?0:f.exp;f.lmd=0>f.lmd?0:f.lmd;e={};b=data.stage.exp[a.stage.exp];e.exp={};e.exp.name=a.stage.exp;e.exp.worst=Math.ceil(f.exp/b.reward.lowerBound);e.exp.expectation=Math.ceil(f.exp/b.reward.expectation);e.exp.best=Math.ceil(f.exp/b.reward.upperBound);b=data.stage.lmd[a.stage.lmd];e.lmd={};e.lmd.name=a.stage.lmd;e.lmd.worst=Math.ceil(f.lmd/b.reward.lowerBound);e.lmd.expectation=Math.ceil(f.lmd/b.reward.expectation);e.lmd.best=Math.ceil(f.lmd/b.reward.upperBound);g={};b=data.stage.exp[a.stage.exp].sanity;g.exp={};g.exp.worst=e.exp.worst*b;g.exp.expectation=e.exp.expectation*b;g.exp.best=e.exp.best*b;b=data.stage.lmd[a.stage.lmd].sanity;g.lmd={};g.lmd.worst=e.lmd.worst*b;g.lmd.expectation=e.lmd.expectation*b;g.lmd.best=e.lmd.best*b;g.total={};g.total.worst=g.exp.worst+g.lmd.worst;g.total.expectation=g.exp.expectation+g.lmd.expectation;g.total.best=g.exp.best+g.lmd.best;a={};a.sanity=g;a.stage=e;a.required=f;a.consumption=c;return a},getFormData=function(){var a={};a.rarity=Number($("#rarity").val());a.from={};a.from.elite=Number($("#from_elite").val());a.from.level=Number($("#from_level").val());0>=a.from.level&&(a.from.level=1);a.from.exp=Number($("#from_exp").val());a.to={};a.to.elite=Number($("#to_elite").val());a.to.level=Number($("#to_level").val());0==a.to.level&&(a.to.level=1);a.to.exp=Number($("#to_exp").val());a.resource={};a.resource.exp=Number($("#resource_expCard_tier1").val())*data.expCard.tier_1;a.resource.exp+=Number($("#resource_expCard_tier2").val())*data.expCard.tier_2;a.resource.exp+=Number($("#resource_expCard_tier3").val())*data.expCard.tier_3;a.resource.exp+=Number($("#resource_expCard_tier4").val())*data.expCard.tier_4;a.resource.lmd=Number($("#resource_lmd").val());a.stage={};a.stage.exp=$("#stage_exp").val();a.stage.lmd=$("#stage_lmd").val();return a},copyResult=function(){var a=$(".leveling_result-panel").text();console.log(a);""!=a&&window.prompt("\uae38\uac8c \ud130\uce58\ud558\uac70\ub098 Ctrl+C\ub97c \ub20c\ub7ec \uacc4\uc0b0 \uacb0\uacfc\ub97c \ubcf5\uc0ac\ud558\uc138\uc694.",a)},showResult=function(){var a=getFormData();a=calc(a);var b='<form class="leveling_result-panel"><br><div class="leveling_result-panel-subtitle">\uae30\ub300\uce58 \u25b8 <span class="leveling_result-item">'+(String(a.sanity.total.expectation)+" \uc774\uc131</span><br>\n");b=b+'</div><hr><span style="color: #777">\uacbd\ud5d8\uce58</span> '+(a.stage.exp.name+' \u25b8 <span class="leveling_result-item">'+a.stage.exp.expectation+"\ud68c \ud074\ub9ac\uc5b4</span><br>\n");b+='<span style="color: #777">\uc6a9\ubb38\ud3d0</span> '+a.stage.lmd.name+' \u25b8 <span class="leveling_result-item">'+a.stage.lmd.expectation+"\ud68c \ud074\ub9ac\uc5b4</span><br>\n\n";b+="</form>";if(a.stage.exp.best!=a.stage.exp.expectation||a.stage.lmd.best!=a.stage.lmd.expectation)b=b+'<form class="leveling_result-panel" style="color: #1c70b0"><br><div class="leveling_result-panel-subtitle">\ucd5c\uc18c\uce58 \u25b8 <span class="leveling_result-item">'+(String(a.sanity.total.best)+" \uc774\uc131</span><br>\n"),b=b+'</div><hr><span style="color: #777">\uacbd\ud5d8\uce58</span> '+(a.stage.exp.name+' \u25b8 <span class="leveling_result-item">'+a.stage.exp.best+"\ud68c \ud074\ub9ac\uc5b4</span><br>\n"),b+='<span style="color: #777">\uc6a9\ubb38\ud3d0</span> '+a.stage.lmd.name+' \u25b8 <span class="leveling_result-item">'+a.stage.lmd.best+"\ud68c \ud074\ub9ac\uc5b4</span><br>\n\n",b+="</form>";if(a.stage.exp.worst!=a.stage.exp.expectation||a.stage.lmd.worst!=a.stage.lmd.expectation)b=b+'<form class="leveling_result-panel" style="color: #c70808"><br><div class="leveling_result-panel-subtitle">\ucd5c\ub300\uce58 \u25b8 <span class="leveling_result-item">'+(String(a.sanity.total.worst)+" \uc774\uc131</span><br>\n"),b=b+'</div><hr><span style="color: #777">\uacbd\ud5d8\uce58</span> '+(a.stage.exp.name+' \u25b8 <span class="leveling_result-item">'+a.stage.exp.worst+"\ud68c \ud074\ub9ac\uc5b4</span><br>\n"),b+='<span style="color: #777">\uc6a9\ubb38\ud3d0</span> '+a.stage.lmd.name+' \u25b8 <span class="leveling_result-item">'+a.stage.lmd.worst+"\ud68c \ud074\ub9ac\uc5b4</span><br>\n\n",b+="</form>";b=b+'<br><form class="leveling_result-panel"><br>\ud544\uc694 \uacbd\ud5d8\uce58 \ud569\uacc4 \u25b8 <span class="leveling_result-item">'+(String(a.required.exp)+" Exp.</span><br>\n");b+='\ud544\uc694 \uc6a9\ubb38\ud3d0 \ud569\uacc4 \u25b8 <span class="leveling_result-item">'+String(a.required.lmd)+" LMD</span><br>\n";b=b+'<br>\n\uc18c\ubaa8 \uacbd\ud5d8\uce58 \ud569\uacc4 \u25b8 <span class="leveling_result-item">'+(String(a.consumption.exp)+" Exp.</span><br>\n");b+='\uc18c\ubaa8 \uc6a9\ubb38\ud3d0 \ud569\uacc4 \u25b8 <span class="leveling_result-item">'+String(a.consumption.lmd)+" LMD</span><br>\n";b+="<br></form>";$("#leveling_result-panel").html(b)},getMaxLevel=function(a,b){return data.maxLevel["elite_"+a][b-1]},fixTargetLevelToMax=!1,btnClicked=function(a){a=$(a).attr("name");"fix-target-level-to-max-btn"==a&&((fixTargetLevelToMax=!fixTargetLevelToMax)?($('[name="fix-target-level-to-max-btn"]').addClass("checked"),setTargetLevelToMax()):($('[name="fix-target-level-to-max-btn"]').removeClass("checked"),$("#to_level").val("1")),$("#to_level").trigger("change"));"show-detail-info-panel-btn"==a&&($("#leveling_detail-info-panel").css("display","block"),$(".leveling_hide-detail-info-panel-btn").css("display","inline-block"),$(".leveling_show-detail-info-panel-btn").css("display","none"));"hide-detail-info-panel-btn"==a&&($("#leveling_detail-info-panel").css("display","none"),$(".leveling_hide-detail-info-panel-btn").css("display","none"),$(".leveling_show-detail-info-panel-btn").css("display","inline-block"))},setTargetLevelToMax=function(){var a=getFormData();a=getMaxLevel(a.to.elite,a.rarity);$("#to_level").val(a)};$(document).ready(function(){$("*").change(function(){if($(this).is($("#rarity"))){var a=getFormData(),b=a.rarity,c=a.from.elite,h=a.to.elite;$("#to_elite option").attr("disabled","disabled").siblings().removeAttr("disabled");$("#from_elite option").attr("disabled","disabled").siblings().removeAttr("disabled");if(3>=b){var f=c,e=h;$('#from_elite option[value="2"]').attr("disabled","disabled");$('#to_elite option[value="2"]').attr("disabled","disabled");2<=f&&($('#from_elite option[value="1"]').prop("selected",!0),c=1);2<=e&&($('#to_elite option[value="1"]').prop("selected",!0),h=1)}2>=b&&(f=c,e=h,$('#from_elite option[value="1"]').attr("disabled","disabled"),$('#to_elite option[value="1"]').attr("disabled","disabled"),1<=f&&($('#from_elite option[value="0"]').prop("selected",!0),c=0),1<=e&&($('#to_elite option[value="0"]').prop("selected",!0),h=0));c=getMaxLevel(c,b);b=getMaxLevel(h,b);a.from.level>c&&$("#from_level").val(c);a.to.level>b&&$("#to_level").val(b)}fixTargetLevelToMax&&setTargetLevelToMax();showResult()})});