"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/modules/categories/types";
import { ListFilter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CategoryDropdown from "./category-dropdown";
import CategorySidebar from "./category-sidebar";

type Props = {
  categories: Category[];
  className?: string;
};

export default function Categories({ categories, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(categories.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = "all";

  const activeCategoryIndex = categories.findIndex(
    (c) => c.slug === activeCategory
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current) {
        return;
      }

      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);
      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width;
        if (totalWidth + width > availableWidth) break;
        totalWidth += width;
        visible++;
      }

      setVisibleCount(visible);
    };

    const observerTarget = containerRef.current;
    if (!observerTarget) return;

    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(observerTarget);

    // Initial calculation
    calculateVisible();

    return () => {
      resizeObserver.unobserve(observerTarget);
      resizeObserver.disconnect();
    };
  }, [categories.length]);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Hidden div to meassure category items */}
      <div
        ref={measureRef}
        className="fixed top-0 left-0 flex opacity-0 pointer-events-none h-1 w-full"
      >
        {categories.map((category) => (
          <CategoryDropdown
            key={category.id}
            category={category}
            isActive={false}
            isNavigationHovered={false}
          />
        ))}
      </div>

      {/* Category menu items */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center w-full"
      >
        {categories.slice(0, visibleCount).map((category) => (
          <CategoryDropdown
            key={category.id}
            category={category}
            isActive={activeCategory === category.slug}
            isNavigationHovered={isAnyHovered}
          />
        ))}

        {/* View All Button */}
        <div ref={viewAllRef} className="shrink-0">
          <Button
            onClick={() => setIsSidebarOpen(true)}
            className={cn(
              "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
              isActiveCategoryHidden &&
                !isAnyHovered &&
                "bg-white border-primary"
            )}
          >
            View All <ListFilter className="ml-2" />
          </Button>
        </div>
      </div>

      <CategorySidebar
        categories={categories}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
    </div>
  );
}
