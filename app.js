var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');
const router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');
const hbs = require('hbs');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static('views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
/**
 * parse requests of content-type - application/json
 */
app.use(bodyParser.json());
/**
 * parse requests of content-type - application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  var url = req.url;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('./views/index.html', (err, preg) => {
    if (err) res.send(err);
    else {
      res.write(preg);
      res.end();
    }
  });
});
app.get('/createuser', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('./views/userform.html', (err, preg) => {
    if (err) res.send(err);
    else {
      res.write(preg);
      res.end();
    }
  });
});
app.get('/createproject', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('./views/projectform.html', (err, preg) => {
    if (err) res.send(err);
    else {
      res.write(preg);
      res.end();
    }
  });
});

app.use('/', router);
app.listen(process.env.PORT || 8000);
console.log('Listening to PORT 8000');
app.use('/users', require('./routes/user_routes'));
app.use('/projects', require('./routes/project_routes'));
