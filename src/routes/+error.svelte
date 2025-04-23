<script lang="ts">
  import { page } from "$app/state";
  import LL from "$i18n/i18n-svelte";
  import type { Translation } from "$i18n/i18n-types";
  import SearchForm from "$lib/components/ui/search-form/search-form.svelte";
  let message = $derived.by(() => {
    if (page.status in $LL.status) {
      return $LL.status[page.status as unknown as keyof Translation["status"]]();
    }
    return page.error?.message;
  });
</script>

<div class="grid h-dvh place-items-center">
  <div class="space-y-8">
    <section>
      <h1 class="text-2xl font-bold">{$LL.error.title()}</h1>
      <p>{message}</p>
    </section>
    <hr />
    <SearchForm username={page.params.username} />
  </div>
</div>
