<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { input, type InputVariants } from "./input";

  type Props = InputVariants & HTMLInputAttributes;
  let { size, rounded, class: className, ...rest }: Props = $props();
</script>

<input class={cn(input({ size, rounded }), className)} {...rest} />
