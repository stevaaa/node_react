const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose; // destructuring similar to the above line

const userSchema = new Schema({
	"googleId":	String
});

//create a new collection names users if not exists
mongoose.model('users', userSchema);
