var createError = require('http-errors');  
var express = require('express'); 
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); // сервак создался

// view engine setup
app.set('views', path.join(__dirname, 'views')); // задает переменную, для пути с паговскими шаблоны из папки views
app.set('view engine', 'pug'); // хз

app.use(logger('dev')); // штука для создания логов - морган на 5 строке задана ( в package.json  "morgan": "~1.9.1", )
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //хз
app.use(cookieParser()); //см 4 строку 
app.use(express.static(path.join(__dirname, 'public'))); // папка для статических ассетов папка public

app.use('/', indexRouter); // роутеры для путей, которые мы будем использовать. Роутеры нужны, чтобы разбирать запрос: для / главной страницы используем направления для главной indexRouter. Для страницы /users роутим на usersRouter - которые мы определили выше в переменных
app.use('/users', usersRouter);

// catch 404 and forward to error handler - если он в первые 2 роутера не попал, то покажет 404
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
  res.render('error');
});

module.exports = app;
