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
import { Growl } from 'primereact/components/growl/Growl';
import {logout, removeMessages, userProfileFetch, userSetId, userSetToken} from "../actions/actions";
import {insurancesLoadValues, insuranciesLoadCategories, insuranciesLoadTypes} from "../actions/actionsInsurancies";

const mapStateToProps = state => ({
    ...state.auth,
    growlmessages: state.growlmessages
});

const mapDispatchToProps = {
    userProfileFetch,
    userSetId,
    userSetToken,
    logout,
    insuranciesLoadTypes,
    insuranciesLoadCategories,
    insurancesLoadValues,
    removeMessages
};

class App extends Component {

    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');
        if (token) {
            requests.setToken(token);
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.growlmessages.messages) {
            if (nextProps.growlmessages.messages.length > 0) {
                this.growl.show(nextProps.growlmessages.messages);
                this.props.removeMessages();
            }
        }
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('userId');
        const token = window.localStorage.getItem('jwtToken');
        this.props.insuranciesLoadTypes();
        this.props.insuranciesLoadCategories();
        this.props.insurancesLoadValues();
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
                <Growl ref={(el) => { this.growl = el; }} />
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
