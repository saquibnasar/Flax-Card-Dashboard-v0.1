import "easymde/dist/easymde.min.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "remixicon/fonts/remixicon.css";
import PrivateLayout from "./PrivateLayout";
import "./globals.css";
import GoogleAnalyticsScript from "./components/GoogleAnalyticsScript";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "react-international-phone/style.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Flax Card",
  description: "Creating Digital Business cards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <GoogleAnalyticsScript />
      <body className={poppins.className + " no-bar bg-sSecondary"}>
        <NextTopLoader
          color="#4353FF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={false}
        />
        <PrivateLayout>{children}</PrivateLayout>
      </body>
    </html>
  );
}
