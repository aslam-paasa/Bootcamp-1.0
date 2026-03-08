import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: 'posts',
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
    reducers: {}
});

export default postSlice.reducer;
