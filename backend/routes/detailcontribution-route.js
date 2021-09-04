var express = require("express");

var router = express.Router();
const Contributiondetail= require('../models/detailcontribution');
const Reward = require('../models/rewards');
const Contribution= require('../models/contributions');
const User = require('../models/users');
const Project = require('../models/projects');
router.post("/createsimple/:id", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const contribution = new Contributiondetail({
        prix:req.body.prix,
       
        contibutionID:req.params.id

       
    })
    
Contribution.findOne({ _id: req.params.id}, (err, user) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
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
    
    user.detailcontributions.push(contribution)
    user.save()
}).catch(err => console.log(err))

});
/*create with reward*/
router.post("/create/:id", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const contribution = new Contributiondetail({
        prix:req.body.prix,
        quantite:req.body.quantite,
        rewardID:req.body.rewardID ,
        contibutionID:req.params.id

       
    })
    
Contribution.findOne({ _id: req.params.id}, (err, user) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
        return res
            .status(404)
            .json({ success: false, error: `user not found` })
    }


    
    
    Reward.findOne({ _id: req.body.rewardID }, (err, reward) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
    
        if (!reward) {
    
            contribution.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
    
 user.detailcontributions.push(contribution)
 user.save()
 return res.status(200).json({ success: true })
    }
else{
        contribution.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
    
    user.detailcontributions.push(contribution)
    user.save()
    reward.contributions.push(contribution)
    reward.save()
    return res.status(200).json({ success: true })}
}).catch(err => console.log(err))
}).catch(err => console.log(err))

});
router.get("/alldetailscontributions/:id", function (req,res) {

    Contributiondetail.find({contibutionID:req.params.id}, (err, projects) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!projects.length) {
            return res
                .status(404)
                .json({ success: false, error: `project not found` })
        }
        return res.status(200).json({ success: true, data: projects})
    }).populate("rewardID").sort({createdAt: 'desc'}).catch(err => console.log(err))


})
module.exports=router