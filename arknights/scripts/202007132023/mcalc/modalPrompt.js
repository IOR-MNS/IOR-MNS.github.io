var displayName=!0,displayInputField=!0,filterGrade=[],filterCategory=[],filterOnlyLack=!1,loadConfig=function(){displayName=JSON.parse(localStorage.getItem("mcalc_display_name"));displayInputField=JSON.parse(localStorage.getItem("mcalc_display_inputField"));filterGrade=JSON.parse(localStorage.getItem("mcalc_filter_grade"));filterCategory=JSON.parse(localStorage.getItem("mcalc_filter_category"));filterOnlyLack=JSON.parse(localStorage.getItem("mcalc_filter_onlyLack"));displayName="boolean"!==typeof displayName?
!0:displayName;displayInputField="boolean"!==typeof displayInputField?!0:displayInputField;filterGrade=Array.isArray(filterGrade)?filterGrade:[];filterCategory=Array.isArray(filterCategory)?filterCategory:[];filterOnlyLack="boolean"!==typeof filterOnlyLack?!1:filterOnlyLack;selectConfig()},selectConfig=function(){displayName?$("#config-modal #display_name").prop("checked",!0):$("#config-modal #display_name").prop("checked",!1);displayInputField?$("#config-modal #display_inputField").prop("checked",
!0):$("#config-modal #display_inputField").prop("checked",!1);refreshBtnFilterOnlyLack();for(var a=1;5>=a;++a)0>filterGrade.indexOf(a)?$("#filter_grade_"+String(a)).prop("checked",!0):$("#filter_grade_"+String(a)).prop("checked",!1);for(a=0;3>=a;++a)0>filterCategory.indexOf(a)?$("#filter_category_"+String(a)).prop("checked",!0):$("#filter_category_"+String(a)).prop("checked",!1)},fetchConfig=function(){displayName=JSON.parse($("#config-modal #display_name").prop("checked"));displayInputField=JSON.parse($("#config-modal #display_inputField").prop("checked"));
filterGrade=[];$filterGradeList=$('#config-modal [name="filter_grade"]:not(:checked)');for(var a=0;a<$filterGradeList.length;++a)filterGrade.push(Number($filterGradeList.eq(a).attr("id").split("_")[2]));filterCategory=[];$filterCategoryList=$('#config-modal [name="filter_category"]:not(:checked)');for(a=0;a<$filterCategoryList.length;++a)filterCategory.push(Number($filterCategoryList.eq(a).attr("id").split("_")[2]));localStorage.setItem("mcalc_display_name",JSON.stringify(displayName));localStorage.setItem("mcalc_display_inputField",
JSON.stringify(displayInputField));localStorage.setItem("mcalc_filter_grade",JSON.stringify(filterGrade));localStorage.setItem("mcalc_filter_category",JSON.stringify(filterCategory));localStorage.setItem("mcalc_filter_onlyLack",JSON.stringify(filterOnlyLack))},openConfigModal=function(){$("#config-modal").css("display","block");selectConfig()},closeConfigModal=function(){$("#config-modal").css("display","none");fetchConfig();applyConfig()};
$(document).ready(function(){loadConfig();applyConfig();$(".menu-btn").click(function(){openConfigModal()});$(".close-btn").click(function(){closeConfigModal()});$(window).click(function(a){$(a.target).is($("#config-modal"))&&closeConfigModal()});$("#config-modal").find("[name*=display_], [name*=filter_]").change(function(){fetchConfig();applyConfig()})});