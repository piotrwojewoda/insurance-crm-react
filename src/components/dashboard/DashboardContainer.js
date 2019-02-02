import React, {Component} from 'react';
import {connect} from "react-redux";
import {navChangePage} from "../../actions/actions";
import Policies from "./policies";
import Clients from "./clients";
import './dashboard.css';
import {dashboardLoadPolicies} from "../../actions/actionsDashboard";


const mapStateToProps = state => ({
    ...state.dashboard,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
    navChangePage,
    dashboardLoadPolicies
};

class DashboardContainer extends Component {

    constructor(props)
    {
        super(props);
        if (!this.props.isAuthenticated) {
            this.props.navChangePage('/login');
        }
    }

    render() {

        const {dashboardLoadPolicies} =  this.props;

        return (
            <div className="mt-1">
                <div className="p-grid">
                    <div className="p-col-6"><Policies dashboardLoadPolicies={dashboardLoadPolicies} policies={this.props.policies}/></div>
                    <div className="p-col-6">fff</div>
                    <div className="p-col-6"><Clients/></div>

                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DashboardContainer)
