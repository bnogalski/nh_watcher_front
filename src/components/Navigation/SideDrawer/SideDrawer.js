import React from 'react';

// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
// import classes from './SideDrawer.css';
// import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = ( props ) => {
    // let attachedClasses = [classes.SideDrawer, classes.Close];
    // if (props.open) {
    //     attachedClasses = [classes.SideDrawer, classes.Open];
    // }
    let attachedClasses = [];
    return (
        <Aux>
            {/* <Backdrop show={props.open} clicked={props.closed}/> */}
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                {/* <div className={classes.Logo}>
                    <Logo />
                </div> */}
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;