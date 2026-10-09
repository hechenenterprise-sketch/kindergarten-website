type SakuraBlossomProps = {
  className?: string;
};

export function SakuraBlossom({className = ""}: SakuraBlossomProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      <g fill="currentColor">
        <ellipse cx="32" cy="16" rx="9" ry="14" />
        <ellipse
          cx="47"
          cy="28"
          rx="9"
          ry="14"
          transform="rotate(72 47 28)"
        />
        <ellipse
          cx="41"
          cy="47"
          rx="9"
          ry="14"
          transform="rotate(144 41 47)"
        />
        <ellipse
          cx="23"
          cy="47"
          rx="9"
          ry="14"
          transform="rotate(216 23 47)"
        />
        <ellipse
          cx="17"
          cy="28"
          rx="9"
          ry="14"
          transform="rotate(288 17 28)"
        />
      </g>
      <circle cx="32" cy="32" r="6" fill="#f9c44f" />
    </svg>
  );
}

export function SakuraHeadingAccent() {
  return (
    <div
      className="mt-4 flex items-center justify-center gap-2 text-[#df0873]"
      aria-hidden="true"
    >
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-pink-300" />
      <SakuraBlossom className="size-5 rotate-[-10deg]" />
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-pink-300" />
    </div>
  );
}
