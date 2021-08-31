var secToTime = function (sec) {
    let h, m, s;
    sec = parseInt(sec, 10);

    h = parseInt(sec / 3600, 10);
    sec %= 3600;
    m = parseInt(sec / 60, 10);
    // sec %= 60;
    // s = sec;

    return `${h}h ${m}m`;
}

var showResult = function() {
    calc();

    // 레벨과 경험치(progress bar)
    $('#result-level').text(p.level);
    $('#result-exp').attr('max', getMaxExp(p.level)).val(p.exp);

    // 획득 팬, 머니, 친애도
    $('#result-fan').text(p.fan);
    $('#result-money').text(p.money);
    $('#result-affection').text(p.affection);

    // 잔여 드링크, 쥬얼
    $('#result-drink10').text(p.drink10);
    $('#result-drink20').text(p.drink20);
    $('#result-drink30').text(p.drink30);
    $('#result-mdrink').text(p.mdrink);

    let jwlStr;
    if (p.jwl < 0)
        $('#result-jwl').text(`${-p.jwl}개 부족`).removeClass().addClass('red');
    else
        $('#result-jwl').text(`${p.jwl}개 잔여`).removeClass().addClass('green');

    // 플레이 횟수, 시간
    $('#result-playCnt-live').text(playCnt.live);
    $('#result-playCnt-work').text(playCnt.work);
    $('#result-playCnt-elegant').text(playCnt.elegant);

    let playTime = {};
    playTime.live = (playCnt.live + playCnt.elegant) * t.doLive;
    playTime.work = playCnt.work * t.doWork;
    playTime.total = playTime.live + playTime.work;

    // 예시: 7/1 1500 ~ 7/7 2059
    // 7/1 1500일 때, 6*24시간 + 6시간.  즉, 6일 6시간 잔여. 실제로 7일 남음. leftDay + 1.
    // 7/1 2200일 때, 5*24시간 + 23시간. 즉, 5일 23시간 잔여. 그러나, 실제로 7일 남음. leftDay + 2.
    let leftDays = e.leftDay + 1;
    if (e.leftHour >= 21) leftDays++;

    playTime.daily = playTime.total / leftDays;
    
    $('#result-playTime-live').text(secToTime(playTime.live));
    $('#result-playTime-work').text(secToTime(playTime.work));
    $('#result-playTime-total').text(secToTime(playTime.total));
    $('#result-playTime-daily').text(secToTime(playTime.daily));

    $('#result').show();
}