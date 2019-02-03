import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import { Column } from "primereact/column";
import {ProgressSpinner} from "primereact/progressspinner";


class Policies extends Component {

    constructor(props)
    {
        super(props);
        this.props.dashboardLoadPolicies();
    }

    render() {
        const { policies } = this.props;
        const { policiesLoading,policiesAmount,selectedPolicy,onSelectPolicy} = this.props;
        let selectedItem = selectedPolicy === null ? null : policies.find( e => e['@id'] === selectedPolicy['@id']);
        return (
            <div style={{ position: 'relative'}}>
                { policiesLoading && (<ProgressSpinner style={{
                    width: '100px',
                    height: '100px',
                    zIndex: '99999',
                    position: 'absolute',
                    left: '50%',
                    top: '55%',
                    transform: 'translate(-50%, -50%)'

                }} strokeWidth="5"  animationDuration=".8s"/>) }
                <DataTable value={policies}
                           lazy={true}
                           totalRecords={policiesAmount}
                           header="Policies"
                           first={1}
                           rows={10}
                           loading={policiesLoading}
                           selectionMode="single"
                           emptyMessage=""
                           selection={selectedItem}
                           paginator={true}
                           onSelectionChange={e => onSelectPolicy(e) }
                >
                    <Column field="code" header="Code"  />
                    <Column field="startdate" header="Start Date"/>
                    <Column field="enddate" header="End Date"/>
                    <Column field="period" header="Period"/>
                </DataTable>
            </div>
        );
    }
}

export default Policies;
