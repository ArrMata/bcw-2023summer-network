<template>
  <div v-if="posts" ref="postsElem" class="main-section">
    <div class="row m-0">
      <div v-if="account.id" class="col-10 p-0 mt-4 mx-auto">
        <form class="post-form" @submit.prevent="">
          <div class="d-flex align-items-start">
            <img class="avatar" :src="account.picture" :alt="account.name"/>
            <div class="px-3 w-100">
              <div class="mb-3">
                <textarea class="form-control" name="" id="" rows="3" placeholder="Share something!"></textarea>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><i class="mdi mdi-plus-box-multiple"></i></span>
                <input type="url" class="form-control" placeholder="Photo/Video">
                <button>Post <i class="mdi mdi-send-variant"></i></button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div v-for="post in posts" :key="post.id" class="post col-10 p-0 my-4 mx-auto">
        <Post :post="post"/>
      </div>
      <div class="col-10 d-flex justify-content-between mx-auto mb-3">
        <button @click="getPrevPosts" :disabled="!prevPosts"><i class=" mdi mdi-menu-left"></i>Older</button>
        <button @click="getNextPosts" :disabled="!nextPosts">Newer<i class="mdi mdi-menu-right"></i></button>
      </div>
    </div>
  </div>
  <div v-else class="main-section">
    <div class="row m-0">
      <div class="col-10 placeholder placeholder-glow mx-auto">
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
        postsElem.value.scrollTo({top:0, behavior:"smooth"})
      } catch (error) {
        Pop.error(error.message)
      }
    }

    const getPrevPosts = async() => {
      try {
        await postsService.getPrevPosts()
        postsElem.value.scrollTo({top:0, behavior:"smooth"})
      } catch (error) {
        Pop.error(error.message)
      }
    }

    

    onMounted(() => {
      logger.log('mounted, getting posts')
      getPosts()
    })

    return {
      account: computed(() => AppState.account),
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

.avatar {
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
}

.post {
  color: $text;
  background-color: $secondary;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.699);
}

.post-form {
  color: $text;
  background-color: $secondary;
  padding: 1rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.699);
}

.post-form textarea {
  width: 100%;
  resize: none;
  background-color: $background;
  color: $text;
}
.post-form textarea:focus {
  background-color: $background;
  color: $text;
}
input[type="url"] {
  background-color: $background;
  color: $text;
}

input[type="url"]:focus {
  background-color: $background;
  color: $text;
}

.input-group-text {
  background-color: $primary;
  color: $text;
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
