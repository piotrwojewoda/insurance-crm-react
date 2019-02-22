import React, {Component} from 'react';
import CheckboxCompanent from "./CheckboxCompanent";

class InsuranceSelector extends Component {
    render() {
        const {insuranceCategories, insuranceTypes, insuranceValues} = this.props;
        return (
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    {insuranceCategories.map((el) => {
                        return (<th key={el.id}> {el.name}</th>)
                    })}
                </tr>
                </thead>
                <tbody>
                {insuranceTypes.map((type) => {
                    return (<tr key={'type_' + type.id}>
                        <td><strong>{type.name}</strong></td>
                        {insuranceCategories.map((category) => {
                            let insuranceValue = insuranceValues.filter((v, i) => {
                                return (v.insuranceType === type['@id'] && v.insuranceCategory === category['@id']);
                            });
                            return (<td key={'category_' + type.id + "_" + category.id}>
                                <CheckboxCompanent
                                    value={insuranceValue}
                                    selectValue={this.props.selectValue}
                                    selectedValue={this.props.selectedValue}/>
                            </td>)
                        })}
                    </tr>)
                })}
                </tbody>
            </table>
        );
    }
}

export default InsuranceSelector;
