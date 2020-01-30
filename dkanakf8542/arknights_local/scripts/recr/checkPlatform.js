$(document).ready(function () {
	var pcPlatformFilter = "win16|win32|win64|mac|macintel"
	var isMobile = true

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
	
	if (isMobile)
	{
		// 모바일 전용 스타일
		console.log("모바일")
		$('body').append('<style>form{width: 80vmin;</style>')
	}
	else
	{
		// PC 전용 스타일
		console.log("PC")
		$('body').append('<style>form{width: 90vmin;</style>')
		$('body').append('<style>input[type="checkbox"]:hover+label {border-color:#096485;}</style>')
	}
})