function animateLines(parentElement, interval)
{
	var children = parentElement.childNodes;
	var i = 0;
	var e = null;
	
	timerID = setTimeout( function step_animateLines() {
		if (i >= children.length) {
			return;
		}
		e = children[i];
		e.style.opacity = 0;
		e.style.display = 'inline';
		fadeIn(e);
		setTimeout(step_animateLines, interval);
		i++;
	}, interval);
}

function fadeIn(objectElement)
{
	var opacityLevel = 0;
	var fadeInTimerID = null;
	fadeInTimerID = setTimeout(function step_fadeIn() {
		opacityLevel = fadeInAction(objectElement, opacityLevel, fadeInTimerID);
		if( opacityLevel > 1 ) {
			return;
		}
		fadeInTimerID = setTimeout(step_fadeIn, 10);
	}, 10);
}

function fadeInAction(objectElement, opacityLevel, fadeInTimerID)
{
	opacityLevel += 0.01;
	changeOpacity(objectElement, opacityLevel);
	return opacityLevel;
}

function changeOpacity(objectElement, opacityLevel)
{
	objectElement.style.opacity = opacityLevel;
	objectElement.style.MozOpacity = opacityLevel;
	objectElement.style.KhtmlOpacity = opacityLevel;
}