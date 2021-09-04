var express = require("express");

var router = express.Router();
const Account = require('../models/projectAccounts');
const Project = require('../models/projects');

router.post("/create/:id", function (req,res) {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const account = new Account({
        numero:req.body.numero,
        bank:req.body.bank,
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
    
        

        account.save()
        .then(data =>{
             res.json(data)
         })
     .catch(error =>{
         res.json(error)
 })
    project.accounts.push(account);
    project.save();
    return res.status(200).json({ success: true ,data:project})
    
}).catch(err => console.log(err))

});

/*tous les comptes d'un projet */
router.get("/allaccounts", function (req,res) {

    Account.find({projectID:req.body.id}, (err, projects) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!projects.length) {
            return res
                .status(404)
                .json({ success: false, error: `account not found` })
        }
        return res.status(200).json({ success: true, data: projects })
    }).catch(err => console.log(err))


})
router.put("/update", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a cart',
        })
    }
   
    Account.findOneAndUpdate({_id: req.body.id }, { $set: { numero: req.body.numero }, bank: req.body.bank}, (err, doc) => {
        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })
        }
    
        res.json(doc);
    });

});
/*supprimer  comptes d'un projet*/
router.delete("/delete", function (req,res) {
    

    Project.findOneAndUpdate({ _id: req.body.id }, { $pull: 
        {accounts: req.body.idaccount}
     
     }, (err, user) => {

        if (err) {
            return res
            .status(404)
            .json({ success: false, error: `erreur` })}
            Reward.findByIdAndRemove({ _id: req.body.idaccount }, (err) => {
                if (err) res.json(err)
                else res.json('Succesfully removed')
            });
   
   



   
 })

});

router.get("/rewarddetail", function (req,res) {

    Reward.find({_id: req.body.id}, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!project.length) {
            return res
                .status(404)
                .json({ success: false, error: `reward not found` })
        }
        return res.status(200).json({ success: true, data: project })
    }).catch(err => console.log(err))

})

module.exports=router
