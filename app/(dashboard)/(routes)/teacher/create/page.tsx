'use client'

import * as z from 'zod'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCourse } from '@/app/actions/createCourse'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const FormSchema = z.object({
  title: z.string().trim().min(1, {
    message: 'Title is required',
  }),
})

const CreatePage = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await createCourse(data)
    router.push(`/teacher/courses/${response?.id}`)
    toast.success('Course created')
    form.reset()
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col p-4 py-28">
      <h1 className="text-2xl">Name your course</h1>
      <p className="text-sm text-slate-600">
        What would you like to name your course? Don&apos;t worry, you can
        change this later.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'Advanced web development'"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What will you teach in this course?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: 'secondary' }))}
            >
              Cancel
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreatePage
