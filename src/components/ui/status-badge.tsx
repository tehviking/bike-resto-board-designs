import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-smooth",
  {
    variants: {
      status: {
        "not-started": "bg-status-not-started-bg text-status-not-started",
        "in-progress": "bg-status-in-progress-bg text-status-in-progress",
        "completed": "bg-status-completed-bg text-status-completed",
        "on-hold": "bg-status-on-hold-bg text-status-on-hold",
      },
    },
    defaultVariants: {
      status: "not-started",
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ className, status, children, ...props }, ref) => {
    return (
      <div
        className={cn(statusBadgeVariants({ status, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
StatusBadge.displayName = "StatusBadge"

export { StatusBadge, statusBadgeVariants }