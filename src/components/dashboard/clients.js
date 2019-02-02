import React, {Component} from 'react';
import {TreeTable} from "primereact/treetable";
import {Column} from "primereact/column";

class Clients extends Component {
    render() {
        return (
            <div>
                <TreeTable value={null} lazy={true} paginator={true} totalRecords={1000}  header="Clients"
                           first={1} rows={10} onPage={1}  loading={false}>
                    <Column field="pesel" header="Pesel" expander></Column>
                    <Column field="firstname" header="Firstname"></Column>
                    <Column field="lastname" header="Lastname"></Column>
                    <Column field="birthdate" header="Birthdate"></Column>
                </TreeTable>
            </div>
        );
    }
}

export default Clients;
