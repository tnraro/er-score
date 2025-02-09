<script lang="ts">
  import { page } from "$app/state";
  import LL from "$i18n/i18n-svelte";
  import type { Translation } from "$i18n/i18n-types";
  import SearchForm from "$lib/components/ui/search-form/search-form.svelte";
  let message = $derived(
    $LL.status[page.status as unknown as keyof Translation["status"]]?.() ?? page.error?.message,
  );
</script>

<div class="grid h-dvh place-items-center">
  <div class="flex flex-col gap-4">
    <SearchForm username={page.params.username} />
    <div>{message}</div>
  </div>
</div>
