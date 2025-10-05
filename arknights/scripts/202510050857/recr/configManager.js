// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Trailing_commas
const providedConfigs = [
    {
        title: '지역 설정',
        id: 'locale',
        
        configs: [
            {
                title: '서버',
                id: 'region',
                exclusive: true,
                
                options: [
                    {
                        title: '한국',
                        value: 'kr',
                        default: true,
                    },
                    {
                        title: '중국',
                        value: 'cn',
                    },
                    {
                        title: '일본',
                        value: 'jp',
                    },
                    {
                        title: '글로벌',
                        value: 'en',
                    },
                ]
            },
            {
                title: '언어',
                id: 'lang',
                exclusive: true,
                
                options: [
                    {
                        title: '한국어',
                        value: 'kr',
                        default: true,
                    },
                    {
                        title: '중국어',
                        value: 'cn',
                    },
                    {
                        title: '일본어',
                        value: 'jp',
                    },
                    {
                        title: '영어',
                        value: 'en',
                    },
                ]
            },
        ]
    },
    {
        title: '입력 설정',
        id: 'input',
        
        configs: [
            {
                title: '태그 입력기',
                id: 'batchSelector',
                exclusive: true,
                
                options: [
                    {
                        title: '사용',
                        value: true,
                        default: true,
                    },
                    
                    {
                        title: '미사용',
                        value: false,
                    },
                ]
            },
            
            {
                title: '태그 입력기 자동 포커스',
                id: 'autoFocusBatchSelector',
                exclusive: true,
                
                options: [
                    {
                        title: '사용',
                        value: true,
                    },
                    
                    {
                        title: '미사용',
                        value: false,
                        default: true,
                    },
                ]
            },
        ]
    },
    
    {
        title: '표시 설정',
        id: 'display',
        
        configs: [
            {
                title: '이미지',
                id: 'image',
                exclusive: true,
                
                options: [
                    {
                        title: '없음',
                        value: 'none',
                        default: true,
                    },
                    
                    {
                        title: '매우 작게',
                        value: 'tiny',
                    },
                    
                    {
                        title: '작게',
                        value: 'small',
                    },
                    
                    {
                        title: '중간',
                        value: 'medium',
                    },
                    
                    {
                        title: '크게',
                        value: 'large',
                    },
                ]
            },
            
            {
                title: '이름',
                id: 'name',
                exclusive: true,
                
                options: [
                    {
                        title: '표시',
                        value: true,
                        default: true,
                    },
                    
                    {
                        title: '비표시',
                        value: false,
                    },
                ]
            },
            
            {
                title: '레어도',
                id: 'rarity',
                exclusive: true,
                
                options: [
                    {
                        title: '표시',
                        value: true,
                        default: true,
                    },
                    
                    {
                        title: '비표시',
                        value: false,
                    },
                ]
            },
            
            {
                title: '사용 방법',
                id: 'guidePanel',
                exclusive: true,
                
                options: [
                    {
                        title: '표시',
                        value: true,
                        default: true,
                    },
                    
                    {
                        title: '비표시',
                        value: false,
                    },
                ]
            },
        ]
    },
    
    {
        title: '필터 설정',
        id: 'filter',
        
        configs: [
            {
                title: '고등급 확정식만 표시',
                id: 'onlyHighRarity',
                exclusive: true,
                
                options: [
                    {
                        title: '켜기',
                        value: true,
                    },
                    
                    {
                        title: '끄기',
                        value: false,
                        default: true,
                    },
                ]
            },
            
            {
                title: '허용 레어도',
                id: 'rarity',
                exclusive: false,
                
                options: [
                    {
                        title: '1성',
                        value: 1,
                        default: true,
                    },
                    
                    {
                        title: '2성',
                        value: 2,
                        default: true,
                    },
                    
                    {
                        title: '3성',
                        value: 3,
                        default: true,
                    },
                    
                    {
                        title: '4성',
                        value: 4,
                        default: true,
                    },
                    
                    {
                        title: '5성',
                        value: 5,
                        default: true,
                    },
                    
                    {
                        title: '6성',
                        value: 6,
                        default: true,
                    },
                ]
            },
        ]
    },
]

var saveToStorage = function (key, value) {
    localStorage.setItem('recr_' + key, JSON.stringify(value))
}

var loadFromStorage = function (key, defaultValue = null) {
    var ret = localStorage.getItem('recr_' + key) || defaultValue
    if (ret !== null) {
        return JSON.parse(ret)
    }
    else {
        return {}
    }
}

var userConfig = {}

var saveUserConfig = function () {
    saveToStorage('userConfig', userConfig)
}

var loadUserConfig = function () {
    // 저장된 설정 로드
    userConfig = loadFromStorage('userConfig')
    
    // 설정의 빈 부분을 기본값으로 채움
    for (var i = 0, len = providedConfigs.length; i < len; ++i) {
        var category = providedConfigs[i]
        
        if (!userConfig[category.id]) {
            userConfig[category.id] = {}
        }
        
        for (var j = 0, jlen = category.configs.length; j < jlen; ++j) {
            var config = category.configs[j]
            
            // 값이 이미 존재하면 그대로 놔둠
            if (userConfig[category.id][config.id] !== undefined
                && userConfig[category.id][config.id].value !== undefined) {
                continue
            }
            
            // 값이 없으면 기본값으로 채움
            userConfig[category.id][config.id] = {}
            
            if (config.exclusive === true) {
                userConfig[category.id][config.id].exclusive = true
            }
            else {
                userConfig[category.id][config.id].exclusive = false
                userConfig[category.id][config.id].value = []
            }
            
            for (var k = 0, klen = config.options.length; k < klen; ++k) {
                if (config.options[k].default === true) {
                    if (config.exclusive === true) {
                        userConfig[category.id][config.id].value = config.options[k].value
                        break
                    }
                    else {
                        userConfig[category.id][config.id].value.push(config.options[k].value)
                    }
                }
            }
        }
    }
}

var setConfigModal = function () {
    var configFragment = document.createDocumentFragment()

    for (var i = 0, len = providedConfigs.length; i < len; ++i) {
        var category = providedConfigs[i]
        
        var categorydom = document.createElement('div')
        categorydom.style.fontSize = '90%'
        categorydom.classList.add('user-config-category')
        categorydom.dataset.id = category.id
        categorydom.innerHTML += `<hr style="border-color:#444;display:inline-block"><span style="font-size: 0.9em">${category.title}</span><br><br>`
        
        for (var j = 0, jlen = category.configs.length; j < jlen; ++j) {
            var config = category.configs[j]
            
            var configdom = document.createElement('div')
            configdom.classList.add('user-config-config') 
            configdom.dataset.id = config.id
            configdom.innerHTML += '<span style="font-size: 0.75em;color:#eee">' + config.title + '</span><br>'
            
            
            for (var k = 0, klen = config.options.length; k < klen; ++k) {
                var option = config.options[k]
                var optionid = ['user-config-', category.id, config.id, k.toString()].join('-')
                
                var optioninputdom = document.createElement('input')
                optioninputdom.classList.add('checkboxButton', 'user-config-option')
                optioninputdom.dataset.value = JSON.stringify(option.value)
                optioninputdom.setAttribute('id', optionid)
                optioninputdom.setAttribute('name', config.id)
                
                if (config.exclusive === true) {
                    optioninputdom.setAttribute('type', 'radio')
                }
                else {
                    optioninputdom.setAttribute('type', 'checkbox')
                }
                
                
                var optionlabeldom = document.createElement('label')
                optionlabeldom.className = 'tag'
                optionlabeldom.innerText = option.title
                optionlabeldom.setAttribute('for', optionid)
                configdom.appendChild(optioninputdom)
                configdom.appendChild(optionlabeldom)
            }
            
            categorydom.appendChild(configdom)
        }
        
        configFragment.appendChild(categorydom)
    }

    document.querySelector('.modal-body').appendChild(configFragment)
}

var selectUserConfig = function () {
    var keys = Object.keys(userConfig)
    var options = document.querySelectorAll('.user-config-option')
    
    var optionID = '', val = null
    for (var i = 0; i < options.length; ++i) {
        var option = options[i]
        var [categoryID, configID] = option.getAttribute('id').split('--')[1].split('-')
        
        var optionValue = JSON.parse(option.dataset.value)
        
        if (userConfig[categoryID] && userConfig[categoryID][configID]) {
            if (userConfig[categoryID][configID].exclusive === true
                && optionValue === userConfig[categoryID][configID].value) {
                option.checked = true
            }
            else {
                var userConfigValues = userConfig[categoryID][configID].value
                for (var j = 0, jlen = userConfigValues.length; j < jlen; ++j) {
                    if (userConfigValues[j] === optionValue) {
                        option.checked = true
                        break
                    }
                }
            }
        }
    }
}

var fetchUserConfig = function () {
    // 여러 값을 가질 수 있는 설정은, fetch 전 초기화
    var keys = Object.keys(userConfig)
    for (var i = 0, len = keys.length; i < len; ++i) {
        var categoryKeys = Object.keys(userConfig[keys[i]])
        
        for (var j = 0, jlen = categoryKeys.length; j < jlen; ++j) {
            if (userConfig[keys[i]][categoryKeys[j]].exclusive === false) {
                userConfig[keys[i]][categoryKeys[j]].value = []
            }
        }
    }
    
    var selectedOptions = document.querySelectorAll('.user-config-option:checked')
    
    for (var i = 0, len = selectedOptions.length; i < len; ++i) {
        var option = selectedOptions[i]
        var [categoryID, configID] = option.getAttribute('id').split('--')[1].split('-')
        
        var optionValue = JSON.parse(option.dataset.value)
        
        if (userConfig[categoryID] === undefined) {
            userConfig[categoryID] = {}
        }
        
        if (userConfig[categoryID][configID].exclusive === true) {
            userConfig[categoryID][configID].value = optionValue
        }
        else {
            userConfig[categoryID][configID].value.push(optionValue)
        }
    }
    
    saveUserConfig()
    loadUserConfig()
    syncButtons()
}

const openConfigModal = function () {
    gtag('event', '설정 프롬프트 열기', {
        'event_category': '공개모집 계산기'
    })
    
	selectUserConfig()
	document.getElementById('config-modal').style.display = 'block'
	document.getElementById('config-modal').style.opacity = '1'
}

const checkBatchSelectorOption = function () {
    var bsc = document.getElementById('tagBatchSelector-container')
    var optval = userConfig.input.batchSelector.value
    console.log(optval)
    if (optval === false) {
        bsc.style.display = 'none'
    }
    else {
        bsc.style.display = 'block'
    }
}

const checkGuidePanelOption = function () {
    var gpList = document.querySelectorAll('.guide-panel')
    var optval = userConfig.display.guidePanel.value
    
    if (optval === false) {
        gpList.forEach(function(elm) {
            elm.style.display = 'none'
        })
        $('#result-panel').prepend('<div class="panel"></div>')
    }
    else {
        gpList.forEach(function(elm) {
            elm.style.display = 'block'
        })
    }
}

const closeConfigModal = function () {
	fetchUserConfig()
    
    checkBatchSelectorOption()
    checkGuidePanelOption()
    
    // dataset.lang은 JSON.stringify로 시리얼라이즈하지 않았다.
    if (document.getElementById('tag-top').dataset.lang != userConfig.locale.region.value) {
        configSelectionPanel()
    }
    
	showResult()
    
    document.getElementById('config-modal').style.opacity = '0'
    setTimeout(function () {
        document.getElementById('config-modal').style.display = 'none'
    }, 300)
}

/* 이벤트 리스너 설정 */
// 설정 버튼 클릭시, modal prompt 열음
document.querySelector('.menu-btn').addEventListener('click', openConfigModal)

// modal prompt의 content에 있는 닫기 버튼 클릭시, 닫음
document.querySelector('.close-btn').addEventListener('click', function() {
    gtag('event', '설정 프롬프트 닫기: 버튼 클릭', {
        'event_category': '공개모집 계산기'
    })
    
    closeConfigModal()
})

// modal prompt의 content 바깥 클릭시, 닫음
window.addEventListener('click', function(event) {
    if (event.target.isSameNode(document.getElementById('config-modal'))) {
        gtag('event', '설정 프롬프트 닫기: 외부 클릭', {
            'event_category': '공개모집 계산기'
        })
        
        closeConfigModal()
    }
})

setConfigModal()
loadUserConfig()
checkBatchSelectorOption()
checkGuidePanelOption()

gtag('event', '설정된 서버: ' + userConfig.locale.region.value, {
    'event_category': '공개모집 계산기',
    'non_interaction': true
})

gtag('event', '설정된 언어: ' + userConfig.locale.lang.value, {
    'event_category': '공개모집 계산기',
    'non_interaction': true
})