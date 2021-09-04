import React, { Component } from 'react' 
import API from "../utiles/api";
import axios from 'axios';
import { withRouter } from 'react-router';

  
export class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
         name:'',
         user:[]
        };
        this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
      }
      componentDidMount() {
        
       axios
          .get('http://localhost:3000/user/user/'+this.props.match.params.id)
          .then(res => {
             //this.setState({...this.state, category: res.data.data})
            this.setState({
              name: res.data.data.username,
              user: res.data.data
            })
            console.log(res.data.data);
            
          })
          .catch(err => {
            console.log(err);
          })
      };
      onChange = e => {
   
        this.setState({name: e.target.value});
      };
    
      onSubmit = e => {
        e.preventDefault();
    
        const data = {
          name: this.state.name
        };
        console.log(data);
    
        axios
          .put('http://localhost:3000/categorie/update/'+this.props.match.params.id, data)
          .then(res => {
            //this.props.history.push('/edit-category/'+this.props.match.params.id);
            this.props.history.push('/dashboard');
          })
          .catch(err => {
            console.log(err);
          })
          
      };
    
    render() { 
        const userdetail = this.state.user;
        
        return ( 
<div className="hk-pg-wrapper">
        {/* Breadcrumb */}
        <nav className="hk-breadcrumb" aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-light bg-transparent">
            <li className="breadcrumb-item"><a href="#">Users</a></li>
            <li className="breadcrumb-item active" aria-current="page">Edit User</li>
          </ol>
        </nav>
        {/* /Breadcrumb */}
        {/* Container */}
        <div className="container">
          {/* Title */}
          <div className="hk-pg-header">
          </div>
          {/* /Title */}
          {/* Row */}
          <div className="row">
            <div className="col-xl-12">
              <section className="hk-sec-wrapper">
                <h5 className="hk-sec-title">Edit User</h5>
                <div className="row">
                  <div className="col-sm">
            
                    <form onSubmit={this.onSubmit}>
                      <div className="row">
                        <div className="col-md-12 form-group">
                          <label htmlFor="firstName">Name</label>
                          
                          <input className="form-control" id="name"type="text" value={this.state.name}
                   
                   onChange={this.onChange} /> 
            

                        </div>
                       
                      </div>
                <hr />
                      <button className="btn btn-primary" type="submit">Update</button>
                    </form>
              
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
    
    export default withRouter(UpdateUser) ;