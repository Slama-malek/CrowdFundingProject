package com.example.crowdfunding

class Contribution {
    var _id:String?=null
   var montant:Int?=null

    constructor(_id: String?, montant: Int?) {
        this._id = _id
        this.montant = montant
    }
}