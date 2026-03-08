/**
 * Dynamic Open Graph Images:
 * > An Open Graph Images is the preview image shown when you share
 *   a link on:
 *   - WhatsApp
 *   - LinkedIn
 *   - Facebook
 *   - Twitter (X)
 *   - Slack / Discord
 * > It's the big image in the link preview.
*/

/**
 * Static vs Dynamic OG Image:
 * 1. Static OG Image:
 *    - Same image for all pages
 *    - Logo/Brand banner
 *    - Easy, zero logic
 * 2. Dynamic OG Image
 *    - Image changes per page
 *    - Uses data (title, product name, author, price, etc.)
 *    - Generated on the fly
 * 
 * Example:
 * > Blog Page    - Blog title on image
 * > Product Page - Product Name + Price on image
*/

/**
 * What is Dynamic OG Image?
 * > A dynamic OG image is:
 *   - Generated at runtime
 *   - Based on:
 *     > Route params
 *     > API data
 *     > Database content
 * > Every page gets its own custom preview image
*/

/**
 * Why do dynamic OG images matter?
 * > Dynamic OG Images give you:
 *   - Higher click-through rate
 *   - Personalized previews
 *   - Better branding for content
 *   - Professional, modern feel
 * > Same link + Custom image = Way more click
*/

/**
 * When should you use dynamic OG image?
 * > Perfect for:
 *   - Blogs 
 *   - Articles
 *   - Product Pages
 *   - User profiles
 *   - Multi-tenant apps
 * > Overkill for:
 *   - Simple landing pages
 *   - Static marketing sites
 * > Rule: If page content changes -> dynamic OG makes sense
*/

/**
 * How Dynamic OG works in Next.js:
 * > Think of it like this:
 *   1. Someone shares your page
 *   2. Social platform requests OG image
 *   3. Next.js runs a special API
 *   4. Image is generated using code
 *   5. That image is sent as preview
 * > It's basically an image-generating API
*/

/**
 * The Core Idea: OG Image as an API Route
 * > In Next.js, dynamic OG images are built using: route.js
 * > This route:
 *   - Returns an image
 *   - Not JSON
 *   - Not HTML
 * > It behaves like an API, but outputs an image.
 * 
 * Folder Structure:
 * > Example for a blog page
 *   app/
 *    ├─ blog/
 *    │   └─ [slug]/
 *    │       ├─ page.js
 *    │       ├─ opengraph-image.js
 * > That opengraph-image.js file is the hero
 * 
 * Basic Example:
 * > Inside opengraph-image.js, you:
 *   - Read route params
 *   - Use text, styles, layout
 *   - Returns an image
 * > Mentally think: Title from URL → render image → return PNG
 *   (You're designing an image with code)
*/

/**
 * What can you put inside a Dynamic OG Image?
 * > You can include:
 *   - Page title
 *   - Subtitle
 *   - Author name
 *   - Product price
 *   - Brand logo
 *   - Background color
 *   - Gradients
 *   - Fonts
 * > It's like building a mini UI, but for an image
*/

/* Step-1 */ 
import { ImageResponse } from "next/og"

/* Step-2 */ 
export const runtime = "edge"

export async function GET(request) {
  /* Step-3 */ 
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") || "Chai or Code";
  const description = searchParams.get("description") || "Chai or Code";

  /* Step-4: Customize Image */ 
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: 'center',
          color: 'white',
          padding: '0 120px',
        }}
      >
        <div style={{ marginBottom: 20 }}>{title}</div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 400,
            opacity: 0.8,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }

  )
}