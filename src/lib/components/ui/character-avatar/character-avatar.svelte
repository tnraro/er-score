<script lang="ts" module>
  interface Character {
    code: number;
    name: string;
  }
  const characterDataObserver = staticData("Character");
  let characters = $state(new Map<number, Character>());
  characterDataObserver.subscribe((value) => {
    characters = new Map((value as Character[]).map((x) => [x.code, pick(x, ["code", "name"])]));
  });
</script>

<script lang="ts">
  import { env } from "$env/dynamic/public";
  import { staticData } from "$lib/features/static-data/browser";
  import { pick } from "$lib/utils/object/pick";
  import type { ComponentProps } from "svelte";
  import Avatar from "../avatar/avatar.svelte";

  type Props = {
    characterId: number;
    skin?: number;
  } & ComponentProps<typeof Avatar>;

  let { characterId, skin: skin, src: _src, ...rest }: Props = $props();

  let src = $derived.by(() => {
    const name = characters.get(characterId)?.name;
    if (name == null) return null;
    return `${env.PUBLIC_STATIC_URL}/image/character/portrait/${name}_S${skin?.toString().padStart(3, "0") ?? "000"}.webp`;
  });
</script>

<Avatar {src} {...rest} />
