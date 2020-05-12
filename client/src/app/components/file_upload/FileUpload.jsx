import React, { Component } from 'react';
import { withAuthorization } from '../../Session';
import { compose } from 'recompose';

import axios from 'axios';

import { FileDrop } from 'react-file-drop';

const API_URL = process.env.NODE_ENV === 'development' ? "http://localhost:8000" : "http://localhost:8080"

export class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  sendFile(file) {
    const data = new FormData();
    data.append('file', file);
    axios.post(API_URL+"/api/upload", data, { // receive two parameter endpoint url ,form data 
      }).then(res => { // then print response status
        console.log(res)
      })
  }

  fileUpload(file) {
    this.setState(file);
    this.sendFile(file[0]);
  }

  inputFileUpload(event) {
    event.persist();
    this.fileUpload(event.target.files)
  }

  render () {
    return (
      <div>
        <div className="card">
          <FileDrop onDrop={(files, event) => this.fileUpload(files)}>
            Drop your Excel Sheet here.
            <label htmlFor="file" className="btn-upload">
              <input type="file" className="file-input" id="file" onChange={(event) => this.inputFileUpload(event)}/>
              <i className="fa fa-cloud-upload"></i> or choose a file 
            </label>
          </FileDrop>
        </div>
      </div> 
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition)
)(FileUpload);