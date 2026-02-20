/**
 * Step 5: includes() - Value Existence Check
 * > includes() check karta hai ki array mein value exist karti hai ya nahi.
 * > Syntax: array.includes(value, fromIndex)
*/



/**
 * Example 1: Basic Existence Check
*/

const fruits = ["Apple", "Banana", "Orange", "Mango"];

console.log("🍎 Fruits:", fruits);

/* Basic includes check */
console.log("Includes 'Apple'?", fruits.includes("Apple")); // true
console.log("Includes 'Grapes'?", fruits.includes("Grapes")); // false

/* Case sensitive */
console.log("Includes 'apple'?", fruits.includes("apple")); // false

/* With fromIndex */
console.log("Includes 'Banana' from index 2?", fruits.includes("Banana", 2)); // false



/**
 * Example 2: Real World - Permission System
*/

class UserPermission {
    constructor(username, permissions) {
        this.username = username;
        this.permissions = permissions;
    }
    
    can(permission) {
        const hasPermission = this.permissions.includes(permission);
        console.log(`🔐 ${this.username} can ${permission}? ${hasPermission ? '✅' : '❌'}`);
        return hasPermission;
    }
    
    canAny(requestedPermissions) {
        const hasAny = requestedPermissions.some(permission => 
            this.permissions.includes(permission)
        );
        console.log(`🔐 ${this.username} can any of [${requestedPermissions.join(', ')}]? ${hasAny ? '✅' : '❌'}`);
        return hasAny;
    }
    
    canAll(requestedPermissions) {
        const hasAll = requestedPermissions.every(permission => 
            this.permissions.includes(permission)
        );
        console.log(`🔐 ${this.username} can all of [${requestedPermissions.join(', ')}]? ${hasAll ? '✅' : '❌'}`);
        return hasAll;
    }
}

/* Usage */
const admin = new UserPermission("admin", ["read", "write", "delete", "manage_users"]);
const user = new UserPermission("user", ["read", "write"]);

admin.can("delete");
admin.can("manage_users");
user.can("delete");
user.canAny(["delete", "manage_users"]);
user.canAll(["read", "write"]);