"use client";

import qs from "query-string";
import { cn } from "@/lib/utils";
import { CategoryItemProps } from "@/types/index";
import { course_categories } from "@/constants/index";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Categories = () => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-4 pb-4">
        {course_categories.map((item, index) => (
          <CategoryItem key={index} label={item.label} icon={item.icon} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Categories;

function CategoryItem({ label, icon: Icon }: CategoryItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const currentTitle = searchParams.get("title");
  const isSelected = currentCategory === label;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          category: isSelected ? null : label,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
    >
      <Icon className="w-5 h-5" />
      <div className="truncate">{label}</div>
    </button>
  );
}
