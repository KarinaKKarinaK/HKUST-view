import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const title = "HKUST Exchange - Everything You Need";
const description =
  "The one-stop hub for Fall 2026 incoming exchange students at HKUST. Orientation schedule, add-to-calendar, checklists, quick links and group chats. All times Hong Kong (HKT).";

export const metadata: Metadata = {
  title,
  description,
  manifest: "/manifest.webmanifest",
  applicationName: "HKUST Exchange",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HKUST Exchange",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: { title, description, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Set dark mode before paint to avoid flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark');}catch(e){}`,
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
