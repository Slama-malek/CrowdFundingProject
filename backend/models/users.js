const mongoose = require('mongoose')
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
var secret = 'xxx';
const Schema = mongoose.Schema

const User = new Schema(
    {
      username: { type: String, required: true},
        email: { type: String, required: true,unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        phone: { type: String, required: false },
        status: {
          type: String, 
          enum: ['Pending', 'Active'],
          default: 'Pending'
        },
        confirmationCode: { 
          type: String, 
          unique: true },
        bio: { type: String, required: false ,default:'pas de description'},
        profession: { type: String, required: false, default:''},
        secteur: { type: String, required: false, default:''},
        telephone: { type: String, required: false, default:''},
        facebook_link: { type: String, required: false, default:''},
        twiter_link: { type: String, required: false, default:''},
        linkedin_link: { type: String, required: false, default:''},
        adresse: { type: String, required: false, default:''},
cover_image:{ type: String, required: false, default:''},
        carts: [{type: mongoose.Schema.Types.ObjectId,ref:'cart'}],
        adresses: [{type: mongoose.Schema.Types.ObjectId,ref:'adresse'}],
        notifications: [{type: mongoose.Schema.Types.ObjectId,ref:'notification'}],
contributions: [{type: mongoose.Schema.Types.ObjectId,ref:'contribution'}],
commentaires:[{type: mongoose.Schema.Types.ObjectId,ref:'commentaire'}],
posts:[{type: mongoose.Schema.Types.ObjectId,ref:'posts'}],
notes:[{type: mongoose.Schema.Types.ObjectId,ref:'note'}],
communautes:[{type: mongoose.Schema.Types.ObjectId,ref:'communautes'}],


        projects: [{type: mongoose.Schema.Types.ObjectId,ref:'projects'}],
        suivres: [{type: mongoose.Schema.Types.ObjectId,ref:'projects'}],
        offres: [{type: mongoose.Schema.Types.ObjectId,ref:'offre'}],
        messages:[{ type:mongoose.Schema.Types.ObjectId,
          ref:'message'}]
    
     

        
        
    },
    { timestamps: true },
);
User.methods = {
    authenticate: function(password) {
      return passwordHash.verify(password, this.password);
    },
    getToken: function() {
      return jwt.encode(this,secret);
    }
  };
  

module.exports = mongoose.model('users', User)