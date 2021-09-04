import React, { Component } from 'react' 

  
export class UsersP extends Component {  
    render() {  
        return ( 
            <div className="hk-pg-wrapper">
            {/* Breadcrumb */}
            <nav className="hk-breadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-light bg-transparent">
                <li className="breadcrumb-item"><a href="#">Tables</a></li>
                <li className="breadcrumb-item active" aria-current="page">Basic Table</li>
              </ol>
            </nav>
            {/* /Breadcrumb */}
            {/* Container */}
            <div className="container">
              {/* Title */}
              <div className="hk-pg-header">
                <h4 className="hk-pg-title"><span className="pg-title-icon"><span className="feather-icon"><i data-feather="archive" /></span></span>Basic Tables</h4>
              </div>
              {/* /Title */}
              {/* Row */}
              <div className="row">
                <div className="col-xl-12">
                  <section className="hk-sec-wrapper">
                    <h5 className="hk-sec-title">Regular Table pending</h5>
                    <p className="mb-40">Add class <code>.table</code> in table tag.</p>
                    <div className="row">
                      <div className="col-sm">
                        <div className="table-wrap">
                          <div className="table-responsive">
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Username</th>
                                  <th>Role</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Jens</td>
                                  <td>Brincker</td>
                                  <td>Brincker123</td>
                                  <td><span className="badge badge-danger">admin</span> </td>
                                </tr>
                                <tr>
                                  <th scope="row">2</th>
                                  <td>Mark</td>
                                  <td>Hay</td>
                                  <td>Hay123</td>
                                  <td><span className="badge badge-info">member</span> </td>
                                </tr>
                                <tr>
                                  <th scope="row">3</th>
                                  <td>Anthony</td>
                                  <td>Davie</td>
                                  <td>Davie123</td>
                                  <td><span className="badge badge-warning">developer</span> </td>
                                </tr>
                                <tr>
                                  <th scope="row">4</th>
                                  <td>David</td>
                                  <td>Perry</td>
                                  <td>Perry123</td>
                                  <td><span className="badge badge-success">supporter</span> </td>
                                </tr>
                                <tr>
                                  <th scope="row">5</th>
                                  <td>Anthony</td>
                                  <td>Davie</td>
                                  <td>Davie123</td>
                                  <td><span className="badge badge-info">member</span> </td>
                                </tr>
                                <tr>
                                  <th scope="row">6</th>
                                  <td>Alan</td>
                                  <td>Gilchrist</td>
                                  <td>Gilchrist123</td>
                                  <td><span className="badge badge-success">supporter</span> </td>
                                </tr>
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

export default UsersP ;