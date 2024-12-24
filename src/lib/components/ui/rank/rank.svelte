<script lang="ts">
  import { MatchingMode } from "$lib/er-score";
  import { cn } from "$lib/utils/cn";
  import { rank, type RankVariants } from "./rank";

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

<div
  class={cn(
    rank({
      variant,
      align,
    }),
    className,
  )}
>
  {text}
</div>
