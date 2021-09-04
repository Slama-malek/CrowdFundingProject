const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema(
    {
        contenu: { type: String, required: true },
    
        investID: { type:mongoose.Schema.Types.ObjectId,
        ref:'users'},
        userID: { type:mongoose.Schema.Types.ObjectId,
            ref:'users'}
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('message', Message)