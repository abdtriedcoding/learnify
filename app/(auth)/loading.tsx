import { Loader } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="min-h-screen items-center justify-center flex">
      <Loader className="w-5 h-5 animate-spin" />
    </div>
  );
}
