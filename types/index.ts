import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";
import { Chapter, Course } from "@prisma/client";
import { ourFileRouter } from "@/app/api/uploadthing/core";

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

export interface TitleFormProps {
  initialData: Course;
  courseId: string;
}

export interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

export interface CategoryFormProps {
  initialData: Course;
  courseId: string;
}

export interface PriceFormProps {
  initialData: Course;
  courseId: string;
}

export interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

export interface ChaptersListProps {
  items: Chapter[];
  onEdit: (id: string) => void;
}

export interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

export interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export interface ChapterTitleFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

export interface ChapterDescriptionFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

export interface ChapterAccessFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

export interface ChapterVideoFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

export interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export type CourseWithProgress = Course & {
  chapters: { id: string }[];
  purchases?: { id: string }[];
  progress: number | null;
};

export type GetCourses = {
  title?: string;
  category?: string;
};

export type DashboardCourses = {
  completedCourses: CourseWithProgress[];
  coursesInProgress: CourseWithProgress[];
};
