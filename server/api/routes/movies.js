const express = require('express');
const router = express.Router();
var request = require('request');

const config = require('../../config/config');

/** Get movie by Search Query */
router.get('/:type', (req, res, next) => {
	const api_key = config.api_key;
	const searchQuery = req.body.movieQuery;
});

/** The router is expoted so the Movies component
 * can be accessible in the components */
module.exports = router;