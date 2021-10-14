var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');
var app = express();

const url = "mongodb://localhost:27017/travelexperts_mongodb_json_collections?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
mongoose.connect(url);

const formSchema = new mongoose.Schema(
  {
    data: Object,
  },
  {collection:"contact"}
);

const Form = mongoose.model("Form", formSchema);

const formData = (bodyData) => {
  Form ({data:bodyData}).save((err) => {
    if (err) {
      throw err;
    }
  } );
};

const regSchema = new mongoose.Schema(
  {
    data: Object,
  },
  {collection:"register"}
);

const Regis = mongoose.model("Regis", regSchema);

const regData = (bodyData) => {
  Regis ({data:bodyData}).save((err) => {
    if (err) {
      throw err;
    }
  } );
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get("/index", (req, res) => {
    res.render("index");
  });
app.get("/contact", (req, res) => {
    res.render("contact");
  });  
app.get("/mregister", (req, res) => {
    res.render("mregister");
  });
app.get("/cregister", (req, res) => {
    
    res.render("cregister");
  });
app.get("/services", (req, res) => {
    res.render("services");
  });  
app.get("/login", (req, res) => {
    res.render("login");
  }); 
app.get("/mentorRegis", (req, res) => {
    res.render("mentorRegis");
  });   
  
app.post("/cregister", (req, res)=> {
    formData(req.body);
    res.render("cregister");
  });
 
app.post("/mregister", (req, res) =>{
  regData(req.body);
  res.render("mregister");
});  

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
  res.render('error');
});

module.exports = app;
