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
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id })
			if (existingUser) {
				//we already have the reord with given prifile id
				return done(null, existingUser);
			}
				//we donot have a user receod with this id, making a new record
				const user = await new User({ googleId: profile.id }).save()
				done(null, user);

			// console.log('accessToken', accessToken);
			// console.log('refreshToken', refreshToken);
			// console.log('profile', profile);
		}
	)
);
