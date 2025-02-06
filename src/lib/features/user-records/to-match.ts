import { omit } from "$lib/utils/object/omit";
import { pick } from "$lib/utils/object/pick";

export function toMatch<T extends Record<string, unknown>>(userRecords: T[]) {
  if (userRecords.length === 0) return null;
  const key = [
    "matchId",
    "mode",
    "seasonId",
    "serverName",
    "size",
    "startedAt",
    "teamSize",
    "version",
  ] as const;
  const match = pick(userRecords[0], key);
  return {
    ...match,
    records: userRecords.map((record) => omit(record, key)),
  };
}
