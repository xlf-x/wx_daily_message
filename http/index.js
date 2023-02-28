const axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

module.exports = {
    post: function (url, params) {
        return new Promise((resolve, reject) => {
			axios
				.post(url, params)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
        })
	},
    get: function (url, params) {
        return new Promise((resolve, reject) => {
			axios
				.get(url, {
					params,
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		})
	},
}