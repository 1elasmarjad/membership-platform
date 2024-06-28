"use client";

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type z } from "zod";
import {
  type CreateMerchantSchema,
  type TierSchema,
} from "~/server/api/routers/merchant";
import { api } from "~/trpc/react";

export default function MerchantForm() {
  const router = useRouter();

  const [data, setData] = useState<z.infer<typeof CreateMerchantSchema>>({
    name: "",
    tiers: [],
  });

  const createMerchant = api.merchant.create.useMutation({
    onSuccess: (data) => {
      console.log("Merchant created");
      router.push(`/${data.merchantId}`);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <TextField
        name="name"
        label="Name"
        id="name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <div>
        <h3 className="text-center text-3xl">Tiers</h3>
        <TierForm setData={setData} data={data} idx={0} />
      </div>

      <Button
        variant="contained"
        onClick={() => {
          createMerchant.mutate(data);
        }}
      >
        Create Merchant
      </Button>
    </div>
  );
}

function TierForm({
  setData,
  data,
  idx,
}: {
  setData: (data: z.infer<typeof CreateMerchantSchema>) => void;
  data: z.infer<typeof CreateMerchantSchema>;
  idx: number;
}) {
  const [tier, setTier] = useState<z.infer<typeof TierSchema>>({
    title: "",
    description: "",
    price: {
      amount: 0,
      currency: "",
    },
  });

  useEffect(() => {
    const newTiers = [...data.tiers];
    newTiers[idx] = tier;
    setData({ ...data, tiers: newTiers });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier]);

  return (
    <div className="flex w-full flex-col gap-3">
      <TextField
        name="title"
        label="Title"
        id="title"
        size="small"
        onChange={(e) => setTier({ ...tier, title: e.target.value })}
        value={tier.title}
      />
      <TextField
        name="description"
        label="Description"
        id="description"
        size="small"
        onChange={(e) => setTier({ ...tier, description: e.target.value })}
        value={tier.description}
      />
      <TextField
        name="price.amount"
        label="Price Amount"
        id="priceAmount"
        size="small"
        onChange={(e) =>
          setTier({
            ...tier,
            price: { ...tier.price, amount: Number(e.target.value) },
          })
        }
        value={tier.price.amount}
      />
      <TextField
        name="price.currency"
        label="Price Currency"
        size="small"
        id="priceCurrency"
        onChange={(e) =>
          setTier({
            ...tier,
            price: { ...tier.price, currency: e.target.value },
          })
        }
      />
    </div>
  );
}
