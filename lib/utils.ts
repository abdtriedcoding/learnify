import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "Learnify",
  description = "Empowering education on an intuitive platform, seamlessly sign up, purchase courses, and sell your content. User-friendly dashboards for tracking progress and income, making learning and teaching a breeze!",
  image = "/thumbnail.png",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@abdtriedcoding",
    },
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
