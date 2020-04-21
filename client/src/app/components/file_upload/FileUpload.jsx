import React, { Component } from 'react';
import { withAuthorization } from '../../Session';
import { compose } from 'recompose';

import { FileDrop } from 'react-file-drop';

export class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  fileUpload(file) {
    this.setState(file);
  }

  inputFileUpload(event) {
    event.persist();
    this.fileUpload(event.target.files)
  }
  
  render () {
    return (
      <div>
        <div className="card">
          <FileDrop
            // onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
            // onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
            // onFrameDrop={(event) => console.log('onFrameDrop', event)}
            // onDragOver={(event) => console.log('onDragOver', event)}
            // onDragLeave={(event) => console.log('onDragLeave', event)}
            onDrop={(files, event) => this.fileUpload(files)}
          >
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