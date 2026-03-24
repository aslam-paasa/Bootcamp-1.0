const express = require('express');
const app = express();

const { createUser, pool } = require('./user.model');
const { createMovie } = require('./movie.model');
const { addReview, getReviewsWithUsers, getFirst3Reviews } = require('./review.model');

async function run() {
    try {
        /**
         * 1. Create user
         */
        const user = await createUser({
            email: 'alice@example.com',
            password: 'password123',
            username: 'alice',
            profilePictureUrl: 'https://example.com/alice.jpg',
            nickname: 'Ali'
        });

        /**
         * 2. Create movie
         */
        const movie = await createMovie({
            title: '3 Idiots',
            releaseYear: 2009,
            genre: ['Comedy', 'Drama'],
            director: 'Rajkumar Hirani',
            actors: ['Aamir Khan'],
            language: 'Hindi',
            rating: 8.4,
            plot: 'Story...'
        });

        /**
         * 3. Add review
         */
        await addReview(movie.id, user.id, 'Amazing movie!');

        /**
         * 4. Get all reviews (populate equivalent)
         */
        const reviews = await getReviewsWithUsers(movie.id);
        console.log('Reviews with users:', reviews);

        /**
         * 5. First 3 reviews
         */
        const first3 = await getFirst3Reviews(movie.id);
        console.log('First 3 reviews:', first3);

    } catch (error) {
        console.error(error);
    } finally {
        await pool.end();
    }
}

run();

app.listen(3000, () => {
    console.log('Server running on port 3000');
});