// 그룹 단위로 아이템을 정렬한 순서는 아래와 같다.
var itemOrder = [
    ["컨디션", "드론"], 
    
    ["경험치", "용문폐"], 
    
    ["고급증명서", "구매증명서", "자격증명서"], 
    
    ["용골", "가구 부품"], 
    
    ["고급건설자재", "중급건설자재", "초급건설자재", "카본 팩", "카본 번들", "카본"], 
    
    ["고급작전기록", "중급작전기록", "초급작전기록", "기초작전기록"], 
    
    ["스킬개론 제3권", "스킬개론 제2권", "스킬개론 제1권"], 
    
    ["칩 첨가제", 
	"뱅가드 듀얼 칩", "뱅가드 칩셋", "뱅가드 칩", 
	"가드 듀얼 칩", "가드 칩셋", "가드 칩", 
	"디펜더 듀얼 칩", "디펜더 칩셋", "디펜더 칩", 
	"스나이퍼 듀얼 칩", "스나이퍼 칩셋", "스나이퍼 칩", 
	"캐스터 듀얼 칩", "캐스터 칩셋", "캐스터 칩", 
	"메딕 듀얼 칩", "메딕 칩셋", "메딕 칩", 
	"서포터 듀얼 칩", "서포터 칩셋", "서포터 칩", 
	"스페셜리스트 듀얼 칩", "스페셜리스트 칩셋", "스페셜리스트 칩"], 
    
    ["모듈 데이터 칩", "데이터 보충 조각", "데이터 보충 기구"],

	["D32강", "바이폴라 나노플레이크 칩", "중합제", "결정 전자 장치", "핵결정체 소결물", "중위상 엔안티오머"], 
    
    ["RMA70-24", "RMA70-12", 
	"망간 중합체", "망간 광석", 
	"화이트 호스 콜", "로식 콜", 
	"고급 연마석", "연마석", 
	"중합젤", "젤", 
	"열합금 팩", "열합금", 
	"결정 회로", "결정 부품", 
	"정제된 용제", "반합성 용제", 
	"절삭유 원액", "중합 절삭유",
	"합성 소금 팩", "합성 소금 번들",
	"고리탄화수소 프리폼", "고리탄화수소 응집질",
	"경화 섬유판", "퓨신 섬유",
	"카이랄 굴광체", "유사 응결핵"], 
    
    ["포도당 팩", "포도당 번들", "포도당", "대체당", 
	"폴리에스테르 팩", "폴리에스테르 번들", "폴리에스테르", "에스테르 원료", 
	"개량 장치", "리뉴얼 장치", "장치", "파손된 장치", 
	"정제 원암", "원암 큐브 번들", "원암 큐브", "원암", 
	"아케톤 팩", "아케톤 응집체 번들", "아케톤 응집체","디케톤", 
	"이철 팩", "이철 번들", "이철", "이철 조각"],
]

const getGroupIdx = function (itemID) {
	var name = db.item[itemID].name.kr
	for (var i = 0; i < itemOrder.length; ++i) {
		if (itemOrder[i].indexOf(name) >= 0) {
			return i
		}
	}
	
	console.log('에러: 그룹 인덱스를 찾을 수 없음: ', name, itemID)
	return -1
}

const showDetailedResult = function () {
	// 세부 결과 보이기
	$('#result-container #detailed-result').css('display', 'block')
	
	// 버튼 바꾸기
	$('#result-container .show-detailed-result').css('display', 'none')
	$('#result-container .hide-detailed-result').css('display', 'inline-block')
}

const hideDetailedResult = function () {
	// 세부 결과 숨기기
	$('#result-container #detailed-result').css('display', 'none')
	
	// 버튼 바꾸기
	$('#result-container .show-detailed-result').css('display', 'inline-block')
	$('#result-container .hide-detailed-result').css('display', 'none')
}

const toImg = function (name, quantity, smallFont = false) {
	var itemID = getItemIDByKRName(name)
	
	var classHtml = ' class="result-item-container'
	
	var nameHtml = ''
	if (itemID >= 0) {
		if (db.item[itemID].craft.length > 0) {
			classHtml += ' clickable'
		}
		
		nameHtml += ' name="item_' + itemID + '"'
	}
	
	classHtml += '"'
	
	var s = '<div' + classHtml + nameHtml + '>'
	
	s += '<img src="./images/item/t/' + name + '.png" ' + 'alt="' + name + '">'
	s += '<div class="result-item-quantity'
	if (smallFont) {
		s += ' small'
	}
    else if (name === '용문폐') {
        s += ' small'
    }
	s += '">'
	s += decimalComma(String(quantity))
	s += '</div>'
	s += '<span class="result-item-name">'
	s += name
	s += '</span>'
	s += '</div> '
	
	return s
}

// resultData 구조
/*
	resultData: {
		// 포함된 아이템 ID 나열
		IDs: [1,2,3,4],
		
		// 각 아이템별 필요갯수
		"1": 15,
		"2": 2,
		"3": 9,
		"4": 8
	}
*/

const makeResultHtml = function (resultData) {
	var resultHtml = ''
	
	for (var i = 0; i < resultData.IDs.length; ++i) {
		var ID = resultData.IDs[i]
		
		resultHtml += toImg(db.item[ID].name.kr, resultData[ID])
	}
	
	return resultHtml
}

const makeResultHtmlByGroup = function (resultData) {
	var openDiv = ' <div class="result-group">'
	var closeDiv = '</div> '
	
	var resultHtml = openDiv
	
	//resultData.IDs.sort((a,b)=>a-b).forEach((id)=>{
	//	resultHtml += toImg(db.item[id].name.kr, resultData[id])
	//})
	
	//
	var prevGroupIdx = -1
	
	for (var i = 0; i < resultData.IDs.length; ++i) {
		var ID = resultData.IDs[i]
		var groupIdx = getGroupIdx(ID)
		if (groupIdx == -1) {
			console.log('에러: 그룹 인덱스를 찾을 수 없음: ', db.item[ID].name.kr, ID)
		}
		
		// 이전 아이템과 비교해서 그룹이 바뀌었을 경우, 줄바꿈 추가
		if ((i > 0) && (prevGroupIdx != groupIdx)) {
			resultHtml += closeDiv + '<br><br>' + openDiv//'<br>'
		}
		
		resultHtml += toImg(db.item[ID].name.kr, resultData[ID])
		
		prevGroupIdx = groupIdx
	}//
	
	resultHtml += closeDiv
	
	return resultHtml
}

const getItemIDByKRName = function (KRname) {
	for (var i = 0, len = db.item.keys.length, key = ''; i < len; ++i) {
        key = db.item.keys[i]
		if (db.item[key].name.kr === KRname) {
			return i
		}
	}
	
	//console.error(KRname + '은(는) 존재하는 아이템의 이름이 아닙니다.')
	return -1
}

var decimalComma = function (num) {
    var numStr = num.toString()
    var commas = Math.floor((numStr.length - 1) / 3)
    var i = numStr.length % 3
    
    // 숫자를 끝에서부터 3자씩 분리
    var retArr
    if (i > 0) {
        retArr = [numStr.slice(0, i)]
    }
    else {
        retArr = []
    }
    
    for (var len = numStr.length; i < len; i += 3) {
        retArr.push(numStr.slice(i, i+3))
    }
    
    // 분리된 숫자 사이에 콤마를 넣어 반환
    return retArr.join(',')
}

const recalcExpLmd = function () {
    let res = calc(fetchInputData())
    
    localStorage.setItem('optotal_exp-stage', document.getElementById('exp-stage').value)
    localStorage.setItem('optotal_lmd-stage', document.getElementById('lmd-stage').value)
    
    let expStage = localStorage.getItem('optotal_exp-stage'),
        lmdStage = localStorage.getItem('optotal_lmd-stage')
    
    if (!(expStage in db.oplv.stage.exp)) expStage = 'LS-6'
    if (!(lmdStage in db.oplv.stage.lmd)) lmdStage = 'CE-6'
    
    var expSanity = db.oplv.stage.exp[expStage].sanity
	var expReward = db.oplv.stage.exp[expStage].reward // lowerBound, upperBound, expectation
	var expNum = {
        ub: Math.ceil(res.total.exp / expReward.lowerBound),
        lb: Math.ceil(res.total.exp / expReward.upperBound)
    }
    
	var lmdSanity = db.oplv.stage.lmd[lmdStage].sanity
	var lmdReward = db.oplv.stage.lmd[lmdStage].reward // lowerBound, upperBound, expectation
	var lmdNum = {
        ub: Math.ceil(res.total.lmd / lmdReward.lowerBound),
        lb: Math.ceil(res.total.lmd / lmdReward.upperBound)
    }
    
    var sanityUsage = {
        ub: (expNum.ub * expSanity) + (lmdNum.ub * lmdSanity),
        lb: (expNum.lb * expSanity) + (lmdNum.lb * lmdSanity)
    }
    
    var s = ''
    
    s = decimalComma(expNum.lb)
    if (expNum.lb != expNum.ub) s += ' - ' + decimalComma(expNum.ub)
    s += '회 클리어'
    
    document.getElementById('exp-num').innerText = s
    
    s = decimalComma(lmdNum.lb)
    if (lmdNum.lb != lmdNum.ub) s += ' - ' + decimalComma(lmdNum.ub)
    s += '회 클리어'
    
    document.getElementById('lmd-num').innerText = s
    
    s = decimalComma(sanityUsage.lb)
    if (sanityUsage.lb != sanityUsage.ub) s += ' - ' + decimalComma(sanityUsage.ub)
    s += '이성 소모'
    
    document.getElementById('sanity-usage').innerText = s
}

const tt = function (res) {
	var s = ''
	
	var openDiv = ' <div class="result-group">'
	var closeDiv = '</div> '
	
	s += '<hr class="main-line">'
	s += '<span class="result-maintitle">합계</span><br>'
	s += '<hr class="sub-line">'
	s += '<span class="result-subtitle">경험치, 용문폐</span>'
	s += '<hr>'
	s += ' <div style="margin-top: 2px; display: inline-block; border: none; width: 100%; text-align: center">'
	s += toImg('경험치', res.total.exp, true)
	s += toImg('용문폐', res.total.lmd, true)
	s += '</div>'
	s += '<br>'
	s += '<div style="margin-top: 8px; margin-bottom: 8px; width: 100%; font-size: 10px; text-align: center">▼</div>'
	
    let expStage = localStorage.getItem('optotal_exp-stage'),
        lmdStage = localStorage.getItem('optotal_lmd-stage')
    
    if (!(expStage in db.oplv.stage.exp)) expStage = 'LS-6'
    if (!(lmdStage in db.oplv.stage.lmd)) lmdStage = 'CE-6'
    
    var expSanity = db.oplv.stage.exp[expStage].sanity
	var expReward = db.oplv.stage.exp[expStage].reward // lowerBound, upperBound, expectation
	var expNum = {
        ub: Math.ceil(res.total.exp / expReward.lowerBound),
        lb: Math.ceil(res.total.exp / expReward.upperBound)
    }
    
	var lmdSanity = db.oplv.stage.lmd[lmdStage].sanity
	var lmdReward = db.oplv.stage.lmd[lmdStage].reward // lowerBound, upperBound, expectation
	var lmdNum = {
        ub: Math.ceil(res.total.lmd / lmdReward.lowerBound),
        lb: Math.ceil(res.total.lmd / lmdReward.upperBound)
    }
    
    var sanityUsage = {
        ub: (expNum.ub * expSanity) + (lmdNum.ub * lmdSanity),
        lb: (expNum.lb * expSanity) + (lmdNum.lb * lmdSanity)
    }
	
	s += ' <div class="result-exp-lmd-container">'
	s += '<div class="result-exp-lmd">'
	
	s += '<span style="color: #777; font-size: 15px">경험치</span>'
    s += '<select id="exp-stage" onchange="recalcExpLmd()">'
    for (let stage in db.oplv.stage.exp) {
        s += `<option value="${stage}"`
        if (stage == expStage) s += ' selected'
        s += `>${stage}</option>`
    }
    s += '</select>'
    s += ' ▸ '
	s += '<span id="exp-num" class="tag stage-guide-item">' + decimalComma(expNum.lb)
    if (expNum.lb != expNum.ub) s += ' - ' + decimalComma(expNum.ub)
    s += '회 클리어</span>'
	s += '</span><br>'
	
	s += '<span style="color: #777; font-size: 15px">용문폐</span>'
    s += '<select id="lmd-stage" onchange="recalcExpLmd()">'
    for (let stage in db.oplv.stage.lmd) {
        s += `<option value=${stage}`
        if (stage == lmdStage) s += ' selected'
        s += `>${stage}</option>`
    }
    s += '</select>'
    s += ' ▸ '
	s += '<span id="lmd-num" class="tag stage-guide-item">' + decimalComma(lmdNum.lb)
    if (lmdNum.lb != lmdNum.ub) s += ' - ' + decimalComma(lmdNum.ub)
    s += '회 클리어</span>'
	s += '</span><br>'
	
	s += '<span style="color: #777; font-size: 15px">경험치+용문폐</span> ▸ '
	s += '<span id="sanity-usage" class="tag stage-guide-item">' + decimalComma(sanityUsage.lb)
    if (sanityUsage.lb != sanityUsage.ub) s += ' - ' + decimalComma(sanityUsage.ub)
    s += '이성 소모</span>'
	s += '</span><br>'
	s += '</div>'
	s += '</div> '
	
	//////////
	
	s += '<br><br>'
	s += '<hr class="sub-line">'
	s += '<span class="result-subtitle">모든 재료 합산</span>'
	s += '<hr>'
	s += makeResultHtmlByGroup(res.total)
	s += '<hr>'
	
	//////////
	
	s += '<button type="button" class="show-detailed-result" onclick="showDetailedResult()">세부 결과 보이기</button>'
	s += '<button type="button" class="hide-detailed-result" onclick="hideDetailedResult()" style="display: none">세부 결과 숨기기</button>'
	
	//////////
	// 이하 세부 결과 (detailed-result)
	
	s += '<div id="detailed-result" style="display:none">'
	
	s += '<hr class="sub-line">'
	s += '<span class="result-subtitle">레벨링 비용<br>(정예화 비용 제외)</span>'
	s += '<hr>'
	s += openDiv
	s += toImg('경험치', res.total.exp, true)
	s += toImg('용문폐', res.opLeveling.lmd, true)
	s += closeDiv
	s += '<hr>'
	
	//////////
	
	s += '<hr class="sub-line">'
	s += '<span class="result-subtitle">정예화 재료</span>'
	s += '<hr>'
	s += makeResultHtmlByGroup(res.elitePromotion)
	s += '<hr>'
	
	//////////
	
	s += '<hr class="sub-line">'
	s += '<span class="result-subtitle">스킬 강화 재료</span>'
	s += '<hr>'
	s += makeResultHtmlByGroup(res.skillLeveling)
	s += '<hr>'

	//////////

	s += '<hr class="sub-line">'
	s += '<span class="result-subtitle">강화 모듈 재료</span>'
	s += '<hr>'
	s += makeResultHtmlByGroup(res.module)
	s += '<hr>'

	//////////
	
	s += '</div>'
	
	s += '<button type="button" class="hide-detailed-result" onclick="hideDetailedResult()" style="display: none">세부 결과 숨기기</button>'
	
	s += '<hr style="border-top-color: #777; border-top-width: 3px;">'
	
	return s
}

// 한번 실행에 대략 10ms정도 소요되는데, 이는 평상시 유저가 사용할 때 문제되는 속도는 아니지만,
// 기존 오퍼레이터 정보 대량 복원등의 상황에서 트리거가 여러번 발동되면서
// 지나치게 많은 호출이 이뤄질 경우, 문제가 될 수 있다.
// 따라서, 결과 갱신을 끄고 켤 수 있는 전역변수를 따로 만들고,
// 결과 갱신 옵션이 꺼져있다면 갱신요청을 무시하는 방향으로 진행한다.
var doNotRefreshResult = false

var showt = 0
var mshow = [] // fetch, calc, sort, make html, draw
const showResult = function () {
	if (doNotRefreshResult === true) {
		return
	}
    showt = Date.now()
	// 일단 계산 함수에 넘겨줄 입력데이터를 읽어들임
	var inputData = fetchInputData()
	mshow.push(Date.now()-showt)
	// 선택된 오퍼레이터가 존재하지 않으면, 실제로 계산하지는 않음
	if (inputData === false) {
		$('#result-container').html('<div id="result-guide"><hr class="main-line"><span class="result-maintitle" style="display: inline-block; width: 100%; text-align: left">합계</span><br><br>여기에 결과가 표시됩니다.</div>')
		
		return false
	}
	showt = Date.now()
	// 계산 함수에 입력 데이터를 건네줌
	var resultData = calc(inputData)
	mshow.push(Date.now()-showt)
    showt=Date.now()
	// 결과 데이터를 정렬
	sortResultData(resultData)
	mshow.push(Date.now()-showt)
	// 정렬된 결과 데이터를 적절하게 가공하여 사용자에게 표시
    //console.log(resultData)
    showt=Date.now()
    var htmlstr = tt(resultData)
    mshow.push(Date.now()-showt)
    showt=Date.now()
	document.getElementById('result-container').innerHTML = htmlstr//tt(resultData)
    mshow.push(Date.now()-showt)
}

const fetchInputData = function () {
	// 입력 데이터를 총체적으로 저장할 객체
	var inputData = {}
	// 입력된 대원들의 ID를 배열로 저장해놓을 것임
	inputData.opIDs = []
	
	// 추가된 오퍼레이터 폼 목록을 가져옴
	var opElems = document.querySelectorAll('.op[name*="op_"]')
	
	// 선택된 오퍼레이터가 존재하지 않으면, 실제로 계산하지는 않음
	if (opElems.length === 0) {
		return false
	}
	
	// 각 오퍼레이터 폼별로 입력 데이터 읽어들임
	for (var i = 0, len = opElems.length; i < len; ++i) {
		// i번째 오퍼레이터 폼
		var opForm = opElems[i]
        var opID = opForm.getAttribute('name').split('_')[1]
		
		var elite = {}
		var opLevel = {}
		var skillLevel = {}
		var module = {}
		
        // 원본에게 종속되는 속성이 있는 어레인지 버전의 경우,
        // 종속 속성에 대한 계산은 할 필요가 없으므로, 해당 속성에 대해 false로 설정
        if (db.op[opID].elite === null) {
            elite = false
            opLevel = false
        }
        else {
            // 정예화 현재, 목표 단계
            elite.current = Number(opForm.querySelector('.current-elite').value)
            elite.target = Number(opForm.querySelector('.target-elite').value)
            
            // 레벨 현재, 목표 값
            opLevel.current = Number(opForm.querySelector('.current-op-level').value)
            opLevel.target = Number(opForm.querySelector('.target-op-level').value)
        }
		
        if (db.op[opID].skill === null) {
            skillLevel = false
        }
        else {
            // 각 스킬별 현재, 목표 값
            // 스킬의 경우, 7레벨까지는 공통으로, 8레벨 이상부터는 따로 특화레벨로 뺌.
            // 일단, 활성화된 스킬의 갯수를 파악
            // 목표에서 활성화된 스킬의 갯수를 파악하면 됨. 어쨌든, 목표에서 활성화되어야 계산에 반영되는 거니까
            var currentSkillLevelList = opForm.querySelectorAll('.current-skill-level')
            var targetSkillLevelList = opForm.querySelectorAll('.target-skill-level')
            
            var numOfSkills = 0
            
            targetSkillLevelList.forEach(function (sel) {
                if (!sel.disabled) { ++numOfSkills }
            })
            
            // 활성화된 스킬이 존재하는 경우, 정상적으로 진행
            if (numOfSkills > 0) {
                // 각 스킬별 레벨을 읽어들임
                var sklv = []
                
                for (var j = 0; j < numOfSkills; ++j) {
                    sklv[j] = {}
                    sklv[j].current = Number(currentSkillLevelList[j].value)
                    sklv[j].target = Number(targetSkillLevelList[j].value)
                }
                
                // 공통 부분, 특화 부분을 찾아내어 저장하기
                // 공통 부분은, 즉 7레벨 이하인 값
                skillLevel.common = {}
                
                // 현재에서 공통 부분 찾기. 아무 스킬의 레벨을 보고, 최대 7까지 적용하면 됨.
                if (sklv[0].current > 7) {
                    skillLevel.common.current = 7
                }
                else {
                    skillLevel.common.current = sklv[0].current
                }
                
                // 목표에서 공통 부분 찾기. 아무 스킬의 레벨을 보고, 최대 7까지 적용하면 됨.
                // 여기선 첫번째 스킬의 레벨을 보도록 하겠음
                // 그래야, 현재에선 비활성화되고 목표에선 활성화된 스킬의 현재 값을 읽어버리는 사태가 없을테니까
                
                if (sklv[0].target > 7) {
                    skillLevel.common.target = 7
                }
                else {
                    skillLevel.common.target = sklv[0].target
                }
                
                // 특화 부분은, 즉 8레벨 이상인 값
                skillLevel.mastery = {}
                
                // 스킬 갯수만큼 mastery에 오브젝트 미리 추가
                for (var j = 0; j < numOfSkills; ++j) {
                    skillLevel.mastery[j] = {}
                }
                
                // 현재, 목표에서 특화 부분 찾기. 각 스킬에 대해 (스킬레벨 - 7)을 저장하면 됨. 결과값이 음수라면 0으로 저장.
                for (var j = 0; j < numOfSkills; ++j) {
                    // i스킬에 대해 현재에서 특화 부분 찾기
                    // i스킬이 현재에서 비활성화되어있다고 해도, 문제 없는 코드임. 마스터리 레벨 0으로 정상처리 되므로
                    var currentMasteryLevel = sklv[j].current - 7
                    if (currentMasteryLevel > 0) {
                        skillLevel.mastery[j].current = currentMasteryLevel
                    }
                    else {
                        skillLevel.mastery[j].current = 0
                    }
                    
                    // i스킬에 대해 목표에서 특화 부분 찾기
                    var targetMasteryLevel = sklv[j].target - 7
                    if (targetMasteryLevel > 0) {
                        skillLevel.mastery[j].target = targetMasteryLevel
                    }
                    else {
                        skillLevel.mastery[j].target = 0
                    }
                }
                
                // 현재와 목표 사이에 차이가 존재하는지 검사
                // 차이가 없다면, 스킬 계산은 건너뛸 수 있도록
                // skillLevel을 false로 설정
                var isSame = true
                // 공통 부분 검사
                if (skillLevel.common.current != skillLevel.common.target) {
                    isSame = false
                }
                if (isSame) {
                    // 목표 부분 검사
                    for (var j = 0; j < numOfSkills; ++j) {
                        if (skillLevel.mastery[j].current != skillLevel.mastery[j].target) {
                            isSame = false
                            break
                        }
                    }
                    // 차이가 없을 경우에만 skillLevel을 false로 설정
                    if (isSame) {
                        skillLevel = false
                    }
                }
                
                // 어레인지(클래스 체인지)인 경우, 스킬의 공통레벨이 원본과 공유됨. 따라서, 공통부분에 해당하는 스킬작 재료는 계산하면 안됨.
                // 스킬작 재료 계산방식은, current level -> target level까지 가면서 한 level마다 합산하는 방식이므로
                // skillLevel.common.current를 7로 만들어버리면 어레인지의 공통부분만 스킵 가능.
                // 원래 7이었어도 문제 없고, 7 미만이었다면 원본과 중복되어 계산되는 걸 막을 수 있음.
                if (skillLevel !== false && opID.indexOf('-') >= 0) {
                    skillLevel.common.current = 7
                }
            }
            // 활성화된 스킬이 존재하지 않는 경우, 스킬 계산은 건너뛸 수 있도록
            // skillLevel를 false로 설정
            else {
                skillLevel = false
            }
        }

		// 모듈이 존재하지 않으면, 애초에 .module 섹터도 존재하지 않음. 계산에 포함하지 않아야 함.
		if (db.op[opID].module === null) {
			module = false
		}
		else {
			// .module 섹터의 정보를 읽어서 계산에 반영
			module = {}
			for (let moduleCode in db.op[opID].module) {
				let c, t
				c = Number(opForm.querySelector(`.op[name="op_${opID}"] .current-module-level[data-module-code=${moduleCode}]`).value)
				t = Number(opForm.querySelector(`.op[name="op_${opID}"] .target-module-level[data-module-code=${moduleCode}]`).value)
				module[moduleCode] = [c, t]
			}
		}
		
		// 이제 정예화 단계, 레벨, 스킬 레벨에 관한 입력 데이터를 전부 읽어들이고 알맞게 기록했으니,
		// inputData 객체에 집어넣기
		inputData.opIDs.push(opID)
		inputData[opID] = {}
		inputData[opID].elite = elite
		inputData[opID].opLevel = opLevel
		inputData[opID].skillLevel = skillLevel
		inputData[opID].module = module
	}
	
	return inputData
}

const sortResultData = function (resultData) {
	// 계산 결과에서 ID 배열을 정렬
	const byGroup = function (a, b) {
		var name = {}
		name.a = db.item[a].name.kr
		name.b = db.item[b].name.kr
		
		var priority = {}
		priority.a = {
			group: -1,
			elem: -1
		}
		priority.b = {
			group: -1,
			elem: -1
		}
		
		// A의 그룹 우선도, 그룹 내 우선도를 확인
		for (var i = 0, len = itemOrder.length, elemIdx = 0; i < len; ++i) {
			elemIdx = itemOrder[i].indexOf(name.a)
			if (elemIdx >= 0) {
				priority.a.group = i
				priority.a.elem = elemIdx
				break
			}
		}
		
		// B의 그룹 우선도, 그룹 내 우선도를 확인
		for (var i = 0, len = itemOrder.length, elemIdx = 0; i < len; ++i) {
			elemIdx = itemOrder[i].indexOf(name.b)
			if (elemIdx >= 0) {
				priority.b.group = i
				priority.b.elem = elemIdx
				break
			}
		}
		
		if (priority.a.group == -1 || priority.a.elem == -1) {
			console.error(name.a, '우선도 오류:', priority.a.group, priority.a.elem)
		}
		if (priority.b.group == -1 || priority.b.elem == -1) {
			console.error(name.b, '우선도 오류:', priority.b.group, priority.b.elem)
		}
		
		// 그룹 우선도를 1순위, 그룹 내 우선도를 2순위로 하여서 정렬
		if (priority.a.group < priority.b.group) {
			return -1
		}
		else if (priority.b.group < priority.a.group) {
			return 1
		}
		
		if (priority.a.elem < priority.b.elem) {
			return -1
		}
		else {
			return 1
		}
	}
	
	resultData.module.IDs.sort(byGroup)
	resultData.skillLeveling.IDs.sort(byGroup)
	resultData.elitePromotion.IDs.sort(byGroup)
	resultData.total.IDs.sort(byGroup)
	
	return resultData
}

// getMaxLevel, levelignCalc는 oplv.js에서 가져옴
const getMaxLevel = function (elite, rarity) {
	return Number(db.oplv.maxLevel['elite_' + elite][rarity - 1])
}

/* 
formdata: {
	rarity:,
	
	current: {
		elite:,
		level:,
		exp:
	},
	
	target: {
		elite:,
		level:,
		exp:
	}
}
*/
const levelingCalc = function (formdata) {
	var temp
	var expTable = db.oplv.leveling.expTable
	var lmdTable = db.oplv.leveling.lmdTable
	
	/* 목표값 설정 */
	var target = {}
	target.exp = 0
	target.lmd = 0
	
	/* 누적 경험치 계산 */
	// 정예화 단계에 따른 누적 경험치 반영
	for (var i = 0; i < formdata.target.elite; ++i)
	{
		target.exp += expTable['elite_' + String(i)][getMaxLevel(i, formdata.rarity) - 1]
	}
	
	// 레벨에 따른 누적 경험치 반영
	target.exp += expTable['elite_' + String(formdata.target.elite)][formdata.target.level - 1]
	
	// 기존 경험치를 누적 경험치에 반영
	target.exp += formdata.target.exp
	
	/* 누적 용문폐 계산 */
	// 정예화 단계에 따른 누적 용문폐 반영
	for (var i = 0; i < formdata.target.elite; ++i)
	{
		target.lmd += lmdTable['elite_' + String(i)][getMaxLevel(i, formdata.rarity) - 1]
	}
	
	// 레벨에 따른 누적 용문폐 반영
	target.lmd += lmdTable['elite_' + String(formdata.target.elite)][formdata.target.level - 1]
	
	// 경험치에 따른 누적 용문폐 반영
	// 이미 만렙인 경우, 기존 경험치가 존재할 수 없으므로 건너뛴다.
	if (formdata.target.level < getMaxLevel(formdata.target.elite, formdata.rarity))
	{
		// 1Exp당 필요한 용문폐 계산
		var temp_lmd, temp_exp
		
		temp_lmd =  lmdTable['elite_' + String(formdata.target.elite)][formdata.target.level]
		temp_lmd -= lmdTable['elite_' + String(formdata.target.elite)][formdata.target.level - 1]
		
		temp_exp =  expTable['elite_' + String(formdata.target.elite)][formdata.target.level]
		temp_exp -= expTable['elite_' + String(formdata.target.elite)][formdata.target.level - 1]
		
		temp = temp_lmd / temp_exp
		
		target.lmd += Math.ceil(temp * formdata.target.exp)
	}
	
	/* 현재값 설정 */
	var current = {}
	current.exp = 0
	current.lmd = 0
	
	/* 누적 경험치 계산 */
	// 정예화 단계에 따른 누적 경험치 반영
	for (var i = 0; i < formdata.current.elite; ++i)
	{
		current.exp += expTable['elite_' + String(i)][getMaxLevel(i, formdata.rarity) - 1]
	}
	
	// 레벨에 따른 누적 경험치 반영
	current.exp += expTable['elite_' + String(formdata.current.elite)][formdata.current.level - 1]
	
	// 기존 경험치를 누적 경험치에 반영
	current.exp += formdata.current.exp
	
	/* 누적 용문폐 계산 */
	// 정예화 단계에 따른 누적 용문폐 반영
	for (var i = 0; i < formdata.current.elite; ++i)
	{
		current.lmd += lmdTable['elite_' + String(i)][getMaxLevel(i, formdata.rarity) - 1]
	}
	
	// 레벨에 따른 누적 용문폐 반영
	current.lmd += lmdTable['elite_' + String(formdata.current.elite)][formdata.current.level - 1]
	
	// 경험치에 따른 누적 용문폐 반영
	// 이미 만렙인 경우, 기존 경험치가 존재할 수 없으므로 건너뛴다.
	if (formdata.current.level < getMaxLevel(formdata.current.elite, formdata.rarity))
	{
		// 1Exp당 필요한 용문폐 계산
		var temp_lmd, temp_exp
		
		temp_lmd =  lmdTable['elite_' + String(formdata.current.elite)][formdata.current.level]
		temp_lmd -= lmdTable['elite_' + String(formdata.current.elite)][formdata.current.level - 1]
		
		temp_exp =  expTable['elite_' + String(formdata.current.elite)][formdata.current.level]
		temp_exp -= expTable['elite_' + String(formdata.current.elite)][formdata.current.level - 1]
		
		temp = temp_lmd / temp_exp
		
		current.lmd += Math.ceil(temp * formdata.current.exp)
	}
	
	// 소모 자원 정리
	var result = {}
	result.exp = target.exp - current.exp
	result.lmd = target.lmd - current.lmd
	
	// 소모 자원이 음수일 경우 0으로 설정
	result.exp = (result.exp < 0) ? 0 : result.exp
	result.lmd = (result.lmd < 0) ? 0 : result.lmd
	
	return result
}

const calc = function (inputData) {
	// 계산하는 자원 종류:
	// 경험치, 용문폐,
	// 정예화 재료, 스킬작 재료, 강화모듈 재료
	
	// 계산하는 육성 종류:
	// 레벨링(경험치/용문폐), 정예화(용문폐/정예화재료), 스킬작(스킬작재료), 모듈(강화모듈재료)
	
	// 일단은, 정예화, 스킬작에 대해서만 계산해보겠음. 레벨링 계산기는 전에 만들어뒀으니까 그거 쓰면 되고.
	// 정예화, 스킬작 계산하는 건 만들었음. 이제 레벨링(정예화 용문폐는 제외한 순수 레벨링 코스트)에 대해서도 계산하면 끝남.
	
	var result = {}
	result.opLeveling = {}
	result.skillLeveling = {}
	result.elitePromotion = {}
	result.module = {}
	result.total = {}
	
	// 순수 레벨링 비용 계산
	// 모든 대원에 대해 소비자원을 합산할 것
	// 최종 단계에서 다른 객체들과 따로 합산할 것. 특히 용문폐
	result.opLeveling.exp = 0
	result.opLeveling.lmd = 0
	for (var i = 0; i < inputData.opIDs.length; ++i) {
		// oplv.js에서 일부 가져온 함수를 사용하므로, 데이터를 알맞는 형식으로 가공하여 전달해야 함
		var opID = inputData.opIDs[i]
		
        // 일단 계산을 시작하기 전에, 건너뛰어도 되는지 확인
		if (inputData[opID].opLevel === false) {
			continue;
		}
        
		var formdata = {}
		formdata.rarity = db.op[opID].rarity
		formdata.current = {}
		formdata.current.elite = inputData[opID].elite.current
		formdata.current.level = inputData[opID].opLevel.current
		formdata.current.exp = 0
		formdata.target = {}
		formdata.target.elite = inputData[opID].elite.target
		formdata.target.level = inputData[opID].opLevel.target
		formdata.target.exp = 0
		
		// 구성한 데이터를 바탕으로 순수 레벨링 비용 계산 함수 호출
		var levelingCost = levelingCalc(formdata)
		
		// 얻어낸 필요 경험치/용문폐 값을 result.opLeveling에 더함
		result.opLeveling.exp += levelingCost.exp
		result.opLeveling.lmd += levelingCost.lmd
	}
	
	// 정예화 재료 계산
	// 모든 대원에 대해 소비자원을 합산할 것임
	// elitePromotion 객체에 자원ID를 key로, 수량을 value로 삼아서 넣을 것임
	// 활용하기 편하도록 자원ID 배열도 만들어 놓을 것임
	result.elitePromotion.IDs = []
	for (var i = 0, ilen = inputData.opIDs.length; i < ilen; ++i) {
		// 현재 정예화에서 목표 정예화까지 가면서 소모자원을 싸그리 합치면 됨.
		var opID = inputData.opIDs[i]
        
        // 일단 계산을 시작하기 전에, 건너뛰어도 되는지 확인
		if (inputData[opID].elite === false) {
			continue;
		}
        
		var currentElite = inputData[opID].elite.current
		var targetElite = inputData[opID].elite.target
		
		// 정예화 단계에 변동이 없으면 그냥 스킵
		if (currentElite == targetElite) {
			continue;
		}
		
		// 현재 정예화단계부터 목표 정예화단계까지의 모든 재료를 합산하여 elitePromotion 객체에 저장
		for (var j = currentElite; j < targetElite; ++j) {
			var eliteMaterials = []
			
			// [자원ID, 수량], ... 형식으로 저장되어 있음
            try {
                eliteMaterials = db.op[opID].elite[j]
            } catch (e) {
                console.error(e)
                console.error('opID:', opID, db.op[opID])
                return
            }
			
			for (var k = 0, klen = eliteMaterials.length; k < klen; ++k) {
				// 자원ID, 수량
				var itemID = eliteMaterials[k][0]
				var quantity = Number(eliteMaterials[k][1])
				
				// elitePromotion 객체에 해당 자원이 이미 기록되어 있다면, 수량을 추가
				if (result.elitePromotion.hasOwnProperty(itemID)) {
					result.elitePromotion[itemID] += quantity
				}
				// elitePromotion 객체에 해당 자원이 아직 기록된 적이 없다면, 새로이 set을 설정
				else {
					result.elitePromotion[itemID] = quantity
					result.elitePromotion.IDs.push(itemID)
				}
			}
		}
		
		// 이제 현재 대원에 대한 정예화재료 합산은 끝났음. 다음 대원으로 넘어감.
	}
	
	// 이제 모든 대원에 대한 정예화재료 합산이 끝났음.
	
	
	// 스킬작 재료 계산
	// 모든 대원에 대해 소비자원을 합산할 것임
	// skillLeveling 객체에 자원ID를 key로, 수량을 value로 삼아서 넣어놓을 것임
	// 활용하기 편하도록 자원ID 배열도 만들어 놓을 것임
	result.skillLeveling.IDs = []
	for (var i = 0, ilen = inputData.opIDs.length; i < ilen; ++i) {
		// 공통 부분, 특화 부분 따로 계산.
		// 현재 레벨에서 목표 레벨까지 가면서 소모자원을 싸그리 합치면 됨.
		var opID = inputData.opIDs[i]
		
		// 일단 계산을 시작하기 전에, 건너뛰어도 되는지 확인
		if (inputData[opID].skillLevel === false) {
			continue;
		}
		
		// 우선 공통 부분부터 계산
		var currentLevel = Number(inputData[opID].skillLevel.common.current)
		var targetLevel = Number(inputData[opID].skillLevel.common.target)
		
		// 현재 레벨부터 목표 레벨까지의 모든 재료를 합산하여 skillLeveling 객체에 저장
		// 인덱스는 스킬레벨과 달리 0부터 시작하므로, 스킬레벨에서 1을 빼서 범위로 사용
        for (var j = currentLevel-1; j < targetLevel-1; ++j) {
            var skillMaterials = []
            
            // [자원ID, 수량], ... 형식으로 저장되어 있음
            skillMaterials = db.op[opID].skill.common[j]
            if (!skillMaterials) {
                console.log(skillMaterials, '\n', db.op[opID], j, currentLevel, targetLevel)
            }
            
            for (var k = 0, klen = skillMaterials.length; k < klen; ++k) {
                // 자원ID, 수량
                var itemID = skillMaterials[k][0]
                var quantity = Number(skillMaterials[k][1])
                
                // skillLeveling 객체에 해당 자원이 이미 기록되어 있다면, 수량을 추가
                if (result.skillLeveling.hasOwnProperty(itemID)) {
                    result.skillLeveling[itemID] += quantity
                }
                // skillLeveling 객체에 해당 자원이 아직 기록된 적이 없다면, 새로이 set을 설정
                else {
                    result.skillLeveling[itemID] = quantity
                    result.skillLeveling.IDs.push(itemID)
                }
            }
        }
		
		// 다음으로는 특화 부분을 계산
		// 각 스킬에 대해 합산할 것임
		var numOfSkills = Object.keys(inputData[opID].skillLevel.mastery).length
        
		for (var j = 0; j < numOfSkills; ++j) {
			// 이제부터 j스킬의 마스터리에 소모되는 자원을 합산할 것임
			var currentMasteryLevel = Number(inputData[opID].skillLevel.mastery[j].current)
			var targetMasteryLevel = Number(inputData[opID].skillLevel.mastery[j].target)
			
			// 현재 레벨부터 목표 레벨까지의 모든 재료를 합산하여 skillLeveling 객체에 저장
			// 마스터리 스킬레벨은 인덱스와 마찬가지로 0부터 시작하므로, 스킬레벨 그대로 범위로 사용
			for (var k = currentMasteryLevel; k < targetMasteryLevel; ++k) {
				var masteryMaterials = []
				
				// [자원ID, 수량], ... 형식으로 저장되어 있음
				masteryMaterials = db.op[opID].skill.mastery[j][k]
				
				for (var m = 0; m < masteryMaterials.length; ++m) {
					// 자원ID, 수량
					var itemID = masteryMaterials[m][0]
					var quantity = Number(masteryMaterials[m][1])
					
					// skillLeveling 객체에 해당 자원이 이미 기록되어 있다면, 수량을 추가
					if (result.skillLeveling.hasOwnProperty(itemID)) {
						result.skillLeveling[itemID] += quantity
					}
					// skillLeveling 객체에 해당 자원이 아직 기록된 적이 없다면, 새로이 set을 설정
					else {
						result.skillLeveling[itemID] = quantity
						result.skillLeveling.IDs.push(itemID)
					}
				}
			}
			
			// 이제 현재 대원의 j번째 스킬에 대한 마스터리 재료 합산은 끝났음. 다음 스킬로 넘어감
		}
		
		// 이제 현재 대원에 대한 스킬작재료 합산은 모두 끝났음. 다음 대원으로 넘어감.
	}
	
	// 이제 모든 대원에 대한 스킬작재료 합산이 끝났음.

	// 모듈 재료 계산
	result.module.IDs = []
	for (var i = 0, ilen = inputData.opIDs.length; i < ilen; ++i) {
		var opID = inputData.opIDs[i]

		// 모듈이 없거나 미반영 상태라면 스킵
		if (inputData[opID].module === false) {
			continue
		}

		// 모듈 반영 상태라면 모듈 재료 합산
		// 각 강화모듈 단위로 합산
		for (let moduleCode in db.op[opID].module) {
			let moduleData = db.op[opID].module[moduleCode], // 강화모듈 하나 선택됨
				c = inputData[opID].module[moduleCode][0],	 // 각각 현재값, 목표값
				t = inputData[opID].module[moduleCode][1]
			
			// 현재레벨부터 목표레벨까지의 재료를 합산
			// moduleData의 인덱스는 0부터 2까지 있음.
			// 0은 1랭크, 1은 2랭크, 2는 3랭크로 올리기 위해 필요한 재료를 담고 있음
			// 즉, 사실상 mdlv에 1을 더해야 강화하는 랭크가 되는 것임.
			// 현재값이 0이라고 하면, mdlv의 초기값은 현재값+1 = 1랭크로 설정되게 한다.
			// 목표값이 1이라고 하면, mdlv는 1 미만, 즉 0까지만 올라가는데 이는 1랭크까지만 강화하게 하는 것이다.
			// 따라서 현재값 0, 목표값 1이라면 모듈의 1랭크 재료만 합산하게 된다.
			for (let mdlv = c; mdlv < t; ++mdlv) {
				let materials = moduleData[mdlv] // 강화모듈의 레벨 하나 선택됨
				materials.forEach(itemset => {
					let itemID = itemset[0],
						quantity = itemset[1]
					
					// module 객체에 해당 자원이 이미 기록되어 있다면, 수량을 추가
					if (result.module.hasOwnProperty(itemID)) {
						result.module[itemID] += quantity
					}
					// module 객체에 해당 자원이 아직 기록된 적이 없다면, 새로이 set을 설정
					else {
						result.module[itemID] = quantity
						result.module.IDs.push(itemID)
					}
				})
			}
			// 현재 대원의 강화모듈 하나에 대한 합산 끝남
		}
		// 현재 대원의 모든 강화모듈에 대한 합산 끝남
	}
	// 모든 대원의 모든 강화모듈에 대한 합산 끝남
	
	// total에 모든 값들을 통합
	result.total.exp = 0
	result.total.lmd = 0
	result.total.IDs = []
	// 레벨링 비용 합산
	result.total.exp += result.opLeveling.exp
	result.total.lmd += result.opLeveling.lmd
	// 정예화 재료 합산
	for (var i = 0; i < result.elitePromotion.IDs.length; ++i) {
		var itemID = result.elitePromotion.IDs[i]
		
		// 현재 보고 있는 아이템이 용문폐라면, 용문폐에 합산하고서 다음 아이템으로 넘어감
		if (db.item[itemID].name.kr == '용문폐') {
			result.total.lmd += result.elitePromotion[itemID]
			
			continue
		}
		
		// 현재 아이템이 이미 total에 등록되어 있다면, 수량을 추가
		if (result.total.hasOwnProperty(itemID)) {
			result.total[itemID] += result.elitePromotion[itemID]
		}
		// 아직 등록되지 않았다면, 새로 등록
		else {
			result.total[itemID] = result.elitePromotion[itemID]
			result.total.IDs.push(itemID)
		}
	}
	// 스킬작 재료 합산
	for (var i = 0; i < result.skillLeveling.IDs.length; ++i) {
		var itemID = result.skillLeveling.IDs[i]
		
		// 현재 보고 있는 아이템이 용문폐라면, 용문폐에 합산하고서 다음 아이템으로 넘어감
		if (db.item[itemID].name.kr == '용문폐') {
			result.total.lmd += result.skillLeveling[itemID]
		}
		
		// 현재 아이템이 이미 total에 등록되어 있다면, 수량을 추가
		if (result.total.hasOwnProperty(itemID)) {
			result.total[itemID] += result.skillLeveling[itemID]
		}
		// 아직 등록되지 않았다면, 새로 등록
		else {
			result.total[itemID] = result.skillLeveling[itemID]
			result.total.IDs.push(itemID)
		}
	}
	// 모듈 재료 합산
	for (var i = 0; i < result.module.IDs.length; ++i) {
		var itemID = result.module.IDs[i]

		// 현재 보고 있는 아이템이 용문폐라면, 용문폐에 합산하고서 다음 아이템으로 넘어감
		if (db.item[itemID].name.kr == '용문폐') {
			result.total.lmd += result.module[itemID]
			
			continue
		}

		// 현재 아이템이 이미 total에 등록되어 있다면, 수량을 추가
		if (result.total.hasOwnProperty(itemID)) {
			result.total[itemID] += result.module[itemID]
		}
		// 아직 등록되지 않았다면, 새로 등록
		else {
			result.total[itemID] = result.module[itemID]
			result.total.IDs.push(itemID)
		}
	}

	return result
}
