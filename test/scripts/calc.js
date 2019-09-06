/* 변수, 상수 선언 */

// 시뮬레이션 함수와의 입출력 데이터셋의 크기 
const INDATA_SIZE = 20
const OUTDATA_SIZE = 20

// 이벤트와 플레이 유형의 가독성을 증진 
const THEATER = 0
const TOUR = 1
const FIRST = 2
const LIVERUN = 10
const WORKRUN = 11

// 경험치 
const EXP_PER_MM = 306
const EXP_PER_30 = 215
const EXP_PER_25 = 179
const EXP_PER_20 = 143

// 머니 
const MONEY_PER_MM = 1350
const MONEY_PER_30 = 945
const MONEY_PER_25 = 788
const MONEY_PER_20 = 630

// 팬 
const FAN_PER_MM = 120
const FAN_PER_30 = 60
const FAN_PER_25 = 50
const FAN_PER_20 = 40

// 친애도 
const AFFECTION_PER_MM = 30
const AFFECTION_PER_30 = 14
const AFFECTION_PER_25 = 12
const AFFECTION_PER_20 = 9

// 수록곡 길이 
const MEAN_PLAYTIME = 134
const LEAST_PLAYTIME = 112

// V30 기준 평균 영업 시간 
const MEAN_WORKTIME = 22

// 최대값들 
const MAX_LEVEL = 999
const MAX_TICKET = 500

// 이벤트 유형에 따라 달라지는 변수가 있다. 
var EXP_PER_LIVE = EXP_PER_MM;
var MONEY_PER_LIVE = MONEY_PER_MM;
var FAN_PER_LIVE = FAN_PER_MM;
var AFFECTION_PER_LIVE = AFFECTION_PER_MM;
var POINT_PER_LIVE;
var ITEM_PER_LIVE;

// 영업 1회당 소모하는 스태미너에 따라 달라진다. 
var EXP_PER_WORK;
var MONEY_PER_WORK;
var FAN_PER_WORK;
var AFFECTION_PER_WORK;
var POINT_PER_WORK;
var ITEM_PER_WORK;

// 이벤트 유형에 따라 달라지는 변수가 있다. 
var EXP_PER_EVENT = EXP_PER_MM; 
var MONEY_PER_EVENT = MONEY_PER_MM;
var FAN_PER_EVENT = FAN_PER_MM;
var AFFECTION_PER_EVENT = AFFECTION_PER_MM;
var POINT_PER_EVENT;
var ITEM_REQUIRED_PER_PLAY;	// 이벤트 1회당 소모 재화

// 이벤트 유형에 따라 달라진다. 
var DAILY_ITEM;		// 매일 지급되는 Item 

// 사용자 기기 환경에 따라 달라진다. 
var PLAYTIME = LEAST_PLAYTIME;		// 사용자별 플레이할 곡의 길이 설정 
var WORKTIME = MEAN_WORKTIME;		// 사용자별 영업 소요시간 설정 


// 해당 레벨의 최대 경험치 
var maxExp = function( level )
{
	return ( level * 100 ) - 50;
}

// 해당 레벨의 최대 스태미너 
var maxStamina = function( level )
{
	if( level <= 58 )
		return 60 + ( parseInt(level / 2, 10) );
	
	else if( level <= 148 )
		return 90 + ( parseInt(( level - 60 ) / 3, 10) );
	
	else
		return 120 + ( parseInt(( level - 150 ) / 4, 10) );
}

// 시뮬레이션 함수 
var simulateEvent = function( inData, outData )
{
	////////////////////* 받아온 데이터 복사 *////////////////////
	var level = inData[0],				exp = inData[1],				stamina = inData[2],		ticket = inData[3],			maxDrink = inData[4];
	var item = inData[5],				point = inData[6],				targetPoint = inData[7],	eventType = inData[8],		playType = inData[9];
	var liveConsumption = inData[10],	workConsumption = inData[11],	eventConsumption = inData[12];
	
	
	////////////////////* 추가 변수 선언  *////////////////////
	var liveAffection = 0, workAffection = 0, money = 0, liveFan = 0, workFan = 0;
	var reachablePoint = 0; 
	var liveCount = 0, workCount = 0, eventCount = 0;
	var temp = 0;
	
	
	////////////////////* 시뮬레이션 실행 *////////////////////
	
	while( 1 )
	{
		
	// 쓸 수 있는 자원이 없다면 쥬엘을 사용하여 충전 
	
	if( eventType == THEATER && playType == WORKRUN )	// 시어터 영업런일 경우, 자원 구성: 영업 돌리는 스태미너 + 라이브 돌리는 티켓 + 이벤트 돌리는 재화 
	{
		if( ( stamina < workConsumption ) && ( ticket < liveConsumption ) && ( item < eventConsumption ) )
		{
			if( maxDrink == 0 )	// 최초로 자원이 모두 떨어진 순간의 점수를 기록. 플레이어의 현재 자원으로 도달 가능한 점수임. 
			{
				reachablePoint = point;
			}
			
			maxDrink--;
			stamina += maxStamina( level );
		}
	}
	else if( eventType == TOUR && playType == WORKRUN )	// 투어 영업런일 경우, 자원 구성: 영업 돌리는 스태미너, 이벤트 돌리는 재화 
	{
		if( ( stamina < workConsumption ) && ( item < eventConsumption ) )
		{
			if( maxDrink == 0 )
			{
				reachablePoint = point;
			}
			
			maxDrink--;
			stamina += maxStamina( level );
		}
	}
	else if( playType == LIVERUN )		// 시어터 또는 투어 라이브런일 경우, 자원 구성: 라이브 돌리는 스태미너, 이벤트 돌리는 재화 
	{
		if( ( stamina < liveConsumption ) && ( item < eventConsumption ) )
		{
			if( maxDrink == 0 )
			{
				reachablePoint = point;
			}
			
			maxDrink--;
			stamina += maxStamina( level );
		}
	}
	
	
	
	// 자원 사용
	 
	if( playType == LIVERUN )			//라이브런 
	{
		// 일반 라이브 실행
		temp = parseInt(stamina / liveConsumption, 10);
		
		exp				+=	temp * EXP_PER_LIVE;
		point			+=	temp * POINT_PER_LIVE;
		item			+=	temp * ITEM_PER_LIVE;
		money			+=	temp * MONEY_PER_LIVE;
		liveAffection	+=	temp * AFFECTION_PER_LIVE;
		liveFan			+=	temp * FAN_PER_LIVE;
		liveCount		+=	temp;
		
		stamina %= liveConsumption;
		
		// 시어터 이벤트라면, 소지한 라이브 티켓 사용 가능
		if( (eventType == THEATER) && (ticket >= 30) )
		{
			// MM 난이도로 티켓 라이브 실행
			temp = ticket / 30;
			
			// 티켓 라이브에선 exp와 money가 증가하지 않음. 
			point			+=	temp * Math.ceil( (POINT_PER_LIVE / (liveConsumption/30)) * 0.7 );
			item			+=	temp * Math.ceil( (ITEM_PER_LIVE / (liveConsumption/30)) * 0.7 );
			liveAffection	+=	temp * parseInt(AFFECTION_PER_LIVE / 2, 10);
			liveFan			+=	temp * parseInt(FAN_PER_LIVE / 2, 10);
			liveCount		+=	parseInt(temp / 10, 10) + 1;
			
			ticket %= 30;
		}
	}
	else if( playType == WORKRUN )		//영업런
	{
		// 영업 실행
		temp = parseInt(stamina / workConsumption, 10);
		
		// 시어터 이벤트의 영업에서만 라이브 티켓을 획득함. 
		if( eventType == THEATER )
		{
			ticket += temp * workConsumption;
		}
		
		// 투어 이벤트의 영업에서만 포인트와 재화를 획득함. 
		if( eventType == TOUR )
		{
			point	+=	temp * POINT_PER_WORK;
			item	+=	temp * ITEM_PER_WORK;
		}
		
		exp				+=	temp * EXP_PER_WORK; 
		money			+=	temp * MONEY_PER_WORK;
		workAffection	+=	temp * AFFECTION_PER_WORK;
		workFan			+=	temp * FAN_PER_WORK;
		workCount		+=	temp;
		
		stamina %= workConsumption;
		
		// 시어터 이벤트일 경우, 영업으로 얻은 라이브 티켓으로 티켓 라이브를 돌린다. 
		if( eventType == THEATER )
		{
			// 티켓 라이브 실행
			temp = parseInt(ticket / liveConsumption, 10);
			
			// 티켓 라이브에선 exp와 money가 증가하지 않음. 
			point			+=	temp * POINT_PER_LIVE;
			item			+=	temp * ITEM_PER_LIVE;
			liveAffection	+=	temp * AFFECTION_PER_LIVE;
			liveFan			+=	temp * FAN_PER_LIVE;
			liveCount		+=	temp;
			
			ticket %= liveConsumption;
		}
	}
	
	// 이벤트 라이브 실행
	temp = parseInt(item / eventConsumption, 10);
	
	// 이벤트 라이브에선 item이 증가하지 않음. 
	exp				+=	temp * EXP_PER_EVENT;
	point			+=	temp * POINT_PER_EVENT;
	money			+=	temp * MONEY_PER_EVENT;
	liveAffection	+=	temp * AFFECTION_PER_EVENT;
	liveFan			+=	temp * FAN_PER_EVENT;
	eventCount		+=	temp;
	
	item %= eventConsumption;
	
	
	// 레벨업 실행
	while( 1 )
	{
		if( ( level >= MAX_LEVEL ) || ( exp < maxExp(level) ) ) {
			break;
		}
		
		exp -= maxExp( level );
		level++;
		stamina += maxStamina( level );
	}
	
	// 목표 점수 도달시 시뮬레이션 무한 루프 종료
	if( point >= targetPoint )
		break;
	}
	
	// 추가적인 자원 소모 없이 목표 점수를 달성했다면
	// reachablePoint == reachedPoint 이다.
	if( maxDrink >= 0 ){
		reachablePoint = point;
	}
	
	outData[0] = level,				outData[1] = exp,				outData[2] = maxDrink,			outData[3] = stamina;
	outData[4] = ticket,			outData[5] = item,				outData[6] = money,				outData[7] = liveAffection;
	outData[8] = workAffection,		outData[9] = liveFan,			outData[10] = workFan,			outData[11] = liveCount;
	outData[12] = workCount,		outData[13] = eventCount,		outData[14] = reachablePoint,	outData[15] = point;
	
	return outData;
}


var calc = function( data )
{
	////////////////////* 폼에서 데이터 읽어들이며 유효성 검사 수행 *////////////////////
	
	var errorMSG = "";
	// 미입력 여부 확인
	if ( data.eventType === null || data.eventType === undefined ) errorMSG += "예기치 못한 오류: 이벤트 유형이 정의되지 않음.\n";
	if ( data.playType === null || data.playType === undefined ) errorMSG += "예기치 못한 오류: 플레이 유형이 정의되지 않음.\n";
	if ( data.printAll === null || data.printAll === undefined ) errorMSG += "예기치 못한 오류: 결과 요약 여부가 정의되지 않음.\n";
	
	data.eventType = Number(data.eventType);
	data.playType = Number(data.playType);
	data.printAll = Number(data.printAll);
	
	if ( data.eventType < 1 || data.eventType > 3 ) {
		alert("유효하지 않은 data.eventType 값: " + data.eventType);
		return;
	}
	if ( data.eventType < 1 || data.eventType > 2 ) {
		alert("유효하지 않은 data.playType 값: " + data.playType);
		return;
	}
	
	if( data.eventType == 1 ) data.eventType = THEATER;
	else if( data.eventType == 2 ) data.eventType = TOUR;
	else if( data.eventType == 3 ) data.eventType = FIRST;
	
	if( data.playType == 1 ) data.playType = LIVERUN;
	else if( data.playType == 2 ) data.playType = WORKRUN;
	
	if ( (data.eventType == TOUR) && (data.playType == WORKRUN) ) {
		data.liveConsumption = 0;
	}
	
	if ( data.playType == LIVERUN ) {
		data.workConsumption = 0;
	}
	
	if ( data.eventType == TOUR ) {
		data.currentTicket = 0;
	}
	
	
	
	if ( data.leftDay === null || data.leftDay === undefined ) errorMSG += "남은 시간(일)을 입력해주세요.\n";
	if ( data.leftHour === null || data.leftHour === undefined ) errorMSG += "남은 시간(시간)을 입력해주세요.\n";
	if ( data.regenStaminaUsage === null || data.regenStaminaUsage === undefined ) errorMSG += "자연회복 스태미너 활용률을 입력해주세요.\n";
	if ( data.currentLevel === null || data.currentLevel === undefined ) errorMSG += "현재 레벨을 입력해주세요.\n";
	if ( data.currentExp === null || data.currentExp === undefined ) errorMSG += "현재 경험치를 입력해주세요.\n";
	if ( data.currentStamina === null || data.currentStamina === undefined ) errorMSG += "현재 스태미너를 입력해주세요.\n";
	if ( data.currentItem === null || data.currentItem === undefined ) errorMSG += "소지한 이벤트 재화 개수를 입력해주세요.\n";
	if ( data.liveConsumption === null || data.liveConsumption === undefined ) errorMSG += "일반곡 배수를 선택해주세요.\n";
	if ( data.eventConsumption === null || data.eventConsumption === undefined ) errorMSG += "이벤곡 배수를 선택해주세요.\n";
	if ( data.drink10 === null || data.drink10 === undefined ) errorMSG += "사용할 10 드링크 개수를 입력해주세요.\n";
	if ( data.drink20 === null || data.drink20 === undefined ) errorMSG += "사용할 20 드링크 개수를 입력해주세요.\n";
	if ( data.drink30 === null || data.drink30 === undefined ) errorMSG += "사용할 30 드링크 개수를 입력해주세요.\n";
	if ( data.maxDrink === null || data.maxDrink === undefined ) errorMSG += "사용할 맥스 드링크 개수를 입력해주세요.\n";
	if ( data.currentPoint === null || data.currentPoint === undefined ) errorMSG += "현재 이벤트 점수를 입력해주세요.\n";
	if ( data.targetPoint === null || data.targetPoint === undefined ) errorMSG += "목표 이벤트 점수를 입력해주세요.\n";
	if ( data.playType == WORKRUN ) {
		if ( data.currentTicket === null || data.currentTicket === undefined ) errorMSG += "현재 라이브 티켓 개수를 입력해주세요.\n";
		if ( data.workConsumption === null || data.workConsumption === undefined ) errorMSG += "영업 종류를 선택해주세요.\n";
	}
	
	data.leftDay = Number( data.leftDay );
	data.leftHour = Number( data.leftHour );
	data.regenStaminaUsage = Number( data.regenStaminaUsage );
	data.currentLevel = Number( data.currentLevel );
	data.currentExp = Number( data.currentExp );
	data.currentStamina = Number( data.currentStamina );
	data.currentItem = Number( data.currentItem );
	data.liveConsumption = Number( data.liveConsumption );
	data.eventConsumption = Number( data.eventConsumption );
	data.drink10 = Number( data.drink10 );
	data.drink20 = Number( data.drink20 );
	data.drink30 = Number( data.drink30 );
	data.maxDrink = Number( data.maxDrink );
	data.currentPoint = Number( data.currentPoint );
	data.targetPoint = Number( data.targetPoint );
	
	if ( data.playType == WORKRUN ) {
		data.currentTicket = Number( data.currentTicket );
		data.workConsumption = Number( data.workConsumption );
	}
	
	
	// 값의 유효성 확인
	if ( data.leftDay < 0 ) errorMSG += "남은 시간(일) 값이 유효하지 않습니다.\n";
	if ( data.leftHour < 0 || data.leftHour > 23 ) errorMSG += "남은 시간(시간) 값이 유효하지 않습니다.\n";
	if ( data.regenStaminaUsage < 0 || data.regenStaminaUsage > 100 ) errorMSG += "자연회복 스태미너 활용률 값이 유효하지 않습니다.\n";
	if ( data.currentLevel < 0 || data.currentLevel > 999 ) errorMSG += "현재 레벨 값이 유효하지 않습니다.\n";
	if ( data.currentExp < 0 ) errorMSG += "현재 경험치 값이 유효하지 않습니다.\n";
	if ( data.currentStamina < 0 ) errorMSG += "현재 스태미너 값이 유효하지 않습니다.\n";
	if ( data.currentItem < 0 ) errorMSG += "소지한 이벤트 재화 개수 값이 유효하지 않습니다.\n";
	if ( ! (data.eventType == TOUR && data.playType == WORKRUN) && data.liveConsumption < 1 ) errorMSG += "일반곡 배수 값이 유효하지 않습니다.\n";
	if ( data.eventConsumption < 1 ) errorMSG += "이벤곡 배수 값이 유효하지 않습니다.\n";
	if ( data.drink10 < 0 ) errorMSG += "사용할 10 드링크 개수 값이 유효하지 않습니다.\n";
	if ( data.drink20 < 0 ) errorMSG += "사용할 20 드링크 개수 값이 유효하지 않습니다.\n";
	if ( data.drink30 < 0 ) errorMSG += "사용할 30 드링크 개수 값이 유효하지 않습니다.\n";
	if ( data.maxDrink < 0 ) errorMSG += "사용할 맥스 드링크 개수 값이 유효하지 않습니다.\n";
	if ( data.currentPoint < 0 ) errorMSG += "현재 이벤트 점수 값이 유효하지 않습니다.\n";
	if ( data.targetPoint < 1 ) errorMSG += "목표 이벤트 점수 값이 유효하지 않습니다.\n";
	if ( data.playType == WORKRUN ) {
		if ( data.eventType != TOUR && data.currentTicket < 0 ) errorMSG += "현재 라이브 티켓 값이 유효하지 않습니다.\n";
		if ( data.workConsumption < 1 ) errorMSG += "영업 종류 값이 유효하지 않습니다.\n";
	}
	
	if ( errorMSG != "" ) {
		alert( errorMSG );
		return;
	}
	
	var resultText = "";
	
	if (data.eventType == THEATER) {
		resultText += '<p>PSTHEATER & ';
	}
	else if (data.eventType == TOUR) {
		resultText += '<p>PSTOUR & ';
	}
	
	if (data.playType == LIVERUN) {
		resultText += '라이브런<br></p>';
	}
	else if (data.playType == WORKRUN) {
		resultText += '영업런<br></p>';
	}
	
	/* 추가로 필요한 변수들 선언 */
	var eventDuration = 0, stamina = 0, ticket = 0, item = 0;
	
	// 데이터를 함수과 주고받을 때 사용
	var inData = new Array();
	var outData = new Array();
	
	// 임시 데이터 저장용
	var originalStamina = 0;	// 출력결과에 본래 스태미너를 표시하기 위해 
	var originalItem = 0;		// 출력결과에 본래 이벤트 재화 개수를 표시하기 위해 
	
	////////////////////* 폼에서 읽어들인 데이터 가공 *////////////////////
	
	if( data.printAll )
	{
		resultText += '<p><br></p>';
		resultText += '<p>[ 전제 조건 ]<br></p>';
		resultText += '<p>- MM 난이도<br></p>';
		resultText += '<p>- S랭크 클리어<br></p>';
		if ( data.eventType == TOUR ) {
			if ( data.playType == LIVERUN ) {
				resultText += '<p>- PUSH 곡<br></p>';
			}
			resultText += '<p>- 이벤트곡 5.0배<br></p>';
		}
	}
	
	
	// 이벤트 유형에 따라 기초 데이터 설정
	
	if( data.eventType == THEATER || data.eventType == FIRST )		// 시어터류. 재화를 180 단위로 사용 가능. 
	{
		// 시어터류 이벤트에선 영업으로 점수나 재화를 얻지 못한다. 
		POINT_PER_WORK = 0;
		ITEM_PER_WORK = 0;
		
		// 라이브에서 획득하는 점수, 재화 
		POINT_PER_LIVE = 85;
		ITEM_PER_LIVE = 85;
		
		POINT_PER_EVENT = 537;
		ITEM_REQUIRED_PER_PLAY = 180;	// 이벤트 라이브를 1회 돌리는데 필요한 재화
		
		// 매일 지급하는 재화 
		DAILY_ITEM = 180 * 2;
		
		// 1주년 이벤트 때 이벤트 라이브에선 경험치과 친애도, 팬을 2배로 줬음. 
		if( data.eventType == FIRST )
		{
			//MONEY_PER_EVENT *= 2; // 머니도 2배였는진 모르겠음..
			FAN_PER_EVENT *= 2;
			AFFECTION_PER_EVENT *= 2;
			EXP_PER_EVENT *= 2;
		}
	}
	
	else if( data.eventType == TOUR )	// 투어. 진척도를 재화 단위로 사용, 20단위로 사용 가능.
	{
		// 라이브에서 획득하는 점수, 재화 
		POINT_PER_LIVE = 116;	// 1.0배짜리 노멀곡 기준
		ITEM_PER_LIVE = parseInt(30 / 5, 10);
		
		POINT_PER_EVENT = 144 * 5;
		ITEM_REQUIRED_PER_PLAY = 20;	// 이벤트 라이브를 1회 돌리는데 필요한 재화
		
		// 매일 지급하는 재화 
		DAILY_ITEM = 20 * 2;
	}
	
	if( data.eventType == FIRST )
	{
		resultText += '<p><br></p>';
		resultText += '<p>1주년 이벤트 당시의 진행 기간을 자동 설정합니다.<br></p>';
		eventDuration = 13 * 24 * 60;
		item += 13 * DAILY_ITEM;
	}
	
	if( data.eventType != FIRST )
	{
		item += data.leftDay * DAILY_ITEM;				// 남은일수만큼 일일 이벤트 재화를 지급받는다. 시뮬레이션을 수행한 당일의 일일재화는 아직 수령하지 않은 경우에 한해서 포함.
		if (!data.receivedDailyItem) {
			alert('!receivedDailyItem', data.receivedDailyItem);
			item += DAILY_ITEM;
		}
		eventDuration = data.leftDay * 24 * 60;
		
		if( data.leftHour >= 21 ) item += DAILY_ITEM;	// 이벤트 종료시각이 20시 59분이므로, 21시부터 24시까지는 (남은일수 - 1)日 (23 ~ 21)時間 으로 표시된다.
									// 이 경우, 위 코드에서 실제보다 1개 적게 이벤트 재화를 지급받는 것으로 계산되었으므로 정정한다. 
		eventDuration += data.leftHour * 60;
	}
	
	//resultText += '<p>획득 재화: ' + item + '<br></p>'; 
	//resultText += '<p>잔여 기간: ' + eventDuration + '<br></p>'; 
	
	
	stamina += parseInt(( parseInt(( eventDuration / 5 ), 10) * data.regenStaminaUsage ) / 100, 10);
	//resultText += '<p>자연 회복 스태미너 ' + stamina + ' 반영함.<br></p>'; 
	
	// 플레이어 정보 입력
	// 이미 폼에서 입력됨
	
	//1주년 이벤트는 이미 끝났으므로 스태미너, 라이브 티켓 등 자동 설정.
	if( data.eventType == FIRST )
	{
		stamina += maxStamina( playerLevel );
	}
	else if( data.eventType != FIRST )
	{
		originalStamina = data.currentStamina;
		stamina += data.currentStamina;
	}
	
	
	if( data.eventType == FIRST )
	{
		ticket = MAX_TICKET;
	}
	else if( data.eventType == THEATER )
	{
		ticket = data.currentTicket;
	}
	else if( data.eventType == TOUR )
	{
		ticket = 0;
	}
	
	// 소지 드링크 입력
	
	stamina += data.drink10 * 10;
	stamina += data.drink20 * 20;
	stamina += data.drink30 * 30;
	
	
	// 기획득 재화와 점수 입력
	if( data.eventType != FIRST )
	{
		if( data.eventType == TOUR )	originalItem = data.currentItem * ITEM_REQUIRED_PER_PLAY;
		else					originalItem = data.currentItem;
		
		if( data.eventType == THEATER )
		{
			item += data.currentItem;
		}
		
		if( data.eventType == TOUR )
		{
			item += data.currentItem * ITEM_REQUIRED_PER_PLAY;
		}
	}
	
	// 1주년 이벤은 이미 끝났으므로 이벤트 점수 자동 설정. 
	if( data.eventType == FIRST )
	{
		data.currentPoint = 0;
	}
	
	// 플레이 유형과 라이브, 영업, 이벤트 배수 입력 
	
	if( data.playType == WORKRUN )		// 영업런인 경우, 기초 데이터들의 값을 조정. 
	{
		// 티켓 라이브만 돌릴 것이므로, 그에 맞게 기초 데이터를 조정. 
		EXP_PER_LIVE = 0;
		MONEY_PER_LIVE = 0;
		// 아래 데이터들은 정수형이라서 나누는 과정에서 오차가 발생하므로, 나중에 라이브 배율에서 함께 조정하기로 함. 
		// AFFECTION_PER_LIVE
		// FAN_PER_LIVE
		// POINT_PER_LIVE
		// ITEM_PER_LIVE
		
		// 영업의 종류와 배수를 입력받고, 그에 따라 영업의 기초 데이터를 조정. 
		
		//투어일 경우에만 영업으로 재화와 포인트를 획득한다. 
		if( data.eventType == TOUR )
		{
			ITEM_PER_WORK = parseInt(data.workConsumption / 5, 10);
			POINT_PER_WORK = parseInt(data.workConsumption / 5, 10) * 8;
		}
		else
		{
			ITEM_PER_WORK = 0;
			POINT_PER_WORK = 0;
		}
		
		if( data.workConsumption == 20 || data.workConsumption == 40 )
		{
			EXP_PER_WORK = EXP_PER_20;
			MONEY_PER_WORK = MONEY_PER_20;
			FAN_PER_WORK = FAN_PER_20;
			AFFECTION_PER_WORK = AFFECTION_PER_20; 
		}
		else if( data.workConsumption == 25 || data.workConsumption == 50 )
		{
			EXP_PER_WORK = EXP_PER_25;
			MONEY_PER_WORK = MONEY_PER_25;
			FAN_PER_WORK = FAN_PER_25;
			AFFECTION_PER_WORK = AFFECTION_PER_25; 
		}
		else if( data.workConsumption == 30 || data.workConsumption == 60 )
		{
			EXP_PER_WORK = EXP_PER_30;
			MONEY_PER_WORK = MONEY_PER_30;
			FAN_PER_WORK = FAN_PER_30;
			AFFECTION_PER_WORK = AFFECTION_PER_30; 
		}
	}
	
	if( data.eventType == TOUR && data.playType == WORKRUN ) {
		data.liveConsumption = 0;
	} else {
		temp = parseInt(data.liveConsumption / 30, 10);
		ITEM_PER_LIVE *= temp;
		POINT_PER_LIVE *= temp;
		if( data.playType == WORKRUN ) FAN_PER_LIVE *= temp;
		if( data.playType == WORKRUN ) AFFECTION_PER_LIVE *= temp;
		
		if( data.playType == WORKRUN )
		{
			AFFECTION_PER_LIVE = parseInt(AFFECTION_PER_LIVE / 2, 10);
			FAN_PER_LIVE = parseInt(FAN_PER_LIVE / 2, 10);
			POINT_PER_LIVE = Math.ceil( POINT_PER_LIVE * 0.7 );
			ITEM_PER_LIVE = Math.ceil( ITEM_PER_LIVE * 0.7 );
		}
	}
	
	data.eventConsumption *= ITEM_REQUIRED_PER_PLAY;
	temp = parseInt(data.eventConsumption / ITEM_REQUIRED_PER_PLAY, 10);
	POINT_PER_EVENT *= temp;
	
	// 목표 점수 입력 
	
	// 1주년 이벤트는 이벤트 곡에서의 2배 경험치, 티켓런 배율의 확장 등 수치의 변화만 있고 시어터와 동일한 방식이므로, 
	// 코드의 간결함을 위해 입력 단계에서 세부 수치의 수정 이후에는 시어터로 간주한다. 
	if( data.eventType == FIRST ) data.eventType = THEATER;
	
	////////////////////* 시뮬레이션 함수에 전달할 데이터 정리 *////////////////////
	inData[0] = data.currentLevel,		inData[1] = data.currentExp,			inData[2] = stamina,		inData[3] = ticket,			inData[4] = data.maxDrink;
	inData[5] = item,				inData[6] = data.currentPoint,		inData[7] = data.targetPoint,	inData[8] = data.eventType,		inData[9] = data.playType;
	inData[10] = data.liveConsumption,	inData[11] = data.workConsumption,	inData[12] = data.eventConsumption;
	
	/*
	resultText += '<p>---inData(parameters)---<br></p>';
	resultText += '<p>data.currentLevel ',data.currentLevel,'<br></p>';
	resultText += '<p>data.currentExp ',data.currentExp,'<br></p>';
	resultText += '<p>stamina ',stamina,'<br></p>';
	resultText += '<p>ticket ',ticket,'<br></p>';
	resultText += '<p>data.maxDrink ',data.maxDrink,'<br></p>';
	resultText += '<p>item ',item,'<br></p>';
	resultText += '<p>data.currentPoint ',data.currentPoint,'<br></p>';
	resultText += '<p>data.targetPoint ',data.targetPoint,'<br></p>';
	resultText += '<p>data.eventType ',data.eventType,'<br></p>';
	resultText += '<p>data.playType ',data.playType,'<br></p>';
	resultText += '<p>liveConsumption ',data.liveConsumption,'<br></p>';
	resultText += '<p>data.workConsumption ',data.workConsumption,'<br></p>';
	resultText += '<p>data.eventConsumption ',data.eventConsumption,'<br></p>';
	resultText += '<p>---inData(parameters)---<br></p>';
	
	resultText += '<p>---fundamentalData---<br></p>';
	resultText += '<p>exp per live ',EXP_PER_LIVE,'<br></p>';
	resultText += '<p>money per live ',MONEY_PER_LIVE,'<br></p>';
	resultText += '<p>fan per live ',FAN_PER_LIVE,'<br></p>';
	resultText += '<p>affection per live ',AFFECTION_PER_LIVE,'<br></p>';
	resultText += '<p>point per live ',POINT_PER_LIVE,'<br></p>';
	resultText += '<p>item per live ',ITEM_PER_LIVE,'<br></p>';
	resultText += '<p>exp per work ',EXP_PER_WORK,'<br></p>';
	resultText += '<p>money per work ',MONEY_PER_WORK,'<br></p>';
	resultText += '<p>fan per work ',FAN_PER_WORK,'<br></p>';
	resultText += '<p>affection per work ',AFFECTION_PER_WORK,'<br></p>';
	resultText += '<p>point per work ',POINT_PER_WORK,'<br></p>';
	resultText += '<p>item per work ',ITEM_PER_WORK,'<br></p>';
	resultText += '<p>exp per event ',EXP_PER_EVENT,'<br></p>';
	resultText += '<p>money per event ',MONEY_PER_EVENT,'<br></p>';
	resultText += '<p>fan per event ',FAN_PER_EVENT,'<br></p>';
	resultText += '<p>affection per event ',AFFECTION_PER_EVENT,'<br></p>';
	resultText += '<p>point per event ',POINT_PER_EVENT,'<br></p>';
	resultText += '<p>item per event ',ITEM_REQUIRED_PER_PLAY,'<br></p>';
	resultText += '<p>daily item ',DAILY_ITEM,'<br></p>';
	resultText += '<p>playtime ',PLAYTIME,'<br></p>';
	resultText += '<p>worktime ',WORKTIME,'<br></p>';
	resultText += '<p>---fundamentalData---<br></p>';
	*/
	
	////////////////////* 시뮬레이션 실행  *////////////////////
	simulateEvent( inData, outData );
	
	
	////////////////////* 시뮬레이션 결과 출력 *////////////////////
	
	var newLevel = outData[0], newExp = outData[1];
	var newMaxDrink = outData[2], newStamina = outData[3];
	var newTicket = outData[4], newItem = outData[5];
	var money = outData[6], liveAffection = outData[7], workAffection = outData[8];
	var liveFan = outData[9], workFan = outData[10];
	var liveCount = outData[11], workCount = outData[12], eventCount = outData[13];
	var reachablePoint = outData[14], reachedPoint = outData[15];
	
	if( data.printAll )
	{
		resultText += '<p><br></p>';
		resultText += '<p><br></p>';
		resultText += '<p>레벨<br></p>';
		resultText += '<p>' + data.currentLevel + ' -> ' + newLevel + '<br></p>';
		resultText += '<p>경험치<br></p>';
		resultText += '<p>' + data.currentExp + ' -> ' + newExp + '<br></p>';
		resultText += '<p><br></p>';
		resultText += '<p>맥스드링크<br></p>';
		resultText += '<p>' + data.maxDrink + ' -> ' + newMaxDrink + '<br></p>';
		resultText += '<p>스태미너<br></p>';
		resultText += '<p>' + originalStamina + ' -> ' + newStamina + '<br></p>';
		resultText += '<p>라이브 티켓<br></p>';
		resultText += '<p>' + ticket + ' -> ' + newTicket + '<br></p>';
		
		if( data.eventType == TOUR ) {
			resultText += '<p>이벤트 재화(진행도)<br></p>';
			resultText += '<p>' + parseInt(originalItem/20, 10) + '(' + (originalItem%20) + ') -> ' + parseInt(newItem/20, 10) + '(' + (newItem%20) + ')<br></p>';
		} else {
			resultText += '<p>이벤트 재화<br></p>';
			resultText += '<p>' + originalItem + ' -> ' + newItem + '<br></p>';
		}
		
		resultText += '<p><br></p>';
		resultText += '<p>획득 머니<br></p>';
		resultText += '<p>' + money + '<br></p>';
		resultText += '<p><br></p>';
		resultText += '<p>획득 친애도<br></p>';
		resultText += '<p>' + (liveAffection + workAffection) + '<br></p>';
		resultText += '<p>- 라이브 ' + liveAffection + '<br></p>';
		resultText += '<p>- 업무 ' + workAffection + '<br></p>';
		resultText += '<p><br></p>';
		resultText += '<p>획득 팬<br></p>';
		resultText += '<p>' + (liveFan + workFan) + '<br></p>';
		resultText += '<p>- 라이브 ' + liveFan + '<br></p>';
		resultText += '<p>- 업무 ' + workFan + '<br></p>'; 
		resultText += '<p><br></p>';
		resultText += '<p><br></p>';
		resultText += '<p>일반곡 플레이 횟수<br></p>';
		resultText += '<p>- <span style="color:#FB9FCE">' + liveCount + '</span>회<br></p>';
		resultText += '<p>영업 횟수<br></p>';
		resultText += '<p>- <span style="color:#FB9FCE">' + workCount + '</span>회<br></p>';
		resultText += '<p>이벤트곡 플레이 횟수<br></p>';
		resultText += '<p>- <span style="color:#FB9FCE">' + eventCount + '</span>회<br></p>';
	}
	
	resultText += '<p><br></p>';
	resultText += '<p>보유 자원으로 가능한 점수<br></p>';
	resultText += '<p>- <span style="color:#FB9FCE">' + reachablePoint + '점</span><br></p>';
	
	if( data.printAll )
	{
		resultText += '<p>시뮬레이션에서 도달한 점수<br></p>';
		resultText += '<p>- ' + reachedPoint + '점<br></p>';
	}
	
	if( reachablePoint == reachedPoint ) {
		resultText += '<p>! 보유 자원으로 도달 가능한 점수가 부정확하게 표시되었을 수 있습니다.<br></p>';
		resultText += '<p>(목표 점수 근처까지만 시뮬레이션이 진행됩니다)<br></p>';
	}
	
	resultText += '<p><br></p>';
	
	if( newMaxDrink < 0 )
	{
		resultText += '<p><span style="color: red">' + (newMaxDrink * -50) + '개의 쥬엘</span>을 더 사용해야 목표 점수를 달성할 수 있습니다.<br></p>';
	}
	else
	{
		resultText += '<p><span style="color:#A3CCA3">목표 점수를 달성하고도 ' + (newMaxDrink * 50) + '개의 쥬엘(또는 ' + newMaxDrink + '개의 맥스드링크)이 남습니다.</span><br></p>';
	}
	
	// 플레이타임 계산
	var liveTime = 0.0, workTime = 0.0;
	var dailyLiveTime = 0, dailyWorkTime = 0;
	
	if( data.playType == LIVERUN )
	{
		liveTime = (liveCount + eventCount) * (LEAST_PLAYTIME + 47.0 + 2.0);	//라이브 로딩시간 47초, 스태미너 회복시간 2초. 
	}
	if( data.playType == WORKRUN )
	{
		workTime += 22.0 * workCount;	//영업 1회에 로딩시간 포함 평균 22초 소요.
		
		workTime += (5.0 + 5.0) * liveCount;	//영업런일 경우, 라이브 탭 - 영업 탭 이동시간 5초씩 소요. 영업 시간에 포함하기로 함. 
		
		liveTime += (liveCount + eventCount) * (LEAST_PLAYTIME + 47.0);	//라이브 로딩시간 47초. 스태미너 회복시간은 고려하지 않음(영업에서 하므로). 
	}
	
	resultText += '<p><br></p>';
	resultText += '<p>전체 플레이타임 합계<br></p>';
	resultText += '<p><span style="color:red">' + parseInt( (liveTime + workTime) / 60, 10 ) + '분</span><br></p>';
	if( data.printAll )
	{
		resultText += '<p>- 라이브 ' + parseInt(liveTime / 60, 10) + '분<br></p>';
		resultText += '<p>- 영업 ' + parseInt(workTime / 60, 10) + '분<br></p>';
	}
	
	// 1시간당 평균 플레이타임 * 24 
	dailyLiveTime = parseInt( (liveTime / (eventDuration / 60.0)) * 24.0, 10 );
	dailyWorkTime = parseInt( (workTime / (eventDuration / 60.0)) * 24.0, 10 );
	
	var dailyPlayTime = dailyLiveTime + dailyWorkTime;
	
	resultText += '<p><br></p>';
	resultText += '<p>24시간당 환산 플레이타임<br></p>';
	resultText += '<p><span style="color:red">' + parseInt(dailyPlayTime / 60, 10) + '분</span><br></p>';
	if( data.printAll )
	{
		resultText += '<p>- 라이브 ' + parseInt(dailyLiveTime / 60, 10) + '분<br></p>';
		resultText += '<p>- 영업 ' + parseInt(dailyWorkTime / 60, 10) + '분<br></p>';
	}
	return resultText;
}