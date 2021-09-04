package com.example.crowdfunding

import java.sql.Timestamp
import java.util.*

class Project {
    var _id: String? = null
    var name: String? = null
    var location: String? = null
    var goal: Int? = null
    var duration: Date? = null
    var status: String? = null
    var facebook_link: String? = null
   var twiter_link:String?=null
    var linkedin_link: String? = null
    var headline: String? = null
    var cover_image: String? = null
    var description: String? = null
    var category: String? = null
    var username: String? = null
    var createdAt: String? = null
    var participants: Int? = null
    var pourcentage:Int?= null
     var userID :User

     lateinit var contributions:ArrayList<Contribution>
    lateinit var commentaires:ArrayList<Commentaire>
    var nbcommentaire:Int?= null

    constructor(
        _id: String?,
        name: String?,
        location: String?,
        cover_image: String?,
        description: String?,
        headline: String?,
        category: String?,
        createdAt:String?,
        userID: User,
        participants:Int?,
        goal:Int?,
        pourcentage:Int?,
        nbcommentaire:Int?

    ) {
        this._id = _id
        this.name = name
        this.location = location
        this.cover_image = cover_image
        this.description = description
        this.headline = headline
        this.category = category
        this.createdAt = createdAt
        this.userID = userID
        this.participants = participants
        this.goal = goal
        this.pourcentage=pourcentage
        this.nbcommentaire=nbcommentaire
    }
}