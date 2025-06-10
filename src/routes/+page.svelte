<script>
  import SearchForm from "$lib/components/ui/search-form/search-form.svelte";
  import { navItems } from "$lib/features/header/consts";
</script>

<div class="grid h-dvh place-items-center">
  <div class="flex flex-col gap-8">
    <SearchForm />
    <nav>
      <ul>
        {#each navItems as item (item.url)}
          <li>
            <a href={item.url}>{item.content()}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</div>
