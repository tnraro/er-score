import {
  getTeamCompositionsSynchronizationStatus,
  synchronizeTeamCompositions,
} from "$lib/features/team-compositions/synchronize-team-compositions.server.js";
import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { error, json } from "@sveltejs/kit";

const PostTeamCompositionsSynchronizationQuerySchema = Type.Object({
  version: Type.Optional(Type.String()),
});

export async function POST({ locals, request }) {
  if (locals.adminSession == null) throw error(401);

  const options = await parseBody(request);

  if (getTeamCompositionsSynchronizationStatus().isSynchronizing)
    throw error(503, { message: "synchronization already in progress" });
  synchronizeTeamCompositions(options);

  return json({ message: "Team compositions synchronization has started" }, { status: 202 });
}

async function parseBody(request: Request) {
  try {
    const body = await request.json();
    Value.Assert(PostTeamCompositionsSynchronizationQuerySchema, body);
    return body;
  } catch (e) {
    console.error(e);
    throw error(400, { message: "Bad Request" });
  }
}
