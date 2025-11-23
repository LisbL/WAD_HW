import { createStore } from 'vuex'

// Creating a new store instance
export default createStore({

    //This is where the app's shared data is
    //state is like a global JSON object - everyone can use it
    state () {
        return {
            posts: [{
                id:1,
                author: "kirby ",
                date: "2025-10-02", 
                profilePic: "images/prof3.jpg", 
                memePic:"images/marginleft.jpg", 
                comment:"Guys, I think my airconditioner is broken.",
                likes: 12
            },
            {   
                id:2,
                author: "flutter ",
                date: "2025-10-02",
                profilePic:"images/prof4.jpg",
                memePic: null,
                comment:"Maybe I can help? I'll take my PC with me.",
                likes: 1
            },
            {
                id:3,
                author: "chic ",
                date: "2025-10-03",
                profilePic: "images/prof1.jpg",
                memePic: "images/meme.jpg",
                comment: "CSS in a nutshell, for real",
                likes: 1
            },{
                id:4,
                author: "shark ",
                date: "2025-10-03",
                profilePic: "images/prof2.jpg",
                memePic: null,
                comment: "Hahahahah, that's so good!",
                likes: 0
            },{
                id:5,
                author: "chic ",
                date: "2025-10-03",
                profilePic: "images/prof1.jpg",
                memePic: null,
                comment: "Wait, I'll post another!",
                likes: 2
            },{
                id:6, 
                author: "kirby ",
                date: "2025-10-05",
                profilePic: "images/prof3.jpg",
                memePic: null,
                comment: "Where's the post? Did you forget about it?",
                likes: 5
            },{
                id:7, 
                author: "chic ",
                date: "2025-10-010",
                profilePic: "images/prof1.jpg",
                memePic: "images/reaction.jpg",
                comment: "I'm back",
                likes: 15
            },{
                id:8, 
                author: "kirby ",
                date: "2025-10-10",
                profilePic: "images/prof3.jpg",
                memePic: null,
                comment: "Yayyy, you're back!",
                likes: 0
            },{
                id:9, 
                author: "shark ",
                date: "2025-10-10",
                profilePic: "images/prof2.jpg",
                memePic: null,
                comment: "LESSSGOOOOOO!",
                likes: 0
            },{
                id:10, 
                author: "flutter ",
                date: "2025-10-11",
                profilePic: "images/prof4.jpg",
                memePic: "images/meme2.jpg",
                comment: "Beep Beep",
                likes: 0
            }]
        }
    },

    //These are functions :)
    mutations: {
        incrementLikes(state, postId) {
            const post = state.posts.find(p => p.id === postId)
            if (post) post.likes++
        },

        resetLikes(state) {
            state.posts.forEach(p => p.likes = 0)
        }
    }
})

//const app = createApp({})

// Installing the store instance as a plugin
//app.use(store)
