import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "Online-Fitness-Kurse mit Michi",
//   description:
//     "Online-Fitness-Kurse mit Michi über Zoom - Yoga, Workout, DAYO und Mobility",
//   metadataBase: new URL(process.env.URL!),
//   alternates: {
//     canonical: "/",
//   },
//   openGraph: {
//     images: "/opengraph-image.jpg",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
