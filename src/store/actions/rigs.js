import * as actionTypes from './actionTypes';

export const updateRigs = ( rigsUpdateStatus ) => {
  return {
    type: actionTypes.UPDATE_RIGS,
    rigsUpdateStatus: rigsUpdateStatus
  }
}