import { sql } from "drizzle-orm";

export function percentileCont<T>(percentile: number, orderBy: T) {
  return sql<number>`percentile_cont(${percentile}) within group (order by ${orderBy})`;
}

export function cast<T>(x: T, type: string) {
  return sql`cast(${x} as ${sql.raw(type)})`;
}
