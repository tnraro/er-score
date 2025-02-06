<script lang="ts" module>
  import { clsx } from "clsx";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { tv, type VariantProps } from "tailwind-variants";

  type InputVariants = VariantProps<typeof style>;
  const style = tv({
    base: "border outline-hidden focus:ring-1 focus:ring-gray-900 bg-white",
    variants: {
      size: {
        xs: "h-4 px-1 text-xs",
        sm: "h-6 px-2 text-sm",
        md: "h-8 px-3",
        lg: "h-10 px-4 text-lg",
        xl: "h-12 px-5 text-xl",
      },
      rounded: {
        none: "",
        xs: "rounded-xs",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "md",
    },
  });
</script>

<script lang="ts">
  type Props = InputVariants & HTMLInputAttributes;
  let { size, rounded, class: className, ...rest }: Props = $props();
</script>

<input class={style({ size, rounded, class: clsx(className) })} {...rest} />
