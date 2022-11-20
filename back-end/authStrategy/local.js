const LocalStrategy = require ('passport-local')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const passport = require('passport')

passport.use(new LocalStrategy(
    async(email, password, done) => 
    {
        //get user from database using email
        // const result = await User.promise().query('SELECT * FROM USERS WHERE EMAIL = '${email})
        const result = await User.findOne({
            email: email
        })
        console.log(result)
        const user = result[0]
        //if user does not exist
        if(user.length == 0)
        {
            return done(null, false, {message: 'No user with that email'})
        }
        //if user exists
        try{
            //compare password
            if(await bcrypt.compare(password, user[0].password))
            {
                return done(null, user)

            }
            else
            {
                return done(null, false, {message: 'Password incorrect'})
            }
        }
        catch(err)
        {
            return done(err);
        }
    }
))

passport.serializeUser(function(user, done) {
    done(null, user[0].userId);
    });

passport.deserializeUser(function(user, done) {
    done(null, userId);
    });

