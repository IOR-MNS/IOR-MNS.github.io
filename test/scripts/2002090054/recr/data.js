// 언어설정 전역변수. 기본값은 한글
var LANG = 'kr'

// 언어설정 전역변수를 안전하게 변경
const setLang = function (newLang) {
	// 문자열이 아니라면 걸러냄
	if ((typeof newLang).toLowerCase() !== 'string')
	{
		console.log('data.js, setLang(): 입력값이 올바르지 않음:', newLang)
		return false
	}
	
	// 적합한 문자열이 아니라면 걸러냄
	if ('kr|en|jp|cn'.indexOf(newLang.toLowerCase()) < 0)
	{
		console.log('data.js, setLang(): 입력값이 올바르지 않음:', newLang)
		return false
	}
	
	// 입력값이 적합하다면 소문자로 만들어서 언어 설정 변경
	LANG = newLang.toLowerCase()
	
	return LANG
}

// 언어설정 전역변수를 안전하게 가져옴
const getLang = function () {
	// 문자열이 아니라면 기본값으로 초기화
	if ((typeof LANG).toLowerCase() !== 'string')
	{
		console.log('data.js, getLang(): 언어설정이 올바르지 않아 "kr"로 초기화:', LANG)
		LANG = 'kr'
	}
	
	// 적합한 문자열이 아니라면 기본값으로 초기화
	if ('kr|en|jp|cn'.indexOf(LANG.toLowerCase()) < 0)
	{
		console.log('data.js, getLang(): 언어설정이 올바르지 않아 "kr"로 초기화:', LANG)
		LANG = 'kr'
	}
	
	LANG = LANG.toLowerCase()
	
	return LANG
}


/*
// object
data : {
	creationTime,
	tagData,
	opData
}

// array of objects
tagData : {
	[
		{
			id,
			name,
			tagCode
		},
		{
			id,
			name,
			tagCode
		}
	]
}

// array of objects
opData : {
	[
		{
			id,
			name,
			rarity,
			tagCode
		},
		{
			id,
			name,
			rarity,
			tagCode
		}
	]
}

// object
name : {
	kr,
	en,
	jp,
	cn
}
*/

var data = JSON.parse('{"creationTime":1580586625,"tagData":[{"id":0,"tagCode":1,"name":{"kr":"신입","en":"","jp":"","cn":""}},{"id":1,"tagCode":2,"name":{"kr":"특별채용","en":"","jp":"","cn":""}},{"id":2,"tagCode":4,"name":{"kr":"고급특별채용","en":"","jp":"","cn":""}},{"id":3,"tagCode":8,"name":{"kr":"근거리","en":"","jp":"","cn":""}},{"id":4,"tagCode":16,"name":{"kr":"원거리","en":"","jp":"","cn":""}},{"id":5,"tagCode":32,"name":{"kr":"뱅가드","en":"","jp":"","cn":""}},{"id":6,"tagCode":64,"name":{"kr":"가드","en":"","jp":"","cn":""}},{"id":7,"tagCode":128,"name":{"kr":"디펜더","en":"","jp":"","cn":""}},{"id":8,"tagCode":256,"name":{"kr":"스나이퍼","en":"","jp":"","cn":""}},{"id":9,"tagCode":512,"name":{"kr":"캐스터","en":"","jp":"","cn":""}},{"id":10,"tagCode":1024,"name":{"kr":"메딕","en":"","jp":"","cn":""}},{"id":11,"tagCode":2048,"name":{"kr":"서포터","en":"","jp":"","cn":""}},{"id":12,"tagCode":4096,"name":{"kr":"스페셜리스트","en":"","jp":"","cn":""}},{"id":13,"tagCode":8192,"name":{"kr":"힐링","en":"","jp":"","cn":""}},{"id":14,"tagCode":16384,"name":{"kr":"서포트","en":"","jp":"","cn":""}},{"id":15,"tagCode":32768,"name":{"kr":"딜러","en":"","jp":"","cn":""}},{"id":16,"tagCode":65536,"name":{"kr":"범위공격","en":"","jp":"","cn":""}},{"id":17,"tagCode":131072,"name":{"kr":"감속","en":"","jp":"","cn":""}},{"id":18,"tagCode":262144,"name":{"kr":"생존형","en":"","jp":"","cn":""}},{"id":19,"tagCode":524288,"name":{"kr":"방어형","en":"","jp":"","cn":""}},{"id":20,"tagCode":1048576,"name":{"kr":"디버프","en":"","jp":"","cn":""}},{"id":21,"tagCode":2097152,"name":{"kr":"강제이동","en":"","jp":"","cn":""}},{"id":22,"tagCode":4194304,"name":{"kr":"제어형","en":"","jp":"","cn":""}},{"id":23,"tagCode":8388608,"name":{"kr":"누커","en":"","jp":"","cn":""}},{"id":24,"tagCode":16777216,"name":{"kr":"소환","en":"","jp":"","cn":""}},{"id":25,"tagCode":33554432,"name":{"kr":"쾌속부활","en":"","jp":"","cn":""}},{"id":26,"tagCode":67108864,"name":{"kr":"코스트+","en":"","jp":"","cn":""}},{"id":27,"tagCode":134217728,"name":{"kr":"로봇","en":"","jp":"","cn":""}},{"id":28,"tagCode":268435456,"name":{"kr":"출현불가","en":"","jp":"","cn":""}}],"opData":[{"id":0,"rarity":6,"tagCode":269517332,"name":{"kr":"에이야퍄들라","en":"","jp":"","cn":""}},{"id":1,"rarity":6,"tagCode":1114644,"name":{"kr":"이프리트","en":"","jp":"","cn":""}},{"id":2,"rarity":6,"tagCode":272712212,"name":{"kr":"모스티마","en":"","jp":"","cn":""}},{"id":3,"rarity":6,"tagCode":268730444,"name":{"kr":"블레이즈","en":"","jp":"","cn":""}},{"id":4,"rarity":6,"tagCode":276856908,"name":{"kr":"첸","en":"","jp":"","cn":""}},{"id":5,"rarity":6,"tagCode":268730444,"name":{"kr":"헬라그","en":"","jp":"","cn":""}},{"id":6,"rarity":6,"tagCode":49228,"name":{"kr":"실버애쉬","en":"","jp":"","cn":""}},{"id":7,"rarity":6,"tagCode":268730444,"name":{"kr":"스카디","en":"","jp":"","cn":""}},{"id":8,"rarity":6,"tagCode":25620,"name":{"kr":"나이팅게일","en":"","jp":"","cn":""}},{"id":9,"rarity":6,"tagCode":25620,"name":{"kr":"샤이닝","en":"","jp":"","cn":""}},{"id":10,"rarity":6,"tagCode":33044,"name":{"kr":"엑시아","en":"","jp":"","cn":""}},{"id":11,"rarity":6,"tagCode":268468500,"name":{"kr":"슈바르츠","en":"","jp":"","cn":""}},{"id":12,"rarity":6,"tagCode":268488724,"name":{"kr":"아악","en":"","jp":"","cn":""}},{"id":13,"rarity":6,"tagCode":268617748,"name":{"kr":"안젤리나","en":"","jp":"","cn":""}},{"id":14,"rarity":6,"tagCode":268617748,"name":{"kr":"마젤란","en":"","jp":"","cn":""}},{"id":15,"rarity":6,"tagCode":557196,"name":{"kr":"호시구마","en":"","jp":"","cn":""}},{"id":16,"rarity":6,"tagCode":268976268,"name":{"kr":"니엔","en":"","jp":"","cn":""}},{"id":17,"rarity":6,"tagCode":549004,"name":{"kr":"사리아","en":"","jp":"","cn":""}},{"id":18,"rarity":6,"tagCode":67141676,"name":{"kr":"시즈","en":"","jp":"","cn":""}},{"id":19,"rarity":5,"tagCode":268468754,"name":{"kr":"아미야","en":"","jp":"","cn":""}},{"id":20,"rarity":5,"tagCode":268608018,"name":{"kr":"나이트메어","en":"","jp":"","cn":""}},{"id":21,"rarity":5,"tagCode":272695826,"name":{"kr":"스카이파이어","en":"","jp":"","cn":""}},{"id":22,"rarity":5,"tagCode":268992586,"name":{"kr":"아스테시아","en":"","jp":"","cn":""}},{"id":23,"rarity":5,"tagCode":268763210,"name":{"kr":"브로카","en":"","jp":"","cn":""}},{"id":24,"rarity":5,"tagCode":268730442,"name":{"kr":"플레임브링어","en":"","jp":"","cn":""}},{"id":25,"rarity":5,"tagCode":268730442,"name":{"kr":"프란카","en":"","jp":"","cn":""}},{"id":26,"rarity":5,"tagCode":294986,"name":{"kr":"인드라","en":"","jp":"","cn":""}},{"id":27,"rarity":5,"tagCode":269516874,"name":{"kr":"라플란드","en":"","jp":"","cn":""}},{"id":28,"rarity":5,"tagCode":276889674,"name":{"kr":"새비지","en":"","jp":"","cn":""}},{"id":29,"rarity":5,"tagCode":327754,"name":{"kr":"스펙터","en":"","jp":"","cn":""}},{"id":30,"rarity":5,"tagCode":268484682,"name":{"kr":"스와이어","en":"","jp":"","cn":""}},{"id":31,"rarity":5,"tagCode":268461074,"name":{"kr":"브리즈","en":"","jp":"","cn":""}},{"id":32,"rarity":5,"tagCode":268444690,"name":{"kr":"실론","en":"","jp":"","cn":""}},{"id":33,"rarity":5,"tagCode":25618,"name":{"kr":"프틸롭시스","en":"","jp":"","cn":""}},{"id":34,"rarity":5,"tagCode":9234,"name":{"kr":"사일런스","en":"","jp":"","cn":""}},{"id":35,"rarity":5,"tagCode":25618,"name":{"kr":"와파린","en":"","jp":"","cn":""}},{"id":36,"rarity":5,"tagCode":33042,"name":{"kr":"블루포이즌","en":"","jp":"","cn":""}},{"id":37,"rarity":5,"tagCode":268501266,"name":{"kr":"익스큐터","en":"","jp":"","cn":""}},{"id":38,"rarity":5,"tagCode":8421650,"name":{"kr":"파이어워치","en":"","jp":"","cn":""}},{"id":39,"rarity":5,"tagCode":268468498,"name":{"kr":"그레이스롯","en":"","jp":"","cn":""}},{"id":40,"rarity":5,"tagCode":1114386,"name":{"kr":"메테오라이트","en":"","jp":"","cn":""}},{"id":41,"rarity":5,"tagCode":33042,"name":{"kr":"플래티넘","en":"","jp":"","cn":""}},{"id":42,"rarity":5,"tagCode":33042,"name":{"kr":"프로방스","en":"","jp":"","cn":""}},{"id":43,"rarity":5,"tagCode":2134026,"name":{"kr":"클리프하트","en":"","jp":"","cn":""}},{"id":44,"rarity":5,"tagCode":2232330,"name":{"kr":"에프이터","en":"","jp":"","cn":""}},{"id":45,"rarity":5,"tagCode":299018,"name":{"kr":"맨티코어","en":"","jp":"","cn":""}},{"id":46,"rarity":5,"tagCode":37752842,"name":{"kr":"레드","en":"","jp":"","cn":""}},{"id":47,"rarity":5,"tagCode":270667786,"name":{"kr":"스노우상트","en":"","jp":"","cn":""}},{"id":48,"rarity":5,"tagCode":303042570,"name":{"kr":"와이 푸","en":"","jp":"","cn":""}},{"id":49,"rarity":5,"tagCode":272666634,"name":{"kr":"에단","en":"","jp":"","cn":""}},{"id":50,"rarity":5,"tagCode":272762898,"name":{"kr":"글라우쿠스","en":"","jp":"","cn":""}},{"id":51,"rarity":5,"tagCode":20973586,"name":{"kr":"메이어","en":"","jp":"","cn":""}},{"id":52,"rarity":5,"tagCode":1050642,"name":{"kr":"프라마닉스","en":"","jp":"","cn":""}},{"id":53,"rarity":5,"tagCode":268462098,"name":{"kr":"소라","en":"","jp":"","cn":""}},{"id":54,"rarity":5,"tagCode":165906,"name":{"kr":"이스티나","en":"","jp":"","cn":""}},{"id":55,"rarity":5,"tagCode":268959882,"name":{"kr":"바이슨","en":"","jp":"","cn":""}},{"id":56,"rarity":5,"tagCode":2621578,"name":{"kr":"크루아상","en":"","jp":"","cn":""}},{"id":57,"rarity":5,"tagCode":268968074,"name":{"kr":"운","en":"","jp":"","cn":""}},{"id":58,"rarity":5,"tagCode":557194,"name":{"kr":"리스캄","en":"","jp":"","cn":""}},{"id":59,"rarity":5,"tagCode":532618,"name":{"kr":"니어","en":"","jp":"","cn":""}},{"id":60,"rarity":5,"tagCode":819338,"name":{"kr":"벌컨","en":"","jp":"","cn":""}},{"id":61,"rarity":5,"tagCode":336068650,"name":{"kr":"그라니","en":"","jp":"","cn":""}},{"id":62,"rarity":5,"tagCode":335577130,"name":{"kr":"리드","en":"","jp":"","cn":""}},{"id":63,"rarity":5,"tagCode":71303210,"name":{"kr":"텍사스","en":"","jp":"","cn":""}},{"id":64,"rarity":5,"tagCode":67125290,"name":{"kr":"지마","en":"","jp":"","cn":""}},{"id":65,"rarity":4,"tagCode":66064,"name":{"kr":"기타노","en":"","jp":"","cn":""}},{"id":66,"rarity":4,"tagCode":268632592,"name":{"kr":"그레이","en":"","jp":"","cn":""}},{"id":67,"rarity":4,"tagCode":1081872,"name":{"kr":"헤이즈","en":"","jp":"","cn":""}},{"id":68,"rarity":4,"tagCode":268468296,"name":{"kr":"비헌터","en":"","jp":"","cn":""}},{"id":69,"rarity":4,"tagCode":49224,"name":{"kr":"도베르만","en":"","jp":"","cn":""}},{"id":70,"rarity":4,"tagCode":327752,"name":{"kr":"에스텔","en":"","jp":"","cn":""}},{"id":71,"rarity":4,"tagCode":163912,"name":{"kr":"프로스트리프","en":"","jp":"","cn":""}},{"id":72,"rarity":4,"tagCode":294984,"name":{"kr":"마토이마루","en":"","jp":"","cn":""}},{"id":73,"rarity":4,"tagCode":32840,"name":{"kr":"무스","en":"","jp":"","cn":""}},{"id":74,"rarity":4,"tagCode":268444688,"name":{"kr":"가비알","en":"","jp":"","cn":""}},{"id":75,"rarity":4,"tagCode":9232,"name":{"kr":"미르","en":"","jp":"","cn":""}},{"id":76,"rarity":4,"tagCode":9232,"name":{"kr":"퍼퓨머","en":"","jp":"","cn":""}},{"id":77,"rarity":4,"tagCode":268444688,"name":{"kr":"수수루","en":"","jp":"","cn":""}},{"id":78,"rarity":4,"tagCode":268599568,"name":{"kr":"엠브리엘","en":"","jp":"","cn":""}},{"id":79,"rarity":4,"tagCode":295184,"name":{"kr":"제시카","en":"","jp":"","cn":""}},{"id":80,"rarity":4,"tagCode":268599568,"name":{"kr":"메이","en":"","jp":"","cn":""}},{"id":81,"rarity":4,"tagCode":1081616,"name":{"kr":"메테오","en":"","jp":"","cn":""}},{"id":82,"rarity":4,"tagCode":196880,"name":{"kr":"시라유키","en":"","jp":"","cn":""}},{"id":83,"rarity":4,"tagCode":268468496,"name":{"kr":"버메일","en":"","jp":"","cn":""}},{"id":84,"rarity":4,"tagCode":34082824,"name":{"kr":"그라벨","en":"","jp":"","cn":""}},{"id":85,"rarity":4,"tagCode":2101256,"name":{"kr":"로프","en":"","jp":"","cn":""}},{"id":86,"rarity":4,"tagCode":2101256,"name":{"kr":"쇼","en":"","jp":"","cn":""}},{"id":87,"rarity":4,"tagCode":285214736,"name":{"kr":"딥컬러","en":"","jp":"","cn":""}},{"id":88,"rarity":4,"tagCode":133136,"name":{"kr":"어스스피릿","en":"","jp":"","cn":""}},{"id":89,"rarity":4,"tagCode":524424,"name":{"kr":"쿠오라","en":"","jp":"","cn":""}},{"id":90,"rarity":4,"tagCode":268992648,"name":{"kr":"두르나르","en":"","jp":"","cn":""}},{"id":91,"rarity":4,"tagCode":524424,"name":{"kr":"마터호른","en":"","jp":"","cn":""}},{"id":92,"rarity":4,"tagCode":532616,"name":{"kr":"굼","en":"","jp":"","cn":""}},{"id":93,"rarity":4,"tagCode":336068648,"name":{"kr":"쿠리어","en":"","jp":"","cn":""}},{"id":94,"rarity":4,"tagCode":335552552,"name":{"kr":"머틀","en":"","jp":"","cn":""}},{"id":95,"rarity":4,"tagCode":67141672,"name":{"kr":"스캐빈저","en":"","jp":"","cn":""}},{"id":96,"rarity":4,"tagCode":67141672,"name":{"kr":"비그나","en":"","jp":"","cn":""}},{"id":97,"rarity":3,"tagCode":66064,"name":{"kr":"라바","en":"","jp":"","cn":""}},{"id":98,"rarity":3,"tagCode":33296,"name":{"kr":"스튜어드","en":"","jp":"","cn":""}},{"id":99,"rarity":3,"tagCode":294984,"name":{"kr":"멜란사","en":"","jp":"","cn":""}},{"id":100,"rarity":3,"tagCode":268468296,"name":{"kr":"미드나이트","en":"","jp":"","cn":""}},{"id":101,"rarity":3,"tagCode":268763208,"name":{"kr":"포프카","en":"","jp":"","cn":""}},{"id":102,"rarity":3,"tagCode":9232,"name":{"kr":"안셀","en":"","jp":"","cn":""}},{"id":103,"rarity":3,"tagCode":9232,"name":{"kr":"히비스커스","en":"","jp":"","cn":""}},{"id":104,"rarity":3,"tagCode":33040,"name":{"kr":"아드나키엘","en":"","jp":"","cn":""}},{"id":105,"rarity":3,"tagCode":268501264,"name":{"kr":"캐터펄트","en":"","jp":"","cn":""}},{"id":106,"rarity":3,"tagCode":33040,"name":{"kr":"크루스","en":"","jp":"","cn":""}},{"id":107,"rarity":3,"tagCode":133136,"name":{"kr":"오키드","en":"","jp":"","cn":""}},{"id":108,"rarity":3,"tagCode":524424,"name":{"kr":"비글","en":"","jp":"","cn":""}},{"id":109,"rarity":3,"tagCode":268959880,"name":{"kr":"카디건","en":"","jp":"","cn":""}},{"id":110,"rarity":3,"tagCode":268968072,"name":{"kr":"스팟","en":"","jp":"","cn":""}},{"id":111,"rarity":3,"tagCode":67108904,"name":{"kr":"팽","en":"","jp":"","cn":""}},{"id":112,"rarity":3,"tagCode":67141672,"name":{"kr":"플룸","en":"","jp":"","cn":""}},{"id":113,"rarity":3,"tagCode":67108904,"name":{"kr":"바닐라","en":"","jp":"","cn":""}},{"id":114,"rarity":2,"tagCode":529,"name":{"kr":"12F","en":"","jp":"","cn":""}},{"id":115,"rarity":2,"tagCode":529,"name":{"kr":"두린","en":"","jp":"","cn":""}},{"id":116,"rarity":2,"tagCode":137,"name":{"kr":"느와르 코르네","en":"","jp":"","cn":""}},{"id":117,"rarity":2,"tagCode":41,"name":{"kr":"야토","en":"","jp":"","cn":""}},{"id":118,"rarity":2,"tagCode":273,"name":{"kr":"레인저","en":"","jp":"","cn":""}},{"id":119,"rarity":1,"tagCode":134234184,"name":{"kr":"Castle-3","en":"","jp":"","cn":""}},{"id":120,"rarity":1,"tagCode":134226960,"name":{"kr":"Lancet-2","en":"","jp":"","cn":""}}]}')
