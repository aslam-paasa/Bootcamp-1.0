/**
 * What is Optional Chaining with Functions?
 * - Optional Chaining isn't just for objects and array - you can also use
 *   it with functions.
 * - Syntax: obj.method?.()
 * 
 * - This checks:
 *   a. If obj exists.
 *   b. If obj.method exists and is a function.
 *   c. Then calls it if it exists.
 *      If not, it just returns 'undefined' - no crash. 
*/

/**
 * Why and When to use Function Optional Chaining?
 * - You should use it when:
 *   a. You're not sure if a function exists.
 *   b. The function might be passed optionally from somewhere else
 *      (e.g., as a prop, config, etc).
 *   c. You want to call it only if it exists. 
*/

/**
 * Without Optional Chaining:
 * - config.onClick(); - ❌ Crashes if config or onClick is missing.
*/

/**
 * With Optional Chaining:
 * - config.onClick?.(); - ✅ No crash if config or onClick is missing.
*/

/**
 * Assignment: Trigger Optional Analytics Callback on Post Like.
 * You're building a like button for a social media app. Each time a user
 * like a post, you should:
 * a. Increase the like count.
 * b. Optionally trigger an analytics callback function. 
 *    (only if it's defined)
 * 
 * If no callback is provided, app should not crash. Use Optional Chaining
 * to call it safely. 
*/

const post1 = {
    title: "Sunset Photo",
    likes: 100,
    onLike: function () {
        console.log("📊 Analytics tracked for Sunset Photo");
    }
};

const post2 = {
    title: "Meme of the Day",
    likes: 250
    // onLike is missing
};


/**
 * Expected Output:
 * Liked: Sunset Photo 👍
 * 📊 Analytics tracked for Sunset Photo
 * 
 * Liked: Meme of the Day 👍
*/

/**
 * Solution:
 * - post.onLike?.() - Ye check karega:
 *   a. Kya post k andar onLike function hai?
 *   b. Agar hai to usse call karega.
 *   c. Agar nahi hai to kuch mat karo - error nahi aaega.
*/
function likePost(post) {
    post.likes += 1;
    console.log(`Liked: ${post.title} 👍`);

    // Optional chaining to safely call onLike function
    post.onLike?.();
}

likePost(post1);
likePost(post2);



/**
 * We have learned:
 * a. How to safely call function only if they exists.
 * b. Prevent your app from crashing due to missing optional callbacks.
 * c. Clean, defensive coding with optional chaining.
*/