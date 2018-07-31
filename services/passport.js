const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	//1st param error object, 2nd param identifying information of the user:: id assigned by mongoDB
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
			done(null, user);
		});
});

passport.use(
	new googleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id })
				.then((existingUser) => {
					if (existingUser) {
						//we already have the reord with given prifile id
						done(null, existingUser);
					} else {
						//we donot have a user receod with this id, making a new record
						new User({ googleId: profile.id })
							.save()
							.then(user => done(null, user));
					}
				});


			// console.log('accessToken', accessToken);
			// console.log('refreshToken', refreshToken);
			// console.log('profile', profile);
		}
	)
);
