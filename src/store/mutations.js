import { SET_USER, SET_ALL_USERS, SET_DIALOG_MESSAGE } from './mutation-types';

export const mutations = {
    [SET_USER](state, payload) {
        state.user = payload.user;
    },
    [SET_ALL_USERS](state, payload) {
        state.users = payload.users;
    },
    [SET_DIALOG_MESSAGE](state, payload) {
        state.dialogMessage = payload.dialogMessage;
    },

};
