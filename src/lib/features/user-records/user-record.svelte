<script lang="ts" module>
  import type { SvelteHTMLElements } from "svelte/elements";
  import { tv, type VariantProps } from "tailwind-variants";

  const style = tv({
    base: "flex items-center gap-x-4 rounded-md",
    variants: {
      highlight: {
        true: "bg-yellow-50",
      },
    },
    defaultVariants: {
      highlight: false,
    },
  });
</script>

<script lang="ts">
  type Props = { class?: string } & VariantProps<typeof style> & SvelteHTMLElements["div"];
  let { highlight, children, class: className, ...rest }: Props = $props();
</script>

<div class={style({ highlight, className })} {...rest}>
  {@render children?.()}
</div>
