// 보유량, 필요량을 깔끔하게 정산
const cutdownInput = function (item) {
	var $item = $(item)
	var $haveInput = $item.find('.item_body_have_input')
	var $needInput = $item.find('.item_body_need_input')
	
	var prevHave = $haveInput.val()
	var prevNeed = $needInput.val()
	
	var have = Number(prevHave)
	var need = Number(prevNeed)
	
	have = isNaN(have) ? 0 : have
	need = isNaN(need) ? 0 : need
	
	if (have > need) {
		have -= need
		need = 0
	}
	else {
		need -= have
		have = 0
	}
	
	have = (have === 0) ? '' : have
	need = (need === 0) ? '' : need
	
	$haveInput.val(have)
	$needInput.val(need)
	
	if (prevHave != $haveInput.val()) {
		$haveInput.trigger('change')
	}
	if (prevNeed != $needInput.val()) {
		$needInput.trigger('change')
	}
}

const cutdownAllInputs = function () {
	var $items = $('.item-container .item')
	
	for (var i = 0; i < $items.length; ++i) {
		cutdownInput($items.eq(i))
	}
}

// 모든 입력값, 설정값을 초기화
const clearInputData = function () {
	if (!confirm('주의: 이 작업은 되돌릴 수 없습니다.\n정말로 해당 서비스와 관련된 모든 데이터를 초기화하시겠습니까?')) {
		return
	}
	
	$('.item_body_have_input, .item_body_need_input').val('')
	clearLocalStorage()
	location.reload()
}

const toggleFilterOnlyLack = function () {
	filterOnlyLack = !filterOnlyLack
	localStorage.setItem('mcalc_filter_onlyLack', JSON.stringify(filterOnlyLack))
	refreshBtnFilterOnlyLack()
	applyConfig()
}

const refreshBtnFilterOnlyLack = function () {
	var $btns = $('[name="toggleFilterOnlyLack"]')
	
	for (var i = 0; i < $btns.length; ++i) {
		if (filterOnlyLack) {
			$btns.eq(i).html('부족한 아이템만 표시 <span style="color:#187dc9">ON</span>')
		}
		else {
			$btns.eq(i).html('부족한 아이템만 표시 <span style="color:#de0d0d">OFF</span>')
		}
	}
}

const applyConfig = function () {
	/* 필터 설정 적용 */
	// 기존 필터링 결과를 초기화한 후, 새로 필터링 시작
	$('.item-container [id*="category_"]').css('display', 'block')
	
	var $items = $('.item-container .item')
	$items.css('display', 'inline-block')
	
	// 지정된 카테고리의 아이템을 숨김
	for (var i = 0; i < filterCategory.length; ++i) {
		var categoryID = filterCategory[i]
		$('.item-container #category_' + categoryID).css('display', 'none')
	}
	
	// 지정된 등급의 아이템을 숨김
	for (var i = 0; i < filterGrade.length; ++i) {
		for (var j = 0; j < $items.length; ++j) {
			var itemID = Number($items.eq(j).attr('id').split('_')[1])
			var itemGrade = itemData[itemID].grade
			if (itemGrade == filterGrade[i]) {
				$items.eq(j).css('display', 'none')
			}
		}
	}
	
	// '부족한 아이템만 표시' 활성화 여부에 따라서 필터링 실행
	if (filterOnlyLack) {
		for (var i = 0; i < $items.length; ++i) {
			var surplus = Number($items.eq(i).find('.item_thumb_quantity').text())
			if (surplus >= 0) {
				$items.eq(i).css('display', 'none')
			}
		}
	}
	
	/* 표시 설정 적용 */
	// 아이템의 이름을 표시/숨김
	if (displayName) {
		$('.item-container .item_thumb_name').css('display', 'inline-block')
	}
	else {
		$('.item-container .item_thumb_name').css('display', 'none')
	}

	// 아이템의 입력란을 표시/숨김
	if (displayInputField) {
		$('.item-container .item_body').css('display', 'inline-block')
	}
	else {
		$('.item-container .item_body').css('display', 'none')
	}
}