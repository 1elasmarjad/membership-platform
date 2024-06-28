import MerchantForm from "../_components/create-merchant";

export const metadata = {
  title: "Join Today",
};

export default async function CreateMerchant() {
  return (
    <div className="flex w-full max-w-2xl bg-blue-200 p-4 rounded">
      <MerchantForm />
    </div>
  );
}
