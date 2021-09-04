var express = require("express");

var router = express.Router();
const Post= require('../models/posts');
const User = require('../models/users');
const Communaute = require('../models/communautes');

router.post("/create/:id", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const post = new Post({
        contenu:req.body.contenu,
        communauteID:req.body.communauteID ,
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
    Communaute.findOne({ _id: req.body.communauteID }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, message: err })
        }
    
        if (!project) {
            return res
                .status(404)
                .json({ success: false, message: `communaute not found` })
        }

    
        

        post.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
    user.posts.push(post);
    user.save();
    project.posts.push(post)
    project.save()
    return res.status(200).json({ success: true })
})

}).catch(err => console.log(err))

});


/*tous les commentaires d'un communaute */
router.get("/allcoms", function (req,res) {

    Post.find({communauteID:req.body.id}, (err, coms) => {
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
   
   /* Commentaire.findOneAndUpdate({_id: req.body.id }, { $set: { contenu: req.body.contenu}},{new: true ,upsert: true}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });*/

    Commentaire.findOne({_id: req.body.id}, (err, findCom) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!findCom) {
            return res
                .status(404)
                .json({ success: false, message: ` commentaire n existe pas` })
        }
        else if(findCom.userID!=req.body.userID){
            return res
            .status(404)
            .json({ success: false, message: ` vous avez pas le droit de modifier ce commentaire` })
        }
        else{
            findCom.contenu=req.body.contenu
            findCom.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                   
                    message: 'commentaire updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'commentaire not updated!',
                })
            })

        }
        
    }).catch(err => console.log(err))

});
router.delete("/delete", function (req,res) {
    

    User.findOneAndUpdate({ _id: req.body.iduser }, { $pull: 
        {posts: req.body.idcom}
     
     }, (err, user) => {

        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })}
else{
   Communaute.findOneAndUpdate({ _id:req.body.idproject }, { $pull: 
        {posts: req.body.idcom}
     
     }, (err, user) => {

        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })}


            Commentaire.findByIdAndRemove({ _id: req.body.idcom}, (err,commentaire) => {
                if (err) res.json(err)
                else res.json('Succesfully removed')
      }) 
    
    })
        
        }
   
   



   
 })

});


router.get("/allcommunautecoms/:id", function (req,res) {

   Post.find({communauteID:req.params.id}, (err, carts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!carts.length) {
            return res
                .status(404)
                .json({ success: false, error: `contributions not found` })
        }
        return res.status(200).json({ success: true, data: carts })
    }).populate("userID").catch(err => console.log(err))


})
module.exports=router
