<template>
    <div class="navbar">
      <RouterLink :to="{name: 'Home'}">
        <h1>The Network</h1>
      </RouterLink>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
    setup() {
        

        return {}
    },
    components:{ RouterLink }
}
</script>

<style lang="scss" scoped>

@import "../assets/scss/main.scss";

.navbar {
  color: $text;
  background-color: $primary;
  padding: 0 2rem;
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



</style>