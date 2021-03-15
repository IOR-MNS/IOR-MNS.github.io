var glob = glob || {
    namespace: 'recr',
    ga_event_category: '공개모집 계산기'
}
window[glob.namespace] = window[glob.namespace] || {}

var gtag_tagBatchSelectorUsed = false

var aliasMap = {
    '슨': '스나이퍼',
    '슾': '스페셜리스트',
    '딮': '디펜더',
    '딥': '디버프'
}

// 원리적으로는 해당 그룹 중 n개가 선택되었을 때에
// 그룹 전체의 점멸 표시를 해제하도록 설정해야 하지만
// 현재 그룹 구성 태그는 최대 2개이므로
// 간단하게, 그룹 중 1개 태그만 선택되어도 해제하도록 설정한다
window[glob.namespace].batchSelectEventHandler = function (e) {
    if (e.target.checked === true) {
        var el = null
        JSON.parse(e.target.dataset.cgroup).forEach(id => {
            el = document.getElementById('tag_' + id)
            el.className = 'checkboxButton'
            el.removeEventListener('click', batchSelectEventHandler)
        })
        e.target.dataset.cgroup = ''
    }
}

window[glob.namespace].banRecommendation = function (elem, featureID) {
    var featureList = ['autoFocusBatchSelector']
    
    if (featureList.indexOf(featureID) >= 0) {
        var bannedList = JSON.parse(localStorage.getItem('recr_banned-recommendation')) || []
        if (bannedList.indexOf(featureID) < 0) {
            console.log(featureID)
            bannedList.push(featureID)
            localStorage.setItem('recr_banned-recommendation', JSON.stringify(bannedList))
        }
        elem.closest('.recommended').remove()
    }
}

window[glob.namespace].createRecommendationPanel = function (featureID, userConfigPath, title, description) {
    var userConfigFullPath = `userConfig.${userConfigPath}.${featureID}`
    
    return `<div class="panel guide-panel recommended">
            <span style="font-size:110%;font-weight:500">
            추천하는 기능이 있어요!<br>
            <br>
            </span>
            <span style="font-size:95%">
            <a style="cursor:pointer;color:var(--color--skyBlue)" onclick="${userConfigFullPath}.value=true;saveUserConfig();location.reload()">[${title} 켜기]</a><br>
            <br>
            ${description}<br>
            <br>
            <a style="cursor:pointer;color:#999" onclick="banRecommendation(this, '${featureID}')">[앞으로 이 추천 표시하지 않기]</a>
            </span>
        </div>`
}

// 태그 입력기를 사용하기는 하나, 관련 편의 기능을 사용하지 않는 경우, 안내해줌
window[glob.namespace].tagBatchSelectorGuide = function () {
    document.querySelectorAll('.recommended').forEach(elm => elm.remove())
    
    var bannedList = JSON.parse(localStorage.getItem('recr_banned-recommendation')) || []
    console.log(bannedList)
    // 관련 편의 기능이 설정되지 않았고, 이 안내가 표시 제한되지 않았다면
    if (bannedList.indexOf('autoFocusBatchSelector') < 0 && !userConfig.input.autoFocusBatchSelector.value) {
        // 안내 표시
        document.getElementById('result-panel').insertAdjacentHTML('afterbegin', createRecommendationPanel('autoFocusBatchSelector', 'input', '태그 입력기 자동 포커스', '들어오자마자, 또는 태그를 초기화한 뒤,<br>곧바로 태그를 입력할 수 있어요.<br><br><span style="color:#999">*모바일 기기에선 일부 기능이 제한될 수 있습니다*</span>'))
    }
}

window[glob.namespace].tagBatchSelectorKeyup = function (ev) {
    if(!gtag_tagBatchSelectorUsed) {
        gtag_tagBatchSelectorUsed = true
        gtag('event', '태그 선택기 최초 사용', {
            'event_category': '공개모집 계산기'
        })
    }
    
    if (ev.keyCode === 13) {
        // 오타가 있는 상태에서 엔터를 누른 경우, 경고 표시.
        if ($(ev.target).data('typo') == true) {
            $(ev.target).addClass('typo')
            gtag('event', '태그 선택기 오타 경고 기능 작동', {
                'event_category': '공개모집 계산기'
            })
        }
        else {
            tagBatchSelectorGuide()
            
            $(ev.target).blur()
            var top = 0
            var $blinkElems = $('.blink+label')
            if ($blinkElems.length > 0) {
                //top = $blinkElems.eq(0).parent().offset().top
                top = $('.selection-panel').offset().top
            }
            else {
                top = $('#selection-panel-footer-btn').offset().top
            }
            
            $('html,body').animate({scrollTop: top}, 200) /*document.getElementById('selection-panel-footer-btn').focus()*/
        }
        return false
    }
    
    $(ev.target).removeClass('typo')
    $(ev.target).data('typo', false)
    
    if (this.value.replace(/(\s*)/g, '').length === 0) {
        return false
    }
    
    // 입력값을 한 글자 단위로 나누어 검색
    var i = 0, len = db.tag.keys.length, sel = [], blink = {}, found = []
    this.value.split('').forEach(ch => {
        ch = aliasMap[ch] || ch
        
        // 첫 글자가 일치하는 태그를 모두 찾기
        for (i = 0, found = []; i < len; ++i) {
            // 성별 태그는 매칭하지 않음
            if (db.tag[i].type === 'sex') {
                continue
            }
            
            // 한 글자 단위로 매칭하는 게 한, 중섭까진 어케 될텐데 일섭하고 특히 글섭은 어떻게 할지 생각할 것..
            // 일단은 한글 태그명 기준으로만 매칭되도록 한다.
            if (db.tag[i].name.kr.slice(0, ch.length).indexOf(ch) === 0) {
                found.push(i)
            }
        }
        
        // 매칭되는 태그가 없었으며, 입력된 값이 한글이라면 오타 가능성 있는 것.
        // 아직 입력 도중일 것이므로 당장 스타일을 적용하진 않음
        if (found.length === 0 && /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(ch)) {
            $(ev.target).data('typo', true)
        }
        
        // 하나만 찾았다면, 그 태그를 자동 선택
        if (found.length === 1) {
            sel.push(found[0])
        }
        // 여러 개를 찾았다면, 해당 태그들을 점멸 표시
        else if (found.length > 1) {
            if (!blink[ch]) {
                blink[ch] = {
                    'cnt': 1,
                    'tags': [...found]
                }
            }
            else {
                ++blink[ch].cnt
            }
        }
    })
    
    // 현재 선택된 태그를 모두 해제하고
    clearSelection(false, false) // 스크롤하지 않음, tagBatchSelector의 value 초기화하지 않음
    
    // 중복 검색된 태그 처리
    var el = null
    Object.keys(blink).forEach(ch => {
        // 그룹의 구성 태그 수만큼 같은 글자가 입력되었다면 (예. "디디")
        // 해당 그룹의 태그를 전부 자동 선택
        if (blink[ch].cnt >= blink[ch].tags.length) {
            sel = [...sel, ...blink[ch].tags]
        }
        else {
            // 원리적으로는 해당 그룹 중 n개가 선택되었을 때에
            // 그룹 전체의 점멸 표시를 해제하도록 설정해야 하지만
            // 현재 그룹 구성 태그는 최대 2개이므로
            // 간단하게, 그룹 중 1개 태그만 선택되어도 해제하도록 설정한다
            blink[ch].tags.forEach(id => {
                el = document.getElementById('tag_' + id)
                el.className += ' blink'
                el.dataset.cgroup = JSON.stringify(blink[ch].tags)
                el.addEventListener('click', batchSelectEventHandler)
            })
        }
    })
    
    // 태그가 5개 초과하여 인식되었다면, 오타 가능성 있는 것.
    if (sel.length > 5) {
        $(ev.target).data('typo', true)
    }
    
    if (sel.length > 0) {
        // 태그 자동 선택
        var cb = null
        sel.forEach(id => {
            cb = document.getElementById('tag_' + id)
            cb.checked = true
            tagClicked(cb, false)
        })
        
        // 선택된 태그에 대한 계산 수행
        showResult()
    }
}

window[glob.namespace].main_tagBatchSelector = function () {
    $('#tagBatchSelector').keyup(tagBatchSelectorKeyup)
}

window.errorCatcherExec = window.errorCatcherExec || []
try {
    window.errorCatcherExec.push('main_tagBatchSelector')
} catch (e) {
    window.errorCatcherExec = []
    window.errorCatcherExec.push('main_tagBatchSelector')
}