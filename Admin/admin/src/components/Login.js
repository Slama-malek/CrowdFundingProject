import React, { useState } from 'react';
import PropTypes from 'prop-types';


import API from "../utiles/api";


export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  
  const handleSubmit = async e => {
    e.preventDefault();
  API.login(username, password).then(
    response => {
    const  token=response.data.token
    setToken(token)
    //this.props.history.push("/dashboard");
            window.location.href='http://localhost:4002/dashboard';
    },
    error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      
        setMessage(resMessage)
        
      
    }
    
  
      )}


  return(
    <div className="hk-wrapper">
        <div className="hk-pg-wrapper hk-auth-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 pa-0">
                <div className="auth-form-wrap pt-xl-0 pt-70">
                  <div className="auth-form w-xl-30 w-lg-55 w-sm-75 w-100">
                    <a className="auth-brand text-center d-block mb-20" href="#">
                      CrowdRIF
                    </a>
                    <form onSubmit={handleSubmit}>
                      <p className="text-center mb-30">Se connecter</p> 
                      <div className="form-group">
                        <input className="form-control" placeholder="Email" type="email" onChange={e => setUserName(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <input className="form-control" placeholder="Password" type="password"onChange={e => setPassword(e.target.value)} />
                          <div className="input-group-append">
                            <span className="input-group-text"><span className="feather-icon"><i data-feather="eye-off" /></span></span>
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-block" type="submit">Login</button>
                      <p className="text-center">Do have an account yet? <a href="">Sign Up</a></p>
                      {message && (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">

              {message }
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
             </div>)}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
  )
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
};