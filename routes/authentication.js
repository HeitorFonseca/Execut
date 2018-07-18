var express = require('express');
var router = express.Router();
const User = require('../models/user'); // Import User Model Schema
const config = require('../config/database')

const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.

router.post('/register', (req, res) => {
    console.log("registering user");
    // Check if email was provided
    if (!req.body.Email) {
      res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
    } else {
      // Check if username was provided
      if (!req.body.Username) {
        res.json({ success: false, message: 'You must provide a username' }); // Return error
      } else {
        // Check if password was provided
        if (!req.body.Password) {
          res.json({ success: false, message: 'You must provide a password' }); // Return error
        } else {
          // Create new user object and apply user input
          let user = new User({
            Email: req.body.Email.toLowerCase(),
            Username: req.body.Username.toLowerCase(),
            Password: req.body.Password,
            Name:  req.body.Name,
            Roles: req.body.Roles
          });
          // Save user to database
          user.save((err) => {
            // Check if error occured
            if (err) {
              // Check if error is an error indicating duplicate account
              if (err.code === 11000) {
                res.json({ success: false, message: 'Username or e-mail already exists' }); // Return error
              } else {
                // Check if error is a validation rror
                if (err.errors) {
                  // Check if validation error is in the email field
                  if (err.errors.Email) {
                    res.json({ success: false, message: err.errors.Email.message }); // Return error
                  } else {
                    // Check if validation error is in the username field
                    if (err.errors.Username) {
                      res.json({ success: false, message: err.errors.Username.message }); // Return error
                    } else {
                      // Check if validation error is in the password field
                      if (err.errors.Password) {
                        res.json({ success: false, message: err.errors.Password.message }); // Return error
                      } else {
                        res.json({ success: false, message: err }); // Return any other error not already covered
                      }
                    }
                  }
                } else {
                  res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
                }
              }
            } else {
              res.json({ success: true, message: 'Acount registered!' }); // Return success
            }
          });
        }
      }
    }
  });

router.post('/login', (req, res) => {        

    
    if (!req.body.Username) {
        res.json({success: false, message: 'No username was provided'});
    }
    else {
        if (!req.body.Password) {
            res.json({ success: false, message: 'No password was provided'});
        }
        else {
            console.log(req.body);
            User.findOne({Username: req.body.Username.toLowerCase() }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err});
                } else {
                    if (!user) {
                        res.json( { success: false, message: 'Username not found'});
                    } else {
                        const validPassword = user.comparePassword(req.body.Password);
                        
                        if (!validPassword) {
                            res.json( {success: false, message: 'Password invalid'});
                        } else {
                            const token = jwt.sign({UserId: user._id}, config.secret, {expiresIn: '24h'});
                            res.json( {success: true, message: 'Success!', token: token, user: {Username: user.Username, Id:user._id, Roles: user.Roles}});
                        }
                    }
                }
            } );
        }
    }
});


module.exports = router;