// 선택된 태그 목록을 배열로 반환
const getCheckedTagIDs = function () {
	var checkedTagIDs = new Array()
	
	var checkboxList = document.querySelectorAll('.checkboxTag')
	
	for (var i = 0, j = 0; i < checkboxList.length; ++i)
	{
		if (checkboxList[i].checked === true)
		{
			checkedTagIDs[j++] = checkboxList[i].id.slice(4)
		}
	}
	
	return checkedTagIDs
}

const showResult = function () {
	// 계산 결과를 받아옴
	var resultData = calc(getCheckedTagIDs())
	
	// 선택된 태그가 없거나 / 선택된 태그명이 유효하지 않을 경우
	// 계산 결과로 빈 배열을 받은 경우
	if (resultData.length == 0)
	{
		// 결과출력을 초기화.
		document.getElementById('calcResult').innerHTML = '<form></form>'
		return false
	}
	
	var htmlText = new String()
	
	for (var i = 0; i < resultData.length; ++i)
	{
		// 필터 적용
		var lowestRarity = resultData[i].lowestRarity
		
		if ((onlyHighStarsFilter == true) && (lowestRarity <= 3))
		{
			continue
		}
		
		// 가독성을 위해 참조변수 설정
		var tagCode = resultData[i].tagCode
		var opIDs = resultData[i].opIDs
		
		// tagCode를 바탕으로 구성태그의 이름들을 얻어냄
		var tagNames = new Array()
		getTagNames(tagCode, tagNames)
		
		// 해당 케이스의 html을 담을 임시 문자열 변수 설정
		var htmlPiece = ''
		
		// 선택 태그들을 추가
		for (var j = 0; j < tagNames.length; ++j)
		{
			htmlPiece += '<span class="result_tag">' + tagNames[j] + '</span>'
		}
		
		// 행분리
		htmlPiece += '<br>'
		
		// 출현가능 대원들을 추가
		var opRarity = 0
		var prevOpRarity = 0
		for (var j = 0; j < opIDs.length; ++j)
		{
			opRarity = data.opData[opIDs[j]].rarity
			
			if ((prevOpRarity != 0) && (prevOpRarity != opRarity))
			{
				htmlPiece += '<br>'
			}
			
			htmlPiece += '<span id="op.' + String(opIDs[j]) +'" class="result_op rarity_' + String(opRarity) + '">'
			htmlPiece += data.opData[opIDs[j]].name[getLang()]
			htmlPiece += '<span id="op.' + String(opIDs[j]) +'" class="star rarity_' + String(opRarity) + '">'
			htmlPiece += ' ★' + String(opRarity)
			htmlPiece += '</span>'
			htmlPiece += '</span>'
			
			prevOpRarity = opRarity
		}
		
		// case의 least star에 따라서 폼의 클래스가 바뀜.
		htmlText += '<form class="rarity_' + String(lowestRarity) + '">'
		
		htmlText += htmlPiece
		
		htmlText += '</form>'
	}
	
	// htmlText가 비어있다면, 필터에 결과가 모두 걸러진 것이므로, 안내메시지 출력
	if (htmlText == '')
	{
		htmlText = '<form><span class="result_tag">결과 없음</span>'
		htmlText += '<br>'
		htmlText += '<span class="result_op">결과 없음</span></form>'
	}
	
	// 페이지에 표시
	document.getElementById('calcResult').innerHTML = htmlText
	
	// 반응형 스타일 갱신은 tagClicked, filterClicked 등의 함수에서 호출함
}