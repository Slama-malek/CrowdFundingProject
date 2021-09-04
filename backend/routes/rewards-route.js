var express = require("express");

var router = express.Router();
const Reward = require('../models/rewards');
const Project = require('../models/projects');
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
    
    const body = req.body
    const url = req.protocol + '://' + req.get('host')
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const reward = new Reward({
        titre:req.body.titre,
        min_value:req.body.min_value,
        max_contribution:req.body.max_contribution,
        date_exp:req.body.date_exp,
        description:req.body.description,
        cover_image:url + '/public/' + req.file.filename,
        projectID:req.params.id

       
    })
    
Project.findOne({ _id: req.params.id}, (err, project) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!project) {
        return res
            .status(404)
            .json({ success: false, error: `project not found` })
    }
    
        

        reward.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
  project.rewards.push(reward);
    project.save();
    return res.status(200).json({ success: true})
    
}).catch(err => console.log(err))

});

/*tous les rewards d'un projet */

router.get("/allrewards/:id", function (req,res) {

    Reward.find({projectID:req.params.id}, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!project.length) {
            return res
                .status(404)
                .json({ success: false, error: `reward not found` })
        }
        return res.status(200).json({ success: true, data: project })
    })
    .catch(err => console.log(err))

})
router.get("/all", function (req,res) {

    Reward.find({}, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!project.length) {
            return res
                .status(404)
                .json({ success: false, error: `reward not found` })
        }
        return res.status(200).json({ success: true, data: project })
    })
    .catch(err => console.log(err))

})
/*router.put("/update", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a cart',
        })
    }
   
    Reward.findOneAndUpdate({_id: req.body.id }, { $set: { titre: req.body.titre }, min_value: req.body.min_value ,max_contribution: req.body.max_contribution,date_exp: req.body.date_exp,image: req.body.image  }, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });

});*/
router.put("/update/:id",upload.single('cover_image'), function (req,res) {
    const body = req.body
    const url = req.protocol + '://' + req.get('host')
   
    Reward.findOneAndUpdate({_id: req.params.id }, { $set:{ titre: req.body.titre }, min_value: req.body.min_value ,max_contribution: req.body.max_contribution,date_exp: req.body.date_exp, description: req.body.description ,cover_image:url + '/public/' + req.file.filename}, (err, doc) => {
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
        {rewards: req.params.id}
     
     }, (err, user) => {

        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })}
            Reward.findByIdAndRemove({ _id: req.params.id }, (err) => {
                if (err) res.json(err)
                else res.json('Succesfully removed')
            });
   
   



   
 })

});

router.get("/rewarddetail/:id", function (req,res) {

    Reward.findById({ _id: req.params.id }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `projects not found` })
        }
        return res.status(200).json({ success: true, data: project })
    }).populate("contributions").catch(err => console.log(err))

})



module.exports=router
