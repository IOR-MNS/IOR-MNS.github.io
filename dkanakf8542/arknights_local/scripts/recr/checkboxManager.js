var selectionCount = 0

const countCheck = function (checkBox) {
	if (checkBox.checked) {
		selectionCount++
	}
	else {
		selectionCount--
	}
	
	if (selectionCount > 6) {
		checkBox.checked = false;
		selectionCount--
		
		return false
	}
	
	return true
}

const tagClicked = function (checkBox) {
	
	// 이미 태그를 최대 갯수만큼 선택한 상태에서 다시 태그를 누른 경우, 아무것도 하지 않음
	if (countCheck(checkBox) === false)
	{
		//console.log('tagClicked: false')
		//console.log('아무 작업도 실행하지 않음')
		
		return false
	}
	
	//console.log('tagClicked: true')
	
	// 태그가 정상적으로 선택되었다면, 재계산하여 결과를 갱신
	showResult()
}

const clearSelection = function () {
	//console.log('clearSelection')
	
	var checkboxList = document.querySelectorAll('.tag')
	
	for (var i = 0; i < checkboxList.length; ++i)
	{
		checkboxList[i].checked = false
		selectionCount = 0
	}
	
	// 결과출력 초기화
	showResult()
}