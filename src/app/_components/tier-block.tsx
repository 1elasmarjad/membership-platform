export default function TierBlock({
  params,
}: {
  params: {
    price?: string;
    title?: string;
    description?: string;
    buyLink?: string;
  };
}) {
  return (
    <div className="flex max-w-64 flex-col rounded bg-slate-400 px-4 py-3">
      <div className="flex w-full flex-col items-center">
        <h2 className="text-2xl font-bold">{params.title ?? "..."}</h2>
        <h3>{params.price ?? "$"}</h3>
      </div>

      <p className="mt-6">{params.description ?? "..."}</p>

      <a
        className="mt-6 rounded-lg bg-white transition-all hover:bg-slate-200 text-center"
        href={params.buyLink}
      >
        Buy Now
      </a>
    </div>
  );
}
