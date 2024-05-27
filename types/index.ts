import { Course } from "@prisma/client";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export interface SidebarContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface HomePageProps {
  searchParams: {
    title: string;
    category: string;
  };
}

export interface CategoryItemProps {
  label: string;
  icon: IconType;
}

export type CourseWithProgress = Course & {
  chapters: { id: string }[];
  progress: number | null;
};

export interface CoursesListProps {
  items: CourseWithProgress[];
}

export interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  blurredImage: string;
  chaptersLength: number;
  price: number;
  category: string;
  progress: number | null;
}

export interface InfoCardProps {
  numberOfItems: number;
  label: string;
  icon: LucideIcon;
}
