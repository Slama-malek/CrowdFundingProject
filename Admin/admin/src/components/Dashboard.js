import React, {Component} from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      users: [],
      projects: [],
      communities:[]
      
      
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
  });


  axios
  .get('http://localhost:3000/project/allprojects')
.then(response => {
  this.setState({
    projects: response.data.data
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
axios
    .get('http://localhost:3000/commu/allcommus')
  .then(response => {
    this.setState({
      communities: response.data.data
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
      const projectsPending=this.state.projects.filter(project => project.status == "Pending")
      const projectsApproved=this.state.projects.filter(project => project.status == "Approved")
      const projectsRejected=this.state.projects.filter(project => project.status == "Rejected")
      const projectsSucceeded=this.state.projects.filter(project => project.status == "Succeeded")
      const projectsFailed=this.state.projects.filter(project => project.status == "Failed")
      const investeurs=this.state.users.filter(user => user.role == "investisseur")
      const data ={
        labels:["Pending","Approved","Rejected","Succeeded","Failed"],
        datasets:[{
          label:"project",
          data:[projectsPending.length,projectsApproved.length,projectsRejected.length,projectsSucceeded.length,projectsFailed.length]
          ,backgroundColor:["yellow","green","red","blue","violet"] } ]
      }
      console.log(data);
        return (
<div className="hk-pg-wrapper">
{/* Container */}
<div className="container mt-xl-50 mt-sm-30 mt-15">
  {/* Title */}
  <div className="hk-pg-header align-items-top">
    <div>
      <h2 className="hk-pg-title font-weight-600 mb-10"> Dashboard</h2>
   
    </div>
  
  </div>
  {/* /Title */}
  {/* Row */}
  <div className="row">
    <div className="col-xl-12">
      <div className="hk-row">
        <div className="col-lg-12">
          <div className="hk-row">							
            <div className="col-sm-4">
              <div className="card card-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-5">
                    <div>
                      <span className="d-block font-15 text-dark font-weight-500">Users</span>
                    </div>
                    <div>
                     
                    </div>
                  </div>
                  <div>
                    <span className="d-block display-5 text-dark mb-5">{this.state.users.length}</span>
                  
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card card-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-5">
                    <div>
                      <span className="d-block font-15 text-dark font-weight-500">Projects</span>
                    </div>
                    <div>
                    </div>
                  </div>
                  <div>
                    <span className="d-block display-5 text-dark mb-5">{this.state.projects.length}</span>
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card card-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-5">
                    <div>
                      <span className="d-block font-15 text-dark font-weight-500">Communities</span>
                    </div>
                    <div>
                    </div>
                  </div>
                  <div>
                    <span className="d-block display-5 text-dark mb-5">{this.state.communities.length}</span>
                   
                  </div>
                </div>
              </div>
            </div>
   </div>
       <div className="card card-refresh">
        <div className="refresh-container">
          <div className="loader-pendulums" />
        </div>
        <div className="card-header card-header-action">
          <h6>project statistics</h6>
          <div className="d-flex align-items-center card-action-wrap">
           
         
          </div>
        </div>
        <div className="card-body">
        <Bar
	data={data}
  options={{ maintainAspectRatio: false }}

/>

        </div>
      </div>
    </div>
   </div>
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
      </div>
      
    </div>
  </footer>
</div>
{/* /Footer */}
</div> )}}