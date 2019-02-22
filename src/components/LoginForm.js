import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {renderField} from "../form";
import {connect} from "react-redux";
import {navChangePage, navResetTab, userLoginAttempt} from "../actions/actions";
import {ProgressSpinner} from 'primereact/progressspinner';

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
  userLoginAttempt,
    navChangePage,
    navResetTab
};

class LoginForm extends Component {

    constructor(props)
    {
        super(props);
        this.props.navResetTab();                           // Resetting navbar position;
        if(this.props.isAuthenticated) {
         this.props.navChangePage('/');
        }
    }

  componentDidUpdate(prevProps) {
      if (prevProps.token !== this.props.token || this.props.isAuthenticated) {
          this.props.navChangePage('/');
      }
  }

    onSubmit = (values) => {
      return this.props.userLoginAttempt(
        values.username,
          values.password
      );
  };
  render() {
    const {handleSubmit, error, spinner} = this.props;
    return (
        <div>
        <section id="cover">
            <div id="cover-caption">
                <div id="container" className="container">
                    <div className="row">
                        <div className="col-sm-10 offset-sm-1 text-center">
                            <h3 className="display-3">Login into Application</h3>
                            <div className="info-form">
          { error && <div className="alert alert-danger">{error}</div> }
        <form className="mt-4"  onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="username" label="Username"  type="text" component={renderField} />
        <Field name="password" label="Password" type="password" component={renderField} />
        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={spinner}>Log In</button>
            <div className="mt-5"><strong>Login data:</strong></div>
            <div className="mt-5">Username: <strong> admin </strong></div>
            <div className="mt-1">Password: <strong> Admin123!@# </strong></div>
        </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            { spinner && (<div className="text-center mt-5">
                <ProgressSpinner style={{width: '100px', height: '100px'}} strokeWidth="8"  animationDuration=".8s"/>
            </div>)}
            </div>
    );
  }
}

export default reduxForm({
  form: 'LoginForm'
})(connect(mapStateToProps,mapDispatchToProps)(LoginForm));
