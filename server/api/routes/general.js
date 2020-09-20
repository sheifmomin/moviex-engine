const express = require('express');
const router = express.Router();
var request = require('request');

const config = require('../../config/config');

// API Source: https://developers.themoviedb.org/3/search
/** Get movie or TV Shows or both by Search Query */
router.get('/:type', (req, res, next) => {
	let baseUrl = config.muti_baseUrl;
	if (req.params.type === 'movie') {
		baseUrl = config.movie_baseUrl;
	} else if (req.params.type === 'tvshow') {
		baseUrl = config.tvShow_baseUrl;
	}
	const api_key = config.api_key;
	const searchQuery = req.query.searchQuery;
	const url = `${baseUrl}?api_key=${api_key}&language=en-US&query=${searchQuery}&include_adult=false`;
	const params = {
		url: url,
		headers: {
			'Content-Type': 'application/json'
		},
		json: true
	};
	request.get(params, function (error, response, body) {
		res.status(200).json({
			message: body
		});
	});
});

/** The router is expoted so the Movies component
 * can be accessible in the components */
module.exports = router;