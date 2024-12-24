<script lang="ts">
  import { PUBLIC_STATIC_URL } from "$env/static/public";
  import { globalData } from "$lib/global-state.svelte";
  import type { HTMLImgAttributes } from "svelte/elements";
  import type { AvatarVariants } from "../avatar/avatar";
  import Avatar from "../avatar/avatar.svelte";

  type Props = {
    characterId: number;
    skin?: number;
  } & AvatarVariants &
    HTMLImgAttributes;

  let { characterId, skin: skin, src: _src, ...rest }: Props = $props();

  const { characters } = globalData();

  let src = $derived(
    `${PUBLIC_STATIC_URL}/image/character/portrait/${characters.get(characterId)?.name}_S${skin?.toString().padStart(3, "0") ?? "000"}.webp`,
  );
</script>

<Avatar {src} {...rest} />
