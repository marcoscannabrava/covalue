import React from 'react';

function Alert(props) {
  let divClass = '';
  let iClass = '';
  if (props.type === 'success') {
    divClass = 'alert-success';
    iClass = 'glyphicon-ok';
  } else if (props.type === 'error') {
    divClass = 'alert-danger';
    iClass = 'glyphicon-exclamation-sign';
  }
  return (
    <div className="top-alert">
      <div className={`alert ${divClass} alert-dismissible fade show`} role="alert">
        <i className={`glyphicon ${iClass}`}></i> {props.msg}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
}

export default Alert;