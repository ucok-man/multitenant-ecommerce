import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import { ReactNode } from "react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import SearchFilter from "./_components/search-filter";

type Props = {
  children: ReactNode;
};

export default async function StoreLayout({ children }: Props) {
  const payload = await getPayload({
    config: payloadConfig,
  });

  const categories = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false, // load all
    where: {
      parent: {
        exists: false,
      },
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilter categories={categories.docs} />
      <div className="grow bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}
