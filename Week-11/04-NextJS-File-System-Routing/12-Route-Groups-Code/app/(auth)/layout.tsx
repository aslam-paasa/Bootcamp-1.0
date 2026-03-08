import React from "react";

export const metadata = {
  title: "Sign in - MyApp",
};

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {/* shared banner for all /signin routes */}
        <div className="bg-yellow-100 border-b border-yellow-300 text-yellow-900">
          <div className="max-w-4xl mx-auto px-4 py-2 text-center font-medium">
            🎉 Login now to get <span className="font-bold">20% off</span> —
            limited time!
          </div>
        </div>

        {/* page container that will render each /signin page */}
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
