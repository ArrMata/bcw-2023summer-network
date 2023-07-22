<template>
    <div v-if="ads" class="ad-section">
        <h3 class="mb-0 mt-4">Thank you to our sponsors!</h3>
        <div class="ad-imgs">
            <a v-for="ad in ads" :key="ad.title" :href="ad.linkURL">
                <img class="w-75" :src="ad.square"  :alt="ad.title">
            </a>
        </div>
    </div>
</template>

<script>
import Pop from '../utils/Pop';
import {adsService} from '../services/AdsService.js'
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';

export default {
    setup() {
        const getAds = async() => {
            try {
                await adsService.getAds()
            } catch (error) {
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            getAds()
        })

        return {
            ads: computed(() => AppState.ads)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.ad-section{
    height: 100%;
    width: 25%;
    background-color: $secondary;
    color: $text;
    text-align: center;
    box-shadow: 0px 0px 5px rgb(0, 0, 0);
    position: relative;
    z-index: 1;
}

.ad-section h3{
    font-weight: 300;
    font-size: 1.25rem;
    margin: 0.5rem 0;
    height: 5%;
}

.ad-imgs {
    display: flex;
    flex-direction: column;
    justify-content:space-evenly; 
    align-items: center; 
    height: 85%;
}

</style>