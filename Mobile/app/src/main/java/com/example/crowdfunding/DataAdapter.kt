package com.example.crowdfunding

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class DataAdapter (private val dataList : ArrayList<User>, private val listener : Context) : RecyclerView.Adapter<DataAdapter.ViewHolder>() {

    interface Listener {

        fun onItemClick(android : User)
    }

    private val colors : Array<String> = arrayOf("#EF5350", "#EC407A", "#AB47BC", "#7E57C2", "#5C6BC0", "#42A5F5")

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {

        holder.bind(dataList[position], listener, position)
        val user: User = dataList.get(position)
        holder.tv_nom?.text=user.username
    }

    override fun getItemCount(): Int = dataList.count()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        val view = LayoutInflater.from(parent.context).inflate(R.layout.project_item, parent, false)

        return ViewHolder(view)
    }

    class ViewHolder(view : View) : RecyclerView.ViewHolder(view) {
var tv_nom:TextView?=null
        fun bind(user: User, listener: Context, position: Int) {


           // itemView.tv_project_name.text = user.username
            tv_nom = itemView.findViewById(R.id.tv_project_name)
           // itemView.tv_version.text = android.version
           // itemView.tv_api_level.text = android.apiLevel
           // itemView.setBackgroundColor(Color.parseColor(colors[position % 6]))

           // itemView.setOnClickListener{ listener.onItemClick(user) }
        }
    }
}