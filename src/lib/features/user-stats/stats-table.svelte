<script lang="ts">
  import type { Snippet } from "svelte";
  import { style } from "./stats-style";

  interface Props {
    children: Snippet;
  }
  let { children }: Props = $props();
</script>

<table class="border-separate border-spacing-x-4 border-spacing-y-2">
  <thead class="select-none">
    <tr class={style().tableRow()}>
      <th>횟수</th>
      <th></th>
      <th>점수</th>
      <th>기복</th>
      <th>반타작률</th>
      <th>평균 딜</th>
    </tr>
  </thead>
  <tbody>
    {@render children()}
  </tbody>
</table>
