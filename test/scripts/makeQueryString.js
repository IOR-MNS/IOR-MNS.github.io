const makeQueryString = function(data)
{
	var str = '';
	
	for (var i = 0; i < Object.keys(data).length; i++) {
		str += String(Object.keys(data)[i]) + '=' + String(data[Object.keys(data)[i]]);
		if (i < (Object.keys(data).length - 1)) {
			str += '&';
		}
	}
	
	/*str += 'eventType=' + String(data.eventType) + '&';
	str += 'playType=' + String(data.playType) + '&';
	str += 'printAll=' + String(data.printAll) + '&';
	
	if (data.leftDay !== null && data.leftDay !== undefined) {
		str += 'leftDay=' + String(document.getElementById('leftDay').value) + '&';
	} else {
		str += 'leftDay=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'leftHour=' + String(document.getElementById('leftHour').value) + '&';
	} else {
		str += 'leftHour=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'regenStaminaUsage=' + String(document.getElementById('regenStaminaUsage').value) + '&';
	} else {
		str += 'regenStaminaUsage=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'currentLevel=' + String(document.getElementById('currentLevel').value) + '&';
	} else {
		str += 'currentLevel=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'currentExp=' + String(document.getElementById('currentExp').value) + '&';
	} else {
		str += 'currentExp=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'currentStamina=' + String(document.getElementById('currentStamina').value) + '&';
	} else {
		str += 'currentStamina=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'currentTicket=' + String(document.getElementById('currentTicket').value) + '&';
	} else {
		str += 'currentTicket=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'currentItem=' + String(document.getElementById('currentItem').value) + '&';
	} else {
		str += 'currentItem=' + '&';
	}
		
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'liveConsumption=' + String(document.getElementById('liveConsumption').value) + '&';
	} else {
		str += 'liveConsumption=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'workConsumption=' + String(document.getElementById('workConsumption').value) + '&';
	} else {
		str += 'workConsumption=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'eventConsumption=' + String(document.getElementById('eventConsumption').value) + '&';
	} else {
		str += 'eventConsumption=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
	str += 'drink10=' + String(document.getElementById('drink10').value) + '&';
	} else {
		str += 'drink10=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'drink20=' + String(document.getElementById('drink20').value) + '&';
	} else {
		str += 'drink20=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'drink30=' + String(document.getElementById('drink30').value) + '&';
	} else {
		str += 'drink30=' + '&';
	}
	
	if (data.leftHour !== null && data.leftHour !== undefined) {
		str += 'maxDrink=' + String(document.getElementById('maxDrink').value) + '&';
	} else {
		str += 'maxDrink=' + '&';
	}
	
	if (document.getElementById('currentPoint') != null) {
		str += 'currentPoint=' + String(document.getElementById('currentPoint').value) + '&';
	} else {
		str += 'currentPoint=' + '&';
	}
	
	if (document.getElementById('targetPoint') != null) {
		str += 'targetPoint=' + String(document.getElementById('targetPoint').value);
	} else {
		str += 'targetPoint=';
	}*/
	

	console.log(str);
	return str;
}