const showResult = function () {
	//console.log('showResult: 결과 데이터 받아오기 시작')
	// 계산 결과를 받아옴
	var resultData = calc(getCheckedTags())
	
	// 선택된 태그가 없거나 / 선택된 태그명이 유효하지 않을 경우
	// 계산 결과로 빈 배열을 받음
	if (resultData.length == 0)
	{
		//console.log('showResult: 결과 출력을 초기화')
		// 결과출력을 초기화.
		document.getElementById('calcResult').innerHTML = '<form></form>'
		return false
	}
	
	// resultData의 각 원소는 다음과 같음:
	// [0]: 선택된 태그이름 배열
	// [1]: 출현가능 대원이름 배열
	
	var htmlText = new String()
	
	for (var i = 0; i < resultData.length; ++i)
	{
		// 가독성을 위해 참조변수 설정
		var tags = resultData[i][0]
		var ops = resultData[i][1]
		
		// 임시 문자열 변수 설정
		var caseText = ''
		
		// 선택 태그들을 추가
		for (var j = 0; j < tags.length; ++j)
		{
			caseText += '<span class="result_tag">' + tags[j] + '</span>'
		}
		
		// 행분리
		caseText += '<br>'
		
		// 출현가능 대원들을 추가
		for (var j = 0; j < ops.length; ++j)
		{
			// 필요하다면, 각 대원의 클래스를 추가할 수 있음. 6성은 sixStarOP라는 식으로..
			caseText += '<span class="result_op">' + ops[j] + '</span>'
		}
		
		// 해당 케이스의 최소 별 갯수(1/2성은 가능하다면 무시)를 구함.
		var leastStar = 0
		for (var j = (ops.length - 1); j >= 0; --j)
		{
			leastStar = getStar(ops[j])
			
			if (leastStar >= 3)
			{
				break
			}
		}
		
		// case의 least star에 따라서 폼의 클래스가 바뀜.
		htmlText += '<form class="star_' + String(leastStar) + '">'
		
		htmlText += caseText
		
		htmlText += '</form>'
	}
	
	// 페이지에 표시
	document.getElementById('calcResult').innerHTML = htmlText;
	
	//console.log('showResult: 결과를 출력함')
}