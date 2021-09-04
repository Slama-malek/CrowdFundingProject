const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema(
    {
        name: { type: String, required: false },
        location: { type: String, required: false },
        goal: { type:Number, required: false },
        duration: { type: Date, required: false },
        facebook_link: { type: String, required: false, default:''},
        twiter_link: { type: String, required: false, default:''},
        linkedin_link: { type: String, required: false, default:''},
        website :{ type: String, required: false},
        status: {
            type: String, 
            enum: ['Pending', 'Approved','Rejected','Succeeded','Failed'],
            default: 'Pending'
          },
          headline :{ type: String, required: false, default:''},
        cover_image :{ type: String, required: false, default:''},
        description: { type: String, required:false },
       adminnote: { type: String, required:false },
        category:{ type: String, ref:'categories',required: false },
        communauteID:{ type:mongoose.Schema.Types.ObjectId,
            ref:'communautes'},
        rewards: [{type: mongoose.Schema.Types.ObjectId,ref:'rewards'}],
        accounts: [{type: mongoose.Schema.Types.ObjectId,ref:'account'}],
        userID: { type:mongoose.Schema.Types.ObjectId,
        ref:'users'},
        contributions: [{type: mongoose.Schema.Types.ObjectId,ref:'contribution'}],
        commentaires: [{type: mongoose.Schema.Types.ObjectId,ref:'commentaire'}],
        notes: [{type: mongoose.Schema.Types.ObjectId,ref:'note'}],
        updates: [{type: mongoose.Schema.Types.ObjectId,ref:'projectupdates'}],
        suivres: [{type: mongoose.Schema.Types.ObjectId,ref:'users'}]
        
    },
    { timestamps: true},
)

module.exports = mongoose.model('projects', Project)