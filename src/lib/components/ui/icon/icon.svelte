<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";

  type Props = {
    as: "arrow-big-up" | "minus" | "ellipsis-vertical";
    size?: number;
    class?: string;
    children?: never;
  } & SvelteHTMLElements["svg"];
  let { as, size = 24, class: className }: Props = $props();
</script>

<svg class="lucide lucide-{as} {className}" viewBox="0 0 24 24" width={size} height={size}>
  <use href="/icons.svg#{as}" />
</svg>

<style>
  :global(:where(.lucide)) {
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
