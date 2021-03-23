import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	miningRigs: [],
	profitability: 0,
	unpaidAmount: 0,
	speedAccepted: 0,
	speedRejected: 0,
};

const updateRigs = (state, action) => {
	let profitability = 0;
	let unpaidAmount = 0;
	let speedAccepted = 0;
	let speedRejected = 0;

	for (const rig of action.miningRigs) {
		profitability += rig.profitability;
		unpaidAmount += rig.unpaidAmount;
		speedAccepted += rig.speedAccepted;
		speedRejected += rig.speedRejected;
	}

	const updatedState = {
		profitability: profitability,
		unpaidAmount: unpaidAmount,
		speedAccepted: speedAccepted,
		speedRejected: speedRejected,
		miningRigs: [...action.miningRigs],
	};

	// updatedState.miningRigs = JSON.parse(JSON.stringify(action.miningRigs))

	return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.RESET_STATE:
			return updateRigs(state, initialState);
		case actionTypes.UPDATE_RIGS:
			return updateRigs(state, action.rigsUpdateStatus);
		default:
			return state;
	}
};

export default reducer;
