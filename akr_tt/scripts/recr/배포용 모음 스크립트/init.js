/* 빠른 실행이 필요한 코드 모음*/

// 만약 플랫폼명이 비어있거나 했다면 기본값은 모바일
var isMobile = false

const refreshStyle = function () {
	if (isMobile)
	{
		// 모바일 전용 스타일
	}
	else
	{
		// PC 전용 스타일
		$('*').addClass('pc')//css('width', '90vmin')
		/*$('.checkboxTag').addClass('pc')//'input[type="checkbox"].tag:hover+label{border-color:#096485;}'
		$('.checkboxButton').addClass('pc') //:hover+label{background-color:#0d79a1;}</style>'*/
	}
}

$(document).ready(function () {
	var pcPlatformFilter = "win16|win32|win64|mac|macintel"
	var isMobile = true

	if (navigator.platform)
	{
		if (pcPlatformFilter.indexOf(navigator.platform.toLowerCase()) < 0) 
		{
			//mobile
			isMobile = true
		}
		else
		{
			//pc
			isMobile = false
		}
	}
	
	// 반응형 스타일 최초 적용
	$(window).bind('load', refreshStyle())
})

// ---------------------------------------------
// epoch time: 1580251316
// 태그, 대원별 코드 맵 설정
let tagMap = new Map()
let opMap = new Map()

// 이하 태그별 코드
tagMap.set('출현불가', 1)
tagMap.set('고급특별채용', 2)
tagMap.set('특별채용', 4)
tagMap.set('신입', 8)
tagMap.set('근거리', 16)
tagMap.set('원거리', 32)
tagMap.set('가드', 64)
tagMap.set('메딕', 128)
tagMap.set('뱅가드', 256)
tagMap.set('캐스터', 512)
tagMap.set('스나이퍼', 1024)
tagMap.set('디펜더', 2048)
tagMap.set('서포터', 4096)
tagMap.set('스페셜리스트', 8192)
tagMap.set('힐링', 16384)
tagMap.set('서포트', 32768)
tagMap.set('딜러', 65536)
tagMap.set('범위공격', 131072)
tagMap.set('감속', 262144)
tagMap.set('생존형', 524288)
tagMap.set('방어형', 1048576)
tagMap.set('디버프', 2097152)
tagMap.set('강제이동', 4194304)
tagMap.set('제어형', 8388608)
tagMap.set('누커', 16777216)
tagMap.set('소환', 33554432)
tagMap.set('쾌속부활', 67108864)
tagMap.set('코스트+', 134217728)
tagMap.set('로봇', 268435456)

// 이하 대원별 태그코드
opMap.set('에이야퍄들라 6★', 2163235)
opMap.set('이프리트 6★', 2228770)
opMap.set('모스티마 6★', 8552995)
opMap.set('블레이즈 6★', 589907)
opMap.set('첸 6★', 16842835)
opMap.set('헬라그 6★', 589907)
opMap.set('실버애쉬 6★', 98386)
opMap.set('스카디 6★', 589907)
opMap.set('나이팅게일 6★', 49314)
opMap.set('샤이닝 6★', 49314)
opMap.set('엑시아 6★', 66594)
opMap.set('슈바르츠 6★', 66595)
opMap.set('아악 6★', 106531)
opMap.set('안젤리나 6★', 364579)
opMap.set('마젤란 6★', 364579)
opMap.set('호시구마 6★', 1116178)
opMap.set('니엔 6★', 1083411)
opMap.set('사리아 6★', 1099794)
opMap.set('시즈 6★', 134283538)
opMap.set('아미야 5★', 66085)
opMap.set('나이트메어 5★', 344613)
opMap.set('스카이파이어 5★', 8520229)
opMap.set('아스테시아 5★', 1114197)
opMap.set('브로카 5★', 655445)
opMap.set('플레임브링어 5★', 589909)
opMap.set('프란카 5★', 589909)
opMap.set('인드라 5★', 589908)
opMap.set('라플란드 5★', 2162773)
opMap.set('새비지 5★', 16908373)
opMap.set('스펙터 5★', 655444)
opMap.set('스와이어 5★', 98389)
opMap.set('브리즈 5★', 49317)
opMap.set('실론 5★', 16549)
opMap.set('프틸롭시스 5★', 49316)
opMap.set('사일런스 5★', 16548)
opMap.set('와파린 5★', 49316)
opMap.set('블루포이즌 5★', 66596)
opMap.set('익스큐터 5★', 132133)
opMap.set('파이어워치 5★', 16843812)
opMap.set('그레이스롯 5★', 66597)
opMap.set('메테오라이트 5★', 2229284)
opMap.set('플래티넘 5★', 66596)
opMap.set('프로방스 5★', 66596)
opMap.set('클리프하트 5★', 4268052)
opMap.set('에프이터 5★', 4464660)
opMap.set('맨티코어 5★', 598036)
opMap.set('레드 5★', 75505684)
opMap.set('스노우상트 5★', 4464661)
opMap.set('와이 푸 5★', 69214229)
opMap.set('에단 5★', 8462357)
opMap.set('글라우쿠스 5★', 8654885)
opMap.set('메이어 5★', 41947172)
opMap.set('프라마닉스 5★', 2101284)
opMap.set('소라 5★', 53285)
opMap.set('이스티나 5★', 331812)
opMap.set('바이슨 5★', 1050645)
opMap.set('크루아상 5★', 5244948)
opMap.set('운 5★', 1067029)
opMap.set('리스캄 5★', 1116180)
opMap.set('니어 5★', 1067028)
opMap.set('벌컨 5★', 1640468)
opMap.set('그라니 5★', 135266581)
opMap.set('리드 5★', 134283541)
opMap.set('텍사스 5★', 142606612)
opMap.set('지마 5★', 134250772)
opMap.set('기타노 4★', 131616)
opMap.set('그레이 4★', 393761)
opMap.set('헤이즈 4★', 2163232)
opMap.set('비헌터 4★', 65617)
opMap.set('도베르만 4★', 98384)
opMap.set('에스텔 4★', 655440)
opMap.set('프로스트리프 4★', 327760)
opMap.set('마토이마루 4★', 589904)
opMap.set('무스 4★', 65616)
opMap.set('가비알 4★', 16545)
opMap.set('미르 4★', 16544)
opMap.set('퍼퓨머 4★', 16544)
opMap.set('수수루 4★', 16545)
opMap.set('엠브리엘 4★', 328737)
opMap.set('제시카 4★', 590880)
opMap.set('메이 4★', 328737)
opMap.set('메테오 4★', 2163744)
opMap.set('시라유키 4★', 394272)
opMap.set('버메일 4★', 66593)
opMap.set('그라벨 4★', 68165648)
opMap.set('로프 4★', 4202512)
opMap.set('쇼 4★', 4202512)
opMap.set('딥컬러 4★', 33558561)
opMap.set('어스스피릿 4★', 266272)
opMap.set('쿠오라 4★', 1050640)
opMap.set('두르나르 4★', 1116177)
opMap.set('마터호른 4★', 1050640)
opMap.set('굼 4★', 1067024)
opMap.set('쿠리어 4★', 135266577)
opMap.set('머틀 4★', 134234385)
opMap.set('스캐빈저 4★', 134283536)
opMap.set('비그나 4★', 134283536)
opMap.set('라바 3★', 131616)
opMap.set('스튜어드 3★', 66080)
opMap.set('멜란사 3★', 589904)
opMap.set('미드나이트 3★', 65617)
opMap.set('포프카 3★', 655441)
opMap.set('안셀 3★', 16544)
opMap.set('히비스커스 3★', 16544)
opMap.set('아드나키엘 3★', 66592)
opMap.set('캐터펄트 3★', 132129)
opMap.set('크루스 3★', 66592)
opMap.set('오키드 3★', 266272)
opMap.set('비글 3★', 1050640)
opMap.set('카디건 3★', 1050641)
opMap.set('스팟 3★', 1067025)
opMap.set('팽 3★', 134218000)
opMap.set('플룸 3★', 134283536)
opMap.set('바닐라 3★', 134218000)
opMap.set('12F 2★', 552)
opMap.set('두린 2★', 552)
opMap.set('느와르 코르네 2★', 2072)
opMap.set('야토 2★', 280)
opMap.set('레인저 2★', 1064)
opMap.set('Castle-3 1★', 268468304)
opMap.set('Lancet-2 1★', 268452000)

// ---------------------------------------------

/*
$(document).ready(function() {
	$(document).on('mouseover','.result_op',function(e){ //마우스 오버시
		
		$('body').append('<p id='preview'><img src='images/op/chen.png'/></p>'); //보여줄 이미지를 선언						 
		$('#preview')
			.css('top', e.pageY + 'px')
			.css('left', e.pageX + 'px')
			.fadeIn(150); //미리보기 화면 설정 셋팅
	});

	$(document).on('mousemove','.result_op',function(e){ //마우스 이동시
		$('#preview')
			.css('top', e.pageY + 'px')
			.css('left', e.pageX + 'px');
	});

	$(document).on('mouseout','.result_op',function(){ //마우스 아웃시
		
		$('#preview').remove();
	});
	 
});
*/

$(document).ready(function() {
	// 마우스가 요소에 들어감
	$(document).on('click mouseover', '.result_op', function(e) {
		// 기존의 툴팁 모두 제거
		$('#tooltip').remove()
		
		var opName = $(e.target).text()
		var tagCode = opMap.get(opName)
		var tags = []
		getTagNames(tagCode, tags)
		
		var tooltipHtml = ''
		for (var i = 0; i < tags.length; ++i)
		{
			tooltipHtml += '<span class="result_tag">' + tags[i] + '</span>'
		}
		
		$('body').append('<p id="tooltip">' + tooltipHtml + '</p>');
		$('#tooltip')
			.css('top', e.pageY + 'px')
			.css('left', e.pageX + 'px')
			.fadeIn(200)
	})
	
	// 마우스 이동
	$(document).on('mousemove', '.result_op', function(e) {
		$('#tooltip')
			.css('top', e.pageY + 'px')
			.css('left', e.pageX + 'px')
	})
	
	// 마우스가 요소 밖으로 나감
	$(document).on('mouseout', '.result_op', function() {
		
		$('#tooltip').remove()
	})
	 
})