import TierBlock from "../_components/tier-block";

export default function MerchantPage({
  params,
}: {
  params: { merchant: string };
}) {
  return (
    <section className="flex flex-col w-full items-center">
      <div className="flex max-w-7xl w-full lg:flex-row flex-col justify-between lg:gap-2 gap-6 items-center">
        <TierBlock
          data={{
            price: "$10.12 CA",
            title: "Test Tier Donator",
            description: "This is an example tier",
            buyLink: "https://example.com",
            loading: false,
          }}
        />
        <TierBlock
          data={{
            price: "$10.12 CA",
            title: "Test Tier Donator",
            description: "This is an example tier",
            buyLink: "https://example.com",
            loading: true,
          }}
        />

        <TierBlock
          data={{
            price: "$10.12 CA",
            title: "Test Tier Donator",
            description: "This is an example tier",
            buyLink: "https://example.com",
            loading: true,
          }}
        />
      </div>
    </section>
  );
}
