import React, { Component } from 'react';

import {Tabs,TabLink,TabContent }from 'react-tabs-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Modal from "react-modal";

class Community extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      communities: [],
      commudetail:[],
      userdetail:[],
      adminnote:"",
      message:"",
      messagedelete:"",
      messagestatus:"",
      status:"",
     
      activeItemId:"", 
      
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = e => {
   
    this.setState({adminnote: e.target.value});
  };
  openModalWithItemApp(item) {
    this.setState({
      
       activeItemId: item,
       status: "Approved"
    })
    console.log(item);
 }
 openModalWithItemRej(item) {
    this.setState({
      
       activeItemId: item,
       status: "Rejected"
    })
    console.log(item);
 }
 onSubmit = e => {
    e.preventDefault();

    const data = {
      adminnote: this.state.adminnote,
      status:this.state.status
    };
    console.log(data);
    const id=this.state.activeItemId;
    console.log(id);
    axios
            .put('http://localhost:3000/Commu/status/'+id, data)
            .then(res => {
                this.setState({
                    messagestatus:"Community approved with success"
                    
                  });
               
                  this.props.history.push("/Communities");
                  window.location.reload();
            })
            .catch(err => {
              console.log(err);
            })
    
      
  };


  componentDidMount() {
    axios
    .get('http://localhost:3000/commu/allcommus')
  .then(response => {
    this.setState({
      communities: response.data.data

    });
    response.data.data.map(communitie =>console.log(communitie.userID.username))
    console.log(response.data.data.userID);
    
  
    

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
      .delete('http://localhost:3000/commu/delete/'+id)
      .then(res => {
        const newliste = this.state.communities.filter(community=> community._id !== id)
        this.setState({
            messagedelete: res.data.data,
            communities:newliste
            
          });
          this.props.history.push("/communities");
        console.log(res.data.data);
        
      })
      .catch(err => {
        console.log(err);
      })}
      
  };
 
  openModalWithItem(item) {
    /*this.setState({
      
       activeItemId: item,
       
    })*/
    console.log(item);
    axios
    .get('http://localhost:3000/commu/community/'+item)
  .then(response => {
    this.setState({
      commudetail: response.data.data,
      userdetail:response.data.data.userID
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
    
    const communities= this.state.communities;
  /*  communities.map(communit => 
        console.log(communit.userID._id));*/
    
    const message=this.state.message;
    const communitiesPending=communities.filter(community => community.status == "Pending")
    const communitiesApproved=communities.filter(community => community.status == "Approved")
    const communitiesRejected=communities.filter(community => community.status == "Rejected")
   
    return(
      <div className="hk-pg-wrapper">
        {/* Breadcrumb */}
        <nav className="hk-breadcrumb" aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-light bg-transparent">
            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
            <li className="breadcrumb-item active" aria-current="page">Communities</li>
          </ol>
        </nav>
        {/* /Breadcrumb */}
        {/* Container */}
        <div className="container">
          {/* Title */}
          <div className="hk-pg-header">
          <h4 class="hk-pg-title"><span class="pg-title-icon"><span class="feather-icon"><i data-feather="list"></i></span></span>Communities</h4>
          </div>
          
          <div className="row">
            <div className="col-xl-12">
              <section className="hk-sec-wrapper hk-gallery-wrap">
              <Tabs>
              
            
                                <TabLink to="tab1" >All</TabLink>
                                    
                                <TabLink to="tab2">Pending</TabLink>
                              
                                <TabLink to="tab3">Approved</TabLink>
                              
                                <TabLink to="tab4">Rejected</TabLink>
                                
                           
                <div className="tab-content">
                <TabContent for="tab1">
                    <h5 className="hk-sec-title">All Communities</h5>
                    {this.state.messagestatus && (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">

              {this.state.messagestatus }
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
                                  
                                  <th>Title</th>
                                  <th>Manager</th>
                                  <th>About</th>
                                  <th>Created At </th>
                                  <th>Status</th>
                                  <th>Action</th>
                                  
                                </tr>
                              </thead>
                              <tbody>
                              {!message ?
              communities.map(community => 
                                <tr>
                                  <td>{community.nom}</td>
                                  
                                  <td>{community.userID.username}</td>
                                
                                  <td>{community.description}</td>
                                  
                                  <td>{community.createdAt}</td>
                                 
                                  <td>{community.status === "Pending" ? (
    <span className="badge badge-warning">{community.status}</span>
) : community.status === "Approved" ? (
  <span className="badge badge-success">{community.status}</span>
)
:( <span className="badge badge-danger">{community.status}</span>)}</td>
                    
                                  
                      <td>
                        
                      <button class="btn btn-outline-light" onClick={() => this.openModalWithItem(community._id)} data-toggle="modal" data-target="#exampleModalPopovers"  ><span class="icon-label"><i class="fa fa-eye"></i> </span><span class="btn-text">View</span></button>

             <button class="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this,community._id)}><span class="icon-label"><i class="icon-trash"></i> </span><span class="btn-text">Delete</span></button>
                      
                     
                </td>   

                        
                                </tr>  ) :
     <tr> <div class="alert alert-danger" role="alert">
              Communities not found
             </div></tr>} 
                           </tbody>
                            </table>
                            <div class="modal fade" id="exampleModalPopovers" tabindex="-1" role="dialog" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Community Detail</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <h5>Manger</h5>
                                                    <p class="mt-10 mb-20">{this.state.userdetail.username}</p>
                                                  
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
                                  
                                <th>Title</th>
                                  <th>Manager</th>
                                  <th>About</th>
                                  <th>Created At </th>
                        
                               
                                </tr>
                              </thead>
                              <tbody>
                              {!message ?
              communitiesPending.map(community => 
                                <tr>
                                 <td>{community.nom}</td>
                                  <td>{community.userID.username}</td>
                                  <td>{community.description}</td>
                                  <td>{community.createdAt}</td>
                    
                                  
                      <td>
                        
                      <button class="btn btn-outline-info" onClick={() => this.openModalWithItemApp(community._id)} data-toggle="modal" data-target="#exampleModalForms"  ><span class="icon-label"><i class="icon-pencil"></i> </span><span class="btn-text">Approve</span></button>

             <button class="btn btn-outline-danger" onClick={() => this.openModalWithItemRej(community._id)} data-toggle="modal" data-target="#exampleModalForms"><span class="icon-label"><i class="icon-trash"></i> </span><span class="btn-text">Reject</span></button>
                
                </td>   

                        
                                </tr> 
                                                ) :
     <tr> <div class="alert alert-danger" role="alert">
              Communities not found
             </div></tr>} 

                           </tbody>
                            </table>
                            <div className="modal fade" id="exampleModalForms" tabIndex={-1} role="dialog" aria-labelledby="exampleModalForms" aria-hidden="true">
                                     <div className="modal-dialog" role="document">
                                       <div className="modal-content">
                                         <div className="modal-header">
                                           <h5 className="modal-title">Confirm Operation</h5>
                                           <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                             <span aria-hidden="true">×</span>
                                           </button>
                                         </div>
                                         <div className="modal-body">
                                         <form onSubmit={this.onSubmit}>
                                             <div className="form-group">
                                               <label htmlFor="exampleDropdownFormEmail1">Admin note</label>
                                               <input className="form-control" id="adminnote"type="text"
                   
                   onChange={this.onChange} />                                              </div>
                                           
                                             
                                             <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                                </div>
                                           </form>
                                         </div>
                                       </div>
                                     </div>
                                   </div> 
            
                          </div>
                        </div>
                      </div>
                    </div>
  </TabContent>
  <TabContent for="tab3">    
  <div className="row">
                      <div className="col-sm">
                        <div className="table-wrap">
                          <div className="table-responsive">
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  
                                <th>Title</th>
                                  <th>Manager</th>
                                  <th>About</th>
                                  <th>Created At </th>
                                 
                                 
                                </tr>
                              </thead>
                              <tbody>
                              {!message ?
              communitiesApproved.map(community => 
                <tr>
                 <td>{community.nom}</td>
                 <td>{community.userID.username}</td>
                  <td>{community.description}</td>
                  <td>{community.createdAt}</td>
                    
                                  
                      <td>
                        
                      <button class="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this,community._id)}><span class="icon-label"><i class="icon-trash"></i> </span><span class="btn-text">Delete</span></button>

                </td>   

                        
                                </tr>  ) :
     <tr> <div class="alert alert-danger" role="alert">
              Communities not found
             </div></tr>} 
                           </tbody>
                            </table>
                       </div>
                        </div>
                  
                      </div>

                    

                    </div>
                   
  </TabContent>
           
  <TabContent for="tab4">    
  <div className="row">
                      <div className="col-sm">
                        <div className="table-wrap">
                          <div className="table-responsive">
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  
                                <th>Title</th>
                                  <th>Manager</th>
                                  <th>About</th>
                                  <th>Created At </th>
                               
                                </tr>
                              </thead>
                              <tbody>
                              {!message ?
              communitiesRejected.map(community => 
                <tr>
                 <td>{community.nom}</td>
                  <td>{community.userID.username}</td>
                  <td>{community.description}</td>
                  <td>{community.createdAt}</td>
                    
                                  
                      <td>
                        
                      <button class="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this,community._id)}><span class="icon-label"><i class="icon-trash"></i> </span><span class="btn-text">Delete</span></button>
  
                     
                </td>   

                        
                                </tr>  ) :
     <tr> <div class="alert alert-danger" role="alert">
              Communities not found
             </div></tr>} 
                           </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div></TabContent>
          
           
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
    
    
export default withRouter(Community);
