import TierBlock from "../_components/tier-block";

export default function MerchantPage({
  params,
}: {
  params: { merchant: string };
}) {
  return (
    <>
      <TierBlock params={{
        price: "$10.12 CA",
        title: "Test Tier Donator",
        description: "This is an example tier",
        buyLink: "https://example.com",
      }}/>
    </>
  );
}
