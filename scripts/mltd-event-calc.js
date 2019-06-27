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
var POvar_PER_LIVE;
var ITEM_PER_LIVE;

// 영업 1회당 소모하는 스태미너에 따라 달라진다. 
var EXP_PER_WORK;
var MONEY_PER_WORK;
var FAN_PER_WORK;
var AFFECTION_PER_WORK;
var POvar_PER_WORK;
var ITEM_PER_WORK;

// 이벤트 유형에 따라 달라지는 변수가 있다. 
var EXP_PER_EVENT = EXP_PER_MM; 
var MONEY_PER_EVENT = MONEY_PER_MM;
var FAN_PER_EVENT = FAN_PER_MM;
var AFFECTION_PER_EVENT = AFFECTION_PER_MM;
var POvar_PER_EVENT;
var ITEM_PER_EVENT;	// 이벤트 1회당 소모 재화

// 이벤트 유형에 따라 달라진다. 
var DAILY_ITEM;		// 매일 지급되는 Item 

// 사용자 기기 환경에 따라 달라진다. 
var PLAYTIME = LEAST_PLAYTIME;		// 사용자별 플레이할 곡의 길이 설정 
var WORKTIME = MEAN_WORKTIME;		// 사용자별 영업 소요시간 설정 



var maxExp = function ( level );


var maxStamina = function ( level );


var simulateEvent = function ( inData, outData );

// 해당 레벨의 최대 경험치 
var maxExp( var level )
{
	if( level < 1 ) prvarf("maxExp: 1 미만의 level 인자 (%d)\n", level); 
	return ( level * 100 ) - 50;
}

// 해당 레벨의 최대 스태미너 
var maxStamina( var level )
{
	if( level < 1 ) prvarf("maxStamina: 1 미만의 level 인자 (%d)\n", level);
	
	if( level <= 58 )
		return 60 + ( level / 2 );
	
	else if( level <= 148 )
		return 90 + ( ( level - 60 ) / 3 );
	
	else
		return 120 + ( ( level - 150 ) / 4 );
}

// 시뮬레이션 함수 
var *simulateEvent( var *inData, var *outData )
{
	////////////////////* 받아온 데이터 복사 *////////////////////
	var level = inData[0],				exp = inData[1],				stamina = inData[2],		ticket = inData[3],			maxDrink = inData[4];
	var item = inData[5],				povar = inData[6],				targetPovar = inData[7],	eventType = inData[8],		playType = inData[9];
	var liveConsumption = inData[10],	workConsumption = inData[11],	eventConsumption = inData[12];
	
	
	////////////////////* 추가 변수 선언  *////////////////////
	var liveAffection = 0, workAffection = 0, money = 0, liveFan = 0, workFan = 0;
	var reachablePovar = 0; 
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
				reachablePovar = povar;
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
				reachablePovar = povar;
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
				reachablePovar = povar;
			}
			
			maxDrink--;
			stamina += maxStamina( level );
		}
	}
	
	
	
	// 자원 사용
	 
	if( playType == LIVERUN )			//라이브런 
	{
		// 일반 라이브 실행
		temp = stamina / liveConsumption;
		
		exp				+=	temp * EXP_PER_LIVE;
		povar			+=	temp * POvar_PER_LIVE;
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
		temp = stamina / workConsumption;
		
		// 시어터 이벤트의 영업에서만 라이브 티켓을 획득함. 
		if( eventType == THEATER )
		{
			ticket += temp * workConsumption;
		}
		
		// 투어 이벤트의 영업에서만 포인트와 재화를 획득함. 
		if( eventType == TOUR )
		{
			povar	+=	temp * POvar_PER_WORK;
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
			temp = ticket / liveConsumption;
			
			// 티켓 라이브에선 exp와 money가 증가하지 않음. 
			povar			+=	temp * POvar_PER_LIVE;
			item			+=	temp * ITEM_PER_LIVE;
			liveAffection	+=	temp * AFFECTION_PER_LIVE;
			liveFan			+=	temp * FAN_PER_LIVE;
			liveCount		+=	temp;
			
			ticket %= liveConsumption;
		}
	}
	
	// 이벤트 라이브 실행
	temp = item / eventConsumption;
	
	// 이벤트 라이브에선 item이 증가하지 않음. 
	exp				+=	temp * EXP_PER_EVENT;
	povar			+=	temp * POvar_PER_EVENT;
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
	if( povar >= targetPovar )
		break;
	}
	
	// 추가적인 자원 소모 없이 목표 점수를 달성했다면
	// reachablePovar == reachedPovar 이다.
	if( maxDrink >= 0 ){
		reachablePovar = povar;
	}
	
	outData[0] = level,				outData[1] = exp,				outData[2] = maxDrink,			outData[3] = stamina;
	outData[4] = ticket,			outData[5] = item,				outData[6] = money,				outData[7] = liveAffection;
	outData[8] = workAffection,		outData[9] = liveFan,			outData[10] = workFan,			outData[11] = liveCount;
	outData[12] = workCount,		outData[13] = eventCount,		outData[14] = reachablePovar,	outData[15] = povar;
	
	return outData;
}


var main( void )
{
	////////////////////* 변수 선언 *////////////////////
	
	
	// 이벤트 유형, 이벤트 기간, 자연 회복 스태미너 사용 비율 
	var eventType = 0, eventDuration = 0, generatedStaminaUsage = 0;
	
	// 레벨, 경험치, 스태미너, 티켓, 맥드링  
	var level = 0, exp = 0, stamina = 0, ticket = 0, maxDrink = 0;
	
	// 재화, 점수, 목표 점수  
	var item = 0, povar = 0, targetPovar = 0;
	
	// 플레이 유형, 라이브 배수, 영업 소모 스태미너, 이벤트 배수  
	var playType = 0, liveConsumption = 0, workConsumption = 0, eventConsumption = 0;
	
	// 데이터를 함수과 주고받을 때 사용 
	var inData[INDATA_SIZE] = {0,};
	var outData[OUTDATA_SIZE] = {0,};
	
	// 임시 데이터 저장용
	var temp = 0;
	var originalStamina = 0;	// 출력결과에 본래 스태미너를 표시하기 위해 
	var originalItem = 0;		// 출력결과에 본래 이벤트 재화 개수를 표시하기 위해 
	
	////////////////////* 사용자에게서 데이터 입력 *////////////////////
	prvarf("Comet\n");
	prvarf("{\t[ 전제 조건 ]\t\t\t\t\t\t}\n"); 
	prvarf("{\tMM 난이도, S랭크 클리어\t\t\t\t\t}\n");
	prvarf("{\tPUSH 악곡, 이벤트곡 5.0배 효율\t\t\t\t}\n"); 
	prvarf("\n\n"); 
	
	
	prvarf("\n이벤트 유형 ( 1: 시어터, 2 : 투어, 3 : 1주년 )\n");
	prvarf(">> ");
	scanf("%d", &eventType);
	
	if( eventType == 1 ) eventType = THEATER;
	else if( eventType == 2 ) eventType = TOUR;
	else if( eventType == 3 ) eventType = FIRST;
	
	
	
	// 이벤트 유형에 따라 기초 데이터 설정
	
	if( eventType == THEATER || eventType == FIRST )		// 시어터류. 재화를 180 단위로 사용 가능. 
	{
		// 시어터류 이벤트에선 영업으로 점수나 재화를 얻지 못한다. 
		POvar_PER_WORK = 0;
		ITEM_PER_WORK = 0;
		
		// 라이브에서 획득하는 점수, 재화 
		POvar_PER_LIVE = 85;
		ITEM_PER_LIVE = 85;
		
		POvar_PER_EVENT = 537;
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
		POvar_PER_LIVE = 140;
		ITEM_PER_LIVE = 30 / 5;
		
		POvar_PER_EVENT = 144 * 5;
		ITEM_PER_EVENT = 20;	// 이벤트 라이브를 1회 돌리는데 필요한 재화
		
		// 매일 지급하는 재화 
		DAILY_ITEM = 20;
	}
	
	if( eventType == FIRST )
	{
		prvarf("\n1주년 이벤트 당시의 진행 기간을 자동 설정합니다.\n");
		eventDuration = 13 * 24 * 60;
		item += 13 * DAILY_ITEM;
	}
	
	if( eventType != FIRST )
	{ 
		prvarf("\n이벤트 종료까지 남은 기간 입력\n");
		prvarf("\n(이벤트 미션의 남은 기간에서 日(일) 앞에 적힌 값을 입력)\n");
		prvarf(">> ");
		scanf("%d", &temp);
		item += temp * DAILY_ITEM;				// 남은일수만큼 이벤트 재화를 지급받는다. 시뮬레이션 시작 당일은 이미 지급받았을 것이므로 제외. 
		eventDuration = temp * 24 * 60;
		
		prvarf("(이벤트 미션의 남은 기간에서 時間(시간) 앞에 적힌 값을 입력)\n");
		prvarf(">> ");
		scanf("%d", &temp);
		if( temp >= 21 ) item += DAILY_ITEM;	// 이벤트 종료시각이 20시 59분이므로, 21시부터 24시까지는 (남은일수 - 1)日 (23 ~ 21)時間 으로 표시된다.
									// 이 경우, 위 코드에서 실제보다 1개 적게 이벤트 재화를 지급받는 것으로 계산되었으므로 정정한다. 
		eventDuration += temp * 60;
	}
	
	prvarf("획득 재화: %d\n", item); 
	prvarf("잔여 기간: %d분\n", eventDuration); 
	
	
	prvarf("\n자연 회복 스태미너 활용률 ( 0 ~ 100 )\n");
	prvarf(">> "); 
	scanf("%d", &generatedStaminaUsage);
	stamina += ( ( eventDuration / 5 ) * generatedStaminaUsage ) / 100;
	prvarf("자연 회복 스태미너 %d 반영함.\n", stamina); 
	
	// 플레이어 정보 입력
	prvarf("\n레벨\n");
	prvarf(">> "); 
	scanf("%d", &level);
	
	prvarf("\n경험치\n");
	prvarf(">> "); 
	scanf("%d", &exp);
	
	if( eventType == FIRST )
	{
		stamina += maxStamina( level );
	}
	else if( eventType != FIRST )
	{
		prvarf("\n현재 스태미너\n");
		prvarf(">> "); 
		scanf("%d", &temp);
		originalStamina = temp;
		stamina += temp;
	}
	
	
	if( eventType == FIRST )
	{
		ticket += MAX_TICKET;
	}
	else if( eventType == THEATER )
	{
		prvarf("\n현재 라이브 티켓\n");
		prvarf(">> ");
		scanf("%d", &ticket);
	}
	else if( eventType == TOUR )
	{
		ticket = 0;
	}
	
	// 소지 드링크 입력
	prvarf("\n사용할 드링크의 개수를 입력하세요.\n");
	
	for( var i = 10; i <= 30; i += 10 )
	{
		prvarf("%d 드링크: ", i);
		scanf("%d", &temp);
		stamina += i * temp;
	}
	prvarf("MAX 드링크: "); 
	scanf("%d", &maxDrink);
	
	prvarf("\n쥬엘: ");
	scanf("%d", &temp);
	maxDrink += temp / 50; 
	
	// 기획득 재화와 점수 입력
	if( eventType != FIRST )
	{
		prvarf("\n소지한 이벤트 재화\n"); 
		prvarf(">> "); 
		scanf("%d", &temp);
		
		if( eventType == TOUR )	originalItem = temp * 20;
		else					originalItem = temp;
		
		if( eventType == THEATER )
		{
			item += temp;
		}
		
		if( eventType == TOUR )
		{
			item += temp * ITEM_PER_EVENT;
			prvarf("\n현재 진행도\n");
			prvarf(">> ");
			scanf("%d", &temp);
			item += temp;
			
			originalItem += temp;
		}
	}
	
	if( eventType == FIRST )
	{
		povar = 0;
	}
	else
	{
		prvarf("\n현재 이벤트 점수\n");
		prvarf(">> "); 
		scanf("%d", &povar);
	}
	
	// 플레이 유형과 라이브, 영업, 이벤트 배수 입력 
	prvarf("\n플레이 유형 ( 1: 라이브런, 2: 영업런 )\n"); 
	prvarf(">> ");
	scanf("%d", &playType);
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
		// POvar_PER_LIVE
		// ITEM_PER_LIVE
		
		// 영업의 종류와 배수를 입력받고, 그에 따라 영업의 기초 데이터를 조정. 
		prvarf("\n영업 1회당 소모 스태미너 ( 20, 25, 30, 40, 50, 60 중 입력 )\n");
		prvarf(">> "); 
		scanf("%d", &workConsumption);
		
		//투어일 경우에만 영업으로 재화와 포인트를 획득한다. 
		if( eventType == TOUR )
		{
			ITEM_PER_WORK = workConsumption / 5;
			POvar_PER_WORK = ( workConsumption / 5 ) * 8;
		}
		else
		{
			ITEM_PER_WORK = 0;
			POvar_PER_WORK = 0;
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
	
	
	prvarf("\n라이브 배수\n");
	
	if( playType == WORKRUN )
	{
		if( eventType == FIRST )	prvarf("( 1 ~ 15배 )\n");
		else						prvarf("( 1 ~ 10배 )\n");
	}
	if( playType == LIVERUN )		prvarf("( 1 / 2배 )\n"); 
	
	prvarf(">> "); 
	
	scanf("%d", &liveConsumption);
	liveConsumption *= 30;
	temp = liveConsumption / 30;
	ITEM_PER_LIVE *= temp;
	POvar_PER_LIVE *= temp;
	if( playType == WORKRUN ) FAN_PER_LIVE *= temp;
	if( playType == WORKRUN ) AFFECTION_PER_LIVE *= temp;
	
	if( playType == WORKRUN )
	{
		AFFECTION_PER_LIVE /= 2;
		FAN_PER_LIVE /= 2;
		POvar_PER_LIVE = (var)ceil( (double)POvar_PER_LIVE * 0.7 );
		ITEM_PER_LIVE = (var)ceil( (double)ITEM_PER_LIVE * 0.7 );
	}
	
	
	prvarf("\n이벤트 라이브 배수\n");
	
	if( eventType == FIRST )	prvarf("( 1 / 2배 )\n"); 
	if( eventType == TOUR )		prvarf("( 1 / 2 / 3배 )\n");
	if( eventType == THEATER )	prvarf("( 1 / 2 / 4배 )\n"); 
	
	prvarf(">> "); 
	scanf("%d", &eventConsumption);
	eventConsumption *= ITEM_PER_EVENT;
	temp = eventConsumption / ITEM_PER_EVENT;
	POvar_PER_EVENT *= temp;
	
	// 목표 점수 입력 
	prvarf("\n목표 이벤트 점수\n");
	prvarf(">> ");
	scanf("%d", &targetPovar);
	
	// 1주년 이벤트는 이벤트 곡에서의 2배 경험치, 티켓런 배율의 확장 등 수치의 변화만 있고 시어터와 동일한 방식이므로, 
	// 코드의 간결함을 위해 입력 단계에서 세부 수치의 수정 이후에는 시어터로 간주한다. 
	if( eventType == FIRST ) eventType = THEATER;
	
	////////////////////* 시뮬레이션 함수에 전달할 데이터 정리 *////////////////////
	inData[0] = level,				inData[1] = exp,				inData[2] = stamina,		inData[3] = ticket,			inData[4] = maxDrink;
	inData[5] = item,				inData[6] = povar,				inData[7] = targetPovar,	inData[8] = eventType,		inData[9] = playType;
	inData[10] = liveConsumption,	inData[11] = workConsumption,	inData[12] = eventConsumption;
	
	
	prvarf("상세 데이터를 보려면 1 입력, 아니면 0 입력: ");
	scanf("%d", &temp);
	getchar();
	if( temp == 1 )
	{
		prvarf("---inData(parameters)---\n");
		prvarf("level %d, %d\n", inData[0], level);
		prvarf("exp %d, %d\n", inData[1], exp);
		prvarf("stamina %d, %d\n", inData[2], stamina);
		prvarf("ticket %d, %d\n", inData[3], ticket);
		prvarf("maxDrink %d, %d\n", inData[4], maxDrink);
		prvarf("item %d, %d\n", inData[5], item);
		prvarf("povar %d, %d\n", inData[6], povar);
		prvarf("targetPovar %d, %d\n", inData[7], targetPovar);
		prvarf("eventType %d, %d\n", inData[8], eventType);
		prvarf("playType %d, %d\n", inData[9], playType);
		prvarf("liveComsumption %d, %d\n", inData[10], liveConsumption);
		prvarf("workConsumption %d, %d\n", inData[11], workConsumption);
		prvarf("eventConsumption %d, %d\n", inData[12], eventConsumption);
		prvarf("---inData(parameters)---\n");
	
		prvarf("---fundamentalData---\n");
		prvarf("exp per live %d\n", EXP_PER_LIVE);
		prvarf("money per live %d\n", MONEY_PER_LIVE);
		prvarf("fan per live %d\n", FAN_PER_LIVE);
		prvarf("affection per live %d\n", AFFECTION_PER_LIVE);
		prvarf("povar per live %d\n", POvar_PER_LIVE);
		prvarf("item per live %d\n", ITEM_PER_LIVE);
		prvarf("exp per work %d\n", EXP_PER_WORK);
		prvarf("money per work %d\n", MONEY_PER_WORK);
		prvarf("fan per work %d\n", FAN_PER_WORK);
		prvarf("affection per work %d\n", AFFECTION_PER_WORK);
		prvarf("povar per work %d\n", POvar_PER_WORK);
		prvarf("item per work %d\n", ITEM_PER_WORK);
		prvarf("exp per event %d\n", EXP_PER_EVENT);
		prvarf("money per event %d\n", MONEY_PER_EVENT);
		prvarf("fan per event %d\n", FAN_PER_EVENT);
		prvarf("affection per event %d\n", AFFECTION_PER_EVENT);
		prvarf("povar per event %d\n", POvar_PER_EVENT);
		prvarf("item per event %d\n", ITEM_PER_EVENT);
		prvarf("daily item %d\n", DAILY_ITEM);
		prvarf("playtime %d\n", PLAYTIME);
		prvarf("worktime %d\n", WORKTIME);
		prvarf("---fundamentalData---\n");
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
	var reachablePovar = outData[14], reachedPovar = outData[15];
	prvarf("\n\n");
	prvarf("레벨: %d -> %d, 경험치: %d -> %d\n", level, newLevel, exp, newExp);
	prvarf("\n");
	prvarf("맥스드링크: %d -> %d, 스태미너: %d -> %d\n", maxDrink, newMaxDrink, originalStamina, newStamina);
	prvarf("\n");
	
	if( eventType == TOUR )
		prvarf("라이브 티켓: %d -> %d, 이벤트 재화: %d(진행도 %d) -> %d(진행도 %d)\n", ticket, newTicket, originalItem/20, originalItem%20, newItem/20, newItem%20);
	else
		prvarf("라이브 티켓: %d -> %d, 이벤트 재화: %d -> %d\n", ticket, newTicket, originalItem, newItem);
		
	prvarf("\n");
	prvarf("획득 머니: %d\n", money);
	prvarf("획득 친애도: %d (라이브 %d / 업무 %d)\n", (liveAffection + workAffection), liveAffection, workAffection);
	prvarf("획득 팬: %d (라이브 %d / 업무 %d)\n", (liveFan + workFan), liveFan, workFan); 
	prvarf("\n");
	prvarf("일반곡 플레이 횟수: %d, 영업 횟수: %d, 이벤트곡 플레이 횟수 %d\n", liveCount, workCount, eventCount);
	prvarf("\n");
	prvarf("보유 자원으로 도달 가능한 점수: %d, 시뮬레이션 종료시에 도달했던 점수: %d\n", reachablePovar, reachedPovar);
	if( reachablePovar == reachedPovar ) prvarf("! 보유 자원으로 도달 가능한 점수가 부정확하게 표시되었을 수 있습니다. 목표 점수 근처까지만 시뮬레이션이 진행됩니다.\n"); 
	prvarf("\n");
	if( newMaxDrink < 0 )
	{
		prvarf("%d개의 쥬엘(또는 %d개의 맥스드링크)을 더 사용해야 목표 점수를 달성할 수 있습니다.\n", newMaxDrink * (-50), newMaxDrink * (-1));
	}
	else
	{
		prvarf("목표 점수를 달성할 수 있습니다. %d개의 쥬엘(또는 %d개의 맥스드링크)이 남습니다.\n", newMaxDrink * 50, newMaxDrink);
	}
	
	// 플레이타임 계산
	double liveTime = 0.0, workTime = 0.0;
	var dailyLiveTime = 0, dailyWorkTime = 0;
	
	if( playType == LIVERUN )
	{
		liveTime = (double)(liveCount + eventCount) * (LEAST_PLAYTIME + 47.0 + 2.0);	//라이브 로딩시간 47초, 스태미너 회복시간 2초. 
	}
	if( playType == WORKRUN )
	{
		workTime += 22.0 * workCount;	//영업 1회에 로딩시간 포함 평균 22초 소요.
		
		workTime += (5.0 + 5.0) * liveCount;	//영업런일 경우, 라이브 탭 - 영업 탭 이동시간 5초씩 소요. 영업 시간에 포함하기로 함. 
		
		liveTime += (double)(liveCount + eventCount) * (LEAST_PLAYTIME + 47);	//라이브 로딩시간 47초. 스태미너 회복시간은 고려하지 않음(영업에서 하므로). 
	}
	
	// 1시간당 평균 플레이타임 * 24 
	dailyLiveTime = (var)( (liveTime / (eventDuration / 60.0)) * 24.0 );
	dailyWorkTime = (var)( (workTime / (eventDuration / 60.0)) * 24.0 );
	
	var dailyPlayTime = dailyLiveTime + dailyWorkTime;
	
	prvarf("\n\n24시간당 평균 플레이타임은 %d분. 그 중 라이브 %d분, 영업 %d분 소요.\n", dailyPlayTime / 60, dailyLiveTime / 60, dailyWorkTime / 60); 
	
	prvarf("\n\n\n");
	
	prvarf("아무 키나 누르시면 프로그램이 종료됩니다."); 
	system("pause>nul");
	
	return 0;
}