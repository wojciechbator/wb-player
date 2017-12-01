import { STORE_SOCKET } from '../types/socketTypes';

const storeSocket = socket => {
    return {
        type: STORE_SOCKET,
        socket
    };
};

export const storeSocketCreator = socket => dispatch => dispatch(storeSocket(socket));