import React, {Component} from 'react';
import {AutoComplete} from 'primereact/autocomplete';
import {connect} from "react-redux";
import {
    addErrorsToNewPolicyDialog,
    addNewPolicy,
    getCompanies,
    setCompanyCode,
    setCompanyEndDate,
    setCompanyPeriod,
    setCompanyStartDate,
    setCompanyValue,
    setMainClientFirstname,
    setMainClientLastname,
    setMainClientPesel,
    setNewPolicySelectedValue

} from "../../../actions/actionsNewPolicy";
import {InputText} from 'primereact/inputtext';
import {Calendar} from "primereact/calendar";
import {ListBox} from 'primereact/listbox';
import './newPolicyDialogStyle.css';
import {Button} from "primereact/button";
import InsuranceSelector from "../insuranceSelector/InsuranceSelector";
import {dashboardLoadPolicies, dashboardSetPoliciesFirstPage} from "../../../actions/actionsDashboard";
import ErrorComponent from "../ErrorComponent";

const mapStateToProps = state => ({
    ...state.newPolicy,
    insurance: state.insurance,
    dashboard: state.dashboard
});

const mapDispatchToProps = {
    getCompanies,
    setCompanyValue,
    setCompanyCode,
    setCompanyPeriod,
    setCompanyStartDate,
    setCompanyEndDate,
    setMainClientFirstname,
    setMainClientLastname,
    setMainClientPesel,
    addNewPolicy,
    setNewPolicySelectedValue,
    dashboardSetPoliciesFirstPage,
    dashboardLoadPolicies,
    addErrorsToNewPolicyDialog,
};

class NewPolicyDialog extends Component {

    handleSubmit = event => {
        this.props.addErrorsToNewPolicyDialog([]);
        this.props.addNewPolicy(
            this.props.companyCode,
            this.props.startDate,
            this.props.endDate,
            this.props.companyPeriod,
            this.props.companyValue.id,
            this.props.mainClientFirstname,
            this.props.mainClientLastname,
            this.props.mainClientPesel,
            this.props.selectedValue.id,
            this.props.dashboard.policiesAmount);
        event.preventDefault();
    };

    render() {
        const {
            suggestedCompanies,
            getCompanies,
            companyValue,
            setCompanyValue,
            companyCode,
            setCompanyCode,
            companyPeriod,
            setCompanyPeriod,
            setCompanyStartDate,
            startDate,
            setCompanyEndDate,
            endDate,
            mainClientFirstname,
            mainClientLastname,
            mainClientPesel,
            setMainClientFirstname,
            setMainClientLastname,
            setMainClientPesel,
            setNewPolicySelectedValue,
            selectedValue,
            errors
        } = this.props;


        const {
            insuranceCategories,
            insuranceTypes,
            insuranceValues
        } = this.props.insurance;

        const period = [
            {label: 'month', value: 'month'},
            {label: 'quarter', value: 'quarter'},
            {label: 'year', value: 'year'}];

        const formIsNotCompleted = ((typeof companyValue !== "object") || (companyValue === null))
            || !companyPeriod
            || !selectedValue
            || !(startDate instanceof Date)
            || !(endDate instanceof Date)
        ;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <table className="table table-striped">
                        <tbody>
                        <tr>
                            <td><strong> Type & select company name: </strong></td>
                            <td>
                                <AutoComplete
                                    style={{width: '100%'}}
                                    onChange={(e) => setCompanyValue(e)}
                                    suggestions={suggestedCompanies}
                                    completeMethod={getCompanies}
                                    value={companyValue}
                                    field="name"
                                    onBlur={
                                        () => {
                                            if ((typeof companyValue !== "object") || (companyValue === null)) {
                                                setCompanyValue({value: null});
                                            }
                                        }
                                    }
                                >
                                </AutoComplete>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Code:</strong>
                            </td>
                            <td>
                        <span className="p-float-label">
                            <InputText
                                type="text"
                                size="30"
                                value={companyCode}
                                onChange={(e) => {
                                    setCompanyCode(e.target.value)
                                }}/>
                        </span>
                                <ErrorComponent error={errors.code}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                    Period:
                                </strong>
                            </td>
                            <td>
                                <ListBox
                                    value={companyPeriod}
                                    options={period}
                                    onChange={(e) => {
                                        setCompanyPeriod(e.value)
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                    Start Date:
                                </strong>
                            </td>
                            <td>
                                <Calendar dateFormat="yy-mm-dd"
                                          value={startDate}
                                          onChange={(e) => {
                                              setCompanyStartDate(e.value)
                                          }}
                                          style={{width: '100%'}}
                                ></Calendar>
                                <ErrorComponent error={errors.startDate}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                    End Date:
                                </strong>
                            </td>
                            <td>
                                <Calendar dateFormat="yy-mm-dd"
                                          value={endDate}
                                          onChange={(e) => {
                                              setCompanyEndDate(e.value)
                                          }}
                                          style={{width: '100%'}}

                                ></Calendar>
                                <ErrorComponent error={errors.endDate}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong> Main Client: </strong>
                            </td>
                            <td>
                                <div className="row">
                                    <div className="col-sm">
                                        <InputText
                                            type="text"
                                            size="30"
                                            value={mainClientFirstname}
                                            tooltip="Firstname"
                                            onChange={(e) => {
                                                setMainClientFirstname(e.target.value);
                                            }}/>
                                        <ErrorComponent error={errors.clientFirstName}/>
                                    </div>
                                    <div className="col-sm">
                                        <InputText
                                            type="text"
                                            size="30"
                                            value={mainClientLastname}
                                            tooltip="Lastname"
                                            onChange={(e) => {
                                                setMainClientLastname(e.target.value);
                                            }}/>
                                        <ErrorComponent error={errors.clientLastName}/>
                                    </div>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <strong>Pesel</strong>
                            </td>
                            <td>
                                <InputText
                                    type="text"
                                    size="30"
                                    value={mainClientPesel}
                                    onChange={(e) => {
                                        setMainClientPesel(e.target.value);
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
                                    selectValue={setNewPolicySelectedValue}
                                    selectedValue={selectedValue}
                                />
                            </td>


                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Button style={{width: '100%'}}
                                        label="Add"
                                        className="p-button-success"
                                        disabled={formIsNotCompleted}
                                />
                                {formIsNotCompleted &&
                                <div style={{color: 'red'}}
                                     className="d-flex justify-content-center align-items-center">
                                    Please complete all fields
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

export default connect(mapStateToProps, mapDispatchToProps)(NewPolicyDialog);
