<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import PrimitiveBadge from "./primitive-badge.svelte";
  let { preMadeTeam } = $props();
</script>

<PrimitiveBadge
  show={preMadeTeam && preMadeTeam > 1}
  class="bg-gray-300"
  description={$LL.userRecords.preMadeTeamSize({ n: preMadeTeam })}
/>
