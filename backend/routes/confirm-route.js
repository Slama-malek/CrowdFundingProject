var express = require("express");

var router = express.Router();

const User = require('../models/users');

router.get("/:confirmationCode", function (req,res) {
    
    User.findOne({
        confirmationCode: req.params.confirmationCode,
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
    
          user.status = "Active";
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.writeHead(301,{Location: 'http://localhost:4001/login'});
            res.end();
          });
        })
        .catch((e) => console.log("error", e)); 

});


module.exports=router
