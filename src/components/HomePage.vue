<template>
    <v-container>
        <data-table/>
    </v-container>
</template>

<script>

import { mapGetters } from 'vuex';
import DataTable from "./DataTable.vue";

export default {
    name: 'HomePage',
    components: {
        DataTable,
    },

    created() {
        // this.$store.dispatch("getAllEntriesAsync");
    },

    computed: {
        ...mapGetters({
            getUser: 'getUser',
        }),
    },

    mounted() {
        // if (this.getUser && this.getUser.fullName) {
        //     this.fullName = this.getUser.fullName;
        // }
        console.log( "USER: ",this.getUser);
    },

    data: () => ({
        
    }),
};
</script>
