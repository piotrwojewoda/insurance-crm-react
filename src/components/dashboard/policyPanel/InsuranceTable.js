import React, {Component} from 'react';
import InsuranceOption from "./InsuranceOption";

class InsuranceTable extends Component {
    render() {
        const {insuranceCategories, insuranceTypes, clientInsuranceValue} = this.props;
        return (
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    {insuranceCategories.map((el) => {
                        return (<th key={el.id} style={{width: "25%"}}> {el.name}</th>)
                    })}
                </tr>
                </thead>
                <tbody>
                {insuranceTypes.map((type) => {
                    return (<tr key={'type_' + type.id}>
                        <td><strong>{type.name}</strong></td>
                        {insuranceCategories.map((category) => {
                            return (<td key={'category_' + type.id + "_" + category.id}>
                                <InsuranceOption
                                    clientInsuranceValue={clientInsuranceValue}
                                    insuranceType={type}
                                    insuranceCategory={category}
                                />
                            </td>)
                        })}
                    </tr>)
                })}
                </tbody>
            </table>

        );
    }
}

export default InsuranceTable;
