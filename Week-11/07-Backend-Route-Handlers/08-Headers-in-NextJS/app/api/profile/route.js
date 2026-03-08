/**
 * What are HTTP headers?
 * > Headers = Metadata sent with every http request/response.
 * > There are two main categories of headers:
 *   a. Request Headers
 *      - Carry info about the incoming request
 *      - Ex: user-agent    -> client
 *            accept        -> what contentType client can process
 *            authorization -> for sending bearer token
 *   b. Response Headers
 *      - Send information back with outgoing request
 *      - Ex: content Type  -> what type of content we are sending back?
 *            Cache-Control -> For caching strategy
 *            set-cookie    -> 
*/

/**
 * Request Headers: How we can get the header when we are requesting?
 * > Sending request headers:
 *   - Input : http://locahost:3000/api/profile
 *   - Header:  Authorization : Bearer 12345
 * 
 * > Accessing request headers:
 *   a. Approach-1: Traditional
 *      const requestHeaders = new Headers(request.headers);
 *      const authHeader = requestHeaders.get('Authorization'); 
 * 
 *   b. Next.js provides in-built headers property (Read-Only):
 *      const headerList = await headers()
 *      const authHeader = headerList.get("Authorization")
*/

/**
 * Response Headers: How can we send the response header?
 * > Sending header with our request:
 *   return new Response("<h1>Profile Api Data</h1>" , {
 *       headers:{
 *           "Content-Type":"text/html",
 *            "X-Custom-Header": "Next.js Tutorial",
 *       }
 *   })
 * 
 *   Output:
 *   - Content-Type    : text/html
 *   - X-Custom-Header :  Next.js Tutorial
 * 
 * > Setting custom headers:
 *   const response = NextResponse.json({ message: "Hello with headers" })
 *   response.headers.set("X-Powered-By-Suraj", "Next.js 15");
 *   response.headers.set("Cache-Control", "no-store");
 * 
 *   Header Output in Network Tab:
 *   - X-Powered-By-Suraj : Next.js 15
 *   - Cache-Control      : no-store
*/



import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request) {
   const headerList = await headers()
   const authHeader = headerList.get("Authorization")
   console.log("Auth Header", authHeader)


   const response = NextResponse.json({ message: "Hello with headers" })
   response.headers.set("X-Powered-By-Suraj", "Next.js 15");
   response.headers.set("Cache-Control", "no-store");

   return response
}