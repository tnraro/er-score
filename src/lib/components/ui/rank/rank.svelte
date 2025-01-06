<script lang="ts" module>
  import { MatchingMode } from "$lib/er-score";
  import { tv, type VariantProps } from "tailwind-variants";

  export type RankVariants = VariantProps<typeof style>;
  export const style = tv({
    base: "w-8 text-right text-sm",
    variants: {
      variant: {
        best: "text-yellow-500",
        high: "text-blue-500",
        md: "",
        low: "text-zinc-400",
      },
      align: {
        right: "text-right",
        center: "text-center",
      },
    },
    defaultVariants: {
      variant: "low",
      align: "right",
    },
  });
</script>

<script lang="ts">
  type Props = { rank: number; mode: MatchingMode; class?: string } & RankVariants;
  let { rank: value, mode, class: className }: Props = $props();

  let variant: RankVariants["variant"] = $derived.by(() => {
    if (mode === MatchingMode.Cobalt) {
      switch (value) {
        case 1:
          return "best";
        default:
          return "low";
      }
    }
    switch (value) {
      case 1:
        return "best";
      case 2:
      case 3:
        return "high";
      case 4:
      case 5:
        return "md";
      default:
        return "low";
    }
  });
  let align: RankVariants["align"] = $derived.by(() => {
    if (mode === MatchingMode.Cobalt) return "center";
  });
  let text = $derived.by(() => {
    if (mode === MatchingMode.Cobalt) return value === 1 ? "승" : "패";
    return `${value}위`;
  });
</script>

<div class={style({ variant, align, className })}>
  {text}
</div>
