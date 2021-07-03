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

UserSchema.methods.comparePasswords = function(passwordToTest) {
  return bcrypt.compareSync(passwordToTest, this.password);
}

UserSchema.static.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

module.exports = mongoose.model("user", UserSchema);
