import "server-only";
import { db } from "../db";
import { merchants, tiers } from "../db/schema";
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
  owner: {
    id: string;
    name: string;
    image: string | null;
  };
}

export async function getTierBlocks(merchantId: string): Promise<TierInfo[]> {
  const tierData = await db.query.tiers.findMany({
    where: eq(tiers.merchantId, merchantId),
  });

  if (!tierData) {
    throw new Error("Merchant not found");
  }

  return tierData.map((tier) => ({
    id: tier.id,
    title: tier.title,
    price: "$10 CAD",
    description: tier.description,
    buyLink: "/buy",
  }));
}

export async function getMerchantInfo(
  merchantId: string,
): Promise<MerchantInfo> {
  const merchantData = await db.query.merchants.findFirst({
    where: eq(merchants.id, merchantId),
    with: {
      owner: true,
    },
  });

  if (!merchantData) {
    throw new Error("Merchant not found");
  }

  return {
    id: merchantData.id,
    name: merchantData.name,
    owner: {
      id: merchantData.owner.id,
      name: merchantData.owner.name ?? "Unknown",
      image: merchantData.owner.image ?? null,
    },
  };
}
