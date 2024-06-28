import { getMerchantInfo, getTierBlocks } from "~/server/lib/merchant";
import TierBlock, { TierBlockSkeleton } from "../_components/tier-block";
import { Suspense } from "react";

export default async function MerchantPage({
  params,
}: {
  params: { merchant: string };
}) {
  return (
    <section className="flex w-full flex-col items-center">
      <div className="mb-5 flex flex-col items-center">
        <MerchantTitle merchant={params.merchant} />
      </div>

      <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-6 lg:flex-row lg:gap-2">
        <Suspense
          fallback={
            <>
              <TierBlockSkeleton />
              <TierBlockSkeleton />
              <TierBlockSkeleton />
            </>
          }
        >
          <TierBlocks merchant={params.merchant} />
        </Suspense>
      </div>
    </section>
  );
}

async function TierBlocks({ merchant }: { merchant: string }) {
  try {
    const tbData = await getTierBlocks(merchant);

    return (
      <>
        {tbData.map((o, _) => (
          <>
            <TierBlock
              data={{
                price:
                  o.price.amount.toString() +
                  " " +
                  o.price.currency.toUpperCase(),
                title: o.title,
                description: o.description,
                buyLink: o.buyLink,
              }}
            />
          </>
        ))}
      </>
    );
  } catch (e) {
    console.error(e);
    return <></>;
  }
}

async function MerchantTitle({ merchant }: { merchant: string }) {
  try {
    const merchantInfo = await getMerchantInfo(merchant);

    return (
      <>
        <h1 className="text-3xl font-semibold">
          Subscribe to {merchantInfo.name}
        </h1>
        <h2 className="text-lg text-gray-500">
          Support {merchantInfo.owner.name}
        </h2>
      </>
    );
  } catch (e) {
    console.error(e);
    return <h1 className="text-4xl font-bold">Not Found</h1>;
  }
}
