var cutdownInput=function(b){var a=$(b);b=a.find(".item_body_have_input");a=a.find(".item_body_need_input");var e=b.val(),f=a.val(),d=Number(e),c=Number(f);d=isNaN(d)?0:d;c=isNaN(c)?0:c;d>c?(d-=c,c=0):(c-=d,d=0);c=0===c?"":c;b.val(0===d?"":d);a.val(c);e!=b.val()&&b.trigger("change");f!=a.val()&&a.trigger("change")},cutdownAllInputs=function(){for(var b=$(".item-container .item"),a=0;a<b.length;++a)cutdownInput(b.eq(a))},clearInputData=function(){confirm("\uc8fc\uc758: \uc774 \uc791\uc5c5\uc740 \ub418\ub3cc\ub9b4 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.\n\uc815\ub9d0\ub85c \ud574\ub2f9 \uc11c\ube44\uc2a4\uc640 \uad00\ub828\ub41c \ubaa8\ub4e0 \ub370\uc774\ud130\ub97c \ucd08\uae30\ud654\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")&&
($(".item_body_have_input, .item_body_need_input").val(""),clearLocalStorage(),location.reload())},toggleFilterOnlyLack=function(){filterOnlyLack=!filterOnlyLack;localStorage.setItem("mcalc_filter_onlyLack",JSON.stringify(filterOnlyLack));refreshBtnFilterOnlyLack();applyConfig()},refreshBtnFilterOnlyLack=function(){for(var b=$('[name="toggleFilterOnlyLack"]'),a=0;a<b.length;++a)filterOnlyLack?b.eq(a).html('\ubd80\uc871\ud55c \uc544\uc774\ud15c\ub9cc \ud45c\uc2dc <span style="color:#187dc9">ON</span>'):
b.eq(a).html('\ubd80\uc871\ud55c \uc544\uc774\ud15c\ub9cc \ud45c\uc2dc <span style="color:#de0d0d">OFF</span>')},applyConfig=function(){$('.item-container [id*="category_"]').css("display","block");var b=$(".item-container .item");b.css("display","inline-block");for(var a=0;a<filterCategory.length;++a)$(".item-container #category_"+filterCategory[a]).css("display","none");for(a=0;a<filterGrade.length;++a)for(var e=0;e<b.length;++e){var f=Number(b.eq(e).attr("id").split("_")[1]);itemData[f].grade==
filterGrade[a]&&b.eq(e).css("display","none")}if(filterOnlyLack)for(a=0;a<b.length;++a)0<=Number(b.eq(a).find(".item_thumb_quantity").text())&&b.eq(a).css("display","none");displayName?$(".item-container .item_thumb_name").css("display","inline-block"):$(".item-container .item_thumb_name").css("display","none");displayInputField?$(".item-container .item_body").css("display","inline-block"):$(".item-container .item_body").css("display","none")};