"use client";

import { useEffect, useState } from "react";
import { SakuraBlossom } from "@/components/GardenDecor";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="back-to-top fixed bottom-6 right-6 z-50"
      aria-label="回到頂端"
    >
      <SakuraBlossom className="back-to-top-flower" />
      <span aria-hidden="true">↑</span>
    </button>
  );
}
