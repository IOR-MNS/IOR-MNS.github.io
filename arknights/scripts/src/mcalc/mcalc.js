var gtag_block = false

var itemOrder = {
	"keys": ["특수재료", "일반재료", "스킬개론", "칩류", "모듈재료"/*, "건설자재"*/],
	"모듈재료": [
		["모듈 데이터 칩", "데이터 보충 기구", "데이터 보충 조각"]
	],
	"특수재료": [
		["D32강", "바이폴라 나노플레이크 칩", "중합제", "결정 전자 장치", "핵결정체 소결물"],
		["RMA70-24", "망간 중합체", "화이트 호스 콜",	"고급 연마석",	"중합젤",	"열합금 팩", "결정 회로", "정제된 용제", "절삭유 원액", "합성 소금 팩", "고리형 탄화수소 프리팹", "경화 섬유판"],
		["RMA70-12", "망간 광석", "로식 콜", "연마석", "젤", "열합금", "결정 부품", "반합성 용제", "중합 절삭유", "합성 소금 번들", "고리형 탄화수소 중합체", "갈소 섬유"]
	],

	"일반재료": [
	
		["포도당 팩", "폴리에스테르 팩", "개량 장치", "정제 원암", "아케톤 팩", "이철 팩"],
		["포도당 번들", "폴리에스테르 번들", "리뉴얼 장치", "원암 큐브 번들", "아케톤 응집체 번들", "이철 번들"],
		["포도당", "폴리에스테르", "장치", "원암 큐브", "아케톤 응집체", "이철"], 
		["대체당", "에스테르 원료", "파손된 장치", "원암", "디케톤", "이철 조각"]
	
	/*
		["포도당 팩", "포도당 번들", "포도당", "대체당"],
		["폴리에스테르 팩", "폴리에스테르 번들", "폴리에스테르", "에스테르 원료"],
		["개량 장치", "리뉴얼 장치", "장치", "파손된 장치"],
		["정제 원암", "원암 큐브 번들", "원암 큐브", "원암"],
		["아케톤 팩", "아케톤 응집체 번들", "아케톤 응집체", "디케톤"],
		["이철 팩", "이철 번들", "이철", "이철 조각"]
	*/
	],

	"스킬개론": [
		["스킬개론 제3권", "스킬개론 제2권", "스킬개론 제1권"]
	],

	"칩류": [
		["칩 첨가제", "구매증명서"],
		["뱅가드 듀얼 칩", "가드 듀얼 칩", "디펜더 듀얼 칩", "스나이퍼 듀얼 칩", "캐스터 듀얼 칩", "메딕 듀얼 칩", "서포터 듀얼 칩", "스페셜리스트 듀얼 칩"],
		["뱅가드 칩셋", "가드 칩셋", "디펜더 칩셋", "스나이퍼 칩셋", "캐스터 칩셋", "메딕 칩셋", "서포터 칩셋", "스페셜리스트 칩셋"], 
		["뱅가드 칩", "가드 칩", "디펜더 칩", "스나이퍼 칩", "캐스터 칩", "메딕 칩", "서포터 칩", "스페셜리스트 칩"]
	/*
		["칩 첨가제"],
		["뱅가드 듀얼 칩", "뱅가드 칩셋", "뱅가드 칩"],
		["가드 듀얼 칩", "가드 칩셋", "가드 칩"],
		["디펜더 듀얼 칩", "디펜더 칩셋", "디펜더 칩"],
		["스나이퍼 듀얼 칩", "스나이퍼 칩셋", "스나이퍼 칩"],
		["캐스터 듀얼 칩", "캐스터 칩셋", "캐스터 칩"],
		["메딕 듀얼 칩", "메딕 칩셋", "메딕 칩"],
		["서포터 듀얼 칩", "서포터 칩셋", "서포터 칩"],
		["스페셜리스트 듀얼 칩", "스페셜리스트 칩셋", "스페셜리스트 칩"]
	*/
	]/*,
	
	"건설자재": [
		["고급건설자재", "중급건설자재", "초급건설자재"],
		["카본 팩", "카본 번들", "카본"]
	]
	*/
}

// 아이템 목록 표시
const setInv = function (item) {
	// 아이템 목록 생성
	var html = '<hr>'
	for (var i = 0; i < itemOrder.keys.length; ++i) {
		var category = itemOrder.keys[i]
		var items = itemOrder[category]
		
		html += '<div class="category_' + i + '">'
		for (var j = 0; j < items.length; ++j) {
			for (var k = 0; k < items[j].length; ++k) {
				var itemID = Number(items[j][k])
				var grade = db.item[itemID].grade
				
				var have = getItem_have(itemID)
				var need = getItem_need(itemID)
				
				have = (have === null) ? '' : have
				need = (need === null) ? '' : need
				
				have = (have == 0) ? '' : have
				need = (need == 0) ? '' : need
				
				html += '<div align="center" class="item ' + 'grade_' + grade + '" id="item_' + items[j][k] + '"><div class="item_thumb"><img src="./images/item/t/'
				
				html += db.item[itemID].name.kr
				
				html += '.png"><span class="item_thumb_name">'
				
				html += db.item[itemID].name.kr
				
				
				html += '</span><div class="item_thumb_quantity">0</div></div><div class="item_body_have"><span>보유량</span><br><div class="item_body_input_wrapper"><div class="sub">-</div><input type="text" class="item_body_have_input" value="'
				
				html += have
				
				html += '"><div class="add">+</div></div></div><div class="item_body_need"><span>필요량</span><br><div class="item_body_input_wrapper"><div class="sub">-</div><input type="text" class="item_body_need_input" value="'
				
				html += need
				
				html += '"><div class="add">+</div></div></div></div>'
			}
			
			html += '<div></div>'
		}
		html += '<hr>'
		html += '</div>'
	}
	
	// 생성한 아이템 목록을 관리 탭에 표시
	var $inv = $('.item-container.inv')
    $inv.html(html)
    
	// 이벤트 리스너를 추가
    $inv.find('.add').off('click').on('click', function () {
        var input = this.parentElement.querySelector('input')
        var curVal = Number(input.value) || 0
        input.value = curVal + 1
        $(input).trigger('change')
    })
    $inv.find('.sub').off('click').on('click', function () {
        var input = this.parentElement.querySelector('input')
        var curVal = Number(input.value) || 0
        input.value = (curVal - 1 <= 0) ? '' : curVal - 1
        $(input).trigger('change')
    })
	
	// 사용자 입력값 변화시, 로컬스토리지에 보존
	$inv.find('.item_body_have_input').off('change keyup').on('change keyup', function () {
		var ok = saveInputToLocalStorage(this, 'have')
		if (ok) {
			$(this).closest('.item').trigger('refresh')
		}
        
        if (!gtag_block) {
            gtag('event', '소지량 변경', {
                'event_category': '재료 계산기 2.0',
                'event_label': 'inv'
            })
        }
	})
    
	$inv.find('.item_body_need_input').off('change keyup').on('change keyup', function () {
		var ok = saveInputToLocalStorage(this, 'need')
		if (ok) {
			$(this).closest('.item').trigger('refresh')
		}
        
        if (!gtag_block) {
            gtag('event', '필요량 변경', {
                'event_category': '재료 계산기 2.0',
                'event_label': 'inv'
            })
        }
	})
    
	const refreshHandler = function () {
		var ID = Number(this.getAttribute('id').split('_')[1])
        
		var need = getItem_need(ID)
		var have = getItem_have(ID)
		
		var surplus = have - need
		
		// 잉여량 표시 새로고침
		setSurplus(this, surplus)
        
        // 계산 탭의 아이템은 이때 새로고침하지 않는다.
        // 계산 탭으로 이동 시에 자동으로 새로고침.
	}
    
    $inv.find('.item').off('refresh').on('refresh', refreshHandler)
    
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
	
	// 모든 아이템들에 대해 갱신 수행
	$inv.find('.item').trigger('refresh')
}


/*
inv에서 설정된 잉여값을 가져옴.
+버튼을 눌러 합성, -버튼을 눌러 합성 취소
각 아이템마다 composition count 존재
합성 취소 === --composition count,
합성 === ++composition count

composition count가 증가한 만큼 하위 재료의 필요량 증가, 자신의 필요량 감소
composition count가 감소한 만큼 하위 재료의 필요량 감소, 자신의 필요량 증가

또는,
하위 재료의 dataset에 자신의 compositionRequest를 기록, 변경하는 것도 방법 중 하나.
이 경우, 자신 입장에서는 composition count만큼 보유량이 증가하고,
하위재료입장에서는 모든 compositionRequest의 합만큼 필요량이 증가.

inv 데이터는 그대로 mcalc_에 저장(기존 데이터와 호환을 위해)
calc의 데이터는 mcalc_calc_에 저장(composition count만 저장)
composition count 복원 순서는 상관 없음. 어차피 필요량과 보유량을 올리는 일이므로, 순서가 뒤죽박죽이더라도 문제는 없음.


*/

const setCalc = function (item) {
    console.log('setCalc')
	// 아이템 목록 생성
	var html = '<hr>'
	for (var i = 0; i < itemOrder.keys.length; ++i) {
		var category = itemOrder.keys[i]
		var items = itemOrder[category]
		
		html += '<div class="category_' + i + '">'
		for (var j = 0; j < items.length; ++j) {
			for (var k = 0; k < items[j].length; ++k) {
				var itemID = Number(items[j][k])
				var grade = db.item[itemID].grade
				var craft = getItem_craft(itemID)
				craft = (craft === null) ? '' : craft
				craft = (craft == 0) ? '' : craft
                
                // 제작 가능한 아이템인지 확인
                var isCraftable = db.item[itemID].craft.length > 0
                
				html += '<div align="center" class="item grade_'
                html += grade
                if (!isCraftable) {
                    html += ' uncraftable'
                }
                html += '" id="calc-item_' + items[j][k] + '"><div class="item_thumb"><img src="./images/item/t/'
				
				html += db.item[itemID].name.kr
				
				html += '.png"><span class="item_thumb_name">'
				
				html += db.item[itemID].name.kr
				
				html += `</span><div class="item_thumb_quantity">0</div></div><div class="item_body_craft">`
                
                if (!isCraftable) {
                    html += '<span>제작 불가</span>'
                }
                else {
                    html += `<span>제작량</span><br><div class="item_body_input_wrapper"><div class="sub">-</div><input type="text" class="item_body_craft_input" value="${craft}"><div class="add">+</div></div>`
                }
                html += '</div></div>'
			}
			
			html += '<div></div>'
		}
		html += '<hr>'
		html += '</div>'
	}
	
	// 생성한 아이템 목록을 계산 탭에 표시
	var $calc = $('.item-container.calc')
    $calc.html(html)
    
	// 이벤트 리스너를 추가
    $calc.find('.add').off('click').on('click', function () {
        if (breakdownGrade > 0) { return }
    
        var input = this.parentElement.querySelector('input')
        var curVal = Number(input.value) || 0
        input.value = curVal + 1
        $(input).trigger('change')
    })
    $calc.find('.sub').off('click').on('click', function () {
        if (breakdownGrade > 0) { return }
        
        var input = this.parentElement.querySelector('input')
        var curVal = Number(input.value) || 0
        input.value = (curVal - 1 <= 0) ? '' : curVal - 1
        $(input).trigger('change')
    })
    
    $calc.find('.item:not(.uncraftable) .item_thumb_quantity').off('click').on('click', function () {
        if (breakdownGrade > 0) { return }
        
        var surplus = Number(this.innerText)
        var input = this.parentElement.parentElement.querySelector('input')
        var inputValue = Number(input.value)
        
        if (inputValue > surplus) {
            input.value = inputValue - surplus
        }
        else {
            input.value = ''
        }
        
        $(input).trigger('change')
    })
	
	// 사용자 입력값 변화시, 로컬스토리지에 보존
	$calc.find('.item_body_craft_input').off('change keyup').on('change keyup', function () {
        if (breakdownGrade > 0) {
            this.value = getItem_craft($(this).closest('.item').attr('id').split('_')[1])
            return
        }
        
        // 레시피가 존재하지 않는다면, 제작할 수 없음
        if (this.classList.contains('uncraftable')) {
            this.value = ''
        }
        
		saveInputToLocalStorage(this, 'craft')
        
        if (!gtag_block) {
            gtag('event', '제작량 변경', {
                'event_category': '재료 계산기 2.0',
                'event_label': 'calc'
            })
        }
        
        $(this).closest('.item').trigger('refresh')
	})
    
	const refreshHandler = function () {
		var ID = Number(this.getAttribute('id').split('_')[1])
        
        // 잉여량 표시 새로고침
		setSurplus(this, getSurplus(ID))
        
        // 하위 재료 요구량 수정
        refreshDemand(ID, true)
        
        applyConfig()
	}
    
    $calc.find('.item').off('refresh').on('refresh', refreshHandler)
	
    /*
	// 모든 아이템들에 대해 갱신 수행
	$calc.find('.item').trigger('refresh')
    */
}

// 입력값에 대한 유효성 검사 후 로컬스토리지에 보존
// 문제가 없으면 true, 문제가 있으면 false 반환
const saveInputToLocalStorage = function (inputElem, inputType) {
	var $inputElem = $(inputElem)
	
	if (inputType === 'have') {
		// 필요한 변수 선언
		var $item = $inputElem.closest('.item')
		var itemID = Number($item.attr('id').split('_')[1])
		var newVal = Number($inputElem.val().replace(/[^0-9]/g,""))
		var prevVal = Number(getItem_have(itemID))
		
		// 입력값의 유효성 검증
		if (isNaN(newVal)) {
			prevVal = (prevVal === 0) ? '' : prevVal
			$inputElem.val(prevVal)
			return false
		}
		
		// 새로 입력받은 값을 로컬스토리지에 보존
		setItem_have(itemID, newVal)
		
		newVal = (newVal === 0) ? '' : newVal
		$inputElem.val(newVal)

		return true
	}
	else if (inputType === 'need') {
		// 필요한 변수 선언
		var $item = $inputElem.closest('.item')
		var itemID = Number($item.attr('id').split('_')[1])
		var newVal = Number($inputElem.val())
		var prevVal = Number(getItem_need(itemID))
		
		// 입력값의 유효성 검증
		if (isNaN(newVal)) {
			$inputElem.val(prevVal)
			return false
		}
		
		// 새로 입력받은 값을 로컬스토리지에 보존
		setItem_need(itemID, newVal)
		
		return true
	}
    else if (inputType === 'craft') {
		// 필요한 변수 선언
		var $item = $inputElem.closest('.item')
		var itemID = Number($item.attr('id').split('_')[1])
		var newVal = Number($inputElem.val())
		var prevVal = Number(getItem_need(itemID))
		
		// 입력값의 유효성 검증
		if (isNaN(newVal)) {
			$inputElem.val(prevVal)
			return false
		}
		
		// 새로 입력받은 값을 로컬스토리지에 보존
		setItem_craft(itemID, newVal)
		
		return true
	}
	
	console.log('invalid inputType:', inputType)
	
	return false
}

// itemOrder의 한글이름을 itemID로 변환해서 showResult 호출
$(document).ready(function () {
	// 시작할 때마다 세션스토리지 초기화.
	clearSessionStorageCalcData()
	
	const a = function(name){
        for (var id in db.item) {
            if (db.item[id].name.kr === name) {
                return id
            }
        }
        
        return -1
	}
	
	for (var i = 0; i < itemOrder.keys.length; ++i) {
		var category = itemOrder.keys[i]
		var items = itemOrder[category]
		
		for (var j = 0; j < items.length; ++j) {
			for (var k = 0; k < items[j].length; ++k) {
				var t = a(items[j][k])
				
				if (t < 0) {
					console.log(items[j][k], 'error')
					return
				}
				
				items[j][k] = t
			}
		}
	}
	
	setInv()
    
    const tabHandler = function (event) {
        if (this.classList.contains('selected')) {
            return false
        }
        
        var tabList = document.querySelectorAll('.tab')
        for (var j = 0, jlen = tabList.length; j < jlen; ++j) {
            if (tabList[j].dataset.tabName !== this.dataset.tabName) {
                tabList[j].classList.remove('selected')
            }
            else {
                tabList[j].classList.add('selected')
            }
        }
        
        var gtag_targetTabName = ''
        var containers = document.querySelectorAll('.item-container')
        for (var j = 0, jlen = containers.length; j < jlen; ++j) {
            if (containers[j].dataset.tabName !== this.dataset.tabName) {
                containers[j].style.display = 'none'
            }
            else {
                gtag_targetTabName = containers[j].dataset.tabName
                // 계산 탭으로 이동시, 아이템 새로고침하고 필터 적용
                if (containers[j].dataset.tabName === 'calc') {
                    if (containers[j].innerHTML.length === 0) {
                        setCalc()
                    }
                    refreshAllCalcItems()
                    containers[j].style.display = 'block'
                    // applyConfig는 화면에 나타낸 뒤에 적용해야만 한다.
                    applyConfig()
                }
                else {
                    containers[j].style.display = 'block'
                }
            }
        }
        
        if (!gtag_block) {
            gtag('event', '탭 이동', {
                'event_category': '재료 계산기 2.0',
                'event_label': gtag_targetTabName
            })
        }
    }
    
    var tabs = document.querySelectorAll('.tab')
    
    for (var i = 0, len = tabs.length; i < len; ++i) {
        tabs[i].addEventListener('click', tabHandler)
    }
    
    document.querySelector('.tab[data-tab-name="inv"]').click()
    
    document.getElementById('content-body').classList.add('loaded')
})
