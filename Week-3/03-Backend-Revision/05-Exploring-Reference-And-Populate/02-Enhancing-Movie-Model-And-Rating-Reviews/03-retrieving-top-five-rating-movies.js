/**
 * Querying Top and Bottom Ratings in Movie:
 * 1. Create a function to retrieve the top 5 ratings
 *    and reviews of a movie:
 * */


async function getTopRatingsAndReviews(movieId) {
    try {
        const movie = await Movie.findById(movieId).populate('reviews')
        movie.ratings.sort((a, b) => b - a)
        return movie.ratings.slice(0, 5).map((rating, index) => ({
            rating,
            review: movie.reviews[index],
        }))
    } catch (error) {
        throw error
    }
}


// Example usage
async function getFiveTopRatingsAndReviews(movieId) {
    try {
        const topRatingsAndReviews = await getTopRatingsAndReviews(movieId)
        console.log('Top ratings and reviews:', topRatingsAndReviews)
    } catch (error) {
        console.log(error)
    }
}
getFiveTopRatingsAndReviews('your-movie-id-here')