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
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'MasterPage',
    components: {},

    data: () => ({
        responseSnackBarColor: 'green',
        isShowDialog: false,
        responseSnackBarMessage: 'test message',
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
                    this.responseSnackBarColor = 'red';
                } else {
                    this.responseSnackBarColor = 'green';
                }
                this.isShowDialog = true;
            }
        },
    },

    computed: {
        ...mapGetters({
            getUser: 'getUser',
            getDialogMessage: 'getDialogMessage',
        }),
    },

    mounted() {
        // if (this.getUser && this.getUser.fullName) {
        //     this.fullName = this.getUser.fullName;
        // }
        // console.log('USER: ', this.getUser);
    },
};
</script>

<style lang="sass">

.response-snackbar
  .v-snack__content
    text-align: center !important
    font-size: 1rem !important
</style>
