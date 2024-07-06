import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col items-center">
        <h1 className="mt-12 text-center text-6xl font-semibold">
          Monetize Your Community<b className="text-blue-500">.</b>
        </h1>
        <p className="mt-3 text-center text-2xl">
          Building bridges between fans and creators
        </p>

        <div className="flex justify-between w-full max-w-md">
          <Link
            href="/create"
            className="mt-6 w-fit rounded-lg bg-blue-500 px-12 py-3 text-lg text-white transition-all hover:bg-blue-400"
          >
            Register Now
          </Link>

          <Link
            href="/find"
            className="mt-6 w-fit rounded-lg bg-blue-500 px-12 py-3 text-lg text-white transition-all hover:bg-blue-400"
          >
            Find Creators
          </Link>
        </div>
      </div>
    </main>
  );
}
