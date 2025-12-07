import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // ECOBA Custom Variants
        gold: "border-transparent bg-ecoba-gold/15 text-ecoba-gold border-ecoba-gold/30",
        green: "border-transparent bg-ecoba-green/10 text-ecoba-green border-ecoba-green/20",
        remote: "border-transparent bg-blue-100 text-blue-700 border-blue-200",
        fulltime: "border-transparent bg-emerald-100 text-emerald-700 border-emerald-200",
        parttime: "border-transparent bg-amber-100 text-amber-700 border-amber-200",
        contract: "border-transparent bg-purple-100 text-purple-700 border-purple-200",
        internship: "border-transparent bg-pink-100 text-pink-700 border-pink-200",
        pending: "border-transparent bg-yellow-100 text-yellow-800 border-yellow-200",
        approved: "border-transparent bg-green-100 text-green-800 border-green-200",
        rejected: "border-transparent bg-red-100 text-red-800 border-red-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
