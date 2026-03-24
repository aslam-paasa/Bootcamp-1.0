/**
 * Import PostgreSQL:
 */
const { Pool } = require('pg');

/**
 * Create connection pool:
 */
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'videoDB',
    password: 'your_password',
    port: 5432,
});

/**
 * Function to insert video data:
 */
async function createVideo(data) {
    try {
        const query = `
            INSERT INTO videos (
                video_title,
                channel_name,
                channel_logo,
                views_count,
                thumbnail_url,
                total_time,
                watched_time_in_seconds,
                posted_date,
                video_url
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *;
        `;

        const values = [
            data.videoTitle,
            data.channelName,
            data.channelLogo,
            data.viewsCount,
            data.thumbnailURl,
            data.totalTime,
            data.watchedTimeInSeconds,
            data.postedDate,
            data.videoURL
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    } catch (error) {
        console.error('Error inserting video:', error);
        throw error;
    }
}

/**
 * Export function:
 */
module.exports = {
    createVideo
};