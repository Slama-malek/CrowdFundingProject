const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Detailcontribution = new Schema(
    {
        prix: { type: Number, required: true },
        quantite :{ type:  Number,required:false },
        
        
        rewardID: { type:mongoose.Schema.Types.ObjectId,
            ref:'rewards'},
            contibutionID:{ type:mongoose.Schema.Types.ObjectId,
                ref:'contribution'}
        

        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('detailcontribution', Detailcontribution)