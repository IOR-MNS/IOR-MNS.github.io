// 주어진 데이터셋을 바탕으로, 가능한 모든 조합을 만들어서 output 배열로 반환.
const generateTagCodes = function (data, output, maxElemNum, outputIndex, elemNum = 0, dataIndex = 0, tagCode = 0)
{
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