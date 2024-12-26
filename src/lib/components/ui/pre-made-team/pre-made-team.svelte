<script lang="ts">
  let { preMadeTeam } = $props();
</script>

{#if preMadeTeam && preMadeTeam > 1}
  <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-zinc-300" title="사전구성팀"
  ></span>
{/if}
