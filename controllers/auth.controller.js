const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/User.model');

module.exports.register = (req, res, next) => {
  res.render('auth/register', )
}

module.exports.login = (req, res, next) => {
  res.render('auth/login', )
}

module.exports.doRegister = (req, res, next) => {
  const user = req.body;

  const renderWithErrors = (errors) => {
    res.render('auth/register', {
      errors,
      user: user
    })
  }

  User.findOne({ email: user.email })
    .then((userFound) => {
      if (userFound) {
        renderWithErrors({ email: 'Email already in use' })
      } else {
        return User.create(user)
          .then(() => {
            res.redirect('/login')
          })
      }
    })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors)
      } else {
        next(err)
      }
    })
}

module.exports.doLogin = (req, res, next) => {
  passport.authenticate('local-auth', (err, user, validations) => {
    console.log(validations);
    if (err) {
      next(err)
    } else if (!user) {
      res.status(404).render('auth/login', { user: req.body, errorMessage: validations.error })
    } else {
      req.login(user, (loginErr) => {
        if (loginErr) {
          next(loginErr)
        } else {
          res.redirect('/profile')
        }
      })
    }
  })(req, res, next)
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

module.exports.profile = (req, res, next) => {
  res.render('profile')
}