const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contribution = new Schema(
    {
        montant: { type: Number, required: true },
        anonymat :{ type: Boolean,required:false,default:'0' },
        typepaiement:{type:String,required:false},
        nomprenom :{ type: String,required:false },
        adresse :{ type: String,required:false },
        governorat :{ type: String,required:false },
        ville :{ type: String,required:false },
        codepostal :{ type: String,required:false },
        telephone :{ type: String,required:false },
        notes :{ type: String,required:false },
        status: {
            type: String, 
            
            default: 'Pending'
          },
        userID: { type:mongoose.Schema.Types.ObjectId,
            ref:'users'},
            projectID: { type:mongoose.Schema.Types.ObjectId,
                ref:'projects'},
                
detailcontributions:[{type: mongoose.Schema.Types.ObjectId,ref:'detailcontribution'}]
        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('contribution', Contribution)