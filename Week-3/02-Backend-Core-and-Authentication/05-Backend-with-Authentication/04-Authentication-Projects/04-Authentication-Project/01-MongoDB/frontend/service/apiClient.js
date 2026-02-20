class ApiClient {
  /**
   * Step 1: Constructor
   * - Ye class ka constructor hai jo 2 cheezein set karta hai:
   * - baseURL: Backend server ka address (http://127.0.0.1:3000/api/v1)
   * - defaultHeaders: Har request ke saath bhejne wale basic headers
   */
  constructor() {
    this.baseURL = "http://127.0.0.1:3000/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  /**
   * Step 2: Custom Fetch Function
   * 1. Full URL banao (baseURL + endpoint)
   * 2. Headers ko combine karo (default + new headers)
   * 3. Request ki configuration set karo
   * 4. API call karo
   * 5. Response ko JSON mein convert karo
   * 6. Agar koi error aaye to handle karo
  */
  async customFetch(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...options.headers };

      const config = {
        ...options,
        headers,
        credentials: "include",
      };

      console.log(`Fetching ${url}`);
      const response = await fetch(url, config);

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("API Error", error);
      throw error;
    }
  }

  /**
   * Step 3: Auth ke functions
   * - Signup: Naya user register karne ke liye
   * - Login: User ko login karne ke liye
   * - GetProfile: User ki profile get karne ke liye
   */
  async signup(name, email, password) {
    return this.customFetch("/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  async login(email, password) {
    return this.customFetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async getProfile() {
    return this.customFetch("/users/me");
  }
}

/**
 * Step 4: ApiClient ka ek instance banao aur export karo (Singleton)
 * - Isse hum ek hi instance ko pure app mein use kar sakte hain
 */
const apiClient = new ApiClient();

export default apiClient;
