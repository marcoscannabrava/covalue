import React, { Component } from 'react';
import { withAuthorization } from '../../Session';
import { compose } from 'recompose';

import axios from 'axios';

import { FileDrop } from 'react-file-drop';
import { Alert } from 'react-bootstrap';
import Spinner from '../../shared/Spinner';

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      file: null,
      loader: false,
      response: null,
      responseMsg: ''
    };
  }
  
  sendFile = (file) => {
    const data = new FormData();
    data.append('file', file);
    axios.post("/api/upload", data, {
      }).then(res => {
        let msg = '';
        let response = '';
        if (res.data.response === 'success') {
          response = 'success'
          msg = 'File Uploaded!';
        } else {
          response = 'danger'
          msg = 'Server Error.' 
        }
        this.setState({loader: false, response: response, responseMsg: msg});
      })
  }

  fileUpload = (files, event=null) => {
    if (event) { event.preventDefault() }
    let ext = /(?:\.([^.]+))?$/.exec(files[0].name)[1];
    if (['xls', 'xlsx', 'xlsm', 'xlsb', 'ods', 'csv', 'txt'].includes(ext)) {
      this.setState({file: files[0], loader: true});
      this.sendFile(files[0]);
    } else {
      this.setState({response: 'danger', responseMsg: 'File extension was wrong. Only Excel filetypes accepted.'});
    } 
  }

  inputFileUpload = (event) => {
    event.persist();
    this.fileUpload(event.target.files)
  }

  render() {
    if (this.state.loader) {
      return <Spinner />
    } else {
      if (this.state.response) {
        setTimeout( function() {
          this.setState({response: null, responseMsg: ''})
        }.bind(this), 3000);
        return <Alert variant={this.state.response}>{this.state.responseMsg}</Alert>
      }
      return (
        <div>
          <div className="card">
            <FileDrop onDrop={this.fileUpload}>
              Drop your Excel Sheet here.
              <label htmlFor="file" className="btn-upload">
                <input type="file" className="file-input" id="file" onChange={this.inputFileUpload}/>
                <i className="fa fa-cloud-upload"></i> or choose a file 
              </label>
            </FileDrop>
          </div>
        </div> 
      );
    }
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition)
)(FileUpload);