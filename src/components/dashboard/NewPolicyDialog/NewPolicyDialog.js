import React, {Component} from 'react';
import {AutoComplete} from 'primereact/autocomplete';
import {newPolicy} from "../../../reducers/new-policy";
import {connect} from "react-redux";
import {getCompanies, setCompanyValue} from "../../../actions/actionsNewPolicy";
import {InputText} from 'primereact/inputtext';
import {Calendar} from "primereact/calendar";
import { ListBox } from 'primereact/listbox';
import './newPolicyDialogStyle.css';
import {Button} from "primereact/button";

const mapStateToProps = state => ({
    ...state.newPolicy
});

const mapDispatchToProps = {
    getCompanies,
    setCompanyValue
};

class NewPolicyDialog extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const { suggestedCompanies, getCompanies, companyValue, setCompanyValue } = this.props;

        const period = [
            {label: 'month', value: 'month'},
            {label: 'quarter', value: 'quarter'},
            {label: 'year', value: 'year'}];

        return (
            <div>
                <table className="table table-striped">
                    <tbody>
                    <tr>
                        <td><strong> Type & select company name: </strong></td>
                        <td>
                            <AutoComplete
                                style={ { width: '100%'}}
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
                                onSelect={(el) => {
                                    console.log(el)
                                }}
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
                            <InputText type="text" size="30" value="fff" onChange={(e) => {} } />
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
                            <ListBox  options={period} onChange={(e) => {} } />
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
                                      value={new Date()}
                                      onChange={(e) => {}}
                                      style={ { width: '100%'}}
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
                                      value={new Date()}
                                      onChange={(e) => {}}
                                          style={ { width: '100%'}}

                            ></Calendar>
                        </td>
                    </tr>
                    <tr>
                       <td colSpan={2}>
                           <Button style={{width: '100%'}} label="Add" className="p-button-success" />
                       </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewPolicyDialog);
