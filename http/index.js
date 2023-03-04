const axios = require('axios')

module.exports = {
    post: function (url, params, headers = {}) {
        return new Promise((resolve, reject) => {
			axios
				.create({
					headers,
				})
				.post(url, params)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
        })
	},
    get: function (url, params, headers = {}) {
        return new Promise((resolve, reject) => {
			axios
				.create({
					headers,
				})
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