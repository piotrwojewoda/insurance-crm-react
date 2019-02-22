import React, {Component} from 'react';
import {TabMenu} from "primereact/tabmenu";
import { connect } from "react-redux";
import {navChangePage, navResetTab, navTabChange} from "../../actions/actions";

const mapStateToProps = state => (
    {
        ...state.nav,
        pathname: state.router.location.pathname
    }
);

const mapDispatchToProps = {
    navChangePage,
    navTabChange,
    navResetTab
};

class TopMenu extends Component {

    navigateToPage = (path) => {
        this.props.navChangePage(path);
    };

    render() {
        const {isAuthenticated,activeItem,navTabChange,pathname} = this.props;
        const items = [
            {pathname: '/', label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => { this.navigateToPage('/' )}   },
            {pathname: '/insurance-values' ,label: 'Insurance Values', icon: 'pi pi-fw pi-money-bill' ,  command: () => { this.navigateToPage('/insurance-values' )} },
            {pathname: '/policies', label: 'Policies', icon: 'pi pi-fw pi-plus-circle' ,  command: () => { this.navigateToPage('/policies' )} },
            {pathname: '/companies', label: 'Companies', icon: 'pi pi-fw pi-globe',  command: () => { this.navigateToPage('/companies' )} },
            {pathname: '/clients', label: 'Clients', icon: 'pi pi-fw pi-users',  command: () => { this.navigateToPage('/clients' )} },
        ];

        let currentItem = activeItem == null && (pathname !== '/' || pathname !== '/login') ?
                items.find( (element) => element.pathname === pathname ) :
                items.find((element) => activeItem !== null && element.label === activeItem.label);

        return ( isAuthenticated &&
            <div className="mt-2">
                <TabMenu model={items} activeItem={currentItem} onTabChange={(e) => { navTabChange(e) }}/>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TopMenu);
