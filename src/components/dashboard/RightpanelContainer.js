import React, {Component} from 'react';
import {Toolbar} from 'primereact/toolbar';
import {Button} from "primereact/button";
import CompanyPanel from "./companyPanel/CompanyPanel";
import PolicyPanel from "./policyPanel/PolicyPanel";
import {Dialog} from "primereact/dialog";
import NewPolicyDialog from "./newPolicyDialog/NewPolicyDialog";
import NewClientDialog from "./newClientDialog/NewClientDialog";
import {connect} from "react-redux";
import {
    startRemoveSelectedClient,
    dashboardSelectPolicy,
    startRemoveSelectedPolicy,
    dashboardLoadPolicies
} from "../../actions/actionsDashboard";
import {resetNewPolicyState, setVisibilityPolicyDialog} from "../../actions/actionsNewPolicy";
import {resetNewClientState, setVisibilityClientDialog} from "../../actions/actionsNewClient";

const mapStateToProps = state => ({
    ...state.dashboard,
    newPolicy: state.newPolicy,
    newClient: state.newClient,
    isAuthenticated: state.auth.isAuthenticated
});
const mapDispatchToProps = {
    startRemoveSelectedClient,
    startRemoveSelectedPolicy,
    dashboardSelectPolicy,
    dashboardLoadPolicies,
    resetNewPolicyState,
    resetNewClientState,
    setVisibilityPolicyDialog,
    setVisibilityClientDialog
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

    onClickRemoveSelectedPolicy = () => {
        this.props.startRemoveSelectedPolicy(this.props.selectedPolicy,this.props.policiesFirstPage);
        this.setState({removePolicyDialogVisible: false});
    };

    onHideRemovePolicyDialog = () => {
        this.setState({removePolicyDialogVisible: false});
    };

    onClickRemoveSelectedClient = () => {
        this.props.startRemoveSelectedClient(this.props.selectedClient , {value: this.props.selectedPolicy} );
        this.setState({removeClientDialogVisible: false});
    };

    onHideRemoveClientDialog = () => {
        this.setState({removeClientDialogVisible: false});
    };

    render() {
        const removeClientFooter = (
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={this.onClickRemoveSelectedClient}/>
                <Button label="No" icon="pi pi-times" onClick={this.onHideRemoveClientDialog}
                        className="p-button-secondary"/>
            </div>
        );
        const removePolicyFooter = (
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={this.onClickRemoveSelectedPolicy}/>
                <Button label="No" icon="pi pi-times" onClick={this.onHideRemovePolicyDialog}
                        className="p-button-secondary"/>
            </div>
        );

        const
            {
                selectedPolicy,
                selectedClient,
                clientsLoading,
                policyInsuranceDetails,
                resetNewPolicyState,
                setVisibilityPolicyDialog,
                resetNewClientState,
                setVisibilityClientDialog
            } = this.props;

        return (
            <div>
                <Toolbar>
                    <div className="p-toolbar-group-right">
                        <Button label="Add a new policy"
                                icon="pi pi-plus"
                                style={{marginRight: '.25em'}}
                                onClick={() => {
                                    resetNewPolicyState();
                                    setVisibilityPolicyDialog(true);
                                }}
                        />
                        {selectedPolicy && (<Button label="Remove selected policy"
                                                    className="p-button-danger"
                                                    icon="pi pi-plus"
                                                    style={{marginRight: '.25em'}}
                                                    onClick={() => this.setState({removePolicyDialogVisible: true})}
                                                    disabled={clientsLoading === true ? 'disabled' : ''}
                        />)}
                        {selectedPolicy && (<Button label="Add a new client"
                                                    className="p-button-success"
                                                    icon="pi pi-plus"
                                                    style={{marginRight: '.25em'}}
                                                    onClick={() => {
                                                        resetNewClientState();
                                                        setVisibilityClientDialog(true);
                                                    }

                                                    }
                                                    disabled={clientsLoading === true ? 'disabled' : ''}
                        />)}
                        {selectedClient && (<Button label="Remove selected client"
                                                    className="p-button-danger"
                                                    icon="pi pi-plus"
                                                    style={{marginRight: '.25em'}}
                                                    onClick={() => this.setState({removeClientDialogVisible: true})}
                                                    disabled={policyInsuranceDetails === true ? 'disabled' : ''}/>)}
                    </div>
                </Toolbar>
                <CompanyPanel/>
                <PolicyPanel/>
                <Dialog header="Add a new policy"
                        visible={this.props.newPolicy.visibleNewPolicyDialog}
                        style={{width: '60vw'}}
                        modal={true}
                        onHide={() => setVisibilityPolicyDialog(false) }
                >
                    <NewPolicyDialog/>
                </Dialog>

                <Dialog header="Add a new client"
                        visible={this.props.newClient.visibleNewClientDialog}
                        style={{width: '80vw'}}
                        modal={true}
                        onHide={() => setVisibilityClientDialog(false) }
                >
                    <NewClientDialog/>
                </Dialog>

                <Dialog header="Remove client"
                        visible={this.state.removeClientDialogVisible}
                        style={{width: '40vw'}}
                        modal={true}
                        onHide={() => this.setState({removeClientDialogVisible: false})}
                        footer={removeClientFooter}
                >
                    Are you sure you want to remove selected Client?
                </Dialog>
                <Dialog header="Remove policy"
                        visible={this.state.removePolicyDialogVisible}
                        style={{width: '40vw'}}
                        modal={true}
                        onHide={() => this.setState({removePolicyDialogVisible: false})}
                        footer={removePolicyFooter}
                >
                    Are you sure you want to remove selected Policy?
                </Dialog>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightpanelContainer);
