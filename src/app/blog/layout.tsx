import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Made in Melostead | Developer Blog",
  description: "CherryCapra Developer Blog",
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
