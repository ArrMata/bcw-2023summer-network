import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { api } from "./AxiosService"

class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        this.populateAppStatePosts(res)
    }

    async getNextPosts() {
        const res = await api.get(AppState.nextPosts)
        this.populateAppStatePosts(res)
    }

    async getPrevPosts() {
        const res = await api.get(AppState.prevPosts)
        this.populateAppStatePosts(res)
    }

    populateAppStatePosts(response) {
        AppState.posts = response.data.posts.map(postData => new Post(postData))
        AppState.nextPosts = response.data.older ? response.data.older : ""
        AppState.prevPosts = response.data.newer ? response.data.newer : ""
    }
}

export const postsService = new PostsService()