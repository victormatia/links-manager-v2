import { Skeleton } from "./ui/skeleton";

export default function EventSkeleton() {
  return (
    <div className='w-full p-1 flex gap-3 border border-[#24382F] items-center'>
      <Skeleton className="w-20 h-20" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>

    </div>
  )
}