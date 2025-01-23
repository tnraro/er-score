<script lang="ts" module>
  const style = tv({
    slots: {
      img: "block rounded-sm object-contain p-0.5",
      placeholder: "block rounded-sm",
    },
    variants: {
      grade: {
        Common: { img: "from-common to-common-dark bg-linear-to-t" },
        Uncommon: { img: "from-uncommon to-uncommon-dark bg-linear-to-t" },
        Rare: { img: "from-rare to-rare-dark bg-linear-to-t" },
        Epic: { img: "from-epic to-epic-dark bg-linear-to-t" },
        Legend: { img: "from-legendary to-legendary-dark bg-linear-to-t" },
        Mythic: { img: "from-mythic to-mythic-dark bg-linear-to-t" },
      },
      size: {
        md: {
          img: "h-7 w-12 min-w-12",
          placeholder: "h-7 w-12 min-w-12",
        },
        sm: {
          img: "h-6 w-10 min-w-10",
          placeholder: "h-6 w-10 min-w-10",
        },
      },
    },
    defaultVariants: {
      grade: "Common",
      size: "md",
    },
  });
</script>

<script lang="ts">
  import { env } from "$env/dynamic/public";
  import { globalData } from "$lib/global-state.svelte";
  import { tv, type VariantProps } from "tailwind-variants";

  type Props = {
    id?: number | null | undefined;
  } & Omit<VariantProps<typeof style>, "grade">;
  let { id, size }: Props = $props();

  const { items } = globalData();
  let item = $derived(id != null ? items.get(id) : null);

  let { img, placeholder } = $derived(style({ size }));
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
