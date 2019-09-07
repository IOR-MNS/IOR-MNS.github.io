const makeRequest = function (url)
{
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: 'POST',
		})
		.then(function(response) {
			resolve(response.text());
		});
	});
}