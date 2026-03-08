/**
 * What are cookies?
 * > Cookie is a small piece of data which is store into the browser,
 *   and everytime we are making request to the server, this data in
 *   form of cookies sent to the same server automatically.
 * > Purpose of using Cookies:
 *   a. Session Management: Login, Shopping Carts, etc
 *   b. Personalization   : Themes, Language Perferences, etc
 *   c. Tracking          : Analytics, Behavior tracking, etc
 * 
 * 1. Read Cookie from request:
 *    a. Traditional Way:
 *       - const theme = request.cookies.get("theme")
 *    b. Next.js Way:
 *       - import { cookies } from "next/headers"
 *       - const cookieStore = await cookies()
 *       - const resultPerPage = cookieStore.get("resultPerPage")
 * 
 * 2. Setting cookies with the help of headers:
 *    a. Next.js Way-1:
 *       - return new Response("Setting Cookies", {
 *            headers: {
 *               "Set-Cookie" : "theme=dark"
 *            }
 *         })
 *       - return new Response("Setting Cookies", {
 *            headers: {
 *               "Set-Cookie" : "resultsPerPage=20"
 *            }
 *         })
 * 
 *    b. Next.js Way-2: (Recommended)
 *       - import { cookies } from "next/headers"
 *       - const cookieStore = await cookies()
 *       - cookieStore.set("Score", "100")
 *       - return NextResponse.json({ message: "Cookie Set!" })
 * 
 * 3. Getting the cookies:
 *    - const theme = request.cookies.get("theme")
 *    - console.log("Cookies", theme)
 *    - Output: 
 *      Cookies { name: 'theme', value: 'dark}
 * 
 * 4. Check if cookie exist or not:
 *    - cookieStore.has("Score")
 * 
 * 5. Delete Cookie:
 *    - cookieStore.delete("Score")
 *    - return NextResponse.json({ message: "Cookie Deleted!" })
*/
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
    // Read cookie from request
    // const theme = request.cookies.get("theme")

    const cookieStore = await cookies()

    // const resultsPerPage = cookieStore.get("resultsPerPage")

    // cookieStore.set("score" , "100")

    cookieStore.delete("score")

    
    // console.log("Cookies" , resultsPerPage)
    return NextResponse.json({message:"Cookie deleted!"})
}