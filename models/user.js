const mongoose = require('mongoose');

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

module.exports = mongoose.model("user", UserSchema);
