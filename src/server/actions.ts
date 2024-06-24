"use server";

import { getSession } from "next-auth/react";
import "server-only";
import { createMerchant } from "./lib/merchant";

export async function createAllMerchantData(formData: FormData) {
  const data: Record<string, unknown> = {};
  formData.forEach((value, key) => (data[key] = value));
  const json = JSON.stringify(data);

  console.log(json);

  // zod validation required

  // if (!formData.get("name")) {
  //   throw Error("Invalid form input");
  // }

  // // get user
  // const session = await getSession();

  // if (!session) {
  //   throw Error("Not authenticated");
  // }

  // const userId = session.user.id;

  // // create merchant
  // await createMerchant({
  //   name: formData.get("name"),
  //   ownerId: userId,
  // });

  // return null;
}
