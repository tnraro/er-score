<script lang="ts" module>
  import LL from "$i18n/i18n-svelte";
  import { MatchingMode } from "$lib/features/er-api/shapes";
  import { tv, type VariantProps } from "tailwind-variants";

  export type RankVariants = VariantProps<typeof style>;
  export const style = tv({
    base: "text-right text-sm break-keep whitespace-nowrap",
    variants: {
      variant: {
        best: "text-yellow-500",
        high: "text-blue-500",
        md: "",
        low: "text-gray-400",
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
  let { rank, mode, class: className }: Props = $props();

  let variant: RankVariants["variant"] = $derived.by(() => {
    if (mode === MatchingMode.Cobalt) {
      switch (rank) {
        case 1:
          return "best";
        default:
          return "low";
      }
    }
    switch (rank) {
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
    if (mode === MatchingMode.Cobalt)
      return rank === 1 ? $LL.userRecords.value.win() : $LL.userRecords.value.lose();
    return $LL.userRecords.value.rank({ rank });
  });
</script>

<span class={style({ variant, align, className })}>
  {text}
</span>
