<script lang="ts" module>
  import { clsx } from "clsx";
  import type { SvelteHTMLElements } from "svelte/elements";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "flex items-center gap-1",
    variants: {
      sign: {
        [1]: "text-green-600 before:content-['▲'] before:text-[0.75em]",
        [0]: "text-gray-600 before:content-['〓'] before:text-[0.75em]",
        [-1]: "text-red-600 before:content-['▼'] before:text-[0.75em]",
      },
    },
  });
</script>

<script lang="ts">
  type Props = SvelteHTMLElements["div"] & { value: number; children?: never };
  let { value, class: className, ...rest }: Props = $props();
</script>

<div class={style({ sign: Math.sign(value) as 0 | 1 | -1, class: clsx(className) })} {...rest}>
  {Math.abs(value)}
</div>
