var displayName = true			// 아이템 이름 표시 여부.
var displayInputField = true	// 입력란 표시 여부.
var displayGuide = true         // 가이드 표시 여부.
var breakdownGrade = 0          // n등급 이하로 분해하는 기능. 0이면 비활성화.
var filterGrade = []			// 등급별 필터링. [1,2,3,4,5]
var filterCategory = []			// 카테고리별 필터링. [0,1,2,3] == ['특수재료', '일반재료', '스킬개론', '칩류']
var filterOnlyLack = false		// '부족한 아이템만 표시' 여부

const loadConfig = function () {
	// 로컬스토리지로부터 설정 로드, 유효성 검사 및 수정
	displayName = JSON.parse(localStorage.getItem('mcalc_display_name'))				// boolean
	displayInputField = JSON.parse(localStorage.getItem('mcalc_display_inputField'))	// boolean
	displayGuide = JSON.parse(localStorage.getItem('mcalc_display_guide'))              // boolean
    breakdownGrade = JSON.parse(localStorage.getItem('mcalc_breakdown_grade'))          // number
	filterGrade = JSON.parse(localStorage.getItem('mcalc_filter_grade'))				// array
	filterCategory = JSON.parse(localStorage.getItem('mcalc_filter_category'))			// array
	filterOnlyLack = JSON.parse(localStorage.getItem('mcalc_filter_onlyLack'))			// boolean
	
	displayName = (typeof displayName !== 'boolean') ? true : displayName
	displayInputField = (typeof displayInputField !== 'boolean') ? true : displayInputField
	displayGuide = (typeof displayGuide !== 'boolean') ? true : displayGuide
	
    breakdownGrade = (typeof breakdownGrade !== 'number') ? 0 : breakdownGrade
    
	filterGrade = (! Array.isArray(filterGrade)) ? [] : filterGrade
	filterCategory = (! Array.isArray(filterCategory)) ? [] : filterCategory
	filterOnlyLack = (typeof filterOnlyLack !== 'boolean') ? false : filterOnlyLack
	
	selectConfig()
}

const selectConfig = function () {
	// 설정에 따라 체크 상태 변경
	if (displayName) {
		$('#display_name').prop('checked', true)
	}
	else {
		$('#display_name').prop('checked', false)
	}
	
	if (displayInputField) {
		$('#display_inputField').prop('checked', true)
	}
	else {
		$('#display_inputField').prop('checked', false)
	}
    
    if (displayGuide) {
		$('#display_guide').prop('checked', true)
	}
	else {
		$('#display_guide').prop('checked', false)
	}
	
    document.getElementById('breakdown_grade').value = breakdownGrade
    
	refreshBtnFilterOnlyLack()
	
	for (var _grade = 1; _grade <= 5; ++_grade) {
		if (filterGrade.indexOf(_grade) < 0) {
			$('#filter_grade_' + String(_grade)).prop('checked', true)
		}
		else {
			$('#filter_grade_' + String(_grade)).prop('checked', false)
		}
	}
	
	for (var _categoryID = 0; _categoryID <= 3; ++_categoryID) {
		if (filterCategory.indexOf(_categoryID) < 0) {
			$('#filter_category_' + String(_categoryID)).prop('checked', true)
		}
		else {
			$('#filter_category_' + String(_categoryID)).prop('checked', false)
		}
	}
}

const fetchConfig = function () {
	displayName = JSON.parse($('#display_name').prop('checked'))
	displayInputField = JSON.parse($('#display_inputField').prop('checked'))
	displayGuide = JSON.parse($('#display_guide').prop('checked'))
    
    breakdownGrade = Number($('#breakdown_grade').val())
	
	filterGrade = []
	$filterGradeList = $('#config-modal [name="filter_grade"]:not(:checked)')
	for (var i = 0; i < $filterGradeList.length; ++i) {
		filterGrade.push(Number($filterGradeList.eq(i).attr('id').split('_')[2]))
	}
	
	filterCategory = []
	$filterCategoryList = $('#config-modal [name="filter_category"]:not(:checked)')
	for (var i = 0; i < $filterCategoryList.length; ++i) {
		filterCategory.push(Number($filterCategoryList.eq(i).attr('id').split('_')[2]))
	}
	
	localStorage.setItem('mcalc_display_name', JSON.stringify(displayName))
	localStorage.setItem('mcalc_display_inputField', JSON.stringify(displayInputField))
	localStorage.setItem('mcalc_display_guide', JSON.stringify(displayGuide))
    localStorage.setItem('mcalc_breakdown_grade', JSON.stringify(breakdownGrade))
	localStorage.setItem('mcalc_filter_grade', JSON.stringify(filterGrade))
	localStorage.setItem('mcalc_filter_category', JSON.stringify(filterCategory))
	localStorage.setItem('mcalc_filter_onlyLack', JSON.stringify(filterOnlyLack))
}

const openConfigModal = function () {
    gtag('event', '설정 프롬프트 열기', {
        'event_category': '재료 계산기 2.0'
    })
    
	$('#config-modal').css('display', 'block').css('opacity', '1')
	selectConfig()
}

const closeConfigModal = function () {
	$('#config-modal').css('opacity', '0')
    
    setTimeout(function () {
        $('#config-modal').css('display', 'none')
    }, 300)
    
	fetchConfig()
	applyConfig()
}

$(document).ready(function () {
	loadConfig()
	applyConfig()
	
	/* 이벤트 리스너 설정 */
	// 설정 버튼 클릭시, modal prompt 열음
	$('.menu-btn').click(function () {
		openConfigModal()
	})
	
	// modal prompt의 content에 있는 닫기 버튼 클릭시, 닫음
	$('.close-btn').click(function() {
        gtag('event', '설정 프롬프트 닫기: 버튼 클릭', {
            'event_category': '재료 계산기 2.0'
        })
		closeConfigModal()
	})
	
	// modal prompt의 content 바깥 클릭시, 닫음
	$(window).click(function(event) {
		if ($(event.target).is($('#config-modal'))) {
            gtag('event', '설정 프롬프트 닫기: 외부 클릭', {
                'event_category': '재료 계산기 2.0'
            })
			closeConfigModal()
		}
	})
	
	// 설정 변경할 때마다 즉시 저장 및 반영
	$('#config-modal').find('[name*=display_], [name*=filter_]').change(function() {
		fetchConfig()
		applyConfig()
	})
})
