// 만약 플랫폼명이 비어있거나 했다면 기본값은 모바일
var isMobile = true

const refreshStyle = function () {
	if (isMobile)
	{
		// 모바일 전용 스타일
	}
	else
	{
		// PC 전용 스타일
		$('*').addClass('pc')//css('width', '90vmin')
		/*$('.checkboxTag').addClass('pc')//'input[type="checkbox"].tag:hover+label{border-color:#096485;}'
		$('.checkboxButton').addClass('pc') //:hover+label{background-color:#0d79a1;}</style>'*/
	}
}

$(document).ready(function () {
	var pcPlatformFilter = ['win16', 'win32', 'win64' ,'mac', 'macintel']

	if (navigator.platform)
	{
		if (pcPlatformFilter.indexOf(navigator.platform.toLowerCase()) < 0) 
		{
			//mobile
			isMobile = true
		}
		else
		{
			//pc
			isMobile = false
		}
	}
	
	// 반응형 스타일 최초 적용
	$(window).bind('load', refreshStyle())
})