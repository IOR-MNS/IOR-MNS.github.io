var glob = glob || {
    namespace: 'recr',
    ga_event_category: '공개모집 계산기'
}
window[glob.namespace] = window[glob.namespace] || {}

var selectionCount = 0

window[glob.namespace].countCheck = function (checkBox) {
	if (checkBox.checked) {
		selectionCount++
	}
	else {
		selectionCount--
	}
	
	if (selectionCount > 5) {
		checkBox.checked = false;
		selectionCount--
		
		return false
	}
	
	return true
}

window[glob.namespace].tagClicked = function (checkBox, doCalc) {
	// 이미 태그를 최대 갯수만큼 선택한 상태에서 다시 태그를 누른 경우, 아무것도 하지 않음
	if (countCheck(checkBox) === false)
	{
		return false
	}
	
    if (doCalc === undefined || doCalc === true) {
        // 태그가 정상적으로 선택되었다면, 재계산하여 결과를 갱신
        showResult()
        
        gtag('event', '계산(5개 태그 선택)', {
            'event_category': '공개모집 계산기'
        })
    }
}

window[glob.namespace].getCheckboxList = function () {
    return Array.from(document.querySelectorAll('.selection-panel .checkboxButton + label.tag'), el => document.getElementById(el.htmlFor))
}

window[glob.namespace].resetClassName = function () {
	getCheckboxList().forEach(cb => {
        cb.className = 'checkboxButton' // 점멸 표시 등이 있을 경우, 기본값으로 초기화
	})
}

window[glob.namespace].clearSelection = function (doScroll, clearTagBatchSelector) {
    gtag('event', '선택 초기화', {
        'event_category': '공개모집 계산기'
    })
    
	var checkboxList = getCheckboxList()
	
	for (var i = 0; i < checkboxList.length; ++i)
	{
        checkboxList[i].className = 'checkboxButton' // 점멸 표시 등이 있을 경우, 기본값으로 초기화
		checkboxList[i].checked = false
	}
	selectionCount = 0
    
	// 결과출력 초기화
	showResult()
    
    if (doScroll === undefined || doScroll === true) {
        // 스크롤 버그를 해결하기 위해, 결과출력이 초기화된 뒤에는 스크롤바 위치를 재설정
        $('html,body').animate({scrollTop: 0}, 200)
    }
    
    if (clearTagBatchSelector === undefined || clearTagBatchSelector === true) {
        document.getElementById('tagBatchSelector').value = ''
    }
    
    if (userConfig.input.autoFocusBatchSelector.value) {
        document.getElementById('tagBatchSelector').focus()
    }
}

window[glob.namespace].filterClicked = function (filterName) {
	if (filterName === 'onlyHighStars')
	{
        userConfig.filter.onlyHighRarity.value = !userConfig.filter.onlyHighRarity.value
	}
	
    // 설정 저장
    saveUserConfig()
    
	// 여러 필터 버튼들을 동기화
	syncButtons()
	
	// 결과출력 갱신
	showResult()
}

window.errorCatcherExec = window.errorCatcherExec || []
try {
    window.errorCatcherExec.push('syncButtons')
} catch (e) {
    window.errorCatcherExec = []
    window.errorCatcherExec.push('syncButtons')
}