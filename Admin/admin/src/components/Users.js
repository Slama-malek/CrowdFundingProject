import React, { Component } from 'react';

import {Tabs,TabLink,TabContent }from 'react-tabs-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';


class Users extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      users: [],
      userdetail:[],
      message:"",
      messagedelete:"",
      status:"",
      activeItemId:""
      
    };
  }
  componentDidMount() {
    axios
    .get('http://localhost:3000/user/allusers')
  .then(response => {
    this.setState({
      users: response.data.data
    });
    console.log(response.data);
  }
  ,
    error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.setState({
        message: resMessage
      });
    })
  .catch(e => {
    console.log(e);
  });}
  onDeleteClick (id) {
    var resultat = window.confirm("Êtes-vous sûr de vouloir supprimer?");
    if(resultat){
    axios
      .delete('http://localhost:3000/user/delete/'+id)
      .then(res => {
        const newliste = this.state.users.filter(user => user._id !== id)
        this.setState({
            messagedelete: res.data.data,
            users:newliste
            
          });
          this.props.history.push("/allusers");
        console.log(res.data.data);
        
      })
      .catch(err => {
        console.log(err);
      })}
      
  };
  onApproveClick (id) {
    const data = {
      status: "Approved"
    };
console.log(data)
    var resultat = window.confirm("Êtes-vous sûr de vouloir approver cet utilisateur?");
    if(resultat){
    axios
      .put('http://localhost:3000/user/updatestatus/'+id,data)
      .then(res => {
       
        this.setState({
            messagestatus: res.data.data,
            
            
          });
          this.props.history.push("/allusers");
        console.log(res.data.data);
        
      })
      .catch(err => {
        console.log(err);
      })}
      
  };
  openModalWithItem(item) {
    this.setState({
      
       activeItemId: item,
       
    })
    console.log(item);
    axios
    .get('http://localhost:3000/user/userdetail/'+item)
  .then(response => {
    this.setState({
      userdetail: response.data.data
    });
    console.log(response.data);
  }
  ,
    error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.setState({
        message: resMessage
      });
    })
  .catch(e => {
    console.log(e);
  });
 }
 
  render(){
    
    const users= this.state.users;
    
    const message=this.state.message;
    const usersPending=users.filter(user => user.status == "Pending")
    const usersActive=users.filter(user => user.status == "Active")
    return(
      <div className="hk-pg-wrapper">
        {/* Breadcrumb */}
        <nav className="hk-breadcrumb" aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-light bg-transparent">
            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
            <li className="breadcrumb-item active" aria-current="page">Users</li>
          </ol>
        </nav>
        {/* /Breadcrumb */}
        {/* Container */}
        <div className="container">
          {/* Title */}
          <div className="hk-pg-header">
          <h4 class="hk-pg-title"><span class="pg-title-icon"><span class="feather-icon"><i data-feather="users"></i></span></span>Users</h4>
          </div>
          {/* /Title */}
          {/* Row */}
          <div className="row">
            <div className="col-xl-12">
              <section className="hk-sec-wrapper hk-gallery-wrap">
              <Tabs>
            
                                <TabLink to="tab1" >All</TabLink>
                                    
                             
                              
                                <TabLink to="tab2">Pending</TabLink>
                              
                                <TabLink to="tab3">Active</TabLink>
                          
                           
                <div className="tab-content">
                <TabContent for="tab1"><h5 className="hk-sec-title">All Users</h5>
                {this.state.messagedelete && (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">

              {this.state.messagedelete }
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
             </div>)}
                    <div className="row">
                      <div className="col-sm">
                        <div className="table-wrap">
                          <div className="table-responsive">
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  
                                  <th>Username</th>
                                  <th>Email</th>
                                  <th>Status</th>
                                  <th>Role</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                              {!message ?
              users.map(user => 
                                <tr>
                                  <td>{user.username}</td>
                                  <td>{user.email}</td>
                                  <td>{user.status}</td>
                                  <td>{user.role === "admin" ? (
    <span className="badge badge-danger">{user.role}</span>
) : user.role === "manager" ? (
  <span className="badge badge-info">{user.role}</span>
) : user.role === "user" ?(
  <span className="badge badge-warning">{user.role}</span>
):( <span className="badge badge-success">{user.role}</span>)}</td>
                                  
                      <td>
                      <button class="btn btn-outline-light" onClick={() => this.openModalWithItem(user._id)} data-toggle="modal" data-target="#exampleModalPopovers"  ><span class="icon-label"><i class="fa fa-eye"></i> </span><span class="btn-text">View</span></button>

                        
            <Link to={`/edit-user/${user._id}`} class="btn btn-outline-info" ><span class="icon-label"><i class="icon-pencil"></i> </span><span class="btn-text">Update</span></Link>

             <button class="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this,user._id)}><span class="icon-label"><i class="icon-trash"></i> </span><span class="btn-text">Delete</span></button>
                      
                     
                </td>   

                        
                                </tr>  ) :
     <tr> <div class="alert alert-danger" role="alert">
              users not found
             </div></tr>} 
                           </tbody>
                            </table>
                            <div class="modal fade" id="exampleModalPopovers" tabindex="-1" role="dialog" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">User Detail</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <h5>Username</h5>
                                                    <p class="mt-10 mb-20">{this.state.userdetail.username}</p>
                                                    <h5>Bio</h5>
                                                    <p>{this.state.userdetail.bio} </p>
                                                    <h5>Profession</h5>
                                                    <p>{this.state.userdetail.profession} </p>
                                                    <h5>Mobile phone</h5>
                                                    <p>{this.state.userdetail.telephone} </p>
                                                    <h5>Facebook link</h5>
                                                    <p>{this.state.userdetail.facebook_link} </p>
                                                    <h5>Twitter link</h5>
                                                    <p>{this.state.userdetail.twiter_link} </p>
                                                    <h5>Linkedin link</h5>
                                                    <p>{this.state.userdetail.linkedin_link} </p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                          
                          </div>
                        </div>
                      </div>
                    </div></TabContent>
  <TabContent for="tab2">                  
    <div className="row">
                      <div className="col-sm">
                        <div className="table-wrap">
                          <div className="table-responsive">
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  
                                  <th>Username</th>
                                  <th>Email</th>
                                  <th>Status</th>
                                  <th>Role</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                              {!message ?
              usersPending.map(user => 
                                <tr>
                                  <td>{user.username}</td>
                                  <td>{user.email}</td>
                                  <td>{user.status}</td>
                                  <td>{user.role === "admin" ? (
    <span className="badge badge-danger">{user.role}</span>
) : user.role === "manager" ? (
  <span className="badge badge-info">{user.role}</span>
) : user.role === "user" ?(
  <span className="badge badge-warning">{user.role}</span>
):( <span className="badge badge-success">{user.role}</span>)}</td>
                            
                            <td>
                            <button class="btn btn-outline-light" onClick={() => this.openModalWithItemApp(user._id)} data-toggle="modal" data-target="#exampleModalForms"  ><span class="icon-label"><i class="fa fa-eye"></i> </span><span class="btn-text">View</span></button>


                            <button class="btn btn-outline-info" onClick={this.onApproveClick.bind(this,user._id)}><span class="icon-label"><i class="icon-pencil"></i> </span><span class="btn-text">Approve</span></button>
            
                         <button class="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this,user._id)}><span class="icon-label"><i class="icon-trash"></i> </span><span class="btn-text">Delete</span></button>
                                  
                                 
                            </td>                        
                                </tr>  ) :
     <tr> <div class="alert alert-danger" role="alert">
              users not found
             </div></tr>} 
                           </tbody>
                            </table>
                       
                          </div>
                        </div>
                      </div>
                    </div>
  </TabContent>
  <TabContent for="tab3">    <div className="row">
                      <div className="col-sm">
                        <div className="table-wrap">
                          <div className="table-responsive">
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  
                                  <th>Username</th>
                                  <th>Email</th>
                                  <th>Status</th>
                                  <th>Role</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                              {!message ?
              usersActive.map(user => 
                                <tr>
                                  <td>{user.username}</td>
                                  <td>{user.email}</td>
                                  <td>{user.status}</td>
                                  <td>{user.role === "admin" ? (
    <span className="badge badge-danger">{user.role}</span>
) : user.role === "manager" ? (
  <span className="badge badge-info">{user.role}</span>
) : user.role === "user" ?(
  <span className="badge badge-warning">{user.role}</span>
):( <span className="badge badge-success">{user.role}</span>)}</td>
               <td>
                        
                        <Link to={`/edit-user/${user._id}`} class="btn btn-outline-info" ><span class="icon-label"><i class="icon-pencil"></i> </span><span class="btn-text">Update</span></Link>
            
                         <button class="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this,user._id)}><span class="icon-label"><i class="icon-trash"></i> </span><span class="btn-text">Delete</span></button>
                                  
                                 
                            </td>                              
                                
                                </tr>  ) :
     <tr> <div class="alert alert-danger" role="alert">
              users not found
             </div></tr>} 
            
                           </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
  </TabContent>
            </div>
            </Tabs>
              </section>
            </div>
          </div>
          {/* /Row */}
        </div>
        {/* /Container */}
        {/* Footer */}
        <div className="hk-footer-wrap container">
          <footer className="footer">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <p>Pampered by<a href="https://hencework.com/" className="text-dark" target="_blank">Hencework</a> © 2019</p>
              </div>
              <div className="col-md-6 col-sm-12">
                <p className="d-inline-block">Follow us</p>
                <a href="#" className="d-inline-block btn btn-icon btn-icon-only btn-indigo btn-icon-style-4"><span className="btn-icon-wrap"><i className="fa fa-facebook" /></span></a>
                <a href="#" className="d-inline-block btn btn-icon btn-icon-only btn-indigo btn-icon-style-4"><span className="btn-icon-wrap"><i className="fa fa-twitter" /></span></a>
                <a href="#" className="d-inline-block btn btn-icon btn-icon-only btn-indigo btn-icon-style-4"><span className="btn-icon-wrap"><i className="fa fa-google-plus" /></span></a>
              </div>
            </div>
          </footer>
        </div>
        {/* /Footer */}
      </div>
    )
  }
}
    
    
export default withRouter( Users);
