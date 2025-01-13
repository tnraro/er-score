<script lang="ts">
  import { goto } from "$app/navigation";
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
    goto(`/users/${encodeURIComponent(username)}`);
  }}
>
  <label class="block select-none text-sm" for="nickname">닉네임</label>
  <div class="flex gap-1">
    <Input
      id="nickname"
      type="search"
      autocomplete="username"
      name="username"
      placeholder="닉네임을 입력해주세요"
      value={username}
    />
    <Button>검색</Button>
  </div>
</form>
