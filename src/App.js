import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Rigs from './containers/Rigs/Rigs';
import Auth from './containers/Auth/Auth';
import Trade from './containers/Trade/Trade';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

// openSocket('http://localhost:8081');

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/auth" exact component={Auth} />
				<Redirect to="/auth" />
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/logout" exact component={Logout} />
					<Route path="/trade" exact component={Trade} />
					<Route path="/" exact>
						<Rigs />
					</Route>
					<Redirect to="/" />
				</Switch>
			);
		}
		return (
			<div>
				<Layout isAuthenticated={this.props.isAuthenticated}>{routes}</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
