<template>
  <div class="main-section">
    <div class="row m-0">
      <div class="col-10">
      </div>
      <div v-for="post in posts" ref="postsElem" :key="post.id" class="post col-10 p-0 my-4 mx-auto">
        <Post :post="post"/>
      </div>
      <div class="col-10 d-flex justify-content-between mx-auto mb-3">
        <button @click="getPrevPosts" :disabled="!prevPosts"><i class=" mdi mdi-menu-left"></i>Older</button>
        <button @click="getNextPosts" :disabled="!nextPosts">Newer<i class="mdi mdi-menu-right"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService.js'
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import Post from '../components/Post.vue';
import { logger } from '../utils/Logger';

export default {

  setup() {

    const postsElem = ref(null)
    const getPosts = async() => {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    const getNextPosts = async() => {
      try {
        await postsService.getNextPosts()
        logger.log(postsElem.value)
        postsElem.value.scrollTop = 0
      } catch (error) {
        Pop.error(error.message)
      }
    }

    const getPrevPosts = async() => {
      try {
        await postsService.getPrevPosts()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getPosts()
    })

    return {
      posts: computed(() => AppState.posts),
      nextPosts: computed(() => AppState.nextPosts),
      prevPosts: computed(() => AppState.prevPosts),
      postsElem,
      getNextPosts,
      getPrevPosts
    } 
  },
  components: { Post }
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
