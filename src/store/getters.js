import { SET_DIALOG_MESSAGE } from './mutation-types';

function jsonParse(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        const errorMessage = error.message || "Cannot parse Json String of User";
        showDialogMessage(errorMessage, true);
        return null;
    }
}

function showDialogMessage(message, isError) {
    const dialogMessage = {
        message: message,
        isError: isError,
    };

    this.$store.commit(SET_DIALOG_MESSAGE, { dialogMessage });
}

export const getters = {
    getUser: (state) => {
        try {
            const userLocalStorage = jsonParse(localStorage.getItem('userLogin'));
            const user = state?.user;
            return user ? user : userLocalStorage;
        } catch (error) {
            return null;
        }
    },
    getUsers: (state) => {
        return state.users;
    },
    getDialogMessage: (state) => {
        return state.dialogMessage;
    },
    isOpenDialogSignup: (state) => {
        return state.isOpenDialogSignup;
    },
    getAoNuoi: (state) => {
        return state.aoNuoi;
    },
    getVungNuoi: (state) => {
        return state.vungNuoi;
    },
    getCountToShowIconLoading: (state) => {
        return state.countToShowIconLoading;
    },
    getListTraiNuois: (state) => {
        return state.listTraiNuois;
    },
    // getUser: () => {
    //     return localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null;
    // },
};
