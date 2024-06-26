import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Membership Platform",
  description: "Membership platform to sell digital products and services.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} bg-[#F5F5F5]`}>
      <body>
        <nav className="mb-12 bg-white py-2 shadow-md">
          Navigation Bar
          {/* Navbar TODO */}
        </nav>

        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
