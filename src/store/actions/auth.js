import axios from '../../axios-restapi';

import io from '../../socketio';

import { updateRigs, resetRigs } from './rigs';
import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	return (dispatch) => {
		dispatch(resetRigs());
		console.log('logout');
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('userId');

		try {
			const socket = io.getIO();
			socket.disconnect();
		} catch (error) {
			//ignore error -> socket doesnt exist
		}
		console.log('prawie koniec');
		dispatch({
			type: actionTypes.AUTH_LOGOUT,
		});
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			console.log('token timeout', expirationTime);
			dispatch(logout());
		}, expirationTime);
	};
};

const establishWebSocketConnection = async (dispatch, token) => {
	try {
		const socket = await io.init(token);
		console.log(socket);
		socket.on('status', (data) => {
			if (data.action === 'update') {
				// setDate(data.date);
			}
		});
		socket.on('RIGS', (data) => {
			dispatch(updateRigs(data));
		});

		await socket.connect();
	} catch (error) {
		throw error;
	}
};

export const auth = (email, password, isSignup) => {
	return async (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
		};
		let url = '/auth/login/';
		if (isSignup) {
			url = '/auth/signup/';
		}

		try {
			const response = await axios.post(url, authData);
			if (response.status === 422) {
				throw new Error('Validation Failed');
			}
			if (response.status !== 200 && response.status !== 201) {
				throw new Error('Could not authenticate you!');
			}

			const expirationDate = new Date(
				new Date().getTime() + response.data.expiresIn
			);
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('userId', response.data.userId);

			await establishWebSocketConnection(dispatch, response.data.token);

			dispatch(authSuccess(response.data.token, response.data.userId));
			dispatch(
				checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
			);
		} catch (error) {
			console.log(error);
			dispatch(authFail(error.response));
		}
	};
};

export const authCheckState = () => {
	return async (dispatch) => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				await establishWebSocketConnection(dispatch, token);

				dispatch(authSuccess(token, userId));
				dispatch(
					checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
				);
			}
		}
	};
};
