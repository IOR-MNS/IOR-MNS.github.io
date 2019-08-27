var verifyData = function()
{
	var isVerified = true;
	var errorMSG = "";
	
	var leftDay = document.getElementById("leftDay").value;
	var leftHour = document.getElementById("leftHour").value;
	var regenStaminaUsage = document.getElementById("regenStaminaUsage").value;
	var currentLevel = document.getElementById("currentLevel").value;
	var currentExp = document.getElementById("currentExp").value;
	var currentStamina = document.getElementById("currentStamina").value;
	var currentItem = document.getElementById("currentItem").value;
	var liveConsumption = document.getElementById("liveConsumption").value;
	var eventConsumption = document.getElementById("eventConsumption").value;
	var drink10 = document.getElementById("drink10").value;
	var drink20 = document.getElementById("drink20").value;
	var drink30 = document.getElementById("drink30").value;
	var drinkMax = document.getElementById("drinkMax").value;
	var currentPoint = document.getElementById("currentPoint").value;
	var targetPoint = document.getElementById("targetPoint").value;
	
	// 미입력 여부 확인
	if ( leftDay == "" ) errorMSG += "남은 일수를 입력해주세요.\n";
	if ( leftHour == "" ) errorMSG += "남은 시간을 입력해주세요.\n";
	if ( regenStaminaUsage == "" ) errorMSG += "자연회복 스태미너 활용률을 입력해주세요.\n";
	if ( currentLevel == "" ) errorMSG += "현재 레벨을 입력해주세요.\n";
	if ( currentExp == "" ) errorMSG += "현재 경험치를 입력해주세요.\n";
	if ( currentStamina == "" ) errorMSG += "현재 스태미너를 입력해주세요.\n";
	if ( currentItem == "" ) errorMSG += "소지한 이벤트 재화 개수를 입력해주세요.\n";
	if ( liveConsumption == "" ) errorMSG += "일반곡 배수를 입력해주세요.\n";
	if ( eventConsumption == "" ) errorMSG += "이벤곡 배수를 입력해주세요.\n";
	if ( drink10 == "" ) errorMSG += "사용할 10 드링크 개수를 입력해주세요.\n";
	if ( drink20 == "" ) errorMSG += "사용할 20 드링크 개수를 입력해주세요.\n";
	if ( drink30 == "" ) errorMSG += "사용할 30 드링크 개수를 입력해주세요.\n";
	if ( drinkMax == "" ) errorMSG += "사용할 맥스 드링크 개수를 입력해주세요.\n";
	if ( currentPoint == "" ) errorMSG += "현재 이벤트 점수를 입력해주세요.\n";
	if ( targetPoint == "" ) errorMSG += "목표 이벤트 점수를 입력해주세요.\n";
	
	if ( errorMSG == "" ) {
		main();
	}
	alert( errorMSG );
}