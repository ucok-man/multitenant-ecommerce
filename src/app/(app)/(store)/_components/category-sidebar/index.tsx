"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Category } from "@/payload-types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
};

export default function CategorySidebar({
  open,
  onOpenChange,
  categories,
}: Props) {
  const router = useRouter();

  const [subCategories, setSubCategories] = useState<Category[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const resetState = () => {
    setSubCategories(null);
    setSelectedCategory(null);
  };

  const handleSidebarToggle = (isOpen: boolean) => {
    resetState();
    onOpenChange(isOpen);
  };

  const navigateToCategory = (category: Category) => {
    const parentSlug = selectedCategory?.slug;
    const categorySlug = category.slug;

    if (categorySlug === "all") {
      router.push("/");
    } else if (parentSlug) {
      router.push(`/${parentSlug}/${categorySlug}`);
    } else {
      router.push(`/${categorySlug}`);
    }

    handleSidebarToggle(false);
  };

  const handleCategoryClick = (category: Category) => {
    const subcategories = category.subcategories?.docs;

    const hasSubcategories = subcategories && subcategories.length > 0;

    if (hasSubcategories) {
      setSubCategories(subcategories as Category[]);
      setSelectedCategory(category);
    } else {
      navigateToCategory(category);
    }
  };

  const currentList = subCategories ?? categories;
  const bgcolor = selectedCategory?.color || "white";

  return (
    <Sheet open={open} onOpenChange={handleSidebarToggle}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor: bgcolor }}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center font-semibold text-4xl">
            Categories
          </SheetTitle>
        </SheetHeader>

        <Separator />

        <ScrollArea className="flex flex-col h-full max-h-[80vh] pb-2">
          {subCategories && (
            <button
              onClick={resetState}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-lg font-medium cursor-pointer"
            >
              <ChevronLeft className="size-4 mr-2" /> Back
            </button>
          )}
          {currentList.map((category: Category) => {
            const hasSubcategories = category.subcategories?.docs?.length;

            return (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category)}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-lg font-medium cursor-pointer"
              >
                {category.name}
                {hasSubcategories ? <ChevronRight className="size-4" /> : null}
              </button>
            );
          })}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
