const User = require("../models/User");

checkDuplicateEmail = async (req, res, next) => {
  console.log("checkDuplicateEmail ", req.body.email);

    try {
      User.findOne({email: req.body.email}, function(err,user)
      {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }
        else
        {
          next();
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: "Unable to validate!"
      });
    }
  };

  const verifySignUp = {
    checkDuplicateEmail,
  };
  
  module.exports = verifySignUp;