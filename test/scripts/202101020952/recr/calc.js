// 주어진 데이터셋을 바탕으로, 가능한 모든 조합을 만들어서 output 배열로 반환.
var generateTagCodes = function (data, output, maxElemNum, outputIndex, elemNum, dataIndex, tagCode)
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

    udnefsf()
    
	return outputIndex
}

var getTagCodeKR = function (tagNameKR) {
    for (var i = 0; i < db.tag.keys.length; ++i)
    {
        if (tagNameKR == db.tag[db.tag.keys[i]].name.kr)
        {
            return db.tag[db.tag.keys[i]].tagCode
        }
    }
    console.error('주어진 태그명을 DB에서 찾지 못함: ', tagNameKR)
    
    return false
}

// 주어진 tagCode의 조건을 모두 만족하는 대원들의 ID 목록을 반환
var getAvailableOperatorIDs = function (tagCode)
{
	var out = []
	var outidx = 0
	
	var top = getTagCodeKR('고급특별채용')
	var senior = getTagCodeKR('특별채용')
	
	if (top === false || senior === false)
	{
		return false
	}

	for (var i = 0; i < db.op.keys.length; ++i)
	{
		var op = db.op[db.op.keys[i]]
		// 태그코드의 조건을 모두 만족하는지 확인
		if ((tagCode & op.tagCode) == tagCode)
		{
            // 고특채 태그가 선택된 경우, 고특채 대원만 결과에 포함함.
            if ((top & tagCode) != 0)
            {
                if (op.rarity === 6)
                {
                    // 출현가능 대원 목록에 해당 대원의 코드네임 추가
                    out[outidx++] = db.op.keys[i]
                }
            }
            // 특채 태그가 선택된 경우, 특채 대원만 결과에 포함.
            else if ((senior & tagCode) != 0)
            {
                if (op.rarity === 5)
                {
                    out[outidx++] = db.op.keys[i]
                }
            }
            // 고특채와 특채 태그 중 하나도 선택되지 않은 경우, 고특채 대원을 결과에 포함하지 않음.
            else
            {
                if (op.rarity < 6)
                {
                    out[outidx++] = db.op.keys[i]
                }
            }
		}
	}

    // 화이트리스트를 적용하여 반환
    return out.filter(opid => recrWhiteList[userConfig.locale.region.value].indexOf(opid) >= 0)
}

var getLowestRarity = function (opIDs)
{
	var lowestRarity = 0
	
	// 가능하다면 3성 이상의 대원중 가장 낮은 등급을 가져오고,
	// 불가능하다면 정말로 가장 낮은 등급을 가져온다
	for (var i = (opIDs.length - 1); i >= 0; --i)
	{
		lowestRarity = db.op[opIDs[i]].rarity
		
		// 3성 이상의 대원을 찾으면, 곧바로 break
		if (lowestRarity >= 3)
		{
			break
		}
		
		// 모든 대원이 3성 미만일 경우, 정말로 가장 낮은 등급을 가져옴
		if (i === 0)
		{
			lowestRarity = db.op[opIDs[opIDs.length - 1]].rarity
			
			break
		}
	}
	
	return lowestRarity
}


var calc = function (checkedTagIDs) {
	// 받은 태그ID 배열의 유효성 검사
	// 빈 입력
	if (checkedTagIDs.length === 0)
	{
		//console.error('calc: 태그 유효성 검사 탈락: 빈 입력')
		return []
	}
	
	// 잘못된 태그ID가 포함됨
	for (var i = 0; i < checkedTagIDs.length; ++i)
	{
        // tag의 ID가 0 이상의 정수이기에 가능한 코드.
		if (checkedTagIDs[i] < 0 || checkedTagIDs[i] >= db.tag.keys.length)
		{
			//console.error('calc: 태그 유효성 검사 탈락: 유효하지 않은 태그ID')
			return []
		}
	}
	
	var checkedTagCodes = []
	  , candidateTagCodes = []
	
	// 선택된 태그ID를 바탕으로 checkedTagCodes 배열을 구성
	for (var i = 0; i < checkedTagIDs.length; ++i)
	{
		checkedTagCodes[i] = db.tag[checkedTagIDs[i]].tagCode
	}
	
	// 원소가 1개뿐인 조합부터 (선택된 태그갯수)개인 조합까지 모두 candidateTagCodes배열에 저장.
	for (var maxElems = 1, outidx = 0; maxElems <= checkedTagIDs.length; ++maxElems)
	{
		outidx = generateTagCodes(checkedTagCodes, candidateTagCodes, maxElems, outidx)
	}
	
	// 각 candidateTagCode별로 조건을 모두 만족하는 대원들의 ID를 얻음
	var result = []
    
	var opIDSortFunc = function (opID_0, opID_1) {
        // 별 갯수를 기준으로 내림차순 정렬
        var rarity_0 = db.op[opID_0].rarity
        var rarity_1 = db.op[opID_1].rarity

        if (rarity_0 > rarity_1)
        {
            return -1
        }
        if (rarity_0 < rarity_1)
        {
            return 1
        }
        
        // 언어 설정에 따라 기준이 되는 이름이 달라짐
        var opName_0 = db.op[opID_0].name[userConfig.locale.lang.value]
        var opName_1 = db.op[opID_1].name[userConfig.locale.lang.value]

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
    }
    
	for (var i = 0, j = 0, tagCode = 0, opIDs = [], combinedCase = null; i < candidateTagCodes.length; ++i)
	{
		tagCode = candidateTagCodes[i]
		opIDs = getAvailableOperatorIDs(candidateTagCodes[i])
		
		if (opIDs.length > 0)
		{
			// 각 케이스 내에서 대원들 정렬
			// 등급(내림차순)이 1순위, 이름(오름차순)이 2순위
			opIDs.sort(opIDSortFunc)

			// 정렬된 케이스와 선택 태그 목록을 결과 객체에 넣음
			combinedCase = new Object()
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
		var greatestStar_0 = db.op[opIDs_0[0]].rarity
		var greatestStar_1 = db.op[opIDs_1[0]].rarity

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
