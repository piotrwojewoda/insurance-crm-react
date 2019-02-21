import React, {Component} from 'react';
import {AutoComplete} from 'primereact/autocomplete';
import {newPolicy} from "../../../reducers/new-policy";
import {connect} from "react-redux";
import {
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
import InsuranceSelector from "../InsuranceSelector/InsuranceSelector";
import {dashboardLoadPolicies, dashboardSetPoliciesFirstPage} from "../../../actions/actionsDashboard";

const mapStateToProps = state => ({
    ...state.newPolicy,
    insurance: state.insurance
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
    dashboardLoadPolicies
};

class NewPolicyDialog extends Component {

    handleSubmit = event => {
                this.props.addNewPolicy(
                this.props.companyCode,
                this.props.startDate,
                this.props.endDate,
                this.props.companyPeriod,
                this.props.companyValue.id,
                this.props.mainClientFirstname,
                this.props.mainClientLastname,
                this.props.mainClientPesel,
                this.props.selectedValue.id);

                this.props.onHideNewPolicyDialog();
                this.props.dashboardLoadPolicies(101);
                this.props.dashboardSetPoliciesFirstPage(1000)
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
            selectedValue
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
            || !companyCode
            || !(startDate instanceof Date)
            || !(endDate instanceof Date)
            || !mainClientFirstname
            || !mainClientLastname
            || !mainClientPesel
            || !selectedValue
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
