import {
    getAllEntries,
    login,
    getAllUsers,
    signupAdminUser,
    getAoNuoiById,
    getVungById,
} from "../services/ThesisService";

import {
    SET_USER,
    SET_ALL_USERS,
    SET_DIALOG_MESSAGE,
    SET_AO_NUOI,
    SET_VUNG_NUOI,
} from "./mutation-types";

function showErrorMessage(commit, error) {
    console.error({ error });
    const message = error?.response?.data?.message || "Unknown error message";
    console.error({ message });

    showDialogMessage(commit, message, true);
}

function showDialogMessage(commit, message, isError) {
    const dialogMessage = {
        message: message,
        isError: isError,
    };

    commit(SET_DIALOG_MESSAGE, { dialogMessage });
}

export const actions = {
    async getAllEntriesAsync() {
        try {
            const responseAllEntities = await getAllEntries();

            console.table({ responseAllEntities });
        } catch (error) {
            showErrorMessage(error);
        }
    },

    async loginAsync({ commit }, payload) {
        try {
            const response = await login(payload.user);
            let userData = response?.data;
            userData.password = payload.user.password;
            const userJson = JSON.stringify(userData);
            let user = JSON.parse(userJson);

            commit(SET_USER, { user: user });
            localStorage.setItem("userLogin", userJson);
            showDialogMessage(commit, "Log in successfully", false);
        } catch (error) {
            showErrorMessage(commit, error);
        }
    },

    async signupAdminUserAsync({ commit }, user) {
        try {
            const response = await signupAdminUser(user);
            const userCreated = response.data;

            const userJson = JSON.stringify(userCreated);
            const userObject = JSON.parse(userJson);
            commit(SET_USER, { user: userObject });
            localStorage.setItem("userLogin", userJson);

            const message =
                "Registered [" + userCreated.username + "] successfully";
            showDialogMessage(commit, message, false);
        } catch (error) {
            showErrorMessage(commit, error);
        }
    },

    async getAllUsersAsync({ commit }) {
        try {
            const response = await getAllUsers();
            const users = response.data;
            commit(SET_ALL_USERS, { users: users });
        } catch (error) {
            showErrorMessage(commit, error);
        }
    },

    async getAoNuoiByIdAsync({ commit }, payload) {
        try {
            const response = await getAoNuoiById(
                payload.aoNuoiId,
                payload.user,
            );
            const aoNuoi = response.data;
            commit(SET_AO_NUOI, aoNuoi);
        } catch (error) {
            showErrorMessage(commit, error);
        }
    },

    async getVungNuoiByIdAsync({ commit }, payload) {
        try {
            const response = await getVungById(
                payload.vungNuoiId,
                payload.user,
            );
            const vungNuoi = response.data;
            console.log({vungNuoi});
            commit(SET_VUNG_NUOI, vungNuoi);
        } catch (error) {
            showErrorMessage(commit, error);
        }
    },
};
