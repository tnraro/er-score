import { file } from "bun";
import { readdir } from "node:fs/promises";
import { basename, resolve } from "node:path";

const data = await run();

console.log("select");
query("get", "stats", "user");
console.log("insert or update");
query("sync", "user sync", "user updated");

function query(...tags: string[]) {
  const result = tags.map((tag) => ({
    tag,
    groups: data
      .values()
      .map(({ name, agg }) => ({ name, agg: agg.get(tag) }))
      .toArray(),
  }));
  for (const { tag, groups } of result) {
    console.group(tag);
    console.table(
      groups
        .filter(({ agg }) => agg != null)
        .map(({ name, agg }) => ({
          "log name": name,
          avg: agg?.avg,
          count: agg?.count,
          sd: agg?.stddev,
        }))
        .toSorted((a, b) => a.avg! + a.sd! - b.avg! - b.sd!),
    );
    console.groupEnd();
  }
}

async function run() {
  const result = new Map<
    string,
    {
      name: string;
      agg: Map<
        string,
        {
          tag: string;
          sum: number;
          count: number;
          avg: number;
          variance: number;
          stddev: number;
        }
      >;
    }
  >();
  for await (const { name, content } of readLogs()) {
    const lines = parser(content);
    const grouped = lines.reduce((agg, line) => {
      const arr = agg.get(line.tag) ?? [];
      arr.push(line.time);
      agg.set(line.tag, arr);
      return agg;
    }, new Map<string, number[]>());
    const agg = new Map(
      grouped.entries().map(([tag, times]: [string, number[]]) => {
        const sum = times.reduce((a, b) => a + b, 0);
        const count = times.length;
        const avg = sum / count;
        const variance = times.map((x) => (x - avg) ** 2).reduce((a, b) => a + b, 0) / count;
        const stddev = Math.sqrt(variance);
        return [
          tag,
          {
            tag,
            sum,
            count,
            avg,
            variance,
            stddev,
          },
        ];
      }),
    );
    result.set(name, {
      name,
      agg,
    });
  }
  return result;
}

async function* readLogs() {
  const logsDir = resolve(import.meta.dirname, "logs");
  for (const filename of await readdir(logsDir)) {
    if (!filename.endsWith(".log")) continue;
    const filePath = resolve(logsDir, filename);
    const name = basename(filePath, ".log");
    const content = await file(filePath).text();

    yield {
      name,
      content,
    };
  }
}

function parser(log: string) {
  return log.matchAll(/(?<tag>\S.*?)\s+(?<time>\d+(?:\.\d+)?)(?=ms$)/gm).map((match) => ({
    tag: match.groups!.tag.replace(/^\S+ {2}\| /, ""),
    time: Number(match.groups!.time),
  }));
}
