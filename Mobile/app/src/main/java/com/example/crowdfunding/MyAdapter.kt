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


class MyAdapter(private val dataSet: ArrayList<Project>,private val context : Context) :
    RecyclerView.Adapter<MyAdapter.ViewHolder>() {

    /**
     * Provide a reference to the type of views that you are using
     * (custom ViewHolder).
     */
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val textView: TextView
        val tvdescription:TextView
        val tvcategory:TextView
        val tvlocation:TextView
        val coverimg: ImageView


        init {
            // Define click listener for the ViewHolder's View.
            textView = view.findViewById(R.id.tv_project_name)
            tvdescription=view.findViewById(R.id.tv_project_description)
            tvcategory=view.findViewById(R.id.tv_project_category)
            tvlocation=view.findViewById(R.id.tv_project_location)
           coverimg=view.findViewById(R.id.iv_project_image)


        }
    }

    // Create new views (invoked by the layout manager)
    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
        // Create a new view, which defines the UI of the list item
        val view = LayoutInflater.from(viewGroup.context)
            .inflate(R.layout.project_item, viewGroup, false)

        return ViewHolder(view)
    }

    // Replace the contents of a view (invoked by the layout manager)
    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {

        // Get element from your dataset at this position and replace the
        // contents of the view with that element
        val project: Project = dataSet.get(position)
        viewHolder.textView.text = project.name
        viewHolder.tvdescription.text = project.headline
        viewHolder.tvcategory.text = project.category
        viewHolder.tvlocation.text = project.location
        val picasso = Picasso.get()
        //val length=project.cover_image?.length
        val image=project.cover_image?.substring(22)
        Log.i("hhhhh",image.toString())

        picasso.load("http://192.168.1.250:3000/"+image).resize(70,70)
            .into(viewHolder.coverimg)

        viewHolder.itemView.setOnClickListener {
            val intent = Intent(context,detail_project::class.java)
            val bundle = Bundle()
            bundle.putString("position", project._id)
            bundle.putString("titre", project.name)
            bundle.putString("description", project.description)
            bundle.putString("category", project.category)
            bundle.putString("createdAt", project.createdAt)
            bundle.putString("location", project.location)
            bundle.putString("userproject", project.userID.username)
            bundle.putString("userimage", project.userID.cover_image)
            bundle.putInt("nbparticipants", project.participants!!)
            bundle.putInt("goal", project.goal!!)
            bundle.putInt("pourcentage", project.pourcentage!!)
            bundle.putString("coverimage", project.cover_image!!)
            bundle.putInt("nbcom", project.nbcommentaire!!)
            intent.putExtras(bundle)
            context.startActivity(intent)
        }

    }

    // Return the size of your dataset (invoked by the layout manager)
    override fun getItemCount() = dataSet.size

}
