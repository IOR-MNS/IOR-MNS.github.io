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