var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    cors = require('cors'),
    session = require('express-session'),
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
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

/// Connection to MongoDB 
if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost:27017', { user: 'root', pass: 'example', useNewUrlParser: true });
  mongoose.set('debug', true);
}

// Models
require('./models/User');
require('./models/AccRecord');

// Routes
app.use(require('./routes/index'));

// Error Handlers
app.use(errorCatch);
!isProduction ? app.use(devErrorHandler) : app.use(prodErrorHandler)

//  Get port from environment and store in Express.
var port = process.env.PORT || '8000';

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})