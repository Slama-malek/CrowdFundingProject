package com.example.crowdfunding


class User{
        var _id: String? = null
        var username: String? = null
        var email: String? = null
        var password: String? = null
        var role: String? = null
    var cover_image: String? = null
    constructor(

    email: String,
    password:String
    ) {


        this.email = email
        this.password=password



    }
    constructor(
id:String,
        username: String,
email:String
    ) {

        this._id = id
        this.username = username
        this.email=email



    }
    constructor(username: String, email:String, password:String, role:String) {

        this.username = username
        this.email=email
        this.password= password
        this.role=role



    }
}
