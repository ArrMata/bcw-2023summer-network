import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class PostsService {
    async getPosts() {
        try {
            const res = await api.get('api/posts')
            this.populateAppStatePosts(res)
        } catch (error) {
            Pop.error(error.message)
        }
    }

    async getProfilePosts() {
        try {
            const res = await api.get(`api/profiles/${AppState.activeProfile.id}/posts`)
            this.populateAppStatePosts(res)
        } catch (error) {
            Pop.error(error.message)
        }
    }

    async getNextPosts() {
        try {
            const res = await api.get(AppState.nextPosts)
            this.populateAppStatePosts(res)
        } catch (error) {
            Pop.error(error.message)
        }
    }

    async getPrevPosts() {
        try {
            const res = await api.get(AppState.prevPosts)
            this.populateAppStatePosts(res)
        } catch (error) {
            Pop.error(error.message)
        }
    }

    async createPost(reqBody) {
        try {
            const res = await api.post('api/posts', reqBody)
            const newPost = new Post(res.data)
            AppState.posts.unshift(newPost)
        } catch (error) {
            Pop.error(error.message)
        }
    }

    async deletePost(post) {
        try {
            await api.delete(`api/posts/${post.id}`)
            AppState.posts = AppState.posts.filter(appPost => appPost.id != post.id)
        } catch (error) {
            Pop.error(error.message)
        }
    }

    async toggleLike(post) {
        try {
            const res = await api.post(`api/posts/${post.id}/like`)
            const postIndex = AppState.posts.findIndex(appPost => appPost.id == post.id)
            AppState.posts[postIndex] = new Post(res.data)
        } catch (error) {
            logger.error(error)
            Pop.error(error.message)
        }
    }

    async editPost(post) {
        try {
            const res = await api.put(`api/posts/${post.id}`, { body: post.body, imgUrl: post.imgUrl })
            const postIndex = AppState.posts.findIndex(appPost => appPost.id == post.id)
            AppState.posts[postIndex] = new Post(res.data)
        } catch (error) {
            Pop.error(error.message)
        }
    }

    setActivePost(post) {
        AppState.activePost = post
    }

    clearActivePost() {
        AppState.activePost = null
    }

    clearPosts() {
        AppState.posts = []
    }

    populateAppStatePosts(response) {
        AppState.posts = response.data.posts.map(postData => new Post(postData))
        AppState.nextPosts = response.data.older ? response.data.older : ""
        AppState.prevPosts = response.data.newer ? response.data.newer : ""
    }
}

export const postsService = new PostsService()