import type { Db } from "../db";

export type Query<T> = (db: Db) => T;

export function createQuery<T>(query: Query<T>) {
  return query;
}
