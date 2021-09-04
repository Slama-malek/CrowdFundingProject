var express = require("express");

var router = express.Router();
const Categorie = require('../models/categories');
router.post("/create", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a categorie',
        })
    }
    const categorie = new Categorie({
        name:req.body.name
       
    })
    Categorie.findOne({ name: req.body.name}, (err, findCat) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (findCat) {
            return res
                .status(404)
                .json({ success: false, message: ` categorie existe déjà` })
        }
        else{
            categorie.save()
       .then(data =>{
            res.json(data)
        })
    .catch(error =>{
        res.json(error)
})

        }
        
    }).catch(err => console.log(err))

    

  

});
/*update */
router.put("/update/:id", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a categorie',
        })
    }
   
    Categorie.findByIdAndUpdate(req.params.id,req.body, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json({ msg: 'Updated successfully' });
    });

});
/*Delete */
router.delete("/delete/:id", function (req,res) {
    Categorie.findOneAndDelete({ _id: req.params.id }, (err, categorie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!categorie) {
            return res
                .status(404)
                .json({ success: false, error: `categorie not found` })
        }

        return res.status(200).json({ success: true, data: 'Succesfully removed' })
    }).catch(err => console.log(err))
});
/*all categories*/
router.get("/allcategories", function (req,res) {

    Categorie.find({}, (err, categories) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!categories.length) {
            return res
                .status(404)
                .json({ success: false, error: `categories not found` })
        }
        return res.status(200).json({ success: true, data: categories })
    }).sort({createdAt: 'desc'}).catch(err => console.log(err))

})
/*get categorie by id*/
router.get("/categorie/:id", function (req,res) {
    Categorie.findOne({ _id: req.params.id }, (err, categorie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!categorie) {
            return res
                .status(404)
                .json({ success: false, error: `category not found` })
        }
        return res.status(200).json({ success: true, data: categorie })
    }).catch(err => console.log(err))

})
module.exports=router
