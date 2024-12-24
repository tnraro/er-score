import { tv, type VariantProps } from "tailwind-variants";

export type KadVariants = VariantProps<typeof kad>;
export const kad = tv({
  slots: {
    base: "flex gap-x-2 text-sm",
    value: "w-4 text-center overflow-hidden",
    delimiter: "text-zinc-300 select-none",
  },
});
