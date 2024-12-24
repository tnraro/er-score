<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";

  interface Props {
    username?: String;
  }
  let { username }: Props = $props();
</script>

<form method="post" action="/">
  <label class="block text-sm select-none" for="nickname">닉네임</label>
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
