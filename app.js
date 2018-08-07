var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
var cors = require('cors');

var authRouter = require('./routes/authentication');
var userRouter = require('./routes/users');
var projectRouter = require('./routes/projects');
var statusRouter = require('./routes/stati');
var oauth = require('./routes/forge/oauthtoken');
var oss = require('./routes/forge/oss');
var modelderivative = require('./routes/forge/modelderivative');

const Schema = mongoose.Schema; // Import Schema from Mongoose

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cors());

app.use('/', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/api/authentication', authRouter);
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/status', statusRouter)
app.use('/api/forge', oauth); // redirect oauth API calls

app.use('/api/forge', oss); // redirect OSS API calls
app.use('/api/forge', modelderivative); // redirect model derivative API calls

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

mongoose.connect('mongodb://localhost/Execut', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
  
module.exports = app;

