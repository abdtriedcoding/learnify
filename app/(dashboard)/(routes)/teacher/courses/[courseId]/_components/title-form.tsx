'use client'

import { z } from 'zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Pencil } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { type TitleFormProps } from '@/types/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateCourse } from '@/app/actions/updateCourse'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: 'Title is required',
  }),
})

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: initialData.title },
  })

  const { isSubmitting, isValid } = form.formState

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await updateCourse(data, courseId)
    toast.success('Course updated')
    toggleEdit()
    router.refresh()
    form.reset()
  }

  return (
    <div className="rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course title
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="pt-2 text-sm">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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

export default TitleForm
