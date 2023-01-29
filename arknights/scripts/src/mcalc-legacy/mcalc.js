var itemOrder = {
	"keys": ["특수재료", "일반재료", "스킬개론", "칩류", "모듈재료"/*, "건설자재"*/],
	"모듈재료": [
		["모듈 데이터 칩", "데이터 보충 기구", "데이터 보충 조각"]
	],
	"특수재료": [
		["D32강", "바이폴라 나노플레이크 칩", "중합제", "결정 전자 장치", "공업용 소금 결정"],
		["RMA70-24", "망간 중합체", "화이트 호스 콜",	"고급 연마석",	"중합젤",	"열합금 팩", "결정 회로", "정제된 용제", "절삭유 원액", "공업용 소금 팩"],
		["RMA70-12", "망간 광석", "로식 콜", "연마석", "젤", "열합금", "결정 부품", "반합성 용제", "중합 절삭유", "공업용 소금 번들"]
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
const showItem = function (item) {
	// 아이템 목록 생성
	var html = '<hr>'
	for (var i = 0; i < itemOrder.keys.length; ++i) {
		var category = itemOrder.keys[i]
		var items = itemOrder[category]
		
		html += '<div id="category_' + i + '">'
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
				
				
				html += '</span><div class="item_thumb_quantity">0</div></div><div class="item_body"><div style="height:0.4rem"></div><div class="item_body_have">보유량<br><input type="text" class="item_body_have_input" value="'
				
				html += have
				
				html += '"></div><div class="item_body_need">필요량<br><input type="text" class="item_body_need_input" value="'
				
				html += need
				
				html += '"></div></div></div>'
			}
			
			html += '<div></div>'	//<hr>
		}
		html += '<hr>'
		html += '</div>'
	}
	
	// 생성한 아이템 목록을 표시
	$('.item-container').html(html)
	
	// 이벤트 리스너를 추가
	/*
	// 제작 방식 설정 버튼 클릭시, 버튼 상태를 전환하고, 설정을 저장, 변경내용을 반영
	$('.item_body_craft-config-btn').off('click').on('click', function () {
		var $item = $(this).parent().parent()
		var itemID = $item.attr('id').split('_')[1]
		var config = ''
		
		if ($(this).hasClass('no')) {
			$(this).removeClass('no')
			$(this).removeClass('all')
			$(this).addClass('as-possible')
			$(this).text('가능한만큼 제작')
			config = 'as-possible'
		}
		else if ($(this).hasClass('as-possible')) {
			$(this).removeClass('no')
			$(this).removeClass('as-possible')
			$(this).addClass('all')
			$(this).text('부족량 전부 제작')
			config = 'all'
		}
		else {
			$(this).removeClass('as-possible')
			$(this).removeClass('all')
			$(this).addClass('no')
			$(this).text('제작하지 않음')
			config = 'no'
		}
		
		setCraftConfig(itemID, config)
		
		$item.find('.item_thumb_quantity').trigger('change')
	})
	*/
	
	// 사용자 입력값 변화시, 로컬스토리지에 보존
	$('.item_body_have_input').off('change keyup').on('change keyup', function () {
		var ok = saveInputToLocalStorage(this, 'have')
		if (ok) {
			$(this).closest('.item').trigger('refresh')
		}
        gtag('event', '소지량 변경', {
            'event_category': '재료 계산기 1.0'
        })
	})
	$('.item_body_need_input').off('change keyup').on('change keyup', function () {
		var ok = saveInputToLocalStorage(this, 'need')
		if (ok) {
			$(this).closest('.item').trigger('refresh')
		}
        gtag('event', '필요량 변경', {
            'event_category': '재료 계산기 1.0'
        })
	})
	
	// 새로고침(잉여량 새로고침/재계산) 요구를 받으면,
	// 0. 가공 재료 아이템 목록 취득
	// 1. 가용량 문의
	// 2. 응답 받음
	// 3. 가용량을 참고하여 자신의 총보유량을 재계산
	// 4. 자신의 최종 잉여량을 계산
	$('.item').off('refresh').on('refresh', function () {
		var tmp
		
		var $this = $(this)
		var ID = Number($this.attr('id').split('_')[1])
		
		// 현재로선, 가공식이 0개 또는 1개인 경우만 존재하므로, 그걸 전제로 해서 작성함
		var craft = (db.item[ID].craft.length <= 0) ? [] : db.item[ID].craft[0]
		
		var totalNeed = 0
		var need = Number(getItem_need(ID))
		
		var totalHave = 0
		var have = Number(getItem_have(ID))
		
		// 얼만큼의 가용량이 필요한지 계산. 즉, 총필요량을 계산
		var craftDemand = getCraftDemand(this)
		
		totalNeed = need + craftDemand
		
		// 얼만큼의 수량을 제작(문의)해야 하는지 계산
		// (최종잉여량) == 0, 즉 (총필요량 - 총보유량) == 0이 되도록 제작해야 함.
		// 제작량 = 총필요량 - 자체보유량 = (need + craftDemand) - (have)
		var requestQty = totalNeed - have
		requestQty = (requestQty < 0) ? 0 : requestQty
		
		// 문의하기 전에, 기존의 가용량 정보를 초기화
		tmp = Object.keys($this.data())
		for (var i = 0; i < tmp.length; ++i) {
			if (tmp[i].indexOf('availability_') === 0) {
				$this.removeData(tmp[i])
			}
		}
		
		// 가공 가능하다면, 해당 재료 아이템에게 가용량 문의를 보냄
		for (var i = 0; i < craft.length; ++i) {
			// 재료 ID, 가공 한 번에 소모되는 수량, 재료아이템에 해당하는 제이쿼리 엘리먼트
			var matID = craft[i][0]
			var matQty = Number(craft[i][1])
			var $matElem = $('#item_' + matID)
			if ($matElem.length === 1) {
				availQuery($this, $matElem, requestQty * matQty)
			}
		}
		
		// 가용량 문의에 대한 응답을 참고하여, 자신의 총보유량을 재계산
		var craftableQty = getCraftableQty(this)
		
		totalHave = have + craftableQty
		
		// 재계산된 총보유량을 참고하여, 자신의 최종 잉여량을 재계산
		var surplus = totalHave - totalNeed
		
		// 잉여량 표시 새로고침
		setSurplus(this, surplus)
		
		// 자신이 제공하는 가용량 새로고침
		refreshAvail(this)
	})
	
	const getCraftDemand = function (elem) {
		var $elem = $(elem)
		var craftDemand = 0
		tmp = Object.keys($elem.data()).sort()
		for (var i = 0; i < tmp.length; ++i) {
			if (tmp[i].indexOf('craftDemand_') === 0) {
				craftDemand += $elem.data(tmp[i])
			}
		}
		
		return craftDemand
	}
	
	const getCraftDemandIDs = function (elem) {
		var $elem = $(elem)
		var demandIDs = []
		var tmp = Object.keys($elem.data()).sort()
		for (var i = 0; i < tmp.length; ++i) {
			if (tmp[i].indexOf('craftDemand_') === 0) {
				demandIDs.push(Number(tmp[i].split('_')[1]))
			}
		}
		
		return demandIDs
	}
	
	const setSurplus = function (elem, surplus) {
		var $elem = $(elem)
		var $thumb = $elem.find('.item_thumb')
		var $surplus = $elem.find('.item_thumb_quantity')
		
		$surplus.text(surplus)
		
		if (surplus < 0) {
			$surplus.addClass('minus').removeClass('plus')
			$thumb.addClass('minus')
		}
		else if (surplus > 0) {
			$surplus.addClass('plus').removeClass('minus')
			$thumb.removeClass('minus')
		}
		else {
			$surplus.removeClass('plus').removeClass('minus')
			$thumb.removeClass('minus')
		}
	}
	
	const getCraftableQty = function (elem) {
		var $elem = $(elem)
		var ID = $elem.attr('id').split('_')[1]
		
		// 현재로선, 가공식이 0개 또는 1개인 경우만 존재하므로, 그걸 전제로 해서 작성함
		var craft = (db.item[ID].craft.length <= 0) ? [] : db.item[ID].craft[0]
		
		var craftableQty = false
		for (var i = 0; i < craft.length; ++i) {
			// 재료 ID와 가공 한 번에 소모되는 수량, 그리고 해당 재료에 대한 가용량
			var matID = craft[i][0]
			var matQty = Number(craft[i][1])
			var avail = $elem.data('availability_' + matID)
			
			// '시간', 용문폐, 컨디션 등의 경우, 가용량 문의에 대한 응답이 돌아오지 않음.
			// 그런 경우, 다음 재료로 곧바로 넘기도록 함.
			if (avail === undefined) {
				continue
			}
			
			avail = Number(avail)
			if (isNaN(avail)) {
				console.log('가용량 데이터의 값이 비정상적임: ', this, '의 jquery data 속성: avail_' + matID + ': ' + $this.data('avail_' + matID))
				return
			}
			
			var newCraftableQty = parseInt(avail / matQty, 10)
			
			// 처음이라면, 대소비교하지 않고 무조건 기록
			if (craftableQty === false) {
				craftableQty = newCraftableQty
			}
			else {
				craftableQty = (newCraftableQty < craftableQty) ? newCraftableQty : craftableQty
			}
		}
		
		craftableQty = (craftableQty === false) ? 0 : craftableQty
		
		return craftableQty
	}
	
	// 가용량을 다시 분배함(= 제공량을 다시 계산함)
	// 제공하는 분배량이 달라진 아이템에 대해서, refreshSurplus와 refreshAvail을 수행시킴
	const refreshAvail = function (elem) {
		var $elem = $(elem)
		var ID = Number($elem.attr('id').split('_')[1])
		
		// 총가용량을 어떤 일관된 기준에 따른 정렬순서에 따라 분배
		var totalHave, totalNeed, totalAvail
		
		var have = Number(getItem_have(ID))
		var need = Number(getItem_need(ID))
		var craftableQty = getCraftableQty(elem)
		
		totalHave = have + craftableQty
		totalAvail = totalHave - need
		
		var demandIDs = getCraftDemandIDs(elem)
		var refreshList = []
		for (var i = 0; i < demandIDs.length; ++i) {
			var $demandElem = $('#item_' + demandIDs[i])
			var demandQty = $elem.data('craftDemand_' + demandIDs[i])
			var prevDist = $demandElem.data('availability_' + ID)
			prevDist = (prevDist === undefined) ? 0 : prevDist
			
			totalAvail = (totalAvail < 0) ? 0 : totalAvail
			
			if (totalAvail < demandQty) {
				$demandElem.data('availability_' + ID, totalAvail)
				totalAvail = 0
			}
			else {
				$demandElem.data('availability_' + ID, demandQty)
				totalAvail -= demandQty
			}
			
			var newDist = $demandElem.data('availability_' + ID)
			
			if (prevDist != newDist) {
				refreshList.push($demandElem)
			}
		}
		
		// 제공하는 분배량이 달라진 아이템에 대해서, refreshSurplus와 refreshAvail을 수행시킴
		for (var i = 0; i < refreshList.length; ++i) {
			var _ID = refreshList[i].attr('id').split('_')[1]
			var surplus = 0
			var totalHave = Number(getItem_have(_ID)) + getCraftableQty(refreshList[i])
			var totalNeed = Number(getItem_need(_ID)) + getCraftDemand(refreshList[i])
			surplus = totalHave - totalNeed
			
			setSurplus(refreshList[i], surplus)
			refreshAvail(refreshList[i])
		}
	}
	
	// 가용량 문의를 실행
	// target의 craftDemand 객체에 새로운 문의 내역을 반영
	// 새로운 문의내역을 기반으로, target의 총가용량, 즉 (총보유량 - 자체필요량(=유저입력값))을 문의순서별로 분배
	// 제공하는 분배량이 달라진 아이템이 있다면(단, 이번에 문의한 client 아이템은 제외하고), 새로고침하도록 시킴
	const availQuery = function (clientElem, targetElem, quantity) {
		var $clientElem = $(clientElem)
		var $targetElem = $(targetElem)
		var clientID = Number($clientElem.attr('id').split('_')[1])
		var targetID = Number($targetElem.attr('id').split('_')[1])
		
		quantity = Number(quantity)
		
		if (isNaN(quantity)) {
			console.log('오류: 매개변수를 숫자로 변환할 수 없음', quantity)
			return
		}
		
		// target의 craftDemand 객체에 새로운 문의 내역을 반영
		$targetElem.data('craftDemand_' + clientID, quantity)
		
		// 새로운 문의내역을 기반으로, target의 총가용량을, 어떤 일관된 기준에 따른 정렬순서에 따라 분배
		var totalHave, totalNeed, totalAvail
		
		var have = Number(getItem_have(targetID))
		var need = Number(getItem_need(targetID))
		
		var craftableQty = getCraftableQty(targetElem)
		var craftDemand = getCraftDemand(targetElem)
		
		totalHave = have + craftableQty
		totalNeed = need + craftDemand
		totalAvail = totalHave - need
		
		var demandIDs = getCraftDemandIDs(targetElem)
		var refreshList = []
		for (var i = 0; i < demandIDs.length; ++i) {
			var $demandElem = $('#item_' + demandIDs[i])
			var demandQty = $targetElem.data('craftDemand_' + demandIDs[i])
			var prevDist = $demandElem.data('availability_' + targetID)
			prevDist = (prevDist === undefined) ? 0 : prevDist
			
			totalAvail = (totalAvail < 0) ? 0 : totalAvail
			
			if (totalAvail < demandQty) {
				$demandElem.data('availability_' + targetID, totalAvail)
				totalAvail = 0
			}
			else {
				$demandElem.data('availability_' + targetID, demandQty)
				totalAvail -= demandQty
			}
			
			var newDist = $demandElem.data('availability_' + targetID)
			
			if (prevDist != newDist && demandIDs[i] != clientID) {
				refreshList.push($demandElem)
			}
		}
		
		// 제공하는 분배량이 달라진 아이템이 있다면(단, 이번에 문의한 client 아이템은 제외하고), 새로고침하도록 시킴
		for (var i = 0; i < refreshList.length; ++i) {
			refreshList[i].trigger('refresh')
		}
		
		/*
		// 잉여량 표시 새로고침
		var surplus = totalHave - totalNeed
		setSurplus(targetElem, surplus)
		*/
		$targetElem.trigger('refresh')
	}
	
	// 모든 아이템들에 대해 계산 수행
	$('.item').trigger('refresh')
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
	
	console.log('invalid inputType:', inputType)
	
	return false
}

// itemOrder의 한글이름을 itemID로 변환해서 showResult 호출
$(document).ready(function () {
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
	
	showItem()
    
    document.getElementById('content-body').classList.add('loaded')
})
