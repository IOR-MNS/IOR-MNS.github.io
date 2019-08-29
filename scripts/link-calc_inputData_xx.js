function main()
{
	var eventType = document.getElementById("eventType").value;
	var playType = document.getElementById("playType").value;
	var nextPage = "calc_inputData_" + eventType + playType + ".html";
	
	if ( eventType == "" ) {
		alert("이벤트 유형을 골라주세요.");
	}
	if ( playType == "" ) {
		alert("플레이 유형을 골라주세요.");
	}
	
	if ( eventType != "" && playType != "" ) {
		location.href = nextPage;
	}
}