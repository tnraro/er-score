<script lang="ts">
  import { env } from "$env/dynamic/public";
  import { StaticData } from "$lib/features/static-data/reactivity.svelte";
  import type { ComponentProps } from "svelte";
  import Avatar from "../avatar/avatar.svelte";

  type Props = {
    characterId: number;
    skin?: number;
  } & ComponentProps<typeof Avatar>;

  let { characterId, skin: skin, src: _src, ...rest }: Props = $props();

  let src = $derived.by(() => {
    const name = StaticData.instance.characters.get(characterId)?.name;
    if (name == null) return null;
    return `${env.PUBLIC_STATIC_URL}/image/character/portrait/${name}_S${skin?.toString().padStart(3, "0") ?? "000"}.webp`;
  });
</script>

<Avatar {src} {...rest} />
