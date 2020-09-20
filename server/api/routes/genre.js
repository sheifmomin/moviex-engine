const express = require('express');
const router = express.Router();
var request = require('request');
const async = require('async');

const config = require('../../config/config');

// Get the list of Genre for Movies and TV Shows*/
router.get('/', (req, res, next) => {
	const api_key = config.api_key;
	var requestArray = [
			{url: `${config.movie_genre_baseUrl}?api_key=${api_key}&language=en-US`},
			{url: `${config.tv_genre_baseUrl}?api_key=${api_key}&language=en-US`}
		];

	let getApi = function (opt, callback) {
		request(opt, (err, response, body) => {
			callback(err, JSON.parse(body));
		});
	};

	const functionArray = requestArray.map((opt) => { 
		return (callback) => getApi(opt, callback); 
	});

	async.parallel(
		functionArray, (err, results) => {
			if (err) {
				console.error('Error: ', err);
			} else {
				res.status(200).json({
					message: results
				});
			}
	});
});

/** The router is expoted so the Movies component
 * can be accessible in the components */
module.exports = router;