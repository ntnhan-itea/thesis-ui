<template>
    <div class="thesis-filter">
        <p class="thesis-filter__title">Tìm Trại Nuôi</p>
        <v-container fluid>
            <!-- <span>By status</span> -->
            <v-combobox
                class="thesis-filter__item--hierarchy"
                v-model="selectTraiNuoi"
                :items="getListTraiNuois"
                item-text="tenTraiNuoi"
                item-value="id"
                label="Trại Nuôi"
                v-on:change="renderMapBaseOneOption"
                return-object
            ></v-combobox>
        </v-container>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "ThesisFilter",

    data() {
        return {
            traiNuoiItems: [],
            selectTraiNuoi: null,
        };
    },

    mounted() {},

    computed: {
        ...mapGetters({
            getListTraiNuois: "getListTraiNuois",
        }),
    },

    methods: {
        renderMapBaseOneOption() {
            console.log("this.selectTraiNuoi: ", this.selectTraiNuoi);
            this.$emit("renderMapOfTraiNuoi", this.selectTraiNuoi);
        },
    },
};
</script>

<style lang="sass">
.thesis-filter
    position: absolute
    top: 61px
    right: -12px
    // width: calc(100% - 80% - 7%)
    background-color: #c1c1c1
    padding: 10px
    margin-right: calc(3% - 16px)
</style>
