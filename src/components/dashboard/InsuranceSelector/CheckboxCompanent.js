import React, {Component} from 'react';
import {RadioButton} from "primereact/radiobutton";

class CheckboxCompanent extends Component {
    render() {
        const insuranceValue = this.props.value[0];
        return (
            <div>
                { insuranceValue && <div>
            <RadioButton
                name="InsuranceSelector"
                checked={this.props.selectedValue === insuranceValue}
                value={this.props.value}
                onChange={ (e) => { this.props.selectValue(e)  } }/>

                <span>{insuranceValue.value} $</span>

                </div> }
            </div>
        );
    }
}

export default CheckboxCompanent;
