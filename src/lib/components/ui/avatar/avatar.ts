import { tv, type VariantProps } from "tailwind-variants";

export type AvatarVariants = VariantProps<typeof avatar>;
export const avatar = tv({
  base: "select-none overflow-hidden object-cover",
  variants: {
    size: {
      xs: "w-4 h-4",
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-10 h-10",
      xl: "w-12 h-12",
    },
    rounded: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    size: "md",
    rounded: "full",
  },
});
