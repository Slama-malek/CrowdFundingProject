var express = require("express");

var router = express.Router();
const Member= require('../models/membership');
const User = require('../models/users');
const Communaute = require('../models/communautes');

router.post("/create", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const member = new Member({
        communauteID:req.body.communauteID ,
        userID:req.body.userID 

       
    })
    
User.findOne({ _id:req.body.userID}, (err, user) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
        return res
            .status(404)
            .json({ success: false, error: `user not found` })
    }
    Communaute.findOne({ _id: req.body.communauteID }, (err, communaute) => {
        if (err) {
            return res.status(400).json({ success: false, message: err })
        }
    
        if (!communaute) {
            return res
                .status(404)
                .json({ success: false, message: `commuanute not found` })
        }
        if (communaute.userID==req.body.userID) {
            return res
                .status(404)
                .json({ success: false, message: `vous ete deja le responsable de communaute`})
        }

    
        

        member.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
   
})

}).catch(err => console.log(err))

});
router.post("/createmobile/:id/:idc", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const member = new Member({
        communauteID:req.params.idc ,
        userID:req.params.id

       
    })
    
User.findOne({ _id:req.params.id}, (err, user) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
        return res
            .status(404)
            .json({ success: false, error: `user not found` })
    }
    Communaute.findOne({ _id: req.params.idc }, (err, communaute) => {
        if (err) {
            return res.status(400).json({ success: false, message: err })
        }
    
        if (!communaute) {
            return res
                .status(404)
                .json({ success: false, message: `commuanute not found` })
        }
        if (communaute.userID==req.params.id) {
            return res
                .status(404)
                .json({ success: false, message: `vous ete deja le responsable de communaute`})
        }

        Member.findOne({ userID:req.params.id,communauteID:req.params.idc }, (err, communaute) => {
            if (err) {
                return res.status(400).json({ success: false, message: err })
            }
        
            if (communaute) {
                if(communaute.accepted==0){
                    return res
                    .status(401)
                    .json({ success: false, message: `En attente` })
                   }
                return res
                    .status(403)
                    .json({ success: false, message: `Vous etes deja membre` })
            }
        

        member.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
})  
})

}).catch(err => console.log(err))

});
/*Verifieeeeeeee*/ 
router.get("/verife/:id/:idu", function (req,res) {

    Member.findOne({ userID:req.params.idu,communauteID:req.params.id }, (err, notefound) => {
        if (err) {
            return res.status(400).json({ success: false, message: err })
        }
    
        /*if (notefound) {
           if(notefound.accepted==0){
            return res
            .status(401)
            .json({ success: false, message: `vous n'avez` })
           }
           return res
           .status(200)
           .json({ success: true, message: `vous avez deja note ce projet` })
        }
       
        return res
                .status(404)
                .json({ success: false, message: `vous ` })*/
                if (notefound && notefound.accepted==1) {
                    return res
           .status(200)
           .json({ success: true, message: `membre` })
                }

return res
                .status(404)
                .json({ success: false, message: `vous ` })

    }).catch(err => console.log(err))


})
router.get("/verifer/:id/:iduser", function (req,res) {

    Member.findOne({ userID:req.params.iduser,communauteID:req.params.id }, (err, notefound) => {
        if (err) {
            return res.status(400).json({ success: false, message: err })
        }
    
        if (notefound) {
           if(notefound.accepted==0){
            return res
            .status(200)
            .json({ success: false, message: `En attente` })
           }
           return res
           .status(200)
           .json({ success: false, message: `Membre` })
        }
       
        return res
                .status(404)
                .json({ success: false, message: `pas membre ` })

    }).catch(err => console.log(err))


})
/*tous les membres d'un commuanute d'un projet */
router.get("/allmembres/:id", function (req,res) {

    Member.find({communauteID:req.params.id}, (err, membres) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!membres.length) {
            return res
                .status(404)
                .json({ success: false, error: `commentaires not found` })
        }
        return res.status(200).json({ success: true, data: membres })
    }).populate('userID').catch(err => console.log(err))


})
router.get("/test/:id", function (req,res) {

    Member.find({userID:req.params.id}, (err, membres) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!membres.length) {
            return res
                .status(404)
                .json({ success: false, error: `commentaires not found` })
        }
        Communaute.find({userID:req.params.id}, (err, coms) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!coms.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `commentaires not found` })
            }

        return res.status(200).json({ success: true, data: membres+coms })
     }).catch(err => console.log(err))
     }).catch(err => console.log(err))


})
router.get("/allmembrespending/:id", function (req,res) {

    Member.find({communauteID:req.params.id,accepted:false}, (err, membres) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!membres.length) {
            return res
                .status(404)
                .json({ success: false, error: `commentaires not found` })
        }
        return res.status(200).json({ success: true, data: membres })
    }).populate('userID').catch(err => console.log(err))


})
/*tous les communate dont laquelle user est un membre */
router.get("/allcommunities/:id", function (req,res) {

    Member.find({userID:req.params.id}, (err, membres) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!membres.length) {
            return res
                .status(404)
                .json({ success: false, error: `commentaires not found` })
        }
        return res.status(200).json({ success: true, data: membres })
    }).populate('userID').populate('communauteID').catch(err => console.log(err))


})
/*Tous les membres*/
router.get("/membres", function (req,res) {

    Member.find({}, (err, membres) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!membres.length) {
            return res
                .status(404)
                .json({ success: false, error: `commentaires not found` })
        }
        return res.status(200).json({ success: true, data: membres })
    }).catch(err => console.log(err))


})
/*Accepter un membre*/
router.put("/accept/:id", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a contribution',
        })
    }
   
    Member.findOneAndUpdate({_id: req.params.id }, { $set: { accepted:'1'}},{new:true,upsert: true}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });

    
            

});
router.delete("/delete/:id", function (req,res) {
    Member.findOneAndDelete({ _id: req.params.id }, (err, member) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!member) {
            return res
                .status(404)
                .json({ success: false, error: `member not found` })
        }

        return res.status(200).json({ success: true, data: 'Succesfully removed' })
    }).catch(err => console.log(err))
});

module.exports=router
