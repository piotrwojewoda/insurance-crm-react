import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import { Column } from "primereact/column";


class Policies extends Component {

    constructor(props)
    {
        super(props);
        this.props.dashboardLoadPolicies();
    }

    render() {
        const { policies } = this.props;
        return (
            <div>
                <DataTable value={policies}
                           lazy={true}
                           totalRecords={12}
                           header="Policies"
                           first={1}
                           rows={6}
                           onPage={1}
                           loading={false}
                           rowsPerPageOptions={[5,10,20]}
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
