const types = parseQueryString(location.href);

if (types === false) {
	alert('올바른 경로로 접근해주세요.');
	location.href = "../calc_selectType.html"
}

const eventType = Number(types.eventType);
const playType = Number(types.playType);
var i = 0;
//theater
if (eventType == 1) {
	document.getElementById('currentItem').value = "180";
	document.getElementById('eventConsumption').innerHTML += '<option value="4">4배수</option>';
}
//tour
if (eventType == 2) {
	document.getElementById('currentItem').value = "1";
	document.getElementById('eventConsumption').innerHTML += '<option value="3">3배수</option>';
}
//live
if (playType == 1) {
	document.getElementById('targetPoint').value = "30000";
	document.getElementById('liveConsumptionLabel').innerHTML += '일반곡 배수 선택';
	document.getElementById('liveConsumption').innerHTML += '<option value="30" selected>1배수</option>';
	document.getElementById('liveConsumption').innerHTML += '<option value="60">2배수</option>';
}
//work
if (playType == 2) {
	document.getElementById('targetPoint').value = "200000";
	
	//not tour
	if (eventType != 2) {
		document.getElementById('liveConsumptionLabel').innerHTML += '티켓 사용 배수 선택';
		for (i = 3; i < 10; i++) {
			document.getElementById('liveConsumption').innerHTML += '<option value="' + 30*i + '">' + i + '배수</option>';
		}
		document.getElementById('liveConsumption').innerHTML += '<option value="300" selected>10배수</option>';
	}
	//tour
	else {
		document.getElementById('liveConsumptionLabel').style.display = 'none';
		document.getElementById('liveConsumption').style.display = 'none';
	}
}

var elements;

if (eventType == 1) {
	document.getElementById('subtitle').innerHTML += 'PSTheater & '
	elements=document.getElementsByClassName("tour");
	for (i = 0; i < elements.length; i++) {
		elements[i].style.display="none";
	}
}
if (eventType == 2) {
	document.getElementById('subtitle').innerHTML += 'PSTour & '
	elements=document.getElementsByClassName("theater");
	for (i = 0; i < elements.length; i++) {
		elements[i].style.display="none";
	}
}
if (playType == 1) {
	document.getElementById('subtitle').innerHTML += '라이브런'
	elements=document.getElementsByClassName("work");
	for (i = 0; i < elements.length; i++) {
		elements[i].style.display="none";
	}
}
if (playType == 2) {
	document.getElementById('subtitle').innerHTML += '영업런'
	elements=document.getElementsByClassName("live");
	for (i = 0; i < elements.length; i++) {
		elements[i].style.display="none";
	}
}

const buttonClicked = function(printAll, animationDelay) {
	getResult(eventType, playType, printAll, animationDelay);
}