import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        // Solid primary badge
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        // Neutral/tag style
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        // Subtle status badges using theme tokens (accessible in light/dark)
        success:
          "bg-success/12 border-success/50 text-success dark:bg-success/20 dark:border-success/30 dark:text-success",
        warning:
          "bg-warning/12 border-warning/50 text-warning dark:bg-warning/20 dark:border-warning/30 dark:text-warning",
        info:
          "bg-info/12 border-info/50 text-info dark:bg-info/20 dark:border-info/30 dark:text-info",
        destructive:
          "bg-destructive/12 border-destructive/50 text-destructive dark:bg-destructive/20 dark:border-destructive/30 dark:text-destructive",
        muted:
          "bg-muted/25 text-muted-foreground border-border/50 dark:bg-muted/60 dark:text-foreground/80 dark:border-border/30",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
