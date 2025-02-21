<script lang="ts">
  import Badge from "$lib/components/ui/badge/badge.svelte";
  interface Props {
    show?: boolean;
    class?: string;
    description?: string;
  }
  let { show, class: className, description }: Props = $props();
</script>

{#if show}
  <Badge class={className} title={description} />
{/if}
