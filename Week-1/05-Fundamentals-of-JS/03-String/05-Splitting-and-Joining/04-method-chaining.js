/**
 * Ex 1: Text Processing Pipeline
*/
class TextPipeline {
    // Yahan apna code likhein:
    // 1. processText() - text ko multiple steps mein process kare
    // 2. analyzeContent() - text ka comprehensive analysis kare
    // 3. generateSlug() - text se SEO-friendly slug banaye
    // 4. createExcerpt() - text se excerpt generate kare

    // Solution:
    static processText(text, steps) {
        console.log("🔄 Processing text through pipeline...");
        console.log(`📝 Original: "${text}"`);

        let result = text;

        steps.forEach((step, index) => {
            result = step(result);
            console.log(`   Step ${index + 1}: "${result}"`);
        });

        console.log(`✅ Final result: "${result}"`);
        return result;
    }

    static analyzeContent(text) {
        console.log("🔍 Analyzing content...");

        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);

        const analysis = {
            sentences: sentences.length,
            words: words.length,
            paragraphs: paragraphs.length,
            characters: text.length,
            charactersNoSpaces: text.replace(/\s/g, '').length,
            wordFrequency: {}
        };

        // Word frequency
        words.forEach(word => {
            const clean = word.toLowerCase().replace(/[^\w]/g, '');
            if (clean) {
                analysis.wordFrequency[clean] = (analysis.wordFrequency[clean] || 0) + 1;
            }
        });

        console.log("📊 Content Analysis:");
        console.log(`   Sentences: ${analysis.sentences}`);
        console.log(`   Words: ${analysis.words}`);
        console.log(`   Paragraphs: ${analysis.paragraphs}`);
        console.log(`   Characters: ${analysis.characters}`);
        console.log(`   Characters (no spaces): ${analysis.charactersNoSpaces}`);

        return analysis;
    }

    static generateSlug(text) {
        console.log(`🔗 Generating slug: "${text}"`);

        const slug = text
            .toLowerCase()
            .split(/\s+/)
            .map(word => word.replace(/[^\w]/g, ''))
            .filter(word => word.length > 0)
            .join('-');

        console.log(`✅ Slug: ${slug}`);
        return slug;
    }

    static createExcerpt(text, maxWords = 20) {
        console.log(`📖 Creating excerpt (max ${maxWords} words)...`);

        const words = text.split(/\s+/);

        if (words.length <= maxWords) {
            console.log(`✅ Full text within limit: "${text}"`);
            return text;
        }

        const excerptWords = words.slice(0, maxWords);
        const excerpt = excerptWords.join(' ') + '...';

        console.log(`✅ Excerpt: "${excerpt}"`);
        return excerpt;
    }

    static compareTexts(text1, text2, method = 'strict') {
        console.log(`⚖️ Comparing texts (method: ${method})...`);

        let areEqual;

        switch (method) {
            case 'strict':
                areEqual = text1 === text2;
                break;
            case 'caseInsensitive':
                areEqual = text1.toLowerCase() === text2.toLowerCase();
                break;
            case 'normalized':
                const norm1 = text1.toLowerCase().replace(/\s+/g, ' ').trim();
                const norm2 = text2.toLowerCase().replace(/\s+/g, ' ').trim();
                areEqual = norm1 === norm2;
                break;
            default:
                areEqual = text1 === text2;
        }

        console.log(areEqual ? "✅ Texts are equal" : "❌ Texts are different");
        return areEqual;
    }
}

// Test
console.log("--- Text Processing Pipeline ---");
const processingSteps = [
    text => text.trim(),
    text => text.toLowerCase(),
    text => text.replace(/[^\w\s]/g, ''),
    text => text.replace(/\s+/g, ' ')
];
TextPipeline.processText("  Hello   WORLD! How ARE you?  ", processingSteps);

console.log("\n--- Content Analysis ---");
const article = `JavaScript is a programming language. It is used for web development.
Many developers love JavaScript because it is versatile.

You can use JavaScript for frontend and backend development.`;
TextPipeline.analyzeContent(article);

console.log("\n--- Slug Generation ---");
TextPipeline.generateSlug("JavaScript Array Methods!");
TextPipeline.generateSlug("  Hello World - How are you?  ");

console.log("\n--- Excerpt Creation ---");
TextPipeline.createExcerpt("This is a very long text that should be truncated for preview purposes", 8);

console.log("\n--- Text Comparison ---");
TextPipeline.compareTexts("Hello World", "hello world", "strict");
TextPipeline.compareTexts("Hello World", "hello world", "caseInsensitive");
TextPipeline.compareTexts("Hello   World", "hello world", "normalized");


/**
 * Ex 2: Data Transformation System
*/

class DataTransformer {
    // Yahan apna code likhein:
    // 1. transformCSV() - CSV data ko different formats mein convert kare
    // 2. createSearchIndex() - text data se search index banaye
    // 3. normalizeData() - data ko consistent format mein laaye
    // 4. generateReports() - data se various reports generate kare

    // Solution:
    static transformCSV(csvData, format = 'array') {
        console.log(`📊 Transforming CSV to ${format} format...`);

        const rows = csvData.split('\n')
            .map(row => row.trim())
            .filter(row => row.length > 0);

        let result;

        switch (format) {
            case 'array':
                result = rows.map(row => row.split(',').map(field => field.trim()));
                break;
            case 'object':
                const headers = rows[0].split(',').map(h => h.trim());
                result = rows.slice(1).map(row => {
                    const fields = row.split(',').map(f => f.trim());
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = fields[index] || '';
                    });
                    return obj;
                });
                break;
            case 'json':
                const objects = this.transformCSV(csvData, 'object');
                result = JSON.stringify(objects, null, 2);
                break;
            default:
                result = rows;
        }

        console.log(`✅ Transformed to ${format}:`, result);
        return result;
    }

    static createSearchIndex(texts) {
        console.log("🔍 Creating search index...");

        const index = {};

        texts.forEach((text, docId) => {
            const words = text.toLowerCase()
                .split(/\W+/)
                .filter(word => word.length > 2); // Ignore short words

            words.forEach(word => {
                if (!index[word]) {
                    index[word] = [];
                }
                if (!index[word].includes(docId)) {
                    index[word].push(docId);
                }
            });
        });

        console.log("✅ Search index created:");
        Object.entries(index).forEach(([word, docs]) => {
            console.log(`   "${word}": [${docs.join(', ')}]`);
        });

        return index;
    }

    static normalizeData(data, rules) {
        console.log("🔄 Normalizing data...");

        const normalized = data.map(item => {
            const newItem = { ...item };

            for (const [field, rule] of Object.entries(rules)) {
                if (newItem[field] !== undefined) {
                    switch (rule) {
                        case 'trim':
                            newItem[field] = String(newItem[field]).trim();
                            break;
                        case 'lowercase':
                            newItem[field] = String(newItem[field]).toLowerCase();
                            break;
                        case 'uppercase':
                            newItem[field] = String(newItem[field]).toUpperCase();
                            break;
                        case 'capitalize':
                            newItem[field] = String(newItem[field])
                                .toLowerCase()
                                .replace(/\b\w/g, char => char.toUpperCase());
                            break;
                    }
                }
            }

            return newItem;
        });

        console.log("✅ Normalized data:", normalized);
        return normalized;
    }

    static generateReports(data, groupBy) {
        console.log(`📈 Generating reports grouped by: ${groupBy}`);

        const groups = {};

        data.forEach(item => {
            const key = item[groupBy];
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
        });

        console.log("📊 Reports:");
        Object.entries(groups).forEach(([group, items]) => {
            console.log(`   ${group}: ${items.length} items`);
            items.forEach(item => {
                console.log(`     - ${item.name || item.title || 'Unknown'}`);
            });
        });

        return groups;
    }

    static sortData(data, sortBy, order = 'asc') {
        console.log(`🔤 Sorting data by: ${sortBy} (${order})`);

        const sorted = [...data].sort((a, b) => {
            let comparison;

            if (typeof a[sortBy] === 'string') {
                comparison = a[sortBy].localeCompare(b[sortBy]);
            } else {
                comparison = a[sortBy] - b[sortBy];
            }

            return order === 'desc' ? -comparison : comparison;
        });

        console.log("✅ Sorted data:");
        sorted.forEach(item => {
            console.log(`   - ${item[sortBy]}: ${item.name || item.title}`);
        });

        return sorted;
    }
}

// Test
console.log("--- CSV Transformation ---");
const csvData = `
Name, Age, City
Rahul, 25, Delhi
Priya, 30, Mumbai
Amit, 28, Bangalore
`;
DataTransformer.transformCSV(csvData, 'array');
DataTransformer.transformCSV(csvData, 'object');
DataTransformer.transformCSV(csvData, 'json');

console.log("\n--- Search Index Creation ---");
const documents = [
    "JavaScript is a programming language",
    "Python is also a programming language",
    "JavaScript and Python are both popular"
];
DataTransformer.createSearchIndex(documents);

console.log("\n--- Data Normalization ---");
const rawData = [
    { name: "  rahul  ", email: "RAHUL@EXAMPLE.COM", city: "delhi" },
    { name: "PRIYA  ", email: "priya@test.com", city: "MUMBAI" },
    { name: "  amit", email: "Amit@Demo.Com", city: "bangalore" }
];
DataTransformer.normalizeData(rawData, {
    name: 'capitalize',
    email: 'lowercase',
    city: 'capitalize'
});

console.log("\n--- Report Generation ---");
const products = [
    { name: "Laptop", category: "Electronics", price: 999 },
    { name: "Mouse", category: "Electronics", price: 25 },
    { name: "Desk", category: "Furniture", price: 150 },
    { name: "Chair", category: "Furniture", price: 75 }
];
DataTransformer.generateReports(products, 'category');

console.log("\n--- Data Sorting ---");
DataTransformer.sortData(products, 'name');
DataTransformer.sortData(products, 'price', 'desc');