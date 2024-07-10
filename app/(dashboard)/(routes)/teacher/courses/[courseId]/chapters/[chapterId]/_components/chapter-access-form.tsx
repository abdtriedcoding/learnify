'use client'

import * as z from 'zod'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Pencil } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChapterAccessFormProps } from '@/types/index'
import { updateChapter } from '@/app/actions/updateChapter'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/ui/form'

const formSchema = z.object({
  isFree: z.boolean().default(false),
})

const ChapterAccessForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterAccessFormProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree,
    },
  })

  const { isSubmitting, isValid } = form.formState

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await updateChapter(data, courseId, chapterId)
    toast.success('Course updated')
    toggleEdit()
    router.refresh()
    form.reset()
  }

  return (
    <div className="rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter access
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit access
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            'pt-2 text-sm',
            !initialData.isFree && 'italic text-slate-500'
          )}
        >
          {initialData.isFree
            ? 'This chapter is free for preview.'
            : 'This chapter is not free.'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this box if you want to make this chapter free for
                      preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default ChapterAccessForm
