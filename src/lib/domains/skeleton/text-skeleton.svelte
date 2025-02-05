<script lang="ts" module>
  import { tv, type VariantProps } from "tailwind-variants";

  const style = tv({
    slots: {
      container: "inline-flex w-full",
      text: "rounded-full bg-zinc-100",
    },
    variants: {
      size: {
        sm: { text: "h-3" },
        md: { text: "h-3.5" },
      },
      ch: {
        1: { text: "w-[1ch]" },
        2: { text: "w-[2ch]" },
        3: { text: "w-[3ch]" },
        5: { text: "w-[5ch]" },
        7: { text: "w-[7ch]" },
        11: { text: "w-[11ch]" },
        13: { text: "w-[13ch]" },
        full: { text: "w-full" },
      },
      align: {
        start: { container: "justify-start" },
        center: { container: "justify-center" },
        end: { container: "justify-end" },
      },
    },
    defaultVariants: {
      size: "md",
      ch: "full",
      align: "start",
    },
  });
</script>

<script lang="ts">
  let { size, ch, align }: VariantProps<typeof style> = $props();

  let c = $derived(style({ size, ch, align }));
</script>

<div class={c.container()}>
  <div class={c.text()}></div>
</div>
