import React, {Component} from 'react';
import {Toolbar} from 'primereact/toolbar';
import {Button} from "primereact/button";
import {Panel} from 'primereact/panel';
import CompanyPanel from "./companyPanel/CompanyPanel";

class RightpanelContainer extends Component {
    render() {
        return (
            <div>
                <Toolbar>
                    <div className="p-toolbar-group-right">
                    <Button label="New policy"  icon="pi pi-plus" style={{marginRight:'.25em'}} />
                    <Button label="Add client" className="p-button-success" icon="pi pi-plus" style={{marginRight:'.25em'}}  />
                    </div>
                    </Toolbar>

             <CompanyPanel/>
                <Panel header="Policy" className="mt-1">
                    The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding.
                    His beloved son Michael has just come home from the war, but does not intend to become part of his father's business.
                    Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family,
                    kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
                </Panel>
                <Panel header="Client" className="mt-1">
                    The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding.
                    His beloved son Michael has just come home from the war, but does not intend to become part of his father's business.
                    Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family,
                    kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
                </Panel>

            </div>
        );
    }
}

export default RightpanelContainer;
