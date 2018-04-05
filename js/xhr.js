const req = ({ method, url, data }) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onerror = () => reject(xhr.statusText);
		switch (method.toLowerCase()) {
			case 'get':
				xhr.onload = () => resolve(xhr.responseText);
				xhr.send();
	    	break;
    	case 'post':
    		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.onreadystatechange = () => {
			    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			    	resolve(xhr.responseText);
			    }
				}
				xhr.send(data);
				break;
		}
	});
}

const get = options => req({ ...options, method: 'get' });
const post = options => req({ ...options, method: 'post' });
const toJSON = data => JSON.parse(data);
const getJSON = options => get(options).then(toJSON);

export default { post, get, getJSON };