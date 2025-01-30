import { LoaderCircle } from "lucide-react";

export function Loading() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-4 bg-sky-400">
      <h1 className="text-black text-2xl font-bold text-center">Loading...</h1>
      <LoaderCircle className="animate-spin" />
    </div>
  )
}