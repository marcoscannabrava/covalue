/// catch 404 and forward to error handler
function errorCatch(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
};
/// Error Handlers
// development error handler - will print stacktrace
function devErrorHandler(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: err
    }});
};

// production error handler - no stacktraces leaked to user
function prodErrorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
};

module.exports = {
  errorCatch,
  devErrorHandler,
  prodErrorHandler
}