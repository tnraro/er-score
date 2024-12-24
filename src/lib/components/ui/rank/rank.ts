import { tv, type VariantProps } from "tailwind-variants";

export type RankVariants = VariantProps<typeof rank>;
export const rank = tv({
  base: "w-8 text-right text-sm",
  variants: {
    variant: {
      best: "text-yellow-500",
      high: "text-blue-500",
      md: "",
      low: "text-zinc-400",
    },
    align: {
      right: "text-right",
      center: "text-center",
    },
  },
  defaultVariants: {
    variant: "low",
    align: "right",
  },
});
