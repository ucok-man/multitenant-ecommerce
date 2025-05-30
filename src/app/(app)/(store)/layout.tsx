import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { ReactNode } from "react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import SearchFilter from "./_components/search-filter";

type Props = {
  children: ReactNode;
};

export default async function StoreLayout({ children }: Props) {
  prefetch(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrateClient>
        <SearchFilter />
      </HydrateClient>
      <div className="grow bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}
