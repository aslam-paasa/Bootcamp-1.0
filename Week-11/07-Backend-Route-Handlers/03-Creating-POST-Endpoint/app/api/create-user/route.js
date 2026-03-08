import { NextResponse } from "next/server";

/* 1. User Data */
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

/* 2. Post Data to Server */
export async function POST(request) {
  try {
    const { name, email, age } = await request.json();

    if (!name || !email || !age) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and email and age are required",
        },
        { status: 400 }
      );
    }

    const emailExists = users.find((user) => user.email === email);

    if (emailExists) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already exists",
        },
        { status: 400 }
      );
    }

    const newUser = {
      id: users.length + 1,
      name: name,
      email: email,
      age: age,
    };

    users.push(newUser);

    return NextResponse.json(
      { success: true, data: users, message: "User Created!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create user" },
      { status: 500 }
    );
  }
}