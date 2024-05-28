"use client";

import * as z from "zod";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import ChaptersList from "./chapter-list";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChaptersFormProps } from "@/types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { addChapter } from "@/app/actions/addChapter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().trim().min(1),
});

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await addChapter(data, courseId);
    toggleCreating();
    router.refresh();
    form.reset();
  }

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="relative border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
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
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm pt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {!initialData.chapters.length && "No chapters"}
          {initialData.chapters.length > 0 && (
            <ChaptersList onEdit={onEdit} items={initialData.chapters} />
          )}
        </div>
      )}
    </div>
  );
};

export default ChaptersForm;
