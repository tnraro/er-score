import { single } from "$lib/utils/array/single";
import { and, eq, gt, lte } from "drizzle-orm";
import { db } from "../db/client.server";
import { adminSessions } from "../db/schema.server";

export interface AdminSession {
  id: string;
  tag: string;
}

export async function selectAdminSession(sessionId: string): Promise<AdminSession | null> {
  return single(
    await db
      .select({
        id: adminSessions.id,
        tag: adminSessions.tag,
      })
      .from(adminSessions)
      .where(
        and(
          eq(adminSessions.id, sessionId),
          eq(adminSessions.isValid, true),
          gt(adminSessions.expiresAt, new Date()),
        ),
      ),
  );
}

export async function deleteExpiredAdminSessions() {
  await db
    .update(adminSessions)
    .set({ isValid: false })
    .where(and(lte(adminSessions.expiresAt, new Date()), eq(adminSessions.isValid, true)));
}
