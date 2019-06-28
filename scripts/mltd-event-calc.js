// 시뮬레이션 함수와의 입출력 데이터셋의 크기 
const INDATA_SIZE = 20
const OUTDATA_SIZE = 20

// 이벤트와 플레이 유형의 가독성을 증진 
const THEATER = 0
const TOUR = 1
const FIRST = 2
const LIVERUN = 3
const WORKRUN = 4

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
const MAX_LEVEL = 400 // 2주년 이후로 999레벨로 업데이트 예정. 
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
var ITEM_PER_EVENT;	// 이벤트 1회당 소모 재화

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
		return 60 + ( parseInt(level / 2) );
	
	else if( level <= 148 )
		return 90 + ( parseInt(( level - 60 ) / 3) );
	
	else
		return 120 + ( parseInt(( level - 150 ) / 4) );
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
		temp = parseInt(stamina / liveConsumption);
		
		exp				+=	temp * EXP_PER_LIVE;
		point			+=	temp * POINT_PER_LIVE;
		item			+=	temp * ITEM_PER_LIVE;
		money			+=	temp * MONEY_PER_LIVE;
		liveAffection	+=	temp * AFFECTION_PER_LIVE;
		liveFan			+=	temp * FAN_PER_LIVE;
		liveCount		+=	temp;
		
		stamina %= liveConsumption;
	}
	else if( playType == WORKRUN )		//영업런
	{
		// 영업 실행
		temp = parseInt(stamina / workConsumption);
		
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
			temp = parseInt(ticket / liveConsumption);
			
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
	temp = parseInt(item / eventConsumption);
	
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
		if( ( level >= MAX_LEVEL ) || ( exp < maxExp(level) ) )
			break;
		
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


var main = function()
{
	////////////////////* 변수 선언 *////////////////////
	
	
	// 이벤트 유형, 이벤트 기간, 자연 회복 스태미너 사용 비율 
	var eventType = 0, eventDuration = 0, generatedStaminaUsage = 0;
	
	// 레벨, 경험치, 스태미너, 티켓, 맥드링  
	var level = 0, exp = 0, stamina = 0, ticket = 0, maxDrink = 0;
	
	// 재화, 점수, 목표 점수  
	var item = 0, point = 0, targetPoint = 0;
	
	// 플레이 유형, 라이브 배수, 영업 소모 스태미너, 이벤트 배수  
	var playType = 0, liveConsumption = 0, workConsumption = 0, eventConsumption = 0;
	
	// 데이터를 함수과 주고받을 때 사용 
	var inData = new Array();
	var outData = new Array();
	
	// 임시 데이터 저장용
	var temp = 0;
	var originalStamina = 0;	// 출력결과에 본래 스태미너를 표시하기 위해 
	var originalItem = 0;		// 출력결과에 본래 이벤트 재화 개수를 표시하기 위해 
	
	var i = 0;
	var tempStr = "";
	
	////////////////////* 사용자에게서 데이터 입력 *////////////////////
	document.write('Comet<br />');
	document.write('{\t[ 전제 조건 ]\t\t\t\t\t\t}<br />'); 
	document.write('{\tMM 난이도, S랭크 클리어\t\t\t\t\t}<br />');
	document.write('{\tPUSH 악곡, 이벤트곡 5.0배 효율\t\t\t\t}<br />'); 
	document.write('<br /><br />'); 
	
	do {
		eventType = Number(prompt('<br />이벤트 유형 ( 1: 시어터, 2 : 투어, 3 : 1주년 )<br />', '-1'));
	} while ( !(eventType === 1 || eventType === 2 || eventType === 3) );
	
	if( eventType == 1 ) eventType = THEATER;
	else if( eventType == 2 ) eventType = TOUR;
	else if( eventType == 3 ) eventType = FIRST;
	
	
	
	// 이벤트 유형에 따라 기초 데이터 설정
	
	if( eventType == THEATER || eventType == FIRST )		// 시어터류. 재화를 180 단위로 사용 가능. 
	{
		// 시어터류 이벤트에선 영업으로 점수나 재화를 얻지 못한다. 
		POINT_PER_WORK = 0;
		ITEM_PER_WORK = 0;
		
		// 라이브에서 획득하는 점수, 재화 
		POINT_PER_LIVE = 85;
		ITEM_PER_LIVE = 85;
		
		POINT_PER_EVENT = 537;
		ITEM_PER_EVENT = 180;	// 이벤트 라이브를 1회 돌리는데 필요한 재화
		
		// 매일 지급하는 재화 
		DAILY_ITEM = 180;
		
		// 1주년 이벤트 때 이벤트 라이브에선 경험치과 친애도, 팬을 2배로 줬음. 
		if( eventType == FIRST )
		{
			//MONEY_PER_EVENT *= 2; // 머니도 2배였는진 모르겠음..
			FAN_PER_EVENT *= 2;
			AFFECTION_PER_EVENT *= 2;
			EXP_PER_EVENT *= 2;
		}
	}
	
	else if( eventType == TOUR )	// 투어. 진척도를 재화 단위로 사용, 20단위로 사용 가능.
	{
		// 라이브에서 획득하는 점수, 재화 
		POINT_PER_LIVE = 140;
		ITEM_PER_LIVE = parseInt(30 / 5);
		
		POINT_PER_EVENT = 144 * 5;
		ITEM_PER_EVENT = 20;	// 이벤트 라이브를 1회 돌리는데 필요한 재화
		
		// 매일 지급하는 재화 
		DAILY_ITEM = 20;
	}
	
	if( eventType == FIRST )
	{
		document.write('<br />1주년 이벤트 당시의 진행 기간을 자동 설정합니다.<br />');
		eventDuration = 13 * 24 * 60;
		item += 13 * DAILY_ITEM;
	}
	
	if( eventType != FIRST )
	{
		do {
			temp = Number(prompt('이벤트 종료까지 남은 기간 입력\n(이벤트 미션의 남은 기간에서 日(일) 앞에 적힌 값을 입력)', '-1'));
		} while (temp < 0);
		item += temp * DAILY_ITEM;				// 남은일수만큼 이벤트 재화를 지급받는다. 시뮬레이션 시작 당일은 이미 지급받았을 것이므로 제외. 
		eventDuration = temp * 24 * 60;
		
		do {
			temp = Number(prompt('이벤트 종료까지 남은 기간 입력\n(이벤트 미션의 남은 기간에서 時間(시간) 앞에 적힌 값을 입력)', '-1'));
		} while (temp < 0);
		if( temp >= 21 ) item += DAILY_ITEM;	// 이벤트 종료시각이 20시 59분이므로, 21시부터 24시까지는 (남은일수 - 1)日 (23 ~ 21)時間 으로 표시된다.
									// 이 경우, 위 코드에서 실제보다 1개 적게 이벤트 재화를 지급받는 것으로 계산되었으므로 정정한다. 
		eventDuration += temp * 60;
	}
	
	document.write('획득 재화: ', item); 
	document.write('잔여 기간: ', eventDuration); 
	
	
	generatedStaminaUsage = Number(prompt('자연 회복 스태미너 활용률 ( 0 ~ 100 )'));
	stamina += parseInt(( parseInt(( eventDuration / 5 )) * generatedStaminaUsage ) / 100);
	document.write('자연 회복 스태미너', stamina, '반영함.<br />'); 
	
	// 플레이어 정보 입력
	level = Number(prompt('레벨'));
	
	exp = Number(prompt('경험치'));
	
	if( eventType == FIRST )
	{
		stamina += maxStamina( level );
	}
	else if( eventType != FIRST )
	{
		temp = Number(prompt('현재 스태미너'));
		
		originalStamina = temp;
		stamina += temp;
	}
	
	
	if( eventType == FIRST )
	{
		ticket += MAX_TICKET;
	}
	else if( eventType == THEATER )
	{
		ticket = Number(prompt('현재 라이브 티켓'));
	}
	else if( eventType == TOUR )
	{
		ticket = 0;
	}
	
	// 소지 드링크 입력
	alert('사용할 드링크의 개수를 입력하세요.');
	
	for( i = 10; i <= 30; i += 10 )
	{
		tempStr = String(i);
		tempStr += ' 드링크: ';
		
		temp = Number(prompt(tempStr));
		stamina += i * temp;
	}
	maxDrink = Number(prompt('MAX 드링크: ')); 
	
	temp = Number(prompt('쥬엘: '));
	maxDrink += parseInt(temp / 50); 
	
	// 기획득 재화와 점수 입력
	if( eventType != FIRST )
	{
		temp = Number(prompt('소지한 이벤트 재화')); 
		
		if( eventType == TOUR )	originalItem = temp * 20;
		else					originalItem = temp;
		
		if( eventType == THEATER )
		{
			item += temp;
		}
		
		if( eventType == TOUR )
		{
			item += temp * ITEM_PER_EVENT;
			temp = Number(prompt('현재 진행도'));
			item += temp;
			
			originalItem += temp;
		}
	}
	
	if( eventType == FIRST )
	{
		point = 0;
	}
	else
	{
		point = Number(prompt('현재 이벤트 점수: '));
	}
	
	// 플레이 유형과 라이브, 영업, 이벤트 배수 입력 
	playType = Number(prompt('플레이 유형 ( 1: 라이브런, 2: 영업런 )')); 
	if( playType == 1 ) playType = LIVERUN;
	else if( playType == 2 ) playType = WORKRUN;
	
	if( playType == WORKRUN )		// 영업런인 경우, 기초 데이터들의 값을 조정. 
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
		workConsumption = Number(prompt('영업 1회당 소모 스태미너 ( 20, 25, 30, 40, 50, 60 중 입력 )'));
		
		//투어일 경우에만 영업으로 재화와 포인트를 획득한다. 
		if( eventType == TOUR )
		{
			ITEM_PER_WORK = parseInt(workConsumption / 5);
			POINT_PER_WORK = parseInt(workConsumption / 5) * 8;
		}
		else
		{
			ITEM_PER_WORK = 0;
			POINT_PER_WORK = 0;
		}
		
		if( workConsumption == 20 || workConsumption == 40 )
		{
			EXP_PER_WORK = EXP_PER_20;
			MONEY_PER_WORK = MONEY_PER_20;
			FAN_PER_WORK = FAN_PER_20;
			AFFECTION_PER_WORK = AFFECTION_PER_20; 
		}
		else if( workConsumption == 25 || workConsumption == 50 )
		{
			EXP_PER_WORK = EXP_PER_25;
			MONEY_PER_WORK = MONEY_PER_25;
			FAN_PER_WORK = FAN_PER_25;
			AFFECTION_PER_WORK = AFFECTION_PER_25; 
		}
		else if( workConsumption == 30 || workConsumption == 60 )
		{
			EXP_PER_WORK = EXP_PER_30;
			MONEY_PER_WORK = MONEY_PER_30;
			FAN_PER_WORK = FAN_PER_30;
			AFFECTION_PER_WORK = AFFECTION_PER_30; 
		}
	}
	
	tempStr = '라이브 배수 ';
	
	if( playType == WORKRUN )
	{
		if( eventType == FIRST )	tempStr += '( 1 ~ 15배 )';
		else						tempStr += '( 1 ~ 10배 )';
	}
	if( playType == LIVERUN )		tempStr += '( 1 / 2배 )'; 
	
	liveConsumption = Number(prompt(tempStr));
	liveConsumption *= 30;
	temp = parseInt(liveConsumption / 30);
	ITEM_PER_LIVE *= temp;
	POINT_PER_LIVE *= temp;
	if( playType == WORKRUN ) FAN_PER_LIVE *= temp;
	if( playType == WORKRUN ) AFFECTION_PER_LIVE *= temp;
	
	if( playType == WORKRUN )
	{
		AFFECTION_PER_LIVE = parseInt(AFFECTION_PER_LIVE / 2);
		FAN_PER_LIVE = parseInt(FAN_PER_LIVE / 2);
		POINT_PER_LIVE = Math.ceil( POINT_PER_LIVE * 0.7 );
		ITEM_PER_LIVE = Math.ceil( ITEM_PER_LIVE * 0.7 );
	}
	
	
	tempStr = '이벤트 라이브 배수 ';
	
	if( eventType == FIRST )	tempStr += ('( 1 / 2배 )'); 
	if( eventType == TOUR )		tempStr += ('( 1 / 2 / 3배 )');
	if( eventType == THEATER )	tempStr += ('( 1 / 2 / 4배 )'); 
	
	eventConsumption = Number(prompt(tempStr));
	
	eventConsumption *= ITEM_PER_EVENT;
	temp = parseInt(eventConsumption / ITEM_PER_EVENT);
	POINT_PER_EVENT *= temp;
	
	// 목표 점수 입력 
	targetPoint = Number(prompt('목표 이벤트 점수'));
	
	// 1주년 이벤트는 이벤트 곡에서의 2배 경험치, 티켓런 배율의 확장 등 수치의 변화만 있고 시어터와 동일한 방식이므로, 
	// 코드의 간결함을 위해 입력 단계에서 세부 수치의 수정 이후에는 시어터로 간주한다. 
	if( eventType == FIRST ) eventType = THEATER;
	
	////////////////////* 시뮬레이션 함수에 전달할 데이터 정리 *////////////////////
	inData[0] = level,				inData[1] = exp,				inData[2] = stamina,		inData[3] = ticket,			inData[4] = maxDrink;
	inData[5] = item,				inData[6] = point,				inData[7] = targetPoint,	inData[8] = eventType,		inData[9] = playType;
	inData[10] = liveConsumption,	inData[11] = workConsumption,	inData[12] = eventConsumption;
	
	
	tempStr = prompt('상세 데이터를 표시할까요? (y/n)', 'n');
	
	if( tempStr == 'y' )
	{
		document.write('---inData(parameters)---<br />');
		document.write('level ',level,'<br />');
		document.write('exp ',exp,'<br />');
		document.write('stamina ',stamina,'<br />');
		document.write('ticket ',ticket,'<br />');
		document.write('maxDrink ',maxDrink,'<br />');
		document.write('item ',item,'<br />');
		document.write('point ',point,'<br />');
		document.write('targetPoint ',targetPoint,'<br />');
		document.write('eventType ',eventType,'<br />');
		document.write('playType ',playType,'<br />');
		document.write('liveComsumption ',liveConsumption,'<br />');
		document.write('workConsumption ',workConsumption,'<br />');
		document.write('eventConsumption ',eventConsumption,'<br />');
		document.write('---inData(parameters)---<br />');
	
		document.write('---fundamentalData---<br />');
		document.write('exp per live ',EXP_PER_LIVE,'<br />');
		document.write('money per live ',MONEY_PER_LIVE,'<br />');
		document.write('fan per live ',FAN_PER_LIVE,'<br />');
		document.write('affection per live ',AFFECTION_PER_LIVE,'<br />');
		document.write('point per live ',POINT_PER_LIVE,'<br />');
		document.write('item per live ',ITEM_PER_LIVE,'<br />');
		document.write('exp per work ',EXP_PER_WORK,'<br />');
		document.write('money per work ',MONEY_PER_WORK,'<br />');
		document.write('fan per work ',FAN_PER_WORK,'<br />');
		document.write('affection per work ',AFFECTION_PER_WORK,'<br />');
		document.write('point per work ',POINT_PER_WORK,'<br />');
		document.write('item per work ',ITEM_PER_WORK,'<br />');
		document.write('exp per event ',EXP_PER_EVENT,'<br />');
		document.write('money per event ',MONEY_PER_EVENT,'<br />');
		document.write('fan per event ',FAN_PER_EVENT,'<br />');
		document.write('affection per event ',AFFECTION_PER_EVENT,'<br />');
		document.write('point per event ',POINT_PER_EVENT,'<br />');
		document.write('item per event ',ITEM_PER_EVENT,'<br />');
		document.write('daily item ',DAILY_ITEM,'<br />');
		document.write('playtime ',PLAYTIME,'<br />');
		document.write('worktime ',WORKTIME,'<br />');
		document.write('---fundamentalData---<br />');
	}
	
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
	
	document.write('<br /><br />');
	document.write('레벨: ',level,' -> ',newLevel,', 경험치: ',exp,' -> ',newExp,'<br />');
	document.write('<br />');
	document.write('맥스드링크: ',maxDrink,' -> ',newMaxDrink,', 스태미너: ',originalStamina,' -> ',newStamina,'<br />');
	document.write('<br />');
	
	if( eventType == TOUR )
		document.write('라이브 티켓: ', ticket,' -> ', newTicket,', 이벤트 재화: ', parseInt(originalItem/20),'(진행도 ', (originalItem%20),') -> ', parseInt(newItem/20),'(진행도 ', (newItem%20),')<br />');
	else
		document.write('라이브 티켓: ', ticket,' -> ', newTicket,', 이벤트 재화: ', originalItem,' -> ', newItem,'<br />');
	
	document.write('<br />');
	document.write('획득 머니: ', money,'<br />');
	document.write('획득 친애도: ', (liveAffection + workAffection),' (라이브 ', liveAffection,' / 업무 ', workAffection,')<br />');
	document.write('획득 팬: ', (liveFan + workFan),' (라이브 ', liveFan,' / 업무 ', workFan,')<br />'); 
	document.write('<br />');
	document.write('일반곡 플레이 횟수: ', liveCount, ', 영업 횟수: ', workCount, ', 이벤트곡 플레이 횟수 ', eventCount,'<br />');
	document.write('<br />');
	document.write('보유 자원으로 도달 가능한 점수: ', reachablePoint,', 시뮬레이션 종료시에 도달했던 점수: ', reachedPoint,'<br />');
	
	if( reachablePoint == reachedPoint ) document.write('! 보유 자원으로 도달 가능한 점수가 부정확하게 표시되었을 수 있습니다. 목표 점수 근처까지만 시뮬레이션이 진행됩니다.<br />'); 
	document.write('<br />');
	if( newMaxDrink < 0 )
	{
		document.write((newMaxDrink * -50),'개의 쥬엘(또는 ', (newMaxDrink * -1),'개의 맥스드링크)을 더 사용해야 목표 점수를 달성할 수 있습니다.<br />');
	}
	else
	{
		document.write('목표 점수를 달성할 수 있습니다. ', (newMaxDrink * 50),'개의 쥬엘(또는 ', newMaxDrink,'개의 맥스드링크)이 남습니다.<br />');
	}
	
	// 플레이타임 계산
	var liveTime = 0.0, workTime = 0.0;
	var dailyLiveTime = 0, dailyWorkTime = 0;
	
	if( playType == LIVERUN )
	{
		liveTime = (liveCount + eventCount) * (LEAST_PLAYTIME + 47.0 + 2.0);	//라이브 로딩시간 47초, 스태미너 회복시간 2초. 
	}
	if( playType == WORKRUN )
	{
		workTime += 22.0 * workCount;	//영업 1회에 로딩시간 포함 평균 22초 소요.
		
		workTime += (5.0 + 5.0) * liveCount;	//영업런일 경우, 라이브 탭 - 영업 탭 이동시간 5초씩 소요. 영업 시간에 포함하기로 함. 
		
		liveTime += (liveCount + eventCount) * (LEAST_PLAYTIME + 47.0);	//라이브 로딩시간 47초. 스태미너 회복시간은 고려하지 않음(영업에서 하므로). 
	}
	
	// 1시간당 평균 플레이타임 * 24 
	dailyLiveTime = parseInt( (liveTime / (eventDuration / 60.0)) * 24.0 );
	dailyWorkTime = parseInt( (workTime / (eventDuration / 60.0)) * 24.0 );
	
	var dailyPlayTime = dailyLiveTime + dailyWorkTime;
	
	document.write('<br /><br />24시간당 평균 플레이타임은 ', parseInt(dailyPlayTime / 60),'분. 그 중 라이브 ', parseInt(dailyLiveTime / 60),'분, 영업 ', parseInt(dailyWorkTime / 60),'분 소요.<br />'); 
	
}

main();