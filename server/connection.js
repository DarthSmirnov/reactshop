// Mongo DB
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb+srv://smirnov:aqws1993@cluster0.eazsh.mongodb.net/ng-shop?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

module.exports = mongoose;
