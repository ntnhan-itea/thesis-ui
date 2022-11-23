import {
    SET_USER,
    SET_ALL_USERS,
    SET_DIALOG_MESSAGE,
    SET_OPEN_DIALOG_CONFIRM_SIGN_UP,
    SET_AO_NUOI,
    SET_VUNG_NUOI,
    PLUS_ONE_COUNT_SHOW_LOADING_ICON,
    SET_ZERO_SHOW_LOADING_ICON,
    MINUS_ONE_COUNT_SHOW_LOADING_ICON,
    SET_ALL_TRAI_NUOIS,
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
    [SET_VUNG_NUOI](state, vungNuoi) {
        state.vungNuoi = vungNuoi;
    },
    [PLUS_ONE_COUNT_SHOW_LOADING_ICON](state) {
        state.countToShowIconLoading += 1;
        console.log("  state.countToShowIconLoading");
    },
    [MINUS_ONE_COUNT_SHOW_LOADING_ICON](state) {
        state.countToShowIconLoading += -1;
    },
    [SET_ZERO_SHOW_LOADING_ICON](state) {
        state.countToShowIconLoading = 0;
    },
    [SET_ALL_TRAI_NUOIS](state, traiNuois) {
        state.listTraiNuois = traiNuois;
    },
};
