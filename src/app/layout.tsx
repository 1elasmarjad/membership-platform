import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";
import Section from "./_components/section";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";

export const metadata = {
  title: "Membership Platform",
  description: "Membership platform to sell digital products and services.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${GeistSans.variable} bg-[#F5F5F5]`}>
    <body>
        <nav className="mb-12 bg-white py-4 shadow-md">
          <Section>
            <div className="flex w-full items-center justify-between">
              <Link href="/" className="text-2xl font-bold">
                FanFund<b className="text-blue-500">.</b>
              </Link>
              <ul className="mx-24 flex flex-grow gap-24">
                <li>
                  <Link href="/create" className="text-lg">
                    Create
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-lg">
                    Search
                  </Link>
                </li>
              </ul>
              {session ? (
                <div className="flex gap-3 items-center">
                  <Link href="/api/auth/signout" className="flex">
                    Sign Out
                  </Link>
                  <Image
                    src={session.user?.image ?? ""}
                    width={32}
                    height={32}
                    alt="Test"
                    className="rounded-full"
                  />
                </div>
              ) : (
                <Link href="/api/auth/signin" className="flex">
                  Sign In
                </Link>
              )}
            </div>
          </Section>
        </nav>

        <TRPCReactProvider>
          <Section>{children}</Section>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
