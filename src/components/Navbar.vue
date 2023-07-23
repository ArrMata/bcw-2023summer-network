<template>
    <div class="navbar">
      <RouterLink :to="{name: 'Home'}">
        <h1>The Network</h1>
      </RouterLink>
      <form class="d-flex" @submit.prevent="search">
        <input v-model="query" minlength="2" maxlength="50" type="text" class="form-control" aria-describedby="helpId" placeholder="Search Users...">
        <button @click="search" type="submit" class="search-button"><i class="mdi mdi-magnify"></i></button>
      </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { router } from '../router';
export default {
    setup() {
        const query = ref("")
        return {
          query,
          async search() {
            if (query.value.length > 1){
              await router.push({ name:'Search', query: {search: query.value}})
              query.value = ""
            }
          }
        }
    },
    components:{ RouterLink }
}
</script>

<style lang="scss" scoped>

@import "../assets/scss/main.scss";

.navbar {
  color: $text;
  background-color: $primary;
  padding: 0 4rem;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 5px rgb(0, 0, 0);
  position: relative;
  z-index: 1;
}

.navbar h1 {
  margin: 0;
  font-weight: 700;
  color: $text;
  transition: 0.25s all ease;
}

.navbar h1:hover {
  color: $background;
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

.search-button {
    border: none;
    background-color: $secondary;
    padding: 0.25rem 0.5rem;
    color: $text;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    transition: all 0.15s ease;
    border-radius: 0.5rem;
}

.search-button:hover {
    box-shadow: 0 0 20px $text;
}




</style>