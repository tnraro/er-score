<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { score } from "./score";

  interface Props {
    score: number;
    class?: string;
  }
  let { score: value, class: className, ...rest }: Props = $props();
</script>

<div class={cn(score({ score: value >= 0.95 ? 1 : value < 0 ? -1 : 0 }), className)} {...rest}>
  {value.toFixed(1)}
</div>
