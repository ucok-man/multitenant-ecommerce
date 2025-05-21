import { Category } from "@/payload-types";
import Categories from "./categories";
import SearchInput from "./search-input";

type Props = {
  categories: Category[];
};

export default function SearchFilter({ categories }: Props) {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput disabled={false} />
      <Categories categories={categories} />
    </div>
  );
}
