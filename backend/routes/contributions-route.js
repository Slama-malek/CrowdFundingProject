var express = require("express");

var router = express.Router();
const Contribution= require('../models/contributions');
const User = require('../models/users');
const Project = require('../models/projects');
router.post("/create", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const contribution = new Contribution({
        montant:req.body.montant,
        anonymat:req.body.anonymat,
        typepaiement:req.body.typepaiement,
        nomprenom:req.body.nomprenom,
        adresse:req.body.adresse,
        governorat:req.body.governorat,
        ville:req.body.ville,
        codepostal:req.body.codepostal,
        telephone:req.body.telephone,
        notes:req.body.notes,
        projectID:req.body.projectID ,
        userID:req.body.userID 

       
    })
    
User.findOne({ _id: req.body.userID }, (err, user) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
        return res
            .status(404)
            .json({ success: false, error: `user not found` })
    }
    
        

    Project.findOne({ _id: req.body.projectID }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
    
        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }

    
        

        contribution.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
    user.contributions.push(contribution);
    user.save();
    project.contributions.push(contribution)
    project.save()
    return res.status(200).json({ success: true,data:contribution })
})

}).catch(err => console.log(err))

});
/*tous les contributions d'un projets */
router.get("/allprojectcontributions/:id", function (req,res) {

    Contribution.find({projectID:req.params.id}, (err, carts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!carts.length) {
            return res
                .status(404)
                .json({ success: false, error: `contributions not found` })
        }
        return res.status(200).json({ success: true, data: carts })
    }).populate("userID").catch(err => console.log(err))


})
/*tous les contributions  */
router.get("/allcontributions", function (req,res) {

    Contribution.find({}, (err, carts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!carts.length) {
            return res
                .status(404)
                .json({ success: false, error: `ca not found` })
        }
        return res.status(200).json({ success: true, data: carts })
    }).sort({createdAt: 'desc'}).catch(err => console.log(err))


})
router.get("/allusercontributions/:id", function (req,res) {

    Contribution.find({userID:req.params.id}, (err, carts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!carts.length) {
            return res
                .status(404)
                .json({ success: false, error: `ca not found` })
        }
        return res.status(200).json({ success: true, data: carts })
    }).sort({createdAt: 'desc'}).catch(err => console.log(err))


})
router.put("/update", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a contribution',
        })
    }
   
    Contribution.findOneAndUpdate({_id: req.body.id }, { $set: { montant: req.body.montant }, anonymat: req.body.anonymat  },{new: true ,upsert: true}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });

});
router.put("/updatestatus/:id", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a contribution',
        })
    }
   
    Contribution.findOneAndUpdate({_id: req.params.id }, { $set: { status: req.body.status }  },{new: true ,upsert: true}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });

});
router.delete("/delete/:id", function (req,res) {
    

    Project.findOneAndUpdate({ _id: req.body.id }, { $pull: 
        {contributions: req.params.id}
     
     }, (err, user) => {

        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })}
            Contribution.findByIdAndRemove({ _id: req.params.id }, (err) => {
                if (err) res.json(err)
                else res.json('Succesfully removed')
            });
   
   



   
 })

});
router.get("/contributiondetail/:id", function (req,res) {

    Contribution.findById({ _id: req.params.id }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `projects not found` })
        }
        return res.status(200).json({ success: true, data: project })
    }).catch(err => console.log(err))

})
module.exports=router
