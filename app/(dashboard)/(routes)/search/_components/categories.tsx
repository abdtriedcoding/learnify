"use client";

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import CategoryItem from "./category-item";

const course_categories = [
  {
    value: "computer Science",
    label: "Computer Science",
    icon: FcMultipleDevices,
  },
  {
    value: "music",
    label: "Music",
    icon: FcMusic,
  },
  {
    value: "fitness",
    label: "Fitness",
    icon: FcSportsMode,
  },
  {
    value: "photography",
    label: "Photography",
    icon: FcOldTimeCamera,
  },
  {
    value: "accounting",
    label: "Accounting",
    icon: FcSalesPerformance,
  },
  {
    value: "engineering",
    label: "Engineering",
    icon: FcEngineering,
  },
  {
    value: "filming",
    label: "Filming",
    icon: FcFilmReel,
  },
];

const Categories = () => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {course_categories.map((item, index) => (
        <CategoryItem
          key={index}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Categories;
