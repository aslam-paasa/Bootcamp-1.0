

/**
 * Assignment-1: Display Product Seller Info (even if Data is missing):
 * You're working on an e-commerce product page where every product may
 * or may not have a registered seller (some are sold directly by the
 * platform).
 * 
 * You have to show:
 * a. Seller Name
 * b. Seller Rating
 * c. Seller City
 * 
 * But not all sellers have this information in the backend JSON.
 * Sometimes, the entire seller field might be missing. So, you need
 * to use 'Optional Chaining' (?.) to access this deeply nested data 
 * safely and show 'Not Available' if missing. 
*/


/**
 * Product Object Data:
*/

const product1 = {
    id: 'p101',
    name: 'Wireless Headphones',
    seller: {
        name: 'SoundMax',
        rating: 4.5,
        location: {
            city: 'Mumbai'
        }
    }
};

const product2 = {
    id: 'p102',
    name: 'Smart LED TV'
    // No seller info!
};


/**
 * Expected Output:
 * Product: Wireless Headphones
 * Seller: SoundMax
 * Rating: 4.5
 * City: Mumbai
 * 
 * Product: Smart LED TV
 * Seller: Not Available
 * Rating: Not Available
 * City: Not Available

*/



/**
 * Solution using Optional Chaining:
*/

function displayProductSellerInfo(product) {
    const sellerName = product.seller?.name || 'Not Available';
    const rating = product.seller?.rating || 'Not Available';
    const city = product.seller?.location?.city || 'Not Available';

    console.log(`Product: ${product.name}`);
    console.log(`Seller: ${sellerName}`);
    console.log(`Rating: ${rating}`);
    console.log(`City: ${city}`);
    console.log('----------------');
}

displayProductSellerInfo(product1);
displayProductSellerInfo(product2);



/**
 * What you learned:
 * 1. How to use ?. to prevent crashing when accessing deeply nested
 *    data.
 * 2. Fallbacks using || for smooth UX.
 * 3. How optional chaining simplifies frontend conditionals.
*/


/**
 * Assignment-2: Social Media Version
 * You are building a comment section for a social media post. Each
 * comment may or may not have a user profile (some comments are from
 * deleted/banned accounts). You need to display:
 * a. Username
 * b. Profile Pic
 * c. Location
*/

/**
 * Comment Object Data:
*/

const comment1 = {
    id: 'c001',
    text: 'This post is awesome!',
    user: {
        username: 'codewizard',
        profile: {
            pic: 'avatar.jpg',
            location: 'Delhi'
        }
    }
};

const comment2 = {
    id: 'c002',
    text: '🔥🔥🔥'
    // No user info (user deleted their account)
};


/**
 * Solution using Optional Chaining:
*/

function displayComment(comment) {
    const username = comment.user?.username || 'Anonymous';
    const pic = comment.user?.profile?.pic || 'default-avatar.jpg';
    const location = comment.user?.profile?.location || 'Unknown';

    console.log(`Comment: ${comment.text}`);
    console.log(`User: ${username}`);
    console.log(`Profile Pic: ${pic}`);
    console.log(`Location: ${location}`);
    console.log('----------------');
}

displayComment(comment1);
displayComment(comment2);
