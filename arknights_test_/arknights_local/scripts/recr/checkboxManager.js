var selectionCount=0,countCheck=function(a){a.checked?selectionCount++:selectionCount--;return 6<selectionCount?(a.checked=!1,selectionCount--,!1):!0},tagClicked=function(a){if(!1===countCheck(a))return!1;showResult()},clearSelection=function(){for(var a=document.querySelectorAll(".tag"),b=0;b<a.length;++b)a[b].checked=!1,selectionCount=0;showResult()},onlyHighStarsFilter=!1,filterClicked=function(a){"onlyHighStarsFilter"===$(a).attr("id")&&(onlyHighStarsFilter=!onlyHighStarsFilter);showResult()};