import "server-only";

interface TierInfo {
  id: string;
  title: string;
  price: string;
  description: string;
  buyLink: string;
}

interface MerchantInfo {
  id: string;
  name: string;
  tiers: TierInfo[];
}

export async function getMerchantInfo(merchantId: string): Promise<MerchantInfo> {
  return {
    id: merchantId,
    name: "test",
    tiers: [
      {
        id: "abc",
        price: "$10.12 CAD",
        description: "This is a test",
        buyLink: "https://example.com",
        title: "Test Donator Tier"
      },
    ],
  };
}
