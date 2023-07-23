<template>
  <div class="d-flex vh-100">
    <LoginComponent />
    <main class="container-fluid p-0">
      <Navbar class="navbar" />
      <div class="main-section d-flex">
        <router-view />
        <AdComponent />
      </div>
    </main>
    <EditModal />
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import LoginComponent from './components/LoginComponent.vue'
import Navbar from './components/Navbar.vue'
import AdComponent from './components/AdComponent.vue'
import EditModal from './components/EditModal.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { LoginComponent, Navbar, AdComponent, EditModal }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

main{
  background-color: $background;
  font-family: 'Nunito', sans-serif;
}

.navbar {
  height: 10dvh;
}

.main-section {
  height: 90dvh;
}

</style>
