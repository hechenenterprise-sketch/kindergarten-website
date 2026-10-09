"use client";

import {useEffect, useState} from "react";
import {Eye} from "lucide-react";

let hasCountedThisPageLoad = false;

export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (hasCountedThisPageLoad) return;
    hasCountedThisPageLoad = true;

    fetch("/api/view-count", {
      method: "POST",
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to update view count");
        return response.json() as Promise<{count: number}>;
      })
      .then((data) => setCount(data.count))
      .catch(() => setCount(null));
  }, []);

  return (
    <p
      className="inline-flex whitespace-nowrap items-center gap-1 rounded-full bg-pink-50 px-2.5 py-1 text-[11px] font-medium text-[#b80660] ring-1 ring-pink-100 sm:text-xs"
      aria-live="polite"
    >
      <Eye className="size-3.5" aria-hidden="true" />
      瀏覽次數：{count === null ? "—" : count.toLocaleString("zh-TW")}
    </p>
  );
}
