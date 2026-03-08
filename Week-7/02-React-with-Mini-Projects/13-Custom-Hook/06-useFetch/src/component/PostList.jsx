import useFetch from "../hooks/useFetch";

/**
 * Remember:
 * If we pass options as a second argument to useFetch, it will be used in the fetch request.
 * If we don't pass options, the default options will be used.
 * The default options are:
 * {
 *  method: "GET",
 *  headers: {
 *      "Content-Type": "application/json"
 *  }
 * }
*/

const PostList = () => {
    const { data, loading, error } = useFetch(
        "https://jsonplaceholder.typicode.com/posts"
    );

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error}</p>;

    /**
     * Display the first 10 posts
    */
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {data.slice(0, 10).map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default PostList;