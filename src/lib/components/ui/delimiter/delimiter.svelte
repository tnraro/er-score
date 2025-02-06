<script lang="ts" module>
  import { clsx } from "clsx";
  import type { SvelteHTMLElements } from "svelte/elements";
  import { tv } from "tailwind-variants";

  const style = tv({
    base: "text-gray-300 select-none",
  });
</script>

<script lang="ts">
  type Props = SvelteHTMLElements["div"];
  let { children, class: className, ...rest }: Props = $props();
</script>

<div class={style({ class: clsx(className) })} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    {"/"}
  {/if}
</div>
