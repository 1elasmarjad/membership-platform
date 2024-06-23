import { getMerchantInfo } from "~/server/lib/merchant";
import TierBlock from "../_components/tier-block";

export default async function MerchantPage({
  params,
}: {
  params: { merchant: string };
}) {
  const merchantInfo = await getMerchantInfo(params.merchant);

  return (
    <section className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-6 lg:flex-row lg:gap-2">
        {merchantInfo.tiers.map((o, _) => (
          <>
            <TierBlock
              data={{
                price: o.price,
                title: o.title,
                description: o.description,
                buyLink: o.buyLink,
                loading: false,
              }}
            />
          </>
        ))}
      </div>
    </section>
  );
}
