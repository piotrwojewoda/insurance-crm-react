import React, {Component} from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from "primereact/column";


class Policies extends Component {
    render() {
        return (
            <div>
                <TreeTable value={null} lazy={true} paginator={true} totalRecords={1000}
                           first={1} rows={10} onPage={1}  loading={false}>
                    <Column field="code" header="Code" expander></Column>
                    <Column field="startdate" header="Start Date"></Column>
                    <Column field="enddate" header="End Date"></Column>
                    <Column field="period" header="Period"></Column>
                </TreeTable>
            </div>
        );
    }
}

export default Policies;
