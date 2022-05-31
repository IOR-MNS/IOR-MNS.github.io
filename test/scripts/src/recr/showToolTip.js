var gtag_opTooltipUsed = false

$(document).ready(function() {
	// 마우스가 result_op를 가리키면, 툴팁 생성 및 표시
	$(document).on('click mouseover', '.result-op', function(e) {
		// 기존의 툴팁 모두 제거
		$('.tooltip').remove()
		
		// result_op 클래스의 id는 'op_' 문자열 뒤에 해당 대원의 ID가 있도록 약속되어 있다.
		var opID = $(e.target).closest('.result-op').attr('id').split('_')[1]
		
		// 만약 정상적이지 않은 범위의 opID라면 툴팁을 표시하지 않는다.
		if (!(opID in db.op))
		{
			return
		}
		
		// opID를 바탕으로 대원의 tagCode를 불러오고, 그것을 바탕으로 보유 태그명을 찾아낸다.
		var tagCode = db.op[opID].tagCode
		var tagNames = getTagNames(tagCode)
		
		// 얻어낸 보유 태그명들을 툴팁으로 표시한다.
		var tooltipHtml = ''
		for (var i = 0; i < tagNames.length; ++i)
		{
            tooltipHtml += `<span class="tag result-tag">${tagNames[i]}</span>`
		}
		
		$('body').append(`<p class="tooltip" data-lang="${userConfig.locale.region.value}">${tooltipHtml}</p>`)
        $('.tooltip').css('top', e.pageY + 'px').css('left', e.pageX + 'px')
        
        if (!gtag_opTooltipUsed) {
            gtag_opTooltipUsed = true
            gtag('event', '오퍼레이터 툴팁 최초 표시', {
                'event_category': '공개모집 계산기'
            })
        }
	})
	
	// 마우스 이동시 툴팁이 따라감
	$(document).on('mousemove', '.result-op', function(e) {
		$('.tooltip').css('top', e.pageY + 'px').css('left', e.pageX + 'px')
	})
	
	// 마우스가 요소 밖으로 나가면 툴팁 삭제
	$(document).on('mouseout', '.result-op', function() {
		
		$('.tooltip').remove()
	})
})
