<script lang="ts">
  import { LL, locale } from "$i18n/i18n-svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import { gotoUsers, parseUsernames } from "./search-form-utils";

  interface Props {
    username?: string | null | undefined;
  }
  let { username }: Props = $props();
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    const usernames = parseUsernames(e.currentTarget);
    gotoUsers(usernames, $locale);
  }}
>
  <label class="block text-sm select-none" for="nickname">{$LL.searchForm.label()}</label>
  <div class="flex gap-1">
    <Input
      id="nickname"
      type="search"
      autocomplete="username"
      name="username"
      placeholder={$LL.searchForm.placeholder()}
      value={username}
    />
    <Button>{$LL.searchForm.search()}</Button>
  </div>
</form>
