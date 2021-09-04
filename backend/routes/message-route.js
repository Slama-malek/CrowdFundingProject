var express = require("express");

var router = express.Router();
const Message = require('../models/messages');
const User = require('../models/users');

router.post("/create", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const message = new Message({
        
        contenu:req.body.contenu,
        userID:req.body.userID  ,
        investID:req.body.investID

       
    })
    
    User.findOne({ _id:req.body.userID }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
    
        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }
        User.findOne({ _id: req.body.investID }, (err, project) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
        
            if (!project) {
                return res
                    .status(404)
                    .json({ success: false, error: `user not found` })
            }
    
        
            
    
            message.save()
            .then(data =>{
                 res.json(data)
             })
         .catch(error =>{
             res.json(error)
     })
        project.messages.push(message)
        project.save()
        return res.status(200).json({ success: true })
    })
    
    }).catch(err => console.log(err))
    
    });
    router.get("/allmessages", function (req,res) {

        Message.find({}, (err, carts) => {
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
    router.get("/allusermessages/:id", function (req,res) {

        Message.find({investID:req.params.id}, (err, carts) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!carts.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `carts not found` })
            }
            return res.status(200).json({ success: true, data: carts })
        }).populate("investID").catch(err => console.log(err))
    
    
    })
module.exports=router