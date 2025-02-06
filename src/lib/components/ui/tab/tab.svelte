<script lang="ts" module>
  import { clsx } from "clsx";
  import type { Snippet } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";
  import { tv } from "tailwind-variants";

  const style = tv({});
</script>

<script lang="ts" generics="T extends string | number">
  type Props = {
    items: T[];
    renderItem?: Snippet<[T, boolean]>;
    value?: T;
    onchange?: (value: T) => void;
  } & SvelteHTMLElements["div"];
  let {
    items,
    renderItem,
    value = $bindable(),
    onchange,
    class: className,
    ...rest
  }: Props = $props();
</script>

<div class={style({ class: clsx(className) })} {...rest}>
  {#each items as item}
    {@const current = item === value}
    <button
      class="cursor-pointer"
      disabled={current}
      onclick={() => {
        value = item;
        onchange?.(item);
      }}>{@render renderItem?.(item, current)}</button
    >
  {/each}
</div>
