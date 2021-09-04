var express = require("express");

var router = express.Router();
const Note= require('../models/notes');
const User = require('../models/users');
const Project = require('../models/projects');

router.post("/create/:id", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const note = new Note({
        note:req.body.note,
        projectID:req.body.projectID ,
        userID:req.params.id

       
    })
    
User.findOne({ _id:req.params.id }, (err, user) => {
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
            return res.status(400).json({ success: false, message: err })
        }
    
        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `project not found` })
        }

        Note.findOne({ userID:req.params.id,projectID:req.body.projectID }, (err, notefound) => {
            if (err) {
                return res.status(400).json({ success: false, message: err })
            }
        
            if (notefound) {
                return res
                    .status(401)
                    .json({ success: false, message: `vous avez deja note ce projet` })
            }
        
        

        note.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
    user.notes.push(note);
    user.save();
    project.notes.push(note)
    project.save()
    return res.status(200).json({ success: true })

})
})
}).catch(err => console.log(err))

});


/*tous les notes d'un projet */
router.get("/allnotes/:id", function (req,res) {

    Note.find({projectID:req.params.id}, (err, coms) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!coms.length) {
            return res
                .status(404)
                .json({ success: false, error: `commentaires not found` })
        }
        return res.status(200).json({ success: true, data: coms })
    }).catch(err => console.log(err))


})

router.put("/update", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a contribution',
        })
    }
   
    Note.findOneAndUpdate({_id: req.body.id }, { $set: { note: req.body.note}},{new: true ,upsert: true}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
        
    
        res.json(doc);
    });

    
});
router.delete("/delete/:id", function (req,res) {
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


});

module.exports=router
