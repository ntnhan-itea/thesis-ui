<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="getUsers"
            item-key="name"
            class="elevation-1"
            :search="search"
            :custom-filter="filterOnlyCapsText"
        >
            <template v-slot:top>
                <v-text-field
                    v-model="search"
                    label="Search"
                    class="mx-4"
                ></v-text-field>
            </template>
            <template>
                <tr>
                    <td></td>
                    <td>
                        <!-- <v-text-field
                            v-model="calories"
                            type="number"
                            label="Less than"
                        ></v-text-field> -->
                    </td>
                    <td colspan="4"></td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'DataTable',

    data() {
        return {
            search: '',
            calories: '',
        };
    },

    computed: {
        ...mapGetters({
            getUsers: 'getUsers',
        }),
        headers() {
            return [
                {
                    text: 'Full Name',
                    align: 'start',
                    sortable: false,
                    value: 'fullName',
                },
                {
                    text: 'username',
                    value: 'username',
                    // filter: (value) => {
                    //     if (!this.calories) return true;

                    //     return value < parseInt(this.calories);
                    // },
                },
                { text: 'Gender', value: 'gender' },
                { text: 'So Dien Thoai', value: 'soDienThoai' },
                { text: 'Ten Trai Nuoi', value: 'tenTraiNuoi' },
                { text: 'Dia Chi', value: 'diaChi' },
            ];
        },
    },

    mounted() {
        this.$store.dispatch("getAllUsersAsync");
    },

    methods: {
        filterOnlyCapsText(value, search) {
            return (
                value != null &&
                search != null &&
                typeof value === 'string' &&
                value
                    .toString()
                    .toLocaleLowerCase()
                    .indexOf(search.toLocaleLowerCase()) !== -1
            );
        },
    },
};
</script>

<style></style>
