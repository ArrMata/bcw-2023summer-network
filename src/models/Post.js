export class Post {
    constructor(data) {
        this.id = data._id
        this.body = data.body
        this.likeIds = data.likeIds
        this.createdAt = new Date(data.createdAt)
        this.creator = data.creator
        this.likes = data.likes
        this.imgUrl = data.imgUrl ? data.imgUrl : ''
    }
}