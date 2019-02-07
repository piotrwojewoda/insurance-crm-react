import React, {Component} from 'react';
import '../App.css';
import HeaderContainer from "./header/HeaderContainer";
import {Route, Switch} from 'react-router';
import DashboardContainer from "./dashboard/DashboardContainer";
import PoliciesContainer from "./policies/PoliciesContainer";
import {connect} from "react-redux";
import LoginForm from "./LoginForm";
import {withRouter} from "react-router-dom";
import {requests} from "../agent";
import {logout, userProfileFetch, userSetId, userSetToken} from "../actions/actions";
import {insuranciesLoadCategories, insuranciesLoadTypes} from "../actions/actionsInsurancies";

const mapStateToProps = state => ({...state.auth});

const mapDispatchToProps = {
    userProfileFetch,
    userSetId,
    userSetToken,
    logout,
    insuranciesLoadTypes,
    insuranciesLoadCategories
}

class App extends Component {

    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');
        if (token) {
            requests.setToken(token);
        }
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('userId');
        const token = window.localStorage.getItem('jwtToken');
        this.props.insuranciesLoadTypes();
        this.props.insuranciesLoadCategories();
        const {userSetId, userSetToken} = this.props;
        if (userId && token) {
            userSetId(userId);
            userSetToken(token);
        }
    }

    render() {
        const {isAuthenticated, userData, logout} = this.props;
        return (
            <div className="container-fluid">
                <HeaderContainer isAuthenticated={isAuthenticated} logout={logout} userData={userData}/>

                <Switch>
                    <Route path="/login" component={withRouter(LoginForm)}/>
                    <Route path="/policies" component={PoliciesContainer}/>
                    <Route path="/" component={DashboardContainer}/>
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
