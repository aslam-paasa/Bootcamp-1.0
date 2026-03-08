import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>Header</div>
      {children}
      <div>Footer</div>
    </div>
  );
}

/**
 * Note:
 * 1. This component serves as a layout template, specifically for 
 *    authenticated pages. It ensures that all content in the "auth" section
 *    is wrapped with a consistent Header and Footer.
 * 2. By placing the `auth` folder in parentheses (e.g., `(auth)`), Next.js
 *    will skip routing for the folder itself. This means routes like 
 *    localhost:3000/auth will not be accessible. Instead, we can directly 
 *    access pages within the `auth` folder, such as localhost:3000/signin 
 *    or localhost:3000/signup.
 * 3. This structure ensures that every page inside the "auth" folder has a 
 *    consistent layout, with the Header displayed above and the Footer 
 *    below the main content (children).
*/
