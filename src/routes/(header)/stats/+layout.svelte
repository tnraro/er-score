<script lang="ts">
  import { page } from "$app/state";
  import { cnBase } from "tailwind-variants";

  let { children } = $props();

  const items = [
    { title: "실험체 통계", href: "/stats/characters" }, //
  ];
</script>

<header
  class="mx-auto mb-4 flex w-max items-center justify-between gap-x-8 rounded-full bg-white px-2 py-3"
>
  <h1 class="sr-only">통계</h1>
  <nav>
    <ul class="flex items-center gap-x-2">
      {#each items as item (item.href)}
        {@const active = page.url.pathname
          .replaceAll(/^\/[a-z]{2}(?=\/)/g, "")
          .startsWith(item.href)}
        <li>
          <a
            href={item.href}
            class={cnBase("rounded-full px-2 py-2 hover:bg-gray-50", {
              "bg-gray-100": active,
            })}>{item.title}</a
          >
        </li>
      {/each}
    </ul>
  </nav>
</header>
{@render children()}
