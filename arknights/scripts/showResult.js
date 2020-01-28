const parseResult = function(resStr) {
	// 결과 스트링 파싱
	// '@'을 기준으로 케이스가 구분됨.
	// 각 태그, 대원명은 '#'으로 구분됨. 어차피 태그명과 대원명은 같을 수 없으므로 둘을 분류해서 저장할 필요는 없음.
	var parsedData = new Array()
	var tmpArr = new Array()
	var tmpStr = new String()

	for (var i = 0, dataidx = 0, tmpidx = 0; i < resStr.length; ++i)
	{
		if (resStr.charAt(i) === '#')
		{
			tmpArr[tmpidx++] = tmpStr
			tmpStr = ''

			continue
		}
		else if (resStr.charAt(i) === '@')
		{
			tmpArr[tmpidx++] = tmpStr
			tmpStr = ''


			parsedData[dataidx++] = tmpArr.filter(function (elem) {
				return elem != null
			})

			tmpArr = []

			continue
		}

		// 현재 글자가 '#' 이나 '@'가 아닐 경우, tmpStr에 저장
		tmpStr += resStr.charAt(i)
	}

	var combinedData = new Array()

	for (var i = 0, j = 0; i < parsedData.length; i += 2)
	{
		combinedData[j] = []
		combinedData[j][0] = parsedData[i]
		combinedData[j][1] = parsedData[i + 1]
		j++
	}
	
	return combinedData
}

const showResult = function (resultText) {
	// 결과 표시 전, 기출력 내용 초기화
	document.getElementById('calcResult').innerHTML = '';
	
	// resultData의 각 원소는 다음과 같음:
	// [0]: 선택된 태그이름 배열
	// [1]: 출현가능 대원이름 배열
	var resultData = parseResult(resultText)
	console.log(resultData)
	
	var htmlText = new String()
	
	for (var i = 0; i < resultData.length; ++i)
	{
		// 가독성을 위해 참조변수 설정
		var tags = resultData[i][0]
		var ops = resultData[i][1]
		
		// 케이스의 시작. 폼 열기
		htmlText += '<form>'
		
		// 선택 태그목록
		for (var j = 0; j < tags.length; ++j)
		{
			htmlText += '<span class="result_tag">' + tags[j] + '</span>'
		}
		
		// 행분리
		htmlText += '<br>'
		
		// 출현가능 대원목록
		for (var j = 0; j < ops.length; ++j)
		{
			htmlText += '<span class="result_op">' + ops[j] + '</span>'
		}
		
		// 케이스의 끝. 폼 닫기
		htmlText += '</form>'
	}
	
	// 페이지에 표시
	document.getElementById('calcResult').innerHTML = htmlText;
}