"use client";

import { Button } from "@/components/ui/button";
import { useFloatPosition } from "@/hooks/use-float-position";
import { cn } from "@/lib/utils";
import { Category } from "@/modules/categories/types";
import Link from "next/link";
import { useRef, useState } from "react";

type Props = {
  category: Category;
  isActive: boolean;
  isNavigationHovered: boolean;
};

export default function CategoryDropdown(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const position = useFloatPosition(dropdownRef, 240, 16);

  const subcategories = props.category.subcategories?.docs as
    | Category[]
    | undefined;

  const handleMouseEnter = () => {
    if (subcategories && subcategories.length) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isOpen) setIsOpen(false);
  };

  const handleClick = () => {
    if (props.category.subcategories?.docs?.length) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="relative">
        <Button
          variant={"elevated"}
          className={cn(
            "h-11 px-4 bg-white transition-all border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            props.isActive &&
              !props.isNavigationHovered &&
              "bg-white border-primary",
            isOpen && "bg-white border-primary"
          )}
        >
          {props.category.name}
        </Button>

        {subcategories && subcategories.length > 0 && (
          <>
            <div
              className={cn(
                "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
                isOpen && "opacity-100"
              )}
            />

            {isOpen && (
              <div
                style={{
                  top: position.top,
                  left: position.left,
                }}
                className="fixed z-100"
              >
                {/* invisible bridge to maintain hover */}
                <div className="h-3 w-60" />
                <div
                  style={{
                    backgroundColor: props.category.color || "#F5F5F5",
                  }}
                  className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px] -translate-x-[2px] "
                >
                  <div>
                    {subcategories.map((sub) => (
                      <Link
                        className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium underline-offset-4"
                        key={sub.id}
                        href={`/${props.category.slug}/${sub.slug}`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
