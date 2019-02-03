import React, {Component} from 'react';
import {connect} from "react-redux";
import {navChangePage} from "../../actions/actions";
import Policies from "./policies";
import Clients from "./clients";
import './dashboard.css';
import {dashboardLoadPolicies, dashboardSelectPolicy} from "../../actions/actionsDashboard";
import RightpanelContainer from "./rightpanelContainer";


const mapStateToProps = state => ({
    ...state.dashboard,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
    navChangePage,
    dashboardLoadPolicies,
    dashboardSelectPolicy
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

        const {dashboardLoadPolicies,dashboardSelectPolicy} =  this.props;

        return (
            <div className="mt-1">
                <div className="p-grid">
                    <div className="p-col-4">
                        <div className="p-grid">
                            <div className="p-col-12">
                                <Policies dashboardLoadPolicies={dashboardLoadPolicies}
                                          policies={this.props.policies}
                                          policiesLoading={this.props.policiesLoading}
                                          policiesAmount={this.props.policiesAmount}
                                          selectedPolicy={this.props.selectedPolicy}
                                          onSelectPolicy={dashboardSelectPolicy}
                                />
                            </div>
                            <div className="p-col-12">
                                <Clients clients={this.props.clients} clientsLoading={this.props.clientsLoading}/>
                            </div>
                        </div>
                    </div>
                    <div className="p-col-8">
                        <RightpanelContainer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DashboardContainer)
