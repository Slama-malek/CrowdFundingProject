package com.example.crowdfunding

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch


class Authentification : AppCompatActivity() {




    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_authentification)
        val btnconnect: Button = findViewById(R.id.btnconnect_auth)
        val ednom :EditText = findViewById(R.id.ednom_auth)
        var edmdp: EditText = findViewById(R.id.edpwd_auth)
        val tvinsri: TextView = findViewById(R.id.tvnew_auth)



        tvinsri.setOnClickListener {
            startActivity(Intent(this,Inscription::class.java))
        }
        btnconnect.setOnClickListener {
            val email=ednom.getText().toString();
            val password=edmdp.getText().toString()
            Log.d("email",email)
            Log.d("email",password)
            if(email.equals("") || password.equals("")) {
                Toast.makeText(
                    this,
                    "Vous devez remplir les champs!",
                    Toast.LENGTH_SHORT
                ).show()}
                else if (!(email.contains("@") && email.contains(".") && email.length > 4)) {
                    Toast.makeText(
                        this,
                        "Adresse Email Invalide!",
                        Toast.LENGTH_SHORT
                    ).show()
                }

            else{

val user=User(email,password)
                GlobalScope.launch(Dispatchers.Main) {
                        try {
                            val response = ApiClient.apiService.sigin(user)

                            if (response.isSuccessful && response.body() != null) {
                                val content : User? = response.body()

                                Log.i("content", content?.email.toString())
                                Log.i("content", content?._id.toString())

                                AppPreferences.isLogin = true
                                AppPreferences.username = content?.username.toString()
                                AppPreferences.password = content?.cover_image.toString()
                                //AppPreferences.password = password
                                AppPreferences.id = content?._id.toString()
                                startActivity(Intent(this@Authentification,MainActivity2::class.java))




                            }

                           else if (response.code() == 404) {
                                Toast.makeText(
                                    this@Authentification,
                                    "Error  L utilisateur n existe pas",
                                    Toast.LENGTH_LONG
                                ).show()
                            }
                            else if (response.code() == 401) {
                                Toast.makeText(
                                    this@Authentification,
                                    "Error:Mot de passe incorrect",
                                    Toast.LENGTH_LONG
                                ).show()
                            }
                            else if (response.code() == 402) {
                                Toast.makeText(
                                    this@Authentification,
                                    "Error:Vous devez activez votre compte!",
                                    Toast.LENGTH_LONG
                                ).show()
                            }
                            else {
                                Toast.makeText(
                                    this@Authentification,
                                    "Error Occurred: ${response.message()}",
                                    Toast.LENGTH_LONG
                                ).show()
                            }

                        } catch (e: Exception) {

                            Toast.makeText(
                                this@Authentification,
                                "Error Occurred: ${e.message}",
                                Toast.LENGTH_LONG
                            ).show()
                        }
                    }

               // if (AppPreferences.isLogin) { startActivity(Intent(this, MainActivity2::class.java))}
            }

        }


    }
}