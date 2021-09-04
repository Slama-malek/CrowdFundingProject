var express = require("express");


var router = express.Router();
const Investisseur = require("../models/investisseur");

const User = require('../models/users');
var multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post("/create/:id",upload.single('cover_image'), function (req,res) {
    const url = req.protocol + '://' + req.get('host')

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const investisseur = new Investisseur({
        nomsociete:req.body.nomsociete ,
        secteur:req.body.secteur ,
        category:req.body.category ,
        description:req.body.category ,
        userID:req.params.id ,
        cover_image:url + '/public/' + req.file.filename,

       
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
       
            
    
            investisseur.save()
            .then(data =>{
                 res.json(data)
             })
         .catch(error =>{
             res.json(error)
     })
        user.investisseurs.push(investisseur);
        user.save();
        return res.status(200).json({ success: true })
    
    }).catch(err => console.log(err))
    
    });

/*tous les investisseurs */
router.get("/allinvestisseurs", function (req,res) {

    Investisseur.find({}, (err, membres) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!membres.length) {
            return res
                .status(404)
                .json({ success: false, error: `investisseurs not found` })
        }
        return res.status(200).json({ success: true, data: membres })
    }).populate('userID').catch(err => console.log(err))


})
/*Detail d'un investisseur */
router.get("/investisseur/:id", function (req,res) {
   Investisseur.findById({ _id: req.params.id }, (err, investisseurs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!investisseurs) {
            return res
                .status(404)
                .json({ success: false, error: `projects not found` })
        }
        return res.status(200).json({ success: true, data: project })
    }).populate('offres').catch(err => console.log(err))

})
router.get("/investisseuruser/:id", function (req,res) {
    Investisseur.find({userID:req.params.id}, (err, carts) => {
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
