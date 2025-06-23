import "./globals.css";
import { AuthProvider } from "./AuthProvider";

export const metadata = {
  title: "Job Tracker - Manage Your Applications",
  description: "Track your job applications, interviews, and outcomes easily.",
  openGraph: {
    title: "Job Tracker - Manage Your Applications",
    description:
      "Track your job applications, interviews, and outcomes easily.",
    url: "https://job-tracker-phi-nine.vercel.app",
    siteName: "Job Tracker",
    images: [
      {
        url: "/logonew1.png",
        width: 1200,
        height: 630,
        alt: "Job Tracker App",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="font-sans">{children}</body>
      </html>
    </AuthProvider>
  );
}
