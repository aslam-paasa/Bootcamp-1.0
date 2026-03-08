import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(
        "https://social-media-server.tanaypratap.repl.co/posts"
    );
    console.log(response.data);
    return response.data;
});

export const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [
            {
                postID: "p1201",
                caption: "learning redux",
                likes: 22,
                user: {
                    userID: "u1234",
                    name: "tanay"
                }
            },
            {
                postID: "p1202",
                caption: "it's frustrating to begin",
                likes: 24,
                user: {
                    userID: "u1234",
                    name: "tanay"
                }
            }
        ]
    },
    reducers: {
        likeButtonPressed: (state, action) => {
            // console.log("button clicked..", current(state), action);
            // const posts = state.posts.map(post => post.postID === action.payload ? { ...post, likes: post.likes + 1} : post)

            // return { ...state, posts}

            const postIndex = state.posts.findIndex(
                (post) => post.postID === action.payload
            );
            state.posts[postIndex].likes += 1;
        }
    }
});

export const { likeButtonPressed } = postSlice.actions;

export default postSlice.reducer;
