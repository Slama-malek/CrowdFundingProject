const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Panier = new Schema(
    {
        prix: { type: Number, required: true },
        quantite :{ type:  Number,required:false,default:'1' },
        
        rewardID: { type:mongoose.Schema.Types.ObjectId,
            ref:'reward'},
        

        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('panier', Panier)