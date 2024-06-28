import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { addTier, createMerchant } from "~/server/lib/merchant";

export const TierSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.object({
    amount: z.number(),
    currency: z.string(),
  }),
});

export const CreateMerchantSchema = z.object({
  name: z.string(),
  tiers: z.array(TierSchema),
});

export const merchantRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateMerchantSchema)
    .mutation(async ({ ctx, input }) => {
      console.log("Creating merchant data", input);

      if (!ctx.session) {
        console.error("Not authenticated");
        throw Error("Not authenticated");
      }

      const userId = ctx.session.user.id;

      // TODO: add transaction support

      // create merchant
      const merchantId = await createMerchant({
        name: input.name,
        ownerId: userId,
      });

      // add tiers
      for (const tier of input.tiers) {
        await addTier({
          merchantId: merchantId,
          title: tier.title,
          description: tier.description,
          price: tier.price,
        });
      }

      return {
        merchantId,
      };
    }),
});
