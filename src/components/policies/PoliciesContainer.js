import React, {Component} from 'react';
import {connect} from "react-redux";
import {navChangePage} from "../../actions/actions";


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
    navChangePage
};

class PoliciesContainer extends Component {

    componentDidMount() {
        if (!this.props.isAuthenticated && this.props.token) {
            this.props.navChangePage('/login');
        }
    }

    render() {
        return (
            <div>
                POLICIES CONTAINER
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PoliciesContainer);
