'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/format'
import { type Course } from '@prisma/client'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <div
          className="flex w-fit cursor-pointer items-center hover:text-slate-800"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <div
          className="flex w-fit cursor-pointer items-center hover:text-slate-800"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price') || '0')
      return <div>{formatPrice(price)}</div>
    },
  },
  {
    accessorKey: 'isPublished',
    header: ({ column }) => {
      return (
        <div
          className="flex w-fit cursor-pointer items-center hover:text-slate-800"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
    cell: ({ row }) => {
      const isPublished = row.getValue('isPublished') || false

      return (
        <Badge className={cn('bg-slate-500', isPublished && 'bg-sky-700')}>
          {isPublished ? 'Published' : 'Draft'}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
