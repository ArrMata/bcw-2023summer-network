<template>
    <div class="navbar">
      <h2>The Network</h2>
    </div>
</template>

<script>
export default {
    setup() {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

@import "../assets/scss/main.scss";

.navbar {
  color: $text;
  background-color: $primary;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 5px rgb(0, 0, 0);
  position: relative;
  z-index: 1;
}

.navbar h2 {
  margin: 0;
  font-weight: 700;
}

</style>