const validator = require("validator");

/**
 * API Level Validation:
 * 1. Validate User during Register:
 *    a. Check if all the mandatory fields are present in the data.
 *    b. Check if the emailId is valid.
 *    c. Check if the password is strong.
 *    d. Check if the firstName is valid.
 *       - min > 3
 *       - max < 20
*/
function validUser(data) {
    
    const mandatoryFields = ["firstName", "emailId", "age", "password"];
    const IsAllowed = mandatoryFields.every((k) => Object.keys(data).includes(k));
    if (!IsAllowed) {
        throw new Error("Fields Missing");
    }

    if (!validator.isEmail(data.emailId)) {
        throw new Error("Invalid Email");
    }

    if (!validator.isStrongPassword(data.password)) {
        throw new Error("Password is not strong");
    }

    if (!(data.firstName.length >= 3 && data.firstName.length <= 20)) {
        throw new Error("Name should be between 3 and 20 characters");
    }
}

module.exports = validUser;