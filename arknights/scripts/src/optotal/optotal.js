var gtag_searchByNameUsed = false,
    gtag_searchByRarityUsed = false
    gtag_searchByClassUsed = false

// 대원 추가 프롬프트를 띄움
const openModalPrompt = function () {
    gtag('event', '대원 추가 프롬프트 열기', {
        'event_category': '오퍼레이터 육성 자원 계산기'
    })
    
	// 프롬프트 표시
    var modal = document.querySelector('.modal')
	modal.style.display = 'block'
	modal.style.opacity = '1'
	
	// 프롬프트가 떠있는 동안에는 계산을 갱신할 필요가 없으므로 설정 변경
	doNotRefreshResult = true
    
    // 검색결과 갱신
    showSearchResult()
}

// 대원 추가 프롬프트를 닫음
const closeModalPrompt = function () {
    // 프롬프트 숨김
    var modal = document.querySelector('.modal')
    modal.style.opacity = '0'
    setTimeout(function () {
        modal.style.display = 'none'
    }, 300)
    
    // 프롬프트가 닫혔다면, 계산을 갱신할 필요가 있으므로 설정 변경하고, 재계산 요청
    doNotRefreshResult = false
    showResult()
}

var getAllIDs = function (ID) {
    var originalID = ID.split('-')[0]
    var IDs = []
    for (var i = 0; i < db.op.keys.length; ++i) {
        if (db.op.keys[i] === originalID) IDs.push(db.op.keys[i])
        else if (db.op.keys[i].indexOf(originalID + '-') === 0) IDs.push(db.op.keys[i])
    }
    IDs.sort(function (ID1, ID2) {
        ID1 = ID1.split('-')
        ID2 = ID2.split('-')
        
        if (ID1.length === 1) ID1.push(0)
        if (ID2.length === 1) ID2.push(0)
        
        if (ID1[0] < ID2[0]) return -1
        else if (ID1[0] > ID2[0]) return 1
        
        if (Number(ID1[1]) < Number(ID2[1])) return -1
        else return 1
    })
    
    return IDs
}

var main = function () {
	// 오퍼레이터 추가 버튼 클릭시, modal prompt 열음
	document.querySelector('.add-btn').addEventListener('click', function() {
        openModalPrompt()
    })
	
	// modal prompt의 content에 있는 닫기 버튼 클릭시, 닫음
	document.querySelector('.close-btn').addEventListener('click', function() {
        gtag('event', '대원 추가 프롬프트 닫기: 버튼 클릭', {
            'event_category': '오퍼레이터 육성 자원 계산기'
        })
		closeModalPrompt(true)
	})
	
	// modal prompt의 content 바깥을 누르면, 닫음
	window.addEventListener('mousedown', function(event) {
		if (event.target.getAttribute('id') === 'modal') {
            gtag('event', '대원 추가 프롬프트 닫기: 외부 클릭', {
                'event_category': '오퍼레이터 육성 자원 계산기'
            })
			closeModalPrompt(true)
		}
	})
	
	// modal prompt에서 이름 입력시, 실시간 검색 수행
	document.getElementById('opname').addEventListener('keyup', function (ev) {
        if (!gtag_searchByNameUsed) {
            gtag_searchByNameUsed = true
            gtag('event', '대원 이름으로 최초 검색', {
                'event_category': '오퍼레이터 육성 자원 계산기'
            })
        }
        
        // 엔터 키 누르면 검색 결과로 뜬 오퍼레이터를 전부 추가.
        if (ev.keyCode === 13) {
            while (document.querySelectorAll('.search-result-op').length > 0) {
                document.querySelector('.search-result-op').click()
            }
            this.value = ''
            searchingCondition.name = ''
        }
        else {
            var name = this.value
            
            var capitalizedName = ''
            
            var words = name.split(' ')
            
            for (var i = 0, len = words.length; i < len; ++i) {
                if (words[i].length === 0) {
                    continue
                }
                if (i > 0) {
                    capitalizedName += ' '
                }
                capitalizedName += words[i][0].toUpperCase() + words[i].slice(1).toLowerCase()
            }
            searchingCondition.name = capitalizedName
            
            showSearchResult()
        }
	})
	
	// modal prompt에서 레어도 조건 입력시, 실시간 검색 수행
	document.querySelectorAll('.rarity-btn').forEach(function (elem) {
        elem.addEventListener('click', function () {
            if (!gtag_searchByRarityUsed) {
                gtag_searchByRarityUsed = true
                gtag('event', '대원 레어도로 최초 검색', {
                    'event_category': '오퍼레이터 육성 자원 계산기'
                })
            }
            
            var rarity = Number(this.getAttribute('name'))
            var idx = searchingCondition.rarityArray.indexOf(rarity)
            
            // 선택 해제한 경우, rarityArray에서 해당 조건 제거
            if (idx >= 0) {
                searchingCondition.rarityArray.splice(idx, 1)
                this.classList.remove('selected')
            }
            // 선택한 경우, rarityArray에 해당 조건 추가
            else {
                searchingCondition.rarityArray.push(rarity)
                this.classList.add('selected')
            }
            
            showSearchResult()
        })
    })
	
	// modal prompt에서 클래스 조건 입력시, 실시간 검색 수행
	document.querySelectorAll('.class-btn').forEach(function (elem) {
        elem.addEventListener('click', function () {
            if (!gtag_searchByClassUsed) {
                gtag_searchByClassUsed = true
                gtag('event', '대원 클래스로 최초 검색', {
                    'event_category': '오퍼레이터 육성 자원 계산기'
                })
            }
            
            var tagCode = getTagCodeByKRTagName(this.getAttribute('name'))
            
            // 선택 해제한 경우, tagCode에서 해당 조건 제거
            if (tagCode & searchingCondition.tagCode) {
                this.classList.remove('selected')
            }
            // 선택한 경우, tagCode에 해당 조건 추가
            else {
                this.classList.add('selected')
            }
            
            // 눌린 태그를 토글
            searchingCondition.tagCode ^= tagCode
            
            showSearchResult()
        })
    })
	
	// 로컬스토리지로부터 오퍼레이터 선택값, 정보입력값 복원
	loadLocalStorage()
}

var getTextWidth = function ($elm) {
    var style = 'font-size:' + $elm.css('font-size') + ';'
        style += 'font-family:' + $elm.css('font-family') + ';'
    
    var $tmpelm = $('<span style="' + style + '">' + $elm.html() + '</span>').appendTo("body");
    var elmWidth = $tmpelm.width();
    
    $tmpelm.remove();
    
    return elmWidth;
}
// https://stackoverflow.com/a/34982946
var centerCnt = 0
var centerCacheHit = 0
var centerCache = {} // (innerText of selected option): text-indent value

var csp = []
var ncsp = []
var centerTime = 0
var doNotCenter = false
var centerSelect = function (elm) {
    if (doNotCenter) { return }
    
    centerTime = Date.now()
    //++centerCnt
    var key = elm.options[elm.selectedIndex].innerText
    
    var cacheValue = centerCache[key]
    
    if (cacheValue) {
        //++centerCacheHit
        elm.style.textIndent = cacheValue
        csp.push(Date.now() - centerTime)
    }
    else {
        var $elm = $(elm)
        var optionWidth = getTextWidth($(elm.options[elm.selectedIndex]))
        var emptySpaceHalf = ($elm.width() - optionWidth) / 2
        $elm.css('text-indent', emptySpaceHalf)
        centerCache[key] = emptySpaceHalf + 'px'
        ncsp.push(Date.now() - centerTime)
    }
}

// 가능한 초기 설정 value
// 정예화 단계: (current-elite, target-elite): Integer
// 레벨: (current-op-level, target-op-level): Integer
// 1-3스킬 레벨: (current-skill-level, target-skill-level) : Array of Integer
const makeOpForm = function (opID, options = {}) {
    var values = {}, asElement = true
    
    if (!options) { options = {} }
    if (typeof options.values === 'object') { values = options.values }
    if (typeof options.asElement === 'boolean') { asElement = options.asElement }
    
    var rarity = Number(db.op[opID].rarity)
    var maxElite = [0, 0, 1, 2, 2, 2][rarity - 1]
    var maxLevel = getMaxLevel(maxElite, rarity)
    var maxSkillLevel = [4, 7, 7][maxElite]
	var opName = db.op[opID].name.en.toLowerCase()
    
    var currentElite = (Number.isInteger(values['current-elite']) ? values['current-elite'] : 0)
    var targetElite = (Number.isInteger(values['target-elite']) ? values['target-elite'] : maxElite)
    
    var currentOpLevel = (Number.isInteger(values['current-op-level']) ? values['current-op-level'] : 1)
    var targetOpLevel = (Number.isInteger(values['target-op-level']) ? values['target-op-level'] : maxLevel)
    
    var currentSkillLevel = []
    if (values['current-skill-level']) {
        values['current-skill-level'].forEach(function (csl) {
            currentSkillLevel.push(1 <= csl && csl <= 10 ? csl : 1)
        })
        for (var i = 0, len = 3 - currentSkillLevel.length; i < len; ++i) {
            currentSkillLevel.push(1)
        }
    }
    else {
        currentSkillLevel = [1, 1, 1]
    }
    
    var targetSkillLevel = []
    if (values['target-skill-level']) {
        values['target-skill-level'].forEach(function (csl) {
            targetSkillLevel.push(1 <= csl && csl <= 10 ? csl : maxSkillLevel)
        })
        for (var i = 0, len = 3 - targetSkillLevel.length; i < len; ++i) {
            targetSkillLevel.push(maxSkillLevel)
        }
    }
    else {
        targetSkillLevel = [maxSkillLevel, maxSkillLevel, maxSkillLevel]
    }
    
    var html = ''
    
    html += `<div class="remove-op thumb rarity_${rarity}"><img alt=${db.op[opID].releaseOrder} src="./images/op/thumb/${db.op[opID].releaseOrder}.png"></div><div class="elite"><span>정예화</span><br><select class="current-elite">`
	
	for (var elite = 0; elite <= maxElite; ++elite) {
        html += `<option value="${elite}"`
        
        if (elite === currentElite) {
            html += ' selected'
        }
        
        html += `>${elite}단계</option>`
	}
    html += '</select><span> ▸ </span><select class="target-elite">'
    
	for (var elite = 0; elite <= maxElite; ++elite) {
        html += `<option value="${elite}"`
        
        if (elite === targetElite) {
            html += ' selected'
        }
        
        html += `>${elite}단계</option>`
	}
    html += '</select></div><div class="opLevel"><hr><button type="button" class="set-current-op-level-to-max-btn">MAX</button><span> 레벨 </span><button type="button" class="set-target-op-level-to-max-btn">MAX</button><br>'
    
    html += `<input type="text" class="current-op-level" value="${currentOpLevel}">`
    
    html += '<span> ▸ </span>'
    
    html += `<input type="text" class="target-op-level" value="${targetOpLevel}"></div><hr>`
    
    var maxNumOfSkills = getNumOfSkills(opID)
    
    if (maxNumOfSkills > 0) {
        html += '<span>스킬 레벨</span><br>'
        
        html += '<div class="skill">'
        
        
        for (var i = 1; i <= maxNumOfSkills; ++i) {
            if (i > 1) {
                html += '<br>'
            }
            
            html += `<span>${i}스킬 </span>`
            html += `<select class="current-skill-level" data-index="${i-1}">`
            
            for (var sklv = 1; sklv <= 10; ++sklv) {
                html += `<option value="${sklv}"`
                
                if (sklv === currentSkillLevel[i-1]) {
                    html += 'selected'
                }
                
                html += `>${sklv}</option>`
            }
            html += '</select>'
            
            html += '<span> ▸ </span>'
            html += `<select class="target-skill-level" data-index="${i-1}">`
            
            for (var sklv = 1; sklv <= 10; ++sklv) {
                html += `<option value="${sklv}"`
                
                if (sklv === targetSkillLevel[i-1]) {
                    html += 'selected'
                }
                
                html += `>${sklv}</option>`
            }
            html += '</select>'
        }
    }
    html += '</div></div>'
    
    if (asElement) {
        var elem = document.createElement('div')
        elem.classList.add('op')
        elem.setAttribute('name', `op_${opID}`)
        elem.innerHTML = html
        
        return elem
    }
    else {
        return `<div class="op" name="op_${opID}">` + html + '</div>'
    }
}

// 구 ID 체계를 신 ID 체계로 전환
var convertOldIDToNewID = function () {
    gtag('event', 'ID 체계 전환(버전 1에서 2로)', {
        'event_category': '오퍼레이터 육성 자원 계산기'
    })
    
    // 오퍼레이터 ID (ver.1 => ver.2) 매칭 딕셔너리
    var oldToNew = {"0":"LN02","1":"RL03","2":"LT77","3":"RE41","4":"LM04","5":"AZ01","6":"JC01","7":"AA01","8":"FO03","9":"FO01","10":"PL03","11":"SS02","12":"LM20","13":"SR02","14":"RL06","15":"LM05","16":"NM01","17":"RL02","18":"GG01","19":"R001","20":"VC03","21":"SK01","22":"RR01","23":"SR27","24":"R137","25":"BS01","26":"GG03","27":"SR01","28":"RB01","29":"AA02","30":"LM08","31":"R132","32":"SS01","33":"RL04","34":"RL01","35":"R106","36":"AA03","37":"LT01","38":"ST01","39":"R110","40":"ST03","41":"KZ03","42":"SR03","43":"JC06","44":"YD01","45":"SG01","46":"SW01","47":"LM16","48":"LM12","49":"R130","50":"R128","51":"RL05","52":"JC05","53":"PL05","54":"USS2","55":"LM15","56":"PL04","57":"LM19","58":"BS02","59":"FO02","60":"MN02","61":"VC05","62":"HT03","63":"PL02","64":"USS1","65":"SI01","66":"R119","67":"VC02","68":"US10","69":"R100","70":"IU04","71":"R123","72":"HK01","73":"VC04","74":"IU07","75":"R104","76":"MN03","77":"R107","78":"LT02","79":"BS03","80":"VC01","81":"ST02","82":"LM10","83":"R122","84":"KZ04","85":"RB02","86":"LM11","87":"AA04","88":"LN01","89":"IU05","90":"R124","91":"JC03","92":"USS3","93":"JC04","94":"R108","95":"SW02","96":"R105","97":"PA15","98":"PA42","99":"PA41","100":"PA62","101":"PA65","102":"PA43","103":"PA13","104":"PA44","105":"PA63","106":"PA12","107":"PA61","108":"PA14","109":"PA45","110":"PA64","111":"PA11","112":"LT05","113":"BS04","114":"R303","115":"A44","116":"A43","117":"A41","118":"A42","119":"RCX3","120":"RCX2"}

    var optotalKeys = Object.keys(localStorage).filter(key => key.indexOf('optotal_') >= 0)
    var tmp = '', oldKey = '', newKey = '', opid = ''
    for (var i = 0, len = optotalKeys.length; i < len; ++i) {
        newKey = optotalKeys[i].split('_')
        opid = newKey[1]
        newKey[1] = oldToNew[opid]
        
        // 매칭된다면, 새로운 ID로 변환
        if (newKey[1]) {
            newKey = newKey.join('_')
            
            oldKey = optotalKeys[i]
            
            // 데이터 복사
            tmp = localStorage.getItem(oldKey)
            localStorage.setItem(newKey, tmp)
            
            // 기존 데이터 삭제
            localStorage.removeItem(oldKey)
        }
        // 매칭되지 않는다면, 그대로 놔둠
        else {
            console.error(opid + ': 오퍼레이터 ID 체계 최신화 실패. 매칭되는 ID가 존재하지 않음.')
        }
    }

    // 변환을 모두 마쳤으므로, 다음부터는 변환하지 않아도 되도록 데이터 버전 저장
    localStorage.setItem('version_optotal_localStorage', JSON.stringify(db.idVersion.op))
}

const sleep = function (ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}
// 페이지 최초 로드시, 기존에 저장되어 있던 로컬스토리지 데이터가 존재한다면, 입력값 복원 후, 필요한 트리거 실행
const loadLocalStorage = function () {
    console.log('loadLocalStorage')
    
    // 구 ID 체계를 새로운 ID 체계로 최신화
    if (JSON.parse(localStorage.getItem('version_optotal_localStorage') || '1') < db.idVersion.op) {
        console.log('오퍼레이터 ID 체계 최신화 수행')
        convertOldIDToNewID()
    }

    var propList = ['current-elite', 'target-elite', 'current-op-level', 'target-op-level', 'current-skill-level', 'target-skill-level']
    
    var existingProps = {}
    existingProps.IDs = []
    
    // 존재하는 모든 오퍼레이터에 대해, 데이터가 존재하는지 확인
    for (var i = 0; i < db.op.keys.length; ++i) {
        var opID = db.op.keys[i]
        
        var prefix = 'optotal_' + opID + '_'
        existingProps[opID] = []
        
        // 데이터 존재여부, 존재한다면 어느 데이터가 존재하는지 검사.
        var dataExists = false
        for (var j = 0; j < propList.length; ++j) {
            var key = prefix + propList[j]
            if (localStorage.getItem(key) !== null) {
                existingProps[opID].push(propList[j])
                dataExists = true
            }
        }
        
        if (dataExists) {
            existingProps.IDs.push(opID)
        }
    }
    
    if (existingProps.IDs.length === 0) {
        document.getElementById('content-body').style.opacity = 1
        console.log('loadComplete')
        return
    }
    document.getElementById('selected-op-guide').style.display = 'none'
    
    // 레어도순 정렬, ID순 정렬, 출시순서순 정렬
    existingProps.IDs.sort(function (ID1, ID2) {
        if (Number(db.op[ID1].rarity) > Number(db.op[ID2].rarity)) return -1
        if (Number(db.op[ID1].rarity) < Number(db.op[ID2].rarity)) return 1
        
        ID1 = ID1.split('-')
        ID2 = ID2.split('-')
        
        if (ID1[0] < ID2[0]) return -1
        if (ID1[0] > ID2[0]) return 1
        
        if (ID1.length === 1) ID1.push(0)
        if (ID2.length === 1) ID2.push(0)
        
        if (Number(ID1[1]) < Number(ID2[1])) return -1
        return 1
    })
    
    var tt = Date.now()
    
    // 오퍼레이터를 복원하는 동안은, 결과를 갱신하지 않음.
    doNotRefreshResult = true
    
    // 오퍼레이터를 복원하고, 데이터가 존재하는 항목에 한해서 입력값도 복원함. 나머지 항목은 기본값 그대로.
    // 복원한 후, 트리거도 발동시킴.
    var measure = []
    
    // CLS를 줄이기 위해 임시 div element를 draw
    var html = ''
    for (var i = 0, len = existingProps.IDs.length; i < len; ++i) {
        html += `<div class="op" name="${existingProps.IDs[i]}" style="color:#bbb;text-align:center;"><pre>\n\n\n\nLoading...</pre></div>`
    }
    document.getElementById('selected-op').innerHTML = html
    
    // 화면 로드
    document.getElementById('content-body').style.opacity = 1
    
    setTimeout(loadData, 0)
    
    function loadData () {
        var html = ''
        
        for (var i = 0, len = existingProps.IDs.length; i < len; ++i) {
            
            var opID = existingProps.IDs[i]
            var prefix = 'optotal_' + opID + '_'
            
            // 오퍼레이터 폼 추가하기 전, 해당 오퍼레이터의 로컬스토리지 데이터 백업(기본값으로 덮어씌워지므로)
            var values = {
                keys: []
            }
            
            for (var j = 0, jlen = existingProps[opID].length; j < jlen; ++j) {
                var prop = existingProps[opID][j]
                var key = prefix + prop
                
                var val = JSON.parse(localStorage.getItem(key))
                
                values[prop] = val
                values.keys.push(prop)
            }
            
            // 오퍼레이터 폼 추가
            html += makeOpForm(opID, {values: values, asElement: false})
        }
        
        var selectedOp = document.getElementById('selected-op')
        selectedOp.innerHTML = html
        
        doNotCenter = true
        
        selectedOp.querySelectorAll('.op').forEach(function (elem) {
            addOpEventListener(elem, true)
        })
        
        // 결과를 갱신 가능하도록 설정을 되돌려놓고, 결과 갱신.
        doNotRefreshResult = false
        showResult()
        
        console.log('loadComplete')
    }
}

const removeAllInputData = function (event) {
    gtag('event', '모든 입력 데이터 삭제: 버튼 클릭', {
        'event_category': '오퍼레이터 육성 자원 계산기'
    })
    
    if (confirm('주의: 이 작업은 되돌릴 수 없습니다.\n정말 이 서비스의 모든 데이터를 삭제하시겠습니까?')) {
        Object.keys(localStorage)
            .filter(key => key.indexOf('optotal_') >= 0)
            .forEach(key => localStorage.removeItem(key))
        location.reload();
    }
    else {
        gtag('event', '모든 입력 데이터 삭제: 취소', {
            'event_category': '오퍼레이터 육성 자원 계산기'
        })
        alert('데이터 삭제가 취소되었습니다.')
    }
}

var triggerEvent = function (elem, eventName, info = null) {
    if (info !== null) {
        elem.dispatchEvent(new CustomEvent(eventName, {detail: info}))
    }
    else {
        elem.dispatchEvent(new CustomEvent(eventName))
    }
}

/* =============== op event handlers =============== */
var getMaxElite = function(rarity){ return [0,0,1,2,2,2][rarity-1]}
var getNumOfSkills = function (opID, elite = null) {
    var rarity = db.op[opID].rarity
    
    if (elite === null) elite = getMaxElite(rarity)
    
    // 스킬 항목이 종속된 어레인지 버전이라면, 원본 스킬 정보를 가져옴
    if (db.op[opID].skill === null) {
        var originalID = opID.split('-')[0]
        if (originalID === opID || db.op[originalID].skill === null) {
            console.error('다음 원본 오퍼레이터의 skill 값이 null임:', opID)
            return 0
        }
        opID = originalID
    }
    
    var learnableSkills = 0
    // 마스터리가 가능할 경우 (즉, 2정예 이상 가능할 경우) 마스터리 정보로부터 스킬 개수 취득 가능
    if (getMaxElite(rarity) >= 2) {
        learnableSkills = db.op[opID].skill.mastery.length
    }
    // 마스터리가 불가능할 경우 기본 공식에 따라 스킬 개수 취득
    else {
        learnableSkills = [0,0,1,2,2,3][rarity-1]
    }
    
    var ret = [1,2,3][elite]
    if (ret === undefined) {
        console.error('elite 값에 문제 있음:', elite)
        ret = [1,2,3][getMaxElite(rarity)]
    }
    
    if (ret > learnableSkills) { ret = learnableSkills }
    
    return ret
}
var getMaxSkillLevel = function(elite){ return [4,7,10][elite]}

var opFormRecalcHandler = function (event) {
    // 원본에 종속되는 속성이 있는 어레인지 버전인지 확인
    var opID = this.getAttribute('name').split('_')[1]
    var originalID = opID.split('-')[0]
    var isOriginal = (opID === originalID)
    
    // 자신을 포함하여, 관련된 원본/어레인지의 속성값 모두 저장
    var similarOps = {}
    document.querySelectorAll(`#selected-op [name^="op_${originalID}"]`).forEach(function (elm) {
        let id = elm.getAttribute('name').split('_')[1]
        
        similarOps[id] = {}
        
        similarOps[id].form = elm
        similarOps[id].currentEliteElem = elm.querySelectorAll('.current-elite')[0]
        similarOps[id].targetEliteElem = elm.querySelectorAll('.target-elite')[0]
        similarOps[id].currentLevelElem = elm.querySelectorAll('.current-op-level')[0]
        similarOps[id].targetLevelElem = elm.querySelectorAll('.target-op-level')[0]
        similarOps[id].currentSkillLevelElems = elm.querySelectorAll('.current-skill-level')
        similarOps[id].targetSkillLevelElems = elm.querySelectorAll('.target-skill-level')
        
        similarOps[id].currentElite = Number(elm.querySelector('.current-elite').value)
        similarOps[id].targetElite = Number(elm.querySelector('.target-elite').value)
        
        similarOps[id].currentLevel = Number(elm.querySelector('.current-op-level').value)
        similarOps[id].targetLevel = Number(elm.querySelector('.target-op-level').value)
        
        similarOps[id].currentSkillLevels = Array.from(elm.querySelectorAll('.current-skill-level'), sklvElm => Number(sklvElm.value))
        similarOps[id].targetSkillLevels = Array.from(elm.querySelectorAll('.target-skill-level'), sklvElm => Number(sklvElm.value))
    })
    
    var isNull = {}
    if (!isOriginal) {
        // 원본에 종속되는 속성의 목록 생성
        isNull.elite = (db.op[opID].elite === null) // elite가 종속되었다면, 레벨 또한 종속되었다고 볼 수 있음.
        isNull.skill = (db.op[opID].skill === null)
    }
    
    // 어레인지 버전이라면, isNull에 등록된 속성들이 원본에게 종속되도록 설정.
    // 어레인지 버전이 아니라면, 가만히 놔둬도 됨.
    if (isNull.elite) {
        // 깊은 복사
        similarOps[opID].currentElite = similarOps[originalID].currentElite
        similarOps[opID].targetElite = similarOps[originalID].targetElite
        similarOps[opID].currentLevel = similarOps[originalID].currentLevel
        similarOps[opID].targetLevel = similarOps[originalID].targetLevel
        
        // 정예화, 레벨의 사용자 입력이 불가하도록, 그리고 계산 대상에서 제외되도록 비활성화
        similarOps[opID].currentEliteElem.disabled = true
        similarOps[opID].targetEliteElem.disabled = true
        similarOps[opID].currentLevelElem.disabled = true
        similarOps[opID].targetLevelElem.disabled = true
        this.querySelectorAll('.set-current-op-level-to-max-btn, .set-target-op-level-to-max-btn').forEach(elm => elm.disabled = true)
        
        // 정예화, 레벨 입력란이 사용자에게 보이지 않도록 스타일 설정
        this.querySelectorAll('.elite, .opLevel').forEach(elm => elm.style.opacity = 0)
    }
    
    if (isNull.skill) {
        similarOps[opID].currentSkillLevels = [...similarOps[originalID].currentSkillLevels]
        similarOps[opID].targetSkillLevels = [...similarOps[originalID].targetSkillLevels]
        
        // 스킬레벨의 사용자 입력이 불가하도록, 그리고 계산 대상에서 제외되도록 비활성화
        similarOps[opID].currentSkillLevelElems.forEach(function(elm) {
            elm.disabled = true
        })
        similarOps[opID].targetSkillLevelElems.forEach(function(elm) {
            elm.disabled = true
        })
        
        // 스킬레벨 입력란이 사용자에게 보이지 않도록 설정
        this.querySelector('.skill').style.opacity = 0
    }
    
    // 현재 아미야의 경우, 캐스터/가드 스킬레벨이 종속관계는 아니지만, 7레벨까지 "공유"되는 상황임.
    // 마치 새로운 4, 5스킬이 생긴 것처럼.
    // 해당 사항의 처리는, 스킬레벨 유효성 검사시 원본과 다른 어레인지까지 고려함으로써 수행하겠음.
    
    var currentInputValue = [
        similarOps[opID].currentElite, similarOps[opID].targetElite,
        similarOps[opID].currentLevel, similarOps[opID].targetLevel,
        ...similarOps[opID].currentSkillLevels, ...similarOps[opID].targetSkillLevels
    ]
    
    var prevInputValue = this.dataset.inputValue
    if (prevInputValue) {
        prevInputValue = prevInputValue.split(',').map(Number)
    }
    else {
        prevInputValue = []
    }
    
    // 값이 변하지 않았다면 아무것도 하지 않고 끝냄
    var isDiff = false
    for (var i = 0, len = currentInputValue.length; i < len; ++i) {
        if (currentInputValue[i] !== prevInputValue[i]) {
            isDiff = true
            break
        }
    }
    if (!isDiff) {
        console.log(opID, 'nodiff: return')
        return
    }
    
    
    var rarity = Number(db.op[opID].rarity)
    
    var maxNumOfSkills = getNumOfSkills(opID)
    
    // 입력받은 event 정보에 따라서 어떤 구성요소를 검증할지 선택
    var from = null
    if (!event.detail || !event.detail.from) {
        // event.detail은 read only라서 수정 불가.
        // 따라서 event.detail을 수정하지 않고, 아예 다른 값으로 대체하여 from을 설정한다.
        from = {
            type: 'all'
        }
    }
    else {
        from = event.detail.from
    }
    
    if (from.type === 'all') {
        var checkElite = true,
            checkLevel = true,
            checkSkill = true
    }
    else {
        if (from.type === 'elite') {
            var checkElite = true,
                checkLevel = true,
                checkSkill = true
        }
        else if (from.type === 'level') {
            var checkElite = false,
                checkLevel = true,
                checkSkill = false
        }
        else if (from.type === 'skill') {
            var checkElite = false,
                checkLevel = false,
                checkSkill = true
            
            if (!Number.isInteger(from.index) || from.index < 0 || from.index >= 3) {
                console.error('인덱스 오류:', from.index)
                return
            }
        }
        else {
            console.error('타입 오류:', from.type)
            return
        }
        
        if (from.position !== 'current' && from.position !== 'target') {
            console.error('포지션 오류:', from.position)
            return
        }
    }
    
    // 스킬이 원본에 종속되는 경우, 스킬레벨 조정을 할 필요가 없음. 스킬레벨은 다른 속성에 영향을 끼치지 않으니까.
    // 따라서, 스킬이 원본에 종속되는 경우 스킬레벨을 어떻게 조정할지 고민할 필요가 없다.
    if (isNull.skill) {
        checkSkill = false
    }
    
    // 정예화 체크
    // => 스킬레벨 체크
    // => 레벨 체크

    // 재설정중에는 DOM을 조작하지 않고 데이터만 조작
    // 재설정을 끝내면서 한꺼번에 DOM을 조작
    
    if (checkElite) {
        // 1. 정예화 확정
        // 최대 정예화 제한
        let maxElite = getMaxElite(rarity)

        if (similarOps[opID].currentElite > maxElite) {
            similarOps[opID].currentElite = maxElite
        }
        if (similarOps[opID].targetElite > maxElite) {
            similarOps[opID].targetElite = maxElite
        }

        // 목표 정예화는 현재 정예화 이상이어야 한다
        if (similarOps[opID].targetElite < similarOps[opID].currentElite) {
            similarOps[opID].targetElite = similarOps[opID].currentElite
        }
        
        // 자신이 원본일 때, 원본에게 정예화 단계가 종속된 어레인지들의 값도 자신을 따라오도록 변경.
        if (isOriginal) {
            for (let id in similarOps) {
                if (similarOps[id].currentEliteElem.disabled == true) {
                    similarOps[id].currentElite = similarOps[originalID].currentElite
                }
                if (similarOps[id].targetEliteElem.disabled == true) {
                    similarOps[id].targetElite = similarOps[originalID].targetElite
                }
            }
        }
        // 정예화 확정 완료.
    }

    if (checkSkill) {
        // 2. 자신의 스킬레벨 확정
        
        // 항상 현재 값이 우선.
        // 현재 스킬레벨부터 시작.

        // 최대 스킬레벨을 넘는 건 깎아내린다.
        for (let id in similarOps) {
            let currentMaxSkillLevel = getMaxSkillLevel(similarOps[id].currentElite),
                maxNumOfSkills = getNumOfSkills(id)
            
            for (let i = 0; i < maxNumOfSkills; ++i) {
                if (similarOps[id].currentSkillLevels[i] > currentMaxSkillLevel) {
                    similarOps[id].currentSkillLevels[i] = currentMaxSkillLevel
                }
            }
        }
        
        // 현재 스킬레벨이 바뀌었으면 바뀐 값을 가장 우선하여 변경한다.
        if (from.type === 'skill' && from.position === 'current') {
            let currentPriorValue = similarOps[opID].currentSkillLevels[from.index]
            
            // 기본적으로 스킬레벨은 7레벨 이하에서 공유된다.
            // 아미야 기준으로, 원본/어레인지 모두 스킬레벨이 7레벨 이하에서 공유된다.
            // 따라서 원본/어레인지 중 하나의 스킬레벨이 변경된 경우, 나머지 원본/어레인지의 스킬레벨도 7레벨 이하에서 공유되도록 한다.
            if (currentPriorValue < 7) {
                for (let id in similarOps) {
                    similarOps[id].currentSkillLevels = similarOps[id].currentSkillLevels.map(val => currentPriorValue)
                }
            }
            else {
                for (let id in similarOps) {
                    similarOps[id].currentSkillLevels = similarOps[id].currentSkillLevels.map(val => (val < 7) ? 7 : val)
                }
            }
        }
        else {
            // 아니면, 활성화된 스킬 중에서 공통 레벨(가장 높은 레벨, 7이하) 구하고
            let currentCommon = -Infinity
            
            for (let id in similarOps) {
                let numOfCurrentSkills = getNumOfSkills(id, similarOps[id].currentElite)
                
                for (let i = 0; i < numOfCurrentSkills; ++i) {
                    currentCommon = (similarOps[id].currentSkillLevels[i] > currentCommon) ? similarOps[id].currentSkillLevels[i] : currentCommon
                    currentCommon = (currentCommon > 7) ? 7 : currentCommon
                    
                    if (currentCommon === 7) break
                }
                
                if (currentCommon === 7) break
            }
            
            // 공통 레벨보다 작은 스킬을 모두 끌어올린다.
            for (let id in similarOps) {
                similarOps[id].currentSkillLevels = similarOps[id].currentSkillLevels.map(val => (val < currentCommon) ? currentCommon : val)
            }
        }
        console.log(JSON.parse(JSON.stringify(similarOps)))

        // 이걸로 현재 스킬레벨 확정됨.

        // 이제 목표 스킬레벨 차례.

        // 현재 스킬레벨보다 낮은 것들을 끌어올리고, 최대 스킬레벨을 넘는 건 깎아내린다.
        for (let id in similarOps) {
            let targetMaxSkillLevel = getMaxSkillLevel(similarOps[id].targetElite),
                maxNumOfSkills = getNumOfSkills(id)
            
            for (let i = 0; i < maxNumOfSkills; ++i) {
                if (similarOps[id].targetSkillLevels[i] < similarOps[id].currentSkillLevels[i]) {
                    similarOps[id].targetSkillLevels[i] = similarOps[id].currentSkillLevels[i]
                }
                else if (similarOps[id].targetSkillLevels[i] > targetMaxSkillLevel) {
                    similarOps[id].targetSkillLevels[i] = targetMaxSkillLevel
                }
            }
        }

        // 목표 스킬레벨이 바뀌었으면 바뀐 값을 가장 우선
        if (from.type === 'skill' && from.position === 'target') {
            let targetPriorValue = similarOps[opID].targetSkillLevels[from.index]
            
            if (targetPriorValue < 7) {
                for (let id in similarOps) {
                    similarOps[id].targetSkillLevels = similarOps[id].targetSkillLevels.map(val => targetPriorValue)
                }
            }
            else {
                for (let id in similarOps) {
                    similarOps[id].targetSkillLevels = similarOps[id].targetSkillLevels.map(val => (val < 7) ? 7 : val)
                }
            }
        }
        else {
            // 아니라면 활성화된 스킬 중에서 공통 레벨을 구하고,
            let targetCommon = -Infinity
            
            for (let id in similarOps) {
                let numOfTargetSkills = getNumOfSkills(id, similarOps[id].targetElite)
                
                for (let i = 0; i < numOfTargetSkills; ++i) {
                    targetCommon = (similarOps[id].targetSkillLevels[i] > targetCommon) ? similarOps[id].targetSkillLevels[i] : targetCommon
                    
                    targetCommon = (targetCommon > 7) ? 7 : targetCommon
                    
                    if (targetCommon === 7) break
                }
                
                if (targetCommon === 7) break
            }
            
            // 공통 레벨보다 작은 스킬을 모두 끌어올린다.
            for (let id in similarOps) {
                similarOps[id].targetSkillLevels = similarOps[id].targetSkillLevels.map(val => (val < targetCommon) ? targetCommon : val)
            }
        }
        // 이걸로 목표 스킬레벨 확정됨.
    }

    if (checkLevel) {
        // 마지막으로 레벨
        // 최소치, 최대치를 넘기지 않도록 제한
        for (let id in similarOps) {
            let currentMaxLevel = getMaxLevel(similarOps[id].currentElite, rarity)
            
            if (similarOps[id].currentLevel > currentMaxLevel) {
                similarOps[id].currentLevel = currentMaxLevel
            }
            if (similarOps[id].currentLevel < 1) {
                similarOps[id].currentLevel = 1
            }

            let targetMaxLevel = getMaxLevel(similarOps[id].targetElite, rarity)
            
            if (similarOps[id].targetLevel > targetMaxLevel) {
                similarOps[id].targetLevel = targetMaxLevel
            }
            if (similarOps[id].currentElite === similarOps[id].targetElite
                && similarOps[id].targetLevel < similarOps[id].currentLevel) {
                
                similarOps[id].targetLevel = similarOps[id].currentLevel
            }
            else if (similarOps[id].targetLevel < 1) {
                similarOps[id].targetLevel = 1
            }
        }
    }

    // 모든 데이터 설정이 끝남.

    // 이제, 유저를 위한 DOM 조작 시작.
    // 자신을 포함하여, 관련된 모든 원본/어레인지에 대해 DOM 조작
    
    // 정예화
    if (checkElite) {
        let options = null
        
        for (let id in similarOps) {
            let maxElite = getMaxElite(db.op[id].rarity)
            
            // 현재 정예화: 자신의 레어도 기준 최대 정예화까지만 허용
            options = similarOps[id].currentEliteElem.options
            
            for (let i = 0, len = maxElite; i < len; ++i) {
                if (i > maxElite)
                    options[i].disabled = true
                else
                    options[i].disabled = false
            }
            similarOps[id].currentEliteElem.value = similarOps[id].currentElite
            
            // 목표 정예화: 현재 정예화 이상이어야 하며, 최대 정예화까지만 허용
            options = similarOps[id].targetEliteElem.options
            
            for (let i = 0, len = options.length; i < len; ++i) {
                if (i < similarOps[id].currentElite || i > maxElite) {
                    options[i].disabled = true
                }
                else {
                    options[i].disabled = false
                }
            }
            similarOps[id].targetEliteElem.value = similarOps[id].targetElite
        }
    }
    
    
    // 스킬레벨
    if (checkSkill) {
        for (let id in similarOps) {
            let maxNumOfSkills = getNumOfSkills(id),
                numOfCurrentSkills = getNumOfSkills(id, similarOps[id].currentElite),
                numOfTargetSkills = getNumOfSkills(id, similarOps[id].targetElite),
                
                currentMaxSkillLevel = getMaxSkillLevel(similarOps[id].currentElite),
                targetMaxSkillLevel = getMaxSkillLevel(similarOps[id].targetElite)
            
            // 현재 스킬
            for (let i = 0; i < numOfCurrentSkills; ++i) {
                similarOps[id].currentSkillLevelElems[i].disabled = false
                
                let options = similarOps[id].currentSkillLevelElems[i].options
                
                for (let j = 0, len = options.length; j < len; ++j) {
                    if (j >= currentMaxSkillLevel)
                        options[j].disabled = true
                    else
                        options[j].disabled = false
                }
                
                similarOps[id].currentSkillLevelElems[i].value = similarOps[id].currentSkillLevels[i]
            }
            
            for (let i = numOfCurrentSkills; i < maxNumOfSkills; ++i) {
                similarOps[id].currentSkillLevelElems[i].disabled = true
                similarOps[id].currentSkillLevelElems[i].value = similarOps[id].currentSkillLevels[i]
            }
            
            // 목표 스킬
            for (let i = 0; i < numOfTargetSkills; ++i) {
                similarOps[id].targetSkillLevelElems[i].disabled = false
                
                let options = similarOps[id].targetSkillLevelElems[i].options
                
                for (let j = 0, len = options.length, lo = similarOps[id].currentSkillLevels[i] - 1; j < len; ++j) {
                    if (j < lo || j >= targetMaxSkillLevel)
                        options[j].disabled = true
                    else
                        options[j].disabled = false
                }
                
                similarOps[id].targetSkillLevelElems[i].value = similarOps[id].targetSkillLevels[i]
            }
            
            for (let i = numOfTargetSkills; i < maxNumOfSkills; ++i) {
                similarOps[id].targetSkillLevelElems[i].disabled = true
                similarOps[id].targetSkillLevelElems[i].value = similarOps[id].targetSkillLevels[i]
            }
        }
    }

    // 레벨
    if (checkLevel) {
        for (let id in similarOps) {
            similarOps[id].currentLevelElem.value = similarOps[id].currentLevel
            similarOps[id].targetLevelElem.value = similarOps[id].targetLevel
        }
    }
    
    // dataset와 localStorage에 새로운 값 저장
    for (let id in similarOps) {
        similarOps[id].form.dataset.inputValue = [
            similarOps[id].currentElite, similarOps[id].targetElite,
            similarOps[id].currentLevel, similarOps[id].targetLevel,
            ...similarOps[id].currentSkillLevels, ...similarOps[id].targetSkillLevels
        ].join(',')
        
        let prefix = 'optotal_' + id + '_'
        
        localStorage.setItem(prefix + 'current-elite',      JSON.stringify(similarOps[id].currentElite))
        localStorage.setItem(prefix + 'current-op-level',   JSON.stringify(similarOps[id].currentLevel))
        localStorage.setItem(prefix + 'current-skill-level',JSON.stringify(similarOps[id].currentSkillLevels))
        
        localStorage.setItem(prefix + 'target-elite',       JSON.stringify(similarOps[id].targetElite))
        localStorage.setItem(prefix + 'target-op-level',    JSON.stringify(similarOps[id].targetLevel))
        localStorage.setItem(prefix + 'target-skill-level', JSON.stringify(similarOps[id].targetSkillLevels))
    }
    
    // 원본이라면, 모든 어레인지를 새로고침해야 함.
    if (isOriginal) {
        var variations = document.querySelectorAll(`#selected-op [name^="op_${opID}-"]`) // 원본을 제외한, 원본의 어레인지를 모두 선택
        
        for (var i = 0; i < variations.length; ++i) {
            triggerEvent(variations[i], 'recalc')
        }
    }
    
    // 재계산 수행
    showResult()
}

var removeOpMousedownHandler = function () {
    var originalID = this.closest('.op').getAttribute('name').split('_')[1].split('-')[0]
    document.querySelectorAll(`#selected-op [name^="op_${originalID}"]`).forEach(elm => elm.style.opacity = 0.4)
}

var removeOpMouseoverHandler = function () {
    var originalID = this.closest('.op').getAttribute('name').split('_')[1].split('-')[0]
    document.querySelectorAll(`#selected-op [name^="op_${originalID}"]`).forEach(elm => elm.style.opacity = 0.7)
}

var removeOpMouseoutHandler = function () {
    var originalID = this.closest('.op').getAttribute('name').split('_')[1].split('-')[0]
    document.querySelectorAll(`#selected-op [name^="op_${originalID}"]`).forEach(elm => elm.style.opacity = 1)
}

var removeOpClickHandler = function () {
    gtag('event', '오퍼레이터 삭제: 버튼 클릭', {
        'event_category': '오퍼레이터 육성 자원 계산기'
    })
    
    var form = this.closest('.op')
    
    // 오퍼레이터 ID 취득
    var opID = this.closest('.op').getAttribute('name').split('_')[1]
    var targetIDs = getAllIDs(opID)
    
    // 오퍼레이터 폼을 삭제
    for (var i = 0; i < targetIDs.length; ++i) {
        document.querySelector(`#selected-op [name="op_${targetIDs[i]}"]`).remove()
        
        // 로컬스토리지에서도 오퍼레이터를 삭제
        var prefix = 'optotal_' + targetIDs[i] + '_'
        var props = ['current-elite', 'target-elite', 'current-op-level', 'target-op-level', 'current-skill-level', 'target-skill-level']
        for (var j = 0; j < props.length; ++j) {
            localStorage.removeItem(prefix + props[j])
        }
    }
    
    // 남은 오퍼레이터가 없다면, 선택안내문구를 표시
    if (document.querySelector('div[name*="op_"].op') === null) {
        document.getElementById('selected-op-guide').style.display = 'block'
    }
    
    // 결과를 재계산
    showResult()
}

var setCurrentOpLevelToMaxHandler = function () {
    gtag('event', '현재 레벨 최대 설정', {
        'event_category': '오퍼레이터 육성 자원 계산기'
    })
    
    if (this.disabled) { return }
    
    var form = this.closest('.op')
    var opID = form.getAttribute('name').split('_')[1]
    
    var currentOpLevel = form.querySelector('.current-op-level')
    var oriVal = {}
    oriVal['current-op-level'] = Number(currentOpLevel.value)
    
    // 비정상적인 ID라면 작업 중지
    if (!(opID in db.op)) {
        console.error('에러: 취득한 오퍼레이터 아이디(' + opID + ')를 DB에서 찾을 수 없음')
        return
    }
    
    // 최대 레벨로 설정
    var currentElite = Number(form.querySelector('.current-elite').value)
    var rarity = Number(db.op[opID].rarity)
    var maxLevel = getMaxLevel(currentElite, rarity)
    currentOpLevel.value = maxLevel
    
    triggerEvent(form, 'recalc', {
        from: {
            type: 'level',
            position: 'current'
        }
    })
}

var setTargetOpLevelToMaxHandler = function () {
    gtag('event', '목표 레벨 최대 설정', {
        'event_category': '오퍼레이터 육성 자원 계산기'
    })
    
    if (this.disabled) { return }
    
    var form = this.closest('.op')
    var opID = form.getAttribute('name').split('_')[1]
    
    var targetOpLevel = form.querySelector('.target-op-level')
    var oriVal = {}
    oriVal['target-op-level'] = Number(targetOpLevel.value)
    
    // 비정상적인 ID라면 작업 중지
    if (!(opID in db.op)) {
        console.error('에러: 취득한 오퍼레이터 아이디(' + opID + ')를 DB에서 찾을 수 없음')
        return
    }
    
    // 최대 레벨로 설정
    var targetElite = Number(form.querySelector('.target-elite').value)
    var rarity = Number(db.op[opID].rarity)
    var maxLevel = getMaxLevel(targetElite, rarity)
    targetOpLevel.value = maxLevel
    
    triggerEvent(form, 'recalc', {
        from: {
            type: 'level',
            position: 'target'
        }
    })
}

var currentEliteChangeHandler = function () {
    if (this.disabled) { return }
    
    triggerEvent(this.closest('.op'), 'recalc', {
        from: {
            type: 'elite',
            position: 'current'
        }
    })
}

var targetEliteChangeHandler = function () {
    if (this.disabled) { return }
    
    triggerEvent(this.closest('.op'), 'recalc', {
        from: {
            type: 'elite',
            position: 'target'
        }
    })
}

var currentOpLevelChangeHandler = function () {
    if (this.disabled) { return }
    
    triggerEvent(this.closest('.op'), 'recalc', {
        from: {
            type: 'level',
            position: 'current'
        }
    })
}

var targetOpLevelChangeHandler = function () {
    if (this.disabled) { return }
    
    triggerEvent(this.closest('.op'), 'recalc', {
        from: {
            type: 'level',
            position: 'target'
        }
    })
}

var currentSkillLevelChangeHandler = function (event) {
    if (this.disabled) { return }
    
    triggerEvent(this.closest('.op'), 'recalc', {
        from: {
            type: 'skill',
            position: 'current',
            index: Number(event.target.dataset.index)
        }
    })
}

var targetSkillLevelChangeHandler = function () {
    if (this.disabled) { return }
    
    triggerEvent(this.closest('.op'), 'recalc', {
        from: {
            type: 'skill',
            position: 'target',
            index: Number(event.target.dataset.index)
        }
    })
}

/* =========================================== */
// addOpEventListener 함수는 document상에 존재하는 element를 인수로 제공받아야만 함.
const addOpEventListener = function (opForm, doTrigger = false) {
    /* 이벤트 리스너 추가 */
    opForm.addEventListener('recalc', opFormRecalcHandler)
    
    // 지우기 버튼
    // 아직 클릭되진 않았으나, 마우스가 눌린 상태라면 투명도 애니메이션
    opForm.querySelector('.remove-op').addEventListener('mousedown', removeOpMousedownHandler)
    opForm.querySelector('.remove-op').addEventListener('mouseover', removeOpMouseoverHandler)
    opForm.querySelector('.remove-op').addEventListener('mouseout', removeOpMouseoutHandler)
    // 클릭되면 지움
    opForm.querySelector('.remove-op').addEventListener('click', removeOpClickHandler)
    
    // 레벨 최대 설정 버튼
    // 현재 레벨을 최대로 설정
    opForm.querySelector('.set-current-op-level-to-max-btn').addEventListener('click', setCurrentOpLevelToMaxHandler)
    // 목표 레벨을 최대로 설정
    opForm.querySelector('.set-target-op-level-to-max-btn').addEventListener('click', setTargetOpLevelToMaxHandler)
    
    // 정예화 단계 변경시
    // 현재 정예화 단계
    opForm.querySelector('.current-elite').addEventListener('change', currentEliteChangeHandler)
    // 목표 정예화 단계 변경시
    opForm.querySelector('.target-elite').addEventListener('change', targetEliteChangeHandler)
    
    
    // 오퍼레이터 레벨 변경시
    // 현재 레벨 변경시
    opForm.querySelector('.current-op-level').addEventListener('change', currentOpLevelChangeHandler)
    // 목표 레벨 변경시
    opForm.querySelector('.target-op-level').addEventListener('change', targetOpLevelChangeHandler)
    
    // 스킬레벨 변경시
    // 현재스킬레벨 변경시
    opForm.querySelectorAll('.current-skill-level').forEach(function (elem) {
        elem.addEventListener('change', currentSkillLevelChangeHandler)
    })
    // 목표스킬레벨 변경시
    opForm.querySelectorAll('.target-skill-level').forEach(function (elem) {
        elem.addEventListener('change', targetSkillLevelChangeHandler)
    })
    
    if (doTrigger) {
        triggerEvent(opForm, 'recalc', {
            from: {
                type: 'all',
            }
        })
    }
}
// 오퍼레이터 폼을 생성한 후, 각종 리스너를 추가하고, 곧바로 필요한 트리거를 실행하고, 완성된 DOM 객체를 반환
// val이 빈 오브젝트가 아니라면 주어진 값으로 설정. 단, 유효하지 않은 값이라면 정정될 것임.



var searchingCondition = {
	name: '',
	rarityArray: [],
	tagCode: 0
}

const getTagCodeByKRTagName = function (name) {
	for (var i = 0; i < db.tag.keys.length; ++i) {
		if (db.tag[db.tag.keys[i]].name.kr == name) {
			return Number(db.tag[db.tag.keys[i]].tagCode)
		}
	}
}

const showSearchResult = function () {
	// 검색 조건 정렬
	searchingCondition.rarityArray.sort(function (a, b) {
		if (a > b) {
			return -1
		}
		else {
			return 1
		}
	})
	
	var result = searchOp(searchingCondition.name, searchingCondition.rarityArray, searchingCondition.tagCode)
	var opnameArray = []
    
	for (var i = 0, len = result.keys.length, key = ''; i < len; ++i) {
        key = result.keys[i]
        
		opnameArray.push([result[key].name.kr, key])
	}
    
    opnameArray.sort(function (a, b) {
        return a[0].localeCompare(b[0])
    })
	
	var form = ''
	
	for (var i = 0; i < opnameArray.length; ++i) {
		form	+=	'<div class="search-result-op" name="' + 'op_' + opnameArray[i][1] + '">'
				+	'<img src="./images/op/thumb/' + db.op[opnameArray[i][1]].releaseOrder + '.png">'
				+	'<div><span>' + opnameArray[i][0] + '</span></div>' // …
				+	'</div>'
	}
	
	if (form == '') {
		form = '<p style="font-size: 0.5em; text-align: center">검색 결과가 존재하지 않습니다.</p>'
	}
	
	document.querySelector('.modal-footer>.search-result').innerHTML = form
	
	// 이벤트 리스너 추가
	document.querySelectorAll('.search-result-op').forEach(function (elem) {
        elem.addEventListener('click', function () {
            // ID를 추출해서, 원본과 어레인지를 모두 추가.
            var opID = this.getAttribute('name').split('_')[1]
            var originalID = opID.split('-')[0]
            var targetIDs = getAllIDs(opID)
            
            for (var i = 0; i < targetIDs.length; ++i) {
                console.log(targetIDs[i], '추가')
                if (`optotal_${targetIDs[i]}_current-elite` in localStorage) {
                    console.error(opID + ': 이미 추가된 오퍼레이터')
                    continue
                }
                
                var newForm = makeOpForm(targetIDs[i], {values: {}, asElement: true})
                
                // 오퍼레이터 입력폼 추가
                document.getElementById('selected-op').appendChild(newForm)
                
                // 이벤트 리스너 추가 및 트리거 작동(스킬레벨한도나 활성화스킬갯수 등 조정)
                addOpEventListener(newForm, true)
                
                // 선택안내문구가 표시되고 있었다면, 비표시 설정
                document.getElementById('selected-op-guide').style.display = 'none'
                
                gtag('event', '오퍼레이터 추가', {
                    'event_category': '오퍼레이터 육성 자원 계산기'
                })
            }
            
            // 추가했으면 원본과 어레인지를 모두 결과창에서 삭제
            var removalTargets = document.querySelectorAll('.search-result-op[name^="op_' + originalID + '"]')
            for (var i = 0; i < removalTargets.length; ++i) {
                removalTargets[i].remove()
            }
            
            if(document.querySelectorAll('.modal-footer>.search-result>.search-result-op').length === 0) {
                document.querySelector('.modal-footer>.search-result').innerHTML = '<p style="font-size: 0.5em; text-align: center">검색 결과가 존재하지 않습니다.</p>'
            }
        })
    })
    
    // 글자 크기 조정
    document.querySelectorAll('.search-result-op div').forEach(function (elem) {
        $(elem).textfill()
    })
};

(function($) {
    $.fn.textfill = function(maxFontSize) {
        maxFontSize = parseInt(maxFontSize, 10);
        return this.each(function(){
            var ourText = $("span", this);
            function resizefont(){
                var parent = ourText.parent(),
                maxHeight = parent.height(),
                maxWidth = parent.width(),
                fontSize = parseInt(ourText.css("font-size"), 10),
                multiplier = maxWidth/ourText.width(),
                newSize = (fontSize*(multiplier-0.1)); // (multiplier-0.1)
                
                multiplier = maxHeight/ourText.height();
                maxFontSize = (fontSize*(multiplier-0.1)); // (multiplier-0.1)
                
                ourText.css("fontSize", maxFontSize > 0 && newSize > maxFontSize ? maxFontSize : newSize );
            }
            $(window).resize(function(){
                if (document.querySelector('.modal').style.display === 'block') {
                    resizefont();
                }
            });
            resizefont();
        });
    };
})(jQuery);

/*
const textfill = function (elem) { // function (elem, maxFontSize) {
    //maxFontSize = parseInt(maxFontSize, 10);
    var ourText = elem.querySelector('span');
    function resizefont () {
        var parent = ourText.parentElement,
        maxHeight = parent.clientHeight,
        maxWidth = parent.clientWidth,
        fontSize = parseInt(ourText.style.fontSize, 10),
        multiplier = maxWidth / ourText.clientWidth,
        newSize = (fontSize * multiplier); // (multiplier-0.1)
        
        multiplier = maxHeight / ourText.clientHeight;
        maxFontSize = (fontSize * multiplier); // (multiplier-0.1)
        
        ourText.style.fontSize = (maxFontSize > 0 && newSize > maxFontSize ? maxFontSize : newSize);
    }
    window.addEventListener('resize', function () {
        if (document.querySelector('.modal').style.display === 'block') {
            resizefont();
        }
    });
    resizefont();
};
*/


/* 오퍼레이터 검색 */
/* 이름 배열, 레어도 배열, 클래스 태그코드 */
const searchOp = function (name, rarityArray, tagCode) {
    name = name.replace(/(\s*)/g, '').toLowerCase()
    
    var searchByName = name.length > 0,
        searchByRarity = rarityArray.length > 0,
        searchByTagCode = tagCode != 0
    
    if (!(searchByName || searchByRarity || searchByTagCode)) {
        return {keys: []}
    }
    
    var searchPool = {}
	// 깊은 복사
    var localStorageKeys = Object.keys(localStorage).filter(key => key.indexOf('optotal_') === 0)
    for (var i = 0, len = db.op.keys.length, key = '', str = ''; i < len; ++i) {
        key = db.op.keys[i]
        
        // 이미 추가된 오퍼레이터는 건너뜀
        str = 'optotal_' + key
        for (var j = 0, jlen = localStorageKeys.length; j < jlen; ++j) {
            if (localStorageKeys[j].indexOf(str) === 0) {
                break
            }
        }
        if (j < jlen) {
            continue
        }
        
        searchPool[key] = {}
        searchPool[key].rarity = db.op[key].rarity
        searchPool[key].tagCode = db.op[key].tagCode
        searchPool[key].name = {}
        searchPool[key].name.kr = db.op[key].name.kr
        searchPool[key].name.en = db.op[key].name.en
        searchPool[key].name.jp = db.op[key].name.jp
        searchPool[key].name.cn = db.op[key].name.cn
    }
    searchPool.keys = Object.keys(searchPool)
	
	// 비어있거나 공백만 있는 이름을 받은 경우, 이름으로 검색하지 않음
    // 입력받은 이름이 존재한다면, 이름 검색
    
	if (searchByName) {
        for (var i = 0, len = searchPool.keys.length, key = '', nomatch = true; i < len; ++i) {
            key = searchPool.keys[i]
            
            // 한, 영, 중, 일 이름에서 검색
            // 이름에 일치하는 부분이 전혀 없다면, 검색풀에서 오퍼레이터를 제외
            if (   searchPool[key].name.kr.replace(/(\s*)/g, '').toLowerCase().indexOf(name) < 0
                && searchPool[key].name.en.replace(/(\s*)/g, '').toLowerCase().indexOf(name) < 0
                && searchPool[key].name.jp.replace(/(\s*)/g, '').toLowerCase().indexOf(name) < 0
                && searchPool[key].name.cn.replace(/(\s*)/g, '').toLowerCase().indexOf(name) < 0)
            {
                delete searchPool[key]
                
                // 키 목록에서도 제거
                searchPool.keys.splice(i, 1)
                --i
                --len
            }
        }
    }
	
	// 레어도 OR 검색
	if (searchByRarity) {
        var match = false
        for (var i = 0, ilen = searchPool.keys.length, key = ''; i < ilen; ++i) {
            key = searchPool.keys[i]
            
            match = false
            for (var j = 0, jlen = rarityArray.length; j < jlen; ++j) {
                rarity = rarityArray[j]
                
                if (searchPool[key].rarity == rarity) {
                    match = true
                    break
                }
            }
            
            // 레어도가 일치하지 않는 오퍼레이터를 검색풀에서 제거
            if (!match) {
                delete searchPool[key]
                
                // 키 목록에서도 제거
                searchPool.keys.splice(i, 1)
                --i
                --ilen
            }
        }
	}
	
	// 클래스 태그코드 OR 검색
    // 태그 검색 조건이 설정된 경우에만 검색 수행
	if (searchByTagCode) {
		for (var i = 0, len = searchPool.keys.length, key = ''; i < len; ++i) {
            key = searchPool.keys[i]
            
            // 일치하는 클래스(태그)가 전혀 존재하지 않는 오퍼레이터를 검색풀에서 제거
			if (!(tagCode & searchPool[key].tagCode)) {
                delete searchPool[key]
                
                // 키 목록에서도 제거
                searchPool.keys.splice(i, 1)
                --i
                --len
			}
		}
	} 
	
	// 검색 결과 반환
	return searchPool
}

const addResultToMcalc = function (event) {
	var inputData = fetchInputData()
	if (inputData === false) {
        showTooltip('전송할 데이터가 존재하지 않습니다', event.target, 'error')
		return
	}
	
    gtag('event', '재료 계산기로 전송 시작', {
        'event_category': '오퍼레이터 육성 자원 계산기'
    })
    
	if (!confirm('결과 데이터를 전송하시려면 확인 버튼을 눌러주십시오.')) {
        gtag('event', '재료 계산기로 전송 취소', {
            'event_category': '오퍼레이터 육성 자원 계산기'
        })
        
		showTooltip('데이터 전송이 취소되었습니다', event.target, 'error')
		return
	}
	
	var resultData = sortResultData(calc(inputData))
    
	for (var i = 0; i < resultData.total.IDs.length; ++i) {
		var itemID = Number(resultData.total.IDs[i])
		var quantity = Number(resultData.total[itemID])
        
		quantity += JSON.parse(localStorage.getItem('mcalc_item-need_' + itemID))
        
		localStorage.setItem('mcalc_item-need_' + itemID, JSON.stringify(quantity))
	}
	
    showTooltip('성공적으로 결과 데이터를 전송하였습니다', event.target, 'success')
    
    
	if (confirm('성공적으로 결과 데이터를 전송하였습니다.\n바로 재료 계산기로 이동하시겠습니까?')) {
        if (localStorage.getItem('preferred-version_mcalc') == '1') {
            location.href = 'mcalc-legacy.html'
        }
        else {
            location.href='mcalc.html'
        }
	}
}

main()
