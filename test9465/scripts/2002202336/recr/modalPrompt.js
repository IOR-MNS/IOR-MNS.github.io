// 표시 설정 변수들. 기본값은 ['이미지 없음', '이름 표시', '레어도 표시']임.
var displayImg = 'none'		// none, tiny, small, medium, large
var displayName = true		// true / false
var displayRarity = true	// true / false
var filterRarity = [1, 2, 3, 4, 5, 6]	// 배열에 들어있는 레어도를 가진 오퍼레이터만 결과에 표시

const loadConfig = function () {
	// 로컬스토리지로부터 설정 로드, 유효성 검사 및 수정
	displayImg = JSON.parse(localStorage.getItem('recr_display_img'))			// string
	displayName = JSON.parse(localStorage.getItem('recr_display_name'))			// boolean
	displayRarity = JSON.parse(localStorage.getItem('recr_display_rarity'))		// boolean
	filterRarity = JSON.parse(localStorage.getItem('recr_filter_rarity'))		// array
	
	displayImg = displayImg.toString().toLowerCase()
	displayImg = ('tiny|small|medium|large'.indexOf(displayImg) < 0) ? 'none' : displayImg
	
	displayName = (typeof displayName !== 'boolean') ? true : displayName
	displayRarity = (typeof displayRarity !== 'boolean') ? true : displayRarity
	
	filterRarity = (! Array.isArray(filterRarity)) ? [] : filterRarity
	
	selectConfig()
}

const selectConfig = function () {
	// 설정에 따라 체크 상태 변경
	$('#display_img_' + displayImg).prop('checked', true)
	$('#display_name_' + String(displayName)).prop('checked', true)
	$('#display_rarity_' + String(displayRarity)).prop('checked', true)
	
	for (var i = 1; i <= 6; ++i) {
		if (filterRarity.indexOf(i) >= 0) {
			$('#filter_rarity_' + String(i)).prop('checked', false)
		}
		else {
			$('#filter_rarity_' + String(i)).prop('checked', true)
		}
	}
}

const fetchConfig = function () {
	displayImg = $('#config-modal [name="display_img"]:checked').attr('id').split('_')[2]
	displayName = JSON.parse($('#config-modal [name="display_name"]:checked').attr('id').split('_')[2])
	displayRarity = JSON.parse($('#config-modal [name="display_rarity"]:checked').attr('id').split('_')[2])
	
	filterRarity = []
	$filterRarityList = $('#config-modal [name="filter_rarity"]:not(:checked)')
	for (var i = 0; i < $filterRarityList.length; ++i) {
		filterRarity.push(Number($filterRarityList.eq(i).attr('id').split('_')[2]))
	}
	
	localStorage.setItem('recr_display_img', JSON.stringify(displayImg))
	localStorage.setItem('recr_display_name', JSON.stringify(displayName))
	localStorage.setItem('recr_display_rarity', JSON.stringify(displayRarity))
	localStorage.setItem('recr_filter_rarity', JSON.stringify(filterRarity))
}

const openConfigModal = function () {
	selectConfig()
	$('#config-modal').css('display', 'block')
}

const closeConfigModal = function () {
	fetchConfig()
	showResult()
	$('#config-modal').css('display', 'none')
}

$(document).ready(function () {
	loadConfig()
	
	/* 이벤트 리스너 설정 */
	// 설정 버튼 클릭시, modal prompt 열음
	$('.menu-btn').click(function () {
		openConfigModal()
	})
	
	// modal prompt의 content에 있는 닫기 버튼 클릭시, 닫음
	$('.close-btn').click(function() {
		closeConfigModal()
	})
	
	// modal prompt의 content 바깥 클릭시, 닫음
	$(window).click(function(event) {
		if ($(event.target).is($('#config-modal'))) {
			closeConfigModal()
		}
	})
})