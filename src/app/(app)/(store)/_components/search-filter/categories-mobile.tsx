"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import CategorySidebar from "../category-sidebar";

type Props = {
  categories: Category[];
  className?: string;
};

export default function CategoriesMobile({ categories, className }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <CategorySidebar
        categories={categories}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <Button
        onClick={() => setIsSidebarOpen(true)}
        variant={"elevated"}
        className={cn("size-12 shrink-0 flex", className)}
      >
        <ListFilter />
      </Button>
    </>
  );
}
