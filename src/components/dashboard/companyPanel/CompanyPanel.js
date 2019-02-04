import React, {Component} from 'react';
import {Panel} from "primereact/panel";
import {connect} from "react-redux";
import './companyPanel.css';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";

const mapStateToProps = state => ({
    ...state.dashboard
});

class CompanyPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {dialogVisible: false};
    }

    render() {
        const { selectedPolicy,company } = this.props;
        return selectedPolicy && company !== undefined && (
            <div>
                   <Panel header="Company" className="mt-1">
                       <div className="row">
                          <div className="col-md-6">
                              <ul className="list-group">
                                  <li className="list-group-item"><strong>Company name:</strong> {company.name} </li>
                                  <li className="list-group-item"><strong>Regon:</strong> { company.regon } </li>
                                  <li className="list-group-item"><strong>e-mail:</strong> { company.email }</li>
                                  <li className="list-group-item"><strong>Phone:</strong> { company.phone }</li>
                              </ul>
                          </div>
                           <div className="col-md-6">
                               <ul className="list-group">
                                   <li className="list-group-item"><strong>City:</strong> {company.city.name} </li>
                                   <li className="list-group-item"><strong>Address:</strong> {company.address}</li>
                                   <Button
                                       label="Show more..."
                                       className="p-button-raised mt-4"
                                       icon="pi pi-clone"
                                       onClick={(e) => this.setState({dialogVisible: true})}
                                       disabled={ this.props.clientsLoading === true ? 'disabled' : ''}
                                   />
                               </ul>
                           </div>
                       </div>
                </Panel>
                <Dialog header="Company details" visible={this.state.dialogVisible} style={{width: '70vw'}} modal={true} onHide={(e) => this.setState({dialogVisible: false})}>
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Company name:</strong> {company.name} </li>
                        <li className="list-group-item"><strong>Company fullname:</strong> {company.longName} </li>
                        <li className="list-group-item"><strong>Regon:</strong> { company.regon } </li>
                        <li className="list-group-item"><strong>e-mail:</strong> { company.email }</li>
                        <li className="list-group-item"><strong>Phone:</strong> { company.phone }</li>
                        <li className="list-group-item"><strong>Description:</strong> { company.description }</li>
                        <li className="list-group-item"><strong>City:</strong> { company.city.name }</li>
                    </ul>

                </Dialog>
            </div>
        );
    }
}

export default connect(mapStateToProps,null)(CompanyPanel);
