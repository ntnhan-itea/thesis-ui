<template>
    <div v-if="this.isReadyDataToShow">
        <v-data-table
            :headers="headers"
            :items="this.getListTraiNuois"
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

            <!-- <template v-slot:header="{  headers  }">
                <thead>
                    <tr class="testtttttttttttt">
                        <th v-for="item in headers" :key="item.value">
                            {{ item.text }}asd
                        </th>
                    </tr>
                </thead>
            </template> -->

            <template v-slot:body="{ items }">
                <tbody>
                    <tr
                        v-for="item in items"
                        :key="item.name"
                        class="body-table-row"
                    >
                        <td>{{ item.tenTraiNuoi }}</td>
                        <td>{{ item.dienThoai }}</td>
                        <td>{{ item.hinhThucNuoi }}</td>
                        <td>{{ item.doiTuongNuoi }}</td>
                        <td>{{ item.dienTichNuoi }}</td>
                        <td>{{ item.diaChi }}</td>
                        <td
                            class="custom-class-pointer"
                            @click="redirectToMapBox('Mapbox', item.id)"
                        >
                            <iconify-icon
                                icon="material-symbols:map-outline-sharp"
                            ></iconify-icon>
                        </td>
                    </tr>
                </tbody>
            </template>

            <template v-slot:no-data> NO DATA HERE! </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_OPTION_SHOW_MAP_TRAI_NUOI } from "../store/mutation-types";

export default {
    name: "DataTable",

    data() {
        return {
            search: "",
            calories: "",
            traiNuoiItems: null,
        };
    },

    computed: {
        ...mapGetters({
            getUsers: "getUsers",
            getListTraiNuois: "getListTraiNuois",
        }),

        isReadyDataToShow() {
            return this.getListTraiNuois && this.getListTraiNuois.length > 0;
        },

        headers() {
            return [
                {
                    text: "Tên trại nuôi",
                    align: "start",
                    sortable: true,
                    value: "tenTraiNuoi",
                },
                {
                    text: "Số điện thoại",
                    value: "dienThoai",
                },
                { text: "Hình Thức Nuôi", value: "hinhThucNuoi" },
                { text: "Đối tượng nuôi", value: "doiTuongNuoi" },
                { text: "Diện tích nuôi", value: "dienTichNuoi" },
                { text: "Địa chỉ", value: "diaChi" },
                { text: "Map" },
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
                typeof value === "string" &&
                value
                    .toString()
                    .toLocaleLowerCase()
                    .indexOf(search.toLocaleLowerCase()) !== -1
            );
        },

        handleRouting: function (routingName) {
            if (routingName == this.$route.name) return;
            this.$router.push({ name: routingName });
        },

        redirectToMapBox(routingName, traiNuoiId) {
            this.handleRouting(routingName);
            this.$root.$emit("handleClickMenuHeader");

            this.$store.commit(SET_OPTION_SHOW_MAP_TRAI_NUOI, {
                isShow: true,
                traiNuoiId: traiNuoiId,
            });
            // this.$root.$emit("handleShowMapBaseOnTraiNuoiId", traiNuoiId);
        },
    },
};
</script>

<style lang="sass">
.custom-class-pointer
    cursor: pointer
</style>
