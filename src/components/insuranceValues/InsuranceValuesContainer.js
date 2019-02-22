import React, {Component} from 'react';
import {connect} from "react-redux";
import {navChangePage} from "../../actions/actions";

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
    navChangePage
};

class InsuranceValuesContainer extends Component {

    componentDidMount() {
        if (!this.props.isAuthenticated && this.props.token) {
            this.props.navChangePage('/login');
        }
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-row justify-content-center align-items-center" style={{height: '25em'}}>
                    <h1>Insurance Values tab will be available soon :) </h1>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(InsuranceValuesContainer);
