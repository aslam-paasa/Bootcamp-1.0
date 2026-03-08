/**
 * Flipkart Breadcrumb (Mobile Product):
 * => First attempt (flat structure — not ideal):
 * {
 *     category    : "Mobile",
 *     productName : "realme C53",
 *     productColor: "Champion Gold",
 *     productImage: "<image source>",
 *     space       : "64 GB",
 *     ram         : "6 GB",
 *     price       : 10999,
 *     rating      : 4.5,
 *     ratingCount : 11901,
 *     reviewCount : 553
 * }
 *
 * => Problem with flat structure:
 *    - All fields are at the same level — messy and hard to scale.
 *    - "space" and "ram" are specs — they should be grouped together.
 *    - "rating", "ratingCount", "reviewCount" are review data — group them.
 *    - If we add more specs later (battery, camera etc.) the flat model gets huge.
 *
 * => Better solution: GROUP related fields into nested objects.
 *    This is called NESTED SCHEMA in Mongoose.
 *    specs   → groups all hardware specs together
 *    reviews → groups all rating/review info together
 */

/**
 * Import Mongoose:
*/
const mongoose = require('mongoose');

/**
 * Define the Flipkart Product schema (improved nested structure):
*/
const flipkartProductSchema = new mongoose.Schema({

    /*
     * Top-level product identity fields:
    */
    category    : String,
    productName : String,
    productColor: String,
    productImage: String,
    price       : Number,

    /*
     * Grouped specs — all hardware details live here.
     * Easy to add new specs (battery, camera) without cluttering the top level.
    */
    specs: {
        storage: String,  // e.g. "64 GB"
        ram    : String,  // e.g. "6 GB"
    },

    /*
     * Grouped review info — all rating-related data lives here.
     * Clean separation from product identity data.
    */
    reviews: {
        rating     : Number,  // e.g. 4.5
        ratingCount: Number,  // e.g. 11901
        reviewCount: Number,  // e.g. 553
    },

});

/**
 * Create the FlipkartProduct model:
*/
const FlipkartProduct = mongoose.model('FlipkartProduct', flipkartProductSchema);

/**
 * Export the FlipkartProduct model:
*/
module.exports = FlipkartProduct;