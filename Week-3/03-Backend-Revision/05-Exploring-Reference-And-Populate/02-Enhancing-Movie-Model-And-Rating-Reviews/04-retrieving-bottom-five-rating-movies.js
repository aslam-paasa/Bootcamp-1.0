/**
 * Querying Reviews of a Movie:
 * 2. Create a function to retrieve the first 3 reviews of a movie,
 *    populated with user details:
 * */

async function getMovieReviewsWithUserDetails(movieId) {
    try {
        const movie = await Movie.findById(movieId).populate({
            path: 'reviews',
            populate: {
                path: 'user',
                select: 'username profilePictureUrl',
            },
        })
        const reviewsWithUserDetails = movie.reviews
            .slice(0, 3)
            .map((review) => ({
                reviewText: review.text,
                user: review.user,
            }))
        return reviewsWithUserDetails
    } catch (error) {
        throw error
    }
}


// Example usage
async function getThreeMovieReviewsWithUserDetails(movieId) {
    try {
        const reviewsWithUserDetails = await getMovieReviewsWithUserDetails(
            movieId,
        )
        console.log('Movie reviews with user details:', reviewsWithUserDetails)
    } catch (error) {
        console.log(error)
    }
}
getThreeMovieReviewsWithUserDetails('your-movie-id-here')   