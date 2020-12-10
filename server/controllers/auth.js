const passport = require('passport')

// exports.authenticatedUser = (req,res,next) =>{
//     if(req.isAuthenticated()){
//         return next()
//     }

//     return res.status(401)
//     .send({errors:{auth:'Not Authenticated!'}})
// }


exports.authenticatedUser = passport.authenticate('jwt',{session:false})