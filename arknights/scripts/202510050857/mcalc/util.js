var gtag_breakdownUsed = false

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
        'event_category': '재료 계산기 2.0'
    })
    
	var $items = $('.item-container .item')
	
    gtag_block = true
	for (var i = 0; i < $items.length; ++i) {
		cutdownInput($items.eq(i))
	}
    gtag_block = false
}

// 모든 입력값, 설정값을 초기화
const clearAllData = function () {
	if (!confirm('주의: 이 작업은 되돌릴 수 없습니다.\n정말로 해당 서비스와 관련된 모든 데이터를 초기화하시겠습니까?')) {
		return
	}
	
    gtag('event', '모든 데이터 초기화', {
        'event_category': '재료 계산기 2.0'
    })
    
	$('.item_body_have_input, .item_body_need_input').val('')
	clearStorageData()
	location.reload()
}

const clearInvNeed = function () {
    if (!confirm('주의: 이 작업은 되돌릴 수 없습니다.\n정말로 인벤토리 탭의 필요량을 모두 초기화하시겠습니까?')) {
		return
	}
    
    gtag('event', '인벤토리 탭 필요량 초기화', {
        'event_category': '재료 계산기 2.0'
    })
    
    $('.item_body_need_input').val('')
    clearStorageNeedData()
    location.reload()
}

const clearInvHave = function () {
    if (!confirm('주의: 이 작업은 되돌릴 수 없습니다.\n정말로 인벤토리 탭의 보유량을 모두 초기화하시겠습니까?')) {
		return
	}
    
    gtag('event', '인벤토리 탭 보유량 초기화', {
        'event_category': '재료 계산기 2.0'
    })
    
    $('.item_body_have_input').val('')
    clearStorageHaveData()
    location.reload()
}

const clearCalcData = function () {
    if (!confirm('주의: 이 작업은 되돌릴 수 없습니다.\n정말로 계산 탭의 데이터를 모두 초기화하시겠습니까?\n* 인벤토리 탭의 데이터는 초기화되지 않습니다.')) {
		return
	}
	
    gtag('event', '계산 탭 데이터 정리', {
        'event_category': '재료 계산기 2.0'
    })
    
	$('.item_body_craft_input').val('')
	clearStorageCalcData()
	location.reload()
}

const toggleFilterOnlyLack = function () {
    gtag('event', '부족한 아이템만 표시 기능 토글', {
        'event_category': '재료 계산기 2.0'
    })
    
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

const checkBreakdownValue = function (elm) {
    var val = Number(elm.value)
    if (val === 0) {
        clearStorageCalcData()
        refreshAllCalcItems()
        fetchConfig()
        applyConfig()
    }
}
const applyConfig = function () {
    var $itemContainers = $('.item-container')
	/* 필터 설정 적용 */
	// 기존 필터링 결과를 초기화한 후, 새로 필터링 시작
	$itemContainers.find('[class*="category_"]').css('display', 'block')
	
	var $items = $itemContainers.find('.item')
	$items.css('display', 'inline-block')
	
	// 지정된 카테고리의 아이템을 숨김
	for (var i = 0; i < filterCategory.length; ++i) {
		var categoryID = filterCategory[i]
		$itemContainers.find('.category_' + categoryID).css('display', 'none')
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
	
    // 지정된 등급 이하로 분해
    if (breakdownGrade > 0 && document.querySelector('.calc').style.display !== 'none') {
        console.log('breakdown')
        document.querySelector('.calc').classList.add('auto-breakdown')
        breakdownByGrade(breakdownGrade)
    }
    else {
        document.querySelector('.calc').classList.remove('auto-breakdown')
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
		$itemContainers.find('.item_thumb_name').css('display', 'inline-block')
	}
	else {
		$itemContainers.find('.item_thumb_name').css('display', 'none')
	}

	// 아이템의 입력란을 표시/숨김
	if (displayInputField) {
		$itemContainers.find('.item_body_have, .item_body_need, .item_body_craft').css('display', 'inline-block')
	}
	else {
		$itemContainers.find('.item_body_have, .item_body_need, .item_body_craft').css('display', 'none')
	}
    
    // 가이드를 표시/숨김
    if (displayGuide) {
		$('.guide').css('display', 'inline-block')
	}
	else {
		$('.guide').css('display', 'none')
	}
}

// 가이드 숨김
const hideGuide = function () {
    displayGuide = false
    localStorage.setItem('mcalc_display_guide', JSON.stringify(displayGuide))
    applyConfig()
}

const setSurplus = function (elem, surplus) {
    var qty = elem.querySelector('.item_thumb_quantity')
    qty.innerText = surplus
    
    var cl = qty.classList
    
    if (surplus < 0) {
        cl.add('minus')
        cl.remove('plus')
    }
    else if (surplus > 0) {
        cl.add('plus')
        cl.remove('minus')
    }
    else {
        cl.remove('plus')
        cl.remove('minus')
    }
}

const getSurplus = function (itemID) {
    var need = getItem_need(itemID),
        have = getItem_have(itemID),
        craft = getItem_craft(itemID),
        totalDemand = getItem_totalDemand(itemID)

    return (have + craft) - (need + totalDemand)
}

const refreshDemand = function (itemID, refreshMaterial) {
    var recipe = db.item[itemID].craft[0]
    
    if (recipe !== undefined) {
        var craft = getItem_craft(itemID)
        
		// 재료 아이템의 demand 수치 변경, 그리고 재료 아이템 refresh
		// 사용자가 하나씩 변경하는 경우에 적합.
        if (refreshMaterial) {
            for (var i = 0, len = recipe.length; i < len; ++i) {
                // matID: recipe[i][0], matQty: recipe[i][1]
                var matID = recipe[i][0]
                
                setItem_demand(matID, itemID, recipe[i][1] * craft)
                
                $(document.getElementById('calc-item_' + matID)).trigger('refresh')
            }
        }
		// 재료 아이템의 demand 수치 변경, 그러나 재료 아이템을 refresh하지 않음.
		// 한꺼번에 여러 아이템에 대해 작업하는 경우에 효율적.
		// 일단 내부 수치부터 계산한 다음, 마지막에 최종 결과를 한꺼번에 출력하는 방식으로 한다던지.
        else {
            for (var i = 0, len = recipe.length; i < len; ++i) {
                // matID: [i][0], matQty: recipe[i][1]
                setItem_demand(recipe[i][0], itemID, recipe[i][1] * craft)
            }
        }
    }
}

/*
// '파밍 불가 재료 모두 제작하기'
// 파밍 불가능 재료의 surplus가 모두 없어지도록 만든다
// 이건, 아직 아이템의 파밍 정보가 db에 없어서 불가능한 기능
batchCraftByCraftability = function () {
    
}
*/

// 효율적으로 아이템 상태를 갱신
const refreshAllCalcItems = function () {
    var allCalcItems = document.querySelectorAll('.calc .item')
	var itemIDs = [], inputs = []
	
	for (var i = 0, len = allCalcItems.length; i < len; ++i) {
		itemIDs.push(allCalcItems[i].getAttribute('id').split('_')[1])
        inputs.push(allCalcItems[i].querySelector('input'))
	}
	
	for (var i = 0, len = allCalcItems.length; i < len; ++i) {
        // 입력값, 잉여값 표시 갱신
        if (inputs[i]) {
			// 로컬스토리지로부터 제작량 데이터 가져와 input에 복원
            inputs[i].value = getItem_craft(itemIDs[i])
			
			// 제작량에 따라 발생하는, 하위 재료들의 demand값을 반영.
			// demand 내부 수치부터 모두 변경하기 전에는
			// 최종 잉여량을 계산할 수 없으므로 잉여량 계산 및 출력은 아직 수행하지 않음.
			refreshDemand(itemIDs[i], false)
        }
    }
	
	// demand 내부 수치가 모두 변경되었으므로, 최종 잉여량 계산 및 출력
	for (var i = 0, len = allCalcItems.length; i < len; ++i) {
		setSurplus(allCalcItems[i], getSurplus(itemIDs[i]))
	}
}

// 'n등급 이하 재료로 분해하기'
// 지정된 등급 이하로만 구성할 수 있도록 제작량 설정
// 어쩔 수 없이 지정된 등급을 넘어서는 최종 아이템이 존재할 수 있음
const breakdownByGrade = function (highestGrade) {
    if (!gtag_breakdownUsed) {
        gtag_breakdownUsed = true
        gtag('event', '자동 분해 최초 사용', {
            'event_category': '재료 계산기 2.0'
        })
    }
    
    // 먼저, 기존 설정값 초기화
    clearStorageCalcData()
    
    // 모니터링할 대상 지정: 지정된 등급 초과, 제작 가능
    // 모니터링 대상의 surplus가 0이 되도록 제작량 설정
    // 목표를 달성할 때까지 반복
    var targets = []
    for (var i = highestGrade + 1; i <= 5; ++i) {
        targets.push(...document.querySelectorAll('.calc .item.grade_' + i + ':not(.uncraftable)'))
    }
    
    var IDs = []
    for (var i = 0, len = targets.length; i < len; ++i) {
        IDs.push(targets[i].getAttribute('id').split('_')[1])
    }
    
    // 스킬북은 제외
    // 스킬북의 ID는 6~8
    for (var i = 0, len = targets.length; i < len; ++i) {
        if (6 <= IDs[i] && IDs[i] <= 8) {
            IDs.splice(i, 1)
            targets.splice(i, 1)
            --len
            --i
        }
    }
    
    var isDone
    var loopCount = 0
    while (true) {
        isDone = true
        // 완료 조건 검사
        for (var i = 0, len = targets.length; i < len; ++i) {
            var itemID = IDs[i]
            var surplus = getSurplus(itemID)
            var craft = getItem_craft(itemID)
            
            // 잉여량이 0으로 딱 떨어지거나, 가진 게 많아서 제작을 하지 않아도 잉여량이 0보다 크다면 해당 항목은 조건 만족.
            // 위 조건을 만족하지 못하는 항목이 있다면, isDone = false가 되어 완료 조건 검사에서 탈락.
            if (!((surplus === 0) || (surplus > 0 && craft === 0))) {
                isDone = false
                break
            }
        }
        if (isDone) {
            break
        }
        
        // 검사를 통과하지 못했다면, 작업 수행
        for (var i = 0, len = targets.length; i < len; ++i) {
            var itemID = IDs[i]
            var craft = getItem_craft(itemID)
            var surplus = getSurplus(itemID)
            
            // 잉여량 수정하고, 하위 재료 요구량도 수정
            // surplus - craft >= 0이면, 즉 전혀 제작하지 않아도 부족하지 않다면 0으로 설정.
            // 그렇지 않다면, 즉, surplus - craft < 0이라면 surplus - craft >= 0을 만족하도록 craft 설정. 즉, surplus == craft로 설정.
            // craft 0, surplus 5: 0 < 5 -> craft = 0 -> craft 0 surplus 5
            // craft 5, surplus 5: 5 == 5 -> craft = craft - surplus = 0
            // craft 6, surplus 5: 6 > 5 -> craft = craft - surplus = 1 -> craft 1, surplus 0
            setItem_craft(itemID, (craft < surplus ?  0 : craft - surplus))
            
            // 하위 재료 요구량 수정. 아직 화면에는 갱신하지 않음
            refreshDemand(itemID, false)
        }
    }
    
    // 결과를 사용자에게 보여주기 위해 화면 갱신
    refreshAllCalcItems()
}

// '선호하는 파밍 재료 사전 설정하기'
// 사전 설정값대로 자동 제작.
// 제작 트리의 수직 구조에서 하나 이상의 노드가 선택되어야만 함. 선호하는 재료로 제작할 수 있도록 제작량 설정.
// 선호하는 재료를 만날 때까지 쭉 내려감.
// 선호하는 재료 이외의 surplus가 0이 되도록 함.
// 일반 재료(포도당 등)의 종류마다 하나 이상의 노드가 선택
// 칩류는 선택할 필요 없음. 어차피 선택지가 없음
// 스킬개론도 선택할 필요 없음. 어차피 스킬개론은 분해하지 않을 것임
// 특수 재료는.. 한 종류마다 선택지가 둘 밖에 없긴 하지만 선택은 가능하도록.
// 5성 재료도 선택하려면 선택할 수 있게. 분해하기 싫을 수 있으니
// 일단 이 기능은 보류. 효용성이 그렇게 커보이지 않음. 무엇보다 설정해야 할 게 너무 많음.
