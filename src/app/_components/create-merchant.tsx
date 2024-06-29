"use client";

import { Button, Step, StepLabel, Stepper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type z } from "zod";
import {
  type CreateMerchantSchema,
  type TierSchema,
} from "~/server/api/routers/merchant";
import { api } from "~/trpc/react";

const steps = ["Information", "Tiers"];

export default function MerchantForm() {
  const router = useRouter();

  const [data, setData] = useState<z.infer<typeof CreateMerchantSchema>>({
    name: "",
    tiers: [
      {
        title: "",
        description: "",
        price: { amount: 0, currency: "" },
      },
    ],
  });

  const [step, setStep] = useState<number>(0);

  const createMerchant = api.merchant.create.useMutation({
    onSuccess: (data) => {
      console.log("Merchant created");
      router.push(`/${data.merchantId}`);
    },
  });

  return (
    <>
      <Stepper alternativeLabel activeStep={step} className="w-full pb-12">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="flex w-full flex-col gap-6">
        {step === 0 && (
          <>
            <TextField
              name="name"
              label="Name"
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              autoComplete="off"
            />
            <Button
              variant="contained"
              onClick={() => {
                if (data.name.length < 3) {
                  console.log("Name must be at least 3 characters");
                  return;
                }

                setStep(1);
              }}
            >
              Next
            </Button>
          </>
        )}
        {step === 1 && (
          <>
            {data.tiers.map((tier, idx) => (
              <div
                className="rounded-lg border border-gray-300 p-4"
                key={`tb_${idx}`}
              >
                <TierForm key={idx} idx={idx} setData={setData} data={data} />
                <div className="flex justify-center">
                  <Button
                    color="warning"
                    variant="contained"
                    size="small"
                    className="mt-4"
                    onClick={() => {
                      if (data.tiers.length === 1) {
                        console.log("Cannot remove last tier");
                        return;
                      }

                      const newTiers = [...data.tiers];
                      newTiers.splice(idx, 1);
                      setData({ ...data, tiers: newTiers });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            <Button
              variant="contained"
              onClick={() => {
                setData({
                  ...data,
                  tiers: [
                    ...data.tiers,
                    {
                      title: "",
                      description: "",
                      price: { amount: 0, currency: "" },
                    },
                  ],
                });
              }}
            >
              Add Tier
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setStep(0);
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                createMerchant.mutate(data);
              }}
            >
              Create
            </Button>
          </>
        )}
      </div>
    </>
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
    <>
      <div className="flex w-full flex-col gap-3">
        <TextField
          label="Title"
          id="title"
          size="small"
          onChange={(e) => setTier({ ...tier, title: e.target.value })}
          value={tier.title}
          autoComplete="off"
        />
        <TextField
          label="Description"
          id="description"
          size="small"
          onChange={(e) => setTier({ ...tier, description: e.target.value })}
          value={tier.description}
          autoComplete="off"
        />
        <TextField
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
          autoComplete="off"
        />
        <TextField
          label="Price Currency"
          size="small"
          id="priceCurrency"
          onChange={(e) =>
            setTier({
              ...tier,
              price: { ...tier.price, currency: e.target.value },
            })
          }
          autoComplete="off"
        />
      </div>
    </>
  );
}
