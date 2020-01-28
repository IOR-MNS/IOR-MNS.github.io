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
	
	console.log(checkedTags)
	
	return checkedTags
}

const getResult = function() {
	fetch(('recruitmentCalc.html.worker?' + makeQueryString(fetchFormData())), {
			method: 'POST',
	})
	.then(function(res) {
		return res.text();
	})
	.then(function(resultText) {
		showResult(resultText);
	});
}