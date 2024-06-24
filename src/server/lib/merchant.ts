import "server-only";
import { db } from "../db";
import { merchants } from "../db/schema";
import { eq } from "drizzle-orm";

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

export async function getMerchantInfo(
  merchantId: string,
): Promise<MerchantInfo> {

  const merchant = await db.query.merchants.findFirst({
    where: eq(merchants.id, merchantId),
    with: {
      tiers: true,
    },
  });

  if (!merchant) {
    throw new Error("Merchant not found");
  }

  return {
    id: merchantId,
    name: merchant.name,
    tiers: [
      {
        id: "1",
        price: "$10.12 CAD",
        description: "This is a test",
        buyLink: "https://example.com",
        title: "Test Donator Tier",
      },
    ],
  };
}
