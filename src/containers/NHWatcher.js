import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../components/UI/Button/Button';
import DataField from '../components/DataField/DataField';

import './NHWatcher.css';

export class NHWatcher extends Component {
	state = {};

	render() {
		return (
			<div className="NHWatcher">
				<DataField name="BTC_ADDRESS" value={this.props.rigs.btcAddress}/>
				<Button btnType="Success" clicked={() => console.log('clicked')}>
					GET SOME DATA
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		rigs: state.rigs,
	};
};

export default connect(mapStateToProps)(NHWatcher);
