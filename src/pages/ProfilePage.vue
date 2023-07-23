<template>
    <div ref="postsElem" class="main-section">
        <div class="row m-0">
            <div v-if="activeProfile" class="profile-container col-10 p-0 mt-4 mx-auto">
                <div class="row">
                    <div class="col-12 mb-3 position-relative">
                        <img class="img-fluid cover-img" :src="activeProfile.coverImg" alt="Cover Image">
                        <img class="avatar" :src="activeProfile.picture" :alt="activeProfile.name">
                    </div>
                    <div class="col-12 py-5 px-4">
                        <div class="d-flex justify-content-between align-items-end">
                            <h5 v-if="activeProfile.class">Class of {{ activeProfile.class }}</h5>
                            <div class="ms-auto d-flex justify-content-center">
                                <a class="link" v-if="activeProfile.github" title="Github" :href="activeProfile.github">
                                    <i class="mdi mdi-github fs-1"></i>
                                </a>
                                <a class="link" v-if="activeProfile.linkedin" title="LinkedIn" :href="activeProfile.linkedin">
                                    <i class="mdi mdi-linkedin fs-1"></i>
                                </a>
                                <a class="link" v-if="activeProfile.resume" title="Resume" :href="activeProfile.resume">
                                    <i class="mdi mdi-file-document fs-1"></i>
                                </a>
                            </div>
                        </div>
                        <h2>{{ activeProfile.name }}
                            <span>
                                <i v-if="activeProfile.graduated" title="Graduate" class="fs-4 tooltip-container mdi mdi-school">
                                    <span class="tagtooltip">Graduate</span>
                                </i>
                                <i v-else title="Student" class="fs-4 tooltip-container mdi mdi-pencil">
                                    <span class="tagtooltip">Student</span>
                                </i>
                            </span>
                        </h2>
                        <i>{{ activeProfile.bio }}</i>
                    </div>
                </div>
            </div>
            <div v-else class="profile-container col-10 p-0 mt-4 mx-auto">
                <div class="row">
                    <div class="col-12 position-relative">
                        <img class="img-fluid cover-img placeholder placeholder-glow">
                        <img class="avatar placeholder-glow placeholder">
                    </div>
                    <div class="col-12 py-5 px-4">
                        <h5 class="col-5 placeholder placeholder-glow"></h5>
                        <h2 class="col-8 placeholder placeholder-glow"></h2>
                    </div>
                </div>
            </div>
            <div v-if="account.id == route.params.profileId" class="col-10 p-0 mt-4 mx-auto">
                <PostForm />
            </div>
            <div v-for="post in posts" :key="post.id" class="post col-10 p-0 my-4 mx-auto">
                <Post :post="post"/>
            </div>
            <div v-if="posts.length > 0" class="col-10 d-flex justify-content-between mx-auto mb-3">
                <button @click="getPrevPosts" :disabled="!prevPosts"><i class=" mdi mdi-menu-left"></i>Newer</button>
                <button @click="getNextPosts" :disabled="!nextPosts">Older<i class="mdi mdi-menu-right"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import PostForm from '../components/PostForm.vue';
import Post from '../components/Post.vue';
import { AppState } from '../AppState';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { profilesService } from '../services/ProfilesServce';
import Pop from '../utils/Pop';
import { api } from '../services/AxiosService';
import { postsService } from '../services/PostsService';
export default {
    setup() {
        onBeforeRouteUpdate(async(to) => {
            try {
                const profileId = to.params.profileId
                await api.get(`api/profiles/${profileId}`)
            }
            catch (error) {
                Pop.error('That user does not exist!')
                return { name: 'UserNotFound' }
            }
        })

        const route = useRoute()
        const getProfile = async() => {
            await profilesService.getProfile(route.params.profileId)
        }

        const getProfilePosts = async() => {
            await postsService.getProfilePosts()
        }

        onMounted(async() => {
            await getProfile()
            getProfilePosts()
        })

        onUnmounted(() => {
            postsService.clearPosts()
        })

        const postsElem = ref(null)

        return {
            route,
            account: computed(() => AppState.account),
            activeProfile: computed(() => AppState.activeProfile),
            posts: computed(() => AppState.posts),
            nextPosts: computed(() => AppState.nextPosts),
            prevPosts: computed(() => AppState.prevPosts),
            postsElem,
            async getNextPosts() {
                await postsService.getNextPosts()
                postsElem.value.scrollTo({top:0, behavior:"smooth"})
            },
            async getPrevPosts() {
                await postsService.getPrevPosts()
            }
        }
    },
    components: { PostForm, Post }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.main-section {
  height: 100%;
  width: 75%;
  overflow-y: scroll;
}

.cover-img {
    height: 15rem;
    width: 100%;
    object-fit: cover;
    object-position:center;
}

.avatar {
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
    position: absolute;
    border: 2px solid rgb(255, 255, 255);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.699);
    bottom: -15%;
    left: 5%;
}

.profile-container {
    color: $text;
    background-color: $secondary;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.699);
}

.tooltip-container {
    display: inline-block;
    position: relative;
}

.tooltip-container .tagtooltip {
    visibility: hidden;
    opacity: 0;
    transition: 0.2s all ease;
    background-color: $primary;
    color: $text;
    font-style: normal;
    border-radius: 5px;
    padding: 0.1rem 0.75rem;

    bottom: 100%;
    left: 50%;
    position: absolute;
    z-index: 1;
}

.tooltip-container:hover .tagtooltip {
    visibility:visible;
    opacity: 1;
}

.link {
    margin: 0 0.25rem;
    color: $primary;
    transition: 0.25s all ease;
}

.link:hover {
    transform: translateY(-5px)
}

.post {
    color: $text;
    background-color: $secondary;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.699);
}

button {
    border: none;
    background-color: $primary;
    padding: 0.25rem 0.5rem;
    color: $text;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    transition: all 0.15s ease;
}

button:hover:enabled {
    transform: translateY(-3px);
    cursor: pointer;
}

button:disabled {
    user-select: none;
    background-color: $secondary;
}

button i {
  font-size: 1.25;
}

</style>