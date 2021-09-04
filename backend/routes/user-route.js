var express = require("express");
const projects = require("../models/projects");


var router = express.Router();
const User = require('../models/users');
const nodemailer =require('../nodemailer.config');
const passwordHash = require("password-hash");

var multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
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

router.post("/signup", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            message: 'Vous devez fournir un utilisateur',
        })
    }
    

    const user = new User({
        username:req.body.username,
        email:req.body.email,
       password:passwordHash.generate(req.body.password),
        role:req.body.role,
        confirmationCode:Math.floor((Math.random() * 100) + 54)  
       
    })
    /* Verfication si l utilisateur existe deja */
    User.findOne({ email: req.body.email }, (err, findUser) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (findUser) {
            return res
                .status(404)
                .json({ success: false, message: ` utilisateur existe déjà` })
        }

        user.save()
       .then(data =>{
            res.json({
      message: "Le compte est cré avec succès,Merci de consulter votre email pour l'activer",
      role:user.role,
      token: user.getToken()
    })

    nodemailer.sendConfirmationEmail(
        user.username,
        user.email,
        user.confirmationCode
 );
})
    .catch(error =>{
        res.json(error)
})
        
    }).catch(err => console.log(err))

    


  

});
router.post("/signin", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide user',
        })
    }
    User.findOne({ email: req.body.email }, (err, findUser) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!findUser) {
            return res
                .status(404)
                .json({ success: false, message: ` L utilisateur n existe pas` })
        }
       /* bcrypt.compare(req.body.password,findUser.password,(err, res) => {
            if(err) return console.log(err);
            if (!res) return console.log("md invalid");
    
           });*/
           if (!findUser.authenticate(req.body.password))
      return res.status(401).json({
        message: "Mot de passe incorrect"
      });
    /* if (findUser.status=="Pending")
      return res.status(401).json({
        message: "Vous devez activez votre compte"
      });
*/
        
        return res.status(200).json({
        
            token: findUser.getToken(),
            
            data: findUser ,
            message: "Authentification réussi"
          });
    }).catch(err => console.log(err))
    
 
    

});
router.post("/signinmobile", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide user',
        })
    }
    User.findOne({ email: req.body.email }, (err, findUser) => {
        if (err) {
            res.send(JSON.stringify(err));
        }

        if (!findUser) { 
            
            return res
            .status(404)
            .json({ success: false, message: ` L utilisateur n existe pas` })
        }else
      
         
           if (!findUser.authenticate(req.body.password))
           return res.status(401).json({
             message: "Mot de passe incorrect"
           });
    
     /*else if (findUser.status=="Pending")
     return res.status(402).json({
        message: "Vous devez activez votre compte"
      });*/

     
    
    else res.send(JSON.stringify(findUser));
        
      
    }).catch(err => console.log(err))
    
 
    

});
router.post("/signinadmin", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide user',
        })
    }
    User.findOne({ email: req.body.email }, (err, findUser) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!findUser) {
            return res
                .status(404)
                .json({ success: false, message: ` L utilisateur n existe pas` })
        }
       /* bcrypt.compare(req.body.password,findUser.password,(err, res) => {
            if(err) return console.log(err);
            if (!res) return console.log("md invalid");
    
           });*/
           if (!findUser.authenticate(req.body.password))
      return res.status(401).json({
        message: "Mot de passe incorrect"
      });
     if (findUser.role!="admin")
      return res.status(401).json({
        message: "Vous n avez pas le droit "
      });

        
        return res.status(200).json({
        
            token: findUser.getToken(),
            
            data: findUser ,
            message: "Authentification réussi"
          });
    }).catch(err => console.log(err))
    
 
    

});
/*update role */
router.put("/updaterole/:id", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a cart',
        })
    }
   
    User.findOneAndUpdate({_id: req.params.id }, { $set: { role: req.body.role }},{ new: true ,upsert: true,setDefaultsOnInsert: true}, (err, doc) => {
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

   
    User.findOneAndUpdate({_id: req.params.id }, { $set: { status: req.body.status }},{ new: true ,upsert: true,setDefaultsOnInsert: true}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });

});
router.put("/update/:id",upload.single('cover_image'),function (req,res) {
    

    const url = req.protocol + '://' + req.get('host')
   
    User.findOneAndUpdate({ _id: req.params.id }, { $set: { username: req.body.username } ,bio: req.body.bio,profession: req.body.profession,telephone: req.body.telephone,adresse: req.body.adresse,facebook_link: req.body.facebook_link,twiter_link: req.body.twiter_link,linkedin_link: req.body.linkedin_link,cover_image:url + '/public/' + req.file.filename}, { new: true ,upsert: true,setDefaultsOnInsert: true}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });

});
/*les projes d'un user*/
router.get("/projectsbyuser/:id", function (req,res) {
    User.findById({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `projects not found` })
        }
        return res.status(200).json({ success: true, data: user.projects })
    }).populate('projects').catch(err => console.log(err))

})
router.get("/cartsbyuser/:id", function (req,res) {
    User.findById({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `projects not found` })
        }
        return res.status(200).json({ success: true, data: user.carts })
    }).populate('carts').catch(err => console.log(err))

})
router.get("/adressesbyuser/:id", function (req,res) {
    User.findById({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `projects not found` })
        }
        return res.status(200).json({ success: true, data: user.adresses })
    }).populate('adresses').catch(err => console.log(err))

})


router.get("/allusers", function (req,res) {

    User.find({role: { $ne: "admin" }}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `users not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).populate("communautes").populate("projects").sort({createdAt: 'desc'}).catch(err => console.log(err))

})
router.delete("/delete/:id", function (req,res) {
    User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }
        projects.findOneAndRemove({ userID: req.params.id }, (err) => {
            if (err) res.json(err)
            else res.json( { success: true, data:'Succesfully removed'})
        });
        //return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
});
router.get("/user/:id", function (req,res) {

    User.findOne({ _id: req.params.id }, (err, categorie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!categorie) {
            return res
                .status(404)
                .json({ success: false, error: `category not found` })
        }
        return res.status(200).json({ success: true, data: categorie })
    }).populate("communautes").populate("projects").populate("contributions").populate("carts").populate("adresses").sort({createdAt: 'desc'}).catch(err => console.log(err))
    
})
router.get("/userdetail/:id", function (req,res) {

    User.findOne({ _id: req.params.id }, (err, categorie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!categorie) {
            return res
                .status(404)
                .json({ success: false, error: `category not found` })
        }
        return res.status(200).json({ success: true, data: categorie })
    }).populate("communautes").populate("projects").populate("contributions").populate("carts").populate("adresses").catch(err => console.log(err))

})
router.get("/users", function (req,res) {

    User.find({role: { $ne: "admin" }}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `users not found` })
        }
        res.send(JSON.stringify(users));
    }).sort({createdAt: 'desc'}).catch(err => console.log(err))

})
module.exports=router
