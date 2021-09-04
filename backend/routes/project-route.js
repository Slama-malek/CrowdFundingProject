var express = require("express");

var router = express.Router();
var multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Project = require('../models/projects');
const User = require('../models/users');
const Communate=require('../models/communautes');
const { roles } = require('../roles');
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
    const project = new Project({
        name:req.body.name,
        headline:req.body.headline,
        location:req.body.location,
        goal:req.body.goal,
        description:req.body.description,
        category:req.body.category,
        cover_image:url + '/public/' + req.file.filename,
        userID:req.params.id,
        facebook_link:req.body.facebook_link ,
        twiter_link: req.body.twiter_link,
        linkedin_link: req.body.linkedin_link,
        website:req.body.website,
        duration:req.body.duration,
        communauteID:req.body.communauteID

        
       
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
    else{
        const permission = roles.can(user.role).createOwn('project');
        if (!permission.granted) {
         return res.status(401).json({
          error: "You don't have enough permission to perform this action"
         });
        }

        Communate.findOne({ _id: req.body.communauteID }, (err, communaute) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
        
            if (!communaute) {
                project.save()
       .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error) })

    user.projects.push(project);
    user.save();
    return res.status(200).json({ success: true ,data:project})
            }
            else{
                project.save()
                .then(data =>{
                      res.json(data)
                  })
              .catch(error =>{
                  res.json(error) })
         
             user.projects.push(project);
             user.save();
             communaute.projects.push(project)
            
             communaute.save();
             return res.status(200).json({ success: true,data:project })
            }

        
})
}
  
}).catch(err => console.log(err))



});

router.get("/verifier/:id", function (req,res) {

    Project.findOne({ suivres:req.params.id}, (err, notefound) => {
        if (err) {
            return res.status(400).json({ success: false, message: err })
        }
    
        if (!notefound) {
            return res
                .status(404)
                .json({ success: false})
        }

        return res
        .status(200)
        .json({ success: true, data:notefound  })
    }).catch(err => console.log(err))

})
router.post("/suivre/:id/:idp", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    
    
User.findOne({ _id:req.params.id }, (err, user) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
        return res
            .status(404)
            .json({ success: false, error: `user not found` })
    }
    Project.findOne({ _id: req.params.idp }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, message: err })
        }
    
        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `project not found` })
        }
        Project.findOne({ suivres:req.params.id}, (err, notefound) => {
            if (err) {
                return res.status(400).json({ success: false, message: err })
            }
        
            if (notefound) {
                return res
                    .status(401)
                    .json({ success: false, message: `vous avez deja suivre ce projet` })
            }

       
        
        

     
    user.suivres.push(project);
    user.save();
    project.suivres.push(user)
    project.save()
    return res.status(200).json({ success: true })

        })
})
}).catch(err => console.log(err))

});
router.post("/suivremobile/:id/:idp", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    
    
User.findOne({ _id:req.params.id }, (err, user) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
        return res
            .status(404)
            .json({ success: false, error: `user not found` })
    }
    Project.findOne({ _id: req.params.idp }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, message: err })
        }
    
        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `project not found` })
        }
        else if(project.userID==req.params.id){
            return res
                .status(404)
                .json({ success: false, message: `vous ne pouver suivre votre propre projet` })
        }
        Project.findOne({ suivres:req.params.id}, (err, notefound) => {
            if (err) {
                return res.status(400).json({ success: false, message: err })
            }
        
            if (notefound) {
           
                return res
                    .status(401)
                    .json({ success: false, message: `Vous avez deja suivre ce projet` })
            }
            

       
        
        

     
    user.suivres.push(project);
    user.save();
    project.suivres.push(user)
    project.save()
    return res.status(200).json({ success: true })

        })
})
}).catch(err => console.log(err))

});


/*tous les projets */
router.get("/allprojects", function (req,res) {

    Project.find({}, (err, projects) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!projects.length) {
            return res
                .status(404)
                .json({ success: false, error: `project not found` })
        }
        return res.status(200).json({ success: true, data: projects})
    }).populate("userID").populate("rewards").populate("contributions").populate("communauteID").sort({createdAt: 'desc'}).catch(err => console.log(err))

})
/*tous projest mobile*/
router.get("/users", function (req,res) {

    Project.find({status:"Approved"}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `users not found` })
        }
        res.send(JSON.stringify(users));
    }).populate("userID").populate("contributions").populate("commentaires").sort({createdAt: 'desc'}).catch(err => console.log(err))

})
router.get("/userproject/:id", function (req,res) {
    Project.find({userID: req.params.id }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `projects not found` })
        }
        res.send(JSON.stringify(project));
    }).populate("userID").populate("rewards").populate("contributions").populate("communauteID").catch(err => console.log(err))

})

/*user de projet */
router.get("/userbyproject/:id", function (req,res) {
    Project.find({userID: req.params.id }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project.length) {
            return res
                .status(404)
                .json({ success: false, error: `projects not found` })
        }
        return res.status(200).json({ success: true, data: project })
    }).populate("userID").populate("rewards").populate("contributions").populate("communauteID").catch(err => console.log(err))

})
/*delete project*/

router.delete("/delete/:id", function (req,res) {
    /*Project.findOneAndDelete({ _id: req.body.id }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `projet n existe pas` })
        }

        return res.status(200).json({ success: true, data: project })
    }).catch(err => console.log(err))*/

    User.findOneAndUpdate({ _id: req.body.id }, { $pull: 
        {projects: req.params.id}
     
     }, (err, user) => {

        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })}
            Project.findByIdAndRemove({ _id: req.params.id }, (err) => {
                if (err) res.json(err)
                return res.status(200).json({ success: true, data: 'Succesfully removed' })
              
            });
   
   



   
 })

});
router.get("/project/:id", function (req,res) {

    Project.findOne({ _id: req.params.id }, (err, categorie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!categorie) {
            return res
                .status(404)
                .json({ success: false, error: `category not found` })
        }
        return res.status(200).json({ success: true, data: categorie })
    }).populate("contributions").populate("userID").populate("suivres").populate("rewards").populate("updates").populate("communauteID").catch(err => console.log(err))

})


router.put("/update/:id", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a notification',
        })
    }
   
    Project.findOneAndUpdate({  _id: req.params.id }, { $set: { description: req.body.description } ,category: req.body.category}, { new: true ,upsert: true,setDefaultsOnInsert: true}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });

});
router.put("/updateproject/:id",upload.single('cover_image'), function (req,res) {
    const body = req.body
    const url = req.protocol + '://' + req.get('host')
   
   Project.findOneAndUpdate({_id: req.params.id }, { $set: { name: req.body.name }, description: req.body.description,headline: req.body.headline ,category: req.body.category,
    location: req.body.location,
    goal: req.body.goal,
    website: req.body.website,
    facebook_link: req.body.facebook_link,
    twiter_link: req.body.twiter_link,
    linkedin_link: req.body.linkedin_link,
    duration: req.body.duration,
    
    
    
    cover_image:url + '/public/' + req.file.filename}, (err, doc) => {
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
            error: 'You must provide a notification',
        })
    }
   
    Project.findOneAndUpdate({  _id: req.params.id }, { $set: { status: req.body.status },adminnote:req.body.adminnote }, { new: true ,upsert: true,setDefaultsOnInsert: true}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });

});

router.delete("/deletesuivie/:id/:idp", function (req,res) {
    

   Project.findOneAndUpdate({ _id: req.params.idp }, { $pull: 
        {suivres: req.params.id}
     
     }, (err, user) => {

        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })}
            
        res.json('Succesfully removed')
        
   
   



   
 })

});

router.get("/chercher/:id", function (req,res) {

    Project.find( { $or: [  { name: req.params.id } ,{ category: req.params.id }] } , (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `users not found` })
        }
        res.send(JSON.stringify(users));
    }).populate("userID").populate("contributions").populate("commentaires").sort({createdAt: 'desc'}).catch(err => console.log(err))

})
module.exports=router
