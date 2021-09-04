var express = require("express");

var router = express.Router();
const ProjectUpdates= require('../models/updates');
const Project= require('../models/projects');

router.post("/create/:id", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const projectupdates = new ProjectUpdates({
        contenu:req.body.contenu,
        titre:req.body.titre,
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
        
            
    
        projectupdates.save()
            .then(data =>{
                 res.json(data)
             })
         .catch(error =>{
             res.json(error)
     })
      project.updates.push(projectupdates);
        project.save();
        return res.status(200).json({ success: true})
        
    }).catch(err => console.log(err))
    
    
});


/*tous les updates d'un projet */
router.get("/allupdates/:id", function (req,res) {

    ProjectUpdates.find({ projectID: req.params.id}, (err, coms) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!coms.length) {
            return res
                .status(404)
                .json({ success: false, error: `commentaires not found` })
        }
        return res.status(200).json({ success: true, data: coms })
    }).sort({createdAt: 'desc'}).catch(err => console.log(err))


})

router.put("/update/:id", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a contribution',
        })
    }
   
    ProjectUpdates.findOneAndUpdate({_id: req.params.id }, { $set: { titre: req.body.titre},contenu: req.body.contenu},{new: true ,upsert: true}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
        
    
        res.json(doc);
    });

    
});
/*router.delete("/delete/:id", function (req,res) {
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


});*/
router.get("/updatedetail/:id", function (req,res) {

    ProjectUpdates.findById({ _id: req.params.id }, (err, project) => {
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
router.delete("/delete/:id", function (req,res) {
    

    Project.findOneAndUpdate({ _id: req.body.id }, { $pull: 
        {updates: req.params.id}
     
     }, (err, user) => {

        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })}
            ProjectUpdates.findByIdAndRemove({ _id: req.params.id }, (err) => {
                if (err) res.json(err)
                else res.json('Succesfully removed')
            });
   
   



   
 })

});

module.exports=router
