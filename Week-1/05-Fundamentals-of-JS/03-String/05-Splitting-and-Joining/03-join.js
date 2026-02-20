/**
 * join() - Array Ko String Mein Convert Karna
 * > join() array ke elements ko specified separator se join karke 
 *   string banata hai.
 * > Syntax: array.join(separator)
*/


/**
 * Ex 1: Basic Join Operations
*/
const words = ["JavaScript", "Python", "Java", "C++"];

console.log("🔤 Array:", words);

// ✅ Comma separator (default)
console.log('join():', words.join());
// "JavaScript,Python,Java,C++"

// ✅ Custom separator
console.log('join(" - "):', words.join(" - "));
// "JavaScript - Python - Java - C++"

// ✅ No separator
console.log('join(""):', words.join(""));
// "JavaScriptPythonJavaC++"

// ✅ Space separator
console.log('join(" "):', words.join(" "));
// "JavaScript Python Java C++"

// ✅ Newline separator
console.log('join("\\n"):', words.join("\n"));
// Each word on new line


/**
 * Ex 2: Real World - Data Formatting
*/
class DataFormatter {
    static createCSV(headers, data) {
        console.log("📊 Creating CSV...");

        const rows = [headers.join(',')];

        data.forEach(item => {
            const row = headers.map(header =>
                this.escapeCSV(item[header] || '')
            ).join(',');
            rows.push(row);
        });

        const csv = rows.join('\n');
        console.log("✅ Generated CSV:");
        console.log(csv);
        return csv;
    }

    static escapeCSV(value) {
        if (typeof value !== 'string') {
            value = String(value);
        }

        // Escape commas and quotes
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            value = '"' + value.replace(/"/g, '""') + '"';
        }

        return value;
    }

    static generateQueryString(params) {
        console.log("🔗 Generating query string...");

        const queryParts = [];

        for (const [key, value] of Object.entries(params)) {
            if (value !== null && value !== undefined) {
                queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        }

        const queryString = queryParts.join('&');
        console.log(`✅ Query string: ${queryString}`);
        return queryString;
    }

    static createBulletedList(items) {
        console.log("📝 Creating bulleted list...");

        const list = items.map(item => `• ${item}`).join('\n');
        console.log(`✅ Bulleted list:\n${list}`);
        return list;
    }

    static formatPhoneNumber(parts) {
        console.log("📞 Formatting phone number...");

        const formatted = parts.join('-');
        console.log(`✅ Formatted: ${formatted}`);
        return formatted;
    }
}

// Usage
console.log("--- CSV Generation ---");
const headers = ["Name", "Age", "City"];
const data = [
    { Name: "Rahul", Age: 25, City: "Delhi" },
    { Name: "Priya", Age: 30, City: "Mumbai" },
    { Name: "Amit, Jr.", Age: 28, City: 'Bangalore' }
];
DataFormatter.createCSV(headers, data);

console.log("\n--- Query String Generation ---");
DataFormatter.generateQueryString({
    search: "JavaScript",
    page: 1,
    sort: "name",
    category: "programming"
});

console.log("\n--- Bulleted List ---");
DataFormatter.createBulletedList(["Learn JavaScript", "Build projects", "Get job"]);

console.log("\n--- Phone Number Formatting ---");
DataFormatter.formatPhoneNumber(["123", "456", "7890"]);


/**
 * Ex 3: Template Generator
*/
class TemplateGenerator {
    static generateEmailTemplate(template, data) {
        console.log("📧 Generating email template...");

        let content = template;

        // Replace placeholders
        for (const [key, value] of Object.entries(data)) {
            const placeholder = `{{${key}}}`;
            content = content.split(placeholder).join(value);
        }

        console.log(`✅ Generated email:\n${content}`);
        return content;
    }

    static createSQLQuery(table, conditions = {}) {
        console.log(`🗄️ Creating SQL query for table: ${table}`);

        let query = `SELECT * FROM ${table}`;

        if (Object.keys(conditions).length > 0) {
            const whereClauses = [];

            for (const [column, value] of Object.entries(conditions)) {
                whereClauses.push(`${column} = '${value}'`);
            }

            query += ' WHERE ' + whereClauses.join(' AND ');
        }

        console.log(`✅ SQL query: ${query}`);
        return query;
    }

    static generateBreadcrumb(paths) {
        console.log("🍞 Generating breadcrumb...");

        const breadcrumb = paths.join(' > ');
        console.log(`✅ Breadcrumb: ${breadcrumb}`);
        return breadcrumb;
    }

    static createPath(segments) {
        console.log("🛣️ Creating path from segments...");

        // Remove leading/trailing slashes and join with single slash
        const cleanSegments = segments.map(segment =>
            segment.replace(/^\/+|\/+$/g, '')
        ).filter(segment => segment.length > 0);

        const path = '/' + cleanSegments.join('/');
        console.log(`✅ Path: ${path}`);
        return path;
    }
}

// Usage
console.log("--- Email Template Generation ---");
const emailTemplate = `
Dear {{name}},

Thank you for your interest in {{product}}.
Your order #{{orderId}} has been confirmed.

Total amount: ${{ amount }}

Best regards,
{{company}} Team
`;

TemplateGenerator.generateEmailTemplate(emailTemplate, {
    name: "Rahul",
    product: "JavaScript Course",
    orderId: "12345",
    amount: "49.99",
    company: "TechAcademy"
});

console.log("\n--- SQL Query Generation ---");
TemplateGenerator.createSQLQuery("users", {
    status: "active",
    country: "India",
    age: "25"
});

console.log("\n--- Breadcrumb Generation ---");
TemplateGenerator.generateBreadcrumb(["Home", "Products", "Electronics", "Phones"]);

console.log("\n--- Path Creation ---");
TemplateGenerator.createPath(["", "api", "v1", "users", ""]);