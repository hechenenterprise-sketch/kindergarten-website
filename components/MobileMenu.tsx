"use client";
import {Menu, X} from "lucide-react";
import {useEffect, useRef, useState} from "react";
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {setOpen(false); button.current?.focus();}
    }
    function onOutside(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onOutside);};
  }, [open]);
  return <div className="mobile-menu" ref={container}>
    <button ref={button} type="button" aria-label={open ? "關閉選單" : "開啟選單"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={24}/> : <Menu size={24}/>}</button>
    {open && <nav id="mobile-navigation" aria-label="行動版選單">{[["#about", "關於我們"], ["#courses", "課程介紹"], ["#enrollment", "招生簡章"], ["#contact", "預約參觀"]].map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<span>↗</span></a>)}</nav>}
  </div>;
}
