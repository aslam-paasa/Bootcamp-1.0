import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeButtonPressed, fetchPosts } from "./postSlice";

export default function Posts() {
    const { posts, status, error } = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts())
        }
    }, [status, dispatch])

    return (
        <div>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'error' && <p>{error}</p>}
            <div>
                {posts.map((post) => (
                    <div key={post.postID}>
                        <p>{post.caption}</p>
                        <button className="likes"
                            onClick={() => dispatch(likeButtonPressed(post.postID))}>
                            {post.likes} likes
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
