/**
 * Map + Filter Combination ka use kab karte hain:
 * 1. Jab hume kisi array se specific elements filter karke unhe transform karna ho
 * 2. Filter pehle use karte hain taki sirf required elements bache
 * 3. Phir map use karke un filtered elements ko transform karte hain
 * 4. Isse performance better hoti hai kyunki map sirf filtered elements pe hi chalta hai
 */

/**
 * Example-1: E-commerce website pe products ko filter aur transform karna
 * Scenario: Electronics category ke products ko filter karke unke discounted prices calculate karna
 */

const products = [
    { id: 1, name: "Laptop", price: 45000, category: "Electronics" },
    { id: 2, name: "T-shirt", price: 999, category: "Clothing" },
    { id: 3, name: "Headphones", price: 2500, category: "Electronics" },
    { id: 4, name: "Jeans", price: 1999, category: "Clothing" },
    { id: 5, name: "Smartphone", price: 15000, category: "Electronics" }
];

/**
 * Pehle filter karke electronics products nikalo, phir map se discount calculate karo
 */
const discountedElectronics = products
    .filter(product => product.category === "Electronics")  // Electronics products filter
    .map(product => ({
        ...product,
        discountedPrice: product.price * 0.9  // 10% discount
    }));

console.log("Discounted Electronics Products:", discountedElectronics);

/**
 * Example-2: Social Media Platform pe posts ko filter aur transform karna
 * Scenario: Verified users ke viral posts ko filter karke unke engagement metrics calculate karna
 */

const socialMediaPosts = [
    { id: 1, content: "Tech Review", author: "TechGuru", isVerified: true, likes: 5000, shares: 2000 },
    { id: 2, content: "Food Recipe", author: "ChefJohn", isVerified: false, likes: 300, shares: 50 },
    { id: 3, content: "Travel Vlog", author: "TravelPro", isVerified: true, likes: 8000, shares: 3000 },
    { id: 4, content: "Fitness Tips", author: "FitLife", isVerified: false, likes: 200, shares: 30 },
    { id: 5, content: "Coding Tutorial", author: "CodeMaster", isVerified: true, likes: 6000, shares: 2500 }
];

/**
 * Pehle filter karke viral verified posts nikalo, phir map se engagement score calculate karo
 */
const viralVerifiedPosts = socialMediaPosts
    .filter(post => post.isVerified && (post.likes > 1000 || post.shares > 500))  // Viral verified posts filter
    .map(post => ({
        ...post,
        engagementScore: (post.likes * 0.6) + (post.shares * 0.4)  // Engagement score calculation
    }));

console.log("Viral Verified Posts with Engagement Score:", viralVerifiedPosts);