<template>
    <div class="main-section">
        <div v-if="profiles" class="row m-0">
            <div class="profile-container d-flex justify-content-center col-10 mx-auto mt-4 mb-3 ">
                <h2 class="p-3">User Results for "{{ route.query.search }}"</h2>
            </div>
            <div v-for="profile in profiles" :key="profile.id" class="profile-container col-10 p-0 my-2 mx-auto">
                <div class="d-flex p-3">
                    <RouterLink :to="{name: 'Profile', params: {profileId: profile.id}}">
                        <img class="avatar me-3" :src="profile.picture" :alt="profile.name">
                    </RouterLink>
                    <div class="my-auto">
                        <h4 class="m-0">{{ profile.class }}</h4>
                        <RouterLink :to="{name: 'Profile', params: {profileId: profile.id}}"><h3 class="m-0">{{ profile.name }}</h3></RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { profilesService } from '../services/ProfilesServce';
import { AppState } from '../AppState';
import { RouterLink } from 'vue-router';

export default {
    setup() {
        onBeforeRouteUpdate((to) => {
            if(!to.query.search) {
                return false
            }
        })

        const route = useRoute()
        const getProfilesByQuery = async() => {
            await profilesService.getProfilesByQuery(route.query.search)
        }

        watch(route, () => {
            getProfilesByQuery()
        })

        onMounted(() => {
            getProfilesByQuery()
        })

        onUnmounted(() => {
            profilesService.clearProfiles()
        })

        return {
            route,
            profiles: computed(() => AppState.profiles)
        }
    }, components: { RouterLink }
}
</script>

<style lang="scss" scoped>

@import "../assets/scss/main.scss";
.main-section {
  height: 100%;
  width: 75%;
  overflow-y: scroll;
}

.profile-container {
    color: $text;
    background-color: $secondary;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.699);
}

.avatar {
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
}

h3 {
    color: $text;
    transition: 0.15s all ease;
}

h3:hover {
    color: $primary;
}

</style>