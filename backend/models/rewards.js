const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Reward = new Schema(
    {
        titre: { type: String, required: true },
        min_value: { type:Number, required: false },
        description: { type:String, required: false },
        max_contribution: { type:Number, required: false },
        date_exp: { type:Date, required: false },
        cover_image:{ type:String, required: false },
        projectID: { type:mongoose.Schema.Types.ObjectId,
            ref:'projects'},
        contributions: [{type: mongoose.Schema.Types.ObjectId,ref:'detailcontribution'}],
        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('rewards', Reward)