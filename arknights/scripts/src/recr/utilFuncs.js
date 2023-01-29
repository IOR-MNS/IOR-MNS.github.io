// 필터버튼과 같은 체크버튼이 새로 생겨나더라도, 기존의 변수에 따라서 체크 상태를 동기화
// 새로운 체크박스 버튼을 만들고 나서, 또는 체크박스 클릭 이벤트가 발생했을 때 호출할 것.
const syncButtons = function () {
	// 고등급 확정식 필터 버튼 처리
	$('[id$="ohsf"]').prop('checked', userConfig.filter.onlyHighRarity.value)
}

// tagCode가 포함하는 태그들의 이름을 배열로 반환
const getTagNames = function (tagCode) {
	var includedTagNames = []
	
	for (var i = 0, j = 0; i < db.tag.keys.length; ++i)
	{
		if ((tagCode & db.tag[db.tag.keys[i]].tagCode) != 0)
		{
            // 태그명은, 서버 기준으로.
			includedTagNames[j++] = db.tag[i].name[userConfig.locale.region.value]
		}
	}
    
    return includedTagNames
}

const guideShowDetail = function () {
    var elm = document.getElementById('guide-detail')
    var toggleTable = ['block', 'none']
    elm.style.display = toggleTable[(toggleTable.indexOf(elm.style.display)+1)%2]
    if (elm.style.display === 'block') {
        document.getElementById('guide-head').innerText = '사용 방법'
        gtag('event', '도움말 확인', {
            'event_category': '공개모집 계산기'
        })
    }
    else {
        document.getElementById('guide-head').innerText = '사용 방법\n...'
    }
}