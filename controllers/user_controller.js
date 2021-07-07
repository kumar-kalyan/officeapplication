var express = require('express');
var app = express();
const moment = require('moment');
let m = moment();
const hbs = require('hbs');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info.leftoutar@gmail.com',
    pass: 'indoleft',
  },
});
/**
 * User controller : All business logic goes here
 */
const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
/**
 * this method is to create the user
 */
exports.create = (req, res) => {
  /**
   * validation request
   */
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).send({
      message: 'Required field can not be empty',
    });
  }
  /**
   * Create a user
   */
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    isActive: req.body.isActive,
    userType: req.body.userType,
    designaton: req.body.designation,
  });
  /**
   * Save user to database
   */
  user
    .save()
    .then((data) => {
      data.createdAt = moment().format('dd-mm-yy');
      console.log('HELLO', data.createdAt);
      var mailOptions = {
        from: 'info',
        to: data.email,
        subject: 'Sending Email using Node js',
        html: `
          <body bgcolor="#87CEEB" leftmargin="0" marginheight="0" marginwidth="0" offset="0" topmargin="0">
<!-- background table -->
<table bgcolor="#87CEEB" id="bgtable" align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
  <tr>
      <td align="center" valign="top">
          <!-- container 600px -->
          <table border="0" cellpadding="0" cellspacing="0" class="container" width="600">
              <tr>
                  <td align="left">
                      <h1>Hello Welcome to our App</h1>
                  </td>
              </tr>
              <tr>
              <td align="left">
                  <p>Name: ${data.name}</p>
              </td>
          </tr>
          <tr>
          <td align="left">
              <p>Email: ${data.email}</p>
          </td>
      </tr>
      <tr>
      <td align="left">
          <p>You registered on ${data.createdAt}</p>
      </td>
  </tr>
          </table>
          <!-- container 600px -->
      </td>
  </tr>
</table>
<!-- background table -->
</body>>
</body>
         `,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log('Email Send' + info.response);
        }
      });
      res.render('alert', {
        var: 'user created successfully',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};
/**
 * Find all Users
 */
exports.findAll = (req, res) => {
  User.find()
    .sort({ name: -1 })
    .then((users) => {
      res.status(200).render('allusers', {
        array: users,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error Occured',
      });
    });
};
/*notify*/
exports.notify = (req, res) => {
  User.find()
    .sort({ name: -1 })
    .then((users) => {
      var i= users.length;
        console.log(users.length);
        while (i>0) {
          console.log(users);
          i--;

        }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error Occured',
      });
    });
};


/**
 * Find one User
 */
exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.id,
        });
      }
      res.status(200).render('userbyid', {
        user: user,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: 'Error retrieving user with id ' + req.params.id,
      });
    });
};
/**
 * Delete a user with the specified id in the request
 */
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found ',
        });
      }
      res.render('alert', { var: 'User Deleted succsessfully' });
    })
    .catch((err) => {
      return res.status(500).send({
        message: 'Could not delete user ',
      });
    });
};

/**
 * Update a user with the specified id in the request
 */
exports.UpdateUser = (req, res) => {
  if (!req.body.email || !req.body.name) {
    res.status(400).send({
      message: 'required fields cannot be empty',
    });
  }
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'no user found',
        });
      }
      res.status(200).render('alert', { var: 'User updated succsessfully' });
    })
    .catch((err) => {
      return res.status(404).send({
        message: 'error while updating the post',
      });
    });
};
