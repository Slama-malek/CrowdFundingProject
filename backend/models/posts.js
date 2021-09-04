const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema(
    {
        contenu: { type: String, required: true }, 
        userID: { type:mongoose.Schema.Types.ObjectId,
            ref:'users'},
            communauteID: { type:mongoose.Schema.Types.ObjectId,
                ref:'communautes'}

        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('posts', Post)