import { UPDATE_LOAD_USER, LOGOUT_USER } from '../constants/ActionTypes';

export const setAuthUser = (user) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_LOAD_USER,
            payload: user,
        });
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_USER
        });
    };
};
