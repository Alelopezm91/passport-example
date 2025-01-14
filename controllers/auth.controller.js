const res = require('express/lib/response');
const mongoose= require ('mongoose');
const passport=require ('passport');
const User= require('../models/User.model')

module.exports.register = (req, res, next) => {
  res.render('auth/register', )
}

module.exports.login = (req, res, next) => {
  res.render('auth/login', )
}

module.exports.doRegister = (req, res, next) => {
  const user= req.body;


//manage registering errors

const renderWithErrors=(errors)=>{
  res.render('auth/register', {errors, user})
}

//check if email is already in use

User.findOne({email: user.email})
.then((userFound)=>{
  if(userFound){
    renderWithErrors({email: 'Email already in use'})
  }else{
    return User.create(user)
    .then(()=>{
      res.redirect('/login')
    })
  }
})
.catch(err=>{
  if (err instanceof mongoose.Error.ValidationError){
    renderWithErrors(err.errors)
  }else{
    next(err)
  }
})
}