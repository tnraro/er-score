<script lang="ts">
  import { env } from "$env/dynamic/public";
  import { globalData } from "$lib/global-state.svelte";
  import type { ComponentProps } from "svelte";
  import Avatar from "../avatar/avatar.svelte";

  type Props = {
    characterId: number;
    skin?: number;
  } & ComponentProps<typeof Avatar>;

  let { characterId, skin: skin, src: _src, ...rest }: Props = $props();

  const { characters } = globalData();

  let src = $derived(
    `${env.PUBLIC_STATIC_URL}/image/character/portrait/${characters.get(characterId)?.name}_S${skin?.toString().padStart(3, "0") ?? "000"}.webp`,
  );
</script>

<Avatar {src} {...rest} />
