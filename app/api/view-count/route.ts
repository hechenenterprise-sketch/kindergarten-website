import {NextResponse} from "next/server";

import {client} from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

const counterId = "site-view-count";

export async function POST() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    return NextResponse.json(
      {error: "View counter is not configured"},
      {status: 503}
    );
  }

  try {
    const writeClient = client.withConfig({token, useCdn: false});

    await writeClient
      .transaction()
      .createIfNotExists({
        _id: counterId,
        _type: "siteViewCount",
        count: 0,
      })
      .patch(counterId, (patch) =>
        patch.inc({count: 1}).set({lastViewedAt: new Date().toISOString()})
      )
      .commit();

    const count = await writeClient.fetch<number>(
      `coalesce(*[_id == $id][0].count, 0)`,
      {id: counterId}
    );

    return NextResponse.json(
      {count},
      {headers: {"Cache-Control": "no-store"}}
    );
  } catch {
    return NextResponse.json(
      {error: "Unable to update view count"},
      {status: 500}
    );
  }
}
