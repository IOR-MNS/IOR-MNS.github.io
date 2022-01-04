var gtag_craftTooltipUsed = false

$(document).ready(function() {
	// 마우스가 itemID가 존재하는 아이템을 가리키면, 툴팁 생성 및 표시
	$(document).on('click mouseover', '.result-item-container', function(e) { // [name*="item_"]
		// itemID 확보
        var elemName = $(this).closest('.result-item-container').attr('name')
        if (!elemName) {
            return
        }
        
		var itemID = Number(elemName.split('_')[1])
		
		// 만약 정상적이지 않은 범위의 itemID라면 툴팁을 표시하지 않는다.
		if (!(itemID in db.item) || db.item[itemID].name.kr === '용문폐')
		{
			return
		}
		
		// itemID를 바탕으로 아이템의 조합식을 불러온다
		var craftRecipe = db.item[itemID].craft[0]
		var tooltipHtml = ''
		
		// 제작불가능 아이템일경우 처리
		if (craftRecipe === undefined) {
            tooltipHtml = '<div class="tooltip" style="border-color: var(--color--soft-red)"><span style="font-size: 0.7em">제작 불가</span></div>'
		}
		// 제작가능 아이템일경우, 제작식 안내
		else {
			var quantity = Number($(this).find('.result-item-quantity').text().replace(/,/g, ''))
			
			// 불러온 조합식을 바탕으로 툴팁을 만들어내기 위한 데이터로 가공한다
			var tooltipData = {
				IDs: []
			}
			
			var conditionID = undefined
			var lmdID = undefined
			for (var i = 0, len = db.item.keys.length, key = ''; i < len; ++i) {
                key = db.item.keys[i]
                
				if (db.item[key].name.kr === '컨디션') {
					conditionID = key
					continue
				}
				else if (db.item[key].name.kr === '용문폐') {
					lmdID = key
					continue
				}
				
				if (conditionID != undefined && lmdID != undefined) {
					break
				}
			}
			
			for (var i = 0, len = craftRecipe.length; i < len; ++i) {
				var _itemID = craftRecipe[i][0]
				var _itemQuantity = craftRecipe[i][1]
				
				if (_itemID == '시간' || _itemID == lmdID || _itemID == conditionID) {
					continue
				}
				if (_itemQuantity <= 0) {
					continue
				}
				
				if (tooltipData.hasOwnProperty(_itemID)) {
					tooltipData[_itemID] += _itemQuantity * quantity
				}
				else {
					tooltipData[_itemID] = _itemQuantity * quantity
					tooltipData.IDs.push(_itemID)
				}
			}
			
			// 가공된 데이터를 바탕으로 툴팁을 만들어낸다(아이템 그룹별 구분 없이)
			tooltipHtml = makeResultHtml(tooltipData)
			tooltipHtml = '<div class="tooltip">' + tooltipHtml + '</div>'
		}
		
        $('body').append(tooltipHtml)
        
        $('.tooltip')
                .css('top', (10+e.pageY) + 'px')
                .css('left', (10+e.pageX) + 'px')
        
        if (!gtag_craftTooltipUsed) {
            gtag_craftTooltipUsed = true
            gtag('event', '아이템 제작식 툴팁 최초 표시', {
                'event_category': '오퍼레이터 육성 자원 계산기'
            })
        }
	})
	
	// 마우스 이동시 툴팁이 따라감
	$(document).on('mousemove', '[name*="item_"]', function(e) {
		$('.tooltip')
			.css('top', (10+e.pageY) + 'px')
			.css('left', (10+e.pageX) + 'px')
	})
	
	
	// 마우스가 요소 밖으로 나가면 툴팁 삭제
	$(document).on('mouseout', '[name*="item_"]', function() {
		$('.tooltip').remove()
	})
	
})

const showTooltip = function (msg, el, type) {
    var $el = $(el)
    var $tooltip = $(document.createElement('div'))
    $tooltip.addClass('tooltip ' + type).text(msg).prependTo($el.parent())
    
    var pos = $el.offset()
    pos.left += ($el.innerWidth() - $tooltip.innerWidth()) / 2
    pos.top -= $tooltip.height() + parseInt($tooltip.css('margin-top'), 10) + parseInt($tooltip.css('margin-bottom'), 10) + parseInt($tooltip.css('border-bottom-width'), 10) + parseInt($tooltip.css('border-top-width'), 10) + parseInt($('body').css('font-size'), 10)
    
    $tooltip.offset(pos)
    
    var hideTooltip = function ($tooltip) {
        $tooltip.css('opacity', '0')
        setTimeout(function () {
            $tooltip.remove()
        }, 300)
    }
    
    setTimeout(function () {
        hideTooltip($tooltip)
    }, 1000)
}
