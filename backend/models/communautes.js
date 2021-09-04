const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Communaute = new Schema(
    {
        nom: { type: String, required: true },
        description :{ type: String,required:true },
        category :{ type: String,required:true },
        cover_image: { type: String, required: false },
        userID:{type: mongoose.Schema.Types.ObjectId,ref:'users'},
        status: {
            type: String, 
            enum: ['Pending', 'Approved','Rejected'],
            default: 'Pending'
          },
          adminnote: { type: String, required:false },
        projects:[{type: mongoose.Schema.Types.ObjectId,ref:'projects'}],
        posts:[{type: mongoose.Schema.Types.ObjectId,ref:'posts'}]

        
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('communautes', Communaute)