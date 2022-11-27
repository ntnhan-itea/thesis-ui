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
        <v-form>
            <v-container class="container-more-info" v-show="selectTraiNuoi">
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="this.squareVungNuois"
                            :label="this.labelVungNuois"
                            disabled
                            class="more-info-trai-nuoi"
                            clearable
                        ></v-text-field>
                        <v-text-field
                            v-model="this.squareAoNuois"
                            disabled
                            :label="this.labelAoNuois"
                            class="more-info-trai-nuoi"
                            clearable
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as turf from "@turf/turf";

export default {
    name: "ThesisFilter",

    data() {
        return {
            traiNuoiItems: [],
            selectTraiNuoi: null,
            vungNuois: 0,
            labelVungNuois: "",
            squareVungNuois: 0,
            labelAoNuois: "",
            squareAoNuois: 0,
        };
    },

    mounted() {
        if (this.getOptionShowMapBoxTraiNuoi) {
            if (this.getOptionShowMapBoxTraiNuoi.isShow) {
                this.selectTraiNuoi = this.getListTraiNuois.find(
                    (e) => e.id === this.getOptionShowMapBoxTraiNuoi.traiNuoiId,
                );

                this.renderMapBaseOneOption();
                // this.$store.commit(SET_OPTION_SHOW_MAP_TRAI_NUOI, {
                //     isShow: false,
                //     traiNuoiId: traiNuoiId,
                // });
            }
        }
    },

    computed: {
        ...mapGetters({
            getListTraiNuois: "getListTraiNuois",
            getOptionShowMapBoxTraiNuoi: "getOptionShowMapBoxTraiNuoi",
        }),
    },

    methods: {
        renderMapBaseOneOption() {
            this.$emit("renderMapOfTraiNuoi", this.selectTraiNuoi);
            this.sumSquare(this.selectTraiNuoi);
        },

        sumSquare(traiNuoi) {
            if (!traiNuoi) {
                return;
            }

            this.squareOfVungNuois(traiNuoi);

            this.squareOfAoNuois(traiNuoi);
        },

        squareOfVungNuois(traiNuoi) {
            try {
                const vungNuoiPoints = traiNuoi.vungNuois
                    .filter((e) => e?.listOfPoint)
                    .map((e) => e.listOfPoint.map((e) => e.coordinates));

                this.squareVungNuois = 0;
                const sizeOfVungNuois = vungNuoiPoints.length || 0;
                this.labelVungNuois = `Tổng diện tích ${sizeOfVungNuois} vùng nuôi (km^2)`;
                vungNuoiPoints.forEach((e) => {
                    this.squareVungNuois += this.squareOfArea([e]);
                });
                const roundVungNuois = this.squareVungNuois.toFixed(3);
                this.squareVungNuois = roundVungNuois;
            } catch (error) {
                console.log({ error });
                this.labelVungNuois = `Tổng diện tích 0 vùng nuôi (km^2)`;
                this.squareVungNuois = 0;
            }
        },

        squareOfAoNuois(traiNuoi) {
            try {
                const aoNuoiPoints = traiNuoi.vungNuois
                    .filter((vungNuoi) => vungNuoi?.aoNuois)
                    .map((vungNuoi) =>
                        vungNuoi.aoNuois
                            .filter((aoNuoi) => aoNuoi?.listOfPoint)
                            .map((aoNuoi) =>
                                aoNuoi.listOfPoint.map(
                                    (point) => point.coordinates,
                                ),
                            ),
                    );

                let aoNuoiPointsResult = [];
                aoNuoiPoints.forEach(
                    (e) => (aoNuoiPointsResult = [...aoNuoiPointsResult, ...e]),
                );

                this.squareAoNuois = 0;
                const sizeOfAoNuois = aoNuoiPointsResult.length || 0;
                this.labelAoNuois = `Tổng diện tích ${sizeOfAoNuois} ao nuôi (km^2)`;
                aoNuoiPointsResult.forEach((e) => {
                    this.squareAoNuois += this.squareOfArea([e]);
                });
                const roundAoNuois = this.squareAoNuois.toFixed(3);
                this.squareAoNuois = roundAoNuois;
            } catch (error) {
                console.log({ error });
                this.labelAoNuois = `Tổng diện tích 0 ao nuôi (km^2)`;
                this.squareAoNuois = 0;
            }
        },

        squareOfArea(coordinates) {
            const geometry = turf.polygon(coordinates) || 0;
            const square = turf.area(geometry) || 0;
            const convertMeterToKilometerSquare = square / 1000000;

            return convertMeterToKilometerSquare;
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

    .more-info-trai-nuoi
        padding: 5px 0 !important
        margin: 0 !important
        .v-text-field__details
            display: none
</style>
