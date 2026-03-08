import { createPost, getPost, seedDB } from "@/actions/seed";
import { PostList } from "@/components/post-list";
import { prisma } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  // await seedDB()                           // Seed Data
  // const posts = await getPost()            // Fetch All Post Data
  const posts = await prisma.post.findMany(); // Fetch All Post Data

  return (
    <div className="mx-auto max-w-xl p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-balance">Prisma + Next.js (Basic)</h1>
        <p className="text-sm text-gray-600">
          Minimal example showing Prisma in a Next.js Route Handler with a tiny UI.
        </p>
      </header>

      {/* 1. Send Post Data */}
      <section className="space-y-3">
        <h2 className="text-lg font-medium">Add a post</h2>
        <form action={createPost}>
          <input name="title" placeholder="Enter your title" />
          <input name="description" placeholder="Enter your title" />
          <button type="submit">Create Post</button>
        </form>
      </section>

      {/* 2. Display Post Data */}
      <PostList posts={posts} />
    </div>
  );
}
