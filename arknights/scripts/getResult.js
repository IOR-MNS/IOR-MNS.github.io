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
	
	console.log('checkedTags', checkedTags)
	
	return checkedTags
}

const getResult = function() {
	var queryString = makeQueryString(fetchFormData())
	
	if (queryString === false)
	{
		console.log('선택 태그 없음')
		return false
	}
	
	fetch(('recruitmentCalc.html.worker?' + queryString), {
			method: 'POST',
	})
	.then(function(res) {
		return res.text();
	})
	.then(function(resultText) {
		showResult(resultText);
	});
}