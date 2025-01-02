<script lang="ts">
  import { navigating } from "$app/state";
  import { cn } from "$lib/utils/cn";
  import ProgressRange from "../progress/progress-range.svelte";
  import Progress from "../progress/progress.svelte";
  import { ls } from "./state.svelte";

  $effect(() => {
    if (navigating.complete != null) {
      ls.start();
      navigating.complete.then(() => {
        ls.done();
      });
    }
  });
</script>

<Progress
  class={cn("fixed top-0 overflow-visible transition-opacity", ls.show || "opacity-0")}
  value={ls.t}
  min={0}
  max={1}
  color="transparent"
>
  <ProgressRange
    color="yellow"
    class="relative transition-all after:absolute after:right-0 after:-z-10 after:h-full after:w-20 after:-translate-y-0.5 after:rotate-2 after:shadow after:shadow-yellow-500 after:content-['']"
  />
</Progress>
