<script lang="ts" module>
  import { clsx } from "clsx";
  import type { SvelteHTMLElements } from "svelte/elements";
  import { tv, type VariantProps } from "tailwind-variants";

  const style = tv({
    base: "w-4 text-center overflow-hidden",
    variants: {
      bold: {
        true: "font-bold",
      },
    },
    defaultVariants: {
      bold: false,
    },
  });
</script>

<script lang="ts">
  type Props = VariantProps<typeof style> & SvelteHTMLElements["div"];
  let { children, bold, class: className, ...rest }: Props = $props();
</script>

<div class={style({ bold, class: clsx(className) })} {...rest}>
  {@render children?.()}
</div>
