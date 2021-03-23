import * as actionTypes from './actionTypes';

export const updateRigs = ( rigsUpdateStatus ) => {
  return {
    type: actionTypes.UPDATE_RIGS,
    rigsUpdateStatus: rigsUpdateStatus
  }
}

export const resetRigs = ( ) => {
  return {
    type: actionTypes.RESET_STATE,
  }
}