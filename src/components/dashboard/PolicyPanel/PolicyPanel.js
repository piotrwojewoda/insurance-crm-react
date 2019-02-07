import React, {Component} from 'react';
import {Panel} from "primereact/panel";
import InsuranceTable from "./InsuranceTable";
import {connect} from "react-redux";
import {ProgressSpinner} from "primereact/progressspinner";

const mapStateToProps = state => ({
    ...state.dashboard,
    insurance: state.insurance
});

class PolicyPanel extends Component {


    render() {

        const { insuranceTypes,insuranceCategories } = this.props.insurance;
        const { clientInsuranceValue,policyInsuranceDetails } = this.props;
        const {selectedClient} = this.props;
        return (
                <div style={{ position: 'relative'}}>
                    { policyInsuranceDetails && (<ProgressSpinner style={{
                        width: '100px',
                        height: '100px',
                        zIndex: '99999',
                        position: 'absolute',
                        left: '50%',
                        top: '55%',
                        transform: 'translate(-50%, -50%)'

                    }} strokeWidth="5"  animationDuration=".8s"/>) }
                <Panel header="Policy insurance details" className="mt-1 text-center">
                    { selectedClient  && clientInsuranceValue  ? (
                        <InsuranceTable
                            insuranceTypes={insuranceTypes}
                            insuranceCategories={insuranceCategories}
                            clientInsuranceValue={ clientInsuranceValue }
                        />
                        )
                        : " Please select company and client from left lists" }
                </Panel>
            </div>
        );
    }
}

export default connect(mapStateToProps,null)(PolicyPanel);
