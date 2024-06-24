"use client";

import { createAllMerchantData } from "~/server/actions";

export default function MerchantForm() {
  return (
    <form action={createAllMerchantData} className="flex flex-col gap-6">
      <label className="flex flex-col">
        Name
        <input type="text" id="name" name="name" />
      </label>

        

      <button type="submit">Create Merchant</button>
    </form>
  );
}
