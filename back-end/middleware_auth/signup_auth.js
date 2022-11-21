const User = require("../models/User");

checkDuplicateEmail = async (req, res, next) => {
    try {
      // Email
      let user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
  
      if (user) {
        return res.status(400).send({
          message: "Failed! Email is already in use!"
        });
      }
      next();
    } catch (error) {
      return res.status(500).send({
        message: "Unable to validate!"
      });
    }
  };

  const verifySignUp = {
    checkDuplicateEmail,
  };
  
  module.exports = verifySignUp;