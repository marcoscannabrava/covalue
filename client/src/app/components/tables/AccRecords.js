import React, { Component } from 'react'

import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' ? "http://localhost:8000" : "http://localhost:8080"

function AccRecordsTable(props) {
  if (props.records.length > 0) {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Accounting Records </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
              <li className="breadcrumb-item active" aria-current="page">Basic tables</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Table 08-05-2020</h4>
                {/* <p className="card-description"> Add className <code>.table-bordered</code></p> */}
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        {Object.keys(props.records[0]).map((key, i) => {
                          return (
                          <th key={i}>{key}</th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody>
                        {props.records.splice(0,100).map((record, i) => {
                          return (
                            <tr key={i+20}>
                            {Object.keys(record).map((key, i) => {
                              return (
                              <td key={i+40}>{record[key].toString()}</td>
                              )
                            })}
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="card card-statistics">
        <div className="card-body">
          <h3 className="font-weight-medium text-right mb-0 text-dark">No Accounting Records Table Uploaded</h3>
        </div>
      </div>
    )
  }
}

export class AccRecords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: []
    };
  }

  componentDidMount() {
    axios.get(API_URL+"/api/base")
    .then(res => {
      console.log('server response: ', res);
      this.setState({records: res.data.records});
    })
  }

  render() {
    return (
      <AccRecordsTable records={this.state.records} />
    )
  }
}

export default AccRecords
