import { SET_USER, SET_ALL_USERS } from './mutation-types';

export const mutations = {
    [SET_USER](state, payload) {
        state.user = payload.user;
    },
    [SET_ALL_USERS](state, payload) {
        state.users = payload.users;
    },
};
