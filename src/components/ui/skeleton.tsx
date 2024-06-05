import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse bg-gray-300 dark:bg-gray-800", className)}
      {...props}
    />
  )
}

export { Skeleton }
