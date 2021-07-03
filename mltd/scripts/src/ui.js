
var removeConfig = function(event) {
    $(event.target).closest('li').remove();
}

var addConfig = function(event) {
    $(event.target).closest('ol').append('<li><button onclick="addConfig(event)">설정 추가</button></li>');
    event.target.outerHTML = `
    <button onclick="removeConfig(event)">설정 제거</button>

    <div><input type="number" name="appliedDays" class="days" value="0">일간 이 설정 적용</div>

    <div>통상곡을 플레이할 때, 추천곡으로 플레이 (점수와 재화 획득량 1.2배) <input type="checkbox" id="playRecommend" checked></div>

    <div>일반 라이브 - 티켓 라이브 루틴 설정: <br>
    일반 라이브 <input type="number" value="0" id="staminaRunQuota">회 플레이 후, <br>
    티켓 라이브 <input type="number" value="1" id="ticketRunQuota">회 플레이 반복
    </div>

    <div>일반 라이브 설정: 
        <select id="staminaRunDif">
            <option value="2m">2M</option>
            <option value="2mp">2M+</option>
            <option value="4m">4M</option>
            <option value="6m">6M</option>
            <option value="mm" selected>MM</option>
        </select>
        <select id="staminaRunMul">
            <option value="1">1배수</option>
            <option value="2" selected>2배수</option>
            <option value="3">3배수</option>
        </select>
    </div>

    <div>티켓 라이브 설정: 
        <select id="ticketRunDif">
            <option value="2m">2M</option>
            <option value="2mp">2M+</option>
            <option value="4m">4M</option>
            <option value="6m">6M</option>
            <option value="mm" selected>MM</option>
        </select>
        <select id="ticketRunMul">
            <option value="10">10배수</option>
            <option value="15" selected>15배수</option>
        </select>
    </div>

    <div>이벤트 라이브 설정: 
        <select id="eventRunDif">
            <option value="2m">2M</option>
            <option value="2mp">2M+</option>
            <option value="4m">4M</option>
            <option value="6m">6M</option>
            <option value="mm" selected>MM</option>
        </select>
        <select id="eventRunMul">
            <option value="1">1배수</option>
            <option value="2" selected>2배수</option>
            <option value="4">4배수</option>
        </select>
    </div>

    <div>스케줄 설정: 
        <select id="workDif">
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30" selected>30</option>
        </select>
        <select id="workMul">
            <option value="1">1배수</option>
            <option value="2" selected>2배수</option>
        </select>
    </div>

    <div>부스트 사용시 플레이 설정 (총 10회): <br>
        일반 라이브: 
        <select id="staminaRunBoostDif">
            <option value="2m">2M</option>
            <option value="2mp">2M+</option>
            <option value="4m">4M</option>
            <option value="6m">6M</option>
            <option value="mm" selected>MM</option>
        </select>
        <select id="staminaRunBoostMul">
            <option value="1">1배수</option>
            <option value="2">2배수</option>
            <option value="3" selected>3배수</option>
        </select>
        <input type="number" value="0" id="staminaRunBoostQuota">회<br>

        티켓 라이브: 
        <select id="ticketRunBoostDif">
            <option value="2m">2M</option>
            <option value="2mp">2M+</option>
            <option value="4m">4M</option>
            <option value="6m">6M</option>
            <option value="mm" selected>MM</option>
        </select>
        <select id="ticketRunBoostMul">
            <option value="10">10배수</option>
            <option value="15" selected>15배수</option>
        </select>
        <input type="number" value="10" id="ticketRunBoostQuota">회<br>

        이벤런: 
        <select id="eventRunBoostDif">
            <option value="2m">2M</option>
            <option value="2mp">2M+</option>
            <option value="4m">4M</option>
            <option value="6m">6M</option>
            <option value="mm" selected>MM</option>
        </select>
        <select id="eventRunBoostMul">
            <option value="1">1배수</option>
            <option value="2">2배수</option>
            <option value="4" selected>4배수</option>
        </select>
        <input type="number" value="0" id="eventRunBoostQuota">회<br>
    </div>`
}

var simulLog = '';
var doLog = true;

var m = function (str) {
    console.log(str);
    return false;
    
    if (doLog !== true) {
        return false;
    }
    
    simulLog += '\n' + str;
    
    return true;
};

var getTotalEventRun = function () {
    var i = 0;
    var evcnt = 0, lvcnt = 0, wkcnt = 0;
    console.log('worstCase:', worstCase);
    for (i = 1; i <= e.days; ++i) {
        console.log(`${i}일. 부스트: ${daily[i].playData.boost}회, 일반 라이브: ${daily[i].playData.staminaRun}회, 티켓 라이브: ${daily[i].playData.ticketRun}회, 이벤트 라이브: ${daily[i].playData.eventRun}회, 스케줄: ${daily[i].playData.work}회, 점수${daily[i].playData.totalPoint}`);
        
        evcnt += daily[i].playData.eventRun;
        lvcnt += daily[i].playData.staminaRun + daily[i].playData.ticketRun;
        wkcnt += daily[i].playData.work;
    }
    console.log('일반곡 플레이 횟수:', lvcnt);
    console.log('스케줄 횟수:', wkcnt);
    console.log('이벤트곡 플레이 횟수:', evcnt);
};

var gett = function () {
    var i = 0;
    var a = 0, b = 0, c = 0, d = 0;
    for (i = 1; i <= e.days; ++i) {
        a += daily[i].time.live;
        b += daily[i].time.eventLive;
        c += daily[i].time.work;
        d += daily[i].time.etc;
    }
    console.log(a, b, c, d);
    console.log(a + c + d);
};

var showWait = function () {
    document.getElementById('pleaseWait').classList.add('show');
    document.getElementById('pleaseWait').classList.remove('hide');
}

var hideWait = function () {
    document.getElementById('pleaseWait').classList.add('hide');
    document.getElementById('pleaseWait').classList.remove('show');
}

// 결과 데이터를 정제하여 사용자에게 표시
var print = function (id) {
    //console.log("print");
    //console.log(JSON.parse(JSON.stringify(daily)));
    //console.log(simulLog);
    getTotalEventRun();
    gett();
    
    var s = '';
    
    for (var i = 1; i <= e.days; ++i) {
        if (i > 1) {
            s += ', ';
        }
        
        s += daily[i].playData.time;
    }
    
    console.log(s);
    
    
    var i = 1;
    var htmltxt = '';
    
    var stat = {
        playTime: {},
        norma: {},
        playerData: {},
        leftResources: {},
        affection: {},
        money: {},
        fan: {}
    };
        
    stat.playTime = {
        total: 0,
        live: 0,
        eventLive: 0,
        work: 0,
        etc: 0
    };
    
    for (i = 1; i <= e.days; ++i) {
        ['live', 'eventLive', 'work', 'etc'].forEach(function (name) {
            stat.playTime[name] += daily[i].time[name];
            stat.playTime.total += daily[i].time[name];
        });
    }
    
    stat.norma = {
        live: 0,
        eventLive: 0,
        work: 0,
    };
    
    for (i = 1; i <= e.days; ++i) {
        stat.norma.live += daily[i].playData.staminaRun + daily[i].playData.ticketRun;
        stat.norma.work += daily[i].playData.work;
        stat.norma.eventLive += daily[i].playData.eventRun;
    }
    
    stat.affection = {
        total: 0,
        live: 0,
        eventLive: 0,
        work: 0
    };
    
    stat.fan = {
        total: 0,
        live: 0,
        eventLive: 0,
        work: 0
    }
    
    stat.money = {
        total: 0,
        live: 0,
        eventLive: 0,
        work: 0
    }
    
    /*for (i = 1; i <= e.days; ++i) {
        stat.affection*/
    
    let totalValue = {
        affection: {
            total: 0,
            live: 0,
            eventLive: 0,
            work: 0,
        },
        fan: {
            total: 0,
            live: 0,
            eventLive: 0,
            work: 0,
        },
        money: {
            total: 0,
            live: 0,
            eventLive: 0,
            work: 0,
        },
    };

    for (i = 1; i <= e.days; ++i) {
        ['affection', 'fan', 'money'].forEach(function (name1) {
            daily[i][name1].total = 0;
            
            ['live', 'eventLive', 'work'].forEach(function (name2) {
                daily[i][name1].total += daily[i][name1][name2];
                totalValue[name1][name2] += daily[i][name1][name2];
                totalValue[name1].total += daily[i][name1][name2];
            });
        });
    }
    
    /*for (i = 1; i <= e.days; ++i) {
        htmltxt += '<hr>';
        htmltxt += '<div><p>' + i + '일차 결과</p>';
        htmltxt +=     '<p>플레이 타임: ' + playTime.total + '초</p>';
        htmltxt +=     '<p>--라이브: ' + (playTime.live + playTime.eventLive) + '초</p>';
        htmltxt +=     '<p>--스케줄: ' + playTime.work + '초</p>';
        htmltxt +=     '<p>--기타: ' + playTime.etc + '초</p>';
        htmltxt +=     '<p>라이브 횟수: ' + daily[i].playData.staminaRun + '회</p>';
        htmltxt +=     '<p>스케줄 횟수: ' + daily[i].playData.work + '회</p>';
        htmltxt +=     '<p>획득 친애도: ' + daily[i].affection.total + '</p>';
        htmltxt +=     '<p>--라이브: ' + daily[i]
    }*/
    htmltxt += '<hr>';
    htmltxt += `<p>추천하는 부스트 사용 루틴:<br>일반 라이브 ${daily[e.days].initialQuota.boost.staminaRun}회 /
    티켓 라이브 ${daily[e.days].initialQuota.boost.ticketRun}회 /
    이벤트 라이브 ${daily[e.days].initialQuota.boost.eventRun}회</p>`
    htmltxt += '<p>최종 점수: ' + daily[e.days].playData.totalPoint + 'pt</p>'
    htmltxt += '<p>일평균 플레이 타임: ' + secToTime(stat.playTime.total / e.days) + '</p>';
    if (daily[e.days].jwl >= 0)
        htmltxt += '<p>쥬엘: <span style="color: #A3CCA3">' + daily[e.days].jwl + '개 남음</span></p>';
    else
        htmltxt += '<p>쥬엘: <span style="color: red">' + (-daily[e.days].jwl) + '개 부족</span></p>';
    
    htmltxt += '<p>최종 레벨/경험치: ' + daily[e.days].level + ' / ' + daily[e.days].exp + '</p>';

    htmltxt += '<p>일반/티켓 라이브 횟수: ' + stat.norma.live +'회</p>';
    htmltxt += '<p>이벤트 라이브 횟수: ' + stat.norma.eventLive + '회</p>';
    htmltxt += '<p>스케줄 횟수: ' + stat.norma.work + '회</p>';

    htmltxt += '<p>총 플레이 타임: ' + secToTime(stat.playTime.total) + '</p>';
    htmltxt += '<p>--라이브: ' + secToTime(stat.playTime.live + stat.playTime.eventLive) + '</p>';
    htmltxt += '<p>--스케줄: ' + secToTime(stat.playTime.work) + '</p>';
    htmltxt += '<p>--기타: ' + secToTime(stat.playTime.etc) + '</p>';

    htmltxt += '<p>획득 친애도: ' + totalValue.affection.total + '</p>';
    htmltxt += '<p>--라이브: ' + (totalValue.affection.live + totalValue.affection.eventLive) + '</p>';
    htmltxt += '<p>--스케줄: ' + (totalValue.affection.work) + '</p>';

    htmltxt += '<p>획득 머니: ' + totalValue.money.total + '</p>';
    htmltxt += '<p>--라이브: ' + (totalValue.money.live + totalValue.money.eventLive) + '</p>';
    htmltxt += '<p>--스케줄: ' + (totalValue.money.work) + '</p>';

    htmltxt += '<p>획득 팬: ' + totalValue.fan.total + '</p>';
    htmltxt += '<p>--라이브: ' + (totalValue.fan.live + totalValue.fan.eventLive) + '</p>';
    htmltxt += '<p>--스케줄: ' + (totalValue.fan.work) + '</p>';

    htmltxt += '<p>10 드링크: ' + daily[e.days].drink10 + '개 남음</p>';
    htmltxt += '<p>20 드링크: ' + daily[e.days].drink20 + '개 남음</p>';
    htmltxt += '<p>30 드링크: ' + daily[e.days].drink30 + '개 남음</p>';
    htmltxt += '<p>맥스 드링크류: ' + daily[e.days].mdrink + '개 남음</p>';

    htmltxt += '<p>스태미너: ' + daily[e.days].stamina + ' 남음</p>';
    htmltxt += '<p>티켓: ' + daily[e.days].ticket + '개 남음</p>';
    htmltxt += '<p>재화: ' + daily[e.days].item + '개 남음</p>';
    
    document.getElementById(id).innerHTML = htmltxt;
}

var secToTime = function (sec) {
    let h, m, s;
    sec = parseInt(sec, 10);

    h = parseInt(sec / 3600, 10);
    sec %= 3600;
    m = parseInt(sec / 60, 10);
    sec %= 60;
    s = sec;

    return `${h}시간 ${m}분 ${s}초`;
}
