import { Compass, Layout, List, BarChart } from "lucide-react";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";

export const course_categories = [
  {
    value: "computerscience",
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

export const guestRoutes = [
  {
    icon: Compass,
    label: "Browse",
    href: "/",
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
];

export const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];
