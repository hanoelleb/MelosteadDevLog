import type { Metadata } from "next";

type Props = {
  params: { name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const name = params.name;

  return {
    title: `Made in Melostead | ${name}`,
    description: `Character pag for ${name}`,
    openGraph: {
      images: [`/portraits/${name}/Neutral.png`],
    },
  };
}

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
