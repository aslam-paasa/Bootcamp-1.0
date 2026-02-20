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
        status: "idle",
        error: null,
        posts: []
    },
    reducers: {
        likeButtonPressed: (state, action) => {
            // state.posts[0].likes += 1;
            console.log(action);
            console.log(current(state));

            // state.posts.map((item) =>
            //   item.postID === action.payload ? (item.likes += 1) : item
            // );

            const postIndex = state.posts.findIndex(
                (post) => post.postID === action.payload
            );
            state.posts[postIndex].likes += 1;
        }
    }
});

export const { likeButtonPressed } = postSlice.actions;

export default postSlice.reducer;
