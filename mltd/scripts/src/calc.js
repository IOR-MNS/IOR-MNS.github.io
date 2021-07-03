/*
    성능 최적화보단, 최대한 이해하기 쉽고 유지보수하기 간단하도록
    직관적이고 단순하게 만들 생각임.
*/

var t1 = 0, t2 = 0; // 성능 측정을 위한 임시 변수
var trd = { // 성능 측정을 위한 변수: 각 파트별로 성능 측정
    init: [], // 초기화 과정
    calc: [], // 계산 과정
    gd: [] // ?
};

//var clearDailyMission_ = false; // 일일미션 클리어 여부
var dailyPlaytime = -1; // 1차 시뮬 돌린 후 산정된 총플탐을 일수로 나눈 값.
var preserveItemForBoost = false; // 부스트 루틴에 이벤런이 포함된 경우, 부스트를 사용하기 위한 조건을
                                  // 충족하기 위해 이벤트 재화를 모아둔다.
var daily = []; // 일일 데이터 리스트. 각 날마다 모든 데이터(플레이어 데이터, 점수 데이터, 플탐 데이터 등)를 따로 저장한다.
                // 다음날은 전날의 데이터를 이어받아서 계산을 수행하게 된다.
var day = 0; // 일일 데이터 객체 배열의 인덱스.

var targetPoint = 0; // 최종 목표 점수
var isBoost = false; // 부스트 사용 여부
var tabStatus = 'live'; // 탭 상태. 'live' / 'work' 둘 중 하나의 값.
var MAX_TICKET = 500; // 최대 티켓 소지량

var worstCase = true; // 시뮬레이션 방식 설정(최악의 경우: 시작부터 최대한 달리는 경우, 평균적 경우: 매일 일정 점수 쌓는 경우)

var recvItem = false,
    recvBoost = false,
    recvDailyMission = false;

// 입력 데이터를 정제하여 여러 변수에 저장.
var init = function () {
    //m('init');
    t1 = Date.now(); // 시작 시간 기록
    
    // 재화, 부스트, 일일미션 수령 여부
    recvItem = document.getElementById('recvItem').checked;
    recvBoost = document.getElementById('recvBoost').checked;
    recvDailyMission = document.getElementById('recvDailyMission').checked;
    //clearDailyMission_ = document.getElementById('clearDailyMission_').checked;
    
    // e, 이벤트 데이터
    getEventData();
    
    // f, 기초 데이터
    setFundamentalData();
    
    // t, 시간 데이터
    getTimeData();
    
    // targetPoint, 목표 점수
    getTargetPoint();
    
    // daily, 일일 데이터 객체 배열
    getDailyData();
    
    day = 0; // 최초 일수는 0으로 설정. 모든 일일 데이터의 기본 바탕이 되는 데이터.
    isBoost = false; // 현재 부스트 사용중인지 나타내는 플래그
    preserveItemForBoost = false; // 부스트에 쓰기 위해 재화를 아끼는 중인지 나타내는 플래그
    tabStatus = 'live'; // 현재 탭을 나타내는 변수
    MAX_TICKET = 500; // 최대 티켓 소지량: 500
    MAX_BOOST = 2; // 최대 부스트 소지량: 2
    
    // 성능 측정: 초기화 과정
    trd.init.push(Date.now() - t1);
};

// 이벤트 데이터 가져오기
var getEventData = function () {
    e.type = document.getElementById('eventType').value; // 이벤트 유형
    e.days = Number(document.getElementById('days').value); // 이벤트 일수
    e.start = Number(document.getElementById('playStart_hour').value) * 60 * 60 + Number(document.getElementById('playStart_min').value) * 60; // 이벤트 시작 시각
    e.end = Number(document.getElementById('playEnd_hour').value) * 60 * 60 + Number(document.getElementById('playEnd_min').value) * 60; // 이벤트 종료 시각
    e.refreshTime = Number(document.getElementById('refreshTime_hour').value) * 60 * 60; // 리프레시 시간
    
    //m('이벤트 데이터 수집 완료:')
    //m(JSON.stringify(e));
};

// 시간 데이터 가져오기
var getTimeData = function () {
    t.useDrink = Number(document.getElementById('timeData_useDrink').value);
    t.useJwl = Number(document.getElementById('timeData_useJwl').value);
    
    t.doWork = Number(document.getElementById('timeData_doWork').value);
    t.doLive = Number(document.getElementById('timeData_doLive').value);
    t.doEventLive = Number(document.getElementById('timeData_doEventLive').value);
    
    t.goWorkTab = Number(document.getElementById('timeData_goWorkTab').value);
    t.goLiveTab = Number(document.getElementById('timeData_goLiveTab').value);
    
    //m('시간 데이터 수집 완료:');
    //m(JSON.stringify(t));
};

// 목표 포인트 가져오기
var getTargetPoint = function () {
    targetPoint = Number(document.getElementById('playerData_target').value);
    
    //m('목표 포인트 수집 완료: ' + targetPoint);
};

// 이벤트 데이터 저장 변수
var e = {
    type: '', // 이벤트 종류 (시어터 / 투어 / --1주년-- / --2주년-- / 3주년)
    start: 0, // 플레이 시작시각 (이벤트 종류에 따라서 기본값 설정)
    end: 0,   // 플레이 종료시각 (이벤트 종류에 따라서 기본값 설정)
    days: 0, // 플레이 일수. 이것이 daily array의 길이를 결정한다. (daily.length == days + 1) (0번 인덱스는 초기 상태 보존용이므로)
    refreshTime: 0, // 리프레시 시간 (강제 휴식 시간). n주년 이벤트인 경우 존재함. 나머지의 경우에는 0초.
};

// 시간 데이터 저장 변수
var t = {
    useDrink: 0,
    useJwl: 0,
    
    doWork: 0,
    doLive: 0,
    doEventLive: 0,
    
    goWorkTab: 0,
    goLiveTab: 0,
};

// 기초 데이터 저장 변수
var f = {
    live: {
        dif2m: {},
        dif2mp: {},
        dif4m: {},
        dif6m: {},
        difmm: {}
    },
    eventLive: {
        dif2m: {},
        dif2mp: {},
        dif4m: {},
        dif6m: {},
        difmm: {}
    },
    work: {
        dif15: {},
        dif20: {},
        dif25: {},
        dif30: {},
    }
};

// 기초 데이터 세팅
var setFundamentalData = function () {
    // 모든 타입 공통. 이벤트 타입에 따라 변경되는 항목은 0으로 초기화.
    f.live.dif2m.cons = 15;
    f.live.dif2m.fan = 60;
    f.live.dif2m.money = 630;
    f.live.dif2m.affection = 12;
    f.live.dif2m.exp = 150;
    
    f.live.dif2mp.cons = 25;
    f.live.dif2mp.fan = 100;
    f.live.dif2mp.money = 1200;
    f.live.dif2mp.affection = 24;
    f.live.dif2mp.exp = 260;
    
    f.live.dif4m.cons = 20;
    f.live.dif4m.fan = 78;
    f.live.dif4m.money = 900;
    f.live.dif4m.affection = 18;
    f.live.dif4m.exp = 204;
    
    f.live.dif6m.cons = 25;
    f.live.dif6m.fan = 97;
    f.live.dif6m.money = 1200;
    f.live.dif6m.affection = 24;
    f.live.dif6m.exp = 260;
    
    f.live.difmm.cons = 30;
    f.live.difmm.fan = 120;
    f.live.difmm.money = 1350;
    f.live.difmm.affection = 30;
    f.live.difmm.exp = 306;
    
    f.eventLive = JSON.parse(JSON.stringify(f.live));
    
    f.work.dif15.cons = 15;
    f.work.dif15.point = 0;
    f.work.dif15.item = 0;
    f.work.dif15.fan = 30;
    f.work.dif15.money = 473;
    f.work.dif15.affection = 7;
    f.work.dif15.exp = 108;
    f.work.dif15.ticket = 0;
    
    f.work.dif20.cons = 20;
    f.work.dif20.point = 0;
    f.work.dif20.item = 0;
    f.work.dif20.fan = 40;
    f.work.dif20.money = 630;
    f.work.dif20.affection = 9;
    f.work.dif20.exp = 143;
    f.work.dif20.ticket = 0;
    
    f.work.dif25.cons = 25;
    f.work.dif25.point = 0;
    f.work.dif25.item = 0;
    f.work.dif25.fan = 50;
    f.work.dif25.money = 788;
    f.work.dif25.affection = 11;
    f.work.dif25.exp = 179;
    f.work.dif25.ticket = 0;
    
    f.work.dif30.cons = 30;
    f.work.dif30.point = 0;
    f.work.dif30.item = 0;
    f.work.dif30.fan = 60;
    f.work.dif30.money = 945;
    f.work.dif30.affection = 15;
    f.work.dif30.exp = 215;
    f.work.dif30.ticket = 0;
    
    if (e.type == 'theater' || e.type == '3rd' || e.type == '4th') { // 시어터 타입
        f.live.dif2m.point = 35;
        f.live.dif2m.item = 35;
        
        f.live.dif2mp.point = 62;
        f.live.dif2mp.item = 62;
        
        f.live.dif4m.point = 49;
        f.live.dif4m.item = 49;
        
        f.live.dif6m.point = 64;
        f.live.dif6m.item = 64;
        
        f.live.difmm.point = 85;
        f.live.difmm.item = 85;
        
        f.eventLive.dif2m.cons = 180;
        f.eventLive.dif2mp.cons = 180;
        f.eventLive.dif4m.cons = 180;
        f.eventLive.dif6m.cons = 180;
        f.eventLive.difmm.cons = 180;
        
        f.eventLive.dif2m.point = 537;
        f.eventLive.dif2mp.point = 537;
        f.eventLive.dif4m.point = 537;
        f.eventLive.dif6m.point = 537;
        f.eventLive.difmm.point = 537;
        
        f.work.dif20.ticket = 20;
        f.work.dif25.ticket = 25;
        f.work.dif30.ticket = 30;
    }
    else if (e.type == 'tour') { // 투어 타입
        f.live.dif2m.point = 70;
        f.live.dif2m.item = 3;
        
        f.live.dif2mp.point = 116;
        f.live.dif2mp.item = 5;
        
        f.live.dif4m.point = 93;
        f.live.dif4m.item = 4;
        
        f.live.dif6m.point = 116;
        f.live.dif6m.item = 5;
        
        f.live.difmm.point = 140;
        f.live.difmm.item = 6;
        
        f.eventLive.dif2m.cons = 20;
        f.eventLive.dif2mp.cons = 20;
        f.eventLive.dif4m.cons = 20;
        f.eventLive.dif6m.cons = 20;
        f.eventLive.difmm.cons = 20;
        
        f.eventLive.dif2m.point = 720;
        f.eventLive.dif2mp.point = 720;
        f.eventLive.dif4m.point = 720;
        f.eventLive.dif6m.point = 720;
        f.eventLive.difmm.point = 720;
        
        f.work.dif15.point = 24;
        f.work.dif15.item = 3;
        
        f.work.dif20.point = 32;
        f.work.dif20.item = 4;
        
        f.work.dif25.point = 40;
        f.work.dif25.item = 5;
        
        f.work.dif30.point = 48;
        f.work.dif30.item = 6;
    }
    
    if (e.type == '3rd' || e.type == '4th') { // 주년 이벤이면, 이벤곡의 [경험치, 친애도, 팬, 머니] 획득량 2배
        ['dif2m', 'dif2mp', 'dif4m', 'dif6m', 'difmm'].forEach( function (dif) {
            ['exp', 'affection', 'fan', 'money'].forEach( function (name) {
                f.eventLive[dif][name] *= 2;
            });
        });
    }
    
    //m('기초 데이터 설정 완료:');
    //m(JSON.stringify(f));
};
// 각종 획득량을 설정
// 일반 획득량, 부스트시 획득량이 있음.
// 스태런이나 티켓런일 경우, 추천곡 플레이 여부에 따라 1.2배 적용 여부가 달라짐.
var setEarningData = function (obj) {
    var dif = '';
    var mul = 0;
    var extra = 1.0;
    
    if (obj.playRecommend == 1) { // 추천곡 플레이시, 스태런과 티켓런의 점수/재화 획득량 1.2배.
        extra = 1.2;
    }
    
    // 일반 라이브
    // staminaRun
    dif = 'dif' + obj.staminaRun.dif;
    mul = obj.staminaRun.mul;
    
    obj.staminaRun.earning.point    = Math.ceil(mul * extra * f.live[dif].point);
    obj.staminaRun.earning.item     = obj.staminaRun.earning.point;
    obj.staminaRun.earning.fan      = f.live[dif].fan;
    obj.staminaRun.earning.money    = f.live[dif].money;
    obj.staminaRun.earning.affection= f.live[dif].affection;
    obj.staminaRun.earning.exp      = f.live[dif].exp;
    
    // 부스트 사용중 일반 라이브
    // staminaRun.boost
    dif = 'dif' + obj.staminaRun.boost.dif;
    mul = obj.staminaRun.boost.mul;
    
    obj.staminaRun.boost.earning.point      = 2 * Math.ceil(mul * extra * f.live[dif].point);
    obj.staminaRun.boost.earning.item       = obj.staminaRun.boost.earning.point;
    obj.staminaRun.boost.earning.fan        = f.live[dif].fan;
    obj.staminaRun.boost.earning.money      = f.live[dif].money;
    obj.staminaRun.boost.earning.affection  = f.live[dif].affection;
    obj.staminaRun.boost.earning.exp        = f.live[dif].exp;
    
    // 티켓 라이브
    // ticketRun
    dif = 'dif' + obj.ticketRun.dif;
    mul = obj.ticketRun.mul;
    
    obj.ticketRun.earning.point     = Math.ceil(0.7 * mul * extra * f.live[dif].point);
    obj.ticketRun.earning.item      = obj.ticketRun.earning.point;
    obj.ticketRun.earning.fan       = parseInt (0.5 * mul * f.live[dif].fan, 10);
    obj.ticketRun.earning.money     = 0;
    obj.ticketRun.earning.affection = parseInt (0.5 * mul * f.live[dif].affection, 10);
    obj.ticketRun.earning.exp       = 0;
    
    // 부스트 사용중 티켓 라이브
    // ticketRun.boost
    dif = 'dif' + obj.ticketRun.boost.dif;
    mul = obj.ticketRun.boost.mul;
    
    obj.ticketRun.boost.earning.point     = 2 * Math.ceil(0.7 * mul * extra * f.live[dif].point);
    obj.ticketRun.boost.earning.item      = obj.ticketRun.boost.earning.point;
    obj.ticketRun.boost.earning.fan       = parseInt(0.5 * mul * f.live[dif].fan, 10);
    obj.ticketRun.boost.earning.money     = 0;
    obj.ticketRun.boost.earning.affection = parseInt(0.5 * mul * f.live[dif].affection, 10);
    obj.ticketRun.boost.earning.exp       = 0;
    
    // 이벤트 라이브
    // eventRun
    dif = 'dif' + obj.eventRun.dif;
    mul = obj.eventRun.mul;
    
    obj.eventRun.earning.point    = mul * f.eventLive[dif].point;
    obj.eventRun.earning.item     = 0;
    obj.eventRun.earning.fan      = f.eventLive[dif].fan;
    obj.eventRun.earning.money    = f.eventLive[dif].money;
    obj.eventRun.earning.affection= f.eventLive[dif].affection;
    obj.eventRun.earning.exp      = f.eventLive[dif].exp;
    
    // 부스트 사용중 이벤트 라이브
    // eventRun.boost
    dif = 'dif' + obj.eventRun.boost.dif;
    mul = obj.eventRun.boost.mul;
    
    obj.eventRun.boost.earning.point    = 2 * Math.ceil(mul * f.eventLive[dif].point);
    obj.eventRun.boost.earning.item     = 0;
    obj.eventRun.boost.earning.fan      = f.eventLive[dif].fan;
    obj.eventRun.boost.earning.money    = f.eventLive[dif].money;
    obj.eventRun.boost.earning.affection= f.eventLive[dif].affection;
    obj.eventRun.boost.earning.exp      = f.eventLive[dif].exp;
    
    // 스케줄
    // work
    dif = 'dif' + obj.work.dif;
    mul = obj.work.mul;
    
    obj.work.earning.point    = mul * f.work[dif].point;
    obj.work.earning.item     = mul * f.work[dif].item;
    obj.work.earning.ticket   = mul * f.work[dif].ticket;
    obj.work.earning.fan      = f.work[dif].fan;
    obj.work.earning.money    = f.work[dif].money;
    obj.work.earning.affection= f.work[dif].affection;
    obj.work.earning.exp      = f.work[dif].exp;
};

// 플레이어 데이터 수집
var getPlayerData = function (obj) {
    ['boost', 'level', 'exp', 'stamina', 'ticket', 'item', 'drink10', 'drink20', 'drink30', 'mdrink', 'jwl', 'staminaUsage'].forEach( function (name) {
        obj[name] = Number(document.getElementById('playerData_' + name).value);
    });
};

// 일일 데이터 설정
var getDailyData = function () {
    t2 = Date.now();
    
    
    // --각 설정 항목(li 요소)을 순회하며, 각 항목에 명시된 적용 일수만큼 연속하여 설정--
    // 일단은 설정 항목을 1개로 고정.
    let i = 0;
    let configList = document.querySelectorAll('#dailyInputForm') // 일단은 설정 항목을 1개로 고정.
    configList.forEach(li => {
        //if (li.querySelector('[name="appliedDays"]') == null) return; // 실제 설정 항목이 아니면 스킵
        //let appliedDays = Number(li.querySelector('[name="appliedDays"]').value)
        let appliedDays = e.days; // 일단은 설정 항목을 1개로 고정.
        for (let j = 0; j < appliedDays; j++) {
            // 일수 증가
            ++i;
    
            // 일수 초과시, 에러 띄우고 중지.
            if (i > e.days) {
                alert('입력값 오류: 설정 적용 일수를 다시 한번 확인해주세요. 이벤트 진행 일수보다 길게 설정되었습니다.');
                return;
            }
    
            // 기초 토대가 되는 데이터 객체 생성
            // 일단 1일차부터 쭉 설정한 뒤, 인덱스 0에다가 1일차 최초 데이터를 복사해서 보존.
            let obj = {
                playRecommend: 0, // 1: 추천곡(1.2배)으로 플레이함.  0: 추천곡 플레이 하지 않음.
                
                staminaRun: {
                    earning: {
                        point: 0,
                        item: 0,
                        fan: 0,
                        money: 0,
                        affection: 0,
                        exp: 0
                    },
                    
                    mul: 0, // 배수
                    dif: '', // 난이도
                    cons: 0, // 소모량
                    
                    boost: {
                        earning: {
                            point: 0,
                            item: 0,
                            fan: 0,
                            money: 0,
                            affection: 0,
                            exp: 0
                        },
                        
                        mul: 0,
                        dif: '',
                        cons: 0
                    }
                },
                
                ticketRun: {
                    earning: {
                        point: 0,
                        item: 0,
                        fan: 0,
                        money: 0,
                        affection: 0
                    },
                    
                    mul: 0,
                    dif: '',
                    cons: 0,
                    
                    boost: {
                        earning: {
                            point: 0,
                            item: 0,
                            fan: 0,
                            money: 0,
                            affection: 0
                        },
                        
                        mul: 0,
                        dif: '',
                        cons: 0
                    }
                },
                
                work: {
                    earning: {
                        ticket: 0,
                        fan: 0,
                        money: 0,
                        affection: 0,
                        exp: 0
                    },
                    
                    mul: 0,
                    dif: '',
                    cons: 0
                },
                
                eventRun: {
                    earning: {
                        point: 0,
                        fan: 0,
                        money: 0,
                        affection: 0,
                        exp: 0
                    },
                    
                    mul: 0,
                    dif: '',
                    cons: 0,
                    
                    boost: {
                        earning: {
                            point: 0,
                            fan: 0,
                            money: 0,
                            affection: 0,
                            exp: 0
                        },
                        
                        mul: 0,
                        dif: '',
                        cons: 0
                    }
                },
                
                totalEventTime: 0, // 오늘의 이벤트 진행 기간 (초 단위) (첫날이랑 마지막 날에 바뀜)
                
                time: { // staminaRun + ticketRun == live / eventLive / 스케줄 == work / 이동 + 드링 사용 + ... == etc
                    live: 0,
                    eventLive: 0,
                    work: 0,
                    etc: 0
                },
                
                /* **** 이 부분은 다음 날로 이동시 어느정도 가져가야 함. **** */
                boost: 0, // 부스트는, 다음 날 휴식하게 되는 것을 반영해서 1 증가
                level: 0, // 레벨은 그대로
                exp: 0, // 경험치도 그대로
                stamina: 0, // 스태미너는, 자연회복분을 반영(자연 회복분은, 날마다 24시간 기준으로 한꺼번에 반영하는 방식)
                ticket: 0, // 티켓은 그대로
                item: 0, // 재화도 그대로
                drink10: 0, // 드링크류, 쥬얼도 그대로
                drink20: 0,
                drink30: 0,
                mdrink: 0,
                jwl: 0,
                /* ********** */
                
                fan: {
                    work: 0,
                    live: 0,
                    eventLive: 0
                },
                
                money: {
                    work: 0,
                    live: 0,
                    eventLive: 0
                },
                
                affection: {
                    work: 0,
                    live: 0,
                    eventLive: 0
                },
                
                maxTime: 0, // 오늘 플탐 상한 (초 단위)
                
                playData: {
                    targetPoint: 0, // 오늘 목표 점수
                    
                    time: 0, // 오늘의 플탐 (초 단위)
                    totalPoint: 0,// 오늘 점수 (오늘 획득한 점수가 아니라, 그냥 전체누적총점)
                    
                    work: 0, // 스케줄 횟수
                    staminaRun: 0, // 스태런 횟수
                    ticketRun: 0, // 티켓런 횟수
                    eventRun: 0, // 이벤런 횟수
                    
                    boost: 0 // 부스트 사용 횟수
                },
                
                initialQuota: { // 초기 할당량. leftQuota 소진시 초기화하기 위해 보존해두는 데이터.
                    staminaRun: 0,
                    ticketRun: 0,
                    eventRun: 0,
                    
                    boost: {
                        staminaRun: 0,
                        ticketRun: 0,
                        eventRun: 0
                    }
                },
                
                leftQuota: { // 가중치대로 플레이하기 위해, 임시 변수로 할당량 부분을 저장.
                    staminaRun: 0, // 처음에는 가중치대로 값 설정. 한번 플레이할 때마다 값을 1씩 감소.
                    ticketRun: 0, // 값이 0 초과인 것을 플레이. 모두 값이 0으로 변하면, 다시 가중치대로 값 설정.
                    eventRun: 0,
                    
                    boost: { // 부스트 할당량.
                        staminaRun: 0,
                        ticketRun: 0,
                        eventRun: 0
                    }
                }
            };
    
            // 추천곡 플레이 여부
            obj.playRecommend = Number(li.querySelector('[name="playRecommend"]').checked);
            
            // 스태런 설정
            obj.staminaRun.mul = Number(li.querySelector('[name="staminaRunMul"]').value);
            obj.staminaRun.dif = li.querySelector('[name="staminaRunDif"]').value;
            obj.staminaRun.cons = obj.staminaRun.mul * f.live['dif' + obj.staminaRun.dif].cons;
            
            obj.staminaRun.boost.mul = Number(li.querySelector('[name="staminaRunBoostMul"]').value);
            obj.staminaRun.boost.dif = li.querySelector('[name="staminaRunBoostDif"]').value;
            obj.staminaRun.boost.cons = obj.staminaRun.boost.mul * f.live['dif' + obj.staminaRun.boost.dif].cons;
            
            // 티켓런 설정
            obj.ticketRun.mul = Number(li.querySelector('[name="ticketRunMul"]').value);
            obj.ticketRun.dif = li.querySelector('[name="ticketRunDif"]').value;
            obj.ticketRun.cons = obj.ticketRun.mul * f.live['dif' + obj.ticketRun.dif].cons;
            
            obj.ticketRun.boost.mul = Number(li.querySelector('[name="ticketRunBoostMul"]').value);
            obj.ticketRun.boost.dif = li.querySelector('[name="ticketRunBoostDif"]').value;
            obj.ticketRun.boost.cons = obj.ticketRun.boost.mul * f.live['dif' + obj.ticketRun.boost.dif].cons;
            
            // 이벤런 설정
            obj.eventRun.mul = Number(li.querySelector('[name="eventRunMul"]').value);
            obj.eventRun.dif = li.querySelector('[name="eventRunDif"]').value;
            obj.eventRun.cons = obj.eventRun.mul * f.eventLive['dif' + obj.eventRun.dif].cons;
            
            obj.eventRun.boost.mul = Number(li.querySelector('[name="eventRunBoostMul"]').value);
            obj.eventRun.boost.dif = li.querySelector('[name="eventRunBoostDif"]').value;
            obj.eventRun.boost.cons = obj.eventRun.boost.mul * f.eventLive['dif' + obj.eventRun.boost.dif].cons;
            
            // 스케줄 설정
            obj.work.mul = Number(li.querySelector('[name="workMul"]').value);
            obj.work.dif = li.querySelector('[name="workDif"]').value;
            obj.work.cons = obj.work.mul * f.work['dif' + obj.work.dif].cons;
            
            // 획득량 설정
            setEarningData(obj);
            
            // totalEventTime 계산
            // 첫날, 막날만 따로 계산. 나머지 날은 고정 적용.(24시간이라든지, 15시간이라든지)
    
            if (i == 1) { // 첫날
                obj.totalEventTime = (24 * 60 * 60) - e.start;
                
                if (recvBoost == false) {
                    obj.totalEventTime -= e.refreshTime; // 아직 부스트 받지 않았다면, 휴식시간 반영
                }
            }
            else if (i == e.days) { // 막날
                obj.totalEventTime = e.end
                if (e.type != '4th') // (4주년: 마지막 날에 리프레시 없으므로 차감하지 않음)
                    obj.totalEventTime -= e.refreshTime;
            }
            else { // 중간
                obj.totalEventTime = (24 * 60 * 60) - e.refreshTime;
            }
            
            if (obj.totalEventTime < 0) {
                obj.totalEventTime = 0;
            }
            
            // time 속성은 놔둠
            
            // boost, ... , jwl 등 플레이어 데이터 가져오기
            getPlayerData(obj);
            
            // fan, ... , affection 속성은 놔둠
            
            // maxTime, playData.targetPoint, playData.totalPoint 가져오기
            // 플탐 평탄화를 위해, maxTime과 dailyPlaytime을 연관짓는 코드. 지금 버전에서는 사용하지 않음.
            /*
            if (dailyPlaytime < 0 || i == e.days) {
                obj.maxTime = obj.totalEventTime;
            }
            else {
                obj.maxTime = dailyPlaytime;
            }
            
            if (obj.maxTime > obj.totalEventTime) {
                obj.maxTime = obj.totalEventTime;
            }
            */
            // 최대플탐=물리적 가용시간으로 설정. 이렇게 하면 초반부에 물리적 가용시간을 모두 사용해 매우 빡세게 돌렸을 때의 결과가 도출됨.
            // 그런 결과는, 현실적으로 가능한 최악의 쥬엘 소모값을 가지므로, 유저가 어떻게 돌리든간에 결과값보다 쥬엘을 많이 소모할 일이 없을 것임.
            obj.maxTime = obj.totalEventTime;
            obj.playData.totalPoint = Number(document.querySelector('#playerData_point').value);

            if (worstCase == true) {
                obj.playData.targetPoint = targetPoint;
            }
            else {
                obj.playData.targetPoint = obj.playData.totalPoint + i * Math.ceil((targetPoint - obj.playData.totalPoint) / e.days);
            }
            // initialQuota 가져오기
            obj.initialQuota.staminaRun = Number(li.querySelector('[name="staminaRunQuota"]').value);
            obj.initialQuota.ticketRun = Number(li.querySelector('[name="ticketRunQuota"]').value);
            obj.initialQuota.eventRun = (obj.eventRun.mul == 0 ? 0 : 'Infinity'); // 넘버형 Infinity로 쓰면, stringify할 때 손실되므로.
                                                                                  // 이렇게 해도, 산술연산이나 비교연산시 (상대가 넘버형이면) 자동변환되므로 문제 없음.
            obj.initialQuota.boost.staminaRun = Number(li.querySelector('[name="staminaRunBoostQuota"]').value);
            obj.initialQuota.boost.ticketRun = Number(li.querySelector('[name="ticketRunBoostQuota"]').value);
            obj.initialQuota.boost.eventRun = Number(li.querySelector('[name="eventRunBoostQuota"]').value);
            
            // leftQuota 세팅
            obj.leftQuota = JSON.parse(JSON.stringify(obj.initialQuota));
            
            // 일일 데이터 객체 배열에 깊은 복사
            daily[i] = JSON.parse(JSON.stringify(obj));
            
            console.log(i + '일차 데이터 기본 설정 완료:');
            //m(i + '일차 데이터 기본 설정 완료:');
            //m(JSON.stringify(daily[i]));
        }
    });
    
    // 모든 일일 데이터가 제대로 채워졌는지 확인
    if (daily[e.days] == undefined) {
        alert('입력값 오류: 설정 적용 일수를 다시 한번 확인해주세요. 이벤트 진행 일수보다 짧게 설정되었습니다.')
    }
    // 계산이 끝나고, 시작 시점과 종료 시점의 값을 비교할 때 사용할 수 있도록
    // 1일차 데이터, 즉 최초 시작 시점에서의 데이터를 0일차에 저장
    daily[0] = JSON.parse(JSON.stringify(daily[1]));

    // 성능 측정: 데이터 수집
    trd.gd.push(Date.now() - t2);
};

// 플탐 평탄화를 위한 기능: 일일 데이터 객체 배열의 저장/로드
/*
// 일일 데이터 객체 배열을 저장
var daily_backup = '';
var saveDaily = function () {
    daily_backup = JSON.stringify(daily);
};

// 일일 데이터 객체 배열을 로드
var loadDaily = function () {
    daily = JSON.parse(daily_backup);
    for (var i = 0; i < daily.length; ++i) {
        if (dailyPlaytime < 0 || i == e.days) {
            daily[i].maxTime = daily[i].totalEventTime;
        }
        else {
            daily[i].maxTime = dailyPlaytime;
        }
        
        if (daily[i].maxTime > daily[i].totalEventTime) {
            daily[i].maxTime = daily[i].totalEventTime;
        }
    }
};
*/

// 해당 레벨의 최대 스태미너 
var getMaxStamina = function () {
    var level = daily[day].level;
    
    if( level < 60 ) {
        return 60 + ( parseInt(level / 2, 10) );
    }

    else if( level < 150 ) {
        return 90 + ( parseInt(( level - 60 ) / 3, 10) );
    }

    else if( level < 426 ) {
        return 120 + ( parseInt(( level - 150 ) / 4, 10) );
    }

    else if( level < 586 ) {
        return 189 + ( parseInt(( level - 426 ) / 5, 10) );
    }

    // 700렙에 240 찍은 이후로 스태통이 늘어나지 않는다는 제보가 있다고 함
    else if( level < 700 ) {
        return 221 + ( parseInt(( level - 586 ) / 6, 10) );
    }

    else {
        return 240;
    }
};

// 레벨업 판정 및 처리
var checkExp = function () {
    var maxExp = 0;
    
    while (true) {
        maxExp = (daily[day].level * 100) - 50;
        if (daily[day].exp >= maxExp) {
            daily[day].exp -= maxExp;
            daily[day].level += 1;
            daily[day].stamina += getMaxStamina();
            
            //m('레벨업!: ' + daily[day].level + '(' + daily[day].exp + ')');
            //m('스태미너 회복됨!: ' + daily[day].stamina);
        }
        else {
            break;
        }
    }
};

// 그날의 총 플탐 갱신
var updatePlaytime = function (idx) {
    daily[idx].playData.time = daily[idx].time.live + daily[idx].time.eventLive + daily[idx].time.work + daily[idx].time.etc;
};

// 시간 / 할당량 체크
// * 지금 버전에서 할당량은 설정하지 않음
// 아직 남았으면 true, 완료했으면 false
var isNormaLeft = function () {
    // 부스트 사용중이라면, 무조건 true 반환
    if (isBoost) {
        //m('할당량 검사: 부스트 사용중이므로 통과');
        return true;
    }
    
    // 일일 최대 플탐 체크
    updatePlaytime(day);
    
    if (day != e.days && daily[day].playData.time >= daily[day].maxTime) {
        m('할당량 검사: 최대 플탐 초과로 탈락 (' + daily[day].playData.time + ', ' + daily[day].maxTime + ')');
        return false;
    }
    
    /*
    if (clearDailyMission_ === true && daily[day].playData.eventRun == 0) {
        //m('할당량 검사: clearDailyMission_ 설정되었으나 이벤런 돌린 적 없으므로 통과 (플탐은 초과 비허용, 점수는 초과 허용)');
        return true;
    }
    */
    
    if ((e.type == '3rd' || e.type == '4th') && daily[day].boost == MAX_BOOST) {
        //m('할당량 검사: 다음날 부스트 넘침을 막기 위해 통과 (플탐은 초과 비허용, 점수는 초과 허용)');
        return true;
    }
    
    //if (dailyPlaytime < 0) { // 일일 점수 체크는 1회차 시뮬에서만 작동. 2회차에서는 이미 시간 균등 분배가 되었으므로.
        // 일일 목표 점수 체크
        if (pointEstim() >= daily[day].playData.targetPoint) {
            m('할당량 검사: 일일 목표 점수 초과로 탈락 (' + pointEstim() + ', ' + daily[day].playData.targetPoint + ')');
            return false;
        }
    //}
    
    // 최종 목표 점수 체크.
    /*
    norma 함수에서, 최종 목표 점수 초과 검사를 할 때,
    최종 목표 점수에서 뒷날의 부스트로 얻게 될 점수를 뺀 값으로 검사하기.
    부스트는 정상적인 경우에서는 절대 중단되지 않도록 되어 있으므로(일별 최대플탐이 부스트 쓰는 시간보다 짧은 비정상적인 경우 등은 제외),
    아무리 못해도 부스트로 얻어지는 점수는 보장될 수밖에 없음.
    이 때문에, 이미 최종 목표 점수를 달성했어도 부스트를 사용할 수밖에 없음
    (사용자의 설정을 마음대로 바꿔버릴 수도 없는 노릇이고, 무엇보다도 이전에 수행했던 스태런/티켓런 대신 부스트를 활용하는 것이 더 효율적이기 때문에 개선해야만 함).
    따라서, 사용자의 설정을 따르면서도 가장 효율적으로 점수를 내려면, 이후에 최소한으로 보장되는 부스트 획득 점수를 미리 고려해야만 함.
    그래서 최종 목표 점수 초과 검사를 할 때, 훗날 부스트로 얻을 점수를 뺀 값으로 검사해야 함.
    */
    if (pointEstim() >= targetPoint - boostPointEstim()) {
        if (daily[day].leftQuota.eventRun > 0) {
            if (isBoost && daily[day].item >= daily[day].eventRun.boost.cons) {
                console.log('할당량 검사: 최종 목표 점수 초과 (' + pointEstim() + ', ' + (targetPoint - boostPointEstim()) + ')');
                console.log('최대 플탐이 다할 때까지 이벤트 재화 녹이기', daily[day].item);
                daily[day].initialQuota.staminaRun = 0;
                daily[day].initialQuota.ticketRun = 0;
                daily[day].leftQuota.staminaRun = 0;
                daily[day].leftQuota.ticketRun = 0;
                return true;
            }
            else if (daily[day].item >= daily[day].eventRun.cons) {
                console.log('할당량 검사: 최종 목표 점수 초과 (' + pointEstim() + ', ' + (targetPoint - boostPointEstim()) + ')');
                console.log('최대 플탐이 다할 때까지 이벤트 재화 녹이기', daily[day].item);
                daily[day].initialQuota.staminaRun = 0;
                daily[day].initialQuota.ticketRun = 0;
                daily[day].leftQuota.staminaRun = 0;
                daily[day].leftQuota.ticketRun = 0;
                return true;
            }
        }
        
        console.log('할당량 검사: 최종 목표 점수 초과로 탈락 (' + pointEstim() + ', ' + (targetPoint - boostPointEstim()) + ')');
        return false;
    }
    
    //m('할당량 검사: 통과');
    
    return true;
};

var boostPointEstim = function () {
    if (e.type != '3rd' && e.type != '4th') {
        return 0;
    }
    
    var i = 0;
    var pt = 0, it = 0;
    for (i = day + 1; i <= e.days; ++i) {
        pt += daily[i].initialQuota.boost.staminaRun * daily[i].staminaRun.boost.earning.point;
        it += daily[i].initialQuota.boost.staminaRun * daily[i].staminaRun.boost.earning.item;
        
        pt += daily[i].initialQuota.boost.ticketRun * daily[i].ticketRun.boost.earning.point;
        it += daily[i].initialQuota.boost.ticketRun * daily[i].ticketRun.boost.earning.item;
        
        pt += daily[i].initialQuota.boost.eventRun * daily[i].eventRun.boost.earning.point;
    }
    
    pt += parseInt(it / f.eventLive.difmm.cons, 10) * f.eventLive.difmm.point;
    
    return pt;
}

var pointEstim = function () {
    var est = daily[day].playData.totalPoint;
    est += parseInt(daily[day].item / f.eventLive.difmm.cons, 10) * f.eventLive.difmm.point;
    
    return est;
};

// 부스트 사용 가능하면 true 반환
var checkBoost = function () {
    
    if (e.type != "3rd" && e.type != '4th') { // 일단, 3주년에 대해서만 부스트 계산
        return false;
    }
    
    if (daily[day].boost <= 0) { // 부스트가 없다면 x
        return false;
    }
    
    if (isBoost) { // 이미 부스트 적용중이라면 x
        return false;
    }
    
    // 부스트 루틴에 이벤런이 있을 경우, 이벤트 재화가 충분할지 확인
    var requiredItem = daily[day].initialQuota.boost.eventRun * daily[day].eventRun.boost.cons;
    
    var expectedItem = daily[day].item;
    expectedItem += daily[day].initialQuota.boost.ticketRun * daily[day].ticketRun.boost.earning.item;
    expectedItem += daily[day].initialQuota.boost.staminaRun * daily[day].staminaRun.boost.earning.item;
    
    if (expectedItem < requiredItem) {
        preserveItemForBoost = true; // 재화가 부족하므로 모아야 함
        //m('부스트 루틴을 수행하기에 재화가 모자랄 것으로 예상됨: 재화 모으기 시작..');
        return false;
    }
    
    preserveItemForBoost = false; // 재화가 충분하므로 모을 필요 없음
    return true;
}

var useBoost = function () {
    if (checkBoost() == false) {
        return false;
    }
    
    // 부스트 활성화
    --daily[day].boost;
    isBoost = true;
    
    ++daily[day].playData.boost;
    
    //m('부스트 사용!  잔여 ' + daily[day].boost + '개');
    
    return true;
};

// 부스트 상태 확인
var checkBoostStatus = function () {
    if (daily[day].leftQuota.boost.ticketRun == 0 && daily[day].leftQuota.boost.eventRun == 0 && daily[day].leftQuota.boost.staminaRun == 0) {
        isBoost = false;
        
        daily[day].leftQuota.boost.ticketRun = daily[day].initialQuota.boost.ticketRun;
        daily[day].leftQuota.boost.eventRun = daily[day].initialQuota.boost.eventRun;
        daily[day].leftQuota.boost.staminaRun = daily[day].initialQuota.boost.staminaRun;
        
        //m('부스트 종료!');
    }
};

// 1회 플레이
// 플레이 했으면 true,
// 플레이 못했으면 false 반환
var doTicketRun = function () {
    checkQuota();
    
    var data = {};
    
    if (isBoost) {
        data = daily[day].ticketRun.boost;
        //m('현재 부스트 적용중!');
        if (daily[day].leftQuota.boost.ticketRun <= 0) {
            //m('doTicketRun: 부스트 할당량 끝남! 실행 금지');
            return false;
        }
    }
    else {
        data = daily[day].ticketRun;
        
        if (daily[day].leftQuota.ticketRun <= 0) {
            //m('doTicketRun: 일반 할당량 끝남! 실행 금지');
            return false;
        }
    }
    
    if (daily[day].ticket < data.cons) { // 필요량보다 티켓이 적다면 끝
        //m('doTicketRun: 티켓 모자람! 실행 금지');
        return false;
    }
    // 티켓런 1회 수행
    ++daily[day].playData.ticketRun;
    
    if (isBoost) {
        --daily[day].leftQuota.boost.ticketRun; // 부스트 할당량 1회 채웠음
        //m('doTicketRun: 남은 부스트 할당량 ' + daily[day].leftQuota.boost.ticketRun + '회');
        checkBoostStatus();
    }
    else {
        --daily[day].leftQuota.ticketRun; // 일반 할당량 1회 채웠음
        //m('doTicketRun: 남은 일반 할당량 ' + daily[day].leftQuota.ticketRun + '회');
    }
    
    //m('doTicketRun: 티켓런 수행 결과:');
    
    daily[day].playData.totalPoint += data.earning.point; // 점수 획득
    daily[day].item += data.earning.item; // 재화 획득
    
    daily[day].fan.live += data.earning.fan; // 팬 획득
    daily[day].money.live += data.earning.money; // 머니 획득
    daily[day].affection.live += data.earning.affection; // 친애도 획득
    
    /*m('point: ' + daily[day].playData.totalPoint + '(+' + data.earning.point + ')');
    //m('item: ' + daily[day].item + '(+' + data.earning.item + ')');
    //m('fan.live: ' + daily[day].fan.live + '(+' + data.earning.fan + ')');
    //m('money.live: ' + daily[day].money.live + '(+' + data.earning.money + ')');
    //m('affection.live: ' + daily[day].affection.live + '(+' + data.earning.affection + ')');*/
    
    // 시간 반영
    if (tabStatus != 'live') {
        daily[day].time.etc += t.goLiveTab;
        //m('스케줄 탭에서 라이브 탭으로 이동했었음!');
        //m('time.etc: ' + daily[day].time.etc + '(+' + t.goLiveTab + ')');
    }
    daily[day].time.live += t.doLive;
    
    //m('affection.live: ' + daily[day].time.live + '(+' + t.doLive + ')');
    
    tabStatus = 'live';
    
    // 티켓 소모
    daily[day].ticket -= data.cons;
    
    //m('ticket: ' + daily[day].ticket + '(-' + data.cons + ')');
    
    return true;
};

// 1회 플레이
// 플레이 했으면 true,
// 플레이 못했으면 false 반환
var doEventRun = function () {
    checkQuota();
    
    var data = {};
    
    if (isBoost) {
        data = daily[day].eventRun.boost;
        //m('현재 부스트 적용중!');
        if (daily[day].leftQuota.boost.eventRun <= 0) {
            //m('doEventRun: 부스트 할당량 끝남! 실행 금지');
            return false;
        }
    }
    else {
        data = daily[day].eventRun;
        
        if (daily[day].leftQuota.eventRun <= 0) {
            return false;
        }
        
        if (preserveItemForBoost == true) {
            //m('doEventRun: 부스트를 위해 재화 모으는 중.. 실행 금지');
            return false;
        }
    }
    
    if (daily[day].item < data.cons) { // 필요량보다 재화가 적다면 끝
        //m('doEventRun: 재화 모자람! 실행 금지');
        return false;
    }
    // 이벤런 1회 수행
    ++daily[day].playData.eventRun;
    
    if (isBoost) {
        --daily[day].leftQuota.boost.eventRun; // 부스트 할당량 1회 채웠음
        //m('doEventRun: 남은 부스트 할당량: ' + daily[day].leftQuota.boost.eventRun + '회')
        checkBoostStatus();
    }
    else {
        --daily[day].leftQuota.eventRun; // 일반 할당량 1회 채웠음
        //m('doEventRun: 남은 일반 할당량: ' + daily[day].leftQuota.eventRun + '회')
    }
    
    //m('doEventRun: 이벤런 실행 결과:');
    
    daily[day].playData.totalPoint += data.earning.point; // 점수 획득
    
    daily[day].fan.eventLive += data.earning.fan; // 팬 획득
    daily[day].money.eventLive += data.earning.money; // 머니 획득
    daily[day].affection.eventLive += data.earning.affection; // 친애도 획득
    daily[day].exp += data.earning.exp; // 경험치 획득
    if (daily[day].level < 50) { // 50렙 미만이면 경험치 2배 획득임
        daily[day].exp += data.earning.exp;
    }
    
    /*m('point: ' + daily[day].playData.totalPoint + '(+' + data.earning.point + ')');
    //m('fan.eventLive: ' + daily[day].fan.eventLive + '(+' + data.earning.fan + ')');
    //m('money.eventLive: ' + daily[day].money.eventLive + '(+' + data.earning.money + ')');
    //m('affection.eventLive: ' + daily[day].affection.eventLive + '(+' + data.earning.affection + ')');
    //m('level [exp]: ' + daily[day].level + '[' + daily[day].exp + '(+' + data.earning.exp + ')' + ']');*/
    
    checkExp(); // 경험치를 체크하여, 꽉 찼다면 레벨업
    
    // 시간 반영
    if (tabStatus != 'live') {
        daily[day].time.etc += t.goLiveTab;
        //m('스케줄 탭에서 라이브 탭으로 이동했었음!');
        //m('time.etc: ' + daily[day].time.etc + '(+' + t.goLiveTab + ')');
    }
    daily[day].time.eventLive += t.doEventLive;
    //m('time.eventLive: ' + daily[day].time.eventLive + '(+' + t.doEventLive + ')');
    
    tabStatus = 'live';
    
    // 재화 소모
    daily[day].item -= data.cons;
    //m('item: ' + daily[day].item + '(-' + data.cons + ')');
    
    return true;
};

// 스태 다 쓸 때까지 플레이
// 플레이 했으면 true,
// 플레이 못했으면 false 반환
var doStaminaRun = function () {
    checkQuota();
    
    var played = false;
    var data = {};
    
    while (true) {
        if (isBoost) {
            data = daily[day].staminaRun.boost;
            //m('부스트 적용중!');
            if (daily[day].leftQuota.boost.staminaRun <= 0) {
                //m('doStaminaRun: 부스트 할당량 끝남! 실행 금지');
                break;
            }
        }
        else {
            data = daily[day].staminaRun;
            
            if (daily[day].leftQuota.staminaRun <= 0) {
                //m('doStaminaRun: 일반 할당량 끝남! 실행 금지');
                break;
            }
        }
        
        if (daily[day].stamina < data.cons) { // 필요량보다 스태가 적다면 끝
            //m('doStaminaRun: 스태 부족함! 실행 금지');
            break;
        }
        
        // 스태런 수행
        ++daily[day].playData.staminaRun;
        
        played = true;
        
        if (isBoost) {
            --daily[day].leftQuota.boost.staminaRun; // 부스트 할당량 1회 채웠음
            //m('doStaminaRun: 남은 부스트 할당량: ' + daily[day].leftQuota.boost.staminaRun + '회');
            checkBoostStatus();
        }
        else {
            --daily[day].leftQuota.staminaRun; // 일반 할당량 1회 채웠음
            //m('doStaminaRun: 남은 일반 할당량: ' + daily[day].leftQuota.staminaRun + '회');
        }
        
        //m('doStaminaRun: 스태런 결과:');
        
        daily[day].playData.totalPoint += data.earning.point; // 점수 획득
        daily[day].item += data.earning.item; // 재화 획득
        
        daily[day].fan.live += data.earning.fan; // 팬 획득
        daily[day].money.live += data.earning.money; // 머니 획득
        daily[day].affection.live += data.earning.affection; // 친애도 획득
        daily[day].exp += data.earning.exp; // 경험치 획득
        if (daily[day].level < 50) { // 50렙 미만이면 경험치 2배 획득임
            daily[day].exp += data.earning.exp;
        }
        
        /*m('point: ' + daily[day].playData.totalPoint + '(+' + data.earning.point + ')');
        //m('item: ' + daily[day].item + '(+' + data.earning.item + ')');
        //m('fan.live: ' + daily[day].fan.live + '(+' + data.earning.fan + ')');
        //m('money.live: ' + daily[day].money.live + '(+' + data.earning.money + ')');
        //m('affection.live: ' + daily[day].affection.live + '(+' + data.earning.affection + ')');
        //m('level [exp]: ' + daily[day].level + '[' + daily[day].exp + '(+' + data.earning.exp + ')' + ']');*/
        
        checkExp(); // 경험치를 체크하여, 꽉 찼다면 레벨업
        
        // 시간 반영
        if (tabStatus != 'live') {
            daily[day].time.etc += t.goLiveTab;
            //m('스케줄 탭에서 라이브 탭으로 이동했었음!');
            //m('time.etc: ' + daily[day].time.etc + '(+' + t.goLiveTab + ')');
        }
        tabStatus = 'live';
        
        daily[day].time.live += t.doLive;
        //m('time.live: ' + daily[day].time.live + '(+' + t.doLive + ')');
        
        // 스태미너 소모
        daily[day].stamina -= data.cons;
        //m('stamina: ' + daily[day].stamina + '(-' + data.cons + ')');
    }
    
    return played;
};

// 스케줄 1회 플레이
// 플레이 했으면 true,
// 플레이 못했으면 false 반환
var doWork = function () {
    
    if (daily[day].stamina < daily[day].work.cons) { // 필요량보다 스태가 적다면 끝
        //m('doWork: 스태 부족함! 실행 금지');
        return false;
    }
    
    if (daily[day].ticket + daily[day].work.earning.ticket > MAX_TICKET) { // 티켓 손실이 예상된다면 끝
        //m('doWork: 티켓 손실 예상! 실행 금지 (현재 티켓 ' + daily[day].ticket + '개, 얻을 티켓 ' + daily[day].work.earning.ticket + '개)');
        return false;
    }
    // 스케줄 1회 플레이
    
    //m('doWork: 스케줄 결과:');
    
    ++daily[day].playData.work;
    
    daily[day].ticket += daily[day].work.earning.ticket; // 티켓 획득
    
    daily[day].fan.work += daily[day].work.earning.fan; // 팬 획득
    daily[day].money.work += daily[day].work.earning.money; // 머니 획득
    daily[day].affection.work += daily[day].work.earning.affection; // 친애도 획득
    daily[day].exp += daily[day].work.earning.exp; // 경험치 획득
    if (daily[day].level < 50) { // 50렙 미만이면 경험치 2배 획득임
        daily[day].exp += daily[day].work.earning.exp;
    }
    
    /*m('ticket: ' + daily[day].ticket + '(+' + daily[day].work.earning.ticket + ')');
    //m('fan.work: ' + daily[day].fan.work + '(+' + daily[day].work.earning.fan + ')');
    //m('money.work: ' + daily[day].money.work + '(+' + daily[day].work.earning.money + ')');
    //m('affection.work: ' + daily[day].affection.work + '(+' + daily[day].work.earning.affection + ')');
    //m('level [exp]: ' + daily[day].level + '[' + daily[day].exp + '(+' + daily[day].work.earning.exp + ')' + ']');*/
    
    checkExp(); // 경험치를 체크하여, 꽉 찼다면 레벨업
    
    // 시간 반영
    if (tabStatus != 'work') {
        daily[day].time.etc += t.goWorkTab;
        //m('라이브 탭에서 스케줄 탭으로 이동했었음!');
        //m('time.etc: ' + daily[day].time.etc + '(+' + t.goWorkTab + ')');
    }
    daily[day].time.work += t.doWork;
    //m('time.work: ' + daily[day].time.work + '(+' + t.doWork + ')');
    
    tabStatus = 'work';
    
    // 스태미너 소모
    daily[day].stamina -= daily[day].work.cons;
    //m('stamina: ' + daily[day].stamina + '(-' + daily[day].work.cons + ')')
    
    return true;
};

// 더 충전해야 하면 false,
// 더 충전할 필요가 없으면(최대치까지 스태가 차있으면) true 반환
var useDrink = function () {
    
    var ret = false;
    var used = false;
    
    daily[day].time.etc += t.useDrink;
    
    var drinkType = null;
    var drinkEffect = 0;
    while (true) {
        if (daily[day].stamina >= getMaxStamina()) { // 스태미너가 꽉 찬 경우 true 반환
            ret = true;
            break;
        }
        
        drinkType = null;
        drinkEffect = 0;
        
        if (daily[day].drink30 > 0) {
            drinkType = 'drink30';
            drinkEffect = 30;
        }
        else if (daily[day].drink20 > 0) {
            drinkType = 'drink20';
            drinkEffect = 20;
        }
        else if (daily[day].drink10 > 0) {
            drinkType = 'drink10';
            drinkEffect = 10;
        }
        else if (daily[day].mdrink > 0) {
            drinkType = 'mdrink';
            drinkEffect = getMaxStamina();
        }
        
        if (drinkType == null) { // 마실 드링크가 없는 경우, 
            if (daily[day].stamina >= getMaxStamina()) { // 이미 꽉 찬 경우 true 반환
                ret = true;
            }
            else {                                       // 최대치가 아닌 경우, 더 충전해야 하므로 false 반환
                ret = false;
            }
            
            break;
        }
        
        // 드링크 사용
        used = true;
        daily[day].stamina += drinkEffect;
        --daily[day][drinkType];
        
        //m(drinkType + ' 사용! (잔여 ' + daily[day][drinkType] + '개):');
        //m('현재 스태미너: ' + daily[day].stamina + '(+' + drinkEffect + ')');
    }
    
    // 드링크 사용 시간 적용
    if (used) {
        daily[day].time.etc += t.useDrink;
    }
    
    /*
    if (!used) {
        //m('드링크의 사용이 이뤄지지 않음! 드링크가 없거나, 이미 스태미너가 꽉 차있음!');
    }
    
    if (!ret) {
        //m('스태미너를 꽉 채우지 못했음!');
    }
    */
    
    return ret;
};

// 충전한 경우 true, (이미 최대치라서) 충전하지 않은 경우 false 반환
var useJwl = function () {
    if (daily[day].stamina >= getMaxStamina()) { // 이미 최대치 이상인 경우
        //m('useJwl: 이미 스태미너가 꽉 채워져 있음!');
        return false;
    }
    
    // 쥬얼 사용
    daily[day].stamina += getMaxStamina();
    daily[day].jwl -= 50;
    daily[day].time.etc += t.useJwl;
    
    //m('useJwl: 현재 쥬얼 ' + daily[day].jwl + '개, ' + '스태미너: ' + daily[day].stamina);
    
    return true;
};

// 반환값 없음.
// 스태미너를 전부 사용.
var useStamina = function () {
    
    // 가중치에 기반한 루틴 내 할당량에 따라 플레이.
    var quota = {};
    
    while (true) {
        checkBoostStatus();
        checkQuota();
        
        if (isBoost) {
            quota = daily[day].leftQuota.boost;
            //m('부스트 적용중!');
        }
        else {
            quota = daily[day].leftQuota;
        }
        
        //m('useStamina: 남은 할당량 (스태런, 티켓런): ' + quota.staminaRun + ', ' + quota.ticketRun);
        
        if (quota.ticketRun <= 0 && quota.staminaRun <= 0) { // 할당량이 끝난 경우, 종료
            //m('useStamina: 할당량 끝남! 종료');
            break;
        }
        
        // 스태런 할당량이 남은 경우, 스태런 플레이
        if (quota.staminaRun > 0) {
            if (doStaminaRun() == false) { // 스태 부족으로 실패할 경우, 종료.
                //m('useStamina: 스태런: 스태 부족함! 종료');
                break;
            }
            
            continue;
        }
        
        // 아니면, 티켓런 할당량이 남은 경우, 스케줄 플레이
        if (quota.ticketRun > 0) {
            if (doWork() == false) { // 스태 부족 또는 티켓 저장 불가 문제로 실패할 경우, 종료.
                //m('useStamina: 스케줄: 스태 부족하거나 티켓 넘침! 종료');
                break;
            }
            
            continue;
        }
    }
};

var checkQuota = function () {
    // 할당량이 전혀 남지 않은 경우, 할당량 초기화
    if (daily[day].leftQuota.staminaRun <= 0 && daily[day].leftQuota.ticketRun <= 0) {
        daily[day].leftQuota.staminaRun = daily[day].initialQuota.staminaRun;
        daily[day].leftQuota.ticketRun = daily[day].initialQuota.ticketRun;
        
        //m('일반 할당량 루틴이 완료됨! 일반 할당량을 다시 초기화');
    }
}

// doTicketRun의 관리
var useTicket = function () {
    var quota = {};
    
    if (isBoost) {
        quota = daily[day].leftQuota.boost;
        //m('부스트 적용중!');
    }
    else {
        quota = daily[day].leftQuota;
    }
    
    if (quota.ticketRun <= 0) { // 티켓런 할당량을 이미 끝낸 경우, false 반환
        //m('useTicket: 티켓런 할당량이 이미 끝남! 실행 금지');
        return false;
    }
    else {
        return doTicketRun();
    }
};

// doEventRun의 관리
var useItem = function () {
    var quota = {};
    
    if (isBoost) {
        quota = daily[day].leftQuota.boost;
        //m('부스트 적용중!');
    }
    else {
        quota = daily[day].leftQuota;
    }
    
    if (quota.eventRun <= 0) { // 이벤런 할당량을 이미 끝낸 경우, false 반환
        //m('useItem: 이벤런 할당량이 이미 끝남! 실행 금지');
        return false;
    }
    return doEventRun();
};

var gotoNextDay = function () {
    //m('다음 날로 이동!');
    ++day;
    
    if (day > e.days) {
        //m('다음 날이 없음! 종료');
        return false;
    }
    ['boost', 'level', 'exp', 'stamina', 'ticket', 'item', 'drink10', 'drink20', 'drink30', 'mdrink', 'jwl'].forEach( function(elem) {
        daily[day][elem] = daily[day - 1][elem];
    });
    
    daily[day].playData.totalPoint = daily[day - 1].playData.totalPoint; // 이벤트 점수 이어서 가져오기
    
    // 4주년이라면, 마지막 날은 리프레시도 없고 부스트 보상도 없음
    console.log(e.type, day, e.days)
    if (!(e.type == '4th' && day == e.days)) {
        daily[day].boost += 1; // 휴식해서 1 증가하는 것을 반영
    }

    daily[day].stamina += parseInt((daily[day].staminaUsage/100) * parseInt(parseInt(daily[day].totalEventTime / 60, 10) / 5, 10), 10); // 오늘의 자연회복분을 반영
    daily[day].item += 2 * f.eventLive.difmm.cons; // 일일지급 재화 반영
    
    // n주년 일일 미션 반영
    if (e.type == '3rd' || e.type == '4th') {
        daily[day].drink30 += 2 
        daily[day].jwl += 25

        if (e.type == '4th') {
            daily[day].item += 4000
        }
    }
    
    if (day == 1 && recvBoost == true) { // 이미 시작일에 부스트를 받았다면, 부스트 지급 취소
        //m('부스트 지급 안함!');
        --daily[day].boost;
    }
    if (day == 1 && recvItem == true) { // 이미 시작일에 재화를 받았다면, 재화 지급 취소
        //m('일일재화 지급 안함!');
        daily[day].item -= 2 * f.eventLive.difmm.cons;
    }
    if (day == 1 && recvDailyMission == true) {
        daily[day].drink30 -= 2;

        if (e.type == '4th')
            daily[day].item -= 4000;
    }
    
    //m('전날의 결과 데이터:');
    //m(JSON.stringify(daily[day - 1]));
    //m('오늘의 시작 데이터:');
    //m(JSON.stringify(daily[day]));
    
    return true;
};

var calc = function () {
    t1 = Date.now(); // 계산 성능 측정을 위해 시작 시간 기록
    
    var i = 0;
    var loopBack = false;
    day = 0; // (인덱스 0은 최초의 값 보존용. 계산 대상이 아님)
    
    while (true) {
        i = 0;
        // 다음 날로 이동.
        if (gotoNextDay() == false) { // 다음 날이 없으면, 즉 모든 날에 대해 계산을 끝냈으면, 종료.
            break;
        }
        
        //m('===day ' + day + '===');
        //console.log('===day ' + day + '===');
        while (true) {
            if (isNormaLeft() == false) { // isNormaLeft: 시간 / 할당량 체크
                if (day == e.days) { // 막날이라면, 남은 이벤트 재화 모두 털고 마치기.
                    //console.log("막날 재화 털이:", day, e.days);
                    while (useItem()){};
                }
                
                break;
            }
            
            loopBack = false;
            // 재화를 모으는 상황: 결국 부스트에서 이벤런을 돌릴 것이므로 당장 일반에서 굳이 돌릴 필요 없음.
            // 재화를 모으지 않는 상황: 따로 이벤런을 적어도 1번은 돌리도록 만들어야 함.
            //checkBoost(); // 재화를 모아야할지 먼저 자동설정 수행
            useBoost();     // useBoost: 부스트가 가용하다면, 부스트 사용. 부스트의 종료여부 체크는, 각 do계열 함수에서 수행
            /*
            if (clearDailyMission_ === true && daily[day].playData.eventRun == 0) {
                daily[day].leftQuota.eventRun = Number(daily[day].initialQuota.eventRun) + 1;
                loopBack = useItem() || loopBack;
            }
            */
            //if (checkBoost() == true) { // 부스트 사용
                
            //useBoost();     // useBoost: 부스트가 가용하다면, 부스트 사용. 부스트의 종료여부 체크는, 각 do계열 함수에서 수행
            //}
            
            useStamina(); // useStamina: "모든" 스태미나를 사용. 반환값은 없음.
            
            loopBack = useItem() || loopBack; // useItem: 이벤트 라이브를 1회 플레이. 성공적으로 끝내면 true 반환. 재화 모자라면 false 반환.
            
            if (loopBack === true) {
                //m('loopBack');
                continue;
            }
            
            loopBack = useTicket() || loopBack; // useTicket: 티켓 라이브를 1회 플레이. 성공적으로 끝내면 true 반환. 티켓 모자라면 false 반환.
            
            if (loopBack === true) { // 티켓런이나 이벤런이 1번이라도 성공했다면 다시 처음으로 돌아감.
                //m('loopBack');
                continue;            // 티켓이나 재화가 충분히 남아있어, 티켓런이나 이벤런을 수행할 수 있음에도 미리 드링/쥬얼을 쓸 필요는 없으므로.
            }
            
            if (isNormaLeft() == false) { // 스태 충전하기 전, 시간 / 할당량 등 체크.
                if (day == e.days) { // 막날이라면, 남은 이벤트 재화 모두 털고 마치기.
                    //console.log("막날 재화 털이:", day, e.days);
                    while (useItem()){};
                }
                
                break;
            }
            
            if (useDrink() == true) { // useDrink: 드링크를 최대한 한꺼번에 사용(가장 고용량인 드링크부터). 꽉 채워서 충전했으면 true, 더 충전해야하면 false 반환.
                continue;
            }
            
            useJwl(); // useJwl: 쥬얼을 1회(50개) 사용하여 스태미너 충전.
            
            
            if (++i > 10000) { // 쥬얼 충전을 1만번 했다는 건, 하루에 50만쥬얼을 썼다는 건데 이건 너무 비정상적임.
                //m('too many loops');
                alert('오류: 너무 많은 루프');
                console.log('too many loops');
                return undefined;
            }
        }
        getTotalPlaytime();
        //console.log("playtime:", daily[day].playData.time);
    }
    
    // 성능 측정: 계산
    trd.calc.push(Date.now() - t1);
};

var getTotalPlaytime = function () {
    var i = 0;
    var t = 0;
    
    for (i = 1; i <= e.days; ++i) {
        updatePlaytime(i);
        t += daily[i].playData.time;
    }
    return t;
}

// 플탐 평준화를 위한 함수. 다음 dailyPlayTime을 최고와 최저의 평균치로 설정해가며 평준화.
var calcDailyPlaytime = function () {
    var i = 1;
    
    var mini = Infinity, maxi = -Infinity;
    
    for (i = 1; i <= e.days; ++i) {
        updatePlaytime(i);
        if (daily[i].playData.time < mini) {
            mini = daily[i].playData.time;
        }
    }
    
    for (i = 1; i <= e.days; ++i) {
        updatePlaytime(i);
        if (daily[i].playData.time > maxi) {
            maxi = daily[i].playData.time;
        }
    }
    
    return Math.ceil((mini + maxi) / 2);
}

// 시뮬레이션 수행.
var simul = function () {
    // 최악의 경우
    worstCase = true;
    init();
    calc();
    print('result-worst');

    /*
    // 평균적 경우
    daily = [];
    worstCase = false;
    init();
    calc();
    print('result-average');*/
};