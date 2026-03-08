/**
 * Understanding REST:
 * 
 * 1. PUT - "Replace & Refresh"
 * => Imagine you have an online store and you want to update a product's image.
 * => You replace the old image with a new one, giving the product page a 
 *    fresh look.
 * 
 * 2. PATCH - "Tiny Touch-ups"
 * => In your online store, a product's price is incorrect. You don't want to 
 *    change the entire listing, just the price.
 * => You make a small update to fix the mistake without affecting the rest of
 *    the product details. 
 * 
 * 3. PUT and PATCH
 * => Are not used in many industries.
 * => People use POST for updates directly.
 * 
 * 4. DELETE - "Vanishing Act"
 * => This doesn't means you have to delete it from database. 
 * => Generally, you mark the resource as 'deleted' and filter that data out next time.
 * => Your online inventory includes a product that's out of stock and won't be available
 *    again. You remove the product listing, and it disappears from your website as if 
 *    it was never there.
 * 
 * In Short:
 * 1. GET: Ask for data
 * 2. POST: Send new data
 * 3. PUT: Update all data.
 * 4. PATCH: Update some data
 * 5. DELETE: Remove data
 * 6. OPTIONS: Ask about methods
 * */ 