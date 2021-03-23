import React, { Component } from 'react';
import { connect } from 'react-redux';

import Rig from '../../components/Rig/Rig';
import DataArray from '../../components/DataArray/DataArray';
import axios from '../../axios-restapi';

export class Rigs extends Component {
	makeRigControlHandlers = (rigId_) => {
		const rigId = rigId_;
		const onStartRigHandler = (devId) => {
			axios
				.post('/status/rigs/control/', {
					rigId: rigId,
					command: 'START',
					devId: devId,
				})
				.then((resp) => console.log(resp))
				.catch((error) => console.log(error));
		};
		const onStopRigHandler = (devId) => {
			axios
				.post('/status/rigs/control/', {
					rigId: rigId,
					command: 'STOP',
					devId: devId,
				})
				.then((resp) => console.log(resp))
				.catch((error) => console.log(error));
		};
		const onRestartRigHandler = (devId) => {
			axios
				.post('/status/rigs/control/', {
					rigId: rigId,
					command: 'RESTART',
					devId: devId,
				})
				.then((resp) => console.log(resp))
				.catch((error) => console.log(error));
		};
		return {
			onStartRigHandler,
			onStopRigHandler,
			onRestartRigHandler,
		};
	};

	render() {
		const rig = this.props.miningRigs.map((rig) => {
			let valArray = [];

			let i = 0;
			for (const key in rig) {
				if ((key !== 'dispatch') & (key !== 'id') & (key !== 'devices')) {
					const val = rig[key];
					valArray.push({
						key: i++,
						name: key,
						value: isNaN(val) ? val : val.toFixed(8),
					});
				}
			}

			const {
				onStartRigHandler,
				onStopRigHandler,
				onRestartRigHandler,
			} = this.makeRigControlHandlers(rig.id);

			return (
				<Rig
					key={rig.id}
					title={rig.id}
					devices={rig.devices}
					startHandler={onStartRigHandler}
					stopHandler={onStopRigHandler}
					restartHandler={onRestartRigHandler}
				>
					{valArray}
				</Rig>
			);
		});

		let valArray = [];
		for (const key in this.props) {
			let i = 0;
			if ((key !== 'miningRigs') & (key !== 'dispatch'))
				valArray.push({
					key: i++,
					name: key,
					value: this.props[key].toFixed(8),
				});
		}

		return (
			<div className="pt-1 flex flex-col place-items-center md:p-2 w-full rounded-md overflow-hidden gap-y-4">
				<div className=" w-full md:rounded-md md:overflow-hidden gap-y-4">
					<DataArray title={'SUMMARY'} bgColor="bg-purple-500">
						{valArray}
					</DataArray>
				</div>
				{rig}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		miningRigs: state.rigs.miningRigs,
		profitability: state.rigs.profitability,
		unpaidAmount: state.rigs.unpaidAmount,
		speedAccepted: state.rigs.speedAccepted,
		speedRejected: state.rigs.speedRejected,
	};
};

export default connect(mapStateToProps)(Rigs);
