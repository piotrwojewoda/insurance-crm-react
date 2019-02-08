import React, {Component} from 'react';
import {connect} from "react-redux";
import {navChangePage} from "../../actions/actions";
import Policies from "./policies";
import Clients from "./clients";
import {Growl} from 'primereact/growl';
import './dashboard.css';
import {
    dashboardLoadPolicies, dashboardSelectClient,
    dashboardSelectPolicy,
    dashboardSetPoliciesFirstPage
} from "../../actions/actionsDashboard";
import RightpanelContainer from "./rightpanelContainer";



const mapStateToProps = state => ({
    ...state.dashboard,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
    navChangePage,
    dashboardLoadPolicies,
    dashboardSelectPolicy,
    dashboardSetPoliciesFirstPage,
    dashboardSelectClient
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

        const {dashboardLoadPolicies,dashboardSelectPolicy,dashboardSelectClient ,selectedClient ,clients} =  this.props;

        return (
                <div className="row mt-2">
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12">
                                <Policies dashboardLoadPolicies={dashboardLoadPolicies}
                                          policies={this.props.policies}
                                          policiesLoading={this.props.policiesLoading}
                                          policiesAmount={this.props.policiesAmount}
                                          selectedPolicy={this.props.selectedPolicy}
                                          setPoliciesFirstPage={this.props.dashboardSetPoliciesFirstPage}
                                          policiesFirst={this.props.policiesFirstPage}
                                          onSelectPolicy={dashboardSelectPolicy}
                                />
                            </div>
                            <div className="col-md-12 mt-1">
                                <Clients clients={clients}
                                         clientsLoading={this.props.clientsLoading}
                                         dashboardSelectClient={dashboardSelectClient}
                                         selectedClient={clients.find( element => element && selectedClient && element['@id'] === selectedClient['@id']) }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <RightpanelContainer/>
                    </div>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DashboardContainer)
