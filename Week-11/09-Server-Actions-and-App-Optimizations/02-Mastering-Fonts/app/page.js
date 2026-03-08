/**
 * What are Fonts
 * > Fonts decide:
 *   - How your website looks
 *   - How readable it is
 *   - How professional it feels
 * > Bad Fonts  -> Site feels cheap
 * > Good Fonts -> instant polish
 * 
 * Font Optimization:
 * > 'next/font' module automatically optimizes our fonts (including
 *   custom fonts).
 * > We need not to make another network request to load our font.
 * 
 * 
*/

/**
 * Fonts in Next.js:
 * 1. The Old Way (Before Next.js Fonts)
 *    > Traditionally, people did this:
 *      - Load fonts from <link> tags
 *      - Fonts load after page loads
 *      - Causes layout shift (text jumps)
 *      - Slower performance
 *    > This hurts UX + SEO
 * 
 * 2. What problem does Next.js fonts solve?
 *    > Next.js introduces: next/font 
 *    > This gives:
 *      - Automatic Optimization
 *      - No layout shift
 *      - Better performance
 *      - Zero manual font loading
 *    > Fonts are handled at built time, not runtime.
 * 
 * 3. Two types of Fonts in Next.js:
 *    > Next.js supports two main font sources:
 *      1. Google Fonts
 *      2. Local Fonts
 *    
 *    > Google Fonts in Next.js 
 *      - Free fonts hosted by google
 *      - Example: Inter, Roboto, Poppins
 *      - Next.js can download & optimize them automatically:
 *        import { Inter } from "next/font/google"
 *      - Behind the scenes:
 *        > Font is downloaded
 *        > Self-hosted
 *        > Optimized
 *        > Loaded efficiently
 *      - No external requests to Google
 * 
 *    > Local Fonts:
 *      - Fonts are kept at: app/fonts/ 
 *      - Example: 
 *        fonts/
 *         ├─ MyFont-Regular.woff2
 *         ├─ MyFont-Bold.woff2
 *      
 * 4. Where should fonts be applied?
 *    > Best place: app/layout.js 
 *    > Why?
 *      - One-time setup
 *      - Applies to all pages
 *      - Avoids duplication
 *    > Don't load fonts in every page
 * 
 * 5. Common Beginner Mistakes 
 *    > Loading fonts via <link> manually
 *    > Using too many font weights
 *    > Mixing many fonts
 *    > Applying fonts at page level
 * 
 * Mental Model:
 * > Think like this:
 *   - next/font   = font manager
 *   - Google font = easy & fast
 *   - Local font  = custom & branded
 *   - layout.js   = best place to apply
 * 
 * Summary:
 * Next.js fonts give you fast, optimized, and layout-shift-free 
 * typography by handling Google and local fonts automatically — 
 * no manual loading, no performance pain.
*/

export default function Home() {
  return (
    <div>Mastering Font</div>
  )
}