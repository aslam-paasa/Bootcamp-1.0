/**
 * Put everything inside HTTP Server and expose it to the world:
*/
const express = require('express');
const app = express();

/**
 * Import Mongoose:
*/
const mongoose = require('mongoose');
const FlipkartProduct = require('./07-flipkartProduct-Schema');

/**
 * Connecting database:
*/
mongoose.connect("mongodb+srv://aslampaasa420:Sy********er@cluster0.goyedz2.mongodb.net/flipkartDB");

/**
 * Function to add product data:
*/
async function addProductData() {
    try {
        /**
         * Create a new FlipkartProduct document
         * using the improved nested structure:
        */
        const newProduct = new FlipkartProduct({
            category: 'Mobile',
            productName: 'realme C53',
            productColor: 'Champion Gold',
            productImage: 'https://example.com/realme-c53.jpg',
            price: 10999,

            /*
             * Specs are now grouped — clean and easy to extend:
            */
            specs: {
                storage: '64 GB',
                ram: '6 GB',
            },

            /*
             * Review data is now grouped — clean and easy to extend:
            */
            reviews: {
                rating: 4.5,
                ratingCount: 11901,
                reviewCount: 553,
            },
        });

        /**
         * Save the new product document to the database:
        */
        const savedProduct = await newProduct.save();

        /**
         * Log a success message to the console:
        */
        console.log('Product saved successfully:', savedProduct);
    } catch (error) {
        /**
         * Log an error message to the console:
        */
        console.error('Error saving product:', error);
    }
}

/**
 * Call the addProductData function:
*/
addProductData();

app.listen(3000);