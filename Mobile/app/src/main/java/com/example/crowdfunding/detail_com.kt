package com.example.crowdfunding

import android.content.DialogInterface
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import com.squareup.picasso.Picasso
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import org.ocpsoft.prettytime.PrettyTime
import java.text.SimpleDateFormat

class detail_com : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail_com)
        val bundle = intent.extras
        val position = bundle!!.getString("position")
        val titre= bundle!!.getString("titre")
        val category= bundle!!.getString("category")
        val desc= bundle!!.getString("description")
        val coverimage= bundle!!.getString("coverimage")
        val username=bundle!!.getString("username")
        val nbposts=bundle!!.getInt("nbposts")
        val nbprojects=bundle!!.getInt("nbprojects")
        val createdat= bundle!!.getString("createdat")

        val tvnom: TextView =findViewById(R.id.tvnomproject)
        val tvcategory:TextView=findViewById(R.id.tvcategorycpm)
        val tvdesc:TextView=findViewById(R.id.tvdesccom)
        val tvuser:TextView=findViewById(R.id.tvusercom)
        val tvcreatedby:TextView=findViewById(R.id.tvcreatedbycom)
        val tvimage:ImageView=findViewById(R.id.ivimagecom)
        val tvnbposts:TextView=findViewById(R.id.tvcommentNumber)
        val tvnbprojects:TextView=findViewById(R.id.tvprojectcom)
        val tvcreatedat:TextView=findViewById(R.id.tvcreatedatcom)
        val btnrejoindre:Button=findViewById(R.id.btnrejoindre)

        val date = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(createdat)
        val p = PrettyTime()
        val datep= p.format(date)
        val picasso = Picasso.get()


        if(coverimage!=""){
            val imageuser= coverimage?.substring(22)
            picasso.load("http://192.168.1.250:3000/"+imageuser)
                .into(tvimage)}


        tvnom.setText(titre)
        tvcategory.setText(category)
        tvdesc.setText(desc)
        tvuser.setText(username)
        tvcreatedby.setText(username)
        tvnbposts.setText(nbposts.toString())
        tvnbprojects.setText(nbprojects.toString())
        tvcreatedat.setText(datep)
btnrejoindre.setOnClickListener {
    if (!AppPreferences.isLogin) {
        val dialogBuilder = AlertDialog.Builder(this)

        // set message of alert dialog
        dialogBuilder.setMessage("Vous devez connecter d'abord")

            .setCancelable(false)

            .setNegativeButton("Cancel", DialogInterface.OnClickListener {
                    dialog, id -> dialog.cancel()
            })

        // create dialog box
        val alert = dialogBuilder.create()
        // set title for alert dialog box
        alert.setTitle("Alerte !!")
        // show alert dialog
        alert.show()

    }
    else{
        GlobalScope.launch(Dispatchers.Main) {
            try {
                val idc=position.toString()
                val id=AppPreferences.id
                val response = ApiClient.apiService.rejoindre(id,idc)

                if (response.isSuccessful && response.body() != null) {

                    //startActivity(Intent(this@detail_project,Authentification::class.java))
                    //btnsuivre.setText("Suivi");



                }
                else if (response.code() == 401) {
                    Toast.makeText(
                        this@detail_com,
                        "Error!! Votre demande est en attente",
                        Toast.LENGTH_LONG
                    ).show()
                }
                else if (response.code() == 404) {
                    Toast.makeText(
                        this@detail_com,
                        "Error!! Vous ete deja le responsable de communaute",
                        Toast.LENGTH_LONG
                    ).show()
                }
                else if (response.code() == 403) {
                    Toast.makeText(
                        this@detail_com,
                        "Error!! Vous etes deja membre",
                        Toast.LENGTH_LONG
                    ).show()
                }



                else {
                    Toast.makeText(
                        this@detail_com,
                        "Error Occurred: ${response.message()}",
                        Toast.LENGTH_LONG
                    ).show()
                }

            } catch (e: Exception) {

                Toast.makeText(
                    this@detail_com,
                    "Error Occurred: ${e.message}",
                    Toast.LENGTH_LONG
                ).show()
            }
        }


    }}


    }
}