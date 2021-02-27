export function executeRequest(url, params = null){
	return fetch(url)
	.then((response) => response.json())
	.catch((errors) => null);
}