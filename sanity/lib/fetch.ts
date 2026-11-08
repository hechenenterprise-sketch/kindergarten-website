import "server-only";

import {client} from "@/sanity/lib/client";

export function fetchFresh<T>(query: string, params: Record<string, unknown> = {}) {
  return client.fetch<T>(query, params, {cache: "no-store"});
}
