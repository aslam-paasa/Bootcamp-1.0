/**
 * Authentication & Authorization:
 * 1. What is Authentication?
 *    a. Verifying who the user is
 *    b. It ensures that the user is a real and valid entity
 *    c. Ex: Login with email/password, google, github, etc
 * 
 * 2. What is Authorization?
 *    a. Verifying what the user can do
 *    b. It defines the permission/roles of an authenticated user
 *    c. Ex: Only Admin can access Dashboard, etc
 * 
 * 3. Why do we need authentication & authorization?
 *    > Most modern web apps need user accounts, dashboard, role, and
 *      restricted access
 *    > Without auth: anyone can see all pages/data. 
 *    > With auth   : only logged in users can access certain routes/data
 * 
 * 4. We are going to explore 3 different ways to implement authentication
 *    and authorization:
 *    a. NextAuth   : Auth.js
 *    b. BetterAuth : npm add better-auth
 *    c. Clerk      
*/

/**
 * BetterAuth:
 * 1. Setup ShadCn: 
 *    - npx shadcn@latest init
 *    - npx shadcn@latest add   (adding components)
 * 2. Setup BetterAuth:
 *    - npm install better-auth
 * 3. Set Environment Variables (.env):
 *    a. Secret Key (.env): BETTER_AUTH_SECRET=Generate&PasteKeyFromDocs
 *    b. Set Base URL     : BETTER_AUTH_URL=http://locahost:3000 (Base URL of App)
 *    c. Create a better auth instance (BetterAuth Config File):
 *       - Create file lib/auth.js:
 *         import { betterAuth } from "better-auth";
 *         import { prismaAdapter } from "better-auth/adapters/prisma";
 *         import { db } from "./db";
 *         
 *         export const auth = betterAuth({
 *           database: prismaAdapter(db, {
 *             provider: "postgresql",
 *           }),
 *           emailAndPassword: {
 *             enabled: true,
 *           },
 *           socialProviders: {
 *             google: {
 *               clientId: process.env.GOOGLE_CLIENT_ID,
 *               clientSecret: process.env.GOOGLE_CLIENT_SECRET,
 *             },
 *             github: {
 *               clientId: process.env.GITHUB_CLIENT_ID,
 *               clientSecret: process.env.GITHUB_CLIENT_SECRET,
 *             },
 *           },
 *         });
 *    d. Configure database:
 *       - BetterAuth requires a database to store user data.
 *       - We will use Prisma:
 *         > Initialize Prisma      : npx prisma init
 *         > Install Prisma Client  : npm i @prisma/client
 *         > Create Connection Pool : lib/db.js
 *           - import { PrismaClient } from "./generated/prisma/client" (Remeber this)
 *           - const globalForPrisma = globalThis 
 *           - export const db = globalForPrisma.prisma ?? new PrismaClient()
 *           - if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
 *         > Generate Prisma: npx prisma generate
 *    e. Generate Prisma ORM:
 *       - Generate ORM Schema: npx @better-auth/cli generate
 *       - Once Better-Auth is generated, we can open our schema prisma
 *         where Better-Auth automatically have written all the required
 *         by Better-Auth to implement a robust auth system.
 *         model User {
 *           id            String    @id
 *           name          String
 *           email         String
 *           emailVerified Boolean   @default(false)
 *           image         String?
 *           createdAt     DateTime  @default(now())
 *           updatedAt     DateTime  @default(now()) @updatedAt
 *           sessions      Session[]
 *           accounts      Account[]
 *         
 *           @@unique([email])
 *           @@map("user")
 *         }
 *         
 *         model Session {
 *           id        String   @id
 *           expiresAt DateTime
 *           token     String
 *           createdAt DateTime @default(now())
 *           updatedAt DateTime @updatedAt
 *           ipAddress String?
 *           userAgent String?
 *           userId    String
 *           user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
 *         
 *           @@unique([token])
 *           @@map("session")
 *         }
 *         
 *         model Account {
 *           id                    String    @id
 *           accountId             String
 *           providerId            String
 *           userId                String
 *           user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
 *           accessToken           String?
 *           refreshToken          String?
 *           idToken               String?
 *           accessTokenExpiresAt  DateTime?
 *           refreshTokenExpiresAt DateTime?
 *           scope                 String?
 *           password              String?
 *           createdAt             DateTime  @default(now())
 *           updatedAt             DateTime  @updatedAt
 *         
 *           @@map("account")
 *         }
 *         
 *         model Verification {
 *           id         String   @id
 *           identifier String
 *           value      String
 *           expiresAt  DateTime
 *           createdAt  DateTime @default(now())
 *           updatedAt  DateTime @default(now()) @updatedAt
 *         
 *           @@map("verification")
 *         } 
*/

/**
 * Configuring Better Auth DatabaseURL + Google & GitHub Secrets:
 * 1. Getting all the credentials we need to implement into BetterAuth:
 *    a. Database URL:
 *       - Go to NeonDB Online
 *       - Create Project: better-auth
 *       - Connect to database > Copy URL
 *       - Paste it in (.env) DATABASE_URL=<NEON-URL>
 *         OR
 *       - Write docker-compose.yml
 *         version: '3.8'
 *         services:
 *           postgres:
 *             image: postgres:15
 *             container_name: better-auth-build
 *             environment:
 *               POSTGRES_DB: better-auth-build
 *               POSTGRES_USER: postgres
 *               POSTGRES_PASSWORD: password
 *             ports:
 *               - "5432:5432"
 *             volumes:
 *               - postgres_data:/var/lib/postgresql/data
 *         
 *         volumes:
 *           postgres_data:
 *         
 *       - Keep the DATABASE_URL in .env = DATABASE_URL="postgresql://postgres:password@localhost:5432/better-auth-build"
 *       - Run Docker-Compose: docker compose up -d
 *    b. GitHub:
 *       - Go to GitHub
 *       - Press on Settings
 *       - Go to Developer Settings
 *       - Go to OAuth Apps
 *       - Create New OAuth App:
 *         > App Name: better-auth-build
 *         > Homepage URL: http://localhost:3000/
 *         > Authorization callback URL:
 *           - Go to BetterAuth Docs
 *           - Sidebar > Press Authentication > GitHub > Callback URL
 *           - Set the callback URL: http://locahost:3000/api/auth/callback/github
 *         > Register Application (You'll get two things)
 *           - Client ID     (Keep it)
 *           - Client Secret (Keep it)
 *    c. Google:
 *       - Go to google cloud console
 *       - Create Project: better-auth-build
 *       - Select Project: better-auth-build
 *       - Go to API & Services
 *       - Go to OAuth Consent Screen
 *         > Click on Getting Started
 *         > App Information: better-auth-build
 *         > Support Email  : aslampaasa422@gmail.com
 *         > Audience       : External
 *         > Email Address  : aslampaasa422@gmail.com
 *         > Create
 *         > Click on Create OAuth Client
 *           - Application Type: Web Application
 *           - Name: Whateverwewant
 *           - Authorized JS Origins   : http://localhost:3000
 *           - Authorized redirect URIs: http://locahost:3000/api/auth/callback/google
 *           - Create
 *             - Client ID     (Keep it)
 *             - Client Secret (Keep it)
 *    d. Map all the Client ID & Secret in .env:
 *       > Go to lib/auth.js
 *         socialProviders: {
 *           google: {
 *             clientId: process.env.GOOGLE_CLIENT_ID,
 *             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
 *           },
 *           github: {
 *             clientId: process.env.GITHUB_CLIENT_ID,
 *             clientSecret: process.env.GITHUB_CLIENT_SECRET,
 *           },
 *         }
 *      > Go to .env:
 *        - GOOGLE_CLIENT_ID = XXXXXX
 *        - GOOGLE_CLIENT_SECRET = XXXXX
 *        - GITHUB_CLIENT_ID = XXXXX
 *        - GITHUB_CLIENT_SECRET = XXXXX
*/

/**
 * Better Auth in Action Database Migration, API & Auth Client Setup
 * 1. Create Database Tables:
 *    - Generate : npx prisma generate
 *    - Migration: npx prisma migration dev
 *      > Enter name: better-auth-schema-v1
 *      > This will convert orm schema to sql schema
 *    - Push changes: npx prisma db push
 * 
 * 2. Mount Handlers:
 *    - To handle API requests, you need to set up a route handler
 *      on your server.
 *    - Click on next-js in docs: Create app/auth/[...all]/route.js:
 * 
 *      import { auth } from "@/lib/auth"; 
 *      import { toNextJsHandler } from "better-auth/next-js";
 *      export const { POST, GET } = toNextJsHandler(auth);
 * 
 * 3. Create Client Instance:
 *    - The client-sude library helps you interact with the auth-server.
 *    - Better Auth comes with a client for all popular web frameworks
 *    - Create lib/auth-client.js:
 * 
 *      import { createAuthClient } from "better-auth/react"
 *      export const authClient = createAuthClient({
 *          baseURL: "http://localhost:3000"
 *      })
*/

/**
 * Better Auth Login UI ShadCN + Google & GitHub Sign-In
 * 1. Go to app/login/page.js:
 * 
 *    import LoginForm from '@/components/login-form'
 *    import { auth } from '@/lib/auth';
 *    import { headers } from 'next/headers';
 *    import { redirect } from 'next/navigation';
 *    import React from 'react'
 *    
 *    const LoginPage = async() => {
 *      const session = await auth.api.getSession({
 *        headers: await headers(),
 *      });
 *    
 *      if (!!session) {
 *        redirect("/");
 *      }
 *    
 *      return (
 *        <div>
 *          <LoginForm/>
 *        </div>
 *      )
 *    }
 *    
 *    export default LoginPage
 * 
 * 2. Go to components/login-form.jsx
 * 
 *    "use client";
 *    import React from "react";
 *    import { Button } from "@/components/ui/button";
 *    import {
 *      Card,
 *      CardContent,
 *      CardDescription,
 *      CardHeader,
 *      CardTitle,
 *    } from "@/components/ui/card";
 *    import { Github, Chrome } from "lucide-react";
 *    import { useRouter } from "next/navigation";
 *    import { useEffect } from "react";
 *    import { authClient } from "@/lib/auth-client";
 *    
 *    const LoginForm = () => {
 *      const handleGithubSignIn = async () => {
 *        const data = await authClient.signIn.social({
 *          provider: "github",
 *          callbackURL: "/dashboard"
 *        });
 *      };
 *    
 *      const handleGoogleSignIn = async () => {
 *        const data = await authClient.signIn.social({
 *          provider: "google",
 *          callbackURL: "/dashboard"
 *        });
 *      };
 *      return (
 *        <div className="min-h-screen flex items-center justify-center bg-background p-4">
 *          <Card className="w-full max-w-md">
 *            <CardHeader className="text-center">
 *              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
 *              <CardDescription>
 *                Sign in to your account using your preferred provider
 *              </CardDescription>
 *            </CardHeader>
 *            <CardContent className="space-y-4">
 *              <Button
 *                onClick={handleGoogleSignIn}
 *                variant="outline"
 *                className="w-full h-12 text-base bg-transparent"
 *              >
 *                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
 *                  <path
 *                    fill="currentColor"
 *                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
 *                  />
 *                  <path
 *                    fill="currentColor"
 *                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
 *                  />
 *                  <path
 *                    fill="currentColor"
 *                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
 *                  />
 *                  <path
 *                    fill="currentColor"
 *                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
 *                  />
 *                </svg>
 *                Continue with Google
 *              </Button>
 *    
 *              <Button
 *                onClick={handleGithubSignIn}
 *                variant="outline"
 *                className="w-full h-12 text-base bg-transparent"
 *              >
 *                <Github className="w-5 h-5 mr-3" />
 *                Continue with GitHub
 *              </Button>
 *            </CardContent>
 *          </Card>
 *        </div>
 *      );
 *    };
 *    
 *    export default LoginForm;
 *    
 * 3. Once we successfully loggedin, we will navigate to /dashboard
 * 
 *    import React from 'react'
 *    
 *    const Dashboard = () => {
 *      return (
 *        <div>Dashboard</div>
 *      )
 *    }
 *    
 *    export default Dashboard
*/

/**
 * Better Auth Security Route Protection, Sessions & Sign-Out Flow
 * 1. Protect All Routes at Root Level (app/page.js): [Backend]
 *    > Server Component: 
 *      - It runs the server BEFORE the page is sent to the browser
 *      - Request > Server Checks Session:
 *                - No session     > Redirect to /login
 *                - Session Exists > Render HomeView
 * 
 *    import HomeView from "@/components/home";
 *    import { auth } from "@/lib/auth";
 *    import { headers } from "next/headers";
 *    import { redirect } from "next/navigation";
 *    
 *    export default async function Home() {
 * 
 *      1. Read incoming request headers
 *         - Cookies live inside request headers
 *         - Auth libraries need headers to identify the user
 * 
 *      const session = await auth.api.getSession({
 *        headers: await headers(),
 *      });
 *    
 *      2. If no session, redirect to login page 
 *         (This check happens on SERVER)
 *      if (!session) {
 *        redirect("/login");
 *      }
 *    
 *      3. Session Exists -> user is authenticated
 *         (Now we can safely render the protected UI)
 *      return (
 *        <div>
 *          <HomeView />
 *        </div>
 *      );
 *    }
 *    
 * 2. Client-Side Session + Sign-Out Flow
 *    > Goal: Show user info and allow them to signout.
 * 
 *    "use client";
 *    import React from 'react'
 *    import { authClient } from '@/lib/auth-client';
 *    import { Button } from './ui/button';
 *    import { useRouter } from 'next/navigation';
 *    
 *    const HomeView = () => {
 *        # Grabbing session info to see user data
 *        const { data: session } = authClient.useSession();
 * 
 *        const router = useRouter()
 *    
 *        if (!session) {
 *            return (
 *                <p>Loading...</p>
 *            )
 *        }
 *    
 *        return (
 *            <div className='flex flex-col p-4 gap-y-4'>
 *                <p>Logged in as {session.user.name}</p>
 *    
 *                # SignOut Button
 *                <Button onClick={() => authClient.signOut({
 *                    fetchOptions: {
 *                        onSuccess: () => router.push("/login")
 *                    }
 *                })}>
 *                    Sign Out
 *                </Button>
 *            </div>
 *        )
 *    }
 *    
 *    export default HomeView
*/




/**
 * Clerk Authentication in Next.js Intro:
 * > It is third party library to integrate the entire authentication
 *   system to user management system.* 
 * 
 * Up Setup Guide:
 * 1. Custom Sign-In:
 *    > Open Clerk Docs > Click on Dashboard
 * 
 *    > Personal Workspace > Create Application
 *      - Application Name : clerk-builder
 *      - Sign-in Options  : Google, GitHub
 *      - Create Application
 * 
 *    > Steps to follow:
 *      - Install @clerk/next.js : npm install @clerk/nextjs 
 *      - Set your Clerk API keys: Copy & Paste it in .env file
 *        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_....... 
 *        CLERK_SECRET_KEY = sk_......
 *      - Create & Update middleware.ts   :
 * 
 *        import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
 *        
 *        const isPublicRoute = createRouteMatcher(['/sign-in(.*)' ,   '/sign-up(.*)'])
 *        
 *        export default clerkMiddleware(async (auth, req) => {
 *          if (!isPublicRoute(req)) {
 *            await auth.protect()
 *          }
 *        })
 *        
 *        export const config = {
 *          matcher: [
 *            // Skip Next.js internals and all static files, unless found in search params
 *            '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
 *            // Always run for API routes
 *            '/(api|trpc)(.*)',
 *          ],
 *        }
 * 
 * 2. Add <ClerkProvider> and Clerk components to your app (app/layout.js)
 *    export default function RootLayout({ children }) {
 *      return (
 *        <ClerkProvider>
 *        <html lang="en">
 *          <body
 *            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
 *          >
 *            {children}
 *          </body>
 *        </html>
 *        </ClerkProvider>
 *      );
 * 
 * 3. Create your first user: npm run dev
 *    - http://locahost:3000
*/

/**
 * Build your own sign-in or Sign-up Page for Next.js with Clerk:
 * 1. Click on 'Continue to Next.js Guide'
 * 
 * 2. Build a sign-in or sign-up page
 *    - Create app/sign-in/[[...sign-in]]/page.jsx
 * 
 *      import { SignIn } from '@clerk/nextjs'
 *      export default function Page() {
 *        return <SignIn />
 *      }
 * 
 *    - Create app/sign-up/[[...sign-up]]/page.jsx
 * 
 *      import { SignUp } from '@clerk/nextjs'
 *      export default function Page() {
 *        return <SignUp />
 *      }
 * 
 * 3. Make the sign-in or sign-up route public (middleware.js):
 * 
 *    import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
 *    
 *    const isPublicRoute = createRouteMatcher(['/sign-in(.*)' ,   '/sign-up(.*)'])
 *    
 *    export default clerkMiddleware(async (auth, req) => {
 *      if (!isPublicRoute(req)) {
 *        await auth.protect()
 *      }
 *    })
 *    
 *    export const config = {
 *      matcher: [
 *        // Skip Next.js internals and all static files, unless found in search params
 *        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
 *        // Always run for API routes
 *        '/(api|trpc)(.*)',
 *      ],
 *    }
 * 
 * 4. Update your environment variables (.env):
 *    - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_....... 
 *    - CLERK_SECRET_KEY = sk_......
 * 
 *    - NEXXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
 *    - NEXXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
 *    - NEXXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
 *    - NEXXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
 * 
 * 5. npm run dev - Done! 
*/

/**
 * Implement Sign-In and Sign-Up in UI:
 * 1. app/page.jsx: Home Page
 * 
 *    import { UserButton } from "@clerk/nextjs";
 *    import { currentUser } from "@clerk/nextjs/server";
 *    
 *    export default async function Home() {
 *      const user = await currentUser()
 *      console.log(user) # See logged-in user's info
 * 
 *      return (
 *        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
 *         <UserButton/>  # Clerk Button
 *        </div>
 *      );
 *    }
 *    
 * 2. app/client/page.js: 
 * 
 *    "use client";
 *    import { useUser } from '@clerk/nextjs';
 *    import React from 'react'
 *    
 *    const ClientPage = () => {
 *    
 *      const user = useUser();
 *      return (
 *        <div>ClientPage
 *          {JSON.stringify(user)}
 *        </div>
 *      )
 *    }
 *    
 *    export default ClientPage
*/