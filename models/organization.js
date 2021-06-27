const mongoose = require('mongoose');

const OrganizationSchema = mongoose.Schema({
  name: String,
  owner: { type: mongoose.Types.ObjectId, ref: 'user' },
  dashboards: {
    type: [{ type: mongoose.Types.ObjectId, ref: 'dashboard' }],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model("organization", OrganizationSchema);
