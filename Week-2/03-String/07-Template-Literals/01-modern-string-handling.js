/**
 * JavaScript Template Literals & Advanced String Formatting 
 * > Template Literals   = Smart text editor jo dynamic content 
 *                         automatically fill karta hai 
 * > Traditional Strings = Manual typewriter jahan sab kuch manually 
 *                         type karna padta hai
*/

/**
 * Basic Concept:
 * > Template literals (``) strings ko likhne ka modern tarika hai jo 
 *   variables aur expressions directly embed karne ki permission deta
 *   hai.
*/

// Traditional way
const name = "Rahul";
const message = "Hello " + name + ", welcome to JavaScript!";

// Modern way with template literals
const modernMessage = `Hello ${name}, welcome to JavaScript!`;


/**
 * 1. Basic Template Literals
 * > Syntax: `string text ${expression} string text`
*/

/**
 * Ex 1: Basic Variable Embedding
*/
const userName = "Rahul";
const userAge = 25;
const country = "India";

// ✅ Traditional concatenation
const oldWay = "Hello " + userName + ", you are " + userAge + " years old from " + country;

// ✅ Modern template literal
const newWay = `Hello ${userName}, you are ${userAge} years old from ${country}`;

console.log("📝 String Comparison:");
console.log("Traditional:", oldWay);
console.log("Modern:     ", newWay);


/**
 * Ex 2: Expressions Inside Templates
*/
const price = 100;
const quantity = 3;
const taxRate = 0.18;

// ✅ Calculations directly in template
const receipt = `
🛒 Purchase Details:
Price: $${price}
Quantity: ${quantity}
Subtotal: $${price * quantity}
Tax (18%): $${price * quantity * taxRate}
Total: $${price * quantity * (1 + taxRate)}
`;

console.log("🧾 Smart Receipt:");
console.log(receipt);


/**
 * Ex 3: Real World - User Greeting System
*/
class UserGreeting {
    static generateGreeting(user) {
        const currentHour = new Date().getHours();
        let timeOfDay;

        if (currentHour < 12) timeOfDay = "morning";
        else if (currentHour < 17) timeOfDay = "afternoon";
        else timeOfDay = "evening";

        return `
👋 Good ${timeOfDay}, ${user.name}!

📊 Your Profile:
• Name: ${user.name}
• Email: ${user.email}
• Member since: ${new Date(user.joinDate).toLocaleDateString()}
• Status: ${user.isActive ? '🟢 Active' : '🔴 Inactive'}

💼 Account Summary:
• Posts: ${user.postCount || 0}
• Followers: ${user.followers || 0}
• Rating: ${'⭐'.repeat(user.rating || 0)}

${user.isPremium ? '🎉 Premium Member Benefits Active!' : '💡 Upgrade to Premium for more features!'}
        `.trim();
    }

    static generateWelcomeEmail(user) {
        return `
📧 Welcome to Our Platform!

Dear ${user.name},

Thank you for joining our community! 
Your account has been successfully created.

🔐 Your temporary password: ${user.tempPassword}
📧 Your email: ${user.email}

Please change your password after first login.

Best regards,
The Team
        `.trim();
    }
}

// Usage
console.log("--- User Greeting System ---");
const user = {
    name: "Rahul Kumar",
    email: "rahul@example.com",
    joinDate: "2024-01-15",
    isActive: true,
    isPremium: true,
    postCount: 15,
    followers: 120,
    rating: 4,
    tempPassword: "Temp123!"
};

console.log(UserGreeting.generateGreeting(user));
console.log("\n" + "=".repeat(50) + "\n");
console.log(UserGreeting.generateWelcomeEmail(user));



/**
 * 2. Multi-line Strings
 * > Problem with Traditional Strings:
 *   Traditional strings mein multi-line content likhna complicated tha.
 * > Solution with Template Literals:
 *   Template literals naturally multi-line support karte hain.
*/

/**
 * Ex 1: Multi-line Content
*/
// ❌ Traditional way - messy
const oldMultiLine = "Line 1\n" +
    "Line 2\n" +
    "Line 3";

// ✅ Template literal - clean
const newMultiLine = `Line 1
Line 2
Line 3`;

console.log("Multi-line Comparison:");
console.log("Traditional:\n", oldMultiLine);
console.log("Modern:\n", newMultiLine);


/**
 * Ex 2: Real World - Email Templates
*/
class EmailTemplates {
    static orderConfirmation(order) {
        return `
🎉 Order Confirmed!

Dear ${order.customerName},

Thank you for your order! Here are your order details:

📦 Order #${order.id}
📅 Date: ${new Date(order.date).toLocaleDateString()}

🛍️ Items:
${order.items.map(item =>
            `   • ${item.name} - $${item.price} x ${item.quantity} = $${item.price * item.quantity}`
        ).join('\n')}

💰 Order Summary:
   Subtotal: $${order.subtotal}
   Shipping: $${order.shipping}
   Tax: $${order.tax}
   💰 Total: $${order.total}

🚚 Shipping Address:
   ${order.shippingAddress.street}
   ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}

You will receive a shipping confirmation email soon.

Thank you for shopping with us!
        `.trim();
    }

    static projectProposal(project) {
        return `
📋 Project Proposal: ${project.title}

📝 Description:
${project.description}

🎯 Objectives:
${project.objectives.map(obj => `• ${obj}`).join('\n')}

⏰ Timeline:
   • Start: ${project.timeline.start}
   • End: ${project.timeline.end}
   • Duration: ${project.timeline.duration}

💰 Budget: $${project.budget}

👥 Team:
${project.team.map(member => `   • ${member.name} - ${member.role}`).join('\n')}

${project.notes ? `\n📌 Additional Notes:\n${project.notes}` : ''}
        `.trim();
    }
}

// Usage
console.log("--- Email Templates ---");
const order = {
    id: "ORD-12345",
    customerName: "Priya Sharma",
    date: "2024-01-20",
    items: [
        { name: "JavaScript Book", price: 29.99, quantity: 1 },
        { name: "Web Development Course", price: 49.99, quantity: 1 },
        { name: "Programming Sticker Pack", price: 9.99, quantity: 2 }
    ],
    subtotal: 99.96,
    shipping: 5.99,
    tax: 8.50,
    total: 114.45,
    shippingAddress: {
        street: "123 Main Street",
        city: "Mumbai",
        state: "MH",
        zipCode: "400001"
    }
};

console.log(EmailTemplates.orderConfirmation(order));


/**
 * 3. Advanced Expressions & Functions
 * > Template literals mein complex expressions aur function calls bhi 
 *   use kar sakte hain.
*/

/**
 * Ex 1: Complex Expressions
*/
const products = [
    { name: "Laptop", price: 999, category: "Electronics" },
    { name: "Desk", price: 299, category: "Furniture" },
    { name: "Monitor", price: 199, category: "Electronics" }
];

// ✅ Complex calculations in templates
const inventoryReport = `
📊 Inventory Analysis:

${products.map(product =>
    `• ${product.name}: 
     Price: $${product.price}
     Category: ${product.category}
     ${product.price > 500 ? '💎 Premium Item' : '💰 Budget Friendly'}
     Discount Price: $${product.price * 0.9} (10% off)`
).join('\n\n')}

📈 Summary:
   Total Items: ${products.length}
   Total Value: $${products.reduce((sum, p) => sum + p.price, 0)}
   Average Price: $${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)}
   Electronics Count: ${products.filter(p => p.category === 'Electronics').length}
`;

console.log("Advanced Expressions:");
console.log(inventoryReport);


/**
 * Ex 2: Function Calls in Templates
*/
// Helper functions
const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
const getRatingStars = (rating) => '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
const calculateDiscount = (price, discount) => price - (price * discount / 100);

class ProductDisplay {
    static generateProductCard(product) {
        return `
🛍️ ${product.name.toUpperCase()}
${'─'.repeat(30)}
📝 ${product.description}
💰 Price: ${formatCurrency(product.price)}
🎯 Category: ${product.category}
⭐ Rating: ${getRatingStars(product.rating)}
${product.onSale ?
                `🎉 SALE! New Price: ${formatCurrency(calculateDiscount(product.price, product.discountPercent))} (${product.discountPercent}% OFF)` :
                '💡 Regular Price'
            }
${product.inStock ?
                `🟢 In Stock (${product.stockQuantity} available)` :
                '🔴 Out of Stock'
            }
${product.features ?
                `✨ Features:\n   ${product.features.map(f => `• ${f}`).join('\n   ')}` :
                ''
            }
        `.trim();
    }
}

// Usage
console.log("--- Product Display with Functions ---");
const product = {
    name: "Wireless Keyboard",
    description: "Mechanical wireless keyboard with RGB lighting",
    price: 89.99,
    category: "Electronics",
    rating: 4,
    onSale: true,
    discountPercent: 15,
    inStock: true,
    stockQuantity: 25,
    features: ["Wireless", "RGB Lighting", "Mechanical Keys", "Long Battery Life"]
};

console.log(ProductDisplay.generateProductCard(product));


/**
 * 4. Tagged Templates:
 * > Tagged templates aapko template literal par custom processing 
 *   apply karne ki permission dete hain.
 * > Syntax: tagFunction`string ${expression} string`
*/

/**
 * Ex 1: Basic Tagged Template
*/
// Tag function
function highlight(strings, ...values) {
    console.log("Strings:", strings);
    console.log("Values:", values);

    let result = "";
    strings.forEach((string, i) => {
        result += string;
        if (i < values.length) {
            result += `**${values[i]}**`; // Highlight values
        }
    });
    return result;
}

const names = "Rahul";
const age = 25;

// Using tagged template
const highlightedText = highlight`Hello ${names}, you are ${age} years old.`;
console.log("Tagged Template Result:", highlightedText);

/**
 * Ex 2: Real World - SQL Query Builder
*/
class SQLQueryBuilder {
    static sql(strings, ...values) {
        let query = "";
        strings.forEach((string, i) => {
            query += string;
            if (i < values.length) {
                // Properly escape values for SQL
                const value = values[i];
                if (typeof value === 'string') {
                    query += `'${value.replace(/'/g, "''")}'`; // Escape single quotes
                } else if (value === null || value === undefined) {
                    query += 'NULL';
                } else {
                    query += value;
                }
            }
        });
        return query.trim();
    }

    static html(strings, ...values) {
        let html = "";
        strings.forEach((string, i) => {
            html += string;
            if (i < values.length) {
                // Escape HTML to prevent XSS
                const value = String(values[i])
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#x27;');
                html += value;
            }
        });
        return html;
    }
}

// Usage
console.log("--- Tagged Templates ---");
const userName = "John O'Reilly";
const userAge = 30;
const userCity = "New York";

// SQL query with safe value insertion
const query = SQLQueryBuilder.sql`
    SELECT * FROM users 
    WHERE name = ${userName} 
    AND age > ${userAge} 
    AND city = ${userCity}
`;
console.log("SQL Query:", query);

// HTML with XSS protection
const userInput = '<script>alert("XSS")</script>';
const safeHTML = SQLQueryBuilder.html`
    <div class="user-content">
        ${userInput}
    </div>
`;
console.log("Safe HTML:", safeHTML);


/**
 * Ex 3: Advanced - Translation System
*/
class TranslationSystem {
    static translations = {
        en: {
            welcome: "Welcome",
            goodbye: "Goodbye",
            age: "age",
            years: "years"
        },
        hi: {
            welcome: "स्वागत हे",
            goodbye: "अलविदा",
            age: "उम्र",
            years: "साल"
        },
        es: {
            welcome: "Bienvenido",
            goodbye: "Adiós",
            age: "edad",
            years: "años"
        }
    };

    static translate(language) {
        return function (strings, ...values) {
            let result = "";
            strings.forEach((string, i) => {
                // Translate the string parts
                const translatedString = this.translations[language][string.trim()] || string;
                result += translatedString;

                if (i < values.length) {
                    result += values[i];
                }
            });
            return result;
        }.bind(this);
    }
}

// Usage
console.log("--- Translation System ---");
const nameI = "Rahul";
const ageI = 25;

const english = TranslationSystem.translate('en');
const hindi = TranslationSystem.translate('hi');
const spanish = TranslationSystem.translate('es');

console.log("English:", english`welcome ${nameI}, your ${ageI} age years`);
console.log("Hindi:", hindi`welcome ${nameI}, your ${ageI} age years`);
console.log("Spanish:", spanish`welcome ${nameI}, your ${ageI} age years`);


/**
 * 5. Nested Templates:
 * > Template literals ko nest karke complex structures create kar sakte hain.
*/

/**
 * Ex 1: Nested Templates for Complex UI
*/
class UIGenerator {
    static generateDashboard(user, stats, notifications) {
        const statusColor = user.isOnline ? '🟢' : '🔴';
        const statusText = user.isOnline ? 'Online' : 'Offline';
        
        return `
📊 USER DASHBOARD
${'='.repeat(40)}

👤 User Profile:
   ${statusColor} ${user.name} (${statusText})
   📧 ${user.email}
   🏢 ${user.department}
   📅 Member since: ${new Date(user.joinDate).toLocaleDateString()}

📈 Statistics:
   📊 Projects: ${stats.projects}
   ✅ Tasks Completed: ${stats.tasksCompleted}
   ⭐ Performance: ${'★'.repeat(stats.performance)}${'☆'.repeat(5 - stats.performance)}
   🏆 Rank: #${stats.rank}

${notifications.length > 0 ? `
🔔 Notifications (${notifications.length}):
${notifications.map(notif => `
   ${notif.urgent ? '🚨' : '💡'} ${notif.message}
   📅 ${new Date(notif.date).toLocaleDateString()}
`).join('')}
` : '💡 No new notifications'}

${user.isPremium ? `
🎉 PREMIUM FEATURES:
   • Advanced Analytics
   • Priority Support  
   • Custom Themes
` : `
💡 Upgrade to Premium for exclusive features!
`}
        `.trim();
    }
    
    static generateProjectTable(projects) {
        return `
📋 PROJECT OVERVIEW
${'─'.repeat(60)}

${projects.map(project => `
${project.priority === 'high' ? '🚨' : project.priority === 'medium' ? '⚠️' : '📝'} ${project.name}
${'─'.repeat(40)}
Status: ${project.status} | Priority: ${project.priority}
Deadline: ${new Date(project.deadline).toLocaleDateString()}
Progress: ${'█'.repeat(Math.floor(project.progress / 10))}${'░'.repeat(10 - Math.floor(project.progress / 10))} ${project.progress}%
Team: ${project.team.join(', ')}
${project.notes ? `Notes: ${project.notes}` : ''}
`).join('\n')}

📊 Summary:
   Total Projects: ${projects.length}
   High Priority: ${projects.filter(p => p.priority === 'high').length}
   Completed: ${projects.filter(p => p.status === 'completed').length}
   Average Progress: ${(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length).toFixed(1)}%
        `.trim();
    }
}

// Usage
console.log("--- Nested Templates ---");
const userData = {
    name: "Rahul Kumar",
    email: "rahul@company.com",
    department: "Engineering",
    joinDate: "2023-03-15",
    isOnline: true,
    isPremium: true
};

const userStats = {
    projects: 12,
    tasksCompleted: 89,
    performance: 4,
    rank: 3
};

const notifications = [
    { message: "Project deadline approaching", date: "2024-01-25", urgent: true },
    { message: "New team member joined", date: "2024-01-24", urgent: false }
];

const projects = [
    {
        name: "Website Redesign",
        status: "in progress",
        priority: "high",
        deadline: "2024-02-15",
        progress: 65,
        team: ["Rahul", "Priya", "Amit"],
        notes: "Focus on mobile responsiveness"
    },
    {
        name: "API Documentation",
        status: "completed", 
        priority: "medium",
        deadline: "2024-01-20",
        progress: 100,
        team: ["Rahul", "Neha"],
        notes: ""
    }
];

console.log(UIGenerator.generateDashboard(userData, userStats, notifications));
console.log("\n" + "=".repeat(60) + "\n");
console.log(UIGenerator.generateProjectTable(projects));