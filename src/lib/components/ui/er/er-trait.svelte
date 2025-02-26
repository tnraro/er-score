<script lang="ts" module>
  import { env } from "$env/dynamic/public";
  import LL from "$i18n/i18n-svelte";
  import { tv, type VariantProps } from "tailwind-variants";
  const style = tv({
    slots: {
      img: "block rounded-full overflow-clip object-contain p-0.5",
      placeholder: "block rounded-full bg-gray-200 border border-transparent",
    },
    variants: {
      size: {
        md: {
          img: "h-7 w-7 min-w-7",
          placeholder: "h-6 w-6 min-w-6 m-0.5",
        },
        sm: {
          img: "h-6 w-6 min-w-6",
          placeholder: "h-5 w-5 min-w-5 m-0.5",
        },
      },
    },
    defaultVariants: {
      size: "md",
    },
  });
</script>

<script lang="ts">
  type Props = {
    id?: number | null | undefined;
  } & Omit<VariantProps<typeof style>, "grade">;
  let { id, size }: Props = $props();

  let c = $derived(style({ size }));
  let name = $derived($LL.api.traitName[String(id) as keyof (typeof $LL)["api"]["traitName"]]?.());
  let failed = $state(false);
</script>

<div class="flex items-center gap-1">
  {#if !failed}
    <img
      class={c.img()}
      draggable="false"
      alt=""
      src="{env.PUBLIC_STATIC_URL}/image/icon/infusion/{id}20.webp"
      onerror={() => (failed = true)}
    />
  {:else}
    <div class={c.placeholder()}></div>
  {/if}
  <div>{name}</div>
</div>
