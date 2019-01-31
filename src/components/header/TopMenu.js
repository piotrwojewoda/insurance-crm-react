import React, {Component} from 'react';
import {TabMenu} from "primereact/tabmenu";
import { connect } from "react-redux";
import {navChangePage} from "../../actions/actions";

const mapStateToProps = state => ( { ...state.nav });

const mapDispatchToProps = {
    navChangePage
}

class TopMenu extends Component {

    navigateToPage = (path) => {
        this.props.navChangePage(path);
    }

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => { this.navigateToPage('/' )}   },
                {label: 'Insurance Values', icon: 'pi pi-fw pi-calendar'},
                {label: 'Policies', icon: 'pi pi-fw pi-pencil' ,  command: () => { this.navigateToPage('/policies' )} },
                {label: 'Companies', icon: 'pi pi-fw pi-file'},
                {label: 'Clients', icon: 'pi pi-fw pi-cog'}
            ]
        };
    }

    render() {



        return (
            <div className="mt-2">
                <TabMenu model={this.state.items} activeItem={this.state.activeItem} onTabChange={(e) => this.setState({activeItem: e.value})}/>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TopMenu);
