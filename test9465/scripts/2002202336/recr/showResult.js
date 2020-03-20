// 선택된 태그 목록을 배열로 반환
const getCheckedTagIDs = function () {
	var checkedTagIDs = new Array()
	
	var $checkboxList = $('.selection-panel .checkboxTag')
	
	for (var i = 0, j = 0; i < $checkboxList.length; ++i)
	{
		if ($checkboxList.eq(i).prop('checked'))
		{
			checkedTagIDs[j++] = $checkboxList.eq(i).attr('id').split('.')[1]
		}
	}
	
	return checkedTagIDs
}

const showResult = function () {
	// 선택된 태그들의 ID 배열을 받아옴
	var checkedTagIDs = getCheckedTagIDs()
	
	// 계산 결과를 받아옴
	var resultData = calc(checkedTagIDs)
	
	// 선택된 태그가 없다면 결과 하단의 버튼을 없애고, 그게 아니면 넣기
	if (checkedTagIDs.length <= 0)
	{
		// 선택된 태그가 없다면, 결과 패널 아래의 버튼들을 제거
		$('#result-panel-footer-btn').html('')
	}
	else
	{
		// 선택된 태그가 있다면, 결과 패널 아래에다가 버튼을 추가
		var footer = '<button onclick="clearSelection()">태그 초기화</button>'
		footer += ' '
		footer += '<input onclick="filterClicked(\'onlyHighStars\')" type="checkbox" id="result-panel-footer-ohsf" class="checkboxButton"><label for="result-panel-footer-ohsf"><span>고등급 확정식만</span></label>'
		footer += '<div><br></div>'
		
		$('#result-panel-footer-btn').html(footer)
		
		// 필터가 켜져있었다면, 새로 만들어진 버튼도 체크되어 있도록 연동
		syncButtons()
	}
	
	// 계산 결과로 빈 배열을 받은 경우, 결과출력을 초기화.
	if (resultData.length == 0)
	{
		$('#result-panel').html('<form></form>')
		
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
		
		// 해당 케이스의 태그 부분, 대원 부분 html을 담을 임시 문자열 변수를 각각 설정
		var tagHtmlPiece = ''
		var opHtmlPiece = ''
		
		// 선택 태그들을 추가
		tagHtmlPiece += '<div style="margin-bottom: 0.4em">'
		for (var j = 0; j < tagNames.length; ++j)
		{
			tagHtmlPiece += '<span class="result_tag">' + tagNames[j] + '</span>'
		}
		tagHtmlPiece += '</div>'
		
		displayImg = displayImg.toLowerCase()
		
		// 출현가능 대원들을 추가
		var opRarity = 0
		var prevOpRarity = 0
		for (var j = 0; j < opIDs.length; ++j)
		{
			opRarity = data.opData[opIDs[j]].rarity
			
			if (filterRarity.indexOf(opRarity) >= 0) {
				continue
			}
			
			if ((prevOpRarity != 0) && (prevOpRarity != opRarity))
			{
				opHtmlPiece += '<br>'
			}
			
			var mainDivOpen = ''
			var img = ''
			var textDivOpen = ''
			var name = ''
			var rarity = ''
			var textDivClose = ''
			var mainDivClose = ''
			
			// mainDiv
			if ('tiny|small|medium|large'.indexOf(displayImg) >= 0) {
				mainDivOpen += '<div id="op.' + String(opIDs[j]) +'" class="result_op rarity_' + String(opRarity) + '">'
			}
			else {
				mainDivOpen += '<div id="op.' + String(opIDs[j]) +'" class="result_op no-img rarity_' + String(opRarity) + '">'
			}
			
			mainDivClose += '</div>'
			
			// img
			if ('tiny|small|medium|large'.indexOf(displayImg) >= 0) {
				img += '<img class="result_op_thumb '
				img += displayImg
				img += '" src="./images/op/thumb/' + data.opData[opIDs[j]].name.en.toLowerCase() + '.png"> '
			}
			
			// textDiv
			if ((displayName || displayRarity) && ('tiny|small|medium|large'.indexOf(displayImg) >= 0)) {
				if ('large' === displayImg) {
					textDivOpen += '<br>'
				}
				
				var textDivClass = 'result_op_text ' + displayImg
				
				if (displayName && !displayRarity) {
					textDivClass += ' only-name'
				}
				
				if (!displayName && displayRarity) {
					textDivClass += ' only-rarity'
				}
				
				textDivOpen += '<div class="' + textDivClass + '">'
				textDivClose += '</div>'
			}
			
			// name
			if (displayName) {
				name += '<span>' + data.opData[opIDs[j]].name[getLang()] + '</span> '
				
				if ('tiny|small|large'.indexOf(displayImg) >= 0) {	//tiny|small
					name += '<br>'
				}
				else if ('medium'.indexOf(displayImg) >= 0) {	//medium|large
					name += '<br><br>'
				}
			}
			
			// rarity
			
			if (displayRarity) {
				rarity += '<span id="op.' + String(opIDs[j]) +'" class="star rarity_' + String(opRarity) + '">'
				rarity += ' ★' + String(opRarity)
				rarity += '</span><br>'
			}
			else if (displayName && ('small|medium'.indexOf(displayImg) >= 0)) {
				rarity += '<br>'
			}
			
			
			opHtmlPiece += mainDivOpen + img + textDivOpen + name + rarity + textDivClose + mainDivClose
			
			prevOpRarity = opRarity
		}
		
		if (opHtmlPiece === '') {
			opHtmlPiece = '<span id="op.-1" class="result_op no-img">결과 없음</span>'
		}
		
		// case의 least star에 따라서 폼의 클래스가 바뀜.
		htmlText += '<form class="rarity_' + String(lowestRarity) + '">'
		
		htmlText += tagHtmlPiece + opHtmlPiece
		
		htmlText += '</form>'
		
	}
	
	// htmlText가 비어있다면, 필터에 결과가 모두 걸러진 것이므로, 안내메시지 출력
	if (htmlText == '')
	{
		htmlText = '<form>'
		htmlText += '<span class="result_tag">결과 없음</span><br>'
		htmlText += '<span id="op.-1" class="result_op no-img">결과 없음</span>'
		htmlText += '</form>'
	}
	
	// 페이지에 표시
	$('#result-panel').html(htmlText)
}