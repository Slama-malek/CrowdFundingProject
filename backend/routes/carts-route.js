var express = require("express");

var router = express.Router();
const Cart = require('../models/carts');
const User = require('../models/users');

router.post("/create/:id", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const cart = new Cart({
        numero:req.body.numero,
        code_secret:req.body.code_secret,
        proprietaire:req.body.proprietaire,
        date_exp:req.body.date_exp,
        userID:req.params.id

       
    })
    
User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
        return res
            .status(404)
            .json({ success: false, error: `user not found` })
    }
    
        

        cart.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
    user.carts.push(cart);
    user.save();
    return res.status(200).json({ success: true })
    
}).catch(err => console.log(err))

});

/*tous les carts d'un user */
router.get("/allcarts", function (req,res) {

    Cart.find({userID:req.body.id}, (err, carts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!carts.length) {
            return res
                .status(404)
                .json({ success: false, error: `carts not found` })
        }
        return res.status(200).json({ success: true, data: carts })
    }).catch(err => console.log(err))


})
router.put("/update", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a cart',
        })
    }
   
    Cart.findOneAndUpdate({_id: req.body.id }, { $set: { numero: req.body.numero }, code_secret: req.body.code_secret ,date_exp: req.body.date_exp,proprietaire: req.body.proprietaire  }, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });

});
router.delete("/delete", function (req,res) {
    

    User.findOneAndUpdate({ _id: req.body.id }, { $pull: 
        {carts: req.body.idcart}
     
     }, (err, user) => {

        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })}
            Cart.findByIdAndRemove({ _id: req.body.idcart }, (err) => {
                if (err) res.json(err)
                else res.json('Succesfully removed')
            });
   
   



   
 })

});
module.exports=router
