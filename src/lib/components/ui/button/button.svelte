<script lang="ts" module>
  import { clsx } from "clsx";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { tv, type VariantProps } from "tailwind-variants";

  const style = tv({
    base: "select-none font-medium inline-flex justify-center items-center gap-x-1 disabled:cursor-not-allowed",
    variants: {
      variant: {
        primary:
          "bg-zinc-900 text-white active:bg-zinc-800 shadow-xs disabled:bg-zinc-300 disabled:text-zinc-500",
        secondary: "bg-zinc-100 active:bg-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-500",
      },
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
      variant: "primary",
      size: "md",
      rounded: "md",
    },
  });
</script>

<script lang="ts">
  type Props = VariantProps<typeof style> & HTMLButtonAttributes;
  let { size, rounded, variant, class: className, children, ...rest }: Props = $props();
</script>

<button class={style({ size, rounded, variant, class: clsx(className) })} {...rest}
  >{@render children?.()}</button
>
