<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import { MatchingMode } from "$lib/shared/er-api/shapes.js";
  import CharacterStats from "./character-stats.svelte";

  let { data } = $props();
</script>

<div class="bg-yellow-50 text-center">WIP</div>
<main class="mx-auto w-250">
  <h1>통계</h1>
  <article>
    <h2>실험체, 모드 별 통계</h2>
    <dl class="grid grid-cols-[max-content_1fr] gap-x-4 text-xs">
      <dt>버전</dt>
      <dd>{data.version}</dd>
      <dt>모드</dt>
      <dd>{$LL.matchingMode[data.mode as MatchingMode]()}</dd>
      <dt>갱신 시각</dt>
      <dd>
        <time datetime={data.updatedAt.toISOString()}
          >{Intl.DateTimeFormat(data.locale, { dateStyle: "short", timeStyle: "short" }).format(
            data.updatedAt,
          )}</time
        >
      </dd>
    </dl>
    <CharacterStats stats={data.stats} />
  </article>
</main>
