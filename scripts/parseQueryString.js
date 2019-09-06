const parseQueryString = function(url) {
	var i = 0;
	while (true) {
		if (i >= url.length) {
			alert('error: there is no query string in url.');
			return false;
		}
		if (url.charAt(i++) === '?') {
			break;
		}
	}
	
	var tempStr = '';
	var tempArr = new Array();
	
	while (true) {
		if (i >= url.length) {
			tempArr.push(tempStr);
			tempStr = '';
			break;
		}
		
		if (url.charAt(i) === '=' || url.charAt(i) === '&') {
			tempArr.push(tempStr);
			tempStr = '';
			i++;
			continue;
		}
		
		tempStr += url.charAt(i);
		i++;
	}
	
	var obj = {};
	for (i = 0; (i + 1) < tempArr.length; i += 2) {
		obj[tempArr[i]] = tempArr[i+1];
	}
	
	return obj;
}