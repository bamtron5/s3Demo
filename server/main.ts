import * as bodyParser from 'body-parser';
import * as debug from 'debug';
import * as ejs from 'ejs';
import * as express from 'express';
let expressValidator = require('express-validator');
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as path from 'path';
import routes from './routes/index';
import * as uploadAPI from './api/upload.api';
import * as signAPI from './api/sign.api';

let app = express();
const isDev = app.get('env') === 'development' ? true : false;

// helmet (read the docs)
app.use(helmet());

// logging
app.use(morgan('dev'));

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// static routing
app.use('/favicon.ico', express.static(path.join(__dirname, '../client/favicon.ico')));
app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, '..node_modules')));
app.use('/client', express.static('client'));

// config bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());

// a server route
app.use('/', routes);

// apis
app.use('/api', uploadAPI);
app.use('/api', signAPI);

// THIS IS THE INTERCEPTION OF ALL OTHER REQ
// After server routes / static / api
// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    // return isDev ? res.render('dist') : res.render('dist');
    return res.render('index');
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (isDev) {
  app.use((err, res) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err['message'],
      error: err // STACK TRACE
    });
  });
}

// production error handler
app.use((err, res) => {
  res.status(err['status'] || 500);
});

export = app;
