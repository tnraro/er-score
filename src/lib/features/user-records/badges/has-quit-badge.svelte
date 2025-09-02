<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import PrimitiveBadge from "./primitive-badge.svelte";
  let { quitted } = $props();
</script>

<PrimitiveBadge show={quitted} class="bg-red-800" description={$LL.userRecords.hasQuit()} />
