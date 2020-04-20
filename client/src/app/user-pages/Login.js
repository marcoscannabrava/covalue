import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

// const ERROR_CODE_ACCOUNT_EXISTS =
//   'auth/account-exists-with-different-credential';

// const ERROR_MSG_ACCOUNT_EXISTS = `
//   An account with an E-Mail address to
//   this social account already exists. Try to login from
//   this account instead and associate your social accounts on
//   your personal account page.
// `;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/covalue/marca_co_azul.png")} alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3" onSubmit={this.onSubmit}>
                  <Form.Group className="d-flex search-field">
                    <input
                      name="email"
                      className="h-auto form-control form-control-lg"
                      value={email}
                      onChange={this.onChange}
                      type="text"
                      placeholder="Email Address"
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <input
                      name="password"
                      className="h-auto form-control form-control-lg"
                      value={password}
                      onChange={this.onChange}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <button 
                      disabled={isInvalid}
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      type="submit">
                      SIGN IN
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <Link to={ROUTES.PASSWORD_FORGET} className="auth-link text-black">Forgot Password?</Link>
                    {/* <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a> */}
                  </div>

                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/signup" className="text-primary">Create</Link>
                  </div>
                  {error && <p>{error.message}</p>}
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>

    );
  }
}


export default compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

