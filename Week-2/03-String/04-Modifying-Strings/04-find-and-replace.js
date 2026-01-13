/**
 * replace() & replaceAll() - Find and Replace
 * > replace()    - Pehla match replace karta hai
 * > replaceAll() - Saare matches replace karta hai (ES2021+)
*/

/**
 * Ex 1: Basic Replace Operations
*/
const text = "I love cats. Cats are amazing. I want a cat.";

console.log("📝 Original:", text);

// ✅ replace() - only first match
console.log(`replace("cat", "dog"): "${text.replace("cat", "dog")}"`);

// ✅ replaceAll() - all matches (ES2021+)
console.log(`replaceAll("cat", "dog"): "${text.replaceAll("cat", "dog")}"`);

// ✅ Case-insensitive replace with regex
console.log(`replace(/cat/gi, "dog"): "${text.replace(/cat/gi, "dog")}"`);

// ✅ Multiple replacements
let result = text;
result = result.replace("love", "adore");
result = result.replace("amazing", "wonderful");
console.log(`Multiple replaces: "${result}"`);


/**
 * Ex 2: Real World - Template System
*/
class TemplateEngine {
    static replacePlaceholders(template, data) {
        console.log("📧 Processing template with data:", data);

        let result = template;

        for (const [key, value] of Object.entries(data)) {
            const placeholder = `{{${key}}}`;
            result = result.replaceAll(placeholder, value);
        }

        console.log(`✅ Processed template:\n${result}`);
        return result;
    }

    static createEmailTemplate(user, product) {
        const template = `
Hello {{name}},

Thank you for your interest in {{productName}}!

The price of {{productName}} is ${{ price }}.

Best regards,
{{company}} Team
        `.trim();

        const data = {
            name: user.name,
            productName: product.name,
            price: product.price,
            company: "Awesome Corp"
        };

        return this.replacePlaceholders(template, data);
    }

    static sanitizeHTML(text) {
        console.log(`🛡️ Sanitizing HTML: "${text}"`);

        const sanitized = text
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');

        console.log(`✅ Sanitized: "${sanitized}"`);
        return sanitized;
    }

    static formatPhoneNumber(phone) {
        console.log(`📞 Formatting phone: ${phone}`);

        // Remove all non-digit characters
        const digits = phone.replace(/\D/g, '');

        // Format: (XXX) XXX-XXXX
        const formatted = digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

        console.log(`✅ Formatted: ${formatted}`);
        return formatted;
    }
}

// Usage
console.log("--- Template Engine Tests ---");
const user = { name: "Rahul" };
const product = { name: "JavaScript Course", price: "49.99" };
TemplateEngine.createEmailTemplate(user, product);

console.log("\n--- HTML Sanitization ---");
TemplateEngine.sanitizeHTML('<script>alert("XSS")</script>');
TemplateEngine.sanitizeHTML('<div class="test">Hello</div>');

console.log("\n--- Phone Number Formatting ---");
TemplateEngine.formatPhoneNumber("1234567890");
TemplateEngine.formatPhoneNumber("+1 (234) 567-8900");


/**
 * Ex 3: Text Processing Pipeline
*/
class TextProcessor {
    static normalizeText(text) {
        console.log("🔄 Normalizing text...");

        const normalized = text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ') // Multiple spaces to single
            .replace(/[^\w\s]/g, '') // Remove punctuation
            .replace(/\b(a|an|the|and|or|but)\b/g, ''); // Remove common words

        console.log(`✅ Normalized: "${normalized}"`);
        return normalized;
    }

    static createSlug(text) {
        console.log(`🔗 Creating slug: "${text}"`);

        const slug = text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special chars
            .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

        console.log(`✅ Slug: ${slug}`);
        return slug;
    }

    static maskSensitiveData(text, patterns) {
        console.log(`🔒 Masking sensitive data: "${text}"`);

        let masked = text;

        patterns.forEach(([pattern, replacement]) => {
            masked = masked.replaceAll(pattern, replacement);
        });

        console.log(`✅ Masked: "${masked}"`);
        return masked;
    }

    static highlightKeywords(text, keywords) {
        console.log(`🎨 Highlighting keywords: ${keywords.join(', ')}`);

        let highlighted = text;

        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            highlighted = highlighted.replace(regex, `**${keyword}**`);
        });

        console.log(`✅ Highlighted: ${highlighted}`);
        return highlighted;
    }
}

// Usage
console.log("--- Text Normalization ---");
TextProcessor.normalizeText("  Hello   WORLD! This is a TEST.  ");

console.log("\n--- Slug Creation ---");
TextProcessor.createSlug("JavaScript Array Methods");
TextProcessor.createSlug("Hello World! How are you?");

console.log("\n--- Data Masking ---");
const sensitiveText = "User: john_doe, Email: john@example.com, Phone: 123-456-7890";
const patterns = [
    [/john_doe/g, 'USERNAME'],
    [/john@example\.com/g, 'EMAIL'],
    [/\d{3}-\d{3}-\d{4}/g, 'PHONE']
];
TextProcessor.maskSensitiveData(sensitiveText, patterns);

console.log("\n--- Keyword Highlighting ---");
TextProcessor.highlightKeywords(
    "JavaScript is a programming language. JavaScript is used for web development.",
    ["JavaScript", "programming", "web"]
);