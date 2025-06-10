<script lang="ts">
  import { page } from "$app/state";
  import { LL, locale } from "$i18n/i18n-svelte";
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import ErItem from "$lib/components/ui/er/er-item.svelte";
  import ErTrait from "$lib/components/ui/er/er-trait.svelte";
  import Icon from "$lib/components/ui/icon/icon.svelte";
  import NumericUpdown from "$lib/components/ui/numeric/numeric-updown.svelte";
  import ProgressRange from "$lib/components/ui/progress/progress-range.svelte";
  import Progress from "$lib/components/ui/progress/progress.svelte";
  import SearchForm from "$lib/components/ui/search-form/search-form.svelte";
  import Score from "$lib/features/score/score.svelte";
  import Rank from "$lib/features/user-records/rank.svelte";
  import UserRecordBadges from "$lib/features/user-records/user-record-badges.svelte";
  import { MatchingMode } from "$lib/shared/er-api/shapes.js";
  import { formatNumber } from "$lib/utils/number/format-number.js";
  import { formatRelativeTime } from "$lib/utils/time/format-relative-time.js";
  import type { Snippet } from "svelte";
  import { SvelteMap, SvelteSet } from "svelte/reactivity";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types.js";

  let { data } = $props();

  let myName = $derived(page.url.searchParams.get("me"));
  let maxTotalTime = $derived(Math.max(...data.match.records.map((r) => r.totalTime)));
  let endedAt = $derived(new Date(data.match.startedAt.getTime() + maxTotalTime));

  let time = $derived(formatRelativeTime(endedAt, $locale));

  let maxDamageDealtToPlayers = $derived(
    Math.max(...data.match.records.map((r) => r.damageDealtToPlayers)),
  );
  let maxDamageTakenFromPlayers = $derived(
    Math.max(...data.match.records.map((r) => r.damageTakenFromPlayers)),
  );
  let maxHealingAmount = $derived(Math.max(...data.match.records.map((r) => r.healingAmount)));

  type UserRecordType = PageData["match"]["records"][0];
  interface ColumnOptions {
    render: Snippet<[UserRecordType]>;
    heading: () => string;
    padding?: number;
    sortKey?: (record: UserRecordType) => number;
  }
  type ColumnName = keyof typeof columnConfig;
  const columnConfig = {
    rank: {
      heading: () =>
        data.match.mode === MatchingMode.Cobalt
          ? $LL.userRecords.heading.winLose()
          : $LL.userRecords.heading.rank(),
      render: summary_rank,
      sortKey: (record) => record.rank,
    },
    character: {
      heading: () => "",
      render: summary_character,
      padding: 0,
    },
    name: {
      heading: () => $LL.userRecords.heading.name(),
      render: summary_name,
    },
    badges: {
      heading: () => "",
      render: summary_badges,
    },
    rpGain: {
      heading: () => $LL.userRecords.heading.rpGain(),
      render: summary_rpGain,
      sortKey: (record) => record.rpGain ?? 0,
    },
    score: {
      heading: () => $LL.userRecords.heading.score(),
      render: summary_score,
      sortKey: (record) => record.score,
    },
    k: {
      heading: () => $LL.userRecords.heading.k(),
      render: summary_k,
      sortKey: (record) => record.kills,
    },
    d: {
      heading: () => $LL.userRecords.heading.d(),
      render: summary_d,
      sortKey: (record) => record.deaths,
    },
    a: {
      heading: () => $LL.userRecords.heading.a(),
      render: summary_a,
      sortKey: (record) => record.assists,
    },
    trait: {
      heading: () => $LL.userRecords.heading.trait(),
      render: summary_trait,
    },
    equipments: {
      heading: () => $LL.userRecords.heading.equipments(),
      render: summary_equipments,
    },
    damageDealtToPlayers: {
      heading: () => $LL.userRecords.heading.damageDealtToPlayers(),
      render: summary_damageDealtToPlayers,
      sortKey: (record) => record.damageDealtToPlayers,
    },
    damageTakenFromPlayers: {
      heading: () => $LL.userRecords.heading.damageTakenFromPlayers(),
      render: summary_damageTakenFromPlayers,
      sortKey: (record) => record.damageTakenFromPlayers,
    },
    healingAmount: {
      heading: () => $LL.userRecords.heading.healingAmount(),
      render: summary_healingAmount,
      sortKey: (record) => record.healingAmount,
    },
  } satisfies Record<string, ColumnOptions>;
  let visibleColumns = new SvelteSet<ColumnName>(Object.keys(columnConfig) as ColumnName[]);
  let sortingColumns = new SvelteMap<ColumnName, "asc" | "desc">([
    ["score", "desc"],
    ["rank", "asc"],
  ]);
  $effect(() => {
    if (data.match.mode !== MatchingMode.Rank && data.match.mode !== MatchingMode.Union) {
      visibleColumns.delete("rpGain");
    }
  });
  interface Column extends ColumnOptions {
    key: ColumnName;
    sortingMethod?: "asc" | "desc";
  }
  let columns: Column[] = $derived(
    [...visibleColumns].map((column) => ({
      key: column,
      ...columnConfig[column],
      sortingMethod: sortingColumns.get(column),
    })),
  );
  let rows = $derived(
    data.match.records.slice().sort((a, b) => {
      const entries = [...sortingColumns.entries()];
      for (let i = entries.length - 1; i >= 0; i--) {
        const [key, sortingMethod] = entries[i];
        const column = columnConfig[key] as ColumnOptions;
        if (column.sortKey == null) continue;
        const value = column.sortKey(a) - column.sortKey(b);
        if (value === 0) continue;
        if (sortingMethod === "asc") return value;
        return -value;
      }
      return 0;
    }),
  );
</script>

{#snippet summary_rank(record: UserRecordType)}
  <Rank class="block w-full" rank={record.rank} mode={data.match.mode} />
{/snippet}
{#snippet summary_character(record: UserRecordType)}
  <CharacterAvatar characterId={record.characterId} skin={record.skin} rounded="md" />
{/snippet}
{#snippet summary_name(record: UserRecordType)}
  <a
    class="flex gap-1 overflow-hidden break-keep text-ellipsis whitespace-nowrap hover:text-blue-500 hover:underline"
    href="/{$locale}/users/{encodeURIComponent(record.nickname)}"
    title={record.nickname}
    >{record.nickname}
    {#if record.nickname === myName}
      <div class="self-center rounded-full bg-yellow-400 px-1 text-xs text-yellow-900">me</div>
    {/if}
  </a>
{/snippet}
{#snippet summary_rpGain(record: UserRecordType)}
  {#if record.rpGain != null}
    <NumericUpdown class="text-sm" value={record.rpGain} />
  {/if}
{/snippet}
{#snippet summary_score(record: UserRecordType)}
  <Score score={record.score} />
{/snippet}
{#snippet summary_k(record: UserRecordType)}
  <div class="text-right">{record.kills}</div>
{/snippet}
{#snippet summary_d(record: UserRecordType)}
  <div class="text-right">{record.deaths}</div>
{/snippet}
{#snippet summary_a(record: UserRecordType)}
  <div class="text-right">{record.assists}</div>
{/snippet}
{#snippet summary_badges(record: UserRecordType)}
  <div class="flex gap-x-1">
    <UserRecordBadges
      preMadeTeamSize={record.preMadeTeamSize}
      isAlphaKilled={record.isAlphaKilled}
      isOmegaKilled={record.isOmegaKilled}
      isGammaKilled={record.isGammaKilled}
      isWickelineKilled={record.isWickelineKilled}
    />
  </div>
{/snippet}
{#snippet summary_trait(record: UserRecordType)}
  <div class="flex gap-x-0.5">
    <ErTrait id={record.traits["0"]} size="sm" />
    <div class="flex">
      {#each record.traits["1"] as trait}
        <ErTrait id={trait} size="sm" />
      {/each}
    </div>
    <div class="flex">
      {#each record.traits["2"] as trait}
        <ErTrait id={trait} size="sm" />
      {/each}
    </div>
  </div>
{/snippet}
{#snippet summary_equipments(record: UserRecordType)}
  <div class="flex gap-1">
    <ErItem id={record.equipments[0]} size="sm" />
    <ErItem id={record.equipments[1]} size="sm" />
    <ErItem id={record.equipments[2]} size="sm" />
    <ErItem id={record.equipments[3]} size="sm" />
    <ErItem id={record.equipments[4]} size="sm" />
  </div>
{/snippet}
{#snippet summary_damageDealtToPlayers(record: UserRecordType)}
  <div class="flex flex-col">
    <span class="text-right text-xs font-light">{formatNumber(record.damageDealtToPlayers)}</span>
    <Progress
      class="overflow-hidden rounded-full"
      value={record.damageDealtToPlayers}
      max={maxDamageDealtToPlayers}
    >
      <ProgressRange color="red" />
    </Progress>
  </div>
{/snippet}
{#snippet summary_damageTakenFromPlayers(record: UserRecordType)}
  <div class="flex flex-col">
    <span class="text-right text-xs font-light">{formatNumber(record.damageTakenFromPlayers)}</span>
    <Progress
      class="overflow-hidden rounded-full"
      value={record.damageTakenFromPlayers}
      max={maxDamageTakenFromPlayers}
    >
      <ProgressRange color="blue" />
    </Progress>
  </div>
{/snippet}
{#snippet summary_healingAmount(record: UserRecordType)}
  <div class="flex flex-col">
    <span class="text-right text-xs font-light">{formatNumber(record.healingAmount)}</span>
    <Progress
      class="overflow-hidden rounded-full"
      value={record.healingAmount}
      max={maxHealingAmount}
    >
      <ProgressRange color="green" />
    </Progress>
  </div>
{/snippet}

<div class="bg-yellow-50 text-center">WIP</div>
<div class="grid place-items-center py-8">
  <SearchForm username={myName} />
</div>

<main class="container mx-auto space-y-8 rounded-2xl bg-white p-4">
  <div class="flex items-baseline text-sm">
    <span class="text-gray-500">
      {$LL.matchingMode[data.match.mode as MatchingMode]()}
      ·
      {time}
      ·
      {endedAt.toLocaleString($locale)}
    </span>
    <span class="flex-1"></span>
    <span>
      <span class="select-none">ID:</span>
      <span>{data.match.matchId}</span>
    </span>
  </div>
  <div class="overflow-x-auto">
    <table>
      <thead>
        <tr>
          <!-- <th class="border"></th> -->
          {#each columns as column}
            <th
              class="cursor-pointer border bg-white px-(--padding) py-1 select-none"
              style:--padding="calc(var(--spacing) * {column.padding ?? 1})"
              onpointerdown={() => {
                if (column.sortingMethod == null) {
                  sortingColumns.delete(column.key);
                  sortingColumns.set(column.key, "desc");
                } else if (column.sortingMethod === "desc") {
                  sortingColumns.delete(column.key);
                  sortingColumns.set(column.key, "asc");
                } else if (column.sortingMethod === "asc") {
                  sortingColumns.delete(column.key);
                }
              }}
            >
              <div class="flex items-center">
                <div class="text-sm font-medium break-keep">
                  {column.heading?.()}
                </div>
                {#if column.sortKey != null}
                  <div class="relative text-gray-700">
                    {#if column.sortingMethod == null}
                      <div transition:fade={{ duration: 100 }}>
                        <Icon as="minus" size={14} class="absolute" />
                      </div>
                    {/if}
                    <Icon
                      as="arrow-big-up"
                      size={14}
                      class="transition-transform {column.sortingMethod == null
                        ? 'rotate-x-90'
                        : column.sortingMethod === 'desc'
                          ? 'rotate-x-180'
                          : 'rotate-x-0'}"
                    />
                  </div>
                {/if}
              </div>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each rows as record (record.userId)}
          <tr class:bg-gray-100={record.rank % 2 === 1}>
            <!-- <td class="cursor-pointer border">
              <Icon as="ellipsis-vertical" class="transition-all hover:rotate-90" size={16} />
            </td> -->
            {#each columns as column}
              <td
                class="border px-(--padding)"
                style:--padding="calc(var(--spacing) * {column.padding ?? 1})"
              >
                {@render column.render(record)}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>
<footer class="h-lvh"></footer>
