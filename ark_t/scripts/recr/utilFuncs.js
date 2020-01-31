// 대원 이름으로부터 별 갯수 추출
const getStar = function (opname) {
  return Number(opname.charAt(opname.length - 2))
}

// 선택된 태그의 이름을 원소로 갖는 배열을 받아서,
// 가능한 모든 조합에 대해 출현가능 대원목록을 검토하고,
// 출현가능 대원이 존재하는 태그 조합을 추려서 적절하게 정렬한 뒤,
// 결과 데이터를 파싱 가능한 문자열로 만들어서 반환

// 태그명 유효성 검사
const validateTagName = function(tagName)
{
  var isValid = false
  var keys_itr = tagMap.keys()
  var tmpStr = ''

  for (var i = 0; i < tagMap.size; ++i)
  {
    tmpStr = keys_itr.next().value
	
    if (tmpStr === tagName)
    {
      isValid = true
      break
    }
  }

  return isValid
}

// 선택된 태그 목록을 배열로 반환
const getCheckedTags = function () {
	var checkedTags = new Array()
	
	var checkboxList = document.querySelectorAll('.checkboxTag')
	
	for (var i = 0, j = 0; i < checkboxList.length; ++i)
	{
		if (checkboxList[i].checked === true)
		{
			checkedTags[j++] = checkboxList[i].name
		}
	}
	
	return checkedTags
}

// tagCode가 포함하는 태그들의 이름을 includedTags 배열에 반환
const getTagNames = function (tagCode, includedTags) {
	// includedTags를 비움
	includedTags.length = 0
	const itr = tagMap.entries()

	for (var i = 0, j = 0; i < tagMap.size; ++i)
	{
		var tagArr = itr.next().value

		if ((tagArr[1] & tagCode) != 0)
		{
			includedTags[j++] = tagArr[0]
		}
	}
}