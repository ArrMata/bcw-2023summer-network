<template>
  <div v-if="posts" ref="postsElem" class="main-section">
    <div class="row m-0">
      <div v-if="account.id" class="col-10 p-0 mt-4 mx-auto">
        <PostForm />
      </div>
      <div v-for="post in posts" :key="post.id" class="post col-10 p-0 my-4 mx-auto">
        <Post :post="post"/>
      </div>
      <div v-if="posts.length > 1" class="col-10 d-flex justify-content-between mx-auto mb-3">
        <button @click="getPrevPosts" :disabled="!prevPosts"><i class=" mdi mdi-menu-left"></i>Newer</button>
        <button @click="getNextPosts" :disabled="!nextPosts">Older<i class="mdi mdi-menu-right"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import { postsService } from '../services/PostsService.js'
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import Post from '../components/Post.vue';
import PostForm from '../components/PostForm.vue';

export default {
  setup() {

    const postsElem = ref(null)
    const getPosts = async() => {
      await postsService.getPosts()
    }

    onMounted(() => {
      getPosts()
    })

    onMounted(() => {
      postsService.clearPosts()
    })

    return {
      account: computed(() => AppState.account),
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
  components: { Post, PostForm }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/main.scss";
.main-section {
  height: 100%;
  width: 75%;
  overflow-y: scroll;
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
