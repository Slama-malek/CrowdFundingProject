package com.example.crowdfunding.ui.slideshow

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.crowdfunding.*
import com.example.crowdfunding.databinding.FragmentSlideshowBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class SlideshowFragment : Fragment() {

    private lateinit var slideshowViewModel: SlideshowViewModel
    private var _binding: FragmentSlideshowBinding? = null
    var datacom: java.util.ArrayList<Community> = java.util.ArrayList<Community>()

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        slideshowViewModel =
            ViewModelProvider(this).get(SlideshowViewModel::class.java)

        _binding = FragmentSlideshowBinding.inflate(inflater, container, false)
        val root: View = binding.root

        /*val textView: TextView = binding.textSlideshow
        slideshowViewModel.text.observe(viewLifecycleOwner, Observer {
            textView.text = it
        })*/

        val rv :RecyclerView=binding.rvcom
        GlobalScope.launch(Dispatchers.Main) {
            try {
                val response = ApiClient.apiService.getComus()

                if (response.isSuccessful && response.body() != null) {



                    for (project in response.body()!!) {

                        val comdetail : Community = Community(project._id,project.nom,project.description,project.cover_image,project.category,project.userID,project.createdAt,)
                        /*projectdetail.name=project.name
                        projectdetail.description=project.description
                        projectdetail.category=project.category
                        projectdetail.category=project.category*/
                        datacom.add(comdetail)
                    }
                    // mAdapter!!.notifyDataSetChanged()






                }


                else {
                    Toast.makeText(
                        this@SlideshowFragment.activity,
                        "Error Occurred: ${response.message()}",
                        Toast.LENGTH_LONG
                    ).show()
                }

            } catch (e: Exception) {
                Log.i("errr",e.toString())
                Toast.makeText(
                    this@SlideshowFragment.activity,
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
        /*datacom.add(
           Community(

                "jjk",
                "rr",
                "hhhhhhh",
                "http://localhost:3000/public/24d05b31-149e-4ee6-9f96-39411d845fde-blog-img-03.jpg",
               "Art",user

            )
        )
*/
        rv?.apply {

            layoutManager = LinearLayoutManager(activity)


            adapter = MyAdapterCom(datacom,this.context)

        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}