import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "Learnify",
  description = "Learnify is an online learning and teaching marketplace with over 213,000 courses and 62 million students. Learn programming, marketing, data science and more.",
  image = "/thumbnail.png",
  url = "https://learnifyy.vercel.app",
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s - ${title}`,
    },
    metadataBase: new URL(url),
    description: description,
    keywords: [
      "Online learning",
      "Online courses",
      "E-learning platform",
      "Online teaching marketplace",
      "Learn new skills",
      "Online education",
    ],
    authors: [
      {
        name: "abdtriedcoding",
        url: "https://abdullahsidd.vercel.app",
      },
    ],
    creator: "abdtriedcoding",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: url,
      title: title,
      description: description,
      siteName: title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [image],
      creator: "@abdtriedcoding",
    },
    icons: {
      icon: "/favicon.png",
    },
  };
}
