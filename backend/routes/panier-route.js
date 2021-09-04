var express = require("express");

var router = express.Router();
const Panier= require('../models/panier');


router.post("/create", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const panier = new Panier({
       
        rewardID:req.body.rewardID

       
    })
    
    panier.save()
    .then(data =>{
         res.json(data)
     })
 .catch(error =>{
     res.json(error)
})

});


/*tous panier */
router.get("/allpanier", function (req,res) {

    Panier.find({}, (err, coms) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!coms.length) {
            return res
                .status(404)
                .json({ success: false, error: `commentaires not found` })
        }
        return res.status(200).json({ success: true, data: coms })
    }).catch(err => console.log(err))


})

router.put("/update", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a contribution',
        })
    }
   
    Note.findOneAndUpdate({_id: req.body.id }, { $set: { note: req.body.note}},{new: true ,upsert: true}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
        
    
        res.json(doc);
    });

    
});
router.delete("/delete/:id", function (req,res) {
Note.findOneAndDelete({ _id: req.params.id }, (err, project) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!project) {
        return res
            .status(404)
            .json({ success: false, error: `projet n existe pas` })
    }

    return res.status(200).json({ success: true, data: project })
}).catch(err => console.log(err))


});

module.exports=router
