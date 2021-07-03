function saveInput() {
    console.log('saveInput')
    let data = {
        global: {},
        local: [],
    };

    // 일단, 설정 항목은 1개로 고정됨
    // 전역 설정
    $.each($('#globalConfig input, #globalConfig select'), function(idx, elm) {
        let $elm = $(elm);
        if ($elm.attr('type') == 'checkbox')
            data.global[$elm.attr('id')] = $elm.prop('checked');
        else
            data.global[$elm.attr('id')] = $elm.val();
    })

    // 일일 설정
    let tmp = {};
    $.each($('#dailyInputForm input, #dailyInputForm select'), function(idx, elm) {
        let $elm = $(elm);
        if ($elm.attr('type') == 'checkbox')
            tmp[$elm.attr('name')] = $elm.prop('checked');
        else
            tmp[$elm.attr('name')] = $elm.val();
    })
    data.local[0] = tmp;
    tmp = {};

    data = JSON.stringify(data);
    localStorage.setItem('mltd_calc-2_input', data);
}
function loadInput () {
    let data = localStorage.getItem('mltd_calc-2_input') || false;
    if (data == false) return;

    data = JSON.parse(data);

    let tmp = {};
    // 전역 설정
    tmp = data.global;
    $.each($('#globalConfig input, #globalConfig select'), function(idx, elm) {
        let $elm = $(elm);
        if (tmp[$elm.attr('id')]) {
            if ($elm.attr('type') == 'checkbox')
                $elm.prop('checked', tmp[$elm.attr('id')]);
            else
                $elm.val(tmp[$elm.attr('id')]);
        }
    })

    // 일일 설정
    for (let i = 0; i < data.local.length; ++i) {
        tmp = data.local[i];
        $.each($('#dailyInputForm input, #dailyInputForm select'), function(idx, elm) {
            let $elm = $(elm);
            if (tmp[$elm.attr('name')]) {
                if ($elm.attr('type') == 'checkbox')
                    $elm.prop('checked', tmp[$elm.attr('name')]);
                else
                    $elm.val(tmp[$elm.attr('name')]);
            }
        })
    }
}
function clearInputData() {
    if (confirm('주의: 이 작업은 되돌릴 수 없습니다.\n정말로 입력 데이터를 초기화하시겠습니까?')) {
        localStorage.removeItem('mltd_calc-2_input');
        history.go(0);
    }
}
$('input, select').change(saveInput);
loadInput();