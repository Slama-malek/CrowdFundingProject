const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Membership = new Schema(
    {
        accepted: { type:Boolean, required:false,default:'0' },
        userID: { type:mongoose.Schema.Types.ObjectId,
            ref:'users'},
        communauteID: { type:mongoose.Schema.Types.ObjectId,
                ref:'communautes'}

        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('membership', Membership)