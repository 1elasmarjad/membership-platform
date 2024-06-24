import { getMerchantInfo } from "~/server/lib/merchant";
import TierBlock, { LoadingTierBlock } from "../_components/tier-block";
import { Suspense } from "react";

export default async function MerchantPage({
  params,
}: {
  params: { merchant: string };
}) {
  return (
    <section className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-6 lg:flex-row lg:gap-2">
        <Suspense
          fallback={
            <>
              <LoadingTierBlock />
              <LoadingTierBlock />
              <LoadingTierBlock />
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
  const merchantInfo = await getMerchantInfo(merchant);

  return (
    <>
      {merchantInfo.tiers.map((o, _) => (
        <>
          <TierBlock
            data={{
              price: o.price,
              title: o.title,
              description: o.description,
              buyLink: o.buyLink,
            }}
          />
        </>
      ))}
    </>
  );
}
