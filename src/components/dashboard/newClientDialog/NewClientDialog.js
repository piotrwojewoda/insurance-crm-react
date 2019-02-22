import React, {Component} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {connect} from "react-redux";
import InsuranceSelector from "../insuranceSelector/InsuranceSelector";
import {
    addNewClientToSelectedPolicy,
    newClientSetClientFirstname,
    newClientSetClientLastname,
    newClientSetClientPesel,
    setNewClientSelectedValue,
} from "../../../actions/actionsNewClient";
import {apiObjectId} from "../../../apiUtils";
import ErrorComponent from "../ErrorComponent";

const mapStateToProps = state => ({
    ...state.newClient,
    insurance: state.insurance,
    dashboard: state.dashboard
});

const mapDispatchToProps = {
    setNewClientSelectedValue,
    newClientSetClientFirstname,
    newClientSetClientLastname,
    newClientSetClientPesel,
    addNewClientToSelectedPolicy
};

class NewClientDialog extends Component {

    handleSubmit = event => {
        this.props.addNewClientToSelectedPolicy(
            this.props.clientFirstname,
            this.props.clientLastname,
            this.props.clientPesel,
            this.props.selectedValue.id,
            this.props.dashboard.selectedPolicy,
            this.props.dashboard.company,
            apiObjectId(this.props.dashboard.selectedPolicy)
        );
        event.preventDefault();
    };

    render() {
        const {insuranceCategories, insuranceTypes, insuranceValues} = this.props.insurance;
        const {
            selectedValue,
            setNewClientSelectedValue,
            newClientSetClientFirstname,
            newClientSetClientLastname,
            newClientSetClientPesel,
            clientFirstname,
            clientLastname,
            clientPesel,
            errors

        } = this.props;

        return (
            <div>
                {console.log('selectedValue', this.props)}
                <form onSubmit={this.handleSubmit}>
                    <table className="table table-striped">
                        <tbody>
                        <tr>
                            <td>
                                <strong>Client Firstname</strong>
                            </td>
                            <td>
                                <InputText
                                    type="text"
                                    size="30"
                                    value={clientFirstname}
                                    onChange={(e) => {
                                        newClientSetClientFirstname(e.target.value);
                                    }}/>
                                <ErrorComponent error={errors.firstname}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Client Lastname</strong>
                            </td>
                            <td>
                                <InputText
                                    type="text"
                                    size="30"
                                    value={clientLastname}
                                    onChange={(e) => {
                                        newClientSetClientLastname(e.target.value);
                                    }}/>
                                <ErrorComponent error={errors.lastname}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Client Pesel</strong>
                            </td>
                            <td>
                                <InputText
                                    type="text"
                                    size="30"
                                    value={clientPesel}
                                    onChange={(e) => {
                                        newClientSetClientPesel(e.target.value);
                                    }}/>
                                <ErrorComponent error={errors.pesel}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <InsuranceSelector
                                    insuranceCategories={insuranceCategories}
                                    insuranceTypes={insuranceTypes}
                                    insuranceValues={insuranceValues}
                                    selectValue={setNewClientSelectedValue}
                                    selectedValue={selectedValue}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Button style={{width: '100%'}}
                                        label="Add"
                                        disabled={!selectedValue}
                                        className="p-button-success"
                                />
                                {!selectedValue &&
                                <div style={{color: 'red'}}
                                     className="d-flex justify-content-center align-items-center">
                                    Please select insurance value
                                </div>}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewClientDialog);
