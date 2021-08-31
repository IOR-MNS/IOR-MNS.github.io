// 이벤트 데이터 저장 변수
var e = {
    leftDay: 0,
    leftHour: 0,
};

// 시간 데이터 저장 변수
var t = {
    doWork: 0,
    doLive: 0,
};

// 기초 데이터 저장 변수
var f = {
    live: {
        dif2m: {},
        dif2mp: {},
        dif4m: {},
        dif6m: {},
        difmm: {},
    },
    eventLive: {
        dif2m: {},
        dif2mp: {},
        dif4m: {},
        dif6m: {},
        difmm: {},
    },
    promotion: {
        dif2m: {},
        dif2mp: {},
        dif4m: {},
        dif6m: {},
        difmm: {},
    },
    work: {
        dif15: {},
        dif20: {},
        dif25: {},
        dif30: {},
    },
    elegant: {},
};

var p = {}

var playInfo = {
    routine: {
        live: 0,
        work: 0,
    },
    promotion: {
        dif: 0,
        mul: 0,
    },
    elegant: {
        dif: 0,
        mul: 0, // 실제로 따지자면 1로 고정됨
    },
}

// 플레이 횟수
var playCnt = {
    live: 0,
    work: 0,
    elegant: 0,
};

var targetPoint = 0;

// 이벤트 데이터 가져오기
var getEventData = function () {
    e.leftDay = Number(document.getElementById('left_day').value);
    e.leftHour = Number(document.getElementById('left_hour').value);
    
    //m('이벤트 데이터 수집 완료:')
    //m(JSON.stringify(e));
};

// 시간 데이터 가져오기
var getTimeData = function () {
    t.doWork = Number(document.getElementById('timeData_doWork').value);
    t.doLive = Number(document.getElementById('timeData_doLive').value);

    //m('시간 데이터 수집 완료:');
    //m(JSON.stringify(t));
};

// 목표 포인트 가져오기
var getTargetPoint = function () {
    targetPoint = Number(document.getElementById('playerData_target').value);
    
    //m('목표 포인트 수집 완료: ' + targetPoint);
};

// 프로모션 루틴, 난이도, 배수 가져오기
var getPlayInfo = function() {
    playInfo.routine.work = Number(document.getElementById('promotionRoutine').value);
    playInfo.routine.live = 3 - playInfo.routine.work;

    playInfo.promotion.dif = document.getElementById('promotionDif').value;
    playInfo.promotion.mul = Number(document.getElementById('promotionMul').value);

    playInfo.elegant.dif = document.getElementById('elegantDif').value;
    playInfo.elegant.mul = 1;
}

// 기초 데이터 세팅
var setFundamentalData = function () {
    // 모든 타입 공통. 이벤트 타입에 따라 변경되는 항목은 0으로 초기화.

    // PSTale은 투어류에 속한다. 또, 재화를 프로모션 단위로 획득한다.
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
    
    // 영업으로 획득하는 포인트, 재화는 시어터류에서 0 이다.
    // 영업으로 획득하는 티켓은 투어류에서 0 이다.
    f.work.dif15.cons = 15;
    f.work.dif15.point = 0;
    //f.work.dif15.item = 0;
    f.work.dif15.fan = 30;
    f.work.dif15.money = 473;
    f.work.dif15.affection = 7;
    f.work.dif15.exp = 108;
    //f.work.dif15.ticket = 0;
    
    f.work.dif20.cons = 20;
    f.work.dif20.point = 0;
    //f.work.dif20.item = 0;
    f.work.dif20.fan = 40;
    f.work.dif20.money = 630;
    f.work.dif20.affection = 9;
    f.work.dif20.exp = 143;
    //f.work.dif20.ticket = 0;
    
    f.work.dif25.cons = 25;
    f.work.dif25.point = 0;
    //f.work.dif25.item = 0;
    f.work.dif25.fan = 50;
    f.work.dif25.money = 788;
    f.work.dif25.affection = 11;
    f.work.dif25.exp = 179;
    //f.work.dif25.ticket = 0;
    
    f.work.dif30.cons = 30;
    f.work.dif30.point = 0;
    //f.work.dif30.item = 0;
    f.work.dif30.fan = 60;
    f.work.dif30.money = 945;
    f.work.dif30.affection = 15;
    f.work.dif30.exp = 215;
    //f.work.dif30.ticket = 0;
    
    // PSTale의 효율에 따라 설정
    f.live.dif2m.point = 142;
    f.live.dif2mp.point = 180;
    f.live.dif4m.point = 161;
    f.live.dif6m.point = 180;
    f.live.difmm.point = 200;
    
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
    
    f.work.dif15.point = 50;
    f.work.dif20.point = 57;
    f.work.dif25.point = 74;
    f.work.dif30.point = 82;

    // PSTale에만 존재하는 항목. PSTale은 프로모션 단위로 재화를 획득한다.
    f.promotion.dif2m.item = 20;
    f.promotion.dif2mp.item = 40;
    f.promotion.dif4m.item = 30;
    f.promotion.dif6m.item = 40;
    f.promotion.difmm.item = 50;
    // 엘레강트 스테이지는 난이도 상관없이 같은 스태미나 소모량과 포인트 획득량을 가진다.
    f.elegant.cons_stamina = 20;
    f.elegant.cons_item = 100;
    f.elegant.point = 3000;

    /*
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
    */
    
    //m('기초 데이터 설정 완료:');
    //m(JSON.stringify(f));
};

// 플레이어 데이터 수집
var getPlayerData = function () {
    // PSTale에선 ticket 항목을 수집하지 않는다.
    ['level', 'exp', 'stamina', 'drink10', 'drink20', 'drink30', 'mdrink', 'jwl', 'point', 'item', 'staminaUsage'].forEach( function (name) {
        p[name] = Number(document.getElementById('playerData_' + name).value);
    });

    ['fan', 'money', 'affection'].forEach( function (name) {
        p[name] = 0;
    });
};

// 해당 레벨의 최대 스태미너 
var getMaxStamina = function (level) {
    level = level || p.level;
    
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

var getMaxExp = function (level) {
    level = level || p.level;

    return (p.level * 100) - 50;
}

// 레벨업 판정 및 처리
var checkExp = function () {
    let maxExp = 0;
    
    while (true) {
        maxExp = getMaxExp(p.level);

        if (p.exp >= maxExp) {
            p.exp -= maxExp;
            p.level += 1;
            p.stamina += getMaxStamina();
        }
        else break;
    }
};

var r = {
    live: {
        cons: 0,
        point: 0,
        fan: 0,
        money: 0,
        affection: 0,
    },
    work: {
        cons: 0,
        point: 0,
        fan: 0,
        money: 0,
        affection: 0,
    },
    promotion: {
        item: 0,
    },
    elegant: {
        cons_stamina: 0,
        cons_item: 0,
        point: 0,
    }
}

var setRealData = function () {
    // PSTale 기준
    // 프로모션
    let promotion = playInfo.promotion,
        elegant = playInfo.elegant,
        dif = `dif${promotion.dif}`,
        mul = promotion.mul;
    
    r.live.cons = mul * f.live[dif].cons;
    r.live.point = mul * f.live[dif].point;
    r.live.fan = f.live[dif].fan;
    r.live.money = f.live[dif].money;
    r.live.affection = f.live[dif].affection;
    r.live.exp = f.live[dif].exp;
    
    r.promotion.item = mul * f.promotion[dif].item;

    // 엘레강트 (배수 불가)
    dif = `dif${elegant.dif}`;

    r.elegant.cons_item = f.elegant.cons_item;
    r.elegant.cons_stamina = f.elegant.cons_stamina;
    r.elegant.point = f.elegant.point;
    r.elegant.fan = f.live[dif].fan;
    r.elegant.money = f.live[dif].money;
    r.elegant.affection = f.live[dif].affection;
    r.elegant.exp = f.live[dif].exp;

    // 스케쥴
    let difmap = {
        '2m': 15,
        '4m': 20,
        '2mp': 25,
        '6m': 25,
        'mm': 30,
    };
    dif = `dif${difmap[promotion.dif]}`;

    r.work.cons = mul * f.work[dif].cons;
    r.work.point = mul * f.work[dif].point;
    r.work.fan = f.work[dif].fan;
    r.work.money = f.work[dif].money;
    r.work.affection = f.work[dif].affection;
    r.work.exp = f.work[dif].exp;
}

function fetch() {
    // 사전 데이터 준비
    getEventData();
    getTimeData();
    getTargetPoint();
    getPlayInfo();
    getPlayerData();
    setFundamentalData();
    
    // 배수 등을 반영하여 실제 값 설정
    setRealData();

    // 금일 일일 드링크(PSTale 기준) 수령 여부 체크
    let recvDrink = document.getElementById('recvDrink').checked;
    // 일일 드링크 설정
    let dailyDrink = 30 * 4;

    /* *** 계산 시작 *** */
    
    // 자연스태 스태미나에 반영
    let eventDuration = (e.leftDay * 24 * 60) + (e.leftHour * 60)
    p.stamina += parseInt(( parseInt(( eventDuration / 5 ), 10) * p.staminaUsage ) / 100, 10);

    // 일일드링 스태미나에 반영
    // 남은 일 수만큼 일일드링 지급. 시뮬레이션 수행 당일 일일드링은, 아직 수령하지 않은 경우에 한해 포함.
    p.stamina += e.leftDay * dailyDrink; 
    if (!recvDrink) p.stamina += dailyDrink;
    
    // 이벤트 종료시각이 20시 59분이므로, 21시부터 24시까지는 (남은일수 - 1)日 (23 ~ 21)時間 으로 표시됨.
    // 이 경우, 위 코드에서 실제보다 1회 적게 일일드링을 지급받는 것으로 계산되었으므로 정정한다. 
    if( e.leftHour >= 21 ) p.stamina += dailyDrink;

    // 플레이 횟수 초기화
    playCnt = {
        live: 0,
        work: 0,
        elegant: 0,
    };
}

function calc() {
    fetch();

    while (p.point < targetPoint) {
        // 프로모션 돌리기
        while (p.item < r.elegant.cons_item)
            doPromotion();

        // 엘레강트 돌리기
        while (p.item >= r.elegant.cons_item)
            doElegant();
    }
}


// 부족한 스태 충전
function rechargeStamina() {
    if (p.stamina < 0) {
        // 드링크로 충전
        let qty = 0;

        if (p.drink30 > 0 || p.drink20 > 0 || p.drink10 > 0) {
            let types = [30, 20, 10],
                type = 0,
                i = 0;
            
            for (i = 0; i < types.length; ++i) {
                type = types[i];

                if (p[`drink${type}`] > 0) {
                    qty = Math.ceil(-p.stamina / type);

                    if (p[`drink${type}`] < qty)
                        qty = p[`drink${type}`];

                    p.stamina += type * qty;
                    p[`drink${type}`] -= qty;
                }

                if (p.stamina >= 0)
                    break;
            }
        }

        let maxStamina = getMaxStamina(p.level);

        // 맥드링으로 충전
        if (p.mdrink > 0) {
            qty = Math.ceil(-p.stamina / maxStamina);

            if (p.mdrink < qty)
                qty = p.mdrink;

            p.stamina += maxStamina * qty;
            p.mdrink -= qty;
        }

        // 쥬얼로 충전
        qty = Math.ceil(-p.stamina / maxStamina);

        p.stamina += maxStamina * qty;
        p.jwl -= 50 * qty;
    }
}

// 프로모션 돌리기. 스태 부족하면 알아서 충전함
function doPromotion() {
    // 라이브 수행
    p.stamina -= playInfo.routine.live * r.live.cons;
    p.point += playInfo.routine.live * r.live.point;
    p.fan += playInfo.routine.live * r.live.fan;
    p.money += playInfo.routine.live * r.live.money;
    p.affection += playInfo.routine.live * r.live.affection;
    p.exp += playInfo.routine.live * r.live.exp;

    playCnt.live += playInfo.routine.live;

    // 스케줄 수행
    p.stamina -= playInfo.routine.work * r.work.cons;
    p.point += playInfo.routine.work * r.work.point;
    p.fan += playInfo.routine.work * r.work.fan;
    p.money += playInfo.routine.work * r.work.money;
    p.affection += playInfo.routine.work * r.work.affection;
    p.exp += playInfo.routine.work * r.work.exp;

    playCnt.work += playInfo.routine.work;

    // 프로모션으로 게이지 충전
    p.item += r.promotion.item;

    // 레벨 업 체크
    checkExp();

    // 스태 부족하면 충전
    rechargeStamina();
}

// 엘레강트 돌리기. 스태 부족하면 알아서 충전함
function doElegant() {
    p.item -= r.elegant.cons_item;
    p.stamina -= r.elegant.cons_stamina;
    p.point += r.elegant.point;
    p.fan += r.elegant.fan;
    p.money += r.elegant.money;
    p.affection += r.elegant.affection;
    p.exp += r.elegant.exp;

    playCnt.elegant++;

    // 레벨 업 체크
    checkExp();

    // 스태 부족하면 충전
    rechargeStamina();
}