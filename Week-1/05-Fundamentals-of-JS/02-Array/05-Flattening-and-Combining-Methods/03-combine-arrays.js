/**
 * Step 3: concat() - Combine Multiple Arrays
 * > concat() arrays ko combine karta hai.
 * > Returns a new array with all the elements of the original arrays.
 * > Syntax: const newArray = array1.concat(array2, array3, ..., arrayN)
*/



/**
 * Example 1: Basic Concatenation
*/

const fruits = ["Apple", "Banana"];
const vegetables = ["Carrot", "Potato"];
const grains = ["Rice", "Wheat"];

console.log("🍎 Fruits:", fruits);
console.log("🥕 Vegetables:", vegetables);
console.log("🌾 Grains:", grains);

/* Multiple arrays combine karo */
const allFood = fruits.concat(vegetables, grains);
console.log("🍽️ All food items:", allFood);

/* Single values bhi add kar sakte hain */
const withExtra = allFood.concat("Milk", "Eggs");
console.log("With extras:", withExtra);

/* Original arrays unchanged */
console.log("Fruits after concat:", fruits); // Same



/**
 * Example 2: Real World - Multiple Data Sources Merge Karna
*/

class DataMerger {
    constructor() {
        this.localUsers = [
            { id: 1, name: "Rahul", type: "local" },
            { id: 2, name: "Priya", type: "local" }
        ];
        
        this.externalUsers = [
            { id: 101, name: "Amit", type: "external" },
            { id: 102, name: "Neha", type: "external" }
        ];
        
        this.adminUsers = [
            { id: 1001, name: "Admin", type: "admin" }
        ];
    }
    
    getAllUsers() {
        /* Sabhi users ko combine karo */
        const allUsers = this.localUsers.concat(this.externalUsers, this.adminUsers);
        console.log("👥 All users:", allUsers);
        return allUsers;
    }
    
    getUsersByType(type) {
        const allUsers = this.getAllUsers();
        return allUsers.filter(user => user.type === type);
    }
    
    mergeWithNewData(newUsers) {
        /* New data ko existing data ke saath merge karo */
        const updatedUsers = this.getAllUsers().concat(newUsers);
        console.log(`✅ Added ${newUsers.length} new users`);
        console.log("Total users now:", updatedUsers.length);
        return updatedUsers;
    }
}

/* Usage */
const merger = new DataMerger();
merger.getAllUsers();

console.log("\n🔍 Local users only:");
const localUsers = merger.getUsersByType("local");
console.log(localUsers);

console.log("\n➕ Adding new users...");
const newUsers = [
    { id: 201, name: "Ravi", type: "external" },
    { id: 202, name: "Sonia", type: "local" }
];
merger.mergeWithNewData(newUsers);



/**
 * Example 3: Shopping Cart - Multiple Carts Combine Karna
*/

class ShoppingCartMerger {
    static mergeCarts(...carts) {
        /* Multiple carts ko combine karo */
        const mergedCart = [].concat(...carts);
        
        console.log("🛒 Merging carts...");
        carts.forEach((cart, index) => {
            console.log(`   Cart ${index + 1}: ${cart.length} items`);
        });
        console.log(`   Merged cart: ${mergedCart.length} items`);
        
        return mergedCart;
    }
    
    static removeDuplicates(cart) {
        /* Duplicate items remove karo (based on product id) */
        const uniqueCart = [];
        const seen = new Set();
        
        cart.forEach(item => {
            if (!seen.has(item.id)) {
                seen.add(item.id);
                uniqueCart.push(item);
            }
        });
        
        console.log(`🔄 Removed ${cart.length - uniqueCart.length} duplicates`);
        return uniqueCart;
    }
    
    static calculateTotal(cart) {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}

/* Usage */
const cart1 = [
    { id: 1, product: "Laptop", price: 50000, quantity: 1 },
    { id: 2, product: "Mouse", price: 1500, quantity: 2 }
];

const cart2 = [
    { id: 2, product: "Mouse", price: 1500, quantity: 1 }, // Duplicate
    { id: 3, product: "Keyboard", price: 3000, quantity: 1 }
];

const cart3 = [
    { id: 4, product: "Monitor", price: 15000, quantity: 1 },
    { id: 5, product: "Headphones", price: 2500, quantity: 1 }
];

console.log("🛒 Cart Merging Demo:");
const merged = ShoppingCartMerger.mergeCarts(cart1, cart2, cart3);
const uniqueCart = ShoppingCartMerger.removeDuplicates(merged);
const total = ShoppingCartMerger.calculateTotal(uniqueCart);

console.log("📦 Final cart:", uniqueCart);
console.log(`💰 Total: ₹${total}`);



/**
 * Step 4: Advanced Patterns aur Combinations
*/

/**
 * Pattern 1: flat() + filter() - Complex Data Filtering
*/

const companyData = [
    {
        department: "Engineering",
        teams: [
            {
                team: "Frontend",
                members: ["Rahul", "Priya", "Amit"]
            },
            {
                team: "Backend", 
                members: ["Neha", "Raj", "Sonia", "Karan"]
            }
        ]
    },
    {
        department: "Design",
        teams: [
            {
                team: "UI/UX",
                members: ["Pooja", "Ravi"]
            }
        ]
    }
];

/* Saare team members ek array mein */
const allMembers = companyData.flatMap(dept =>
    dept.teams.flatMap(team => team.members)
);

console.log("👥 All team members:", allMembers);
console.log("Total members:", allMembers.length);

/* Members filter karo (specific starting letter) */
const rMembers = allMembers.filter(member => member.startsWith('R'));
console.log("Members starting with 'R':", rMembers);



/**
 * Pattern 2: flatMap() + map() - Data Enrichment
*/

const orders = [
    { orderId: "ORD001", items: ["Laptop", "Mouse"] },
    { orderId: "ORD002", items: ["Phone", "Case", "Charger"] }
];

const productPrices = {
    "Laptop": 50000,
    "Mouse": 1500,
    "Phone": 25000,
    "Case": 500,
    "Charger": 1500
};

/* Har order ke har item ko enrich karo with price */
const enrichedOrders = orders.flatMap(order =>
    order.items.map(item => ({
        orderId: order.orderId,
        product: item,
        price: productPrices[item] || 0,
        quantity: 1
    }))
);

console.log("💰 Enriched order items:");
console.table(enrichedOrders);

/* Total revenue per order */
const orderRevenue = orders.map(order => {
    const orderItems = enrichedOrders.filter(item => item.orderId === order.orderId);
    const total = orderItems.reduce((sum, item) => sum + item.price, 0);
    return { orderId: order.orderId, totalRevenue: total };
});

console.log("📊 Order revenue:");
console.table(orderRevenue);



/**
 * Pattern 3: concat() + Spread Operator - Flexible Combining
*/

const defaultSettings = { theme: "light", language: "en", notifications: true };
const userPreferences = { theme: "dark", fontSize: "large" };
const temporarySettings = { language: "hi" };

/* Multiple objects ko combine karo */
/* Method 1: concat (arrays ke liye) */
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinedArrays = array1.concat(array2);

/* Method 2: Spread operator (modern approach) */
const combinedWithSpread = [...array1, ...array2];

console.log("concat result:", combinedArrays);
console.log("spread result:", combinedWithSpread);

/* Objects ke liye spread operator use karo */
const finalSettings = {
    ...defaultSettings,
    ...userPreferences, 
    ...temporarySettings
};

console.log("⚙️ Final settings:", finalSettings);


