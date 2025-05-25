<script lang="ts" module>
  const 포지션 = {
    근딜: 0,
    딜탱: 6,
    탱: 2,
    중거리: 3,
    원딜: 4,
    서폿: 5,
  };
  const 평타스증Map = new Map([
    ["1-14", 1],
    ["1-15", 0],
    ["1-16", 0],
    ["1-18", 0],
    ["2-9", 1],
    ["2-10", 0],
    ["2-11", 1],
    ["3-16", 1],
    ["3-19", 1],
    ["3-21", 1],
    ["4-3", 1],
    ["4-13", 1],
    ["5-5", 1],
    ["5-6", 1],
    ["6-7", 1],
    ["6-8", 0],
    ["7-1", 0],
    ["7-2", 1],
    ["8-22", 0],
    ["9-9", 1],
    ["9-10", 0],
    ["10-1", 0],
    ["10-20", 0],
    ["11-16", 1],
    ["11-18", 0],
    ["12-6", 1],
    ["12-7", 1],
    ["13-15", 1],
    ["13-19", 1],
    ["14-21", 1],
    ["15-5", 1],
    ["15-6", 1],
    ["16-9", 1],
    ["17-5", 1],
    ["18-15", 1],
    ["19-6", 1],
    ["19-24", 1],
    ["20-4", 1],
    ["21-9", 0],
    ["22-3", 1],
    ["23-15", 1],
    ["23-18", 1],
    ["24-3", 1],
    ["24-21", 1],
    ["25-11", 0],
    ["26-9", 1],
    ["27-2", 1],
    ["28-3", 1],
    ["28-13", 1],
    ["29-1", 1],
    ["29-2", 1],
    ["30-13", 1],
    ["31-7", 0],
    ["32-5", 0],
    ["33-1", 1],
    ["34-23", 1],
    ["35-1", 1],
    ["35-2", 1],
    ["36-5", 1],
    ["37-15", 1],
    ["38-9", 1],
    ["39-18", 0],
    ["39-21", 0],
    ["40-6", 0],
    ["41-24", 1],
    ["42-24", 1],
    ["43-5", 1],
    ["44-25", 1],
    ["45-4", 1],
    ["46-16", 0],
    ["47-4", 1],
    ["48-3", 1],
    ["49-19", 0],
    ["50-21", 1],
    ["51-22", 1],
    ["52-24", 1],
    ["53-13", 1],
    ["53-14", 1],
    ["54-8", 1],
    ["55-14", 1],
    ["56-20", 1],
    ["57-23", 1],
    ["58-10", 1],
    ["59-2", 1],
    ["60-6", 1],
    ["61-5", 1],
    ["62-11", 1],
    ["63-15", 1],
    ["64-24", 1],
    ["65-16", 1],
    ["66-24", 1],
    ["67-14", 1],
    ["68-1", 1],
    ["69-9", 1],
    ["70-6", 0],
    ["71-14", 1],
    ["72-11", 0],
    ["73-24", 1],
    ["74-3", 1],
    ["75-22", 1],
    ["76-3", 1],
    ["77-24", 1],
    ["78-16", 1],
    ["79-8", 1],
  ]);

  interface Cluster {
    label: Record<number, string>;
    mapColorIndex: (item: CharacterStat) => number;
  }

  const clusters = {
    포지션: {
      label: {
        0: "근딜",
        6: "딜탱",
        2: "탱",
        3: "중거리",
        4: "원딜",
        5: "서폿",
      },
      mapColorIndex: (item) =>
        [
          0,
          포지션.근딜, // 재키
          포지션.원딜, // 아야
          포지션.근딜, // 피오라
          포지션.딜탱, // 매그너스
          포지션.원딜, // 자히르
          포지션.원딜, // 나딘
          포지션.근딜, // 현우
          포지션.원딜, // 하트
          포지션.원딜, // 아이솔
          포지션.근딜, // 리 다이린
          포지션.근딜, // 유키
          포지션.원딜, // 혜진
          포지션.탱, // 쇼우
          포지션.딜탱, // 키아라
          포지션.원딜, // 시셀라
          포지션.중거리, // 실비아
          포지션.원딜, // 아드리아나
          포지션.근딜, // 쇼이치
          포지션.중거리, // 엠마
          포지션.탱, // 레녹스
          포지션.중거리, // 로지
          포지션.근딜, // 루크
          포지션.근딜, // 캐시
          포지션.중거리, // 아델라
          포지션.중거리, // 버니스
          포지션.중거리, // 바바라
          포지션.중거리, // 알렉스
          포지션.딜탱, // 수아
          포지션.근딜, // 레온
          포지션.탱, // 일레븐
          포지션.원딜, // 리오
          포지션.원딜, // 윌리엄
          포지션.근딜, // 니키
          포지션.원딜, // 나타폰
          포지션.딜탱, // 얀
          포지션.원딜, // 이바
          포지션.근딜, // 다니엘
          포지션.중거리, // 제니
          포지션.근딜, // 카밀로
          포지션.중거리, // 클로에
          포지션.서폿, // 요한
          포지션.중거리, // 비앙카
          포지션.중거리, // 셀린
          포지션.근딜, // 에키온
          포지션.탱, // 마이
          포지션.중거리, // 에이든
          포지션.중거리, // 라우라
          포지션.중거리, // 띠아
          포지션.근딜, // 펠릭스
          포지션.탱, // 엘레나
          포지션.서폿, // 프리야
          포지션.중거리, // 아디나
          포지션.딜탱, // 마커스
          포지션.중거리, // 칼라
          포지션.탱, // 에스텔
          포지션.근딜, // 피올로
          포지션.원딜, // 마르티나
          포지션.원딜, // 헤이즈
          포지션.근딜, // 아이작
          포지션.중거리, // 타지아
          포지션.중거리, // 이렘
          포지션.원딜, // 테오도르
          포지션.딜탱, // 이안
          포지션.딜탱, // 바냐
          포지션.딜탱, // 데비&마를렌
          포지션.중거리, // 아르다
          포지션.근딜, // 아비게일
          포지션.탱, // 알론소
          포지션.서폿, // 레니
          포지션.원딜, // 츠바메
          포지션.딜탱, // 케네스
          포지션.원딜, // 카티야
          포지션.서폿, // 샬럿
          포지션.근딜, // 다르코
          포지션.원딜, // 르노어
          포지션.탱, // 가넷
          포지션.원딜, // 유민
          포지션.근딜, // 히스이
          포지션.원딜, // 유스티나
        ][item.characterId],
    } as Cluster,
    평타스증: {
      label: {
        0: "평타",
        1: "스증",
      },
      mapColorIndex: (item) => {
        return 평타스증Map.get(`${item.characterId}-${item.weaponId}`);
      },
    } as Cluster,
  } satisfies Record<string, Cluster>;

  const clusterNames = [...Object.keys(clusters)] as (keyof typeof clusters)[];

  const labels = {
    score: "점수",
    halfRateAvg: "반타작률",
    damageDealtToPlayersPerMinAvg: "가한 딜/분",
    damageTakenFromPlayersPerMinAvg: "받은 딜/분",
    healingAmountPerMinAvg: "회복/분",
    killsPerMinAvg: "킬/분",
    deathsPerMinAvg: "데스/분",
    assistsPerMinAvg: "어시/분",
    monsterKillsPerMinAvg: "동물 킬/분",
    visionScorePerMinAvg: "시야점수/분",
    count: "경기 수",
  } satisfies Partial<Record<keyof CharacterStat, string>>;

  type Column = keyof typeof labels;
  const columns = [...Object.keys(labels)] as Column[];
</script>

<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  import type { TranslationFunctions } from "$i18n/i18n-types.js";
  import type { CharacterStat } from "$lib/features/character-stats/synchronize-character-stats.server";
  import Chart from "$lib/features/chart/chart.svelte";

  interface Props {
    version: string;
    mode: number;
    stats: CharacterStat[];
  }
  let { version, mode, stats }: Props = $props();

  let clusterName = $state<keyof typeof clusters>("포지션");
  let cluster = $derived<Cluster>(clusters[clusterName]);

  let columnX = $state<Column>("damageDealtToPlayersPerMinAvg");
  let columnY = $state<Column>("killsPerMinAvg");
  let search = $state<string>("");

  let transformPosition = $derived((item: CharacterStat) => [item[columnX], item[columnY]]);

  function character(tr: TranslationFunctions, characterId: number) {
    return tr.api.characterName[
      String(characterId) as keyof (typeof tr)["api"]["characterName"]
    ]?.();
  }
  function weapon(tr: TranslationFunctions, weaponId: number) {
    return tr.weapon[String(weaponId) as keyof (typeof tr)["weapon"]]?.();
  }
</script>

<div>
  <!-- <Scatter
    width={400}
    height={400}
    data={stats}
    labelX={labels[columnX]}
    labelY={labels[columnY]}
    {transformPosition}
    tooltip={(item) => `${weapon($LL, item.weaponId)} ${character($LL, item.characterId)}`}
    colorIndex={(item) => cluster.mapColorIndex(item)}
    colorscale={(colorscale) => `oklch(0.5 0.5 ${colorscale * 360})`}
    legend={(colorIndex) => cluster.label[colorIndex]}
    {search}
  ></Scatter> -->
  <Chart
    width={1000}
    height={400}
    items={stats}
    {search}
    transform={{
      key: (item) => `${item.characterId}-${item.weaponId}`,
      position: (item, i) => [
        i,
        item[columnX],
        item[(columnX.slice(0, -3) + "Q1") as keyof typeof item],
        item[(columnX.slice(0, -3) + "Q2") as keyof typeof item],
        item[(columnX.slice(0, -3) + "Q3") as keyof typeof item],
      ],
      colorIndex: (item) => cluster.mapColorIndex(item),
      colorscale: (colorscale) => `oklch(0.5 0.5 ${colorscale * 360})`,
      tooltip: (item) => `${weapon($LL, item.weaponId)} ${character($LL, item.characterId)}`,
      size: 6,
    }}
  >
    {#snippet item({ screen, size })}
      {@const x = screen[0]}
      {@const avg = screen[1]}
      {@const q1 = screen[2]}
      {@const q2 = screen[3]}
      {@const q3 = screen[4]}
      {@const halfSize = (size ?? 6) * 0.5}
      <rect x={x - halfSize} y={q3} width={size} height={q1 - q3}></rect>
      <line x1={x - halfSize} y1={avg} x2={x + halfSize} y2={avg} stroke-opacity="0.3"></line>
      <line x1={x - halfSize} y1={q2} x2={x + halfSize} y2={q2}></line>
    {/snippet}</Chart
  >
  <Chart
    width={400}
    height={400}
    items={stats}
    {search}
    transform={{
      key: (item) => `${item.characterId}-${item.weaponId}`,
      position: transformPosition,
      colorIndex: (item) => cluster.mapColorIndex(item),
      colorscale: (colorscale) => `oklch(0.5 0.5 ${colorscale * 360})`,
      tooltip: (item) => `${weapon($LL, item.weaponId)} ${character($LL, item.characterId)}`,
      size: 6,
    }}
  >
    {#snippet item({ screen, size })}
      <circle cx={screen[0]} cy={screen[1]} r={size}></circle>
    {/snippet}</Chart
  >
  <input bind:value={search} />

  <div>
    <label>
      <span class="font-bold">X</span>
      <select bind:value={columnX}>
        {#each columns as column}
          <option value={column}>{labels[column]}</option>
        {/each}
      </select>
    </label>
    <label>
      <span class="font-bold">Y</span>
      <select bind:value={columnY}>
        {#each columns as column}
          <option value={column}>{labels[column]}</option>
        {/each}
      </select>
    </label>
  </div>
  <div>
    <label>
      <span class="font-bold">분류</span>
      <select bind:value={clusterName}>
        {#each clusterNames as clusterName}
          <option value={clusterName}>{clusterName}</option>
        {/each}
      </select>
    </label>
  </div>
</div>
