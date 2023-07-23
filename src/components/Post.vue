<template>
    <div class="d-flex mb-1 p-4">
        <RouterLink :to="{name: 'Profile', params: {profileId: post.creator.id}}">
            <img class="avatar me-3" :src="post.creator.picture" :alt="post.creator.name">
        </RouterLink>
        <div>
            <div class="d-flex align-items-center">
                <RouterLink :to="{name: 'Profile', params: {profileId: post.creator.id}}">
                    <h4 class="me-2"> {{ post.creator.name }} </h4>
                </RouterLink>
                <span>
                    <i v-if="post.creator.graduated" title="Graduate" class="fs-4 tooltip-container mdi mdi-school">
                        <span class="tagtooltip">Graduate</span>
                    </i>
                    <i v-else title="Student" class="fs-4 tooltip-container mdi mdi-pencil">
                        <span class="tagtooltip">Student</span>
                    </i>
                </span>
            </div>
            <h5> {{ `${post.createdAt.toDateString()} ${post.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` }}</h5>
        </div>
        <div v-if="post.creator._id == account.id" class="dropdown-center ms-auto mb-auto">
            <i class="fs-3 mdi mdi-dots-horizontal" role="button" data-bs-toggle="dropdown"></i>
            <ul class="dropdown-menu" data-bs-theme="dark" >
                <li @click="setActivePost" data-bs-toggle="modal" data-bs-target="#editModal" class="dropdown-item fs-5"><i class="mdi mdi-pencil-outline me-1"></i>Edit Post</li>
                <li @click="deletePost" class="dropdown-item fs-5"><i class="mdi mdi-trash-can me-1"></i>Delete Post</li>
            </ul>
        </div>
    </div>  
        <p class="px-4 mb-4 fs-5">
        {{ post.body }}
        </p>
    <div v-if="post.imgUrl" class="img-container">
        <img :src="post.imgUrl">
    </div>
    <div class="d-flex justify-content-end align-items-center py-2 px-3">
        <label v-if="account.id" class="rating-switch">
            <input @change="toggleLike" v-model="checked" type="checkbox"/>
            <span class="like-toggle"><i class="fs-1 mdi mdi-heart"></i></span>
        </label>
        <div v-else>
            <i class="like-icon my-auto fs-1 mdi mdi-heart"></i>
        </div>
        <span class="ms-2 fs-2">{{ post.likeIds.length }}</span>
    </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { Post } from '../models/Post';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import { RouterLink } from 'vue-router';

export default {
    props: {
        post: {type: Post, required: true}
    },
    setup(props) {

        const checked =  ref(false)
        const account = computed(() => AppState.account)

        const checkIfLiked = () => {
            checked.value = props.post.likeIds.includes(account.value.id)
        }

        watchEffect(() => {
            if (account.value.id)
                checkIfLiked()
        })

        return {
            account,
            checked,
            async deletePost() {
                const result = await Pop.confirm("Are you sure you want to delete this post?","","Yes, delete it.")
                if (result)
                    postsService.deletePost(props.post)
            },
            setActivePost(){
                postsService.setActivePost(props.post)
            },
            async toggleLike(){
                postsService.toggleLike(props.post)
            }
        }
    }, 
    components:{ RouterLink }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.avatar {
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
}
.img-container img {
  object-fit:fill;
  max-height: 75dvh;
  width: 100%;
}

.dropdown-menu {
    color: $text;
    background-color: $secondary;
}

.dropdown-item {
    color: $text;
    transition: all 0.25s ease;
    padding: 0.5rem 1rem;
    cursor: pointer;
}
.dropdown-item:hover {
    background-color: $primary;
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

h4 {
    color: $text;
    transition: all 0.25s ease;
}

h4:hover {
    color: $primary;
}

.rating-switch {
    position: relative;
}

.rating-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.like-toggle {
    position: absolute;
    cursor: pointer;
    right: 0;
    bottom: -20px;
    transition: all 0.2s ease;
}

.like-toggle i{
    color: $secondary;
    -webkit-text-stroke: $text 2px;
    transition: all 0.25s ease;
    text-shadow: 0 2px 10px black;
}

.like-toggle:hover i{
    color: $primary;
}

input:checked+.like-toggle i {
    color: $primary;
}

.like-icon {
    color: $primary;
    text-shadow: 0 2px 10px black;
}

</style>