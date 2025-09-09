<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import { getTier } from "./tier";

  interface Props {
    rp: number;
  }
  let { rp }: Props = $props();
  let tier = $derived(getTier(rp));
  let tierName = $derived($LL.tier[tier.name as "Diamond"]());
</script>

<div
  class="relative w-max overflow-hidden rounded-sm border border-[currentcolor] px-1 break-keep whitespace-nowrap"
  style="color: {tier.fg}; background: {tier.bg};"
  title="{tierName}{tier.step} {tier.reminder}RP"
>
  <div class="pointer-events-none absolute top-0 right-0 bottom-0 left-0">
    <div
      class="h-full opacity-30"
      style="background: {tier.fg}; width: {Math.round((tier.reminder / tier.size) * 100)}%"
    ></div>
  </div>
  {tierName.slice(0, 1)}{tier.step}
</div>
