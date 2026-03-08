/**
 * Fetch API:
 * > In Next.js, we have a special reserbed convention known as route,
 *   which is used to create backend API endpoint.
 * > If we use page.js, Next.js will render frontend related code, but
 *   if we use route.js, it will handle our backend api route.
 * 
 * Note: If we use both page.js & route.js, there will be conflict, so
 *       it's better to keep everything separated. For example, keep
 *       the routes inside 'api' folder.
*/

import { NextResponse } from "next/server";

/** 
 * 1. Fetch "Hello World" 
 *    > If we hit the api: http://localhost:3000/hello, we are unable
 *      to handle this request.
 *    > In Next.js, we need to write 'NextResponse' to get next server
 *      response.
*/

// export async function GET(request) {
//   return NextResponse.json({
//     data: "Hello World"
//   })
// }


/* 2. Fetch user data */
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 25,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    age: 30,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 28,
  },
];

export async function GET(request) {
  try {
    return NextResponse.json({
      success: true,
      data: users,
      total: users.length
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to get users",

    }, { status: 500 })
  }
}
