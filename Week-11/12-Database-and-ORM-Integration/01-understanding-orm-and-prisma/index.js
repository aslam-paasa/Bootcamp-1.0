/**
 * Database & ORM Integration in Next.js:
 * 1. What is Prisma?
 *    > Prisma is a modern ORM for Node.js/ts that:
 *      - Defines data models in a single schema file
 *      - Reduces boilerplate and avoids many raw sql mistake
 * 
 *    +----------------+     +----------------+     +-----------------+
 *    | Database (SQL) |<--->| Prisma/Drizzle |<--->| Next.js (JS/TS) |
 *    +----------------+     +----------------+     +-----------------+
 *                                   |
 *                                   V
 *                              [Translator]
 *                          > turns them into sql
 *                          > turns sql into js
 * 
 * 2. Prisma Setup:
 *    > npm install prisma
 *    > npx prisma init
 *    > npm i @prisma/client: This will talk to our NextJS backend & DB
 *    > prisma/schema.prisma:
 *      generator client {
 *        provider = "prisma-client-js"
 *      }
 * 
 *      datasource db {
 *        provider = "postgresql"
 *        url      = env("DATABASE_URL")
 *      }
 *    > .env: DATABASE_URL = ""
 * 
 *    > Go to NeonDB Online and create one Project: prisma-nextjs
 *    > Click on Connect to Database & Copy URL
 *    > Go to .env and paste this to DATABASE_URL
 *    > Close Neon from browser, we got the URL
 * 
 * 3. How Prisma and Next.js works together?
 *    Prisma client is only run on server.
 *    a. Initialize schema:
 *       model Post{
 *         id          Int      @id  @default(autoincrement())
 *         title       String
 *         description String?
 *         createdAt   DateTime      @default(now())
 *       }  
 * 
 *    b. Create Prisma Client 
 *       > Creating single connection object to talk to db
 *       > Create a folder at root level: lib/db.js:
 * 
 *         i Beginner Approach:
 *           - import { PrismaClient } from "@prisma/client"
 *           - export const db = new PrismaClient()
 * 
 *         ii Better Approach
 *            - import { PrismaClient } from "@prisma/client"
 *            - const globalForPrisma = globalThis
 *            - export const prisma = globalForPrisma.prisma ||  new PrismaClient()
 *            - if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
 *       
 *    c. Generate migation file
 *       > npx prisma migrate dev
 *       > npx prisma db push
 *       > Prisma will convert prisma schema to raw sql schema and sync
 *         with db and push the changes to the db
 * 
 *    d. Seed data to the db using Server Action:
 *       > Create folder at root level: actions/indx.js:
 * 
 *         "use server"
 *         import {prisma} from "@/lib/db"
 * 
 *         export const seedDB = async ()=>{
 *             await prisma.post.createMany({
 *                 data:[
 *                     { title: "Hello Prisma" }, 
 *                     { title: "Prisma + Next.js is easy" }, 
 *                     { title: "Postgress for quick demos" }
 *                 ]
 *             })
 *             console.log(`[seed] Data seeded successfully✅`)
 *         } 
 *         
 *       > Run the command: node seed.js
 *         [user browser]--->getPosts--->[Server Actions]
 *                                              | 
 *                                              V
 *                                        prisma client
 *                             post.findMany() ---> sql query 
 *                                                     |
 *                                                     V
 *                                                   PG Database
*/

/**
 * 1. What is Drizzle?
 *    > Drizzle ORM is a headless TS ORM with a head.
 *    > This only works with SQL Database.
 * 
 * 2. Project Setup:
 *    a. Install Shadcn npx shadcn@latest init
 *    b. Install @neondatabase/serverless package
 *       - npm i drizzle-orm @neondatabase/serverless dotenv
 *       - npm i -D drizzle-kit
 *    c. .env: DATABASE_URL=<DB_URL> from neon online db
 *    d. Connect Drizzle ORM to the db
 *       - create folder: lib/db.js
 *         import { config } from "dotenv";
 *         import { drizzle } from 'drizzle-orm/neon-http';
 *         config({ path: ".env" }); 
 *         export const db = drizzle(process.env.DATABASE_URL);
 *    e. Create a table/schema:
 *       - Create folder: schema/index.js
 *         import {pgTable , serial , text , timestamp , boolean} from "drizzle-orm/pg-core"
 *         export const users = pgTable("users" , {
 *             id:serial("id").primaryKey(),
 *             name:text("name").notNull(),
 *             email:text("email").notNull().unique(),
 *             isActive:boolean("is_active").default(true),
 *             createdAt: timestamp("created_at").defaultNow(),
 *           updatedAt: timestamp("updated_at").defaultNow(),
 *         })
 *    f. Setup Drizzle Config File 
 *       - Create file at root level: drizzle.config.js 
 *         import 'dotenv/config';
 *         import { defineConfig } from 'drizzle-kit';
 *         
 *         export default defineConfig({
 *           out: './drizzle',
 *           schema: './schema',
 *           dialect: 'postgresql',
 *           dbCredentials: {
 *             url: process.env.DATABASE_URL,
 *           },
 *         });
 *       - Drizzle ORM will convert all the postgres schema to sql 
 *         migration file and keep it inside output (out) folder.
 *    g. Applying changes to the database:
 *       - Generate Migration: npx drizzle-kit generate
 *       - Run Migration     : npx drizzle-kit migrate
 *       - Push changes to DB: npx drizzle-kit push
 *    h. CRUD Operations:
*/