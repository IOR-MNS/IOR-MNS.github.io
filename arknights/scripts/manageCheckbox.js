var selectionCount = 0

const countChecked = function (checkBox) {
	if (checkBox.checked) {
		selectionCount++
	}
	else {
		selectionCount--
	}
	
	if (selectionCount > 6) {
		checkBox.checked = false;
		selectionCount--
	}
}

const clearSelection = function () {
	var checkboxList = document.querySelectorAll('.tag')
	
	for (var i = 0; i < checkboxList.length; ++i)
	{
		checkboxList[i].checked = false
		selectionCount = 0
	}
}