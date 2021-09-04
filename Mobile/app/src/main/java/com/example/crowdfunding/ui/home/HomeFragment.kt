package com.example.crowdfunding.ui.home

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.crowdfunding.Chercher
import com.example.crowdfunding.R
import com.example.crowdfunding.databinding.FragmentHomeBinding
import com.example.crowdfunding.detail_project

class HomeFragment : Fragment() {

    private lateinit var homeViewModel: HomeViewModel
    private var _binding: FragmentHomeBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        homeViewModel =
            ViewModelProvider(this).get(HomeViewModel::class.java)

        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root


       val btnsearch: Button =root.findViewById(R.id.bu_start_search)
        val tvsearch:TextView=root.findViewById(R.id.edsearch)
        btnsearch.setOnClickListener {
            val intent = Intent(context, Chercher::class.java)
            val bundle = Bundle()
            bundle.putString("nom", tvsearch.text.toString())
            intent.putExtras(bundle)
            startActivity(intent)
        }
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}