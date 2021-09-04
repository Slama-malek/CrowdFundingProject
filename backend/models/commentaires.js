const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Commentaire = new Schema(
    {
        contenu: { type: String, required: true }, 
        userID: { type:mongoose.Schema.Types.ObjectId,
            ref:'users'},
            projectID: { type:mongoose.Schema.Types.ObjectId,
                ref:'projects'}

        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('commentaire', Commentaire)