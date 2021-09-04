package com.example.crowdfunding

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class Chercher : AppCompatActivity() {
    private var mAdapter: DataAdapter? = null
    var dataproject: java.util.ArrayList<Project> = java.util.ArrayList<Project>()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chercher)
        val bundle = intent.extras
        //val nom:String

           val nom= bundle!!.getString("nom")
        Log.i("email",nom.toString())
        val rv:RecyclerView = findViewById(R.id.rv)
        GlobalScope.launch(Dispatchers.Main) {
            try {
                val response = ApiClient.apiService.chercher(nom.toString())

                if (response.isSuccessful && response.body() != null) {
                    val content = response.body()

                    for (project in response.body()!!) {
                        val user:User=project.userID


                    }



                    for (project in response.body()!!) {
                        var montantcollecte=0
                        var pourcentage=0
                        val user:User=project.userID
                        Log.i("size",project.contributions.size.toString())
                        for (participant in project.contributions!!) {
                            montantcollecte=montantcollecte+participant.montant!!

                        }


                        pourcentage=montantcollecte*100/ project.goal!!

                        //val projectdetail :Project= Project(project._id,project.name,project.cover_image,project.description,project.category,project.location,project.userID)
                        val projectdetaile :Project= Project(project._id,project.name,project.location,project.cover_image,project.description,project.headline,project.category,project.createdAt,project.userID,project.contributions.size,project.goal,pourcentage,project.commentaires.size)
                        dataproject.add(projectdetaile)
                    }
                // mAdapter!!.notifyDataSetChanged()






                }
                else if (response.code() == 404) {
                    Toast.makeText(
                        this@Chercher,
                        "Aucun projet",
                        Toast.LENGTH_LONG
                    ).show()
                }


                else {
                    Toast.makeText(
                        this@Chercher,
                        "Error Occurred: ${response.message()}",
                        Toast.LENGTH_LONG
                    ).show()
                }

            } catch (e: Exception) {
                Log.i("errr",e.toString())
                Toast.makeText(
                    this@Chercher,
                    "Error Occurredhh: ${e.message}",
                    Toast.LENGTH_LONG
                ).show()
            }
        }

        rv?.apply {

            layoutManager = LinearLayoutManager(this@Chercher)


            adapter = MyAdapter(dataproject,this.context)

        }

    }
}