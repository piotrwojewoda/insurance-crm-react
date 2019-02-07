import React, {Component} from 'react';
import {Toolbar} from 'primereact/toolbar';
import {Button} from "primereact/button";
import CompanyPanel from "./companyPanel/CompanyPanel";
import PolicyPanel from "./PolicyPanel/PolicyPanel";
import {Dialog} from "primereact/dialog";
import NewPolicyDialog from "./NewPolicyDialog/NewPolicyDialog";
import NewClientDialog from "./NewClientDialog/NewClientDialog";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state.dashboard,
    isAuthenticated: state.auth.isAuthenticated
});

class RightpanelContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPolicyDialogVisible: false,
            newClientDialogVisible: false
        };
    }
    render() {
        const { selectedPolicy, selectedClient,clientsLoading,policyInsuranceDetails} = this.props;

        return (
            <div>
                <Toolbar>
                    <div className="p-toolbar-group-right">
                        <Button label="Add a newpolicy"
                                icon="pi pi-plus"
                                style={{marginRight: '.25em'}}
                                onClick={() => this.setState({newPolicyDialogVisible: true})}
                        />
                        { selectedPolicy && (<Button label="Remove selected policy"
                                className="p-button-danger"
                                icon="pi pi-plus"
                                style={{marginRight: '.25em'}}
                                onClick={() => this.setState({newClientDialogVisible: true})}
                                                     disabled={clientsLoading === true ? 'disabled' : ''}
                        />) }
                        <Button label="Add a new client"
                                className="p-button-success"
                                icon="pi pi-plus"
                                style={{marginRight: '.25em'}}
                                onClick={() => this.setState({newClientDialogVisible: true})}
                        />
                        { selectedClient && (<Button label="Remove selected client"
                                className="p-button-danger"
                                icon="pi pi-plus"
                                style={{marginRight: '.25em'}}
                                onClick={() => this.setState({newClientDialogVisible: true})}
                                                     disabled={policyInsuranceDetails === true ? 'disabled' : ''}
                        />) }
                    </div>
                </Toolbar>
                <CompanyPanel/>
                <PolicyPanel/>
                <Dialog header="Add a new policy"
                        visible={this.state.newPolicyDialogVisible}
                        style={{width: '80vw'}}
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

            </div>
        );
    }
}

export default connect(mapStateToProps,null)(RightpanelContainer);
