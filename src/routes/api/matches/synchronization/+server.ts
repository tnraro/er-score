import {
  matchesSynchronizationState,
  synchronizeMatches,
} from "$lib/features/matches/synchronize-matches.server";
import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { error, json } from "@sveltejs/kit";

const PostMatchesSynchronizationQuerySchema = Type.Object({
  targetMatchId: Type.Optional(Type.Number()),
  fetchCount: Type.Optional(Type.Number()),
  startFromMatchId: Type.Optional(Type.Number()),
  chunkSize: Type.Optional(Type.Number()),
  failRatioForEarlyStop: Type.Optional(Type.Number()),
});

export async function POST({ locals, request }) {
  if (locals.adminSession == null) throw error(401);

  const options = await parseBody(request);

  if (matchesSynchronizationState.isSynchronizing) throw error(409, { message: "Locked" });
  synchronizeMatches(options);

  return json({ message: "Match synchronization has started" }, { status: 202 });
}

async function parseBody(request: Request) {
  try {
    const body = await request.json();
    Value.Assert(PostMatchesSynchronizationQuerySchema, body);
    return body;
  } catch (e) {
    throw error(400, { message: "Bad Request" });
  }
}
