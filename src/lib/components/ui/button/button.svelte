<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { button, type ButtonVariants } from "./button";

  type Props = ButtonVariants & HTMLButtonAttributes;
  let { size, rounded, variant, class: className, children, ...rest }: Props = $props();
</script>

<button class={cn(button({ size, rounded, variant }), className)} {...rest}
  >{@render children?.()}</button
>
