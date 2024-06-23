export default function TierBlock({
  data,
}: {
  data: {
    price: string;
    title: string;
    description: string;
    buyLink: string;
    loading: boolean
  };
}) {
  return (
    <div className="flex max-w-sm w-full flex-col rounded-lg bg-white px-4 py-8">
      <div className="flex w-full flex-col">
        <h2 className="text-2xl font-semibold">{data.title}</h2>
        <div className="flex items-end gap-2">
          <h3 className="text-3xl font-bold">{data.price}</h3>
          <div className="mb-0.5 text-sm">/mo</div>
        </div>
        <a
          className="mt-6 rounded-lg bg-green-600 text-white text-center transition-all hover:bg-green-500 py-2.5 font-bold"
          href={data.buyLink}
        >
          Donate
        </a>
      </div>

      <p className="mt-6">{data.description}</p>
    </div>
  );
}
