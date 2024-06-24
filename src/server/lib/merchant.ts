import "server-only";
import { db } from "../db";
import { merchants, tiers } from "../db/schema";
import { eq } from "drizzle-orm";
import { env } from "~/env";
import Stripe from "stripe";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const stripe = new Stripe(env.STRIPE_API_KEY);

interface TierInfo {
  id: string;
  title: string;
  price: {
    amount: number;
    currency: string;
  };
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

export async function createMerchant({
  name,
  ownerId,
}: {
  name: string;
  ownerId: string;
}): Promise<string> {
  const generatedId = name.toLowerCase().replace(" ", "-");

  await db.insert(merchants).values({
    id: generatedId,
    name: name,
    ownerId: ownerId,
  });

  return generatedId;
}

export async function addTier({
  merchantId,
  title,
  description,
  price,
}: Omit<TierInfo, "id"> & {
  merchantId: string;
  price: {
    amount: number;
    currency: string;
  };
}) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const stripePrice: {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  } = await stripe.prices.create({
    currency: price.currency,
    unit_amount: price.amount,
  });

  await db.insert(tiers).values({
    merchantId: merchantId,
    title: title,
    description: description,
    priceId: stripePrice.id,
  });
}

export async function getTierBlocks(merchantId: string): Promise<TierInfo[]> {
  const tierData = await db.query.tiers.findMany({
    where: eq(tiers.merchantId, merchantId),
  });

  if (!tierData) {
    throw new Error("Merchant not found");
  }

  return Promise.all(
    tierData.map(async (tier) => {
      const price = await stripe.prices.retrieve(tier.priceId);

      return {
        id: tier.id,
        title: tier.title,
        price: {
          amount: Math.round(price.unit_amount ?? 0 / 100),
          currency: price.currency,
        },
        description: tier.description,
        buyLink: "/buy",
      };
    }),
  );
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
