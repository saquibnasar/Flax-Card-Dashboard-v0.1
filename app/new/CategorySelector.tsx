"use client";

import classNames from "classnames";
import { useState } from "react";

interface Props {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategorySelector = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}: Props) => {
  return (
    <div className="space-y-5 my-3">
      <div className="flex flex-wrap gap-1">
        {categories.map((item) => (
          <span
            key={item}
            onClick={() => setSelectedCategory(item)}
            className={classNames({
              "active:scale-[0.95] text-xs hover:scale-[0.99] transition-all duration-150 ease-linear cursor-pointer border border-dPrimary px-3 py-2 rounded-full":
                true,
              "bg-blue text-white": selectedCategory === item,
            })}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
