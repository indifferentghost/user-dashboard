const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  organizatons: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'organization'
    }],
    default: []
  }
}, { timestamps: true });

/*
  // assign a function to the "methods" object of our animalSchema
  animalSchema.methods.findSimilarTypes = function(cb) {
    return mongoose.model('Animal').find({ type: this.type }, cb);
  };
*/
// instance methods
// <- child type `user`
// user.findW/e
// validate the password
// password on the individual user

// `this` is hard
// congitive load
// user.password
UserSchema.methods.comparePasswords = function(passwordToTest) {
  return bcrypt.compareSync(passwordToTest, this.password);
}
/* 
// why we're using a function declaration instead of an arrow function
const userInstance = User.find({ _id: id });

const { comparePasswords } = userInstace;

comparePasswords()
*/

UserSchema.static.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

module.exports = mongoose.model("user", UserSchema);
