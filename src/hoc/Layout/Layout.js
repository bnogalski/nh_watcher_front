import React, { Component } from 'react';
// import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
// import './Layout.css';
// import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	// state = {
	//     showSideDrawer: false
	// }

	// sideDrawerClosedHandler = () => {
	//     this.setState( { showSideDrawer: false } );
	// }

	// sideDrawerToggleHandler = () => {
	//     this.setState( ( prevState ) => {
	//         return { showSideDrawer: !prevState.showSideDrawer };
	//     } );
	// }

	render() {
		const aside = (
			<SideDrawer
				isAuth={this.props.isAuthenticated}
				// open={this.state.showSideDrawer}
				// closed={this.sideDrawerClosedHandler}
				open={true}
				closed={() => {
					console.log('closed side drawer');
				}}
			/>
		);

		return (
			<div className="flex flex-col h-screen w-screen ">
				{/* <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />*/}

				<header className="w-screen h-16 bg-purple-500">Header</header>
				<div className="flex h-full w-screen overflow-hidden">
					<aside className="hidden lg:block flex-300px bg-purple-600">
						{aside}
					</aside>
					<main className="flex-auto bg-gray-800 w-full overflow-y-scroll">
						{this.props.children}
					</main>
				</div>
				<footer className="h-16 bg-purple-500">Footer</footer>
			</div>
		);
	}
}

// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.auth.token !== null
//     };
// };

export default Layout;
