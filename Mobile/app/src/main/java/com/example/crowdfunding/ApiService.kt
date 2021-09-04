package com.example.crowdfunding
import retrofit2.Response
import retrofit2.http.*
interface ApiService {
    @GET("user/users")
    suspend fun getUsers(): Response<MutableList<User>>
    @GET("commu/communities")
    suspend fun getComus(): Response<MutableList<Community>>
    @GET("project/users")
    suspend fun getProjects(): Response<MutableList<Project>>
    @GET("project/chercher/{id}")
    suspend fun chercher(@Path("id") id:String): Response<MutableList<Project>>
    @POST("user/signinmobile")
    suspend fun sigin(@Body user: User): Response<User>
    @POST("user/signup")
    suspend fun signup(@Body user: User): Response<User>
    @POST("member/createmobile/{id}/{idc}")
    suspend fun rejoindre(@Path("id") id:String,@Path("idc") idc:String): Response<Project>
    @POST("project/suivremobile/{id}/{idp}")
    suspend fun suivre(@Path("id") id:String,@Path("idp") idp:String): Response<Project>


}