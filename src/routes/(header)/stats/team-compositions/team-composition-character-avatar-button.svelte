<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import { cnBase } from "tailwind-variants";

  interface Props {
    active?: boolean;
    characterId: number;
  }
  let { active, characterId }: Props = $props();
</script>

<Button
  variant="secondary"
  class={cnBase("size-8", {
    "bg-yellow-300 hover:bg-yellow-400 active:[&>img]:opacity-80": active,
    "active:bg-yellow-500 hover:[&>img]:opacity-90": !active,
  })}
  onclick={() => {
    const params = new URLSearchParams(location.search);
    const id = characterId as unknown as string;
    if (active) {
      params.delete("character", id);
    } else {
      params.append("character", id);
    }
    goto(`?${params.toString()}`);
  }}
>
  <CharacterAvatar {characterId} rounded="md" />
</Button>
