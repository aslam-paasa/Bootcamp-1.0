import { NextResponse } from "next/server";

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