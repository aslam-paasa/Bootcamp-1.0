/**
 * Q. Create a model for movie. The model includes the following fields:
 * 1. title(String): The title of the movie. This field is required, 
 *    meaning every movie entry must have a title.
 * 2. releaseYear(Number): The year the movie was released. This field is
 *    also required.
 * 3. genre(Array of String): The genre(s) to which the movie belongs. 
 *    The genre shoule be one of the predefined values:
 *    (a) Action
 *    (b) Drama
 *    (c) Comedy
 *    (d) Romance
 *    (e) Thriller
 *    (f) Fantasy
 *    (g) Sci-Fi
 *    (h) Horror
 *    (i) Sports
 *    (j) Musical
 *    (k) Other.
 * 4. director(String): The name of the director of the movie. This field
 *    is required.
 * 5. actors(Array of Strings): A list of actors' names who were part of
 *    the movie's cast.
 * 6. language(String): The language in which the movie is presented. This
 *     field is required.
 * 7. country(String): The country where the movie was produced. This
 *    default value is 'India'.
 * 8. rating(Number): The movie's rating, represented as a number. The
 *    rating must be between 0 and 10. The default value is 0.
 * 9. plot(String): A breif description or plot summary of the movie.
 * 10. awards(String): Any awards or recognitions the movie has received.
 * 11. posterUrl(String): The URL to the poster image of the movie.
 * 12. trailerUrl(String): The URL to the official trailer of the movie.
 * 13. In the model also include the option :
 *     {
 *        timestamps: true
 *     },
 *     which adds 'createAt' and 'updateAt' fields to track the creation
 *     and modification times of each movie entry.
 * */

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  // if a field is require
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    genre: [{
        type: String,
        enum: ['Action', 'Drama', 'Comedy', 'Romance', 'Thriller', 'Fantasy', 'Sci-Fi', 'Horror', 'Sports', 'Musical', 'Other'],
    }], // syntax for an array of strings
    // enum can be used for pre-defined values
    director: {
        type: String,
        required: true,
    },
    actors: [{
        type: String,
    }],
    language: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: 'India',
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    plot: {
        type: String,
    },
    awards: {
        type: String,
    },
    posterUrl: {
        type: String,
    },
    trailerUrl: {
        type: String,
    },
}, {
    timestamps: true,
});

/**
 * When we define this, it gives us an object on which save() is a
 * defined function:
*/
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;