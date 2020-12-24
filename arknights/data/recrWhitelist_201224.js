// 공채 화이트리스트 설정
var recrWhiteList = {}

// 마지막 확인: 2020-12-11 02:48
// 한, 일, 글섭
recrWhiteList.en = recrWhiteList.jp = recrWhiteList.kr = ["A41","A42","A43","A44","AA02","AA03","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03","KZ04","LM05","LM10","LM11","LN01","LT05","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PL02","PL03","PL04","R100","R104","R105","R106","R123","R303","RB02","RCX2","RCX3","RL01","RL02","RL03","RL04","RL05","SG01","SI01","SR03","ST01","ST02","ST03","SW01","SW02","USS1","USS2","USS3","VC02","VC04","YD01"]

// 마지막 확인: 2020-12-11 02:48
// 중섭
recrWhiteList.cn = ["A41","A42","A43","A44","AA01","AA02","AA03","AZ01","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03","KZ04","LM04","LM05","LM08","LM10","LM11","LN01","LT05","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62","PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R107","R108","R119","R123","R128","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03","RL04","RL05","RR01","SG01","SI01","SR03","SS02","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC02","VC03","VC04","YD01"]

// 마지막 확인: 2020-08-14 06:23
// 중섭
// recrWhiteList.cn = ["A41","A42","A43","A44","AA01","AA02","AA03","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03","KZ04","LM04","LM05","LM08","LM10","LM11","LN01","LT05","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62","PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R119","R123","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03","RL04","RL05","SG01","SI01","SR03","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC02","VC03","VC04","YD01"]


// 한, 일, 글섭 12/30 16시부터 공개모집 풀 추가. 한, 일섭은 UTC+9 기준, 글섭은 UTC-7 기준.
var updateTime = {
    kr: new Date(Date.UTC(2020, 11, 30, 7)),
    us: new Date(Date.UTC(2020, 11, 30, 23))
}

var DBUpdated = {
    kr: false,
    en: false
}

if (Date.now() >= updateTime.kr) {
    DBUpdated.kr = true
    
    recrWhiteList.jp = recrWhiteList.kr = ["A41","A42","A43","A44","AA01","AA02","AA03","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03","KZ04","LM04","LM05","LM08","LM10","LM11","LN01","LT05","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62","PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R119","R123","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03","RL04","RL05","SG01","SI01","SR03","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC02","VC03","VC04","YD01"]
}

if (Date.now() >= updateTime.us) {
    DBUpdated.en = true
    recrWhiteList.en = ["A41","A42","A43","A44","AA01","AA02","AA03","BS02","BS03","BS04","FO01","FO02","FO03","GG01","GG03","HK01","IU04","IU05","JC01","JC03","JC05","JC06","KZ03","KZ04","LM04","LM05","LM08","LM10","LM11","LN01","LT05","MN02","MN03","PA11","PA12","PA13","PA14","PA15","PA41","PA42","PA43","PA44","PA61","PA62","PA63","PA64","PA65","PL02","PL03","PL04","R100","R104","R105","R106","R119","R123","R303","RB02","RCX2","RCX3","RCX4","RL01","RL02","RL03","RL04","RL05","SG01","SI01","SR03","ST01","ST02","ST03","SW01","SW02","US10","USS1","USS2","USS3","VC02","VC03","VC04","YD01"]
}

if (DBUpdated.kr) {
    document.querySelectorAll('.announce-panel tr')[0].querySelectorAll('td')[3].innerText = '완료'
}

if (DBUpdated.en) {
    document.querySelectorAll('.announce-panel tr')[1].querySelectorAll('td')[3].innerText = '완료'
}

if (!DBUpdated.en || !DBUpdated.kr) {
    document.querySelector('.announce-panel').style.display = 'block'
}

var announceShowDetail = function () {
    var elm = document.getElementById('announce-detail')
    var toggleTable = ['block', 'none']
    elm.style.display = toggleTable[(toggleTable.indexOf(elm.style.display)+1)%2]
}