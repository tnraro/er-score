<script lang="ts" module>
  const style = tv({
    base: "inline-block h-2 w-2 shrink-0 rounded-full",
  });
</script>

<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";
  import { tv } from "tailwind-variants";
  type Props = {
    class?: string;
  } & SvelteHTMLElements["span"];

  let { class: className, children, ...rest }: Props = $props();
</script>

<span class={style({ className })} {...rest}>{@render children?.()}</span>
