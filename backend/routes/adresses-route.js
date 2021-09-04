var express = require("express");

var router = express.Router();
const Adresse = require('../models/adresses');
const User = require('../models/users');

router.post("/create/:id", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const adresse = new Adresse({
        adresse:req.body.adresse,
        ville:req.body.ville,
        governoment:req.body.governoment,
        code_postal:req.body.code_postal,
        pays:req.body.pays,
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
    
        

        adresse.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
    user.adresses.push(adresse);
    user.save();
    return res.status(200).json({ success: true })
    
}).catch(err => console.log(err))

});

/*tous les carts d'un user */
router.get("/alladresses", function (req,res) {

    Adresse.find({userID:req.body.id}, (err, adresses) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!adresses.length) {
            return res
                .status(404)
                .json({ success: false, error: `adresses not found` })
        }
        return res.status(200).json({ success: true, data: adresses })
    }).catch(err => console.log(err))


})
router.put("/update", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a adresse',
        })
    }
   
    Adresse.findOneAndUpdate({_id: req.body.id }, { $set: { adresse: req.body.adresse }, ville: req.body.ville ,governoment: req.body.governoment,code_postal: req.body.code_postal,pays: req.body.pays  }, (err, doc) => {
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
        {adresses: req.body.idadresse}
     
     }, (err, user) => {

        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })}
            Adresse.findByIdAndRemove({ _id: req.body.idadresse }, (err) => {
                if (err) res.json(err)
                else res.json('Succesfully removed')
            });
   
   



   
 })

});
module.exports=router
