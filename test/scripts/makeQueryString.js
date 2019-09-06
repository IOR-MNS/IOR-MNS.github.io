const makeQueryStr = function(eventType, playType, printAll)
{
	var str = '';
	
	str += 'eventType=' + String(eventType) + '&';
	str += 'playType=' + String(playType) + '&';
	str += 'printAll=' + String(printAll) + '&';
	
	if (document.getElementById('leftDay') != null) {
		str += 'leftDay=' + String(document.getElementById('leftDay').value) + '&';
	} else {
		str += 'leftDay=' + '&';
	}
	
	if (document.getElementById('leftHour') != null) {
		str += 'leftHour=' + String(document.getElementById('leftHour').value) + '&';
	} else {
		str += 'leftHour=' + '&';
	}
	
	if (document.getElementById('regenStaminaUsage') != null) {
		str += 'regenStaminaUsage=' + String(document.getElementById('regenStaminaUsage').value) + '&';
	} else {
		str += 'regenStaminaUsage=' + '&';
	}
	
	if (document.getElementById('currentLevel') != null) {
		str += 'currentLevel=' + String(document.getElementById('currentLevel').value) + '&';
	} else {
		str += 'currentLevel=' + '&';
	}
	
	if (document.getElementById('currentExp') != null) {
		str += 'currentExp=' + String(document.getElementById('currentExp').value) + '&';
	} else {
		str += 'currentExp=' + '&';
	}
	
	if (document.getElementById('currentStamina') != null) {
		str += 'currentStamina=' + String(document.getElementById('currentStamina').value) + '&';
	} else {
		str += 'currentStamina=' + '&';
	}
	
	if (document.getElementById('currentTicket') != null) {
		str += 'currentTicket=' + String(document.getElementById('currentTicket').value) + '&';
	} else {
		str += 'currentTicket=' + '&';
	}
	
	if (document.getElementById('currentItem') != null) {
		str += 'currentItem=' + String(document.getElementById('currentItem').value) + '&';
	} else {
		str += 'currentItem=' + '&';
	}
		
	if (document.getElementById('liveConsumption') != null) {
		str += 'liveConsumption=' + String(document.getElementById('liveConsumption').value) + '&';
	} else {
		str += 'liveConsumption=' + '&';
	}
	
	if (document.getElementById('workConsumption') != null) {
		str += 'workConsumption=' + String(document.getElementById('workConsumption').value) + '&';
	} else {
		str += 'workConsumption=' + '&';
	}
	
	if (document.getElementById('eventConsumption') != null) {
		str += 'eventConsumption=' + String(document.getElementById('eventConsumption').value) + '&';
	} else {
		str += 'eventConsumption=' + '&';
	}
	
	if (document.getElementById('drink10') != null) {
	str += 'drink10=' + String(document.getElementById('drink10').value) + '&';
	} else {
		str += 'drink10=' + '&';
	}
	
	if (document.getElementById('drink20') != null) {
		str += 'drink20=' + String(document.getElementById('drink20').value) + '&';
	} else {
		str += 'drink20=' + '&';
	}
	
	if (document.getElementById('drink30') != null) {
		str += 'drink30=' + String(document.getElementById('drink30').value) + '&';
	} else {
		str += 'drink30=' + '&';
	}
	
	if (document.getElementById('maxDrink') != null) {
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
	}
	

	console.log(str);
	return str;
}