package com.example.crowdfunding

import android.content.DialogInterface
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.text.Html
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.squareup.picasso.Picasso
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import org.ocpsoft.prettytime.PrettyTime
import java.text.SimpleDateFormat


class detail_project : AppCompatActivity() {
   // public var dataproject: java.util.ArrayList<Project> = java.util.ArrayList<Project>()

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail_project)
        val bundle = intent.extras
   val position = bundle!!.getString("position")
        val titre= bundle!!.getString("titre")
        val description= bundle!!.getString("description")
        val category= bundle!!.getString("category")
        val location= bundle!!.getString("location")
        val createdAt= bundle!!.getString("createdAt")
        val username= bundle!!.getString("userproject")
        val nbp= bundle!!.getInt("nbparticipants")
        val goal=bundle!!.get("goal")
        val pourcentage=bundle!!.get("pourcentage")
        val coverimage:String= bundle!!.get("coverimage") as String

        val coverimageuser:String= bundle!!.get("userimage") as String
        val nbcom=bundle!!.get("nbcom")
        val tvnbcom: TextView =findViewById(R.id.commentNumber)
        val tvimageuser: ImageView =findViewById(R.id.userPhoto)
        val tvimage: ImageView =findViewById(R.id.ivimagecom)
        val tvporcentage: TextView =findViewById(R.id.funded)
        val tvgoal: TextView =findViewById(R.id.tvprojectcom)
        val tvnbp: TextView =findViewById(R.id.tvmembercom)
        val tvtitle: TextView =findViewById(R.id.tvnomproject)
        val tvcategory: TextView =findViewById(R.id.tvcategorycpm)
        val tvuser:TextView=findViewById(R.id.tvusercom)
        val tvusername:TextView=findViewById(R.id.createdBytxt)
        val tvdescription:TextView=findViewById(R.id.tvdesccom)
        val tvdate:TextView=findViewById(R.id.remainDays)
        val tvlocation:TextView=findViewById(R.id.singlePostLocation)
        val btnshare:Button=findViewById(R.id.ib_website)
        val btnsuivre:Button=findViewById(R.id.ib_zip)
        val date = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(createdAt)
        val p = PrettyTime()
       val datep= p.format(date)
        val image=coverimage.substring(22)

        val picasso = Picasso.get()
        picasso.load("http://192.168.1.250:3000/"+image)
            .into(tvimage)
        if(coverimageuser!=""){
        val imageuser=coverimageuser.substring(22)
        picasso.load("http://192.168.1.250:3000/"+imageuser)
            .into(tvimageuser)}


        tvtitle.setText(titre)
tvcategory.setText(category)
        //tvdescription.setText(description)
        tvdescription.text = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            Html.fromHtml(description, Html.FROM_HTML_MODE_COMPACT)
        } else {
            Html.fromHtml(description)
        }
        tvlocation.setText(location)
        tvdate.setText(datep)
        tvuser.setText(username)
        tvusername.setText(username)
        tvnbp.setText(nbp.toString())
        tvgoal.setText(goal.toString())
        tvnbcom.setText(nbcom.toString())
        tvporcentage.setText(pourcentage.toString()+"%")
        btnshare.setOnClickListener {
            //Get text from TextView and store in variable "s"
            val s = tvtitle.text.toString()
            //Intent to share the text
            val shareIntent = Intent()
            shareIntent.action = Intent.ACTION_SEND
            shareIntent.type="text/plain"
            shareIntent.putExtra(Intent.EXTRA_TEXT, s);

            shareIntent.putExtra(Intent.EXTRA_TEXT,"http://www.url.com");
            //shareIntent.putExtra(Intent.EXTRA_TEXT,"http://localhost:4001/detailproject/60d33544d03d0d348cff1e33"+position.toString());
            startActivity(Intent.createChooser(shareIntent,"Share via"))
        }
        btnsuivre.setOnClickListener {

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
                        val idp=position.toString()
                        val id=AppPreferences.id
                        val response = ApiClient.apiService.suivre(id,idp)

                        if (response.isSuccessful && response.body() != null) {

                            //startActivity(Intent(this@detail_project,Authentification::class.java))
btnsuivre.setText("Suivi");



                        }
                        else if (response.code() == 401) {
                            Toast.makeText(
                                this@detail_project,
                                "Error!! Vous avez deja suivre ce projet",
                                Toast.LENGTH_LONG
                            ).show()
                        }
                        else if (response.code() == 404) {
                            Toast.makeText(
                                this@detail_project,
                                "Error!! Vous ne pouver suivre votre propre projet",
                                Toast.LENGTH_LONG
                            ).show()
                        }



                        else {
                            Toast.makeText(
                                this@detail_project,
                                "Error Occurred: ${response.message()}",
                                Toast.LENGTH_LONG
                            ).show()
                        }

                    } catch (e: Exception) {

                        Toast.makeText(
                            this@detail_project,
                            "Error Occurred: ${e.message}",
                            Toast.LENGTH_LONG
                        ).show()
                    }
                }


        }}
    }
}