import React, { Component } from 'react';
import '../App.css';
import HeaderContainer from "./header/HeaderContainer";
import {Route, Switch} from 'react-router';
import DashboardContainer from "./dashboard/DashboardContainer";
import {withRouter} from "react-router-dom";
import PoliciesContainer from "./policies/PoliciesContainer";
import { connect } from "react-redux";

const mapStateToProps = state => ( { ...state.auth });

class App extends Component {

  render() {
    return (
            <div className="container-fluid">
                <HeaderContainer/>
                {/*<Header isAuthenticated={isAuthenticated} userData={userData} logout={userLogout} />*/}
                <Switch>
                    <Route path="/policies"  component={PoliciesContainer} />
                    <Route path="/" component={DashboardContainer} />

                    {/*<Route path="/blog-post/:id" component={BlogPostContainer}  />*/}
                    {/*<Route path="/register" component={RegistrationContainer} />*/}
                    {/*<Route path="/:page?" component={BlogPostListContainer} />*/}
                </Switch>
            </div>
    );
  }
}

export default connect(mapStateToProps,null)(App);
