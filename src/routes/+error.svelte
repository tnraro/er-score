<script lang="ts">
  import { page } from "$app/state";
  import SearchForm from "$lib/components/ui/search-form/search-form.svelte";
</script>

<div class="grid h-dvh place-items-center">
  <div class="flex flex-col gap-4">
    <SearchForm username={page.params.username} />
    <div>
      {page.error?.message}
    </div>
  </div>
</div>
