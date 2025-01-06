<script lang="ts" module>
  import { navigating } from "$app/state";
  import { tv } from "tailwind-variants";
  import ProgressRange from "../progress/progress-range.svelte";
  import Progress from "../progress/progress.svelte";
  import { ls } from "./state.svelte";

  const style = tv({
    slots: {
      track: "fixed top-0 overflow-visible transition-opacity",
      range:
        "relative transition-all after:absolute after:right-0 after:-z-10 after:h-full after:w-20 after:-translate-y-0.5 after:rotate-2 after:shadow after:shadow-yellow-500 after:content-['']",
    },
    variants: {
      show: {
        false: {
          track: "opacity-0",
        },
      },
    },
    defaultVariants: {
      show: false,
    },
  });
</script>

<script lang="ts">
  $effect(() => {
    if (navigating.complete != null) {
      ls.start();
      navigating.complete.then(() => {
        ls.done();
      });
    }
  });

  const { track, range } = style();
</script>

<Progress class={track({ show: ls.show })} value={ls.t} min={0} max={1} color="transparent">
  <ProgressRange color="yellow" class={range()} />
</Progress>
