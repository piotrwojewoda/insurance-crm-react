import React, {Component} from 'react';
import TopMenu from "./TopMenu";
import {navResetTab} from "../../actions/actions";
import { connect } from "react-redux";
const mapDispatchToProps = {
    navResetTab
}
class HeaderContainer extends Component {
    render() {
        const {isAuthenticated, logout} = this.props;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand" >InsuranceCRM</span>
                    <ul className="navbar-nav ml-auto">
                        { isAuthenticated && (<li className="nav-item">
                            <span className="nav-link" onClick={ logout }>Logout</span>
                        </li>) }
                    </ul>
                </nav>
                <TopMenu isAuthenticated={isAuthenticated} />
            </div>
        );
    }
}

export default connect(null,mapDispatchToProps)(HeaderContainer);
