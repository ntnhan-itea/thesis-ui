<template>
    <div>
        <v-container>
            <data-table />
        </v-container>

        <!-- <v-snackbar
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
        </v-snackbar> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DataTable from './DataTable.vue';

export default {
    name: 'HomePage',
    components: {
        DataTable,
    },

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
            console.log("this.getDialogMessage: ", this.getDialogMessage);
            this.responseSnackBarMessage = this.getDialogMessage?.message;
            if(this.responseSnackBarMessage) {
                this.isShowDialog = true;
                const isError = this.getDialogMessage?.isError;
                if(isError) {
                    this.responseSnackBarColor = 'red';
                } else {
                    this.responseSnackBarColor = 'green';
                }
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
