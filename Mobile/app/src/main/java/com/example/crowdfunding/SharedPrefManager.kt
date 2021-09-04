package com.example.crowdfunding

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences

class SharedPrefManager private constructor(context: Context) {
    //method to let the user login
    //this method will store the user data in shared preferences
    fun userLogin(user: User) {
        var sharedPreferences: SharedPreferences =
            mCtx.getSharedPreferences(SHARED_PREF_NAME, Context.MODE_PRIVATE)
        var editor: SharedPreferences.Editor = sharedPreferences.edit()
        editor.putString(KEY_ID,user._id)
        editor.putString(KEY_USERNAME, user.username)
        editor.putString(KEY_EMAIL, user.email)
        editor.putString(KEY_CoverImage, user.cover_image)

        editor.apply()
    }

    //this method will checker whether user is already logged in or not
    val isLoggedIn: Boolean
        get() {
            val sharedPreferences: SharedPreferences = mCtx.getSharedPreferences(
                SHARED_PREF_NAME, Context.MODE_PRIVATE
            )
            return sharedPreferences.getString(KEY_USERNAME, null) != null
        }

    //this method will give the logged in user
   /* val user: User
        get() {
            val sharedPreferences: SharedPreferences = mCtx.getSharedPreferences(
                SHARED_PREF_NAME, Context.MODE_PRIVATE
            )
            return User(
                sharedPreferences.getString(KEY_ID, -1),
                sharedPreferences.getString(KEY_USERNAME, null),
                sharedPreferences.getString(KEY_EMAIL, null)

            )
        }*/

    //this method will logout the user
    fun logout() {
        val sharedPreferences: SharedPreferences =
            mCtx.getSharedPreferences(SHARED_PREF_NAME, Context.MODE_PRIVATE)
        val editor: SharedPreferences.Editor = sharedPreferences.edit()
        editor.clear()
        editor.apply()
        mCtx.startActivity(Intent(mCtx, MainActivity2::class.java))
    }

    companion object {
        private const val SHARED_PREF_NAME = "simplifiedcodingsharedpref"
        private const val KEY_USERNAME = "keyusername"
        private const val KEY_CoverImage = "keycoverimage"
        private const val KEY_EMAIL = "keyemail"
        private const val KEY_GENDER = "keygender"
        private const val KEY_ID = "keyid"
        private const val KEY_USERTYPE = "keyusertype"
        private const val KEY_TEL = "keytel"
        private var mInstance: SharedPrefManager? = null
        private var mCtx: Context = TODO()

        @Synchronized
        fun getInstance(context: Context): SharedPrefManager? {
            if (mInstance == null) {
                mInstance = SharedPrefManager(context)
            }
            return mInstance
        }
    }

    init {
        mCtx = context
    }
}