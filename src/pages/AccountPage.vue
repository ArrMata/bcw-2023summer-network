<template>
  <div class="main-section text-center">
    <div v-if="account.id" class="row m-0">
      <div class="col-10 py-4 mt-4 mx-auto profile-container">
        <h1 class="mb-4">Edit your account</h1>
        <div class="row">
          <div class="col-12 p-0 mb-3 position-relative">
            <img class="img-fluid cover-img" :src="account.coverImg" alt="Cover Image">
            <img class="avatar" :src="account.picture" :alt="account.name">
          </div>
          <div class="col-12 mt-5">
            <form id="accountForm" class="d-flex" @submit.prevent="editAccount">
              <div>
                <label for="name" class="form-label">Name</label>
                <input required minlength="3" maxlength="40" id="name" v-model="editable.name" class="form-control" type="text">
                <label for="class" class="form-label mt-3">Class</label>
                <input minlength="5" maxlength="40" id="class" v-model="editable.class" class="form-control" type="text">
                <label for="profilePicture" class="form-label mt-3 ">Profile Picture URL</label>
                <input type="url" min="50" maxlength="300" id="profilePicture" v-model="editable.picture" class="form-control">
                <label for="coverImg" class="form-label mt-3 ">Cover Image URL</label>
                <input type="url" min="50" maxlength="300" id="coverImg" v-model="editable.coverImg" class="form-control">
              </div>
              <div class="mx-3 d-flex flex-column justify-content-center">
                <label for="github" class="form-label">Github</label>
                <input type="url" min="50" maxlength="300" id="github" v-model="editable.github" class="form-control">
                <label for="LinkedIn" class="form-label mt-3 ">LinkedIn</label>
                <input type="url" min="50" maxlength="300" id="LinkedIn" v-model="editable.linkedin" class="form-control">
                <label for="Resume" class="form-label mt-3 ">Resume</label>
                <input type="url" min="50" maxlength="300" id="Resume" v-model="editable.resume" class="form-control">
                <label for="graduated" class="form-label mt-3">Graduated?</label>
                <input v-model="editable.graduated" type="checkbox" id="graduated" class="d-block text-center mb-4">
              </div>
              <div class="flex-grow-1">
                <label for="bio">Bio</label>
                <textarea id="bio" v-model="editable.bio" minlength="3" maxlength="250" 
                textarea class="mt-2 form-control" cols="8" rows="3" placeholder="Tell us about yourself..."></textarea>
              </div>
            </form>
            <div class="d-flex justify-content-end">
              <button class="save-button" form="accountForm" type="submit">Submit Changes <i class="ms-1 mdi mdi-content-save"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService';
import Pop from '../utils/Pop';
export default {
  setup() {

    const editable = ref({})
    const account = computed(() => AppState.account)

    onMounted(() => {
      editable.value = {...AppState.account}
    })

    watchEffect(() => {
      if (account.value.id) {
        editable.value = {...AppState.account}
      }
    })

    return {
      account,
      editable,
      async editAccount() {
        await accountService.editAccount(editable.value)
        Pop.success('Account Edited! 💾')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.main-section {
  height: 100%;
  width: 75%;
}
.profile-container {
    color: $text;
    background-color: $secondary;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.699);
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

.form-control{
  background-color: $background;
  color: $text;
  border: 1px solid $text !important;
}

.form-control:focus {
  background-color: $background;
  color: $text;
}

.form-control::placeholder {
  color: $text;
}

textarea {
  width: 100%;
  resize: none;
}

.save-button {
    border: none;
    background-color: $primary;
    padding: 0.25rem 0.5rem;
    color: $text;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    transition: all 0.15s ease;
    border-radius: 0.5rem;
}

.save-button:hover {
    box-shadow: 0 0 10px $primary;
    transform: translateY(-3px);
}

</style>
