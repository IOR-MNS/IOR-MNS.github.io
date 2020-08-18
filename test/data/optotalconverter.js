// opTotal

var convertOldIDToNewID = function () {
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

if (JSON.parse(localStorage.getItem('version_optotal_localStorage') || '1') < db.idVersion.op) {
    console.log('오퍼레이터 ID 체계 최신화 수행')
    convertOldIDToNewID()
}
