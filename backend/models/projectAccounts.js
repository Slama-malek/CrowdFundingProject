const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema(
    {
        numero: { type: String, required: true },
        bank: { type: String, required: true },
        projectID: { type:mongoose.Schema.Types.ObjectId,
            ref:'projects'}
        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('accounts', Account)