import { createAllMerchantData } from "~/server/actions";
import { getServerAuthSession } from "~/server/auth";

export default async function MerchantForm() {
  const session = await getServerAuthSession();
  console.log(session?.user.id)

  return (
    <form
      action={createAllMerchantData}
      className="flex flex-col gap-6"
    >
      <label className="flex flex-col">
        Name
        <input type="text" id="name" name="name" />
      </label>

      <button type="submit">Create Merchant</button>
    </form>
  );
}
