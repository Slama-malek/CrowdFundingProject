const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Categorie = new Schema(
    {
        name: { type: String, required: true }
        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('categories', Categorie)