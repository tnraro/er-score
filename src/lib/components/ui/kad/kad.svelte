<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { kad } from "./kad";

  interface Props {
    k: number | string;
    a: number | string;
    d: number | string;
    class?: string;
    valueStyle?: string;
  }
  let { k, a, d, class: className, valueStyle, ...rest }: Props = $props();

  const { base, value, delimiter } = kad();
</script>

<div class={cn(base(), className)} {...rest}>
  <div class={cn(value(), valueStyle)}>{k}</div>
  <div class={delimiter()}>{"/"}</div>
  <div class={cn(value(), valueStyle)}>{a}</div>
  <div class={delimiter()}>{"/"}</div>
  <div class={cn(value(), valueStyle)}>{d}</div>
</div>
