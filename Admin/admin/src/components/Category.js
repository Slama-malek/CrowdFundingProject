import React, { Component } from 'react' 
import API from "../utiles/api";
import axios from 'axios';
import { withRouter } from 'react-router';
import {
    Link
  } from "react-router-dom";

  
export class Category extends Component {
    constructor(props) {
        super(props);
        
    
        this.state = {
          categories: [],
          activePage: 1,
          message:"",
          messagedelete:""
        };
      }
      handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }
      onDeleteClick (id) {
        var resultat = window.confirm("Êtes-vous sûr de vouloir supprimer?");
        if(resultat){
        axios
          .delete('http://localhost:3000/categorie/delete/'+id)
          .then(res => {
            const newliste = this.state.categories.filter(category => category._id !== id)
            this.setState({
                messagedelete: res.data.data,
                categories:newliste
                
              });
              this.props.history.push("/categories");
            console.log(res.data.data);
            
          })
          .catch(err => {
            console.log(err);
          })}
          
      };
     /* onUpdateClick (id) {
        

        this.props.history.push("/dashboard");
        console.log("hh");
      };*/
      componentDidMount() {
        API.getAllcategories()
      .then(response => {
        this.setState({
          categories: response.data
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

    render() { 
        const categories = this.state.categories;
        const message=this.state.message;
   
        
        return ( 
            <div className="hk-pg-wrapper">
            {/* Breadcrumb */}
            <nav className="hk-breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-light bg-transparent">
                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li className="breadcrumb-item active" aria-current="page">Categories</li>
              </ol>
            </nav>
            {/* /Breadcrumb */}
            {/* Container */}
            <div className="container">
              {/* Title */}
              <div className="hk-pg-header">
            
              <h4 class="hk-pg-title"><span class="pg-title-icon"><span class="feather-icon"><i data-feather="list"></i></span></span>Categories</h4>

              </div>
              {/* /Title */}
              {/* Row */}
              <div className="row">
                <div className="col-xl-12">
                <section className="hk-sec-wrapper">
                <div class="panel-heading text-right">
                <Link to={"/create-category"} class="btn btn-gradient-primary"><i class="fa fa-plus"></i>Create category</Link>
                    </div>
        <h5 className="hk-sec-title"></h5>
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
             
                <table className="table table-sm mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      
                      <th class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
               
                  {!message ?
              categories.map(category => 
              
                    <tr>
                      <td>{category.name}</td>
                      
                      <td class="text-right">
                      <Link to={`/edit-category/${category._id}`} class="btn btn-icon btn-info btn-icon-style-1"><span class="btn-icon-wrap"><i class="fa fa-pencil"></i></span></Link>
                      <button class="btn btn-icon btn-danger btn-icon-style-1"onClick={this.onDeleteClick.bind(this,category._id)}><span class="btn-icon-wrap"><i class="icon-trash"></i></span></button>
                      </td>
                    </tr>
    ) :
     <tr> <td><div class="alert alert-info" role="alert">
              Catégories non trouvées
             </div></td></tr>} 
                  
               </tbody>
                </table> 
              </div>
            </div>
          </div>
        </div>
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
                
                </div>
              </footer>
            </div>
            {/* /Footer */}
          </div>
 )  
}  
}  

export default withRouter(Category) ;