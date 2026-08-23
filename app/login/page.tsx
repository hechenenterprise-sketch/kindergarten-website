import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">

        <div className="flex justify-center">
          <Image
            src="/miter-logo.png"
            alt="米堤爾幼兒園"
            width={120}
            height={120}
            className="h-28 w-auto object-contain"
          />
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold text-slate-800">
          米堤爾幼兒園
        </h1>

        <p className="mt-2 text-center text-slate-500">
          Miter Kindergarten
        </p>

        <h2 className="mt-8 text-center text-xl font-semibold text-[#df0873]">
          園務管理系統
        </h2>

        <p className="mt-3 text-center text-sm leading-6 text-slate-500">
          僅限園方管理人員登入。
        </p>

        <Link
          href="/studio"
          className="mt-10 flex h-12 items-center justify-center rounded-full bg-[#df0873] text-white font-semibold transition hover:bg-[#c80767]"
        >
          使用 Google 登入
        </Link>

        <Link
          href="/"
          className="mt-5 block text-center text-sm text-slate-500 hover:text-[#df0873]"
        >
          ← 返回網站首頁
        </Link>

      </div>
    </main>
  );
}