/**
 * 2. Create a function to add a review to a movie:
 * => Breakdown steps:
 *    a. Get the movie to be updated - findOneById
 *    b. const movieToBeUpdated = await findOneById
 *    c. movieToBeUpdated.reviews
 *    d.  { user: 'isissksk3787393', text: 'OMG! Loved it!' }
 *    e. movieToBeUpdated.reviews.push({ user: 'isissksk3787393', text: 'OMG! Loved it!' })
 *    f. movieToBeUpdated.save()
 * */

async function addRatingAndReview(movieId, userId, reviewText) {
    try {
        const movie = await Movie.findById(movieId)
        if (movie) {
            // Create a new review object with user and review text
            const review = {
                user: userId,
                text: reviewText,
            }
            movie.reviews.push(review)
            await movie.save()
            const updatedMovieWithReview = await Movie.findById(movieId).populate(
                'reviews.user',
                'username profilePictureUrl',
            )
            console.log('Updated movie with review:', updatedMovieWithReview)
        } else {
            throw new Error('Movie not found')
        }
    } catch (error) {
        throw error
    }
}
// Example usage
addRatingAndReview(
    'your-movie-id-here',
    'your-user-id-here',
    'A fantastic movie!',
)   
