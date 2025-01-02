import { tv, type VariantProps } from "tailwind-variants";

export type ScoreVariants = VariantProps<typeof score>;
export const score = tv({
  base: "w-10 inline-flex items-center justify-center rounded-full px-1 text-center font-extrabold",
  variants: {
    score: {
      [1]: "bg-green-200/50 text-green-900",
      [0]: "bg-zinc-200/50 text-zinc-900",
      [-1]: "bg-red-200/50 text-red-900",
    },
  },
  defaultVariants: {
    score: 0,
  },
});
