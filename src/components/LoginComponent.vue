<template>
    <div class="login-section container-fluid">
        <div v-if="!user.isAuthenticated">
            <h1>Welcome!</h1>
            <button @click="login" class="login-button">Login</button>
        </div>
        <div v-else-if="account.id">
            <img class="dropdown-center avatar mb-4" :src="account.picture" :alt="account.name" role="button" data-bs-toggle="dropdown">
            <ul class="dropdown-menu" data-bs-theme="dark" >
                <RouterLink :to="{name:'Profile', params:{ profileId:account.id }}"><li class="dropdown-item">My Profile</li></RouterLink>
                <RouterLink :to="{name:'Account'}"><li class="dropdown-item">Edit Account</li></RouterLink>
                <li><hr class="dropdown-divider"></li>
                <li @click="logout" class="dropdown-item">Logout <i class="mdi mdi-logout"></i></li>
            </ul>
            <div class="user-info my-4">
                <p class="fs-5 mb-0">{{ account.class.toUpperCase() }}</p>
                <p class="name">{{ account.name }}</p>
            </div>
            <div class="d-flex justify-content-center">
                <a class="link" v-if="account.github" title="Github" :href="account.github">
                    <i class="mdi mdi-github fs-1"></i>
                </a>
                <a class="link" v-if="account.linkedin" title="LinkedIn" :href="account.linkedin">
                    <i class="mdi mdi-linkedin fs-1"></i>
                </a>
                <a class="link" v-if="account.resume" title="Resume" :href="account.resume">
                    <i class="mdi mdi-file-document fs-1"></i>
                </a>
            </div>
        </div>
        <div v-else>
            <img class="avatar mb-4 placeholder placeholder-glow">
            <div class="user-info my-4">
                <p class="fs-5 mb-3 col-5 placeholder placeholder-glow"></p>
                <p class="name col-9 placeholder placeholder-glow"></p>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { RouterLink } from 'vue-router'
export default {
  setup() {
    return {
            user: computed(() => AppState.user),
            account: computed(() => AppState.account),
            async login() {
                AuthService.loginWithPopup()
            },
            async logout() {
                AuthService.logout({ returnTo: window.location.origin })
            }
        }
    }, components: { RouterLink }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

    .login-section {
        padding: 4rem 1rem;
        color: $text;
        background-color: $secondary;
        width: 20dvw;
        font-family: 'Nunito', sans-serif;
        text-align: center;
        box-shadow: 0px 0px 5px rgb(0, 0, 0);
        position: relative;
        z-index: 2;
    }

    .login-section h1 {
        font-weight: 700;
    }

    .login-button {
        margin-top: 3rem;
        border: none;
        font-size: 2rem;
        padding: 0.25rem 2.5rem;
        background-color: $primary;
        color: $text;
        transition: all 0.15s ease;
        border-radius: 0.5rem;
    }

    .login-button:hover {
        transform: translateY(-5px);
        box-shadow: 0px 0px 30px $accent;
    }

    .avatar {
        height: 10rem;
        width: 10rem;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
    }

    .user-info {
        padding: 0 1rem;
        text-align: left;
    }

    .name {
        font-size: 2rem;
        font-weight: 700;
    }

    .link {
        margin: 0 0.25rem;
        color: $primary;
        transition: 0.25s all ease;
    }

    .link:hover {
        transform: translateY(-5px)
    }

    .dropdown-menu {
        color: $text;
        background-color: $secondary;
    }

    .dropdown-item {
        color: $text;
        transition: all 0.25s ease;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
    .dropdown-item:hover {
        background-color: $primary;
    }

</style>