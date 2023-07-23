<template>    
    <!-- Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" data-bs-theme="dark">
                    <div class="title">
                        <h5 class="modal-title">Edit Post</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" @click="clearActivePost" aria-label="Close"></button>
                    </div>
                <div class="body container-fluid">
                    <form @submit.prevent="editPost" id="editForm" >
                        <div class="mb-3 text-input">
                            <textarea v-model="editable.body" required minlength="3" maxlength="250" textarea class="form-control"
                            cols="8" rows="3" placeholder="Edit this post..."></textarea>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="mdi mdi-plus-box-multiple"></i></span>
                            <input v-model="editable.imgUrl" maxlength="300" type="url" class="form-control" placeholder="Photo/Video">
                        </div>
                    </form>
                </div>
                <div class="footer">
                    <button class="save-button" form="editForm" type="submit">Save <i class="ms-1 mdi mdi-content-save"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import { Modal } from 'bootstrap';

export default {
    setup() {
        const editable = ref({})

        watchEffect(() => {
            if (AppState.activePost)
                editable.value = {...AppState.activePost}
        })

        return {
            editable,
            async editPost(){
                await postsService.editPost(editable.value)
                Modal.getOrCreateInstance('#editModal').hide()
                Pop.success('Post edited! 💾')
            },
            clearActivePost() {
                postsService.clearActivePost()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
    .modal-content {
        background-color: $background;
        color: $text;
    }

    .modal-content .title {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
    }

    .modal-content .body {
        background-color: $secondary;
        margin: 1rem 0;
        padding: 1rem;
        box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.953);
    }

    .modal-content .footer {
        padding: 1rem;
        display: flex;
        justify-content: end;
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

    .text-input textarea::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: $text;
        opacity: 1; /* Firefox */
    }

    .text-input textarea:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: $text;
    }

    .text-input textarea::-ms-input-placeholder { /* Microsoft Edge */
    color: $text;
    }

    .text-input textarea {
        width: 100%;
        resize: none;
        background-color: $background;
        color: $text;
    }

    .text-input textarea:focus {
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

</style>