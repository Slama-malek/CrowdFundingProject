const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Adresse = new Schema(
    {
        adresse: { type: String, required: true },
        ville:{ type: String,required: true },
        governoment:{ type: String,required:false },
        code_postal:{ type: String,required:false },
        pays:{ type: String,required:false },
        userID: { type:mongoose.Schema.Types.ObjectId,
        ref:'users'}
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('adresse', Adresse)