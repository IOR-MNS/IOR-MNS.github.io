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
    gtag('event', '인벤토리 입력값 정리', {
        'event_category': '재료 계산기 1.0'
    })
    
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
	
    gtag('event', '모든 데이터 초기화', {
        'event_category': '재료 계산기 1.0'
    })
    
	$('.item_body_have_input, .item_body_need_input').val('')
	clearLocalStorage()
	location.reload()
}

const clearInvNeed = function () {
    if (!confirm('주의: 이 작업은 되돌릴 수 없습니다.\n정말로 필요량을 모두 초기화하시겠습니까?')) {
		return
	}
    
    gtag('event', '필요량 초기화', {
        'event_category': '재료 계산기 1.0'
    })
    
    $('.item_body_need_input').val('')
    clearStorageNeedData()
    location.reload()
}

const clearInvHave = function () {
    if (!confirm('주의: 이 작업은 되돌릴 수 없습니다.\n정말로 보유량을 모두 초기화하시겠습니까?')) {
		return
	}
    
    gtag('event', '보유량 초기화', {
        'event_category': '재료 계산기 1.0'
    })
    
    $('.item_body_have_input').val('')
    clearStorageHaveData()
    location.reload()
}

const toggleFilterOnlyLack = function () {
	filterOnlyLack = !filterOnlyLack
	localStorage.setItem('mcalc_filter_onlyLack', JSON.stringify(filterOnlyLack))
	refreshBtnFilterOnlyLack()
	applyConfig()
}

const refreshBtnFilterOnlyLack = function () {
    gtag('event', '부족한 아이템만 표시 기능 토글', {
        'event_category': '재료 계산기 1.0'
    })
    
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
			var itemGrade = db.item[itemID].grade
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

// 선호하는 재료 계산기 설정
if (!localStorage.getItem('preferred-version_mcalc')) {
    if (confirm("아직 선호하는 재료 계산기가 설정되어 있지 않습니다.\n\n이 재료 계산기를 선호하신다면 [확인] 버튼을,\n아니라면 [취소] 버튼을 눌러주세요.\n(이 설정은 각 재료 계산기의 메뉴에서 언제든지 변경할 수 있습니다)")) {
        localStorage.setItem('preferred-version_mcalc', '1')
    }
    else {
        localStorage.setItem('preferred-version_mcalc', '2')
    }
}