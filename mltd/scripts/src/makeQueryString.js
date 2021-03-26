const makeQueryString = function(data)
{
	var str = '';
	
	for (var i = 0; i < Object.keys(data).length; i++) {
		str += String(Object.keys(data)[i]) + '=' + String(data[Object.keys(data)[i]]);
		if (i < (Object.keys(data).length - 1)) {
			str += '&';
		}
	}
	return str;
}