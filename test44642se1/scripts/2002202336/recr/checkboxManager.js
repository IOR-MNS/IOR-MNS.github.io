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
	
	// 스크롤 버그를 해결하기 위해, 결과출력이 초기화된 뒤에는 스크롤바 위치를 재설정
	$('html').animate({scrollTop: 0}, 600, 'easeOutExpo')
}

// 이하 필터 스위치 전역변수
var onlyHighStarsFilter = false;

// 필터 버튼 체크 여부에 따라 초기값 설정
$(function () {
	onlyHighStarsFilter = $('[id$="ohsf"]').prop('checked')
})

const filterClicked = function (filterName) {
	if (filterName === 'onlyHighStars')
	{
		onlyHighStarsFilter = !onlyHighStarsFilter;
	}
	
	// 여러 필터 버튼들을 동기화
	syncButtons()
	
	// 결과출력 갱신
	showResult()
}