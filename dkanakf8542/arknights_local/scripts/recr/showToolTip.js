/*
$(document).ready(function() {
	$(document).on('mouseover','.result_op',function(e){ //마우스 오버시
		
		$('body').append('<p id='preview'><img src='images/op/chen.png'/></p>'); //보여줄 이미지를 선언						 
		$('#preview')
			.css('top', e.pageY + 'px')
			.css('left', e.pageX + 'px')
			.fadeIn(150); //미리보기 화면 설정 셋팅
	});

	$(document).on('mousemove','.result_op',function(e){ //마우스 이동시
		$('#preview')
			.css('top', e.pageY + 'px')
			.css('left', e.pageX + 'px');
	});

	$(document).on('mouseout','.result_op',function(){ //마우스 아웃시
		
		$('#preview').remove();
	});
	 
});
*/

$(document).ready(function() {
	// 마우스가 요소에 들어감
	$(document).on('click mouseover', '.result_op', function(e) {
		// 기존의 툴팁 모두 제거
		$('#tooltip').remove()
		
		var opName = $(e.target).text()
		var tagCode = opMap.get(opName)
		var tags = []
		getTagNames(tagCode, tags)
		
		var tooltipHtml = ''
		for (var i = 0; i < tags.length; ++i)
		{
			tooltipHtml += '<span class="result_tag">' + tags[i] + '</span>'
		}
		
		$('body').append('<p id="tooltip">' + tooltipHtml + '</p>');
		$('#tooltip')
			.css('top', e.pageY + 'px')
			.css('left', e.pageX + 'px')
			.fadeIn(200)
	})
	
	// 마우스 이동
	$(document).on('mousemove', '.result_op', function(e) {
		$('#tooltip')
			.css('top', e.pageY + 'px')
			.css('left', e.pageX + 'px')
	})
	
	// 마우스가 요소 밖으로 나감
	$(document).on('mouseout', '.result_op', function() {
		
		$('#tooltip').remove()
	})
	 
})