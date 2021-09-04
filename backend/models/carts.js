const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cart = new Schema(
    {
        numero: { type: String, required: true },
        code_secret :{ type: String, required: false },
        proprietaire: { type: String, required: false },
        date_exp: { type: Date, required: false },
        userID: { type:mongoose.Schema.Types.ObjectId,
            ref:'users'}

        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('cart', Cart)