<template>
    <div>
        <router-view></router-view>
        <v-snackbar
            style="z-index: 9999; text-align: center"
            :color="responseSnackBarColor"
            top
            centered
            timeout="3000"
            class="response-snackbar"
            v-model="isShowDialog"
            :multi-line="true"
        >
            {{ responseSnackBarMessage }}
        </v-snackbar>

        <v-dialog
            v-model="this.showDialogConfirmSignup"
            max-width="350"
            persistent
        >
            <v-card>
                <v-card-title class="text-h5">
                    Register new account ?
                </v-card-title>

                <v-card-text> username: {{ this.newUsername }} </v-card-text>
                <v-card-text> password: {{ this.newPassword }} </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="grey darken-1"
                        text
                        @click="closeConfirmDialog()"
                    >
                        Cancel
                    </v-btn>

                    <v-btn color="blue darken-1" text @click="signupAccount()">
                        Sign up
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
    SET_OPEN_DIALOG_CONFIRM_SIGN_UP,
    SET_DIALOG_MESSAGE,
} from "../store/mutation-types";

export default {
    name: "MasterPage",
    components: {},

    data: () => ({
        responseSnackBarColor: "green",
        isShowDialog: false,
        responseSnackBarMessage: "test message",
        showDialogConfirmSignup: false,
        user: {
            username: null,
            password: null,
        },
        newUser: {
            username: null,
            password: null,
        },
        newUsername: "Wrong username",
        newPassword: "Wrong password",
    }),

    created() {
        // this.$store.dispatch("getAllEntriesAsync");
    },

    watch: {
        getDialogMessage() {
            this.responseSnackBarMessage =
                this.getDialogMessage.message || null;
            if (this.responseSnackBarMessage) {
                const isError = this.getDialogMessage.isError || false;
                if (isError) {
                    this.responseSnackBarColor = "red";
                } else {
                    this.responseSnackBarColor = "green";
                }
                this.isShowDialog = true;
            }
        },

        isOpenDialogSignup() {
            this.showDialogConfirmSignup = this.isOpenDialogSignup || false;
        },
    },

    computed: {
        ...mapGetters({
            getUser: "getUser",
            getDialogMessage: "getDialogMessage",
            isOpenDialogSignup: "isOpenDialogSignup",
        }),
    },

    mounted() {
        this.$root.$on("OpenSignupConfirm", (user) => {
            this.newUser = this.getIsValidAccount(user);
            this.newUsername = this.newUser?.username || "Wrong username";
            this.newPassword = this.newUser?.password || "Wrong password";
        });
    },

    methods: {
        closeConfirmDialog() {
            this.$store.commit(SET_OPEN_DIALOG_CONFIRM_SIGN_UP, {
                isOpenDialogSignup: false,
            });
        },

        signupAccount() {
            console.log("Starting signup new account ...");
            this.closeConfirmDialog();
            console.log("Ended signup new account!");
        },

        parseToObject(object) {
            try {
                return JSON.parse(JSON.stringify(object));
            } catch (error) {
                return null;
            }
        },

        getIsValidAccount(account) {
            const user = this.parseToObject(account);
            const isValidUsername = this.isNotBlankString(user.username);
            const isValidPassword = this.isNotBlankString(user.password);
            const isValidAccount = user && isValidUsername && isValidPassword;
            return isValidAccount ? user : null;
        },

        showDialogMessage(message, isError) {
            const msg = message || "Unknown error message";

            const dialogMessage = {
                message: msg,
                isError: isError,
            };

            this.$store.commit(SET_DIALOG_MESSAGE, { dialogMessage });
        },

        isNotBlankString(valueString) {
            try {
                return valueString && valueString.trim() !== "";
            } catch (error) {
                return false;
            }
        },
    },
};
</script>

<style lang="sass">

.response-snackbar
  .v-snack__content
    text-align: center !important
    font-size: 1rem !important
</style>
