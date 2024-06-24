export default function TierBlock({
  data,
}: {
  data: {
    price: string;
    title: string;
    description: string;
    buyLink: string;
  };
}) {
  return (
    <div className="flex w-full max-w-sm flex-col rounded-lg bg-white px-4 py-8">
      <div className="flex w-full flex-col">
        <h2 className="text-2xl font-semibold">{data.title}</h2>
        <div className="flex items-end gap-2">
          <h3 className="text-3xl font-bold">{data.price}</h3>
          <div className="mb-0.5 text-sm">/mo</div>
        </div>
        <a
          className="mt-6 rounded-lg bg-green-600 py-2.5 text-center font-bold text-white transition-all hover:bg-green-500"
          href={data.buyLink}
        >
          Donate
        </a>
      </div>

      <p className="mt-6">{data.description}</p>
    </div>
  );
}

export function LoadingTierBlock() {
  return (
    <div className="flex w-full max-w-sm flex-col rounded-lg bg-white px-4 py-8">
      <div className="flex w-full flex-col">
        <div className="bg-gray-300 animate-pulse w-[90%] h-8 rounded"></div>
        <div className="bg-gray-300 animate-pulse w-[70%] h-10 mt-3 rounded"></div>
        <div
          className="mt-6 rounded-lg bg-green-300 py-2.5 text-center font-bold text-white transition-all hover:bg-green-500 animate-pulse h-12"
        >
        </div>
      </div>

      <div className="mt-6 w-full bg-gray-300 h-12 rounded">

      </div>
      
    </div>
  );
}
