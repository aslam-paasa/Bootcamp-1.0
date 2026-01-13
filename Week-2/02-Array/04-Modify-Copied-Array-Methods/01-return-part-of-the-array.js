/**
 * Step 1: slice() - Array ka part lena
 * > slice() array ka specified part return karta hai. 
 * > Original array change nahi hota.
 * 
 * Syntax: array.slice(start, end) // end exclusive
*/



/**
 * Example 1: Basic Slicing
*/

const fruits = ["Apple", "Banana", "Orange", "Mango", "Grapes"];

console.log("🍎 Original fruits:", fruits);

/* Index 1 se 3 tak (3 exclusive) */
const sliced1 = fruits.slice(1, 3);
console.log("slice(1, 3):", sliced1); // ["Banana", "Orange"]

/* Index 2 se end tak */
const sliced2 = fruits.slice(2);
console.log("slice(2):", sliced2); // ["Orange", "Mango", "Grapes"]

/* Last 2 elements */
const sliced3 = fruits.slice(-2);
console.log("slice(-2):", sliced3); // ["Mango", "Grapes"]

/* Original array unchanged */
console.log("Original after slice:", fruits); // Same as start



/**
 * Example 2: Real World - Pagination System
*/

class Pagination {
    constructor(items, itemsPerPage = 5) {
        this.allItems = items;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
    }
    
    getCurrentPage() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        
        return this.allItems.slice(startIndex, endIndex);
    }
    
    goToPage(page) {
        const totalPages = Math.ceil(this.allItems.length / this.itemsPerPage);
        
        if (page < 1 || page > totalPages) {
            console.log(`❌ Invalid page! Available pages: 1 to ${totalPages}`);
            return;
        }
        
        this.currentPage = page;
        const pageItems = this.getCurrentPage();
        
        console.log(`📄 Page ${page} of ${totalPages}:`);
        pageItems.forEach((item, index) => {
            console.log(`   ${index + 1}. ${item}`);
        });
    }
    
    showAllPages() {
        const totalPages = Math.ceil(this.allItems.length / this.itemsPerPage);
        console.log(`📚 Total items: ${this.allItems.length}, Pages: ${totalPages}`);
        
        for (let page = 1; page <= totalPages; page++) {
            const pageItems = this.allItems.slice(
                (page - 1) * this.itemsPerPage,
                page * this.itemsPerPage
            );
            console.log(`Page ${page}:`, pageItems);
        }
    }
}

/* Usage */
const allProducts = [
    "Laptop", "Phone", "Tablet", "Watch", "Headphones",
    "Keyboard", "Mouse", "Monitor", "Speaker", "Camera",
    "Charger", "Case", "Stand", "Cable", "Adapter"
];

const pagination = new Pagination(allProducts, 4);
pagination.goToPage(1);
pagination.goToPage(2);
pagination.goToPage(4);