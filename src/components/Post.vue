<template>
    <div class="d-flex mb-1 p-4">
        <img class="avatar me-3" :src="post.creator.picture" :alt="post.creator.name">
        <div>
            <h4> {{ post.creator.name }}</h4>
            <h5> {{ `${post.createdAt.toDateString()} ${post.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` }}</h5>
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
import { Post } from '../models/Post';

export default {
    props: {
        post: {type: Post, required: true}
    },
    setup() {
        return {}
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

</style>