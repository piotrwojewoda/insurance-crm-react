import React, {Component} from 'react';
import {connect} from "react-redux";
import {navChangePage} from "../../actions/actions";
import Policies from "./policies";


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
    navChangePage
};


class DashboardContainer extends Component {

    constructor(props)
    {
        super(props);
        if (!this.props.isAuthenticated) {
            this.props.navChangePage('/login');
        }
    }

    render() {
        return (
            <div>
                <div className="mt-1">
                    <Policies/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DashboardContainer)
