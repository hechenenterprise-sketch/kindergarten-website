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
    <p className="view-counter" aria-live="polite">
      <Eye size={14} aria-hidden="true" />
      <span>瀏覽次數</span>
      <strong>{count === null ? "—" : count.toLocaleString("zh-TW")}</strong>
    </p>
  );
}
