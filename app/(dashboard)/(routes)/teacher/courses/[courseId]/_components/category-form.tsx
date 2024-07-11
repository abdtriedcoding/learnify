'use client'

import { z } from 'zod'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { course_categories } from '@/constants/index'
import { type CategoryFormProps } from '@/types/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateCourse } from '@/app/actions/updateCourse'
import { Pencil, CheckIcon, ChevronDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  category: z.string({
    required_error: 'Please select a category.',
  }),
})

const CategoryForm = ({ initialData, courseId }: CategoryFormProps) => {
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: initialData.category ?? '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await updateCourse(data, courseId)
    toast.success('Course updated')
    toggleEdit()
    router.refresh()
  }

  return (
    <div className="rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course category
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            'pt-2 text-sm',
            !initialData.category && 'italic text-slate-500'
          )}
        >
          {initialData.category ?? 'No category'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? course_categories.find(
                                (category) => category.label === field.value
                              )?.label
                            : 'Select category...'}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search category..."
                            className="h-9"
                          />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {course_categories.map((category) => (
                              <CommandItem
                                value={category.label}
                                key={category.label}
                                onSelect={() => {
                                  form.setValue('category', category.label)
                                  form.clearErrors('category')
                                  setOpen(false)
                                }}
                              >
                                {category.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    field.value === category.label
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!form.getValues('category') || !isValid || isSubmitting}
              type="submit"
            >
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default CategoryForm
