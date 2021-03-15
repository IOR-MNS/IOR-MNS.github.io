var glob = glob || {
    namespace: 'recr',
    ga_event_category: '공개모집 계산기'
}
window[glob.namespace] = window[glob.namespace] || {}

// 선택된 태그 목록을 배열로 반환
window[glob.namespace].getCheckedTagIDs = function () {
	var checkedTagIDs = []
	
	var $checkboxList = $(getCheckboxList())
	
	for (var i = 0, j = 0; i < $checkboxList.length; ++i)
	{
		if ($checkboxList.eq(i).prop('checked'))
		{
			checkedTagIDs[j++] = $checkboxList.eq(i).attr('id').split('_')[1]
		}
	}
	
	return checkedTagIDs
}

window[glob.namespace].showResult = function () {
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
		footer += '<input onclick="filterClicked(\'onlyHighStars\')" type="checkbox" id="result-panel-footer-ohsf" class="checkboxButton"><label class="button" for="result-panel-footer-ohsf"><span>고등급 확정식만</span></label>'
		footer += '<div><br></div>'
		
		$('#result-panel-footer-btn').html(footer)
		
		// 필터가 켜져있었다면, 새로 만들어진 버튼도 체크되어 있도록 연동
		syncButtons()
	}
	
	// 계산 결과로 빈 배열을 받은 경우, 결과출력을 초기화.
	if (resultData.length == 0)
	{
        $('#result-panel .panel:not(.guide-panel, .advertise)').remove()
        if (userConfig.display.guidePanel.value === false) {
            $('#result-panel').prepend('<div class="panel"></div>')
        }
		return false
	}
	
	var htmlText = new String()
	
    // 입력된 태그 목록
    /*
    htmlText += `<div class="panel rarity_3"><div style="margin-bottom: 0.4em" data-lang="${userConfig.locale.region.value}"><span class="tag">선택된 태그</span><br> `
    for (var i = 0; i < checkedTagIDs.length; ++i) {
        htmlText += '<span class="tag result-tag">' + db.tag[checkedTagIDs[i]].name[userConfig.locale.region.value] + '</span> ' // result_tag
    }
    htmlText += '</div></div>'
    */
    
    // 검색 결과
	for (var i = 0; i < resultData.length; ++i)
	{
		// 필터 적용
		var lowestRarity = resultData[i].lowestRarity
		
		if ((userConfig.filter.onlyHighRarity.value == true) && (lowestRarity <= 3))
		{
			continue
		}
		
		// 가독성을 위해 참조변수 설정
		var tagCode = resultData[i].tagCode
		var opIDs = resultData[i].opIDs
		
		// tagCode를 바탕으로 구성태그의 이름들을 얻어냄
		var tagNames = getTagNames(tagCode)
		
		// 해당 케이스의 태그 부분, 대원 부분 html을 담을 임시 문자열 변수를 각각 설정
		var tagHtmlPiece = ''
		var opHtmlPiece = ''
		
		// 선택 태그들을 추가
		tagHtmlPiece += `<div style="margin-bottom: 0.4em" data-lang="${userConfig.locale.region.value}">`
		for (var j = 0; j < tagNames.length; ++j)
		{
			tagHtmlPiece += '<span class="tag result-tag">' + tagNames[j] + '</span> ' // result_tag
		}
		tagHtmlPiece += '</div>'
		
		// 출현가능 대원들을 추가
        
		var opRarity = 0
		var prevOpRarity = 0
		for (var j = 0; j < opIDs.length; ++j)
		{
			opRarity = db.op[opIDs[j]].rarity
			
			if (userConfig.filter.rarity.value.indexOf(opRarity) < 0) {
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
			if ('tiny|small|medium|large'.indexOf(userConfig.display.image.value) >= 0) {
				mainDivOpen += '<div id="op_' + String(opIDs[j]) +'" class="tag result-op rarity_' + String(opRarity) + '">' // result_op
			}
			else {
				mainDivOpen += '<div id="op_' + String(opIDs[j]) +'" class="tag result-op no-img rarity_' + String(opRarity) + '">' // result_op
			}
			
			mainDivClose += '</div>'
			
			// img
			if ('tiny|small|medium|large'.indexOf(userConfig.display.image.value) >= 0) {
				img += '<img class="result_op_thumb '
				img += userConfig.display.image.value
				img += '" src="./images/op/thumb/' + db.op[opIDs[j]].releaseOrder + '.png"> '
			}
			
			// textDiv
			if ((userConfig.display.name.value || userConfig.display.rarity.value) ){
				var textDivClass = 'result_op_text ' + userConfig.display.image.value
				
				if (userConfig.display.name.value && !userConfig.display.rarity.value) {
					textDivClass += ' only-name'
				}
				
				if (!userConfig.display.name.value && userConfig.display.rarity.value) {
					textDivClass += ' only-rarity'
				}
				
				textDivOpen += '<div class="' + textDivClass + '">'
				textDivClose += '</div>'
			}
			
			// name
			if (userConfig.display.name.value) {
				name += '<span>' + db.op[opIDs[j]].name[userConfig.locale.lang.value] + '</span> '
				
				if ('tiny|small|large'.indexOf(userConfig.display.image.value) >= 0) {	//tiny|small
					name += '<br>'
				}
				else if ('medium'.indexOf(userConfig.display.image.value) >= 0) {	//medium|large
					name += '<br>' //'<br><br>'
				}
			}
			
			// rarity
			
			if (userConfig.display.rarity.value) {
				rarity += ' <span id="op_' + String(opIDs[j]) +'" class="star rarity_' + String(opRarity) + '">'
				rarity += ' ★' + String(opRarity)
				rarity += '</span><br>'
			}
			else if (userConfig.display.name.value && ('small|medium'.indexOf(userConfig.display.image.value) >= 0)) {
				//rarity += '<br>'
			}
			
			if (userConfig.display.image.value === 'large') {
                mainDivOpen += '<div style="display:flex; flex-direction: column">'
                mainDivClose += '</div>'
            }
            else {
                mainDivOpen += '<div style="display:flex; justify-content:space-between">'
                mainDivClose += '</div>'
            }
            
			opHtmlPiece += mainDivOpen + img + textDivOpen + name + rarity + textDivClose + mainDivClose
			
			prevOpRarity = opRarity
		}
		
		if (opHtmlPiece === '') {
			opHtmlPiece = '<span id="op_-1" class="tag result-op no-img">필터링 조건에 맞는 결과 없음</span>'
		}
		
		// case의 least star에 따라서 패널의 클래스가 바뀜.
        if (!userConfig.display.name.value && !userConfig.display.rarity.value) {
            htmlText += `<div class="panel rarity_${String(lowestRarity)} only-image">`
        }
        else {
            htmlText += `<div class="panel rarity_${String(lowestRarity)}">`
        }
		htmlText += `${tagHtmlPiece}<div style="display:inline-block" data-lang="${userConfig.locale.lang.value}">${opHtmlPiece}</div>`
		htmlText += '</div>'
		
	}
	
	// htmlText가 비어있다면, 필터에 결과가 모두 걸러진 것이므로, 안내메시지 출력
	if (htmlText == '')
	{
		htmlText = '<div class="panel">'
		htmlText += '<span class="tag result-tag">결과 없음</span><br>' // result_tag
		htmlText += '<span id="op_-1" class="tag result-op no-img">필터링 조건에 맞는 결과 없음</span>' // result_op
		htmlText += '</div>'
	}
	
	// 페이지에 표시
    $('#result-panel .panel:not(.guide-panel, .advertise)').remove()
	$('#result-panel').prepend(htmlText)
    // 속도가 너무 느리다..
    // $('.result-op').textfill()
};

/* 속도가 너무 느려져서 사용하지 않음.
(function($) {
    $.fn.textfill = function(maxFontSize) {
        maxFontSize = parseInt(maxFontSize, 10);
        return this.each(function(){
            var ourText = $("span", this);
            function resizefont(){
                var parent = ourText.parent(),
                maxHeight = parent.height(),
                maxWidth = parent.width(),
                fontSize = parseInt(ourText.css("font-size"), 10),
                multiplier = maxWidth/ourText.width(),
                newSize = (fontSize*(multiplier));//-0.1)); // (multiplier-0.1)
                
                multiplier = maxHeight/ourText.height();
                maxFontSize = fontSize
                
                ourText.css("fontSize", maxFontSize > 0 && newSize > maxFontSize ? maxFontSize : newSize );
            }
            $(window).resize(function(){
                if (document.querySelector('.modal').style.display === 'block') {
                    resizefont();
                }
            });
            resizefont();
        });
    };
})(jQuery);
*/