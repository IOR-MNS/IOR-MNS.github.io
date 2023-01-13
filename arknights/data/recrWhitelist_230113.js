// 공채 화이트리스트 설정
var recrWhiteList = {}
recrWhiteList.version = {} // 서버별 DB의 버전 표기는 loadRecr.js의 configSelectionPanel()에서 담당함.

// 마지막 확인: 2023-01-13 16:00
// 한, 일, 글섭
recrWhiteList.version.en = recrWhiteList.version.jp = recrWhiteList.version.kr = "2023.01.13"
recrWhiteList.en = recrWhiteList.jp = recrWhiteList.kr = 
["A41","A42","A43","A44","AA01","AA02","AA03","AZ01","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03","KZ04","LM04","LM05","LM08","LM10","LM11","LM12","LN01","LT01","LT05","LT77","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62","PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R107","R108","R119","R122","R123","R128","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03","RL04","RL05","RL06","RR01","SG01","SI01","SR03","SS02","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC01","VC02","VC03","VC04","YD01","RE41","R110","HT03","SR27","LT02","LM20","LM19","KZ15","R155","YD05","R160","RV02","R158","HK03"]

// 마지막 확인: 2021-09-29 18:36
// 중섭
recrWhiteList.version.cn = "2021.09.29"
recrWhiteList.cn = 
["A41","A42","A43","A44","AA01","AA02","AA03","AZ01","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","HT03","IU04","IU05","JC01","JC03","JC05","JC06","KZ03",
"KZ04","LM04","LM05","LM08","LM10","LM11","LM12","LN01","LT01","LT02","LT05","LT77","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62",
"PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R107","R108","R110","R119","R122","R123","R128","R160","R303","RB02","RCX2","RCX3","RCX4","RE41","RL01",
"RL02","RL03","RL04","RL05","RL06","RR01","SG01","SI01","SR03","SR27","SS02","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC01","VC02","VC03","VC04","YD01"]

/*
// 한, 일, 글섭
// 2022-07-29 16:00 갱신 이전
["A41","A42","A43","A44","AA01","AA02","AA03","AZ01","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03",
"KZ04","LM04","LM05","LM08","LM10","LM11","LM12","LN01","LT01","LT05","LT77","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62",
"PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R107","R108","R119","R122","R123","R128","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03",
"RL04","RL05","RL06","RR01","SG01","SI01","SR03","SS02","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC01","VC02","VC03","VC04","YD01","RE41","R110",
"HT03","SR27","LT02","LM20","LM19","KZ15"]

// 2022-04-28 16:00 갱신 이전
["A41","A42","A43","A44","AA01","AA02","AA03","AZ01","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03",
"KZ04","LM04","LM05","LM08","LM10","LM11","LM12","LN01","LT01","LT05","LT77","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62",
"PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R107","R108","R119","R122","R123","R128","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03",
"RL04","RL05","RL06","RR01","SG01","SI01","SR03","SS02","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC01","VC02","VC03","VC04","YD01","RE41","R110",
"HT03","SR27","LT02"]

// 2022-01-14 16:00 갱신 이전
["A41","A42","A43","A44","AA01","AA02","AA03","AZ01","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03",
"KZ04","LM04","LM05","LM08","LM10","LM11","LM12","LN01","LT01","LT05","LT77","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62",
"PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R107","R108","R119","R122","R123","R128","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03",
"RL04","RL05","RL06","RR01","SG01","SI01","SR03","SS02","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC01","VC02","VC03","VC04","YD01"]

// 2021-09-30 16:00 갱신 이전
["A41","A42","A43","A44","AA01","AA02","AA03","AZ01","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03",
"KZ04","LM04","LM05","LM08","LM10","LM11","LN01","LT01","LT05","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62","PA63","PA64",
"PA65","PL02","PL03","PL04","R100","R104","R105","R106","R107","R108","R119","R122","R123","R128","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03","RL04","RL05",
"RL06","RR01","SG01","SI01","SR03","SS02","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC02","VC03","VC04","YD01"]

// 2021-05-01 04:00 갱신 이전
["A41","A42","A43","A44","AA01","AA02","AA03","AZ01","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03",
"KZ04","LM04","LM05","LM08","LM10","LM11","LN01","LT05","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62","PA63","PA64","PA65",
"PL02","PL03","PL04","R100","R104","R105","R106","R107","R108","R119","R123","R128","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03","RL04","RL05","RR01","SG01",
"SI01","SR03","SS02","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC02","VC03","VC04","YD01"]

// 2020-12-30 16:00 갱신 이전
["A41","A42","A43","A44","AA01","AA02","AA03","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03","KZ04","LM04","LM05","LM08","LM10","LM11","LN01","LT05","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62","PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R119","R123","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03","RL04","RL05","SG01","SI01","SR03","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC02","VC03","VC04","YD01"]

// 중섭
// 2021-07-12 23:00 갱신 이전
["A41","A42","A43","A44","AA01","AA02","AA03","AZ01","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03",
"KZ04","LM04","LM05","LM08","LM10","LM11","LM12","LN01","LT01","LT05","LT77","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62",
"PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R107","R108","R119","R122","R123","R128","R160","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02",
"RL03","RL04","RL05","RL06","RR01","SG01","SI01","SR03","SS02","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC01","VC02","VC03","VC04","YD01"]

// 2020-12-30 16:00
["A41","A42","A43","A44","AA01","AA02","AA03","AZ01","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03","KZ04","LM04","LM05","LM08","LM10","LM11","LN01","LT05","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62","PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R107","R108","R119","R123","R128","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03","RL04","RL05","RR01","SG01","SI01","SR03","SS02","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC02","VC03","VC04","YD01"]
*/

////
/*
// 정해진 시각에 DB 자동 업데이트하도록 하는 코드
// 한, 일, 글섭 1/14 16시부터 공개모집 풀 추가. 한, 일섭은 UTC+9 기준, 글섭은 UTC-7 기준.

var updateData = "여기에 갱신되는 화이트리스트 배열"
var updateTime = {
    kr: new Date(Date.UTC(2022, 0, 14, 7)), // month is 0-indexed
    us: new Date(Date.UTC(2022, 0, 14, 23))
}
var updateTimeStr = {}

for (let region in updateTime) {
    document.getElementById(`${region}-update-time`).innerText =
        `${updateTime[region].getMonth() + 1}월 ${updateTime[region].getDate()}일 ${updateTime[region].getHours()}시`
    document.getElementById(`${region}-timezone`).innerText = `(${Intl.DateTimeFormat().resolvedOptions().timeZone})`
}

var DBUpdated = {
    kr: false,
    us: false
}

if (Date.now() >= updateTime.kr) {
    DBUpdated.kr = true
    recrWhiteList.jp = recrWhiteList.kr = updateData
}

if (Date.now() >= updateTime.us) {
    DBUpdated.us = true
    recrWhiteList.en = updateData
}

let updateDone = true
for (let region in updateTime) {
    updateDone = updateDone && DBUpdated[region]
    if (DBUpdated[region]) {
        document.getElementById(`${region}-update-progress`).innerText = '완료'
    }
    else {
        document.getElementById(`${region}-update-progress`).innerText = '예정'
    }
}

// 아직 업데이트가 완료되지 않았거나, 글로벌 버전 업데이트 이후 24시간이 지나지 않았다면
// 공개모집 풀 갱신 안내를 표시
if (!updateDone || Date.now() <= (updateTime.us.getTime() + 24*60*60*1000)) {
    document.querySelector('.announce-panel').style.display = 'block'
}
*/
////


// 정해진 시각에 DB 자동 업데이트하도록 하는 코드
// 한, 일, 글섭 1/14 16시부터 공개모집 풀 추가. 한, 일섭은 UTC+9 기준, 글섭은 UTC-7 기준.
var updateData = ["A41","A42","A43","A44","AA01","AA02","AA03","AZ01","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03","KZ04","LM04","LM05","LM08","LM10","LM11","LM12","LN01","LT01","LT05","LT77","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62","PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R107","R108","R119","R122","R123","R128","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03","RL04","RL05","RL06","RR01","SG01","SI01","SR03","SS02","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC01","VC02","VC03","VC04","YD01","RE41","R110","HT03","SR27","LT02","LM20","LM19","KZ15","R155","YD05","R160","RV02","R158","HK03","R109","R148","R144"]

var updateTime = {
    kr: new Date(Date.UTC(2023, 0, 13, 7)), // month is 0-indexed
    us: new Date(Date.UTC(2023, 0, 13, 23))
}
var updateTimeStr = {}

for (let region in updateTime) {
    document.getElementById(`${region}-update-time`).innerText =
        `${updateTime[region].getMonth() + 1}월 ${updateTime[region].getDate()}일 ${updateTime[region].getHours()}시`
    document.getElementById(`${region}-timezone`).innerText = `(${Intl.DateTimeFormat().resolvedOptions().timeZone})`
}

var DBUpdated = {
    kr: false,
    us: false
}

if (Date.now() >= updateTime.kr) {
    DBUpdated.kr = true
    recrWhiteList.jp = recrWhiteList.kr = updateData
}

if (Date.now() >= updateTime.us) {
    DBUpdated.us = true
    recrWhiteList.en = updateData
}

let updateDone = true
for (let region in updateTime) {
    updateDone = updateDone && DBUpdated[region]
    if (DBUpdated[region]) {
        document.getElementById(`${region}-update-progress`).innerText = '완료'
    }
    else {
        document.getElementById(`${region}-update-progress`).innerText = '예정'
    }
}

// 아직 업데이트가 완료되지 않았거나, 글로벌 버전 업데이트 이후 24시간이 지나지 않았다면
// 공개모집 풀 갱신 안내를 표시
if (!updateDone || Date.now() <= (updateTime.us.getTime() + 24*60*60*1000)) {
    document.querySelector('.announce-panel').style.display = 'block'
}

/*if (Date.now() <= new Date(Date.UTC(2021, 0, 9, 0))) {
    document.querySelector('.announce-panel').style.display = 'block'
}*/

var announceShowDetail = function () {
    var elm = document.getElementById('announce-detail')
    var toggleTable = ['block', 'none']
    elm.style.display = toggleTable[(toggleTable.indexOf(elm.style.display)+1)%2]
    
    if (elm.style.display === 'block') {
        gtag('event', '공지 확인', {
            'event_category': '공개모집 계산기'
        })
    }
}