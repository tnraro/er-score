<script lang="ts" module>
  const style = tv({
    slots: {
      img: "block h-7 w-12 min-w-12 rounded object-contain p-0.5",
      placeholder: "block h-7 w-12 min-w-12 rounded",
    },
    variants: {
      grade: {
        Common: { img: "from-common to-common-dark bg-gradient-to-t" },
        Uncommon: { img: "from-uncommon to-uncommon-dark bg-gradient-to-t" },
        Rare: { img: "from-rare to-rare-dark bg-gradient-to-t" },
        Epic: { img: "from-epic to-epic-dark bg-gradient-to-t" },
        Legend: { img: "from-legendary to-legendary-dark bg-gradient-to-t" },
        Mythic: { img: "from-mythic to-mythic-dark bg-gradient-to-t" },
      },
    },
  });
</script>

<script lang="ts">
  import { env } from "$env/dynamic/public";
  import { globalData } from "$lib/global-state.svelte";
  import { tv } from "tailwind-variants";

  type Props = {
    id?: number | null | undefined;
  };
  let { id }: Props = $props();

  const { items } = globalData();
  let item = $derived(id != null ? items.get(id) : null);

  let { img, placeholder } = $derived(style());
</script>

{#if item != null}
  <img
    class={img({ grade: item.itemGrade })}
    draggable="false"
    alt=""
    src="{env.PUBLIC_STATIC_URL}/image/item/{id}.webp"
  />
{:else}
  <div class={placeholder()}></div>
{/if}
