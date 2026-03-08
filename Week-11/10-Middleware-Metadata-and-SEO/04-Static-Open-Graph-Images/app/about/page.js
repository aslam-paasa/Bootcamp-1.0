import React from 'react'

/**
 * Static Open Graph Image in Next.js:
 * > An Open Graph image is the pre-created image that appears when you
 *   share a link on:
 *   - WhatsApp
 *   - LinkedIn
 *   - Facebook
 *   - Twitter (X)
 *   - Slack / Discord
 * > Example:
 *   - Share a blog link
 *   - You see a big image + title + description
 * > That image = Open Graph Image
*/

/**
 * Why Open Graph Images Matter 
 * > OG Images help with:
 *   - Better link previews
 *   - Higher click-through rate
 *   - Strong branding
 *   - Trust + credibility
 * > Same link, better preview = more clicks
*/

/**
 * What does "Static" Open Graph Image Mean?
 * > A Static OG Image:
 *   - is fixed
 *   - same size for everyone
 *   - same image for every share
 *   - does not depend on data
 * > Think:
 *   - App logo
 *   - Brand banner
 *   - Marketing image
*/

/**
 * When should you use a Static OG Image?
 * > Perfect for:
 *   - Landing Pages
 *   - Home Pages
 *   - About Page
 *   - Marketing Pages
 *   - Docs Pages
 * > Not ideal for:
 *   - Blogs
 *   - Product Pages
 *   - User-generated content
*/

/**
 * How Static OG Images Work in Next.js
 * > Next.js makes this super easy with file-based metadata.
 * > You just place an image in the app folder, and Next.js does the
 *   rest.
 * 
 * 1. Simplest Way (Recommended)
 *    a. Create an OG image: 
 *       - opengraph-image.png
 *       - Recommended Size  : 1200 x 630
 *         (This works perfectly on all platforms)
 *    b. Place it here:
 *       - app/opengraph-image.png
 *       - No config. No Code. No headache
 *       - Next.js automatically:
 *         > Detects it
 *         > Adds OG meta tags
 *         > Uses it for social sharing
 *    c. How it looks in real life
 *       - When someone shares your site:
 *         > Image       - opengraph-image.png 
 *         > Title       - metadata title
 *         > Description - metadata description
 *       - Clean social preview, automatically.
 *    d. Features & Props:
 *       - Same image everywhere
 *       - Doesn't depend on data
 *       - Easy to setup
 *       - Fast performance
 *       - Best for branding
 *    e. Cons:
 *       - Same image for all pages
 *       - Not personalized
 *       - Not ideal for content-heavy apps
 *         (That's why blogs usually use dynamic OG images)
*/

/**
 * Open Graph Image Example:
*/
export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company and mission.',
  openGraph: {
    title: 'About Us - My Company',
    description: 'Learn more about our company and mission.',
    images: ['/globe.svg'],
    url: 'http://localhost:3000/about',
  },
}

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Our company story...</p>
    </div>
  )
}

