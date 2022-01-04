var refreshTargetInput = function () {
    var htmlStr = ''
    var targetNum = 0, n = 0
    for (var rarity = 6; rarity >= 3; --rarity) {
        targetNum = Number(document.querySelectorAll(`#star-${rarity} input`)[3].value)
        for (var i = 0; i < targetNum; ++i) {
            htmlStr += ` <div class="tag">${rarity}★<input placeholder="대원_${n}">:<input style="width: 1em; text-align: right" value="1">회</div><br>`
            ++n
        }
    }
    document.querySelector('#target-input').innerHTML = htmlStr
}

var fetchData = function () {
    var data = {}
    
    data.stack = Number(document.getElementById('stack').value)
    
    data.prob = {
        total: {},
        pickup: {}
    }
    
    data.numOfChar = {
        nonPickup: {},
        pickup: {}
    }
    
    data.target = {
        nonPickup: {},
        pickup: {}
    }
    
    var targetInputIdx = 0,
        targetInputValues = [...document.querySelectorAll(`#target-input .tag`)].map(
            elm => Number(elm.querySelectorAll('input')[1].value)
        )
    
    for (var rarity = 6; rarity >= 3; --rarity) {
        var values = [...document.querySelectorAll(`#star-${rarity} input`)].map(elm => Number(elm.value))
        
        data.prob.total[rarity] = values[0] / 100
        data.prob.pickup[rarity] = values[1] / 100
        data.numOfChar.pickup[rarity] = values[2]
        data.target.nonPickup[rarity] = []
        data.target.pickup[rarity] = []
        
        for (var i = 0; i < values[3]; ++i) {
            data.target.pickup[rarity].push(targetInputValues[targetInputIdx++])
        }
    }
    
    return data
}

var simulationResult = []
var simulate = function (maxTime = 1000, maxSize = 50000) {
    gtag('event', '시뮬레이션 실행', {
        'event_category': '가챠 시뮬레이터'
    })
    
    var st = Date.now()
    /*
    var stack = 0

    var prob = {
        total: {
            6:0.02,
            5:0.08,
            4:0.5,
            3:0.4
        },
        pickup: {
            6:0.7,
            5:0.5,
            4:0.5,
            3:0.5
        }
    }

    var numOfChar = {
        total: {
        },
        pickup: {
            6:2,
            5:2,
            4:0,
            3:0
        }
    }

    var target = {
        nonPickup: {
            6:[],
            5:[],
            4:[],
            3:[],
        },
        pickup: {
            6:[1,1], // 6성 픽업 중 A를 1회, B를 1회 뽑는 것이 목표
            5:[],
            4:[],
            3:[],
        }
    }
    */
    var data = fetchData()
    
    // 목표 캐릭터가 총 0명일 경우, 시뮬레이션 수행하지 않음
    var sum = 0
    for (var rarity = 6; rarity >= 3; --rarity) {
        sum += data.target.nonPickup[rarity].length + data.target.pickup[rarity].length
    }
    if (sum <= 0) return
    
    var stack = 0,
        prob = data.prob,
        numOfChar = data.numOfChar,
        target = data.target,
        fiveStarGuarantee = document.getElementById('five-star-guarantee').className.indexOf('off') < 0,
        limitedPickupListPrice = document.getElementById('limited-pickup-list-price').className.indexOf('off') < 0
    
    var probTable = [], gachaResult = []
    simulationResult = []

    var tmpProb = 0, idx = 0, op = 0, stack = 0
    for (var key in target) {
        
        for (stack = 50; stack <= 99; ++stack) {
            idx = 0
            probTable[stack] = []
            
            for (var rarity = 6; rarity >= 3; --rarity) {
                for (op = 0; op < target[key][rarity].length; ++op) {
                    tmpProb = prob.total[rarity]
                    
                    if (rarity == 6)
                        tmpProb += (stack-50) * 0.02
                    else
                        tmpProb *= (1 - (prob.total[6] + (stack-50)*0.02)) / (1 - prob.total[6])
                    
                    if (key == 'pickup')
                        tmpProb = tmpProb * prob.pickup[rarity] / numOfChar.pickup[rarity]
                    else
                        tmpProb = tmpProb * (1 - prob.pickup[rarity]) / (numOfChar.total[rarity] - numOfChar.pickup[rarity])
                    
                    if (idx > 0)
                        tmpProb += probTable[stack][idx-1]
                    
                    probTable[stack][idx] = tmpProb
                    
                    if (stack == 50)
                        gachaResult[idx] = -(target[key][rarity][op])
                    
                    ++idx
                }
            }
        }
    }

    var gachaCnt = 0, r = 0, p = 0, i = 0, stack = 0, stackBackup = 0,
        sixStarLen = target.nonPickup[6].length + target.pickup[6].length,
        fiveStarLen = target.nonPickup[5].length + target.pickup[5].length,
        gachaResultBackup = [...gachaResult],
        fiveStarDraw = false
    
    stackBackup = data.stack
    while (1) {
        ++gachaCnt
        stack = ++stackBackup
        stack = (stack > 50 ? stack : 50)
        
        r = Math.random()
        if (stack > 99) {
            console.log(stack)
            stackBackup = 0
            continue
        }
        
        // 10연챠 5성 확정 시스템
        if (fiveStarGuarantee && !fiveStarDraw && gachaCnt === 10) {
            // 6성
            if (r < prob.total[6] + (stack-50)*0.02) {
                r = Math.floor(Math.random() * sixStarLen * 2) // [0. 1), [1, 2), ...
                if (r < sixStarLen) {
                    ++gachaResult[r]
                }
                stackBackup = 0
            }
            // 5성
            else {
                r = Math.floor(Math.random() * fiveStarLen * 2) // [0. 1), [1, 2), ...
                if (r < fiveStarLen) {
                    ++gachaResult[sixStarLen + r]
                }
                fiveStarDraw = true
            }
        }
        else {
            for (i = 0; i < probTable[stack].length; ++i) {
                if (r < probTable[stack][i]) {
                    if (i < sixStarLen) {
                        stackBackup = 0
                    }
                    else if (fiveStarLen > 0 && i < sixStarLen + fiveStarLen) {
                        fiveStarDraw = true
                    }
                    
                    ++gachaResult[i]
                    break
                }
            }
            if (i === probTable[stack].length) {
                var tmpProb = probTable[stack][probTable[stack].length-1] + prob.total[6] + (stack-50)*0.02 - (sixStarLen > 0 ? probTable[stack][sixStarLen-1] : 0)
                
                if (r < tmpProb) {
                    stackBackup = 0
                }
                else if (!fiveStarDraw)
                    if (r < tmpProb + prob.total[5]*((1-(prob.total[6]+(stack-50)*0.02))/(1-prob.total[6])) - (fiveStarLen > 0 ? probTable[stack][fiveStarLen-1] : 0)) {
                    fiveStarDraw = true
                }
            }
        }
        
        // 조건 만족 여부 확인.
        // 한정 300회 정가 반영.
        // 픽업 6성에 한해서 (가챠횟수/300)회만큼 인정하고 넘어가줌
        var listPriceCnt = (limitedPickupListPrice ? Math.floor(gachaCnt/300) : 0)
        
        for (i = 0; i < gachaResult.length; ++i) {
            if (gachaResult[i] < 0) {
                // 한정 300회 정가 반영.
                // 픽업 6성에 한해서 (가챠횟수/300)회만큼 인정하고 넘어가줌
                if (i < sixStarLen) {
                    // 모자른만큼 정가 횟수에서 차감.
                    listPriceCnt += gachaResult[i]
                    // 정가 횟수가 부족하지 않았다면 인정하고 넘어가줌
                    if (listPriceCnt >= 0) continue
                }
                
                break
            }
        }
        // 조건 만족했으므로, 하나의 표본 추출이 완료된 것.
        if (i == gachaResult.length) {
            simulationResult.push(gachaCnt)
            gachaCnt = 0
            stackBackup = data.stack
            fiveStarDraw = false
            gachaResult = [...gachaResultBackup]
            
            if (simulationResult.length % 1000 === 0 && (simulationResult.length >= maxSize || Date.now() - st >= maxTime)) {
                break
            }
        }
    }

    simulationResult = simulationResult.sort(function(a, b) {
        if (Number(a) < Number(b)) return -1
        else return 1
    })
    
    showResult();
}

var getQuantile = function (arr, p) {
    if (arr.length === 0)
        return 0
    
    var idx = Math.ceil(arr.length * p)
    idx = (idx >= arr.length ? arr.length-1 : idx)
    return arr[idx]
}

var getPercentile = function (arr, n) {
    if (arr.length === 0)
        return 0
    
    var lb = 0, ub = arr.length-1, center = 0, idx = 0
    
    while(1) {
        center = Math.floor((lb + ub) / 2)
        if (lb >= ub) break
        
        if (arr[center] < n) {
            lb = center + 1
        }
        else if (arr[center] === n) {
            idx = center
            break
        }
        else {
            ub = center - 1
        }
    }
    
    for (; center < arr.length; ++center) {
        if (arr[center] > n) {
            --center
            break
        }
    }
    
    return (center+1) / arr.length
}

var showResult = function (event) {
    gtag('event', '결과 출력', {
        'event_category': '가챠 시뮬레이터'
    })
    var percentiles = [...document.querySelectorAll('.result-panel table input')].map(elm => Number(elm.value)/100),
        quantileElms = document.querySelectorAll('.result-panel tr')[1].querySelectorAll('td')
    
    for (var i = 0; i < percentiles.length; ++i) {
        quantileElms[i].innerText = getQuantile(simulationResult, percentiles[i])
    }
    
    var drawElm = document.getElementById('draw'),
        probElm = document.getElementById('prob')
    
    if (event !== undefined) {
        if (event.target.id == 'draw') {
            probElm.value = Math.round(1000 * getPercentile(simulationResult, Number(drawElm.value))) / 10
        }
        else if (event.target.id == 'prob') {
            drawElm.value = getQuantile(simulationResult, Number(probElm.value)/100)
        }
    }
    else {
        probElm.value = Math.round(1000 * getPercentile(simulationResult, Number(drawElm.value))) / 10
    }
}

var toggleButton = function (elm) {
    if (elm.className.indexOf('off') < 0) {
        elm.className = 'off'
    }
    else {
        elm.className = ''
    }
}

var main = function () {
    for (var rarity = 6; rarity >= 3; --rarity) {
        document.querySelectorAll(`#star-${rarity} input`)[3].addEventListener('keyup', refreshTargetInput)
    }
    
    var elms = document.querySelectorAll('.result-panel input')
    for (var i = 0; i < elms.length; ++i) {
        elms[i].addEventListener('keyup', showResult)
    }
}

main()