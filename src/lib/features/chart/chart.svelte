<script lang="ts" generics="T">
  import { makeArray } from "$lib/utils/array/make-array";
  import { lerp, map } from "$lib/utils/math";
  import { formatNumber } from "$lib/utils/number/format-number";
  import type { Snippet } from "svelte";
  import { SvelteMap } from "svelte/reactivity";

  interface Transform {
    key: (item: T, index: number) => string | number;
    position: (item: T, index: number) => number[];
    colorIndex?: (item: T, index: number) => number;
    colorscale?: (colorscale: number) => string;
    tooltip?: string | ((item: T, index: number) => string);
    size?: number | ((item: T, index: number) => number);
  }

  interface Tooltip {
    x: number;
    y: number;
    color?: string | null;
    content: string;
  }

  interface Props {
    width: number;
    height: number;
    items: T[];
    columnType?: "real" | "index";
    transform: Transform;
    item?: Snippet<
      [
        {
          item: T;
          position: number[];
          screen: number[];
          color: string;
          size: number | undefined;
        },
      ]
    >;
    search?: string;
  }
  let {
    items,
    width,
    height,
    transform,
    columnType = "real",
    item: itemSnippet,
    search,
  }: Props = $props();

  let searchKeywords = $derived.by(() => {
    if (search == null) return;
    const trimmedSearchString = search?.trim();
    if (trimmedSearchString.length === 0) return;
    const keywords = trimmedSearchString
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x.length > 0);
    if (keywords.length === 0) return;
    return keywords;
  });

  let graphWidth = $derived(width);
  let graphHeight = $derived(height);

  let agg = $derived.by(() => {
    const column = {
      min: Number.MAX_SAFE_INTEGER,
      max: Number.MIN_SAFE_INTEGER,
      unit: 0,
      grid: { min: 0, max: 0, repeat: 0 },
    };
    const row = {
      min: Number.MAX_SAFE_INTEGER,
      max: Number.MIN_SAFE_INTEGER,
      unit: 0,
      grid: { min: 0, max: 0, repeat: 0 },
    };
    const color = {
      min: Number.MAX_SAFE_INTEGER,
      max: Number.MIN_SAFE_INTEGER,
    };
    const defaultPadding = 16;
    const padding = {
      top: defaultPadding,
      left: defaultPadding,
      right: defaultPadding,
      bottom: defaultPadding,
    };
    items.forEach((item, index) => {
      const position = transform.position(item, index);

      if (position[0] < column.min) {
        column.min = position[0];
      }
      if (position[0] > column.max) {
        column.max = position[0];
      }
      {
        const v = Math.min(...position.slice(1));
        if (v < row.min) {
          row.min = v;
        }
      }
      {
        const v = Math.max(...position.slice(1));
        if (v > row.max) {
          row.max = v;
        }
      }
      const ci = transform.colorIndex?.(item, index) ?? 0;
      if (ci < color.min) color.min = ci;
      if (ci > color.max) color.max = ci;
    });
    column.unit = 10 ** (Math.ceil(Math.log10(column.max - column.min)) - 1);
    row.unit = 10 ** (Math.ceil(Math.log10(row.max - row.min)) - 1);

    column.grid.min = Math.ceil(column.min / column.unit);
    column.grid.max = Math.floor(column.max / column.unit);
    column.grid.repeat = column.grid.max - column.grid.min + 1;

    row.grid.min = Math.ceil(row.min / row.unit);
    row.grid.max = Math.floor(row.max / row.unit);
    row.grid.repeat = row.grid.max - row.grid.min + 1;

    {
      const length = formatNumber(row.grid.max * row.unit).length;
      const width = 16;
      padding.left += width * length;
    }
    {
      const height = 16;
      padding.bottom += height;
    }

    return {
      column,
      row,
      padding,
      color,
    };
  });

  const pointPadding = 16;

  let grid = $derived({
    x: agg.padding.left,
    y: agg.padding.top,
    width: graphWidth - agg.padding.left - agg.padding.right,
    height: graphHeight - agg.padding.top - agg.padding.bottom,
    left: agg.padding.left + pointPadding,
    top: agg.padding.top + pointPadding,
    right: graphWidth - agg.padding.right - pointPadding,
    bottom: graphHeight - agg.padding.bottom - pointPadding,
  });

  let tooltips = new SvelteMap<string | number, Tooltip>();
</script>

<div class="relative">
  <svg width={graphWidth} height={graphHeight} viewBox="0 0 {graphWidth} {graphHeight}">
    <rect
      x={grid.x}
      y={grid.y}
      width={grid.width}
      height={grid.height}
      class="fill-transparent stroke-gray-400"
    ></rect>
    {#each makeArray(agg.column.grid.repeat) as _, i (i)}
      {@const x = (agg.column.grid.min + i) * agg.column.unit}
      {@const sx = map(x, agg.column.min, agg.column.max, grid.left, grid.right)}
      <line x1={sx} x2={sx} y1={grid.y} y2={grid.y + grid.height} class="stroke-gray-300" />
      <text
        x={sx}
        y={grid.y + grid.height + 16}
        class="fill-gray-500"
        text-anchor="middle"
        alignment-baseline="hanging">{formatNumber(x)}</text
      >
    {/each}
    {#each makeArray(agg.row.grid.repeat) as _, i (i)}
      {@const y = (agg.row.grid.min + i) * agg.row.unit}
      {@const sy = map(y, agg.row.min, agg.row.max, grid.bottom, grid.top)}
      <line y1={sy} y2={sy} x1={grid.left} x2={grid.right} class="stroke-gray-300" />
      <text x={grid.x} y={sy} class="fill-gray-500" text-anchor="end" alignment-baseline="hanging"
        >{formatNumber(y)}</text
      >
    {/each}
    {#each items as item, index (transform.key(item, index))}
      {@const position = transform.position(item, index)}
      {@const screen = [
        map(position[0], agg.column.min, agg.column.max, grid.left, grid.right),
        ...position.slice(1).map((y) => map(y, agg.row.min, agg.row.max, grid.bottom, grid.top)),
      ]}
      {@const colorIndex = transform.colorIndex?.(item, index) ?? 0}
      {@const tooltip =
        typeof transform.tooltip === "string"
          ? transform.tooltip
          : transform.tooltip?.(item, index)}
      {@const highlight =
        searchKeywords != null
          ? searchKeywords.some((keyword) => tooltip?.includes(keyword))
            ? true
            : false
          : null}
      {@const color =
        highlight !== false
          ? (transform.colorscale?.(lerp(colorIndex, agg.color.min, agg.color.max + 1)) ??
            "var(--color-gray-500)")
          : "var(--color-gray-500)"}
      {@const size =
        typeof transform.size === "number" ? transform.size : transform.size?.(item, index)}
      <g
        fill={color}
        fill-opacity="0.5"
        stroke={color}
        onpointerenter={() => {
          const key = transform.key(item, index);
          const coordination = position.map((v) => formatNumber(v)).join(", ");
          const content = tooltip ? `${tooltip} (${coordination})` : `(${coordination})`;

          tooltips.set(key, {
            content,
            color,
            x: screen[0],
            y: screen[1],
          });
        }}
        onpointerleave={() => {
          const key = transform.key(item, index);
          tooltips.delete(key);
        }}
      >
        {@render itemSnippet?.({
          item,
          position,
          screen,
          color,
          size,
        })}
      </g>
    {/each}
  </svg>
  {#each tooltips as [key, tooltip] (key)}
    <div
      class="pointer-events-none absolute z-9999 flex -translate-x-[50%] translate-y-4 items-center gap-x-2 rounded-lg bg-white p-2 shadow-sm"
      style:left="{tooltip.x}px"
      style:top="{tooltip.y}px"
      style:--color={tooltip.color}
    >
      {#if tooltip.color}
        <div
          class="h-3 w-3 rounded-full border-(--color)"
          style:background="color-mix(in oklab, var(--color) {0.5 * 100}%, transparent)"
        ></div>
      {/if}
      <div class="whitespace-pre">{tooltip.content}</div>
    </div>
  {/each}
</div>
