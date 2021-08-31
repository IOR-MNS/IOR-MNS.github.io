function saveInput() {
    console.log('saveInput');
    let data = {};

    $.each($('#globalConfig input, #globalConfig select'), function(idx, elm) {
        let $elm = $(elm);
        
        if ($elm.attr('type') == 'checkbox') {
            data[$elm.attr('id')] = $elm.prop('checked');
        }
        else {
            data[$elm.attr('id')] = $elm.val();
        }
    })

    data = JSON.stringify(data);
    localStorage.setItem('mltd_calc-pstale_input', data);
}

function loadInput () {
    let data = localStorage.getItem('mltd_calc-pstale_input') || false;
    if (data == false) return;

    data = JSON.parse(data);

    $.each($('#globalConfig input, #globalConfig select'), function(idx, elm) {
        let $elm = $(elm);
        if (data[$elm.attr('id')]) {
            if ($elm.attr('type') == 'checkbox') {
                $elm.prop('checked', data[$elm.attr('id')]);
            }
            else {
                $elm.val(data[$elm.attr('id')]);
            }
        }
    })

    /*// 현재 시각 자동 설정
    let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth()+1,
        date = now.getDate(),
        hour = now.getHours(),
        min = now.getMinutes();
    
    if (month < 10) month = `0${month}`;
    if (date < 10) date = `0${date}`;
    if (hour < 10) hour = `0${hour}`;
    if (min < 10) min = `0${min}`;

    $('#now_date').val(`${year}-${month}-${date}`);
    $('#now_time').val(`${hour}:${min}`);*/
}
function clearInputData() {
    if (confirm('주의: 이 작업은 되돌릴 수 없습니다.\n정말로 입력 데이터를 초기화하시겠습니까?')) {
        localStorage.removeItem('mltd_calc-pstale_input');
        history.go(0);
    }
}
function setPromotionRoutine() {
    let routineVal = $("#promotionRoutine").val();
    $("#promotionRoutine_live").text(3 - routineVal);
    $("#promotionRoutine_work").text(routineVal);
}

$("#promotionRoutine").on('input', setPromotionRoutine);
$('input, select').change(saveInput);
loadInput();
setPromotionRoutine();