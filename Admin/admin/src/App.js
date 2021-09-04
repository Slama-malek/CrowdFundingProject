import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Projects from './components/Projects/Projects';
import Communities from './components/Community/Community';

import Category from './components/Category';
import Updatecategory from './components/Updatecategory';
import UpdateUser from './components/UpadateUser';
import Createcategory from './components/Createcategory';
import Login from './components/Login';
import Register from './components/Register';
import API from "./utiles/api";
function App() {
  const [token, setToken] = useState();

  if(!API.getCurrentUser()) {
    return <Login setToken={setToken} /> 
    
    
  


  }
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/
      <div class="hk-wrapper hk-vertical-nav">
        
        <BrowserRouter>
        <div>
        <nav className="navbar navbar-expand-xl navbar-light fixed-top hk-navbar">
          <a id="navbar_toggle_btn" className="navbar-toggle-btn nav-link-hover" href="javascript:void(0);"><span className="feather-icon"><i data-feather="menu" /></span></a>
          <a className="navbar-brand font-weight-700" href="dashboard1.html">
            CrowdRIF
          </a>
          <ul className="navbar-nav hk-navbar-content">
            <li className="nav-item">
              <a id="navbar_search_btn" className="nav-link nav-link-hover" href="javascript:void(0);"><span className="feather-icon"><i data-feather="search" /></span></a>
            </li>
          
            <li className="nav-item dropdown dropdown-notifications">
              <a className="nav-link dropdown-toggle no-caret" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="feather-icon"><i data-feather="bell" /></span><span className="badge-wrap"><span className="badge badge-primary badge-indicator badge-indicator-sm badge-pill pulse" /></span></a>
              <div className="dropdown-menu dropdown-menu-right" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
                <h6 className="dropdown-header">Notifications <a href="javascript:void(0);" className>View all</a></h6>
                <div className="notifications-nicescroll-bar">
                  <a href="javascript:void(0);" className="dropdown-item">
                    <div className="media">
                      <div className="media-img-wrap">
                        <div className="avatar avatar-sm">
                          <img src="dist/img/avatar1.jpg" alt="user" className="avatar-img rounded-circle" />
                        </div>
                      </div>
                      <div className="media-body">
                        <div>
                          <div className="notifications-text"><span className="text-dark text-capitalize">Evie Ono</span> accepted your invitation to join the team</div>
                          <div className="notifications-time">12m</div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="javascript:void(0);" className="dropdown-item">
                    <div className="media">
                      <div className="media-img-wrap">
                        <div className="avatar avatar-sm">
                          <img src="dist/img/avatar2.jpg" alt="user" className="avatar-img rounded-circle" />
                        </div>
                      </div>
                      <div className="media-body">
                        <div>
                          <div className="notifications-text">New message received from <span className="text-dark text-capitalize">Misuko Heid</span></div>
                          <div className="notifications-time">1h</div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="javascript:void(0);" className="dropdown-item">
                    <div className="media">
                      <div className="media-img-wrap">
                        <div className="avatar avatar-sm">
                          <span className="avatar-text avatar-text-primary rounded-circle">
                            <span className="initial-wrap"><span><i className="zmdi zmdi-account font-18" /></span></span>
                          </span>
                        </div>
                      </div>
                      <div className="media-body">
                        <div>
                          <div className="notifications-text">You have a follow up with<span className="text-dark text-capitalize"> Marvin head</span> on <span className="text-dark text-capitalize">friday, dec 19</span> at <span className="text-dark">10.00 am</span></div>
                          <div className="notifications-time">2d</div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="javascript:void(0);" className="dropdown-item">
                    <div className="media">
                      <div className="media-img-wrap">
                        <div className="avatar avatar-sm">
                          <span className="avatar-text avatar-text-success rounded-circle">
                            <span className="initial-wrap"><span>A</span></span>
                          </span>
                        </div>
                      </div>
                      <div className="media-body">
                        <div>
                          <div className="notifications-text">Application of <span className="text-dark text-capitalize">Sarah Williams</span> is waiting for your approval</div>
                          <div className="notifications-time">1w</div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="javascript:void(0);" className="dropdown-item">
                    <div className="media">
                      <div className="media-img-wrap">
                        <div className="avatar avatar-sm">
                          <span className="avatar-text avatar-text-warning rounded-circle">
                            <span className="initial-wrap"><span><i className="zmdi zmdi-notifications font-18" /></span></span>
                          </span>
                        </div>
                      </div>
                      <div className="media-body">
                        <div>
                          <div className="notifications-text">Last 2 days left for the project</div>
                          <div className="notifications-time">15d</div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </li>
            
            
            <li className="nav-item dropdown dropdown-authentication">
              <a className="nav-link dropdown-toggle no-caret" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="media">
                  <div className="media-img-wrap">
                    <div className="avatar">
                      <img src="dist/img/avatar12.jpg" alt="user" className="avatar-img rounded-circle" />
                    </div>
                    <span className="badge badge-success badge-indicator" />
                  </div>
                  <div className="media-body">
                    <span>{API.getCurrentUser().data.username}<i className="zmdi zmdi-chevron-down" /></span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right" data-dropdown-in="flipInX" data-dropdown-out="flipOutX">
                <a className="dropdown-item" href="profile.html"><i className="dropdown-icon zmdi zmdi-account" /><span>Profile</span></a>
                <div className="dropdown-divider" />
               
               
                <a  className="dropdown-item" href="/login" onClick={API.logout}>
                <i className="dropdown-icon zmdi zmdi-power" /><span>Log out</span>
                </a>
              </div>
            </li>
          </ul>
        </nav>
        <form role="search" className="navbar-search">
          <div className="position-relative">
            <a href="javascript:void(0);" className="navbar-search-icon"><span className="feather-icon"><i data-feather="search" /></span></a>
            <input type="text" name="example-input1-group2" className="form-control" placeholder="Type here to Search" />
            <a id="navbar_search_close" className="navbar-search-close" href="#"><span className="feather-icon"><i data-feather="x" /></span></a>
          </div>
        </form>
        {/* /Top Navbar */}
        {/* Vertical Nav */}
        <nav className="hk-nav hk-nav-dark">
          <a href="javascript:void(0);" id="hk_nav_close" className="hk-nav-close"><span className="feather-icon"><i data-feather="x" /></span></a>
          <div className="nicescroll-bar">
            <div className="navbar-nav-wrap">
              <ul className="navbar-nav flex-column">
                <li className="nav-item active">
                <Link to={"/dashboard"} className="nav-link">
                    <span className="feather-icon"><i data-feather="home"/></span>
                    <span className="nav-link-text">Dashboard</span>
                  </Link>
               </li>
                <li className="nav-item">
                <Link to={"/allusers"} className="nav-link">            
                        <span className="feather-icon"><i data-feather="users" /></span>
                    <span className="nav-link-text">Users</span>
                    
                    
                  </Link>
              </li>
                <li className="nav-item">
                  <Link to={"/categories"} className="nav-link">
                  <span className="feather-icon"><i data-feather="list"/></span>
                    <span className="nav-link-text">Categories</span>
                    </Link>
               </li>
               <li className="nav-item">
                  <Link to={"/projects"} className="nav-link">
                  <span className="feather-icon"><i data-feather="list"/></span>
                    <span className="nav-link-text">Projects</span>
                    </Link>
               </li>
               <li className="nav-item">
                  <Link to={"/communities"} className="nav-link">
                  <span className="feather-icon"><i data-feather="list"/></span>
                    <span className="nav-link-text">Communities</span>
                    </Link>
               </li>
               
               
               </ul>
            
              
          </div>
          </div>
        </nav>
        <div id="hk_nav_backdrop" className="hk-nav-backdrop" />
      </div>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/allusers">
            <Users />
            
          </Route>
          
          
          <Route path="/categories">
            <Category />
            
          </Route>
          <Route path="/edit-category/:id">
            <Updatecategory />
            
            
          </Route>
          <Route path="/create-category">
            <Createcategory />
            
          </Route>
            
          <Route path="/edit-user/:id">
            <UpdateUser />
            
            
          </Route>
          <Route path="/projects">
            <Projects />
            
            
          </Route>
          <Route path="/communities">
            <Communities />
            </Route>
         
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
