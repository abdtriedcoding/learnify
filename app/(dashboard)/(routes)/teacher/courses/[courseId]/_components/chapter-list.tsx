'use client'

import { cn } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { type ChaptersListProps } from '@/types/index'

const ChaptersList = ({ items, onEdit }: ChaptersListProps) => {
  return (
    <div>
      {items.map((chapter) => (
        <div
          key={chapter.id}
          className={cn(
            'mb-4 flex items-center rounded-md border border-slate-200 bg-slate-200 p-3 text-sm text-slate-700',
            chapter.isPublished && 'border-sky-200 bg-sky-100 text-sky-700'
          )}
        >
          {chapter.title}
          <div className="ml-auto flex items-center gap-x-2">
            {chapter.isFree && <Badge>Free</Badge>}
            <Badge
              className={cn(
                'bg-slate-500',
                chapter.isPublished && 'bg-sky-700'
              )}
            >
              {chapter.isPublished ? 'Published' : 'Draft'}
            </Badge>
            <Pencil
              onClick={() => onEdit(chapter.id)}
              className="h-4 w-4 cursor-pointer transition hover:opacity-75"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChaptersList
