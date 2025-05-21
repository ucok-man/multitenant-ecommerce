import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

type Props = {
  disabled: boolean;
};

export default function SearchInput({ disabled }: Props) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-6 text-neutral-500" />
        <Input
          className="pl-12"
          placeholder="Search products"
          disabled={disabled}
        />
      </div>

      {/* TODO: add categories view all button*/}
      {/* TODO: add library button */}
    </div>
  );
}
