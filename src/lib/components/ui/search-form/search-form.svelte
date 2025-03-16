<script lang="ts">
  import { goto } from "$app/navigation";
  import { LL, locale } from "$i18n/i18n-svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";

  interface Props {
    username?: string | null | undefined;
  }
  let { username }: Props = $props();
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    if (typeof username !== "string") throw new Error("Invalid username");
    const usernames = username
      .trim()
      .split(/\s*,\s*/g)
      .filter((x) => x.length > 0);

    if (usernames.length === 1) {
      goto(`/${$locale}/users/${encodeURIComponent(username)}`);
    } else {
      const sp = new URLSearchParams();
      usernames.forEach((username) => sp.append("u", username));
      goto(`/${$locale}/stats?${sp.toString()}`);
    }
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
