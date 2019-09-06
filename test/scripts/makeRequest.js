/*const makeRequest = function (content, e)
{
	var httpRequest = new XMLHttpRequest();
	
	httpRequest.onreadystatechange = function ()
	{
		if (httpRequest.readyState === XMLHttpRequest.DONE)
		{
			if (httpRequest.status === 200) {
				return httpRequest.responseText;
			} else {
				alert('예기치 못한 오류: 서버에게서 받은 응답: ', httpRequest.status);
			}
		}
	}
	
	httpRequest.open('POST', location);
	httpRequest.setRequestHeader('Content-Type', 'text/plain');
	httpRequest.send(content);
}*/

// variable content should be 'string' or {object}
const makeRequest = function (content)
{
	fetch(location.href, {
		method: 'POST',
		body: content,
	}).then(res => res.json())
	.then(response => console.log('Success:', JSON.stringify(response)))
	.catch(error => console.error('Error:', error));
}