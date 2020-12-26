function animateLines(parentElement, interval)
{
	var children = parentElement.childNodes;
	var i = 0;
	
	setTimeout( function step_animateLines() {
		if (i >= children.length) {
			return;
		}
		children[i].style.display = 'inline';
		setTimeout(step_animateLines, interval);
		i++;
	}, interval);
}