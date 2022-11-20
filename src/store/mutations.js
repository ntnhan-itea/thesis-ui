import {
    SET_USER,
    SET_ALL_USERS,
    SET_DIALOG_MESSAGE,
    SET_OPEN_DIALOG_CONFIRM_SIGN_UP,
    SET_AO_NUOI,
} from "./mutation-types";

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
    [SET_OPEN_DIALOG_CONFIRM_SIGN_UP](state, payload) {
        state.isOpenDialogSignup = payload.isOpenDialogSignup;
    },
    [SET_AO_NUOI](state, aoNuoi) {
        state.aoNuoi = aoNuoi;
    },
};
