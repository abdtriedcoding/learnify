import { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "SignIn Page",
};

export default function Page() {
  return <SignIn />;
}
