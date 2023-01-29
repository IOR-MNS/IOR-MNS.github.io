const serviceList = {
    'mcalc_':'재료 계산기',
    'recr_':'공개모집 계산기',
    'optotal_':'육성 자원 계산기',
    'oplv_':'레벨링 비용 계산기',
    'gacha_':'가챠 확률 계산기',
}

const getConfig = function () {
    var data = {}
    for (let key in localStorage) {
        for (let service in serviceList) {
            if (key.indexOf(service) >= 0) {
                data[key] = localStorage.getItem(key)
                break
            }
        }
    }
    return data
}

const openModalPrompt = function () {
    // 프롬프트 표시
    var modal = document.querySelector('.modal')
	modal.style.display = 'block'
	modal.style.opacity = '1'
    
    document.getElementById('data-output').value = JSON.stringify(getConfig())
}

const closeModalPrompt = function () {
    var modal = document.querySelector('.modal')
    modal.style.opacity = '0'
    setTimeout(function () {
        modal.style.display = 'none'
    }, 300)
}

const saveData = function () {
    var blob = new Blob([JSON.stringify(getConfig())], {type: "text/plain;charset=utf-8"}),
        filename = `minase_설정_데이터_${new Date().toISOString().replace(/:/g, "-")}.txt`
    
    saveAs(blob, filename)
    
    alert('데이터 파일이 저장되었습니다.')
}

const loadData = function () {
    if (confirm('주의: 이 작업을 수행하면 기존 데이터는 삭제됩니다.\n정말 데이터를 불러오시려면 "확인" 버튼을 눌러주세요.')) {
        var data = document.getElementById('data-input').value
        if (!data) {
            alert('데이터 불러오기를 취소하였습니다.')
            return
        }
        
        try {
            data = JSON.parse(data)
        } catch (err) {
            alert('입력된 데이터가 정상적이지 않습니다.\n불러오기 작업을 취소하고 기존 데이터를 그대로 유지합니다.')
            return
        }
        
        var targetServices = {}
        Object.keys(serviceList).forEach(service => targetServices[service] = false)
        var affectedServices = []
        
        for (var key in data) {
            for (var service in serviceList) {
                if (targetServices[service]) continue
                
                if (key.indexOf(service) >= 0) {
                    targetServices[service] = true
                    affectedServices.push(serviceList[service])
                }
            }
        }
        
        var localStorageKeys = Object.keys(localStorage)
        for (var service in targetServices) {
            if (targetServices[service]) {
                for (var i = 0; i < localStorageKeys.length; ++i) {
                    if (localStorageKeys[i].indexOf(service) >= 0) {
                        localStorage.removeItem(localStorageKeys[i])
                    }
                }
            }
        }
        
        for (var key in data) {
            localStorage.setItem(key, data[key])
        }
        
        alert(`데이터 불러오기를 완료하였습니다.\n영향을 받은 서비스: ${affectedServices.join(', ')}`)
        
        gtag('event', '데이터 불러오기 완료', {
            'event_category': '데이터 마이그레이션'
        })
    }
    else {
        alert('데이터 불러오기를 취소하였습니다.')
    }
}

document.querySelector('#data-migration').addEventListener('click', function (event) {
    openModalPrompt()
})

// modal prompt의 content에 있는 닫기 버튼 클릭시, 닫음
document.querySelector('.close-btn').addEventListener('click', function() {
    closeModalPrompt()
})

// modal prompt의 content 바깥을 누르면, 닫음
window.addEventListener('mousedown', function(event) {
    if (event.target.getAttribute('name') === 'modal') {
        closeModalPrompt()
    }
})