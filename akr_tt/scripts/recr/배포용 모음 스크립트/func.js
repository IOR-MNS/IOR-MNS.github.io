/* 함수 모음 */

// 주어진 데이터셋을 바탕으로, 가능한 모든 조합을 만들어서 output 배열로 반환.
const generateTagCodes = function (data, output, maxElemNum, outputIndex, elemNum, dataIndex, tagCode)
{
	elemNum = (typeof elemNum === 'undefined') ? 0 : elemNum
	dataIndex = (typeof dataIndex === 'undefined') ? 0 : dataIndex
	tagCode = (typeof tagCode === 'undefined') ? 0 : tagCode
	
	if (elemNum >= maxElemNum)
	{
		output[outputIndex] = tagCode
		return outputIndex + 1
	}

	for (; dataIndex < data.length; ++dataIndex)
	{
		outputIndex = generateTagCodes(data, output, maxElemNum, outputIndex, elemNum + 1, dataIndex + 1, tagCode | data[dataIndex])
	}

	return outputIndex
}

// 주어진 tagCode의 조건을 모두 만족하는 대원들의 목록을 availOps 배열로 반환
const checkTag = function (tagCode, availOps)
{
	// availOps를 비움
	availOps.length = 0
	var availOpsIndex = 0
	const itr = opMap.entries()

	for (var i = 0; i < opMap.size; ++i)
	{
		// opMap의 i번째 대원에 대한 이름과 태그코드 배열을 참조하는 변수. 값을 변경하면 안됨.
		const opArr = itr.next().value
		
		// 태그코드의 조건을 모두 만족하는지 확인
		if ((tagCode & opArr[1]) == tagCode)
		{
			// 출현불가 대원이 아닐 경우에만 결과에 포함.
			if ((tagMap.get('출현불가') & opArr[1]) == 0)
			{
				// 고특채 태그가 선택된 경우, 고특채 대원만 결과에 포함함.
				if ((tagCode & tagMap.get('고급특별채용')) != 0)
				{
					if ((opArr[1] & tagMap.get('고급특별채용')) != 0)
					{
						// 출현가능 대원 목록에 해당 대원 이름 추가
						availOps[availOpsIndex++] = opArr[0]
					}
				}
				// 특채 태그가 선택된 경우, 특채 대원만 결과에 포함.
				else if ((tagCode & tagMap.get('특별채용')) != 0)
				{
					if ((opArr[1] & tagMap.get('특별채용')) != 0)
					{
						availOps[availOpsIndex++] = opArr[0]
					}
				}
				// 고특채와 특채 태그 중 하나도 선택되지 않은 경우, 고특채 대원을 결과에 포함하지 않음.
				else
				{
					if ((opArr[1] & tagMap.get('고급특별채용')) == 0)
					{
						availOps[availOpsIndex++] = opArr[0]
					}
				}
			}
		}
	}
}

const calc = function (checkedTags) {
	
	// 받은 태그 배열의 유효성 검사
	// 빈 배열
	if (checkedTags.length == 0)
	{
		//console.log('calc: 태그 유효성 검사 탈락: 빈 배열')
		return []
	}
	
	// 잘못된 태그명이 포함됨
	for (var i = 0; i < checkedTags.length; ++i)
	{
		if (validateTagName(checkedTags[i]) === false)
		{
			//console.log('calc: 태그 유효성 검사 탈락: 유효하지 않은 태그명')
			return []
		}
	}
	
	//console.log('calc: 계산을 시작')
	
	var data = new Array()
	var tagCodes = new Array()
	
	// 선택된 태그를 바탕으로 data 배열을 구성
	for (var i = 0; i < checkedTags.length; ++i)
	{
		data[i] = tagMap.get(checkedTags[i])
	}
	
	// 원소가 1개뿐인 조합부터 (checkedTags.length)개인 조합까지 모두 tagCodes배열에 저장.
	for (var maxElems = 1, outidx = 0; maxElems <= checkedTags.length; ++maxElems)
	{
		outidx = generateTagCodes(data, tagCodes, maxElems, outidx)
	}
	
	// 각 tagCode별로 조건을 모두 만족하는 대원들을 표시.
	// 이때, 고특채와 출현불가 태그는 필수태그이므로 따로 검사.
	var result = new Array()
	
	for (var i = 0, j = 0; i < tagCodes.length; ++i)
	{
		var selectedTagNames = new Array()
		var availOpNames = new Array()

		getTagNames(tagCodes[i], selectedTagNames)
		checkTag(tagCodes[i], availOpNames)
		
		if (availOpNames.length > 0)
		{
			// 각 케이스 내에서 대원들 정렬
			// 별 갯수(내림차순)가 1순위, 이름(오름차순)이 2순위

			availOpNames.sort(function(opnameA, opnameB) {
				// 별 갯수를 기준으로 내림차순 정렬
				var starA = getStar(opnameA)

				var starB = getStar(opnameB)

				if (starA > starB)
				{
					return -1
				}
				if (starA < starB)
				{
					return 1
				}

				// 별 갯수가 같을 경우, 이름 기준으로 오름차순 정렬
				if (opnameA < opnameB)
				{
					return -1
				}
				if (opnameA > opnameB)
				{
					return 1
				}

				// 별 갯수도 같고, 이름도 같다면 자리를 바꾸지 않음. 이런 경우가 있어선 안되겠지만..
				return 0
			})

			// 정렬된 케이스와 선택 태그 목록을 결과 배열에 넣음
			var combinedCase = new Array()
			combinedCase[0] = selectedTagNames
			combinedCase[1] = availOpNames

			result[j++] = combinedCase
		}
	}

	// 결과 배열 정렬
	// 가장 낮은 별 갯수가 1순위(내림차순), 가장 높은 별 갯수가 2순위(내림차순), 출현가능 대원수가 3순위(오름차순)
	/*
    --가장 낮은 별 갯수를 구할 때, 1/2성은 무시함--

    맨 뒤의 대원의 별 갯수를 구했더니 1/2성이 나왔다면, 그보다 먼저 있는 대원의 별 갯수를 구하는 방식으로 진행.
    만약 맨 앞의 대원의 별 갯수마저 1/2성이라면, 가장 낮은 별 갯수는 맨 뒤의 대원의 별 갯수로 함.
    그렇지 않다면, 가장 낮은 별 갯수는 1/2성이 아닌 가장 낮은 별 갯수로 함.

    예1) 5성 4성 2성 1성이 분포한 경우, 가장 낮은 별 갯수는 4성으로 함
    예2) 2성 2성 1성이 분포한 경우, 가장 낮은 별 갯수는 1성으로 함
    예3) 4성 3성 2성 1성이 분포한 경우, 가장 낮은 별 갯수는 3성으로 함
  */
	result.sort(function (combinedCase_0, combinedCase_1) {
		var opname_array_0 = combinedCase_0[1]

		var opname_array_1 = combinedCase_1[1]

		// 각 케이스의 가장 낮은 별 갯수는, 마지막 대원으로부터 얻을 수 있음
		var opname_0 = '', opname_1 = '', leastStar_0 = 0, leastStar_1 = 0
		var i = 0

		i = 1
		while (true)
		{
			opname_0 = opname_array_0[opname_array_0.length - i]
			leastStar_0 = getStar(opname_0)

			// 얻은 별 갯수가 3성 이상이거나, 모든 대원의 검사를 마쳤을 때(1/2성대원밖에 없는경우임)
			if (leastStar_0 >= 3 || i >= opname_array_0.length)
			{
				break
			}

			++i
		}

		i = 1
		while (true)
		{
			opname_1 = opname_array_1[opname_array_1.length - i]
			leastStar_1 = getStar(opname_1)

			// 얻은 별 갯수가 3성 이상이거나, 모든 대원의 검사를 마쳤을 때(1/2성대원밖에 없는경우임)
			if (leastStar_1 >= 3 || i >= opname_array_1.length)
			{
				break
			}

			++i
		}

		// 가장 낮은 별 갯수 기준으로 내림차순 정렬
		if (leastStar_0 > leastStar_1)
		{
			return -1
		}
		if (leastStar_0 < leastStar_1)
		{
			return 1
		}

		// 가장 낮은 별 갯수가 동일하다면, 2순위로 가장 높은 별 갯수 기준으로 내림차순 정렬
		// 각 케이스의 가장 높은 별 갯수는 가장 먼저 있는 대원으로부터 얻을 수 있음
		opname_0 = opname_array_0[0]
		var greatestStar_0 = getStar(opname_0)

		opname_1 = opname_array_1[0]
		var greatestStar_1 = getStar(opname_1)

		// 가장 높은 별 갯수 기준으로 내림차순 정렬
		if (greatestStar_0 > greatestStar_1)
		{
			return -1
		}
		if (greatestStar_0 < greatestStar_1)
		{
			return 1
		}

		// 가장 낮은 별 갯수와 가장 높은 별 갯수가 모두 동일하다면, 출현가능 대원수 기준으로 오름차순 정렬(저격식 우대를 위해)
		if (opname_array_0.length < opname_array_1.length)
		{
			return -1
		}
		if (opname_array_0.length > opname_array_1.length)
		{
			return 1
		}

		// 가장 낮은 별 갯수, 가장 높은 별 갯수, 출현가능 대원수가 모두 동일하다면, 서로 자리를 바꾸지 않음
		return 0
	})
	
	//console.log(result)
	//console.log('calc: 계산 완료, 결과 반환')
	return result
}

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

const showResult = function () {
	// 계산 결과를 받아옴
	var resultData = calc(getCheckedTags())
	
	// 선택된 태그가 없거나 / 선택된 태그명이 유효하지 않을 경우
	// 계산 결과로 빈 배열을 받음
	if (resultData.length == 0)
	{
		// 결과출력을 초기화.
		document.getElementById('calcResult').innerHTML = '<form></form>'
		return false
	}
	
	// resultData의 각 원소는 다음과 같음:
	// [0]: 선택된 태그이름 배열
	// [1]: 출현가능 대원이름 배열
	
	var htmlText = new String()
	
	for (var i = 0; i < resultData.length; ++i)
	{
		// 가독성을 위해 참조변수 설정
		var tags = resultData[i][0]
		var ops = resultData[i][1]
		
		// 임시 문자열 변수 설정
		var caseText = ''
		
		// 선택 태그들을 추가
		for (var j = 0; j < tags.length; ++j)
		{
			caseText += '<span class="result_tag">' + tags[j] + '</span>'
		}
		
		// 행분리
		caseText += '<br>'
		
		// 출현가능 대원들을 추가
		for (var j = 0; j < ops.length; ++j)
		{
			// 필요하다면, 각 대원의 클래스를 추가할 수 있음. 6성은 sixStarOP라는 식으로..
			caseText += '<span class="result_op">' + ops[j] + '</span>'
		}
		
		// 해당 케이스의 최소 별 갯수(1/2성은 가능하다면 무시)를 구함.
		var leastStar = 0
		for (var j = (ops.length - 1); j >= 0; --j)
		{
			leastStar = getStar(ops[j])
			
			if (leastStar >= 3)
			{
				break
			}
		}
		
		// 필터 적용
		if (onlyHighStarsFilter && leastStar <= 3)
		{
			continue
		}
		
		// case의 least star에 따라서 폼의 클래스가 바뀜.
		htmlText += '<form class="star_' + String(leastStar) + '">'
		
		htmlText += caseText
		
		htmlText += '</form>'
	}
	
	// htmlText가 비어있다면, 필터에 결과가 모두 걸러진 것이므로, 안내메시지 출력
	if (htmlText == '')
	{
		htmlText = '<form><span class="result_tag">결과 없음</span><br><span class="result_op">결과 없음</span></form>' //
	}
	
	// 페이지에 표시
	document.getElementById('calcResult').innerHTML = htmlText
	
	// 반응형 스타일 갱신은 tagClicked, filterClicked 등의 함수에서 호출함
}

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

