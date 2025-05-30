import { caller } from "@/trpc/server";
import Categories from "./categories";
import CategoriesMobile from "./categories-mobile";
import SearchInput from "./search-input";

export default async function SearchFilter() {
  const categories = await caller.categories.getMany();

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex lg:flex-col gap-4 w-full"
      style={{
        backgroundColor: "#F5F5F5",
      }}
    >
      <SearchInput disabled={false} />
      <CategoriesMobile
        className="block lg:hidden"
        categories={categories.docs}
      />
      <Categories className="hidden lg:block" categories={categories.docs} />
    </div>
  );
}
