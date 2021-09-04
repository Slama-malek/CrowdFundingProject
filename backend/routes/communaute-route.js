var express = require("express");

var router = express.Router();
const Communaute = require('../models/communautes');
const User = require('../models/users');
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
    const url = req.protocol + '://' + req.get('host')

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const communaute = new Communaute({
        nom:req.body.nom,
        description:req.body.description,
        category:req.body.category,
        cover_image:url + '/public/' + req.file.filename,
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
   
        

        communaute.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
    user.communautes.push(communaute);
    user.save();
    return res.status(200).json({ success: true })

}).catch(err => console.log(err))

});

/*tous les communautes d'un user */
router.get("/allusercomm/:id", function (req,res) {

    Communaute.find({userID:req.params.id}, (err, carts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!carts.length) {
            return res
                .status(404)
                .json({ success: false, error: `communautes not found` })
        }
        return res.status(200).json({ success: true, data: carts })
    }).catch(err => console.log(err))


})
/*all communities mobileeee*/
router.get("/communities", function (req,res) {

    Communaute.find({status:"Approved"}, (err, projects) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!projects.length) {
            return res
                .status(404)
                .json({ success: false, error: `project not found` })
        }
        res.send(JSON.stringify(projects));
    }).populate("userID").sort({createdAt: 'desc'}).catch(err => console.log(err))

})
/* tous les communautes*/
router.get("/allcommus", function (req,res) {

    Communaute.find({}, (err, projects) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!projects.length) {
            return res
                .status(404)
                .json({ success: false, error: `project not found` })
        }
        return res.status(200).json({ success: true, data: projects})
    }).populate("userID").populate('projects').sort({createdAt: 'desc'}).catch(err => console.log(err))

})
router.get("/community/:id", function (req,res) {
    Communaute.findById({ _id: req.params.id }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `projects not found` })
        }
        return res.status(200).json({ success: true, data: project })
    }).populate('userID').populate('projects').catch(err => console.log(err))

})

router.put("/update/:id",upload.single('cover_image'), function (req,res) {
    const body = req.body
    const url = req.protocol + '://' + req.get('host')
   
    Communaute.findOneAndUpdate({_id: req.params.id }, { $set: { nom: req.body.nom }, description: req.body.description ,cover_image:url + '/public/' + req.file.filename}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });

});
router.put("/status/:id", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a cart',
        })
    }
   
    Communaute.findOneAndUpdate({  _id: req.params.id }, { $set: { status: req.body.status },adminnote:req.body.adminnote }, { new: true ,upsert: true,setDefaultsOnInsert: true}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });

});
router.delete("/delete/:id", function (req,res) {
    

    User.findOneAndUpdate({ _id: req.body.id }, { $pull: 
        {communautes: req.params.id}
     
     }, (err, user) => {

        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })}
            Communaute.findByIdAndRemove({ _id: req.params.id }, (err) => {
                if (err) res.json(err)
                else res.json('Succesfully removed')
            });
   
   



   
 })

});
module.exports=router
