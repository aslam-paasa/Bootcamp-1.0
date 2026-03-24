/**
 * Import modules:
 */
const fs = require('fs');
const { createMovie, pool } = require('./movie.model');

/**
 * Read JSON file:
 */
const jsonData = fs.readFileSync('./movies.json', 'utf-8');
const moviesData = JSON.parse(jsonData);

/**
 * Seed function:
 */
async function seedDatabase() {
    try {
        for (const movieData of moviesData) {

            const savedMovie = await createMovie({
                title: movieData.title,
                releaseYear: movieData.releaseYear,
                genre: movieData.genre,
                director: movieData.director,
                actors: movieData.actors,
                language: movieData.language,
                country: movieData.country,
                rating: movieData.rating,
                plot: movieData.plot,
                awards: movieData.awards,
                posterUrl: movieData.posterUrl,
                trailerUrl: movieData.trailerUrl,
            });

            console.log(`Movie "${savedMovie.title}" seeded.`);
        }

        console.log('Database seeding complete.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await pool.end(); // close connection
    }
}

/**
 * Run seeder:
 */
seedDatabase();