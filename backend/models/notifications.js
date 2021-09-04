const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Notification = new Schema(
    {
        titre: { type: String, required: true },
        contenu: { type: String, required: true },
        
        lus:{ type: Boolean,required:false,default:'0' },
        
        userID: { type:mongoose.Schema.Types.ObjectId,
        ref:'users'}
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('notification', Notification)