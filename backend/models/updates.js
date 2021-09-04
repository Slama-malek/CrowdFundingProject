const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectUpdates = new Schema(
    {
        titre: { type: String, required: true },
        contenu: { type: String, required: true },
        
        projectID: { type:mongoose.Schema.Types.ObjectId,
            ref:'projects'}
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('projectupdates', ProjectUpdates)