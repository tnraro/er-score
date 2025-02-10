<script lang="ts" module>
  import { clsx } from "clsx";
  import type { HTMLImgAttributes } from "svelte/elements";
  import { tv, type VariantProps } from "tailwind-variants";

  const style = tv({
    base: "select-none overflow-hidden object-cover flex-none",
    variants: {
      size: {
        xs: "w-4 h-4 min-w-4",
        sm: "w-6 h-6 min-w-6",
        md: "w-8 h-8 min-w-8",
        lg: "w-10 h-10 min-w-10",
        xl: "w-12 h-12 min-w-12",
      },
      rounded: {
        none: "",
        xs: "rounded-xs",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      placeholder: {
        true: "bg-gray-100",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "full",
      placeholder: false,
    },
  });
</script>

<script lang="ts">
  type Props = VariantProps<typeof style> & HTMLImgAttributes;
  let { size, rounded, class: className, children, src, ...rest }: Props = $props();
</script>

{#if src != null}
  <img class={style({ size, rounded, class: clsx(className) })} {src} {...rest} />
{:else}
  <div class={style({ size, rounded, class: clsx(className), placeholder: true })}></div>
{/if}
