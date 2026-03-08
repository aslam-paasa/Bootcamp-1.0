import Image from "next/image";

/**
 * What is Favicon?
 * > A Favicon is a the small icon you see:
 *   - In the browser tab
 *   - In bookmarks
 *   - On mobile home screen (when added)
 *   - In browser history
*/

/**
 * Why Favison matters? 
 * > Favicons help with:
 *   - Brand identity
 *   - Professional look
 *   - Easy tab recognition
 *   - Better user trust
 * > No favicon = apps looks unfinished
*/

/**
 * How Next.js handles favicons:
 * > In Next.js App Router, favicons are:
 *   - File-based
 *   - Auto-detected
 *   - No manual <link> tags needed
 * > Just add files -> Next.js does the rest.
*/

/**
 * Where do favicons go?
 * > Root app/ directory
 * > Example:
 *   app/
 *    ├─ favicon.ico
 *    ├─ icon.png
 *    ├─ apple-icon.png
 *    ├─ layout.js
 *    └─ page.js
 * > Next.js automatically scans this folder.
*/

/**
 * The Simplest Way (Recommended for beginners)
 * 1. Add favicon.ico
 *    > Put this file here: app/favicon.ico 
 *    > That's it. Seriously.
 *      - Desktop browsers -> covered
 *      - Most use cases   -> done
 * 2. Using PNG Favicons (Modern Approach)
 *    > You can also add: app/icon.png 
 *    > Next.js will:
 *      - convert it internally
 *      - Serve correct sizes
 *      - Optimize it
 *    > Best Size: 512 x 512
 * 3. Apple Touch Icon (For iPhones & iPads)
 *    > When users add your site to their home screen on iOS, this
 *      icon is used.
 *    > Add this file: app/apple-icon.png 
 *    > Recommended size: 180 x 180
 * 
 * 4. Next.js supports multiple icons, you can easily mix them:
 *       app/
 *        ├─ favicon.ico
 *        ├─ icon.png
 *        ├─ apple-icon.png
 *    Next.js automatically picks the best one per device.
*/

/**
 * Dynamic Favicons (Advanced Concept)
 * > Yes, favicons can be dynamic
 * > Example use cases:
 *   - Different brand per route
 *   - Multi-tenant apps
 *   - White-label products
 * > But:
 *   - Not recommended for beginners
 *   - Rarely needed
 *   - Adds complexity
 * > 99% of apps don't need this
*/

/**
 * Commong mistakes:
 * 1. Putting favicon in public/ and also in app/ 
 * 2. Expecting favicon to change instantly (Browser cache!)
 * 3. Using low-resolution images
 * 4. Forgetting mobile icons
 * 
 * Favicon not working?
 * > Browsers cache favicons aggresively.
 * > Fixes:
 *   - Hard refresh (Ctrl + Shift + R)
 *   - Open site in incognito
 *   - Clear browser cache
 *   - Rename icon file (lasr option)
*/



export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              app/page.js
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
