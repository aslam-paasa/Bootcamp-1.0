/**
 * Put everything inside HTTP Server and expose it to the world:
*/
const express = require('express');
const app = express();

/**
 * Import Product model:
*/
const Product = require('./flipkartProduct.model.js');

/**
 * Function to add product data:
*/
async function addProductData() {
    try {
        const newProduct = {
            category: 'Mobile',
            productName: 'realme C53',
            productColor: 'Champion Gold',
            productImage: 'https://example.com/realme-c53.jpg',
            price: 10999,

            specs: {
                storage: '64 GB',
                ram: '6 GB',
            },

            reviews: {
                rating: 4.5,
                ratingCount: 11901,
                reviewCount: 553,
            }
        };

        const savedProduct = await Product.createProduct(newProduct);

        console.log('Product saved successfully:', savedProduct);
    } catch (error) {
        console.error('Error saving product:', error);
    }
}

/**
 * Call function:
*/
addProductData();

app.listen(3000, () => {
    console.log('Server running on port 3000');
});