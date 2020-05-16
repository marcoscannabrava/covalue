var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    cors = require('cors'),
    // session = require('express-session'),
    mongoose = require('mongoose'),
    { errorCatch, devErrorHandler, prodErrorHandler } = require('./errorHandlers');

var isProduction = process.env.NODE_ENV === 'production';

var app = express();

// Middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

// Serve React Frontend
app.use(express.static(path.join(__dirname, '../client/build')));
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

/// Connection to MongoDB
let options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}
if(isProduction){
  mongoose.connect(process.env.MONGODB_URI, options).catch(err => console.log('\n\nError on Connecting to MongoDB (Production Environment):\n', err));
} else {
  // if in container use: 'mongodb://root:example@mongo:27017'
  mongoose.connect('mongodb://root:example@localhost:27017', options).catch(err => console.log('\n\nError on Connecting to MongoDB (Dev Environment):\n', err));
  mongoose.set('debug', true);
}

// Models
require('./models/User');
require('./models/AccRecord');

// Routes
app.use(require('./routes'));

// Error Handlers
app.use(errorCatch);
if (!isProduction) app.use(devErrorHandler)
app.use(prodErrorHandler)

//  Get port from environment and store in Express.
var port = process.env.PORT || '8000';

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})