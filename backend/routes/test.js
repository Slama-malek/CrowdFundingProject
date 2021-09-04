var express = require("express");

var router = express.Router();
const Movie = require('../models/test');
router.post("/testpost", function (req,res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }
    const movie = new Movie({
        name:req.body.name,
        time:req.body.time,
        rating:req.body.rating
    })
    movie.save()
       .then(data =>{
            res.json(data)
        })
    .catch(error =>{
        res.json(error)
})

  

});
router.get("/movies", function (req,res) {

    Movie.find({}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))

})

module.exports=router;
