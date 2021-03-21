import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Rigs from './containers/Rigs/Rigs';
import * as actions from './store/actions/index';

class App extends Component {
	componentDidMount() {
		const socket = openSocket('http://localhost:8081');

		socket.on('status', (data) => {
			if (data.action === 'update') {
				// setDate(data.date);
			}
		});
		socket.on('RIGS', (data) => {
			this.props.onUpdateRigs(data);
		});
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/" exact>
					<Rigs />
				</Route>
				<Redirect to="/" />
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					{/* <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} /> */}
					<Route path="/" exact>
						<Rigs />
					</Route>
					<Redirect to="/" />
				</Switch>
			);
		}
		return (
			<div>
				<Layout>{routes}</Layout>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onUpdateRigs: (state) => dispatch(actions.updateRigs(state)),
	};
};

export default withRouter(connect(null, mapDispatchToProps)(App));
