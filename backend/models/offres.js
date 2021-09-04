const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Offre = new Schema(
    {
        titre: { type: String, required: true },
        description:{ type: String,required: true },
        max_credit:{ type: String,required:false },
        min_credit:{ type: String,required:false },
        investID: { type:mongoose.Schema.Types.ObjectId,
        ref:'users'}
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('offre', Offre)