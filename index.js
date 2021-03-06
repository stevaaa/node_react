const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user')
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

//app.use are middlewares or small functions that can be used to
//modify incoming requests to our app before they are routed to handlers
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

// require('./routes/authRoutes')(app);
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
