$(document).ready(function() {
	// 마우스가 itemID가 존재하는 아이템을 가리키면, 툴팁 생성 및 표시
	$(document).on('click mouseover', '[name*="item_"]', function(e) {
		// 기존의 툴팁 모두 제거
		$('.tooltip').remove()
		
		// itemID 확보
		var itemID = Number($(this).attr('name').split('_')[1])
		
		// 만약 정상적이지 않은 범위의 itemID라면 툴팁을 표시하지 않는다.
		if (itemID < 0 || itemID >= Object.keys(itemData).length)
		{
			return
		}
		
		// itemID를 바탕으로 아이템의 조합식을 불러온다
		var craftRecipe = itemData[itemID].craft[0]
		
		var tooltipHtml = ''
		
		// 제작불가능 아이템일경우 처리
		if (craftRecipe === undefined) {
			return
			//tooltipHtml = '<span id="tooltip">' + '제작불가능' + '</span>'
		}
		// 제작가능 아이템일경우, 제작식 안내
		else {
			console.log('제작식', craftRecipe)
			
			var quantity = Number($(this).find('.result-item-quantity').text())
			
			// 불러온 조합식을 바탕으로 툴팁을 만들어내기 위한 데이터로 가공한다
			var tooltipData = {
				IDs: []
			}
			
			var itemDataLen = Object.keys(itemData).length
			var conditionID = -1
			var lmdID = -1
			for (var i = 0; i < itemDataLen; ++i) {
				if (itemData[i].name.kr === '컨디션') {
					conditionID = i
					continue
				}
				else if (itemData[i].name.kr === '용문폐') {
					lmdID = i
					continue
				}
				
				if (conditionID >= 0 && lmdID >= 0) {
					break
				}
			}
			
			for (var i = 0; i < craftRecipe.length; ++i) {
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
			tooltipHtml = '<span class="tooltip">' + tooltipHtml + '</span>'
		}
		
		// 툴팁을 표시한다.
		var tooltip = $('body').append(tooltipHtml)
		
		$('.tooltip')
			.css('top', e.pageY + 'px')
			.css('left', e.pageX + 'px')
			.fadeIn(200)
	})
	
	
	// 마우스 이동시 툴팁이 따라감
	$(document).on('mousemove', '[name*="item_"]', function(e) {
		$('.tooltip')
			.css('top', e.pageY + 'px')
			.css('left', e.pageX + 'px')
	})
	
	
	
	// 마우스가 요소 밖으로 나가면 툴팁 삭제
	$(document).on('mouseout', '[name*="item_"]', function() {
		
		$('.tooltip').remove()
	})
	
})