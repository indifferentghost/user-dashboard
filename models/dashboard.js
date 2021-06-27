const mongoose = require('mongoose');

const DashboardSchema = mongoose.Schema({
  organization: {
    type: mongoose.Types.ObjectId,
    ref: 'organization'
  }
}, { timestamps: true });

module.exports = mongoose.model("dashboard", DashboardSchema);
