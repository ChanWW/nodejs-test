//加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');
var http = require("http")

// 加载路由控制
var routes = require('./routes/index');
var users = require('./routes/users');
var upload = require('./routes/upload');
var test = require('./routes/test');

// 创建项目实例
var app = express();

// view engine setup
// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// 定义icon图标
//app.use(favicon(__dirname + '/public/favicon.ico'));
// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 定义cookie解析器
app.use(cookieParser());
//定义session
app.use(session({
    secret:'ChanWW nodejs webapp',
    saveUninitialized:true,
    resave:true,
    cookie:{ maxAge: 600 * 1000 }
}));
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 匹配路径和路由
app.use('/', routes);
app.use('/users', users);
app.use('/upload', upload);
app.use('/test',test);

// catch 404 and forward to error handler
// 404错误处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// 开发环境，500错误处理和错误堆栈跟踪
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// 生产环境，500错误处理
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// 输出模型app
module.exports = app;
