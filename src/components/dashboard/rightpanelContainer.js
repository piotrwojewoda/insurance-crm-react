import React, {Component} from 'react';
import {Toolbar} from 'primereact/toolbar';
import {Button} from "primereact/button";
import CompanyPanel from "./companyPanel/CompanyPanel";
import PolicyPanel from "./PolicyPanel/PolicyPanel";
import {Dialog} from "primereact/dialog";
import NewPolicyDialog from "./NewPolicyDialog/NewPolicyDialog";
import NewClientDialog from "./NewClientDialog/NewClientDialog";
import {connect} from "react-redux";


import {
    startRemoveSelectedClient,
    dashboardSelectPolicy,
    startRemoveSelectedPolicy, dashboardLoadPolicies
} from "../../actions/actionsDashboard";

const mapStateToProps = state => ({
    ...state.dashboard,
    isAuthenticated: state.auth.isAuthenticated
});
const mapDispatchToProps = {
    startRemoveSelectedClient,
    startRemoveSelectedPolicy,
    dashboardSelectPolicy,
    dashboardLoadPolicies
};
class RightpanelContainer extends Component { // TODO split component to smaller components

    constructor(props) {
        super(props);
        this.state = {
            newPolicyDialogVisible: false,
            newClientDialogVisible: false,
            removeClientDialogVisible: false,
            removePolicyDialogVisible: false
        };
    }

    onClickRemoveSelectedPolicy = (event)  => {
        this.props.startRemoveSelectedPolicy(this.props.selectedPolicy);
        this.props.dashboardLoadPolicies();
        this.setState({removePolicyDialogVisible: false});
    };

    onHideRemovePolicyDialog = (event) => {
        this.setState({removeClientDialogVisible: false});
    };

    onClickRemoveSelectedClient = (event)  => {         // TODO handle if delete operation was failed ( move growl triggering to redux ) ;
        this.props.startRemoveSelectedClient(this.props.selectedClient);
        this.props.dashboardSelectPolicy({ value: this.props.selectedPolicy });
        this.setState({removeClientDialogVisible: false});
    };

    onHideRemoveClientDialog = (event) => {
        this.setState({removeClientDialogVisible: false});
    };

    render() {
        const removeClientFooter = (
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={this.onClickRemoveSelectedClient} />
                <Button label="No" icon="pi pi-times" onClick={this.onHideRemoveClientDialog} className="p-button-secondary" />
            </div>
        );
        const removePolicyFooter = (
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={this.onClickRemoveSelectedPolicy} />
                <Button label="No" icon="pi pi-times" onClick={this.onHideRemovePolicyDialog} className="p-button-secondary" />
            </div>
        );

        const { selectedPolicy, selectedClient, clientsLoading, policyInsuranceDetails} = this.props;

        return (
            <div>
                <Toolbar>
                    <div className="p-toolbar-group-right">
                        <Button label="Add a new policy"
                                icon="pi pi-plus"
                                style={{marginRight: '.25em'}}
                                onClick={() => this.setState({newPolicyDialogVisible: true})}
                        />
                        { selectedPolicy && (<Button label="Remove selected policy"
                                className="p-button-danger"
                                icon="pi pi-plus"
                                style={{marginRight: '.25em'}}
                                onClick={() => this.setState({removePolicyDialogVisible: true})}
                                                     disabled={clientsLoading === true ? 'disabled' : ''}
                        />) }
                        { selectedPolicy && (<Button label="Add a new client"
                                className="p-button-success"
                                icon="pi pi-plus"
                                style={{marginRight: '.25em'}}
                                onClick={() => this.setState({newClientDialogVisible: true})}
                                disabled={clientsLoading === true ? 'disabled' : ''}
                        /> )}
                        { selectedClient && (<Button label="Remove selected client"
                                className="p-button-danger"
                                icon="pi pi-plus"
                                style={{marginRight: '.25em'}}
                                onClick={() => this.setState({removeClientDialogVisible: true})}
                                                     disabled={policyInsuranceDetails === true ? 'disabled' : ''}
                        />) }
                    </div>
                </Toolbar>
                <CompanyPanel/>
                <PolicyPanel/>
                <Dialog header="Add a new policy"
                        visible={this.state.newPolicyDialogVisible}
                        style={{width: '60vw'}}
                        modal={true}
                        onHide={() => this.setState({newPolicyDialogVisible: false})}
                >
                   <NewPolicyDialog/>
                </Dialog>

                <Dialog header="Add a new client"
                        visible={this.state.newClientDialogVisible}
                        style={{width: '80vw'}}
                        modal={true}
                        onHide={() => this.setState({newClientDialogVisible: false})}
                >
                    <NewClientDialog/>
                </Dialog>

                <Dialog header="Remove client"
                        visible={this.state.removeClientDialogVisible}
                        style={{width: '40vw'}}
                        modal={true}
                        onHide={() => this.setState({removeClientDialogVisible: false})}
                        footer={ removeClientFooter }
                >
                    Are you sure you want to remove selected Client?
                </Dialog>
                <Dialog header="Remove policy"
                        visible={this.state.removePolicyDialogVisible}
                        style={{width: '40vw'}}
                        modal={true}
                        onHide={() => this.setState({removePolicyDialogVisible: false})}
                        footer={ removePolicyFooter }
                >
                    Are you sure you want to remove selected Policy?
                </Dialog>


            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RightpanelContainer);
