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
    <div className="flex max-w-sm flex-col rounded bg-white px-4 py-3">
      <div className="flex w-full flex-col">
        <h2 className="text-xl font-bold">{params.title}</h2>
        <div className="flex items-end gap-2">
          <h3 className="text-2xl font-bold">{params.price}</h3>
          <div className="mb-0.5 text-sm">/mo</div>
        </div>
        <a
          className="mt-6 rounded-lg bg-green-600 text-white text-center transition-all hover:bg-green-500 py-2 font-bold"
          href={params.buyLink}
        >
          Donate
        </a>
      </div>

      <p className="mt-6">{params.description ?? "..."}</p>
    </div>
  );
}
