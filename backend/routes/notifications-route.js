var express = require("express");

var router = express.Router();
const Notification = require('../models/notifications');
const User = require('../models/users');

router.post("/create/:id", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const notification = new Notification({
        titre:req.body.titre,
        contenu:req.body.contenu,
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
    else{
        

        notification.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
    user.notifications.push(notification);
    user.save();
    return res.status(200).json({ success: true, data: user })
}
    
}).catch(err => console.log(err))

});

/*tous les notifications d'un user */
router.get("/allnotifications/:id", function (req,res) {

    Notification.find({userID: req.params.id}, (err, notifs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!notifs.length) {
            return res
                .status(404)
                .json({ success: false, error: `categories not found` })
        }
        return res.status(200).json({ success: true, data: notifs })
    }).catch(err => console.log(err))

})
router.get("/all", function (req,res) {

    Notification.find({}, (err, projects) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!projects.length) {
            return res
                .status(404)
                .json({ success: false, error: `project not found` })
        }
        return res.status(200).json({ success: true, data: projects})
    }).sort({createdAt: 'desc'}).catch(err => console.log(err))


})
router.put("/update", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a notification',
        })
    }
   
    Notification.findOneAndUpdate({  _id: req.body.id }, { $set: { lus: '1' } }, { new: true ,upsert: true,setDefaultsOnInsert: true}, (err, doc) => {
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
        {notifications: req.params.id}
     
     }, (err, user) => {

        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })}
            Notification.findByIdAndRemove({ _id: req.params.id }, (err) => {
                if (err) res.json(err)
                else res.json('Succesfully removed')
            });
   
   



   
 })

});
module.exports=router
