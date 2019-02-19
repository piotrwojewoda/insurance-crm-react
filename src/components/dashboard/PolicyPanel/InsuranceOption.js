import React, {Component} from 'react';

class InsuranceOption extends Component {
    render() {
        const {clientInsuranceValue,insuranceType,insuranceCategory} = this.props;

        return (
            <div>
                { clientInsuranceValue.insuranceType === insuranceType["@id"] &&
                clientInsuranceValue.insuranceCategory === insuranceCategory["@id"] ?
                    (<div> <i className="pi pi-check" /> <strong>{clientInsuranceValue.value} $ </strong></div>) : ""  }
            </div>
        );
    }
}

export default InsuranceOption;
