/**
 * JavaScript Dates:
*/

/**
 * 1. Creating Dates:
 *    - JavaScript uses the Date object to work with dates and times.
 *    - Note: Months are 0-indexed (January = 0, December = 11)
*/
let now = new Date();                         // Current date and time
let date1 = new Date("2025-05-15");           // From ISO date string
let date2 = new Date(2025, 4, 15);            // Year, Month (0-based), Day → May 15, 2025
let date3 = new Date(2025, 4, 15, 12, 30, 0); // + hours, minutes, seconds
let date4 = new Date(0);                      // Unix epoch → Jan 1, 1970 UTC
let date5 = new Date(1000 * 60 * 60);         // 1 hour after epoch


/**
 * 2. Date Internals: Timestamps
 *    Dates are stored as milliseconds since Unix Epoch: Jan 1, 1970 UTC
*/
let timestamp = Date.now();  // Current timestamp in ms
let d1 = new Date(timestamp); // Convert back to Date


/**
 * 3. Get Methods:
 *    - getFullYear()       - Year (4-digit)
 *    - getMonth()          - Month (0–11)
 *    - getDate()           - Day of the month (1–31)
 *    - getDay()            - Day of the week (0–6, Sun = 0)
 *    - getHours()          - Hour (0–23)
 *    - getMinutes()        - Minutes (0–59)
 *    - getSeconds()        - Seconds (0–59)
 *    - getMilliseconds()   - Milliseconds (0–999)
 *    - getTime()           - Timestamp (ms since epoch)
 *    - getTimezoneOffset() - Minutes offset from UTC
 *    - toISOString()       - ISO 8601 string in UTC
 *    - toDateString()      - Human-readable date string
 *    - toTimeString()      - Human-readable time string
 *    - toLocaleString()    - Local date and time string
*/

let d2 = new Date("2025-05-15T10:30:00");
d2.getFullYear();      // 2025
d2.getMonth();         // 4 (May)
d2.getDate();          // 15
d2.getDay();           // 4 (Thursday)


/**
 * 4. Set Methods:
 *    - setFullYear(y)       - Set year
 *    - setMonth(m)          - Set month (0–11)
 *    - setDate(d) 	         - Set day of month
 *    - setHours(h) 	     - Set hour
 *    - setMinutes(m) 	     - Set minutes
 *    - setSeconds(s) 	     - Set seconds
 *    - setMilliseconds(ms)  - Set milliseconds
 *    - setTime(ms) 	     - Set time from timestamp
*/

let d3 = new Date();
d3.setFullYear(2026);
d3.setMonth(11); // December
d3.setDate(25);  // 25th


/**
 * 5. Parsing Dates
 *    - Date.parse(str): Parses date string → timestamp
 *    - new Date(str)  : Also parses ISO-like date strings
 *    - Best to use ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ) 
 *      for cross-browser compatibility.
*/

Date.parse("2025-05-15");  // Returns timestamp
new Date("2025-05-15");    // Valid date object


/**
 * 6. Formatting Dates
 *    - toDateString() 	     - Returns just the date part
 *    - toTimeString() 	     - Returns just the time part
 *    - toISOString() 	     - Returns UTC time in ISO format
 *    - toLocaleDateString() - Returns date in local format
 *    - toLocaleTimeString() - Returns time in local format
 *    - toLocaleString()     - Full localized date and time
*/

let d4 = new Date();
d4.toISOString();        // "2025-05-15T12:30:00.000Z"
d4.toLocaleDateString(); // e.g., "5/15/2025" (US)


/**
 * 7. Date Comparison:
 *    - You can directly compare Date objects using > < ===, but using 
 *      .getTime() is safer for equality.
*/
let d5 = new Date("2025-05-15");
let d6 = new Date("2025-05-20");

d5 > d6                        // false
d5.getTime() === d6.getTime(); // false


/**
 * 8. Date Arithmetic:
 *    You can add/subtract using timestamps:
*/
let d7 = new Date();
let tomorrow = new Date(d7.getTime() + 24 * 60 * 60 * 1000);     // add 1 day
let lastWeek = new Date(d7.getTime() - 7 * 24 * 60 * 60 * 1000); // subtract 7 days

/* Or manipulate with .setDate(), .setMonth() etc.: */
let d8 = new Date("2025-05-15");
d8.setDate(d8.getDate() + 5); // Adds 5 days


/**
 * 9. Working with Timezones:
 *    JavaScript Date is based on local time, but you can get UTC 
 *    components:
*/

d9.getUTCFullYear()
d9.getUTCHours()

/* Note: To convert between timezones, use libraries like Luxon, date-fns-tz, or moment-timezone. */



/**
 * 10. International Formatting:
*/
let formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata"
  });
  
formatter.format(new Date());
// Example: "Thursday, May 15, 2025 at 6:00 PM"


/**
 * Common Use Cases:
 * 1. Get current timestamp     - Date.now()
 * 2. Convert timestamp to date - new Date(ms)
 * 3. Format to ISO string      - date.toISOString()
 * 4. Add days to a date        - date.setDate(date.getDate() + n)
 * 5. Compare two dates         - date1.getTime() > date2.getTime()
 * 6. Parse ISO string          - new Date("YYYY-MM-DD")
 * 7. Format to local date/time - date.toLocaleString("en-IN", options)
*/