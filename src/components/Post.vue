<template>
    <div class="d-flex mb-1 p-4">
        <img class="avatar me-3" :src="post.creator.picture" :alt="post.creator.name">
        <div>
            <h4> {{ post.creator.name }} 
                <span>
                    <i v-if="post.creator.graduated" title="Graduate" class="tooltip-container mdi mdi-school">
                        <span class="tagtooltip">Graduate</span>
                    </i>
                    <i v-else title="Student" class="tooltip-container mdi mdi-pencil">
                        <span class="tagtooltip">Student</span>
                    </i>
                </span>
            </h4>
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
</template>

<script>
import { computed } from 'vue';
import { Post } from '../models/Post';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';

export default {
    props: {
        post: {type: Post, required: true}
    },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            async deletePost() {
                const result = await Pop.confirm("Are you sure you want to delete this post?","","Yes, delete it.")
                if (result)
                    postsService.deletePost(props.post)
            },
            setActivePost(){
                postsService.setActivePost(props.post)
            }
        }
    }
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
  object-fit: cover;
  max-height: 60dvh;
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

</style>