const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParse = require('body-parser');

const generalRoutes = require('./api/routes/general');
const moviesRoutes = require('./api/routes/movies');
const tvShowsRoutes = require('./api/routes/tvShows');
const multipleRoutes = require('./api/routes/mutiple');
const peopleRoutes = require('./api/routes/people');

/** This is use for logging the API calls before it is passed 
 * to the router */
app.use(morgan('dev'));
/** The body parser encode the parameter sent by user */
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

/** Handling CORS - please check the comment below */
app.use((req, res, next) => {
	/** We might customize to whom we want to give the access
	 * in our case we are giving to ALL*/
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-All-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization")
	/** Optional headers */
	if (req.method === 'OPTIONS') {
		req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
		return res.status(200).json({});
	}
	next();
})

/** The calls with be directed to the following component 
 * base on their first parameter string */
app.use('/general', generalRoutes);
app.use('/movies', moviesRoutes);
app.use('/tvshows', tvShowsRoutes);
app.use('/mutiple', multipleRoutes);
app.use('/people', peopleRoutes);

/** ERROR: If the calls reach this line, means error*/
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	/** 'next' is use to pass the call to next with the error 
	 * do it don't terminate here */
	next(error);
});

/** Because we defined 'next' in the above call we are able 
 * to access this middleware or else it would terminate there*/
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;


/** Some Information on CORS - Cross Origin Resource Sharing
 *
 * 1) The CORS errors occurs when two different servers are trying to communicate
 * for e.g. locahost:3000 and localhost:3001
 * 2) This is a security concept - which says why are you trying to communicate if
 * the request is coming from different servers?
 * 3) In case of RESTfully APIs, they are meant to consume by other servers so we
 * need to handle CORS by deiabling it - we tell the browser oh it's ok USER can consume
 *
 */