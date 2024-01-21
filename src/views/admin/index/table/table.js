function Table() {
  return (
    <div className="content-wraper content-wraper2">
      <div className="content-wraper-header d-lg-flex">
        <h2>Simple Tables</h2>
        <div className="d-flex content-wraper-header-cl2">
          <a href="">
            <p style={{ color: "#0A58CA" }}>Home</p>
          </a>
          <p>/</p>
          <p className="gray">Simple Tables</p>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="simple-triped">
            <div className="bordered-Table">
              <div className="bordered-Table-header">
                <p>Bordered Table</p>
              </div>

              <div className="bordered-Table-content">
                <div className="container-fluid">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Task</th>
                        <th>Progress</th>
                        <th>Label</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bordered">
                        <td>1.</td>
                        <td>Update software</td>
                        <td>
                          <div className="progress" style={{ height: "7px" }}>
                            <div
                              className="progress-bar"
                              style={{ width: "55%" }}
                            ></div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-danger">55%</span>
                        </td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>Clean database</td>
                        <td>
                          <div className="progress" style={{ height: "7px" }}>
                            <div
                              className="progress-bar bg-warning"
                              style={{ width: "70" }}
                            ></div>
                          </div>
                          <br />
                        </td>
                        <td>
                          <span className="badge bg-warning">70%</span>
                        </td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>Cron job running</td>
                        <td>
                          <div className="progress" style={{ height: "7px" }}>
                            <div
                              className="progress-bar"
                              style={{ width: "30%" }}
                            ></div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-primary">30%</span>
                        </td>
                      </tr>
                      <tr>
                        <td>4.</td>
                        <td>Fix and squish bugs</td>
                        <td>
                          <div className="progress" style={{ height: "7px" }}>
                            <div
                              className="progress-bar bg-success"
                              style={{ width: "90%" }}
                            ></div>
                          </div>
                          <br />
                        </td>
                        <td>
                          <span className="badge bg-success">90%</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <nav>
                  <ul className="d-flex">
                    <li>
                      <i className="fas fa-angle-double-left"></i>
                    </li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>
                      <i className="fas fa-angle-double-right"></i>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="condensed-Full-Width-Table">
              <div className="bordered-Table">
                <div className="bordered-Table-header">
                  <p>Condensed Full Width Table</p>
                </div>
                <div className="bordered-Table-content">
                  <div className="container-fluid">
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Task</th>
                          <th>Progress</th>
                          <th>Label</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="condensed">
                          <td>1.</td>
                          <td>Update software</td>
                          <td>
                            <div className="progress" style={{ height: "7px" }}>
                              <div
                                className="progress-bar"
                                style={{ width: "55%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-danger">55%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>2.</td>
                          <td>Clean database</td>
                          <td>
                            <div className="progress" style={{ height: "7px" }}>
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: "70" }}
                              ></div>
                            </div>
                            <br />
                          </td>
                          <td>
                            <span className="badge bg-warning">70%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>3.</td>
                          <td>Cron job running</td>
                          <td>
                            <div className="progress" style={{ height: "7px" }}>
                              <div
                                className="progress-bar"
                                style={{ width: "30%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-primary">30%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>4.</td>
                          <td>Fix and squish bugs</td>
                          <td>
                            <div className="progress" style={{ height: "7px" }}>
                              <div
                                className="progress-bar bg-success"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <br />
                          </td>
                          <td>
                            <span className="badge bg-success">90%</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="simple-Full-Width-Table">
              <div className="bordered-Table">
                <div className="bordered-Table-header d-flex">
                  <p>Simple Full Width Table</p>
                  <nav>
                    <ul className="d-flex">
                      <li>
                        <i className="fas fa-angle-double-left"></i>
                      </li>
                      <li>1</li>
                      <li>2</li>
                      <li>3</li>
                      <li>
                        <i className="fas fa-angle-double-right"></i>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="bordered-Table-content">
                  <div className="container-fluid">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Task</th>
                          <th>Progress</th>
                          <th>Label</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1.</td>
                          <td>Update software</td>
                          <td>
                            <div className="progress" style={{ height: "7px" }}>
                              <div
                                className="progress-bar"
                                style={{ width: "55%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-danger">55%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>2.</td>
                          <td>Clean database</td>
                          <td>
                            <div className="progress" style={{ height: "7px" }}>
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: "70" }}
                              ></div>
                            </div>
                            <br />
                          </td>
                          <td>
                            <span className="badge bg-warning">70%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>3.</td>
                          <td>Cron job running</td>
                          <td>
                            <div className="progress" style={{ height: "7px" }}>
                              <div
                                className="progress-bar"
                                style={{ width: "30%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-primary">30%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>4.</td>
                          <td>Fix and squish bugs</td>
                          <td>
                            <div className="progress" style={{ height: "7px" }}>
                              <div
                                className="progress-bar bg-success"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <br />
                          </td>
                          <td>
                            <span className="badge bg-success">90%</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="striped-Full-Width-Table">
              <div className="bordered-Table">
                <div className="bordered-Table-header">
                  <p>Striped Full Width Table</p>
                </div>
                <div className="bordered-Table-content">
                  <div className="container-fluid">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Task</th>
                          <th>Progress</th>
                          <th>Label</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1.</td>
                          <td>Update software</td>
                          <td>
                            <div className="progress" style={{ height: "7px" }}>
                              <div
                                className="progress-bar"
                                style={{ width: "55%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-danger">55%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>2.</td>
                          <td>Clean database</td>
                          <td>
                            <div className="progress" style={{ height: "7px" }}>
                              <div
                                className="progress-bar bg-warning"
                                style={{ width: "70" }}
                              ></div>
                            </div>
                            <br />
                          </td>
                          <td>
                            <span className="badge bg-warning">70%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>3.</td>
                          <td>Cron job running</td>
                          <td>
                            <div className="progress" style={{ height: "7px" }}>
                              <div
                                className="progress-bar"
                                style={{ width: "30%" }}
                              ></div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-primary">30%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>4.</td>
                          <td>Fix and squish bugs</td>
                          <td>
                            <div className="progress" style={{ height: "7px" }}>
                              <div
                                className="progress-bar bg-success"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <br />
                          </td>
                          <td>
                            <span className="badge bg-success">90%</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="responsive-Hover-Table">
            <div className="bordered-Table">
              <div className="bordered-Table-header d-flex">
                <p>Responsive Hover Table</p>
                <div className="search d-flex hidenText">
                  <div className="search-input col-9 hidenText">
                    <label htmlFor="search1">
                      <input
                        className="col-12"
                        type="text"
                        id="search1"
                        placeholder="Search"
                      />
                    </label>
                  </div>
                  <div className="search-icon col-3 hidenText">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
              <div className="bordered-Table-content table-responsive">
                <div className="container-fluid">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed-Header-Table">
            <div className="bordered-Table">
              <div className="bordered-Table-header d-flex">
                <p>Fixed Header Table</p>
                <div className="search d-flex hidenText">
                  <div className="search-input col-9 hidenText">
                    <label htmlFor="search2">
                      <input
                        className="col-12"
                        type="text"
                        id="search2"
                        placeholder="Search"
                      />
                    </label>
                  </div>
                  <div className="search-icon col-3 hidenText">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
              <div className="bordered-Table-content table-responsive">
                <div className="container-fluid">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="expandable-Table">
            <div className="bordered-Table">
              <div className="bordered-Table-header">
                <p>Expandable Table</p>
              </div>
              <div className="bordered-Table-content">
                <div className="container-fluid">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="5">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="5">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </td>
                      </tr>
                      <tr>
                        <td>183</td>
                        <td>John Doe</td>
                        <td>11-7-2014</td>
                        <td>Approved</td>
                        <td>
                          Bacon ipsum dolor sit amet salami venison chicken
                          flank fatback doner.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="expandable-Table-Tree">
            <div className="bordered-Table">
              <div className="bordered-Table-header">
                <p>Fixed Header Table</p>
              </div>
              <div className="bordered-Table-content table-responsive">
                <div className="container-fluid">
                  <table className="table table-hover">
                    <tbody>
                      <tr>
                        <td>183</td>
                      </tr>
                      <tr className="tree">
                        <td>
                          <i className="fas fa-caret-right"></i> 219
                        </td>
                      </tr>
                      <tr className="trees">
                        <td>
                          <div style={{ marginLeft: "1rem" }}>
                            <table className="table table-hover">
                              <tbody>
                                <tr className="tree">
                                  <td>
                                    <i className="fas fa-caret-right"></i> 219.1
                                  </td>
                                </tr>
                                <tr className="trees">
                                  <td>
                                    <div style={{ marginLeft: "1rem" }}>
                                      <table className="table table-hover">
                                        <tbody>
                                          <tr>
                                            <td>219.1.1</td>
                                          </tr>
                                          <tr>
                                            <td>219.1.2</td>
                                          </tr>
                                          <tr>
                                            <td>219.1.3</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="tree">
                                  <td>
                                    <i className="fas fa-caret-right"></i> 219.2
                                  </td>
                                </tr>
                                <tr className="trees">
                                  <td>
                                    <div style={{ marginLeft: "1rem" }}>
                                      <table className="table table-hover">
                                        <tbody>
                                          <tr>
                                            <td>219.2.1</td>
                                          </tr>
                                          <tr>
                                            <td>219.2.2</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>679</td>
                      </tr>
                      <tr>
                        <td>999</td>
                      </tr>
                      <tr>
                        <td>789</td>
                      </tr>
                      <tr>
                        <td>555</td>
                      </tr>
                      <tr>
                        <td>666</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Table;
