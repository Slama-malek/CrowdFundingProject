
import React, { Component } from 'react' 
import API from "../utiles/api";
import axios from 'axios';
import { withRouter } from 'react-router';
import {
    Link
  } from "react-router-dom";

  
export class Register extends Component {
    constructor(props) {
        super(props);
        
    
        this.state = {
          categories: [],
          activePage: 1,
          message:"",
          messagedelete:""
        };
      }
      render() { 
       
   
        
        return ( 
<div className="hk-wrapper">
        {/* Main Content */}
        <div className="hk-pg-wrapper hk-auth-wrapper">
          <header className="d-flex justify-content-end align-items-center">
            <div className="btn-group btn-group-sm">
              <a href="#" className="btn btn-outline-secondary">Help</a>
              <a href="#" className="btn btn-outline-secondary">About Us</a>
            </div>
          </header>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 pa-0">
                <div className="auth-form-wrap pt-xl-0 pt-70">
                  <div className="auth-form w-xl-30 w-lg-55 w-sm-75 w-100">
                    <a className="auth-brand text-center d-block mb-20" href="#">
                      Marvin
                    </a>
                    <form>
                      <h1 className="display-4 mb-10 text-center">Sign up for free</h1>
                      <p className="mb-30 text-center">Create your account and start your free trial today</p>
                      <div className="form-row">
                        <div className="col-md-6 form-group">
                          <input className="form-control" placeholder="First name" defaultValue type="text" />
                        </div>
                        <div className="col-md-6 form-group">
                          <input className="form-control" placeholder="Last name" defaultValue type="text" />
                        </div>
                      </div>
                      <div className="form-group">
                        <input className="form-control" placeholder="Email" type="email" />
                      </div>
                      <div className="form-group">
                        <input className="form-control" placeholder="Password" type="password" />
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <input className="form-control" placeholder="Confirm Password" type="password" />
                          <div className="input-group-append">
                            <span className="input-group-text"><span className="feather-icon"><i data-feather="eye-off" /></span></span>
                          </div>
                        </div>
                      </div>
                      <div className="custom-control custom-checkbox mb-25">
                        <input className="custom-control-input" id="same-address" type="checkbox" defaultChecked />
                        <label className="custom-control-label font-14" htmlFor="same-address">I have read and agree to the <a href><u>term and conditions</u></a></label>
                      </div>
                      <button className="btn btn-primary btn-block" type="submit">Register</button>
                      <div className="option-sep">or</div>
                      <div className="form-row">
                        <div className="col-sm-6 mb-20">
                          <button className="btn btn-indigo btn-block btn-wth-icon"> <span className="icon-label"><i className="fa fa-facebook" /> </span><span className="btn-text">Login with facebook</span></button>
                        </div>
                        <div className="col-sm-6 mb-20">
                          <button className="btn btn-sky btn-block btn-wth-icon"> <span className="icon-label"><i className="fa fa-twitter" /> </span><span className="btn-text">Login with Twitter</span></button>
                        </div>
                      </div>
                      <p className="text-center">Already have an account? <a href="#">Sign In</a></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Main Content */}
      </div>
       )  
    }  
    }  
    
    export default withRouter(Register) ;