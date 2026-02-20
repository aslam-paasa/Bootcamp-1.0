import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeButtonPressed } from "./postSlice";

export default function Posts() {
    const posts = useSelector((state) => {
        console.log({ state });
        return state.posts;
    });
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                {posts.posts.map((post) => (
                    <article key={post.postID} className="post">
                        <div className="caption"> {post.caption} </div>
                        <button className="likes"
                            onClick={() => dispatch(likeButtonPressed(post.postID))}>{post.likes} likes </button>
                    </article>
                ))}
            </div>
        </div>
    );
}
