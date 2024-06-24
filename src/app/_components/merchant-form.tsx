"use client";

import { createAllMerchantData } from "~/server/actions";

export default function MerchantForm() {
  return (
    <form action={createAllMerchantData}>
      <input type="text" placeholder="Merchant Name" />
      <button type="submit">Create Merchant</button>
    </form>
  );
}
