<script lang="ts">
  let { children } = $props();
</script>

<div>
  <a href="/">처음으로</a>
  <a href="/admin">어드민</a>
</div>
{@render children()}
