package com.example.crowdfunding

import java.util.ArrayList

class Community {
    var _id: String? = null
    var nom: String? = null
    var description: String? = null
    var cover_image: String? = null
    var category: String? = null
    var status: String? = null
    var createdAt: String? = null
    var userID :User
   // lateinit var posts: ArrayList<Post>
    


    constructor(_id: String?, nom: String?, description: String?, cover_image: String?, category: String?,userID: User,createdAt: String?) {
        this._id = _id
        this.nom = nom
        this.description = description
        this.cover_image = cover_image
        this.category=category
        this.userID=userID


        this.createdAt=createdAt

    }
    constructor(_id: String?, nom: String?, description: String?, cover_image: String?, category: String?,userID: User) {
        this._id = _id
        this.nom = nom
        this.description = description
        this.cover_image = cover_image
        this.category=category
        this.userID=userID


    }
}