import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Made in Melostead | Characters",
  description: "List of characters in Made in Melostead",
  authors: [{ name: "CherryCapra" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}