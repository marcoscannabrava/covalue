import React, { Component } from 'react';
import { withAuthorization } from '../../Session';
import { compose } from 'recompose';

import axios from 'axios';

import { FileDrop } from 'react-file-drop';

export class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  sendFile(file) {
    const data = new FormData();
    data.append('file', file);
    console.log(file);
    console.log('data uploaded', data)
    axios.post("http://localhost:8000/api/upload", data, { // receive two parameter endpoint url ,form data 
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