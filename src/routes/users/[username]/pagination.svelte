<script lang="ts" module>
  import { makeArray } from "$lib/utils/array/make-array";
  import { clamp } from "$lib/utils/math";
  import { tv } from "tailwind-variants";
  const style = tv({
    base: "flex aspect-square h-8 items-center justify-center rounded-md bg-white",
    variants: {
      current: {
        true: "bg-gray-900 text-white",
      },
    },
  });
</script>

<script lang="ts">
  interface Props {
    maxPages: number;
    pathname: string;
    mode: number | undefined;
    page: number;
  }
  let { maxPages, pathname, mode, page }: Props = $props();

  function buildUrl(pathname: string, mode: number | undefined, page: number | undefined) {
    const url = new URL(pathname, "https://exmaple.com");
    if (mode != null) url.searchParams.set("mode", String(mode));
    if (page !== 0) url.searchParams.set("page", String(page));
    return url.href.slice(url.origin.length);
  }

  function limit(index: number, maxPages: number) {
    return clamp(index, 0, maxPages - 1);
  }

  const wingSize = 2;
  let min = $derived.by(() => {
    if (page + wingSize >= maxPages) {
      return limit(maxPages - (wingSize * 2 + 1), maxPages);
    }
    return limit(page - wingSize, maxPages);
  });
  let max = $derived.by(() => {
    if (page - wingSize < 0) {
      return limit(wingSize * 2, maxPages);
    }
    return limit(page + wingSize, maxPages);
  });
  let indexes = $derived(makeArray(max - min + 1).map((_, i) => i + min));
</script>

<nav class="flex justify-center gap-x-4">
  <a class={style()} href={buildUrl(pathname, mode, 0)}>{"|<"}</a>
  <a class={style()} href={buildUrl(pathname, mode, limit(page - 1, maxPages))}>{"<"}</a>
  {#each indexes as index (index)}
    <a class={style({ current: index === page })} href={buildUrl(pathname, mode, index)}
      >{index + 1}</a
    >
  {/each}
  <a class={style()} href={buildUrl(pathname, mode, limit(page + 1, maxPages))}>{">"}</a>
</nav>
