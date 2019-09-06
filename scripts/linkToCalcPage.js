function linkToCalcPage()
{
	var eventType = document.getElementById("eventType").value;
	var playType = document.getElementById("playType").value;
	var nextPage = "calc.html";
	var queryString = "eventType=" + String(eventType) + "&playType=" + String(playType);
	
	if ( eventType == "" ) {
		alert("이벤트 유형을 골라주세요.");
	}
	if ( playType == "" ) {
		alert("플레이 유형을 골라주세요.");
	}
	
	if ( eventType != "" && playType != "" ) {
		location.href = nextPage + "?" + queryString;
	}
}