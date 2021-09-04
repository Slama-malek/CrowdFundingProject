package com.example.crowdfunding.ui.gallery

import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.crowdfunding.*
import com.example.crowdfunding.databinding.FragmentGalleryBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.time.Month
import java.util.*


class GalleryFragment : Fragment() {

    private lateinit var galleryViewModel: GalleryViewModel
    private var _binding: FragmentGalleryBinding? = null
    lateinit var muserArrayList: ArrayList<User>

  var dataproject: java.util.ArrayList<Project> = java.util.ArrayList<Project>()

    private var rv: RecyclerView? = null
    private var mAdapter: DataAdapter? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        galleryViewModel =
            ViewModelProvider(this).get(GalleryViewModel::class.java)

        _binding = FragmentGalleryBinding.inflate(inflater, container, false)
        val root: View = binding.root
        rv = root.findViewById(R.id.rv)


        GlobalScope.launch(Dispatchers.Main) {
            try {
                val response = ApiClient.apiService.getProjects()

                if (response.isSuccessful && response.body() != null) {
                    val content = response.body()
                   // val jsonArray = JSONArray(content.toString())
                    //Log.i("hhhhhhhh",jsonArray.toString())
                    //val array = JSONArray(jsonArray.getString(1))
                    //Log.i("hhhhhhhh",array.toString())

                    for (project in response.body()!!) {
                        val user:User=project.userID
                        Log.i("hhhhhhhhh",user.username.toString())

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
                       Log.i("jjjjjjjjjjjjj",montantcollecte.toString())
                        Log.i("jjjjjjjjjjjjj",pourcentage.toString())
                       //val projectdetail :Project= Project(project._id,project.name,project.cover_image,project.description,project.category,project.location,project.userID)
                        val projectdetaile :Project= Project(project._id,project.name,project.location,project.cover_image,project.description,project.headline,project.category,project.createdAt,project.userID,project.contributions.size,project.goal,pourcentage,project.commentaires.size)
                        dataproject.add(projectdetaile)
                    }


                       // mAdapter!!.notifyDataSetChanged()






                }


                else {
                    Toast.makeText(
                        this@GalleryFragment.activity,
                        "Error Occurred: ${response.message()}",
                        Toast.LENGTH_LONG
                    ).show()
                }

            } catch (e: Exception) {
Log.i("errr",e.toString())
                Toast.makeText(
                    this@GalleryFragment.activity,
                    "Error Occurredhh: ${e.message}",
                    Toast.LENGTH_LONG
                ).show()
            }
        }

        /*val layoutManager : RecyclerView.LayoutManager = GridLayoutManager(
            this@GalleryFragment.activity,
            1)
        rv!!.layoutManager = layoutManager
        rv!!.adapter = mAdapter*/
        val user:User= User("hh","bbb")


        // val date =LocalDate.of(2016, Month.APRIL, 15)
        /*dataproject.add(
            Project(

                "jjk",
                "rr",
                "hhhhhhh",
                "http://localhost:3000/public/915a0960-66da-4357-9802-ab35c5f7dfca-blog-img-03.jpg",
                "Art",
                "Sousse",
                "2021-05-03T13:08:29.317Z",
                userID = user,
                2,
                1000,
                5,
                2

            )
        )*/

        rv?.apply {

            layoutManager = LinearLayoutManager(activity)


                adapter = MyAdapter(dataproject,this.context)

        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}