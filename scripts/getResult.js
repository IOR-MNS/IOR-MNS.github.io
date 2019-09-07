const fetchFormData = function (eventType, playType, printAll) {
	var formData = {};
	
	formData.eventType = eventType;
	formData.playType = playType;
	formData.printAll = printAll;
	formData.receivedDailyItem = Number(document.getElementById('receivedDailyItem').checked);
	formData.leftDay = Number(document.getElementById('leftDay').value);
	formData.leftHour = Number(document.getElementById('leftHour').value);
	formData.regenStaminaUsage = Number(document.getElementById('regenStaminaUsage').value);
	formData.currentLevel = Number(document.getElementById('currentLevel').value);
	formData.currentExp = Number(document.getElementById('currentExp').value);
	formData.currentStamina = Number(document.getElementById('currentStamina').value);
	formData.drink10 = Number(document.getElementById('drink10').value);
	formData.drink20 = Number(document.getElementById('drink20').value);
	formData.drink30 = Number(document.getElementById('drink30').value);
	formData.maxDrink = Number(document.getElementById('maxDrink').value);
	formData.currentPoint = Number(document.getElementById('currentPoint').value);
	formData.targetPoint = Number(document.getElementById('targetPoint').value);
	formData.currentItem = Number(document.getElementById('currentItem').value);
	formData.eventConsumption = Number(document.getElementById('eventConsumption').value);
	if ( !(eventType == 2 && playType == 2) ) {
		formData.liveConsumption = Number(document.getElementById('liveConsumption').value);
	}
	//theater
	if (eventType == 1) {
		formData.currentTicket = Number(document.getElementById('currentTicket').value);
	}
	//work
	if (playType == 2) {
		formData.workConsumption = Number(document.getElementById('workConsumption').value);
	}
	return formData;
}

const showResult = function (resultText, animationDelay) {
	document.getElementById('calcResult').innerHTML = resultText;
	animateLines(document.getElementById('calcResult'), animationDelay);
}

const getResult = function(eventType, playType, printAll, animationDelay) {
	fetch('calc.html.worker?' + makeQueryString(fetchFormData(eventType, playType, printAll)), {
			method: 'POST',
	})
	.then(function(res) {
		return res.text();
	})
	.then(function(resultText) {
		showResult(resultText, animationDelay);
	});
}