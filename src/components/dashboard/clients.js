import React, {Component} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {ProgressSpinner} from "primereact/progressspinner";

class Clients extends Component {
    render() {
        const { clients,clientsAmount , clientsLoading } = this.props;
        return (
            <div style={{ position: 'relative'}}>
                { clientsLoading && (<ProgressSpinner style={{
                    width: '100px',
                    height: '100px',
                    zIndex: '99999',
                    position: 'absolute',
                    left: '50%',
                    top: '55%',
                    transform: 'translate(-50%, -50%)'

                }} strokeWidth="5"  animationDuration=".8s"/>) }
                <DataTable value={clients}
                           lazy={true}
                           totalRecords={clientsAmount}
                           header="Clients"
                           first={1}
                           rows={6}
                           loading={clientsLoading}
                           emptyMessage=""
                >
                    <Column field="idnumber" header="Pesel"></Column>
                    <Column field="firstname" header="Firstname"></Column>
                    <Column field="lastname" header="Lastname"></Column>
                    <Column field="birthdate" header="Birthdate"></Column>
                </DataTable>
            </div>
        );
    }
}

export default Clients;
