const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Note = new Schema(
    {
        note: { type: String, required: true },
        
        
        userID: { type:mongoose.Schema.Types.ObjectId,
            ref:'users'},
            projectID: { type:mongoose.Schema.Types.ObjectId,
                ref:'projects'}

        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('note', Note)