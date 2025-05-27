import { Category } from "@/payload-types";
import Categories from "./categories";
import CategoriesMobile from "./categories-mobile";
import SearchInput from "./search-input";

type Props = {
  categories: Category[];
};

export default function SearchFilter({ categories }: Props) {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex lg:flex-col gap-4 w-full">
      <SearchInput disabled={false} />
      <CategoriesMobile className="block lg:hidden" categories={categories} />
      <Categories className="hidden lg:block" categories={categories} />
    </div>
  );
}
