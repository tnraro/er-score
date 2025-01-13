<script lang="ts" module>
  import { getContext } from "svelte";
  import { tv, type VariantProps } from "tailwind-variants";

  const style = tv({
    base: "h-full",
    variants: {
      color: {
        red: "bg-red-500",
        blue: "bg-blue-500",
        zinc: "bg-zinc-900",
        yellow: "bg-yellow-500",
        green: "bg-green-500",
      },
    },
    defaultVariants: {
      color: "zinc",
    },
  });
</script>

<script lang="ts">
  type Props = { class?: string } & VariantProps<typeof style>;
  let { color, class: className }: Props = $props();

  const tFn = getContext<(() => number) | undefined>("progress__t");

  let t = $derived(tFn?.() ?? 0);
</script>

<div class={style({ color, className })} style:width="{100 * t}%"></div>
