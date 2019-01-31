import React, {Component} from 'react';
import TopMenu from "./TopMenu";

class HeaderContainer extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand" >InsuranceCRM</span>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <span className="nav-link" >Logout</span>
                        </li>
                    </ul>
                </nav>
                <TopMenu/>
            </div>
        );
    }
}

export default HeaderContainer;
