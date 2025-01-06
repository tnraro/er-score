<script lang="ts" module>
  import { clsx } from "clsx";
  import { tv } from "tailwind-variants";

  const kad = tv({
    slots: {
      base: "flex gap-x-2 text-sm",
      value: "w-4 text-center overflow-hidden",
      delimiter: "text-zinc-300 select-none",
    },
  });
</script>

<script lang="ts">
  interface Props {
    k: number | string;
    a: number | string;
    d: number | string;
    class?: string;
    valueStyle?: string;
  }
  let { k, a, d, class: className, valueStyle, ...rest }: Props = $props();

  const { base, value, delimiter } = kad();

  let _value = $derived(value({ class: valueStyle }));
  let _delimiter = $derived(delimiter());
</script>

<div class={base({ class: clsx(className) })} {...rest}>
  <div class={_value}>{k}</div>
  <div class={_delimiter}>{"/"}</div>
  <div class={_value}>{a}</div>
  <div class={_delimiter}>{"/"}</div>
  <div class={_value}>{d}</div>
</div>
