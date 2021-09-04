
import axios from "axios";
const headers = {
  "Content-Type": "application/json",
  "Accept" : "application/json",
  "Authorization" : "Bearer",
  "auth-token":"xxx",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": true,
 
};
const API_URL = "http://localhost:3000";

export default {

  /*login(username, password) {
    return axios
      .post(`${API_URL}/user/signin`, {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  },*/
login: function(email, password) {
  return axios.post(
    `${API_URL}/user/signinadmin`,
    {
      email,
      password
    },
    {
      headers: headers
    }
  )  .then(response => {
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
},
register(username, email, password,role) {
  return axios.post(API_URL + "/user/signup", {
    username,
    email,
    password,
    role
  });
},

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },
  logout: function() {
    localStorage.clear();
  },
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  },
  getAllprojects() {
    return axios.get(`${API_URL}/project/allprojects`)
    .then(response => {
      
  
      return response.data;
    });
  },
  getprojectdetail(id) {
    return axios.get(`${API_URL}/project/project/${id}`)
    .then(response => {
      
  
      return response.data;
    });
  },
  getprojectcontributions(id) {
    return axios.get(`${API_URL}/contribution/allprojectcontributions/${id}`)
    .then(response => {
      
  
      return response.data;
    });
  },
  getAllcategories() {
    return axios.get(`${API_URL}/categorie/allcategories`)
    .then(response => {
      
  
      return response.data;
    });
  },
};
