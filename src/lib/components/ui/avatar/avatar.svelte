<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { HTMLImgAttributes } from "svelte/elements";
  import { avatar, type AvatarVariants } from "./avatar";

  type Props = AvatarVariants & HTMLImgAttributes;
  let { size, rounded, class: className, children, ...rest }: Props = $props();
</script>

<img class={cn(avatar({ size, rounded }), className)} {...rest} />
