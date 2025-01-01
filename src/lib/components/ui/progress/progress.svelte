<script module>
  import { clamp, lerp } from "$lib/utils/math";
  import { setContext, type Snippet } from "svelte";
  import { tv, type VariantProps } from "tailwind-variants";

  const style = tv({
    base: "flex w-full min-w-0 overflow-hidden",
    variants: {
      size: {
        1: "h-1",
      },
      color: {
        zinc: "bg-zinc-100",
        transparent: "",
      },
    },
    defaultVariants: {
      size: 1,
      color: "zinc",
    },
  });
</script>

<script lang="ts">
  type Props = {
    value: number;
    min?: number;
    max?: number;
    class?: string;
    children?: Snippet;
  } & VariantProps<typeof style>;
  let { value, min = 0, max = 100, color, size, class: className, children }: Props = $props();
  let t = $derived(clamp(lerp(value, min, max), 0, 1));
  setContext("progress__t", () => t);
</script>

<div class={style({ color, size, className })}>
  {@render children?.()}
</div>
