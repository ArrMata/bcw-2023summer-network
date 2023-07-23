<template>

    <div class="main-section">
        <div class="row">
            <div class="col-10 info mx-auto">    
                <h2>Uh oh...That user does not exist!</h2>
                <RouterLink :to="{name: 'Home'}"><h2>Click me to go back home!</h2></RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
    setup() {
        return {};
    },
    components: { RouterLink }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.main-section {
  height: 100%;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info {
    text-align: center;
    background-color: $secondary;
    color: $text;
    padding: 3rem;
}

</style>