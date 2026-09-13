"use client";

import Link from "next/link";
import {Menu, X} from "lucide-react";
import {useState} from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "關閉選單" : "開啟選單"}
        onClick={() => setOpen((value) => !value)}
        className="rounded-xl border border-pink-100 bg-white p-2 text-slate-700 shadow-sm"
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {open && (
        <div className="absolute left-0 top-16 w-full border-t border-pink-100 bg-white shadow-xl sm:top-20">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-5">
            <Link
              href="/"
              onClick={closeMenu}
              className="border-b border-pink-50 py-3 font-medium"
            >
              首頁
            </Link>

            <Link
              href="#news"
              onClick={closeMenu}
              className="border-b border-pink-50 py-3 font-medium"
            >
              最新消息
            </Link>

            <Link
              href="#about"
              onClick={closeMenu}
              className="border-b border-pink-50 py-3 font-medium"
            >
              關於我們
            </Link>

            <Link
              href="#courses"
              onClick={closeMenu}
              className="border-b border-pink-50 py-3 font-medium"
            >
              課程介紹
            </Link>

            <Link
              href="#gallery"
              onClick={closeMenu}
              className="border-b border-pink-50 py-3 font-medium"
            >
              活動相簿
            </Link>

            <Link
              href="#teachers"
              onClick={closeMenu}
              className="border-b border-pink-50 py-3 font-medium"
            >
              師資團隊
            </Link>

            <Link
              href="#contact"
              onClick={closeMenu}
              className="border-b border-pink-50 py-3 font-medium"
            >
              聯絡我們
            </Link>

            <Link
  href="/login"
  onClick={closeMenu}
  className="py-3 font-medium"
>
  園務登入
</Link>
          </nav>
        </div>
      )}
    </div>
  );
}
