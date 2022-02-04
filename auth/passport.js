
const path = require('path');
const User = require('../models/user')
require('../database')
require('dotenv').config({ path: path.resolve(__dirname, '../.env')});


const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;  

const SECRET_KEY = process.env.SECRET_KEY;



const cookieExtractor = function(req) {
    let token = null;
    if(req && req.cookies){
        token = req.cookies['jwt']
    }
    return token;
}


module.exports = (passport) => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: SECRET_KEY
    }, async(jwt_payload, done) => {
        try {
            const {expiration} = jwt_payload;
            if (Date.now() > expiration) {
                done('Unauthorized', false)
            }

            const user = await User.findById(jwt_payload.id).select("-password")
            if(!user) {
                return done(null, false)
            } 

            return done(null, user)
        } catch(e) {
            console.log(e)
        }
        
    })) 
}