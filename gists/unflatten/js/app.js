import unflatten from 'unflatten'
import { get } from '/js/jsonRequest';

get('data/sample.json')
	.then(data => unflatten(data))
	.then(consle.log);

// (function(type, url, cb) {
// 	const req = new XMLHttpRequest();
// 	req.addEventListener('load', cb);
// 	req.open(type, url);
// 	req.send();
// })('get', 'data/sample.json', function() {
// 	console.log(this);
// 	console.log(unflatten(this.data));
// });