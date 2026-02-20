/**
 * Axios:
 * > Axios ek tool hai jo frontend se backend ko request bhejta hai.
 * > Ex: axios.get("/users")
 * 
 * Problem: Har component pe axios use karnge to kya hoga?
 * > Socho tu har component me ye likhta hai:
 * 
 *   axios.get("http://localhost:8000/api/v1/users")
 *   axios.post("http://localhost:8000/api/v1/login")
 *   axios.get("http://localhost:8000/api/v1/profile", {
 *     headers: { Authorization: "Bearer token" }
 *   })
 *   
 * > Issue:
 *   - Same URL baar-baar
 *   - Token har request me manually 
 *   - Agar URL change hua - 100 jagha change
 *   - Code messy
 * 
 * Solution: Axios Instance 
 * > Axios Instance = Axios ka pre-configured version
 * > Socho: "Ek baar setup kar do, phir har jagha easy use"
*/

/**
 * What is Axios Instance?
 * > Axios instance ek custom axios object hota hai jisme common settings
 *   already hoti hain
 *   - base URL set
 *   - cookies allow
 *   - request timeout fixed
 *   - headers auto attach
 * > Axios tab use karte hai jab:
 *   - App backend se frequently baat krte ho
 *   - Token/auth use hota ho
 *   - Clean & Scalable code chahiye
 * > Almost every serious project me
*/

import axios from "axios";
import { StorageKeys } from "../utils/constants";

/**
 * Part-1: Axios Instance Configuration
 * > Local me localhost, production me real server
 * > Create axios instance which has:
 *   - URL to fetch
 *   - To access cookies
 *   - Request timeout
*/

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
    baseURL: API_URL,      /* URL to fetch */
    withCredentials: true, /* To access cookies */
    timeout: 10000,        /* Timeout request */
});



/**
 * Part-3: 
 * Q. Backend token cookies se leta hai, but agar kisi reason se 
 *    cookies kaam na karein... Kya hum token localStorage se bhej 
 *    sakte hai?
 * >  Yes! Aur ye kaam hum Axios Request Interceptor se karte hai.
 * 
 * 
 * What is Axios Interceptor?
 * > Interceptor = beech ka guard/middleware 
 * 
 * > Soch le: Component > Interceptor (check + modify) > Backend
 *                            |
 *                            V
 *                        - Request jaane se pehle usko rokna
 *                        - Kuch add/change karna
 *                        - Phir aage bhej dena
*/

/**
 * Axios Request Interceptor kab chalta hai?
 * > Har API request ke JUST pehle.
 * > Har baar interceptor automatically chalega, aur Component ko pta
 *   bhi nahi chalega.
*/

/**
 * Code Explanation:
 * 1. axiosInstance.interceptors.request.use()
 *    > Axios ko bol rhe h: "Har req bhjne se pehle, ye fn chalao"
 * 
 * 2. (config) => {}
 *    > config = request ka poora blueprint
 *    > Isme hota hai:
 *      - URL
 *      - method (GET/POST)
 *      - headers
 *      - body
 *      - timeout
 *    > Express middleware ke req jaisa soch lo
 * 
 * 3. LocalStorage se token uthana:
 *    > const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN)
 *    > Iska matlab:
 *      - Browser ke localStorage me dekho
 *      - Kya access token hai?
 *    > Possible cases:
 *      - Token mila
 *      - Token nhi mila
 * 
 * 4. Agar token mila to kya krna hai?
 *    > if (token) {
 *        config.headers.Authorization = `Bearer ${token}`
 *      }
 *    > Simple words me:
 *      - Agar token exist karta hai
 *      - To request ko headers me add kar do
 *    > Header ban jaata hai:
 *      - Authorization: Bearer eyJhbGciOiJIUzI1...
 *      - Backend middleware bolta hai: "Ohh token aa gya, let me verify"
 * 
 * 5. Bearer kyu likhte hai?
 *    > Industry standard hai: 
 *      - Authorization: Bearer <token>
 *      - Backend ko clear sign milta hai:
 *        - Token aa rha hai
 *        - Kis format me aa rha hai
 * 
 * 6. Modified Config ko wapas bhjna:
 *    > return config
 *    > Agar ye return nahi kiya:
 *      - Request yahi ruk jayega
 *      - Backend tak jaayega hi nahi
 *    > Soch le: "Token add karke, request ko green signal de diya"
 * 
 * 7. Error Handling:
 *    > (error) => Promise.reject(error)
 *    > Iska matlab:
 *      - Agar interceptor me koi issue aae
 *      - To request ko fail kar do
 *      - Error component tak pahuch jaaye
 * 
 * Summary:
 * > Component API call
 *           ↓
 * > Request Interceptor
 *           ↓
 * > LocalStorage check
 *           ↓
 * > Token mila? → Header add
 *           ↓
 * > Request backend ko jaati hai
*/

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)


/**
 * Access Token vs Refresh Token:
 * > Access Token (Short-life pass)
 *   - Ye ID card jaisa hota hai
 *   - Har API request ke saath jata hai
 *   - Short time ke liye valid (5-15 min)
 *   - Expire hote hi backend bolta hai - 401 Unauthorized
 *   - Fast & secure, but jaldi expire hota hai
 * 
 * > Refresh Token (Backup Key)
 *   - Ye locker ki extra key jaisa hota hai
 *   - Sirf ek kaam: naya access token lana
 *   - Long life hoti hai (days/weeks)
 *   - Normal API me use nahi hota
 *   - Jab access token expire ho jae, refresh token ka kaam start
*/

/**
 * Problem:
 * > Frontend request bhejte hai, lekin backend bolta hai:
 *   401 Unauthorized
 * > Meaning: "Access token expire ho gya/invalid hai"
 * > Ab kya karein?
 *   - User ko turant logout?
 *   - Har component me refresh logic?
 * 
 * Solution: Axios Response Interceptor
 * > Axios Interceptor ek guard hai jo har API response ko check karta 
 *   hai aur kehta hai: 
 *   "Agr token expire ho gya, toh mai silently fix kar deta hoon". 
 * > Component ko kuch bhi pta nhi chalega.
*/

/**
 * What is Response Interceptor?
 * > Response Interceptor = Backend se response aane k baad ka middleware.
 * > Flow: Backend Response > Response Interceptor > Component
 *                               |
 *                               V
 *                          - Response check krta hai
 *                          - Error handle karta hai
 *                          - Token refresh karta hai
 *                          - Request dobara bhejta hai
 * 
 * > Response interceptor ka kaam hai expired access token ko 
 *   automatically refresh karna aur failed request ko dobara bhejna
 * > This approach is industry-standard because:
 *   - User logout nahi hota baar-baar
 *   - Components clean rehte hai
 *   - Auth logic centralized hota hai
 * 
 * > Flow:
 *   - API Request
 *   - Backend returns 401
 *   - Response Interceptor
 *   - Refresh token API
 *   - New access token
 *   - Retry original request
 *   - Success response
*/

/**
 * Coding Explanation:
 * 1. Interceptor ka structure:
 *    > axiosInstance.interceptors.response.use(
 *        (response) => response,
 *        async (error) => { ... }
 *      )
 * 
 *    > Isme 2 parts hote hai:
 *      a. Success case: (response) => response
 *      b. Error case  : async (error) => { }
*/

/**
 * 2. Success Case:
 *    > (response) => response
 *    > Meaning:
 *      - API successful
 *      - Token valid
 *      - Data aa gya
 *        (Seedha component ko response de do)
*/

/**
 * 3. Error Handling Case:
 *    > async (error) => { const originalRequest = error.config }
 *
 *    > error.config ka matlab:
 *      - Kaunsi API request gayi thi
 *      - Uska URL
 *      - Method (GET / POST)
 *      - Headers (Authorization token)
 *
 *    > Ye "originalRequest" hum isliye rakhte hain
 *      kyunki baad me isi SAME request ko dobara bhejna hai
 *      (with new access token).
 */

/**
 * 4. 401 Unauthorized ka check:
 *    > error.response?.status === 401
 *
 *    > 401 ka matlab:
 *      - Access token expire ho gaya
 *      - Ya access token invalid hai
 *
 *    > !originalRequest._retry ka matlab:
 *      - Ye request pehle retry nahi hui
 *      - Infinite loop se bachne ke liye check
 *
 *    > Overall meaning:
 *      - Agar access token expire ho gaya
 *      - Aur ye first time fail hui request hai
 *      - Tabhi refresh token ka process start karo
 */

/**
 * 5. Retry flag lagana:
 *    > originalRequest._retry = true
 *
 *    > Ye bolta hai:
 *      - "Is request ko bas ek baar retry karna"
 *
 *    > Kyun zaroori?
 *      - Agar refresh token bhi invalid ho
 *      - Backend fir se 401 de
 *      - To infinite loop ban sakta hai
 *
 *    > _retry flag is loop ko tod deta hai
 */

/**
 * 6. Refresh token uthana:
 *    > const refreshToken = localStorage.getItem(REFRESH_TOKEN)
 *
 *    > Refresh token ka role:
 *      - Ye backup key hai
 *      - Isi se naya access token milta hai
 *
 *    > Access token direct refresh nahi hota
 *      - Sirf refresh token use hota hai
 */

/**
 * 7. Agar refresh token hi nahi mila:
 *    > Matlab:
 *      - User properly logged in nahi
 *      - Ya storage clear ho gaya
 *
 *    > Best action:
 *      - Access token delete karo
 *      - Refresh token delete karo
 *      - User ko login page bhejo
 */

/**
 * 8. Refresh Token API Call:
 *    > Refresh token backend ko bhejte hain
 *
 *    > Backend kya karta hai:
 *      - Refresh token verify karta hai
 *      - Agar valid hua:
 *          → NAYA access token generate karta hai
 *
 *    > Important rule:
 *      - Yaha axiosInstance use nahi karte
 *      - Normal axios use karte hain
 *      - Warna interceptor dobara trigger ho jayega
 */

/**
 * 9. Naya Access Token milne ke baad:
 *    > localStorage me save karte hain
 *
 *    > Matlab:
 *      - Ab humare paas fresh access token hai
 *      - Old expired token replace ho gaya
 */

/**
 * 10. Original request update karna:
 *     > originalRequest.headers.Authorization = `Bearer newAccessToken`
 *
 *     > Matlab:
 *       - Purana expired token hatao
 *       - Naya access token lagao
 */

/**
 * 11. Original request dobara bhejna:
 *     > return axiosInstance(originalRequest)
 *
 *     > Flow:
 *       - Request fail hui (401)
 *       - Refresh token se naya access token mila
 *       - Wahi request dobara chal gayi
 *
 *     > Component ko kuch pata hi nahi chalta
 */

/**
 * 12. Agar refresh token bhi fail ho gaya:
 *     > Matlab:
 *       - User completely unauthorized hai
 *
 *     > Action:
 *       - Saare tokens clear karo
 *       - Login page redirect
 */

/**
 * FINAL ONE-LINER:
 * > Access token expire hota hai 
 * > Refresh token naya access token laata hai
 * > interceptor silently request ko retry kar deta hai
 */


axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN)

                if (!refreshToken) {
                    localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
                    window.location.href = "/login"
                    return Promise.reject(error)
                }

                const response = await axios.post(
                    `${API_URL}/auth/refresh-token`,
                    { refreshToken },
                    {
                        withCredentials: true
                    }
                )

                if (response.data?.data?.accessToken) {
                    localStorage.setItem(
                        StorageKeys.ACCESS_TOKEN,
                        response.data.data.accessToken
                    );
                }
                if (response.data?.data?.refreshToken) {
                    localStorage.setItem(
                        StorageKeys.REFRESH_TOKEN,
                        response.data.data.refreshToken
                    );
                }

                originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
                return axiosInstance(originalRequest)


            } catch (error) {
                localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
                localStorage.removeItem(StorageKeys.REFRESH_TOKEN)
                window.location.href = "/login";

                return Promise.reject(error)
            }
        }
    }
)


export default axiosInstance;
