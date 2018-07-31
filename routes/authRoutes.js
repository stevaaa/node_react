const passport = require('passport');

module.exports = app => {
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));

	// handle the request to get more info because google has given redirect code link
	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/current_user', (req, res) => {
		console.log("/api/current_user route");
		console.log(req);
		res.send(req.user);
	});
};
