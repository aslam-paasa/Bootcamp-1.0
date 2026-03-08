import React from "react";
import { useSelector } from "react-redux";

export default function Posts() {
    const posts = useSelector((state) => {
        console.log({ state });
        return state.posts
    });

    return (
        <div>
            <div>
                {posts.posts.map((post) => (
                    <article key={post.postID} className="post">
                        <div className="caption"> {post.caption} </div>
                        <div className="likes">{post.likes} ❤️ </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
