"use server";

import "server-only";
import { addTier, createMerchant } from "./lib/merchant";
import { z } from "zod";
import { getServerAuthSession } from "./auth";

const CreateMerchantSchema = z.object({
  name: z.string(),
  tiers: z.array(
    z.object({
      merchantId: z.string(),
      title: z.string(),
      description: z.string(),
      price: z.object({
        amount: z.number(),
        currency: z.string(),
      }),
    }),
  ),
});

export async function createAllMerchantData(formData: FormData) {
  const data: Record<string, unknown> = {};
  formData.forEach((value, key) => (data[key] = value));
  const json = JSON.stringify(data);

  const parse = await CreateMerchantSchema.safeParseAsync(JSON.parse(json));

  if (!parse.success) {
    console.error("Invalid merchant creation form input", parse.error);
    throw Error("Invalid merchant creation form input");
  }

  const session = await getServerAuthSession();

  if (!session) {
    console.error("Not authenticated");
    throw Error("Not authenticated");
  }

  const userId = session.user.id;

  // TODO: add transaction support

  // create merchant
  await createMerchant({
    name: parse.data.name,
    ownerId: userId,
  });

  // add tiers
  for (const tier of parse.data.tiers) {
    await addTier({
      merchantId: tier.merchantId,
      title: tier.title,
      description: tier.description,
      price: tier.price,
    });
  }

  console.log("Created merchant data");
}
