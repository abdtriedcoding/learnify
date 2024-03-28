import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Logo() {
  return (
    <Link href={"/"}>
      <h1
        className={cn(
          "p-4 pl-6 font-semibold text-xl underline text-sky-600",
          font.className
        )}
      >
        Learnifyy
      </h1>
    </Link>
  );
}
