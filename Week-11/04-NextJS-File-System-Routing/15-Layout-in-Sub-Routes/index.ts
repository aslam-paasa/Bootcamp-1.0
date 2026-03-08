/**
 * Understanding Layouts:
 * > You'll notice a file in your app folder called "layout.tsx".
 * > Layouts let you wrap all child pages inside some common logic.
 * > Example:
 * 
 *   export const metadata = {
 *     title: "My App",
 *     description: "My App Description",
 *   }
 * 
 *   export default function RootLayout({ children }: { children: React.ReactNode }) {
 *     return (
 *       <html>
 *         <head>
 *           <title>{metadata.title}</title>
 *         </head>
 *         <body>{children}</body>
 *       </html>
 *     )
 *   }
*/

/** 
 * Root Layout: 
 * > This is the main layout for the entire app 
 * > It wraps all child 'pages' inside some logic (like a wrapper) along
 *   with some common UI (like a header, footer, etc.).
 * > It is a good place to put things like:
 *   - Global CSS, Fonts, Meta Tags, Scripts, Styles, Components, etc.
 * 
 * Example:
 * 
 *   export default function RootLayout({ children }: { children: React.ReactNode }) {
 *     return (
 *       <html>
 *         <head>
 *           <title>{metadata.title}</title>
 *         </head>
 *         <body>{children}</body>
 *       </html>
 *     )
 *   }
*/

/**
 * Layouts in Sub routes & Merging Routes:
 * > What if you wan't all routes that starts with /signin to have a banner
 *   that says 'Login now to get 20% off'
*/