/**
 * Problem with databases: Speed
 * - Typically humara client server ko GET, POST, PUT, DELETE request kar
 *   sakta hai, and in return hum usko response dete hai. Aur yahi sab
 *   chij humaare jitne available clients hote hai wo sb humaare saath
 *   karte hai
 * - Technically, servers backend m ek chij use karte hai i.e. databases to
 *   persist data.
 *   a. Get request ko data de rha hai, and 
 *   b. post request se data le k database m store kar rha hai, 
 *   c. patch data ko update kar rha hai, 
 *   d. delete request se data ko delete kar rha hai. 
 * - So, saari ki saari kahani data k around revolve karti hai, aur iss data
 *   ko securely store karna ek art hai. Aur database software data ko at the
 *   end of the day ek secondary storage (SSD, HDD, etc.) m store karta hai.
 * - And data ko optimally read and write karne k liye humein ek advance
 *   system chaiye i.e. database jo humaare data ko consistently rakhta hai.
 * - But iske v kuch cons hai:
 *   a. Too much overhead of data transfer, means ek data ko read and write
 *      karne k liye kuch data yha kuch se to kuch data waha se le k fir
 *      usme operations kar k client ko return karte hai jo bahut time leta
 *      hai which makes our database slow.
 *   b. But agar hum ye database ko speed karne k liye overhead system hata 
 *      se to poor data management ho jaegi, aur data loss v ho skta hai.
 *      So, technically we have to live with this problem.
 * - But as the users are increasing, the data is also increasing, and it
 *   is important to serve the data fast to the users for better user
 *   experience. How can we solve this problem?
*/

/**
 * Solution:
 * - Two types of memory:
 *   1. Primary memory (RAM)
 *      a. Pros:
 *         - fast memory 
 *      b. Cons:
 *         - Volatile, means data is lost when the power is off 
 *         - Less storage
 *   2. Secondary memory
 * 
 * - Mera database ka cons primary memory solve kar rhi hai, but ye volatile
 *   hai jo worth it nhi hai. But kahi na kahi solution dono memory k bich
 *   m lie karta hai.
 * - Ek kaam karte hai ki data ko hum database se hi fetch karnge because
 *   ye ultimate source of truth hai. Aur jab hum data ko fetch karnge to
 *   uska ek copy apne primary memory m v bna denge.
 * - Suppose database m 100million rows hai, aur user ne query karna chaha
 *   ki mujhe saare orders ka total batao. But isme to time lagega qki 
 *   100 million rows pe fetch karte hue mujhe unka addition karna hai
 *   is time taking, let's say 100s. But after 100s, mere paas result aa
 *   gya ki $500millions order hai, and at the end of the day ye to ek
 *   simple value hai. To kya hum iss computed value ko apne RAM m rakh 
 *   sakte hai? Yes! aur ye data user ko v return kar de. 
 * - To pehli baar m user ko 100s wait karna pada, but ab jab user next time
 *   aaega to wo pehle RAM m check karega ki wo value RAM m exist karti hai
 *   ya nahi, aur agar exist kar rhi hai to mai yhi se direct de du which is
 *   fast like 0.01ms, but agar wo value yha nhi hoti tab hum fir se database
 *   se fetch karte.
 * - Now users are happy ki pehli baar time lagta hai lekin overall fast hai.
*/

/**
 * Problem: Data Inconsistency
 * - But ye database m data ko change hote rahega qki aur orders aate rahnge,
 *   aur ye mere stored value ko galat kar degi. Basically, unko ek past
 *   value dikh rhi hai, which leads to data inconsistency. Lekin humaara
 *   database m data sahi hai, but hum read humaare primary memory se
 *   kar rhe hai, aur waha par kisi ne cache update hi nhi kiya.
 * 
 * Solution: Clear Cache logic
 * - So, ab humein apne servers ko kuch iss tarah se set karna pdega ki
 *   agar database m kuch v change hota hai to I should clear this value,
 *   so next time jb wo yha pe query kare to unko wo value nhi milegi, 
 *   system fir se compute karega fir cache m rakh dega aur fir return
 *   karega.
 * 
 *   await db.write()
 *   await clearCache()
*/

/**
 * Problem: Memory
 * -  Bahut saare users data rakhnge to memory full ho jaega. 
 * 
 * Solution: LRU Cache
 * - Suppose 1000 users are online, and each user is sending 10 requests per
 *   second, and each request is 100KB. Ab bahut time se data-2 ko kisi user
 *   ne access hi nahi kiya hai to hum uss user data ko inactive maan k
 *   hata denge aur uss position pe dusra data store kar denge. Aur isko
 *   LRU cache algorithm (Least Recently Used) kehte hai.
 * - Ye basically karta hai ki agar memory full ho gyi to jo v least recently
 *   used data hai usko data dega.
*/


/**
 * Problem:
 * - Ab hum primary memory se data ko read, write, clear etc kar rhe jo 
 *   apne aap m hi ek problem ban gya hai. Ye waisa hai jaise hum database
 *   jo waha pe solve kar rha tha secondary memory k liye, mai to same 
 *   problem introduced kar diya for primary memory.
 * - Primary memory k upar write kon karega? Delete kaise karunga? etc
 *   Mere paas poora ek overhead aa gya.
 * 
 * Solution:
 * - Mujhe ek library chaiye jo iss overhead ko le le aur systematically ye
 *   ek wrapper k tarah kaam kare iss primary memory k upar. And iss
 *   standard library ko redis kehte hai.
 * - Isme data is stored in key-value pairs. And we can also call it a
 *   key-value store.
 * 
 * - And because ye ek wrapper hai to ye v ek server create kar sakta hai
 *   kisi port pe.
 * 
 * Q. Kya multiple server ek redis server se connect ho skte hai?
 * => Yes. It means kisi ek user ne yha pe kuch rakha to dusra user usse
 *    read v kar skta hai.
 * => It acts as a bridge between multiple servers but the only problem is
 *    it is not persistent.
 * => Redis is:
 *    a. In-memory database: Data is stored in primary memory.
 *    b. Key-value store   : Data is stored in key-value pairs.
 *    c. Distributed system: Data is stored in multiple servers.
 *    d. Cache system      : Data is stored in primary memory.
 *    e. Message broker    : Multiple servers can connect to a single redis
 * 
 * Q. What type of data is stored in redis?
 * => It can store any type of data, but usually computed values.
 *    Or we can say result value or cached value.
*/

/**
 * Note:
 * 1. Postgres is wrapper around secondary memory (SSD, HDD, etc.)
 * 2. Redis is wrapper around primary memory (RAM) and which provides
 *    bunch of methods.
*/

/**
 * Commands:
 * 1. npm init -y
 * 2. npm i typescript @types/node -D
 * 3. npm i express@4.x
 * 4. npm i @types/express@4.x -D
 * 5. npm i tsc-watch -D
 * 6. tsc --init
 * 7. Go to tsconfig:
 *    a. rootDir: ./src
 *    b. outDir: ./dist
 * 8. Go to package.json:
 *    "scripts": {
 *      "build": "tsc -p .",
 *      "start": "node dist/index.js"
 *      "dev": "tsc-watch --onSuccess \"node dist/index.js\""
 *    }
 * 9. npm run build
 * 10. npm run start
 * 11. npm run dev
 * 
 * 12. docker-compose up -d (to start the redis server)
 * 13. docker-compose down  (to stop the redis server)
 * 
 * 14. docker ps (to see the running containers)
 * 15. docker stop <container_id> (to stop the redis server)
 * 16. docker rm <container_id>   (to remove the redis server)
*/

import express from 'express'
import axios from 'axios'


const app = express();
const PORT = process.env.PORT ?? 3000;


/**
 * 1. Create a local cache store: (without redis)
*/
interface CacheStore {
    totalPageCount: number;
}

const cacheStore: CacheStore = {
    totalPageCount: 0,
};


app.get('/', (req, res) => {
    return res.json({ status: 'success' });
});


app.get('/books', async (req, res) => {
    const response = await axios.get('https://api.freeapi.app/api/v1/public/books')
    return res.json(response.data);
});


/** 
 * Caching:
 * Technically, we it's not a good practice to count everytime. So, we
 * can cache this value, and everytime we will check if the value is
 * present in the cache store then we will return the value from the
 * cache store, otherwise we will fetch the value from the API and
 * store it in the cache store.
 * a. First API Hit: Cache miss (500ms)
 * b. Second API Hit: Cache hit (5ms) [significantly faster]
 * 
 * Issue: 
 * a. Server restart karte hue cache clear ho jata hai.
 * b. Mere cache memory ko koi server access nhi kar sakta.
*/

/**
 * Create a route to get the data from the cache store
 * a. Check the cache store
 * b. If the data is present in the cache store, then return the data
 *    from the cache store
 * c. If the data is not present in the cache store, then fetch the data
 *    from the API and store it in the cache store
 * d. Return the data from the cache store
*/
app.get('/books/total', async (req, res) => {
    
    /**
     * 2. Check the cache :
    */

    if(cacheStore.totalPageCount) {
        console.log('Cache hit');
        return res.json({ totalPageCount: Number(cacheStore.totalPageCount) });
    }

    const response = await axios.get('https://api.freeapi.app/api/v1/public/books')


    const totalPageCount = response?.data?.data?.data?.reduce(
        (acc: number, curr: { volumeInfo?: { pageCount?: number } }) => !curr.volumeInfo?.pageCount ? 0 : curr.volumeInfo.pageCount + acc, 0
    );

    /**
     * 3. Set the cache value
    */
    cacheStore.totalPageCount = Number(totalPageCount);

    console.log('Cache miss');
    return res.json({ totalPageCount: Number(totalPageCount) });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});