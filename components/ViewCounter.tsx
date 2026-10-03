"use client";

import {useEffect, useState} from "react";

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

  if (count === null) return null;

  return (
    <p className="whitespace-nowrap text-[11px] text-slate-400 sm:text-xs">
      瀏覽次數：{count.toLocaleString("zh-TW")}
    </p>
  );
}
