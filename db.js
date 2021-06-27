const mongoose = require('mongoose');

const CONNECTION_STRING = `mongodb+srv://root:${process.env.MONGODB_PASSWORD}@user-dashboard.p60yz.mongodb.net/user-dashboard?retryWrites=true&w=majority`;

module.exports = async () => {
  await mongoose.connect(CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  console.log('Database connected!');
}