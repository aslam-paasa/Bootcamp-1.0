/**
 * Pehle, hum ek UserRoles type banayenge jo teen values me se koi ek ho sakti hai:
 * > 'admin'  => Administrator role
 * > 'user'   => Normal user role 
 * > 'guest'  => Guest user role
 */
type UserRoles = 'admin' | 'user' | 'guest';

/**
 * Record utility type ka use karke hum ek object banayenge:
 * 
 * > Record<Keys, Type> ka matlab hai:
 *   - Keys: Object ke keys ka type (yahan UserRoles)
 *   - Type: Object ke values ka type (yahan string)
 * 
 * Jaise ek dictionary me har word ki definition hoti hai!
 */
const userPermissions: Record<UserRoles, string> = {
    admin: 'Full Access',
    user: 'Limited Access', 
    guest: 'Read-Only Access'
};

/**
 * Console me dekhte hain hamara userPermissions object
 * Har role ke liye uska permission level dikhega
 */
console.log(userPermissions);
