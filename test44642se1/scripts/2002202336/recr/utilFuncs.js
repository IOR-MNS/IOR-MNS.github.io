// 필터버튼과 같은 체크버튼이 새로 생겨나더라도, 기존의 변수에 따라서 체크 상태를 동기화
// 새로운 체크박스 버튼을 만들고 나서, 또는 체크박스 클릭 이벤트가 발생했을 때 호출할 것.
const syncButtons = function () {
	// 고등급 확정식 필터 버튼 처리
	$('[id$="ohsf"]').prop('checked', onlyHighStarsFilter)
}

// tagCode가 포함하는 태그들의 이름을 includedTagNames 배열에 반환
const getTagNames = function (tagCode, includedTagNames) {
	// includedTagNames 배열을 초기화
	includedTagNames.length = 0
	
	for (var i = 0, j = 0; i < data.tagData.length; ++i)
	{
		if ((tagCode & data.tagData[i].tagCode) != 0)
		{
			includedTagNames[j++] = data.tagData[i].name[getLang()]
		}
	}
}

// tagCode가 포함하는 태그들의 ID를 includedTagIDs 배열에 반환
const getTagIDs = function (tagCode, includedTagIDs) {
	// includedTagIDs 배열을 초기화
	includedTagIDs.length = 0
	
	for (var i = 0, j = 0; i < data.tagData.length; ++i)
	{
		if ((tagCode & data.tagData[i].tagCode) != 0)
		{
			includedTagNames[j++] = data.tagData[i].name[getLang()]
		}
	}
}