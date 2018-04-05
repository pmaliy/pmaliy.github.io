export default { get, post };
export get;
export post;

function get(url, init) {
	return fetch(url, init).then(response => response.json());
}

function post(url, data, init) {
	return fetch(url, {
		body: JSON.stringify(data),
		headers: {
      'content-type': 'application/json'
    },
		...init,
		method: 'POST',
	}).then(response => response.json());
}