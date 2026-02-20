/**
 * localeCompare() - String Comparison 
 * > localeCompare() do strings ko alphabetically compare karta hai, 
 *   locale-sensitive way mein.
 * > Return Values:
 *   - -1 → First string comes before second string
 *   -  0 → Strings are equal
 *   -  1 → First string comes after second string
*/

/**
 * Ex 1: Basic localCompare Operations
*/
console.log("🔤 String Comparison with localeCompare():");

// ✅ Basic comparison
console.log(`"apple".localeCompare("banana"): ${"apple".localeCompare("banana")}`); // -1
console.log(`"banana".localeCompare("apple"): ${"banana".localeCompare("apple")}`); // 1
console.log(`"apple".localeCompare("apple"): ${"apple".localeCompare("apple")}`); // 0

// ✅ Case sensitivity
console.log(`"apple".localeCompare("Apple"): ${"apple".localeCompare("Apple")}`); // 1 (browser dependent)

// ✅ With locale specification
console.log(`"ä".localeCompare("z", "de"): ${"ä".localeCompare("z", "de")}`); // -1 (German: ä comes before z)
console.log(`"ä".localeCompare("z", "sv"): ${"ä".localeCompare("z", "sv")}`); // 1 (Swedish: ä comes after z)

// ✅ Numeric sorting
console.log(`"10".localeCompare("2"): ${"10".localeCompare("2")}`); // -1 (alphabetical)
console.log(`"10".localeCompare("2", undefined, {numeric: true}): ${"10".localeCompare("2", undefined, { numeric: true })}`); // 1 (numerical)


/**
 * Ex 2: Real World - Sorting System
*/
class StringSorter {
    static sortStrings(strings, locale = 'en', options = {}) {
        console.log(`🔤 Sorting ${strings.length} strings...`);

        const sorted = [...strings].sort((a, b) =>
            a.localeCompare(b, locale, options)
        );

        console.log("✅ Sorted strings:", sorted);
        return sorted;
    }

    static sortUsers(users, sortBy = 'name') {
        console.log(`👥 Sorting users by ${sortBy}...`);

        const sorted = [...users].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'email':
                    return a.email.localeCompare(b.email);
                case 'city':
                    return a.city.localeCompare(b.city);
                default:
                    return 0;
            }
        });

        console.log("✅ Sorted users:");
        sorted.forEach(user => {
            console.log(`   - ${user.name} (${user.email}) - ${user.city}`);
        });

        return sorted;
    }

    static caseInsensitiveSort(strings) {
        console.log("🎯 Case-insensitive sorting...");

        const sorted = [...strings].sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: 'base' })
        );

        console.log("✅ Case-insensitive sorted:", sorted);
        return sorted;
    }

    static naturalSort(strings) {
        console.log("🔢 Natural sorting (numeric-aware)...");

        const sorted = [...strings].sort((a, b) =>
            a.localeCompare(b, undefined, { numeric: true })
        );

        console.log("✅ Naturally sorted:", sorted);
        return sorted;
    }
}

// Usage
console.log("--- Basic String Sorting ---");
const languages = ["JavaScript", "Python", "Java", "C++", "Ruby"];
StringSorter.sortStrings(languages);

console.log("\n--- User Sorting ---");
const users = [
    { name: "Rahul", email: "rahul@example.com", city: "Delhi" },
    { name: "Priya", email: "priya@test.com", city: "Mumbai" },
    { name: "Amit", email: "amit@demo.com", city: "Bangalore" }
];
StringSorter.sortUsers(users, 'name');
StringSorter.sortUsers(users, 'city');

console.log("\n--- Case-Insensitive Sorting ---");
const mixedCase = ["apple", "Banana", "cherry", "Date"];
StringSorter.caseInsensitiveSort(mixedCase);

console.log("\n--- Natural Sorting ---");
const versions = ["v1", "v10", "v2", "v11", "v20"];
StringSorter.naturalSort(versions);


/**
 * Ex 3: Search and Filter System
*/
class SearchFilter {
    static filterAndSort(items, searchTerm, sortBy = 'name') {
        console.log(`🔍 Filtering and sorting for: "${searchTerm}"`);

        // Case-insensitive search
        const filtered = items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort results
        const sorted = filtered.sort((a, b) =>
            a[sortBy].localeCompare(b[sortBy])
        );

        console.log(`✅ Found ${sorted.length} items:`);
        sorted.forEach(item => {
            console.log(`   - ${item.name} (${item.category}) - $${item.price}`);
        });

        return sorted;
    }

    static findClosestMatch(searchTerm, options) {
        console.log(`🎯 Finding closest match for: "${searchTerm}"`);

        // Find option with smallest localeCompare difference
        let bestMatch = null;
        let smallestDiff = Infinity;

        options.forEach(option => {
            const diff = Math.abs(searchTerm.localeCompare(option));
            if (diff < smallestDiff) {
                smallestDiff = diff;
                bestMatch = option;
            }
        });

        console.log(`✅ Closest match: "${bestMatch}"`);
        return bestMatch;
    }

    static groupByFirstLetter(items) {
        console.log("🔤 Grouping by first letter...");

        const groups = {};

        items.forEach(item => {
            const firstLetter = item.charAt(0).toUpperCase();
            if (!groups[firstLetter]) {
                groups[firstLetter] = [];
            }
            groups[firstLetter].push(item);
        });

        // Sort groups and items within groups
        const sortedGroups = {};
        Object.keys(groups).sort((a, b) => a.localeCompare(b)).forEach(letter => {
            sortedGroups[letter] = groups[letter].sort((a, b) => a.localeCompare(b));
        });

        console.log("✅ Grouped items:");
        Object.entries(sortedGroups).forEach(([letter, items]) => {
            console.log(`   ${letter}: ${items.join(', ')}`);
        });

        return sortedGroups;
    }
}

// Usage
console.log("--- Search and Filter ---");
const products = [
    { name: "JavaScript Book", category: "Programming", price: 29.99 },
    { name: "Python Course", category: "Programming", price: 49.99 },
    { name: "Web Design", category: "Design", price: 39.99 },
    { name: "Data Science", category: "Analytics", price: 59.99 }
];
SearchFilter.filterAndSort(products, "prog", "name");

console.log("\n--- Closest Match ---");
const categories = ["Programming", "Design", "Analytics", "Marketing"];
SearchFilter.findClosestMatch("program", categories);
SearchFilter.findClosestMatch("analytics", categories);

console.log("\n--- Grouping by First Letter ---");
const names = ["Rahul", "Priya", "Amit", "Neha", "Raj", "Pooja"];
SearchFilter.groupByFirstLetter(names);