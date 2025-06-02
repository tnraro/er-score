<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import PrimitiveBadge from "./primitive-badge.svelte";
  let { killed } = $props();
</script>

<PrimitiveBadge
  show={killed}
  class="bg-green-300"
  description={$LL.userRecords.isWickelineKilled()}
/>
