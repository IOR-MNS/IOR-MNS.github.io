var itemOrder = {
	"keys": ["특수 재료", "일반 재료", "스킬개론", "칩류", "건설자재"],
	
	"특수 재료": [
		["D32강", "바이폴라 나노플레이크 칩", "중합제"],
		["RMA70-24", "RMA70-12","망간 중합체", "망간 광석","화이트 호스 콜", "로식 콜","고급 연마석", "연마석"],
		["중합젤", "젤라틴","열합금 덩어리", "열합금"]
	],

	"일반 재료": [
		["포도당 팩", "포도당 번들", "포도당", "대체당"],
		["폴리에스테르 팩", "폴리에스테르 번들", "폴리에스테르", "에스테르 원료"],
		["개량 장치", "리뉴얼 장치", "장치", "파손된 장치"],
		["정제 원암", "원암 큐브 번들", "원암 큐브", "원암"],
		["아케톤 팩", "아케톤 응집체 번들", "아케톤 응집체", "디케톤"],
		["이철 팩", "이철 번들", "이철", "이철 조각"]
	],

	"스킬개론": [
		["스킬개론 제3권", "스킬개론 제2권", "스킬개론 제1권"]
	],

	"칩류": [
		["칩 첨가제"],
		["뱅가드 듀얼 칩", "뱅가드 칩셋", "뱅가드 칩"],
		["가드 듀얼 칩", "가드 칩셋", "가드 칩"],
		["디펜더 듀얼 칩", "디펜더 칩셋", "디펜더 칩"],
		["스나이퍼 듀얼 칩", "스나이퍼 칩셋", "스나이퍼 칩"],
		["캐스터 듀얼 칩", "캐스터 칩셋", "캐스터 칩"],
		["메딕 듀얼 칩", "메딕 칩셋", "메딕 칩"],
		["서포터 듀얼 칩", "서포터 칩셋", "서포터 칩"],
		["스페셜리스트 듀얼 칩", "스페셜리스트 칩셋", "스페셜리스트 칩"]
	],

	"건설자재": [
		["고급건설자재", "중급건설자재", "초급건설자재"],
		["카본 팩", "카본 번들", "카본"]
	]
}

// 아이템 목록 표시
const showItem = function (item) {
	var html = ''
	
	for (var i = 0; i < itemOrder.keys.length; ++i) {
		var category = itemOrder.keys[i]
		var items = itemOrder[category]
		
		html += '<div id="category_' + i + '">'
		for (var j = 0; j < items.length; ++j) {
			for (var k = 0; k < items[j].length; ++k) {
				var itemID = Number(items[j][k])
				
				var have = getItem_have(itemID)
				var need = getItem_need(itemID)
				
				have = (have === null) ? '' : have
				need = (need === null) ? '' : need
				
				html += '<div align="center" class="item" id="item_' + items[j][k] + '"><div class="item_thumb"><img src="./images/item/inv_2/'
				
				html += itemData[itemID].name.kr
				
				html += '.png"><span class="item_thumb_name">'
				
				html += itemData[itemID].name.kr
				
				
				html += '</span><div class="item_thumb_quantity">0</div></div><div class="item_body"><div style="height:10px"></div><div class="item_body_have">보유량<br><input type="text" class="item_body_have_input" value="'
				
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
	
	$('.item-container').html(html)
	
	// 이벤트 리스너 추가
	
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
	
	// 보유량/필요량 변경시, 곧바로 저장하고, 잉여량에 변동 반영
	$('.item_body_have_input, .item_body_need_input').off('keyup').on('keyup', function (event) {
		var $item = $(this).parent().parent().parent()
		var itemID = Number($item.attr('id').split('_')[1])
		var have = Number($item.find('.item_body_have_input').val())
		var need = Number($item.find('.item_body_need_input').val())
		
		have = Number.isNaN(have) ? 0 : have
		need = Number.isNaN(need) ? 0 : need
		
		setItem_have(itemID, have)
		setItem_need(itemID, need)
		
		showSurplus($item)
	})
	
	// 이벤트 실행
	$('.item_body_have_input, .item_body_need_input').trigger('keyup')
}

// 지정된 카테고리의 아이템을 숨김
const hideByCategory = function (categoryID) {
	$('#category_' + categoryID).css('display', 'none')
}

// 지정된 등급의 아이템을 숨김
const hideByGrade = function (grade) {
	var $itemElements = $('.item')
	var targetItemIDs = []
	
	for (var i = 0; i < $itemElements.length; ++i) {
		var itemID = Number($itemElements.eq(i).attr('id').split('_')[1])
		
		if (itemData[itemID].grade == grade) {
			targetItemIDs.push(itemID)
		}
	}
	
	for (var i = 0; i < targetItemIDs.length; ++i) {
		$('#item_' + targetItemIDs[i]).css('display', 'none')
	}
}

// 아이템의 이름을 표시
const showItemName = function () {
	$('.item_thumb_name').css('display', 'inline-block')
}

// 아이템의 이름을 숨김
const hideItemName = function () {
	$('.item_thumb_name').css('display', 'none')
}

// 아이템의 입력란을 표시
const showItemInput = function () {
	$('.item_body').css('display', 'inline-block')
}

// 아이템의 입력란을 숨김
const hideItemInput = function () {
	$('.item_body').css('display', 'none')
}

const clearInputData = function () {
	$('.item_body_have_input, .item_body_need_input').val('')
	$('.item_body_have_input, .item_body_need_input').trigger('keyup')
	
	clearLocalStorage()
}

// 잉여량이 0이 아닌 아이템만 표시
const compactItems = function () {
	var $items = $('.item')
	
	for (var i = 0; i < $items.length; ++i) {
		var surplus = Number($items.eq(i).find('.item_thumb_quantity').text())
		surplus = Number.isNaN(surplus) ? 0 : surplus
		
		if (surplus === 0) {
			$items.eq(i).css('display', 'none')
		}
		else {
			$items.eq(i).css('display', 'inline-block')
		}
	}
}

// 모든 아이템 표시
const showAllItems = function () {
	$('.item').css('display', 'inline-block')
}

// 보유량, 필요량을 깔끔하게 정산
const cutdownInput = function (item) {
	var $item = $(item)
	
	var have = Number($item.find('.item_body_have_input').val())
	var need = Number($item.find('.item_body_need_input').val())
	
	have = Number.isNaN(have) ? 0 : have
	need = Number.isNaN(need) ? 0 : need
	
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
	
	$item.find('.item_body_have_input').val(have)
	$item.find('.item_body_need_input').val(need)
	
	$item.find('.item_body_have_input, .item_body_need_input').trigger('keyup')
}

const cutdownAllInputs = function () {
	var $items = $('.item')
	
	for (var i = 0; i < $items.length; ++i) {
		cutdownInput($items.eq(i))
	}
}

// 잉여량(또는 부족량) 갱신.
const showSurplus = function ($item) {
	var itemID = Number($item.attr('id').split('_')[1])
	
	var have = $item.find('.item_body_have_input').val()
	var need = $item.find('.item_body_need_input').val()
	
	if (have === '') {
		have = 0
	}
	if (need === '') {
		need = 0
	}
	
	have = Number(have)
	need = Number(need)
	
	var surplus = have - need
	var showCraftConfigBtn = false
	
	$item.find('.item_thumb_quantity').text(surplus)
	
	if (surplus < 0) {
		$item.find('.item_thumb_quantity').removeClass('plus')
		$item.find('.item_thumb_quantity').addClass('minus')
		showCraftConfigBtn = true
	}
	else if (surplus > 0) {
		$item.find('.item_thumb_quantity').removeClass('minus')
		$item.find('.item_thumb_quantity').addClass('plus')
		showCraftConfigBtn = false
	}
	else {
		$item.find('.item_thumb_quantity').removeClass('minus')
		$item.find('.item_thumb_quantity').removeClass('plus')
		showCraftConfigBtn = false
	}
	
	// 파밍 외에 충당 가능한 수단이 없다면, 충당 버튼을 표시하지 않음
	if (itemData[itemID].craft.length <= 0) {
		showCraftConfigBtn = false
	}
	
	if (showCraftConfigBtn) {
		$item.find('.item_body_craft-config-btn').removeClass('off')
		$item.find('.item_body_craft-config-btn').addClass('on')
	}
	else {
		$item.find('.item_body_craft-config-btn').removeClass('on')
		$item.find('.item_body_craft-config-btn').addClass('off')
	}
}


$(document).ready(function () {
	console.log(itemData)
	
	const a = function(name){
		var l = Object.keys(itemData).length
		
		for (var i = 0; i < l; ++i) {
			if (itemData[i].name.kr === name) {
				return i
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
})