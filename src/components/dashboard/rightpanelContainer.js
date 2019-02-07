import React, {Component} from 'react';
import {Toolbar} from 'primereact/toolbar';
import {Button} from "primereact/button";
import CompanyPanel from "./companyPanel/CompanyPanel";
import PolicyPanel from "./PolicyPanel/PolicyPanel";

class RightpanelContainer extends Component {
    render() {
        return (
            <div>
                <Toolbar>
                    <div className="p-toolbar-group-right">
                        <Button label="New policy" icon="pi pi-plus" style={{marginRight: '.25em'}}/>
                        <Button label="Add client" className="p-button-success" icon="pi pi-plus"
                                style={{marginRight: '.25em'}}/>
                    </div>
                </Toolbar>
                <CompanyPanel/>
                <PolicyPanel/>
            </div>
        );
    }
}

export default RightpanelContainer;
