import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';

export default class SideBar extends Component {
    render(){
        return (

<Router>
            <div>
        <nav className="navbar navbar-expand-xl navbar-light fixed-top hk-navbar">
          <a id="navbar_toggle_btn" className="navbar-toggle-btn nav-link-hover" href="javascript:void(0);"><span className="feather-icon"><i data-feather="menu" /></span></a>
          <a className="navbar-brand font-weight-700" href="dashboard1.html">
            Marvin
          </a>
          <ul className="navbar-nav hk-navbar-content">
            <li className="nav-item">
              <a id="navbar_search_btn" className="nav-link nav-link-hover" href="javascript:void(0);"><span className="feather-icon"><i data-feather="search" /></span></a>
            </li>
            <li className="nav-item">
              <a id="settings_toggle_btn" className="nav-link nav-link-hover" href="javascript:void(0);"><span className="feather-icon"><i data-feather="settings" /></span></a>
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
                    <span>Madelyn Shane<i className="zmdi zmdi-chevron-down" /></span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right" data-dropdown-in="flipInX" data-dropdown-out="flipOutX">
                <a className="dropdown-item" href="profile.html"><i className="dropdown-icon zmdi zmdi-account" /><span>Profile</span></a>
                <a className="dropdown-item" href="#"><i className="dropdown-icon zmdi zmdi-card" /><span>My balance</span></a>
                <a className="dropdown-item" href="inbox.html"><i className="dropdown-icon zmdi zmdi-email" /><span>Inbox</span></a>
                <a className="dropdown-item" href="#"><i className="dropdown-icon zmdi zmdi-settings" /><span>Settings</span></a>
                <div className="dropdown-divider" />
                <div className="sub-dropdown-menu show-on-hover">
                  <a href="#" className="dropdown-toggle dropdown-item no-caret"><i className="zmdi zmdi-check text-success" />Online</a>
                  <div className="dropdown-menu open-left-side">
                    <a className="dropdown-item" href="#"><i className="dropdown-icon zmdi zmdi-check text-success" /><span>Online</span></a>
                    <a className="dropdown-item" href="#"><i className="dropdown-icon zmdi zmdi-circle-o text-warning" /><span>Busy</span></a>
                    <a className="dropdown-item" href="#"><i className="dropdown-icon zmdi zmdi-minus-circle-outline text-danger" /><span>Offline</span></a>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#"><i className="dropdown-icon zmdi zmdi-power" /><span>Log out</span></a>
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
                  <a className="nav-link" href="javascript:void(0);" data-toggle="collapse" data-target="#dash_drp">
                    <span className="feather-icon"><i data-feather="activity" /></span>
                    <span className="nav-link-text">Dashboard</span>
                  </a>
               </li>
                <li className="nav-item">
                  <a className="nav-link link-with-badge" href="javascript:void(0);" data-toggle="collapse" data-target="#app_drp">
                    <span className="feather-icon"><i data-feather="package" /></span>
                    <span className="nav-link-text">Application</span>
                    <span className="badge badge-primary badge-pill">4</span>
                  </a>
                  <ul id="app_drp" className="nav flex-column collapse collapse-level-1">
                    <li className="nav-item">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                        <Link to={"/users"}>
                            Users  
                </Link>
                      
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="http://localhost:4002/users">Calendar</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="email.html">Email</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="file-manager.html">File Manager</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0);" data-toggle="collapse" data-target="#auth_drp">
                    <span className="feather-icon"><i data-feather="zap" /></span>
                    <span className="nav-link-text">Authentication</span>
                  </a>
                  <ul id="auth_drp" className="nav flex-column collapse collapse-level-1">
                    <li className="nav-item">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a className="nav-link" href="javascript:void(0);" data-toggle="collapse" data-target="#signup_drp">
                            Sign Up
                          </a>
                          <ul id="signup_drp" className="nav flex-column collapse collapse-level-2">
                            <li className="nav-item">
                              <ul className="nav flex-column">
                                <li className="nav-item">
                                  <a className="nav-link" href="signup.html">Cover</a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link" href="signup-simple.html">Simple</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="javascript:void(0);" data-toggle="collapse" data-target="#signin_drp">
                            Login
                          </a>
                          <ul id="signin_drp" className="nav flex-column collapse collapse-level-2">
                            <li className="nav-item">
                              <ul className="nav flex-column">
                                <li className="nav-item">
                                  <a className="nav-link" href="login.html">Cover</a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link" href="login-simple.html">Simple</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="javascript:void(0);" data-toggle="collapse" data-target="#recover_drp">
                            Recover Password
                          </a>
                          <ul id="recover_drp" className="nav flex-column collapse collapse-level-2">
                            <li className="nav-item">
                              <ul className="nav flex-column">
                                <li className="nav-item">
                                  <a className="nav-link" href="forgot-password.html">Forgot Password</a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link" href="reset-password.html">Reset Password</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="lock-screen.html">Lock Screen</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="404.html">Error 404</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="maintenance.html">Maintenance</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0);" data-toggle="collapse" data-target="#pages_drp">
                    <span className="feather-icon"><i data-feather="file-text" /></span>
                    <span className="nav-link-text">Pages</span>
                  </a>
                  <ul id="pages_drp" className="nav flex-column collapse collapse-level-1">
                    <li className="nav-item">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a className="nav-link" href="profile.html">Profile</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="invoice.html">Invoice</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="gallery.html">Gallery</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="activity.html">Activity</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="faq.html">Faq</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            
              
          </div>
          </div>
        </nav>
        <div id="hk_nav_backdrop" className="hk-nav-backdrop" />
      </div></Router>
        )}}