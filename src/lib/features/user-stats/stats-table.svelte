<script lang="ts">
  import type { Snippet } from "svelte";
  import { LL } from "$i18n/i18n-svelte";
  import { style } from "./stats-style";

  interface Props {
    children: Snippet;
  }
  let { children }: Props = $props();
</script>

<table class="border-separate border-spacing-x-4 border-spacing-y-2">
  <thead class="select-none">
    <tr class={style().tableRow()}>
      <th>{$LL.stats.heading.count()}</th>
      <th></th>
      <th>{$LL.stats.heading.score()}</th>
      <th>{$LL.stats.heading.halfRate()}</th>
      <th>{$LL.stats.heading.averageDamage()}</th>
    </tr>
  </thead>
  <tbody>
    {@render children()}
  </tbody>
</table>
