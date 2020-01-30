const fetchFormData = function () {
	var checkboxList = document.querySelectorAll('.tag')
	var checkedTags = new Array()
	
	for (var i = 0, j = 0; i < checkboxList.length; ++i)
	{
		if (checkboxList[i].checked === true)
		{
			checkedTags[j++] = checkboxList[i].name
		}
	}
	
	//console.log('checkedTags', checkedTags)
	
	return checkedTags
}

const getResult = function() {
	var queryString = makeQueryString(fetchFormData())
	
	if (queryString === false)
	{
		//console.log('선택 태그 없음')
		// 태그를 선택하지 않고 결과보기를 누른 경우, 결과출력을 초기화.
		document.getElementById('calcResult').innerHTML = '<form></form>'
		return false
	}
	
	//console.log('qs', queryString)
	
	var fetchURI = encodeURI('recruitmentCalc.html.worker?' + queryString)
	
	//console.log('fu', fetchURI)
	
	fetch((fetchURI), {
			method: 'POST',
	})
	.then(function(res) {
		return res.text();
	})
	.then(function(resultText) {
		showResult(decodeURIComponent(resultText));
	});
}