import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';

import axios from 'axios';

export class BasicTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [{}]
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/base")
    .then(res => {
      console.log(res);
      this.setState({records: res.data.records});
    })
  }

  render() {
    console.log('state', this.state.records)
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Accouting Records </h3>
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
                        {Object.keys(this.state.records[0]).map((key, i) => {
                          return (
                          <th key={i}>{key}</th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.records.splice(0,100).map((record, i) => {
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
  }
}

export default BasicTable
