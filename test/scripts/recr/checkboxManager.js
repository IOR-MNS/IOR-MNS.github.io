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
		return false
	}
	
	// 태그가 정상적으로 선택되었다면, 재계산하여 결과를 갱신
	showResult()
	
	// 반응형 스타일 갱신
	refreshStyle()
}

const clearSelection = function () {
	var checkboxList = document.querySelectorAll('.checkboxTag')
	
	for (var i = 0; i < checkboxList.length; ++i)
	{
		checkboxList[i].checked = false
		selectionCount = 0
	}
	
	// 결과출력 초기화
	showResult()
	
	// 반응형 스타일 갱신
	refreshStyle()
}

// 이하 필터 스위치 전역변수
var onlyHighStarsFilter = false;

// 필터 버튼 체크 여부에 따라 초기값 설정
$(function () {
	onlyHighStarsFilter = $('#onlyHighStarsFilterBtn').prop('checked')
})

const filterClicked = function (elem) {
	if ($(elem).attr('id') === 'onlyHighStarsFilterBtn')
	{
		onlyHighStarsFilter = !onlyHighStarsFilter;
	}
	
	// 결과출력 갱신
	showResult()
	
	// 반응형 스타일 갱신
	refreshStyle()
	
	//console.log(onlyHighStarsFilter)
}