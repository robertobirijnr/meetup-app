const User = require('../models/users');
const passport = require('passport')

exports.getUsers = function(req, res) {
  User.find({})
        .exec((errors, users) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(users);
  });
}
exports.getCurrentUser = function (req, res, next) {
  const user = req.user;

  if(!user) {
    return res.sendStatus(422);
  }

  // return res.json(user);
  return res.json(user.toAuthJSON())
};

exports.register = (req,res) =>{

  const regData = req.body

  if(!regData.email){
    return res.status(422).json({
      errors:{
        email:'email is required'
      }
    })
  }

  if(!regData.password){
    return res.status(422).json({
      errors:{
        password:'password is required'
      }
    })
  }

  if(regData.password !== regData.passwordConfirmation){
    return res.status(422).json({
      errors:{
        password:'password do not match'
      }
    })
  }

  const user = new User(regData);

  user.save((err,saveUser)=>{
    if(err){
      return res.status(422).json({
        err
      })
    }
    return res.json(saveUser)
  })
}

exports.login =(req,res,next)=>{

  const {email, password} = req.body

  if(!email){
    return res.status(422).json({
      errors:{
        email:'invalid email address'
      }
    })
  }

  if(!password){
    return res.status(422).json({
      error:{
        password:'invalid password'
      }
    })
  }

  return passport.authenticate('local', (err, passportUser)=> {
    if (err) {
      return next(err)
    }
    if (passportUser) {
      
      return res.json(passportUser.toAuthJSON())
  
    } else {
      return res.status(422).send({errors: {
        'authentication': 'Ooops, something went wrong!'
      }})
    }
  })(req,res,next)
}

exports.logout = (req,res,next)=>{
  req.logout()
  return res.json({status:'Session destroyed!'})
}
  