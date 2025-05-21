import { Category } from "@/payload-types";
import CategoryDropdown from "./category-dropdown";

type Props = {
  categories: Category[];
};

export default function Categories({ categories }: Props) {
  return (
    <div className="relative w-full flex flex-nowrap items-center">
      {categories.map((category) => (
        <CategoryDropdown
          key={category.id}
          category={category}
          isActive={false}
          isNavigationHovered={false}
        />
      ))}
    </div>
  );
}
