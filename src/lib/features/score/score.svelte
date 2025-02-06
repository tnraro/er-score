<script lang="ts" module>
  import { tv, type VariantProps } from "tailwind-variants";

  export type ScoreVariants = VariantProps<typeof style>;
  export const style = tv({
    base: "w-10 inline-flex items-center justify-center rounded-full px-1 text-center font-extrabold",
    variants: {
      score: {
        [1]: "bg-green-200/50 text-green-900",
        [0]: "bg-gray-200/50 text-gray-900",
        [-1]: "bg-red-200/50 text-red-900",
      },
    },
    defaultVariants: {
      score: 0,
    },
  });
</script>

<script lang="ts">
  interface Props {
    score?: number;
    class?: string;
  }
  let { score: value, class: className, ...rest }: Props = $props();

  function score() {
    if (value == null) return 0;
    if (value >= 0.95) return 1;
    if (value < 0) return -1;
    return 0;
  }
</script>

<div class={style({ score: score(), className })} {...rest}>
  {value?.toFixed(1) ?? "‍"}
</div>
