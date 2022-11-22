const User = require("../models/User");

checkDuplicateEmail = async (req, res, next) => {
    try {
      // const email = req.body.email;
      // // Email
      // const user = await User.findByEmail({email});
      // console.log(req.body.email)
      //find user in database by email 
      const user = await User.findOne({
        where: {
          email: req.body.email
        },
      });
      // console.log(user)
    
      // if (user) {
      //   console.log("Email already in use");
      //   return res.status(400).send({
      //     message: "Failed! Email is already in use!"
      //   });
      // }
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Unable to validate!"
      });
    }
  };

  const verifySignUp = {
    checkDuplicateEmail,
  };
  
  module.exports = verifySignUp;