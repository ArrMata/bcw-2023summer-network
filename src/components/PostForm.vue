<template>
    <form class="post-form" @submit.prevent="createPost">
        <div class="d-flex align-items-start">
          <RouterLink :to="{name:'Profile', params:{ profileId:account.id }}"><img class="avatar" :src="account.picture" :alt="account.name"/></RouterLink>
            <div class="px-3 w-100">
                <div class="mb-3">
                    <textarea v-model="editable.body" required minlength="3" maxlength="250" textarea class="form-control" id="" rows="3" placeholder="Share something!"></textarea>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><i class="mdi mdi-plus-box-multiple"></i></span>
                    <input v-model="editable.imgUrl" maxlength="300" type="url" class="form-control" placeholder="Photo/Video">
                    <button type="submit"><span>Post</span><i class="ms-1 mdi mdi-send-variant"></i></button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { RouterLink } from 'vue-router';

export default {
    setup() {
        const editable = ref({})

        return {
            account: computed(() => AppState.account),
            editable,
            async createPost() {
                await postsService.createPost(editable.value)
                editable.value = {}
            }
        }
    }, components:{ RouterLink }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.avatar {
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
}
.post-form {
  color: $text;
  background-color: $secondary;
  padding: 1rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.699);
}

.post-form textarea::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: $text;
    opacity: 1; /* Firefox */
}

.post-form textarea:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: $text;
}

.post-form textarea::-ms-input-placeholder { /* Microsoft Edge */
  color: $text;
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

input[type="url"]::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: $text;
  opacity: 1; /* Firefox */
}

input[type="url"]:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: $text;
}

input[type="url"]::-ms-input-placeholder { /* Microsoft Edge */
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
  font-size: 1rem;
  display: flex;
  align-items: center;
  transition: all 0.15s ease;
}

button:hover {
    box-shadow: 0 0 10px $primary;
}

button:disabled {
  user-select: none;
  background-color: $secondary;
}

button i {
  font-size: 1;
  transition: all 0.25s ease;
}

button:hover i {
  transform: translateX(3px);
}

</style>