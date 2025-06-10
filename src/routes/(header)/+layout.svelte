<script lang="ts">
  import LL, { locale } from "$i18n/i18n-svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import { gotoUsers, parseUsernames } from "$lib/components/ui/search-form/search-form-utils";

  let { children } = $props();
</script>

<div class="bg-white">
  <header class="container mx-auto mb-8 flex items-center justify-between p-2">
    <h1>
      <a href="/">er score</a>
    </h1>

    <nav>
      <ul>
        <li><a href="/stats/characters">실험체 통계</a></li>
      </ul>
    </nav>

    <form
      class="flex gap-1"
      onsubmit={(e) => {
        e.preventDefault();
        const usernames = parseUsernames(e.currentTarget);
        gotoUsers(usernames, $locale);
      }}
    >
      <Input
        id="nickname"
        type="search"
        autocomplete="username"
        name="username"
        placeholder={$LL.searchForm.placeholder()}
        class="w-40"
        size="sm"
      />
      <Button size="sm">{$LL.searchForm.search()}</Button>
    </form>
  </header>
</div>
{@render children()}
