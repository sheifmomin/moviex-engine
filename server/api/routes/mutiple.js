const express = require('express');
const router = express.Router();

const config = require('../../config/config');

/** Get movie by Search Query */
router.get('/', (req, res, next) => {
	const api_key = config.api_key;
	const movieQuery = req.body.movieQuery;
	console.log(api_key, movieQuery)
});

/** The router is expoted so the Movies component
 * can be accessible in the components */
module.exports = router;