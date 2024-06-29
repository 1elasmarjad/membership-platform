import { getServerAuthSession } from "~/server/auth";
import MerchantForm from "../_components/create-merchant";
import Link from "next/link";

export const metadata = {
  title: "Join Today",
};

export default async function CreateMerchant() {
  const session = await getServerAuthSession();

  return (
    <>
      {session ? (
        <MerchantForm />
      ) : (
        <>
          <h1 className="pb-6">Sign in to create a merchant</h1>
          {/* TODO redirect/callback to /create */}
          <Link href="/api/auth/signin" className="bg-blue-400 px-4 py-0.5 rounded font-bold">Sign In</Link>
        </>
      )}
    </>
  );
}
