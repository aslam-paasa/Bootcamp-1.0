/**
 * 1. Why Images are a big problem on the web?
 *    > Images are usually:
 *      - very large in size
 *      - slow to load
 *      - not reponsive by default
 *      - cause layout shift (page jumps)
 *      - kill performance & SEO
 *    > In most websites, images are the #1 for slow pages.
 * 
 * 2. The Old way of using Images (What not to do):
 *    > <img src="/banner.png" />
 *    > Problems with this:
 *      - Browser downloads full image (even if not needed)
 *      - No resizing for different screens
 *      - No lazy loading by default
 *      - No optimization
 *    > Simple, but different.
 * 
 * 3. What problems do next.js image components solve?
 *    > Next.js gives you: next/image 
 *    > This component automatically optimizes images for you.
 *    > It handles:
 *      - Image resizing
 *      - Lazy Loading
 *      - Responsive Images
 *      - Format Optimization (WebP, AVIF)
 *      - Prevents layout shift
 *    > You write less, get more
 * 
 * 4. What is the Image Component?
 *    > The Image Component is a smarter version of <img>. 
 *    > Think like this:
 *      - <img> = dumb
 *      - <Image /> = smart, optimized image
 * 
 * 5. How Image Optimization Works?
 *    > When you use <Image />
 *      a. Next.js analyzes image size
 *      b. Creates multiple versions (small, medium, large)
 *      c. Sends only the right size of the device
 *      d. Loads image only when needed
 *      e. Uses modern formats automatically
 *    > Result: Faster site, happier users
 * 
 * 6. Local Images vs Remote Images
 *    a. Local Images:
 *       - Stored inside your project
 *       - Ex: /public/banner.png
 * 
 *    b. Remote Images
 *       - Loaded from external URL
 *       - Ex: CDN, API images
 *       - Next.js will optimize them, but you must allow the domain first
 * 
 * 7. Preventing Layout Shift:
 *    > Layout Shift = page jumps when image loads
 *    > Next.js fixes this by:
 *      - knowing image dimensions beforehand
 *      - reserving space before image loads
 *    > This is hige for UX & SEO
 * 
 * 8. Lazy Loading (Free Performance Boost)
 *    > Lazy Loading means:
 *      - Images load only when they enter viewport
 *      - Off-screen images are skipped
 *    > Next.js:
 *      - Enables lazy loading automatically
 *      - You don't have to do anything
 *    > Faster initial load = better performance score
 * 
 * 9. Responsive Images (Mobile, Tablet, Desktop)
 *    > Without Optimization: Mobile downloads desktop-sized image
 *    > With Next.js Image  :
 *      - Mobile : small image
 *      - Tablet : medium image
 *      - Desktop: large image
 *    > Same image, different sizes, smart delivery
 * 
 * 10. When should you use <Image />?
 *     > Use it for:
 *       - Hero banners
 *       - Blog Images
 *       - Product Images
 *       - Avatars
 *       - Thumbnails
 *     > Basically: almost everywhere
 * 
 * 11. When not to use <Image />?
 *     > Avoid it for:
 *       - Very small icons (SVGs)
 *       - Background images via CSS
 *       - Decorative Patterns
 *     > Use normal <img> or CSS there.
 * 
 * Summary:
 * The Next.js Image component automatically optimizes images by 
 * resizing, lazy loading, and serving the best format — giving you 
 * faster pages, better UX, and better SEO with almost zero effort.
*/

import React from 'react'

const page = () => {
  return (
    <div>
      Optimized Images in Next.js 
    </div>
  )
}

export default page
