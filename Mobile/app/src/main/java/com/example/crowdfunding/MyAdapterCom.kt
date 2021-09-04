package com.example.crowdfunding

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso

class MyAdapterCom (private val dataSet: ArrayList<Community>,private val context : Context) :
    RecyclerView.Adapter<MyAdapterCom.ViewHolder>() {

    /**
     * Provide a reference to the type of views that you are using
     * (custom ViewHolder).
     */
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val textView: TextView
        val tvdescription: TextView
        val tvcategory: TextView

        val coverimg: ImageView


        init {
            // Define click listener for the ViewHolder's View.
            textView = view.findViewById(R.id.tv_com_name)
            tvdescription=view.findViewById(R.id.tv_com_description)
            tvcategory=view.findViewById(R.id.tv_com_category)
            coverimg=view.findViewById(R.id.iv_image_com)


        }
    }

    // Create new views (invoked by the layout manager)
    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
        // Create a new view, which defines the UI of the list item
        val view = LayoutInflater.from(viewGroup.context)
            .inflate(R.layout.com_item, viewGroup, false)

        return ViewHolder(view)
    }

    // Replace the contents of a view (invoked by the layout manager)
    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {

        // Get element from your dataset at this position and replace the
        // contents of the view with that element
        val community: Community = dataSet.get(position)
        viewHolder.textView.text = community.nom
        viewHolder.tvdescription.text = community.description
        viewHolder.tvcategory.text = community.category

        val picasso = Picasso.get()
        if(community.cover_image!="") {
            val image = community.cover_image?.substring(22)
            Log.i("hhhhh", image.toString())

            picasso.load("http://192.168.1.250:3000/" + image).resize(70, 70)
                .into(viewHolder.coverimg)
        }
        viewHolder.itemView.setOnClickListener {
            val intent = Intent(context,detail_com::class.java)
            val bundle = Bundle()
            bundle.putString("position", community._id)
            bundle.putString("description", community.description)
            bundle.putString("titre", community.nom)
            bundle.putString("createdat", community.createdAt)
            bundle.putString("category", community.category)
            bundle.putString("coverimage", community.cover_image)
            bundle.putString("username", community.userID.username)
            bundle.putInt("nbposts", 0)
           // bundle.putInt("nbprojects", community.projects.size)


            intent.putExtras(bundle)
            context.startActivity(intent)
        }

    }

    // Return the size of your dataset (invoked by the layout manager)
    override fun getItemCount() = dataSet.size

}
