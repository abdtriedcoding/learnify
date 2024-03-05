"use client";

import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { Chapter } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
  items: Chapter[];
  onEdit: (id: string) => void;
}

const ChaptersList = ({ items, onEdit }: ChaptersListProps) => {
  return (
    <div>
      {items.map((chapter) => (
        <div
          key={chapter.id}
          className={cn(
            "flex items-center bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm p-3",
            chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
          )}
        >
          {chapter.title}
          <div className="ml-auto flex items-center gap-x-2">
            {chapter.isFree && <Badge>Free</Badge>}
            <Badge
              className={cn(
                "bg-slate-500",
                chapter.isPublished && "bg-sky-700"
              )}
            >
              {chapter.isPublished ? "Published" : "Draft"}
            </Badge>
            <Pencil
              onClick={() => onEdit(chapter.id)}
              className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChaptersList;
