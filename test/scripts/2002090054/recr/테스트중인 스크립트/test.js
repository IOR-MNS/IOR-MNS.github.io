//TEST
var uiDir = 'left'
const toggleUI = function ()
{
	var dirs = ['left', 'center', 'right']
	
	var nextDir = dirs.indexOf(uiDir) + 1
	
	if (nextDir >= dirs.length)
	{
		nextDir = 0
	}
	
	uiDir = dirs[nextDir]
	
	$('#toggleUI-Btn').text(uiDir)
	
	// 태그 선택 패널 내의 태그들 위치 정렬 변경
	$('form[class$="_tag"]').css('text-align', uiDir)
	
	// 태그 선택 패널의 위치 변경
	//$('div.selectable_tag').css('text-align', uiDir)
	
	// 태그 선택 패널 아래의 버튼 위치 변경
	var clearBtn = '<button onclick="clearSelection()">태그 초기화</button>'
	var filterBtn = '<input onclick="filterClicked(\'onlyHighStars\')" type="checkbox" id="selection-panel-footer-ohsf" class="checkboxButton"><label for="selection-panel-footer-ohsf"><span>고등급 확정식만</span></label>'
	
	if (uiDir === 'left')
	{
		$('#selection-panel-footer-btn').html(clearBtn + ' ' + filterBtn)
	}
	else if (uiDir === 'center' || uiDir === 'right')
	{
		$('#selection-panel-footer-btn').html(filterBtn + ' ' + clearBtn)
	}
}