<script lang="ts">
  import { ls } from "$lib/components/ui/loading-progress/state.svelte";
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const maxWaitingTime = fd.get("max_waiting_time") as string | null;

    const url = new URL("/api/fill-imperfect-matches", location.href);
    if (maxWaitingTime != null) {
      url.searchParams.append("max_waiting_time", maxWaitingTime);
    }

    ls.do(async () => {
      await fetch(url.href, {
        method: "POST",
      });
    });
  }}
>
  <input type="number" name="max_waiting_time" value={3600000} />
  <button>갱신</button>
</form>
