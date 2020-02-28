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

// 주어진 tagCode의 조건을 모두 만족하는 대원들의 ID 목록을 out 배열로 반환
const getAvailableOperatorIDs = function (tagCode, out)
{
	// out 을 비움
	out.length = 0
	var outidx = 0
	
	const getTagCodeKR = function (tagNameKR)
	{
		for (var i = 0; i < data.tagData.length; ++i)
		{
			if (tagNameKR == data.tagData[i].name.kr)
			{
				return data.tagData[i].tagCode
			}
		}
		console.log('calc.js, getAvailableOperatorIDs(), getTagCodeKR()에서 에러 발생')
		console.log('입력값: ', tagNameKR)
		
		return false
	}
	
	var na = getTagCodeKR('출현불가')
	var top = getTagCodeKR('고급특별채용')
	var senior = getTagCodeKR('특별채용')
	
	if (na === false || top === false || senior === false)
	{
		return false
	}

	for (var i = 0; i < data.opData.length; ++i)
	{
		var op = data.opData[i]
		// 태그코드의 조건을 모두 만족하는지 확인
		if ((tagCode & op.tagCode) == tagCode)
		{
			// 출현불가 대원이 아닐 경우에만 결과에 포함.
			if ((na & op.tagCode) == 0)
			{
				// 고특채 태그가 선택된 경우, 고특채 대원만 결과에 포함함.
				if ((top & tagCode) != 0)
				{
					if ((top & op.tagCode) != 0)
					{
						// 출현가능 대원 목록에 해당 대원 ID 추가
						out[outidx++] = op.id
					}
				}
				// 특채 태그가 선택된 경우, 특채 대원만 결과에 포함.
				else if ((senior & tagCode) != 0)
				{
					if ((senior & op.tagCode) != 0)
					{
						out[outidx++] = op.id
					}
				}
				// 고특채와 특채 태그 중 하나도 선택되지 않은 경우, 고특채 대원을 결과에 포함하지 않음.
				else
				{
					if ((top & op.tagCode) == 0)
					{
						out[outidx++] = op.id
					}
				}
			}
		}
	}
}

const getLowestRarity = function (opIDs)
{
	var lowestRarity = 0
	
	// 가능하다면 3성 이상의 대원중 가장 낮은 등급을 가져오고,
	// 불가능하다면 정말로 가장 낮은 등급을 가져온다
	for (var i = (opIDs.length - 1); i >= 0; --i)
	{
		lowestRarity = data.opData[opIDs[i]].rarity
		
		// 3성 이상의 대원을 찾으면, 곧바로 break
		if (lowestRarity >= 3)
		{
			break
		}
		
		// 모든 대원이 3성 미만일 경우, 정말로 가장 낮은 등급을 가져옴
		if (i === 0)
		{
			lowestRarity = data.opData[opIDs[opIDs.length - 1]].rarity
			
			break
		}
	}
	
	return lowestRarity
}


const calc = function (checkedTagIDs) {
	
	// 받은 태그ID 배열의 유효성 검사
	// 빈 입력
	if (checkedTagIDs.length == 0)
	{
		//console.log('calc: 태그 유효성 검사 탈락: 빈 입력')
		return []
	}
	
	// 잘못된 태그ID가 포함됨
	for (var i = 0; i < checkedTagIDs.length; ++i)
	{
		if (checkedTagIDs[i] < 0 || checkedTagIDs[i] >= data.length)
		{
			//console.log('calc: 태그 유효성 검사 탈락: 유효하지 않은 태그ID')
			return []
		}
	}
	
	//console.log('calc: 계산을 시작')
	
	var checkedTagCodes = new Array()
	var candidateTagCodes = new Array()
	
	// 선택된 태그ID를 바탕으로 checkedTagCodes 배열을 구성
	for (var i = 0; i < checkedTagIDs.length; ++i)
	{
		checkedTagCodes[i] = data.tagData[checkedTagIDs[i]].tagCode
	}
	
	// 원소가 1개뿐인 조합부터 (선택된 태그갯수)개인 조합까지 모두 candidateTagCodes배열에 저장.
	for (var maxElems = 1, outidx = 0; maxElems <= checkedTagIDs.length; ++maxElems)
	{
		outidx = generateTagCodes(checkedTagCodes, candidateTagCodes, maxElems, outidx)
	}
	
	// 각 candidateTagCodes 별로 조건을 모두 만족하는 대원들의 ID를 얻음
	var result = new Array()
	
	for (var i = 0, j = 0; i < candidateTagCodes.length; ++i)
	{
		var tagCode = candidateTagCodes[i]
		var opIDs = new Array()
		
		getAvailableOperatorIDs(candidateTagCodes[i], opIDs)
		
		if (opIDs.length > 0)
		{
			// 각 케이스 내에서 대원들 정렬
			// 등급(내림차순)이 1순위, 이름(오름차순)이 2순위

			opIDs.sort(function(opID_0, opID_1) {
				// 별 갯수를 기준으로 내림차순 정렬
				var rarity_0 = data.opData[opID_0].rarity
				var rarity_1 = data.opData[opID_1].rarity

				if (rarity_0 > rarity_1)
				{
					return -1
				}
				if (rarity_0 < rarity_1)
				{
					return 1
				}
				
				// 언어 설정에 따라 기준이 되는 이름이 달라짐
				var opName_0 = data.opData[opID_0].name[getLang()]
				var opName_1 = data.opData[opID_1].name[getLang()]

				// 별 갯수가 같을 경우, 이름 기준으로 오름차순 정렬
				if (opName_0 < opName_1)
				{
					return -1
				}
				if (opName_0 > opName_1)
				{
					return 1
				}

				// 별 갯수도 같고, 이름도 같다면 자리를 바꾸지 않음. 이런 경우가 있어선 안되겠지만..
				return 0
			})

			// 정렬된 케이스와 선택 태그 목록을 결과 객체에 넣음
			var combinedCase = {}
			combinedCase.tagCode = tagCode
			combinedCase.opIDs = opIDs
			combinedCase.lowestRarity = getLowestRarity(opIDs)

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
		var opIDs_0 = combinedCase_0.opIDs
		var opIDs_1 = combinedCase_1.opIDs
		var lowestRarity_0 = combinedCase_0.lowestRarity
		var lowestRarity_1 = combinedCase_1.lowestRarity

		// 가장 낮은 별 갯수 기준으로 내림차순 정렬
		if (lowestRarity_0 > lowestRarity_1)
		{
			return -1
		}
		if (lowestRarity_0 < lowestRarity_1)
		{
			return 1
		}

		// 가장 낮은 별 갯수가 동일하다면, 2순위로 가장 높은 별 갯수 기준으로 내림차순 정렬
		// 각 케이스의 가장 높은 별 갯수는 가장 먼저 있는 대원으로부터 얻을 수 있음
		var greatestStar_0 = data.opData[opIDs_0[0]].rarity
		var greatestStar_1 = data.opData[opIDs_1[0]].rarity

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
		if (opIDs_0.length < opIDs_1.length)
		{
			return -1
		}
		if (opIDs_0.length > opIDs_1.length)
		{
			return 1
		}

		// 가장 낮은 별 갯수, 가장 높은 별 갯수, 출현가능 대원수가 모두 동일하다면, 서로 자리를 바꾸지 않음
		return 0
	})
	
	return result
}