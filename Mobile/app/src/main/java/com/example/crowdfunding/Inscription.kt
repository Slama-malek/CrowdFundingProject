package com.example.crowdfunding

import android.content.Intent
import android.os.Bundle

import android.util.Log
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory





class Inscription : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_inscription)
        val btninscri: Button = findViewById(R.id.btninscri_auth)
        val ednom : EditText = findViewById(R.id.ednom_auth)
        val edemail : EditText = findViewById(R.id.edemail_auth)
        var edmdp: EditText = findViewById(R.id.edpwd_auth)
        val tvauth: TextView = findViewById(R.id.tvnew_auth)

       // val spinner1:Spinner=findViewById(R.id.spinner1)
        tvauth.setOnClickListener {
            startActivity(Intent(this,Authentification::class.java))
        }
        btninscri.setOnClickListener {
            //startActivity(Intent(this,Authentification::class.java))

            val email=edemail.getText().toString();
            val password=edmdp.getText().toString()
            val username=ednom.getText().toString()
            val role= "manager"
            Log.i("email",email)
            Log.i("pass",password)
            Log.i("name",username)
            Log.i("role",role)
            if(email.equals("") || password.equals("")||username.equals("")) {
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
            else if (password.length<6) {
                Toast.makeText(
                    this,
                    "Le mot de passe doit comprendre entre 6 et 40 caractères.",
                    Toast.LENGTH_SHORT
                ).show()
            }

            else{
            val user=User(username,email,password,role)
/*
                //val response = ApiClient.apiService.signup(user)
                val retrofit = Retrofit.Builder()
                    .baseUrl("http://192.168.1.61:3000/")
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                val request = retrofit.create(IService::class.java)
                val call = request.signupuser(username,email,password,role)


                call.enqueue(object : Callback<UserResponse> {
                    override fun onResponse(call: Call<UserResponse>, response: Response<UserResponse>) {
                        if (response.code() == 402) {
                            startActivity(Intent(this@Inscription,MainActivity2::class.java))


                        }
                    }

                    override fun onFailure(call: Call<UserResponse>, t: Throwable) {

                    }
                })*/
                GlobalScope.launch(Dispatchers.Main) {
                    try {
                        val response = ApiClient.apiService.signup(user)

                        if (response.isSuccessful && response.body() != null) {

                            startActivity(Intent(this@Inscription,Authentification::class.java))




                        }
                        else if (response.code() == 404) {
                            Toast.makeText(
                                this@Inscription,
                                "Error!! utilisateur existe déjà",
                                Toast.LENGTH_LONG
                            ).show()
                        }



                        else {
                            Toast.makeText(
                                this@Inscription,
                                "Error Occurred: ${response.message()}",
                                Toast.LENGTH_LONG
                            ).show()
                        }

                    } catch (e: Exception) {

                        Toast.makeText(
                            this@Inscription,
                            "Error Occurred: ${e.message}",
                            Toast.LENGTH_LONG
                        ).show()
                    }
                }

            }


        }

    }

}