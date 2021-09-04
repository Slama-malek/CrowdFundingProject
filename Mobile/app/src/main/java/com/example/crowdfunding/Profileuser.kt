package com.example.crowdfunding

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import com.squareup.picasso.Picasso

class Profileuser : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profileuser)
        val btnlogout: TextView = findViewById(R.id.tvdeconx)
        btnlogout.setOnClickListener{
            AppPreferences.isLogin = false
            AppPreferences.username = ""
            startActivity(Intent(this,MainActivity2::class.java))
        }
        val tvusername: TextView = findViewById(R.id.user_name)
        val userImage:ImageView= findViewById(R.id.user_photo)
        val image = AppPreferences.password?.substring(22)
        tvusername.setText(AppPreferences.username)
        val picasso = Picasso.get()
        picasso.load("http://192.168.1.250:3000/" + image)
           .into(userImage)

    }

}