export class Profile {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.picture = data.picture
        this.bio = data.bio
        this.coverImg = data.coverImg
        this.github = data.github
        this.linkedin = data.linkedin
        this.resume = data.resume
        this.class = data.class
        this.graduated = data.graduated
    }
}



// const profile = {
//     "_id": "649b4ab320dd01bdf862a6f2",
//     "subs": [
//       "auth0|649b4ab2b87790cf1b4f353b"
//     ],
//     "email": "nubby@nubby.com",
//     "name": "nubo",
//     "picture": "https://s.gravatar.com/avatar/7bb1dcab7f72e2966b8e0051f079382c?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fnu.png",
//     "bio": "",
//     "coverImg": "https://images.unsplash.com/photo-1586829135343-132950070391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
//     "github": "",
//     "linkedin": "",
//     "resume": "",
//     "class": "",
//     "graduated": false,
//     "createdAt": "2023-06-27T20:50:04.710Z",
//     "updatedAt": "2023-07-20T20:33:23.933Z",
//     "__v": 0,
//     "id": "649b4ab320dd01bdf862a6f2"
//   }