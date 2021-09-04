const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Investisseur = new Schema(
    {
        nomsociete: { type: String, required: true },
        category:{ type: String, required: false },
        secteur:{ type: String, required: false },
        description: { type: String, required: false },
        cover_image: { type: String, required: false },
        offres:[{ type:mongoose.Schema.Types.ObjectId,
            ref:'offre'}],
            
        userID: { type:mongoose.Schema.Types.ObjectId,
            ref:'users'}

        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('investisseur', Investisseur)